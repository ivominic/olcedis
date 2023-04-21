let dimension = true;

 function perspective() {

   dimension = !dimension;
console.log(dimension);
if (!dimension) {
  map = new ol.PerspectiveMap({
    target: "map",
    //interactions: ol.interaction.defaults().extend([new ol.interaction.PinchZoom(), new ol.interaction.DragPan()]),
    layers: [osmBaseMap, sateliteBaseMap],
    view: view,
  });
  map.setPerspective("20");
  document.querySelector("#icon-map").classList.add("rotate45");
} else {
  map.setPerspective("0");
  document.querySelector("#icon-map").classList.remove("rotate45");
  map = new ol.Map({
    target: "map",
    //interactions: ol.interaction.defaults().extend([new ol.interaction.PinchZoom(), new ol.interaction.DragPan()]),
    layers: [osmBaseMap, sateliteBaseMap],
    view: view,
  });
}


        map.on("change:perspective", function (e) {
          if (!e.animating) $("#angle").val(e.angle);
        });

        // Create vector layer for select
        var vectorSource = new ol.source.Vector({
          url: "../assets/data/objekti.json",
          format: new ol.format.GeoJSON(),
        });
        var vector = new ol.layer.VectorImage({
          source: vectorSource,
          maxResolution: 2,
        });
        map.addLayer(vector);

        // An overlay
        var place = new ol.Overlay.Placemark({
          contentColor: "#000",
        });
        map.addOverlay(place);
        map.on("click", function (e) {
          place.show(e.coordinate);
        });

        // Fullscreen
        // map.addControl(new ol.control.FullScreen({ source: 'map' }));
 };