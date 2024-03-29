/**
 * Allows to select features dragging rectangle (Ctrl+Mouse drag), and on each feature add/remove prints names in console.
 * It checks if map is rotated (Alt+Shift+Mouse drag), and then adjusts the way extent is calculated.
 */
const vectorSource = new ol.source.Vector({
  url: "https://openlayers.org/data/vector/ecoregions.json",
  format: new ol.format.GeoJSON(),
});

const style = new ol.style.Style({
  fill: new ol.style.Fill({
    color: "#eeeeee",
  }),
});

const map = new ol.Map({
  layers: [
    new ol.layer.Vector({
      source: vectorSource,
      background: "#1a2b39",
      style: function (feature) {
        const color = feature.get("COLOR_BIO") || "#eeeeee";
        style.getFill().setColor(color);
        return style;
      },
    }),
  ],
  target: "map",
  view: new ol.View({
    center: [0, 0],
    zoom: 2,
    constrainRotation: 16,
  }),
});

const selectedStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: "rgba(255, 255, 255, 0.6)",
  }),
  stroke: new ol.style.Stroke({
    color: "rgba(255, 255, 255, 0.7)",
    width: 2,
  }),
});

// a normal select interaction to handle click
const select = new ol.interaction.Select({
  style: function (feature) {
    const color = feature.get("COLOR_BIO") || "#eeeeee";
    selectedStyle.getFill().setColor(color); //Commenting this line, all selected features get new color
    return selectedStyle;
  },
});
map.addInteraction(select);

const selectedFeatures = select.getFeatures();

// a DragBox interaction used to select features by drawing boxes
const dragBox = new ol.interaction.DragBox({
  condition: ol.events.condition.platformModifierKeyOnly,
});

map.addInteraction(dragBox);

dragBox.on("boxend", function () {
  const extent = dragBox.getGeometry().getExtent();
  const boxFeatures = vectorSource
    .getFeaturesInExtent(extent)
    .filter((feature) => feature.getGeometry().intersectsExtent(extent));

  // features that intersect the box geometry are added to the
  // collection of selected features

  // if the view is not obliquely rotated the box geometry and
  // its extent are equalivalent so intersecting features can
  // be added directly to the collection
  const rotation = map.getView().getRotation();
  const oblique = rotation % (Math.PI / 2) !== 0;

  // when the view is obliquely rotated the box extent will
  // exceed its geometry so both the box and the candidate
  // feature geometries are rotated around a common anchor
  // to confirm that, with the box geometry aligned with its
  // extent, the geometries intersect
  if (oblique) {
    const anchor = [0, 0];
    const geometry = dragBox.getGeometry().clone();
    geometry.rotate(-rotation, anchor);
    const extent = geometry.getExtent();
    boxFeatures.forEach(function (feature) {
      const geometry = feature.getGeometry().clone();
      geometry.rotate(-rotation, anchor);
      if (geometry.intersectsExtent(extent)) {
        selectedFeatures.push(feature);
      }
    });
  } else {
    selectedFeatures.extend(boxFeatures);
  }
});

// clear selection when drawing a new box and when clicking on the map
dragBox.on("boxstart", function () {
  selectedFeatures.clear();
});

//TODO: check if this can return promise, after adding all features
selectedFeatures.on(["add", "remove"], function () {
  const names = selectedFeatures.getArray().map(function (feature) {
    return feature.get("ECO_NAME");
  });
  if (names.length > 0) {
    console.log(names.join(", "));
  } else {
    console.log("No objects");
  }
});
