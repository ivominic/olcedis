/** Different types of drawing Interactions: trace drawing, guided drawing...*/
let guidedDrawInteraction, guidedModifyInteraction, guidedSnapInteraction, modifyTraceInteraction;
// math utilities

// coordinates; will return the length of the [a, b] segment
function length(a, b) {
  return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
}

// coordinates; will return true if c is on the [a, b] segment
function isOnSegment(c, a, b) {
  const lengthAc = length(a, c);
  const lengthAb = length(a, b);
  const dot = ((c[0] - a[0]) * (b[0] - a[0]) + (c[1] - a[1]) * (b[1] - a[1])) / lengthAb;
  return Math.abs(lengthAc - dot) < 1e-6 && lengthAc < lengthAb;
}

// modulo for negative values, eg: mod(-1, 4) returns 3
function mod(a, b) {
  return ((a % b) + b) % b;
}

// returns a coordinates array which contains the segments of the feature's
// outer ring between the start and end points
// Note: this assumes the base feature is a single polygon
function getPartialRingCoords(feature, startPoint, endPoint) {
  let figure = feature.getGeometry();
  if (figure.getType() === multiPolygon) {
    figure = figure.getPolygon(0);
  }
  if (figure.getType() === multiPolygon || figure.getType() === polygon) {
    figure = figure.getLinearRing();
  }
  let ringCoords = figure.getCoordinates();

  let i,
    pointA,
    pointB,
    startSegmentIndex = -1;
  for (i = 0; i < ringCoords.length; i++) {
    pointA = ringCoords[i];
    pointB = ringCoords[mod(i + 1, ringCoords.length)];

    // check if this is the start segment dot product
    if (isOnSegment(startPoint, pointA, pointB)) {
      startSegmentIndex = i;
      break;
    }
  }

  const cwCoordinates = [];
  let cwLength = 0;
  const ccwCoordinates = [];
  let ccwLength = 0;

  // build clockwise coordinates
  for (i = 0; i < ringCoords.length; i++) {
    pointA = i === 0 ? startPoint : ringCoords[mod(i + startSegmentIndex, ringCoords.length)];
    pointB = ringCoords[mod(i + startSegmentIndex + 1, ringCoords.length)];
    cwCoordinates.push(pointA);

    if (isOnSegment(endPoint, pointA, pointB)) {
      cwCoordinates.push(endPoint);
      cwLength += length(pointA, endPoint);
      break;
    } else {
      cwLength += length(pointA, pointB);
    }
  }

  // build counter-clockwise coordinates
  for (i = 0; i < ringCoords.length; i++) {
    pointA = ringCoords[mod(startSegmentIndex - i, ringCoords.length)];
    pointB = i === 0 ? startPoint : ringCoords[mod(startSegmentIndex - i + 1, ringCoords.length)];
    ccwCoordinates.push(pointB);

    if (isOnSegment(endPoint, pointA, pointB)) {
      ccwCoordinates.push(endPoint);
      ccwLength += length(endPoint, pointB);
      break;
    } else {
      ccwLength += length(pointA, pointB);
    }
  }

  // keep the shortest path
  return ccwLength < cwLength ? ccwCoordinates : cwCoordinates;
}

// this is were the drawn features go
const drawVector = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: vectorStyle,
});

// this line only appears when we're tracing a feature outer ring
const previewLine = new ol.Feature({
  geometry: new ol.geom.LineString([]),
});
const previewVector = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [previewLine],
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(255, 0, 0, 1)",
      width: 2,
    }),
  }),
});

map.addLayer(drawVector);
map.addLayer(previewVector);

let drawTraceInteraction, snapTraceInteraction, tracingFeature, startPoint, endPoint;
let drawing = false;

const getFeatureOptions = {
  hitTolerance: 10,
  layerFilter: (layer) => {
    return layer === drawVector;
  },
};

// the click event is used to start/end tracing around a feature
map.on("click", (event) => {
  if (!drawing) {
    return;
  }

  let hit = false;
  map.forEachFeatureAtPixel(
    event.pixel,
    (feature) => {
      if (tracingFeature && feature !== tracingFeature) {
        return;
      }

      hit = true;
      const coord = map.getCoordinateFromPixel(event.pixel);

      // second click on the tracing feature: append the ring coordinates
      if (feature === tracingFeature) {
        endPoint = tracingFeature.getGeometry().getClosestPoint(coord);
        const appendCoords = getPartialRingCoords(tracingFeature, startPoint, endPoint);
        drawTraceInteraction.removeLastPoint();
        drawTraceInteraction.appendCoordinates(appendCoords);
        tracingFeature = null;
      }

      // start tracing on the feature ring
      tracingFeature = feature;
      startPoint = tracingFeature.getGeometry().getClosestPoint(coord);
    },
    getFeatureOptions
  );

  if (!hit) {
    // clear current tracing feature & preview
    previewLine.getGeometry().setCoordinates([]);
    tracingFeature = null;
  }
});

// the pointermove event is used to show a preview of the result of the tracing
map.on("pointermove", (event) => {
  if (tracingFeature && drawing) {
    let coord = null;
    map.forEachFeatureAtPixel(
      event.pixel,
      (feature) => {
        if (tracingFeature === feature) {
          coord = map.getCoordinateFromPixel(event.pixel);
        }
      },
      getFeatureOptions
    );

    let previewCoords = [];
    if (coord) {
      endPoint = tracingFeature.getGeometry().getClosestPoint(coord);
      previewCoords = getPartialRingCoords(tracingFeature, startPoint, endPoint);
    }
    previewLine.getGeometry().setCoordinates(previewCoords);
  }
});

function addTraceInteraction(geometryType) {
  map.removeInteraction(drawTraceInteraction);
  map.removeInteraction(snapTraceInteraction);
  map.removeInteraction(guidedSnapInteraction);
  map.removeInteraction(guidedDrawInteraction);
  map.removeInteraction(guidedModifyInteraction);

  snapTraceInteraction = new ol.interaction.Snap({
    source: drawVector.getSource(),
  });
  drawTraceInteraction = new ol.interaction.Draw({
    source: drawVector.getSource(),
    type: geometryType,
    freehandCondition: ol.events.condition.shiftKeyOnly,
  });
  drawTraceInteraction.on("drawstart", () => {
    drawing = true;
  });
  drawTraceInteraction.on("drawend", () => {
    drawing = false;
    previewLine.getGeometry().setCoordinates([]);
    tracingFeature = null;
  });
  map.addInteraction(drawTraceInteraction);
  map.addInteraction(snapTraceInteraction);
}

/*** guided drawing */
function addGuidedInteraction(geometryType) {
  map.removeInteraction(drawTraceInteraction);
  map.removeInteraction(snapTraceInteraction);
  map.removeInteraction(guidedSnapInteraction);
  map.removeInteraction(guidedDrawInteraction);
  map.removeInteraction(guidedModifyInteraction);

  guidedDrawInteraction = new ol.interaction.Draw({
    source: drawVector.getSource(),
    type: geometryType,
  });
  map.addInteraction(guidedDrawInteraction);

  guidedModifyInteraction = new ol.interaction.Modify({
    source: drawVector.getSource(),
    deleteCondition: function (event) {
      return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
    },
  });
  map.addInteraction(guidedModifyInteraction);

  guidedSnapInteraction = new ol.interaction.SnapGuides({
    vectorClass: ol.layer.VectorImage,
  });
  guidedSnapInteraction.setDrawInteraction(guidedDrawInteraction);
  guidedSnapInteraction.setModifyInteraction(guidedModifyInteraction);
  map.addInteraction(guidedSnapInteraction);
}
