document.querySelector("#snapStub35").addEventListener("click", snapStub35);
document.querySelector("#snapStub10Kv").addEventListener("click", snapStub10Kv);
document.querySelector("#snapVod35").addEventListener("click", snapVod35);
document.querySelector("#snapVod10Kv").addEventListener("click", snapVod10Kv);
document.querySelector("#snapTrafostanica35").addEventListener("click", snapTrafostanica35);
document.querySelector("#snapTrafostanica10Kv").addEventListener("click", snapTrafostanica10Kv);
document.querySelector("#snapNKRO").addEventListener("click", snapNKRO);
document.querySelector("#snapPrikljucnoMjesto").addEventListener("click", snapPrikljucnoMjesto);
document.querySelector("#snapPotrosac").addEventListener("click", snapPotrosac);
document.querySelector("#snapPOD").addEventListener("click", snapPOD);
function snapStub35(){
  citajExtent("stub35");
}
function snapStub10Kv(){
  citajExtent("stub10Kv");
}
function snapVod35(){
  citajExtent("vod35");
}
function snapVod10Kv(){
  citajExtent("vod10Kv");
}
function snapTrafostanica35(){
  citajExtent("trafostanica35");
}
function snapTrafostanica10Kv(){
  citajExtent("trafostanica10Kv");
}
function snapNKRO(){
  citajExtent("nkro");
}
function snapPrikljucnoMjesto(){
  citajExtent("prikljucnoMjesto");
}
function snapPotrosac(){
  citajExtent("potrosac");
}
function snapPOD(){
  citajExtent("pod");
}


function citajExtent(lejer){
  //extentSource.clear();
  var extentMap = map.getView().calculateExtent(map.getSize());
  var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extentMap),
    'EPSG:3857', 'EPSG:4326');
  var topRight = ol.proj.transform(ol.extent.getTopRight(extentMap),
    'EPSG:3857', 'EPSG:4326');
  var bottomRight = ol.proj.transform(ol.extent.getBottomRight(extentMap),
    'EPSG:3857', 'EPSG:4326');
  var topLeft  = ol.proj.transform(ol.extent.getTopLeft(extentMap),
    'EPSG:3857', 'EPSG:4326');
  var ring = [ 
      [bottomLeft[0], bottomLeft[1]], 
      [topLeft[0], topLeft[1]] , 
      [topRight[0], topRight[1]],
      [bottomRight[0], bottomRight[1]],
      [bottomLeft[0], bottomLeft[1]]
  ];
 var polygon = new ol.geom.Polygon([ring]);

 let format = new ol.format.WKT();
 /*let wktPoligon = format.writeGeometry(polygon, {
   dataProjection: "EPSG:4326",
   featureProjection: "EPSG:3857",
 });*/
 let wktPoligon = format.writeGeometry(polygon, {
  
});
 console.log("wkt", wktPoligon);

 console.log("snap", polygon);
 polygon.transform('EPSG:4326', 'EPSG:3857');
 
 // Add the polygon to the layer and style it
 /*var feature = new ol.Feature(polygon);
 extentSource.addFeature(feature);
 feature.setStyle(extentStyle);*/
 prikaziSnapVektor(lejer, wktPoligon);
}

/**
 * Metoda koja za zadati lejer i poligon (bounding box) prikazuje lejere za snap
 */
function prikaziSnapVektor(lejer, poligon) {
  let tekstFiltera = "INTERSECTS(geom," + poligon + ") "

  //let nazivLejera = "geonode:" + lejer;
  let nazivLejera = "winsoft:drvece";
  const wfsUrl = domainUrl + "/geoserver/winsoft/wfs";
  console.log("wfs putanja", wfsUrl);  

  $.ajax({
    method: "POST",
    url: wfsUrl,
    data: {
      service: "WFS",
      request: "GetFeature",
      typename: nazivLejera,
      outputFormat: "application/json",
      srsname: "EPSG:3857",
      CQL_FILTER: tekstFiltera,
    },
    success: function (response) {
      console.log(response);
      let features = new ol.format.GeoJSON().readFeatures(response);
      console.log("fičeri", features);
      featureSnapOverlay.getSource().clear(); //Ispraznimo prethodne zapise da bi imali samo jedan koji ćemo editovati
      featureSnapOverlay.getSource().addFeatures(features);
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}