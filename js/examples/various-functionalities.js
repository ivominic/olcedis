/**
 * Coordinate input fields
 */
// Allow to chose lat/lng format, decimal or degrees.
const coordinateInput = () => {
  var search = new ol.control.SearchGPS({
    // target: $('.options').get(0)
  });
  map.addControl(search);

  // Select feature when click on the reference index
  search.on("select", function (e) {
    console.log(e.search.coordinate);
    map.getView().animate({
      center: e.search.coordinate,
      zoom: Math.max(map.getView().getZoom(), 5),
    });
  });
};

//To add this functionality to map, call coordinateInput function
//coordinateInput();

/**
 * Allows sliding to compare layers. Lejer on the left are shown over layers on the right.
 * Layers that are not added to control, are visible on both sides.
 */

const compareLayers = (topLayer, bottomLayer) => {
  let swiper = new ol.control.Swipe();
  map.addControl(swiper);
  // Set first layer on left
  swiper.addLayer(topLayer);
  // Set second layer on right
  swiper.addLayer(bottomLayer, true);
  //Multiple layers can be added
};

//To add this control, call function compareLayers
//compareLayers(osmBaseMap, sateliteBaseMap);

/**
 * Allows snapping on guidelines - drawing with angles of 90 degrees.
 */
// New vector layer
let vector = new ol.layer.Vector({
  name: "VectorLayer",
  source: new ol.source.Vector({ features: new ol.Collection() }),
});
map.addLayer(vector);

draw = new ol.interaction.Draw({
  source: vector.getSource(),
  //type: "LineString"
  type: "Polygon",
});
map.addInteraction(draw);

modify = new ol.interaction.Modify({ source: vector.getSource() });
map.addInteraction(modify);

let snap = new ol.interaction.SnapGuides({
  vectorClass: ol.layer.VectorImage,
});
snap.setDrawInteraction(draw);
snap.setModifyInteraction(modify);
map.addInteraction(snap);
