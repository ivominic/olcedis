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
function snapStub35() {
  citajExtent("stubovi");
}
function snapStub10Kv() {
  citajExtent("stubovi");
}
function snapVod35() {
  citajExtent("vodovi");
}
function snapVod10Kv() {
  citajExtent("vodovi");
}
function snapTrafostanica35() {
  citajExtent("trafostanice");
}
function snapTrafostanica10Kv() {
  citajExtent("trafostanice");
}
function snapNKRO() {
  citajExtent("nkro");
}
function snapPrikljucnoMjesto() {
  citajExtent("prikljucnoMjesto");
}
function snapPotrosac() {
  citajExtent("potrosac");
}
function snapPOD() {
  citajExtent("pod");
}

/**
 *
 * @param {Prikazuje objekte iz lejera na vidljivom dijelu ekrana} lejer
 */
function citajExtent(lejer) {
  //extentSource.clear();
  let extentMap = map.getView().calculateExtent(map.getSize());
  let bottomLeft = ol.extent.getBottomLeft(extentMap);
  let topRight = ol.extent.getTopRight(extentMap);
  let bottomRight = ol.extent.getBottomRight(extentMap);
  let topLeft = ol.extent.getTopLeft(extentMap);
  let ring = [
    [bottomLeft[0], bottomLeft[1]],
    [topLeft[0], topLeft[1]],
    [topRight[0], topRight[1]],
    [bottomRight[0], bottomRight[1]],
    [bottomLeft[0], bottomLeft[1]],
  ];
  let polygon = new ol.geom.Polygon([ring]);

  let format = new ol.format.WKT();
  /*let wktPoligon = format.writeGeometry(polygon, {
   dataProjection: "EPSG:4326",
   featureProjection: "EPSG:3857",
 });*/

  console.log("snap", polygon);
  //polygon.transform('EPSG:4326', 'EPSG:3857');

  let wktPoligon = format.writeGeometry(polygon, {});
  console.log("wkt", wktPoligon);

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
  //let tekstFiltera = "INTERSECTS(geom," + poligon + ") "
  let tekstFiltera = "INTERSECTS(Geometry," + poligon + ") ";

  let nazivLejera = "geonode:" + lejer;
  //let nazivLejera = "winsoft:drvece";
  //const wfsUrl = domainUrl + "/geoserver/winsoft/wfs";
  console.log("wfs putanja", wfsUrl);
  console.log("wfs cql", tekstFiltera);

  $.ajax({
    method: "POST",
    url: wfsUrl,
    data: {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: nazivLejera,
      outputFormat: "application/json",
      SrsName: "EPSG:4326",
      CQL_FILTER: tekstFiltera,
    },
    success: function (response) {
      console.log("response servisa", response);
      let features = new ol.format.GeoJSON().readFeatures(response);
      console.log("fičeri", features);
      featureSnapOverlay.getSource().clear(); //Ispraznimo prethodne zapise
      featureSnapOverlay.getSource().addFeatures(features);
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}
