let height = 0;
// let center = ol.proj.transform([19.26, 42.56], "EPSG:4326", "EPSG:3857");
// var layer = new ol.layer.Tile({ name: "OSM", source: new ol.source.OSM() });

// The map
// var map = new ol.Map({
//   target: "map",
//   view: new ol.View({
//     zoom: 19,
//     center: center,
//   }),
//   interactions: ol.interaction.defaults(),
//   layers: [layer],
// });

function poly3D() {
// Create layer
var vectorSourcePolygon = new ol.source.Vector({

  url: "../assets/data/objekti.json",
  format: new ol.format.GeoJSON(),
});

var vectorPolygon = new ol.layer.Vector({
  source: vectorSourcePolygon,

  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "#619ff4",
      width: 2,
    }),
    fill: new ol.style.Fill({ color: "white" }),
  }),

  maxResolution: 6,
});
map.addLayer(vectorPolygon);

// Set 3D renderer
var r3D = new ol.render3D({
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: "#619ff4",
      width: 2,
    }),
    fill: new ol.style.Fill({ color: "white" }),
  }),

  ghost: false,
  maxResolution: 0.6,
  defaultHeight: 3.5,
});
vectorPolygon.setRender3D(r3D);
var listenerKey = vectorSourcePolygon.on("change", function (e) {
  if (vectorSourcePolygon.getState() == "ready") {
    ol.Observable.unByKey(listenerKey);
    $(".loading").hide();
    setTimeout(doAnimePolygon(r3D), 200);
  }
});





};

function doAnimePolygon(r3D) {
  if (r3D.animating()) return;
  height = height ? 0 : "HAUTEUR" ;
  r3D.animate({ height: height });
  console.log("poligon");
}


function point3D() {
  var vectorSourcePoint = new ol.source.Vector({});
  $.getJSON("../assets/data/zelenilo.geojson").done(function (data) {
  
    var features = new ol.format.GeoJSON().readFeatures(data);
    features.forEach(function (f) {
      f.getGeometry().transform("EPSG:4326", map.getView().getProjection());
    });
    vectorSourcePoint.addFeatures(features);
    $(".loading").hide();
    doAnimePoint(vectorPoint);
  });
  
  var vectorPoint = new ol.layer.Vector3D({
    source: vectorSourcePoint,
  
    style: new ol.style.Style({
      stroke: new ol.style.Stroke({
        width: 10,
        color: [60, 179, 113, 0.9],
        lineCap: "round",
      }),
      fill: new ol.style.Fill({ color: "white" })
    }),
  
    center: [0.5, 1.5],
    height: 0,
    defaultHeight: 0,
  });
  map.addLayer(vectorPoint);
  

};


function doAnimePoint(vectorPoint) {
  if (vectorPoint.animating()) return;
  height = height
    ? 0
    : function (f) {
        return f.get("visina_stabla");
      };
  vectorPoint.animate({ height: height });
  console.log("tacka");
}


