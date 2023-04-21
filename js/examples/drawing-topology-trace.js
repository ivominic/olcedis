/**
 * Initial module. Contains all properties and methods needed to work with maps and spatial data
 */

const domainUrl = "http://...";
const wmsUrl = domainUrl + "/geoserver/geonode/wms";
const wfsUrl = domainUrl + "/geoserver/geonode/wfs";

const point = "Point",
  lineString = "LineString",
  polygon = "Polygon",
  multiPolygon = "MultiPolygon";

let points = [],
  lines = [],
  polygons = [];

let draw,
  modify,
  cqlFilter = "",
  action = "pan";
let wktGeometry = "";

/**Base maps */
let osmBaseMap = new ol.layer.Tile({
  title: "Open Street Maps",
  source: new ol.source.OSM(),
});
let sateliteBaseMap = new ol.layer.Tile({
  title: "Satelite map",
  source: new ol.source.XYZ({
    url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
    maxZoom: 23,
  }),
});
let ortofotoBaseMap = new ol.layer.Image({
  title: "Ortofoto",
  name: "ortofoto_2018",
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: "geonode:ortofoto_2018",
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

/**Stilizacija vektora */
var fill = new ol.style.Fill({
  color: "rgba(0,255,255,0.6)",
});
var stroke = new ol.style.Stroke({
  color: "#00ffff",
  width: 4,
});
var circle = new ol.style.Circle({
  radius: 7,
  fill: fill,
  stroke: stroke,
});
var vectorStyle = new ol.style.Style({
  fill: fill,
  stroke: stroke,
  image: circle,
});

/**Styling snap vector*/
var fillSnap = new ol.style.Fill({
  color: "rgba(128,0,128,0.5)",
});
var strokeSnap = new ol.style.Stroke({
  color: "#C807FE",
  width: 2,
});
var circleSnap = new ol.style.Circle({
  radius: 7,
  fill: fillSnap,
  stroke: strokeSnap,
});
var vectorStyleSnap = new ol.style.Style({
  fill: fillSnap,
  stroke: strokeSnap,
  image: circleSnap,
});

/**Styling newly created vector elements*/
let fillCreated = new ol.style.Fill({
  color: "rgba(255,0,0,0.8)",
});
let strokeCreated = new ol.style.Stroke({
  color: "#ff0000",
  width: 8,
});
let circleCreated = new ol.style.Circle({
  radius: 8,
  fill: fillCreated,
  stroke: strokeCreated,
});
let vectorStyleCreated = new ol.style.Style({
  fill: fillCreated,
  stroke: strokeCreated,
  image: circleCreated,
});

//let center = [19.26, 42.56];
let center = ol.proj.transform([19.26, 42.56], "EPSG:4326", "EPSG:3857");
let view = new ol.View({
  center: center,
  zoom: 9,
  //projection: "EPSG:4326",
});

/** Showing scale line on maps*/
const scale = new ol.control.ScaleLine({
  target: document.querySelector("#scale"),
  units: "metric",
  bar: true,
  steps: 4,
  text: true,
  minWidth: 100,
});

/**Initializing map inside div with id = #map*/
let map = new ol.Map({
  target: "map",
  //interactions: ol.interaction.defaults().extend([new ol.interaction.PinchZoom(), new ol.interaction.DragPan()]),
  layers: [osmBaseMap, sateliteBaseMap],
  view: view,
});

map.addControl(scale);

/*************************  TRACING DRAW */

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
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "rgba(100, 255, 0, 1)",
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: "rgba(100, 255, 0, 0.3)",
    }),
  }),
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

let drawInteraction, snapInteraction, tracingFeature, startPoint, endPoint;
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
        drawInteraction.removeLastPoint();
        drawInteraction.appendCoordinates(appendCoords);
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

function addInteraction(geometryType) {
  map.removeInteraction(drawInteraction);
  map.removeInteraction(snapInteraction);
  snapInteraction = new ol.interaction.Snap({
    source: drawVector.getSource(),
  });
  drawInteraction = new ol.interaction.Draw({
    source: drawVector.getSource(),
    type: geometryType,
    freehandCondition: ol.events.condition.shiftKeyOnly,
  });
  drawInteraction.on("drawstart", () => {
    drawing = true;
  });
  drawInteraction.on("drawend", () => {
    drawing = false;
    previewLine.getGeometry().setCoordinates([]);
    tracingFeature = null;
  });
  map.addInteraction(drawInteraction);
  map.addInteraction(snapInteraction);
}
addInteraction(polygon);
//addInteraction(lineString);
