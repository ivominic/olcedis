document.querySelector("#snapStub35").addEventListener("click", snapStub35);
document.querySelector("#snapStub10Kv").addEventListener("click", snapStub10Kv);
document.querySelector("#snapStub04Kv").addEventListener("click", snapStub04Kv);
document.querySelector("#snapVod35").addEventListener("click", snapVod35);
document.querySelector("#snapVod10Kv").addEventListener("click", snapVod10Kv);
document.querySelector("#snapVod04Kv").addEventListener("click", snapVod04Kv);
document.querySelector("#snapTrafostanica110").addEventListener("click", snapTrafostanica110);
document.querySelector("#snapTrafostanica35").addEventListener("click", snapTrafostanica35);
document.querySelector("#snapTrafostanica10Kv").addEventListener("click", snapTrafostanica10Kv);
document.querySelector("#snapNKRO").addEventListener("click", snapNKRO);
document.querySelector("#snapPrikljucnoMjesto").addEventListener("click", snapPrikljucnoMjesto);
document.querySelector("#snapPotrosac").addEventListener("click", snapPotrosac);
document.querySelector("#snapPOD").addEventListener("click", snapPOD);
function snapStub35() {
  citajExtent("stubovi", 35);
  if(document.querySelector("#snapStub35")) {
    document.querySelector("#snapStub35").className = "dropdown-item active";
  }
  setupMainSnap();
}
function snapStub10Kv() {
  citajExtent("stubovi", 10);
  if(document.querySelector("#snapStub10Kv")) {
    document.querySelector("#snapStub10Kv").className = "dropdown-item active";
  }
  setupMainSnap();
}
function snapStub04Kv() {
  citajExtent("stubovi", 0.4);
  if(document.querySelector("#snapStub04Kv")) {
    document.querySelector("#snapStub04Kv").className = "dropdown-item active";
  }
  setupMainSnap();
}
function snapVod35() {
  citajExtent("vodovi", 35);
}
function snapVod10Kv() {
  citajExtent("vodovi", 10);
}
function snapVod04Kv() {
  citajExtent("vodovi", 0.4);
}
function snapTrafostanica110() {
  citajExtent("trafostanice", 110);
  if(document.querySelector("#snapTrafostanica110")) {
    document.querySelector("#snapTrafostanica110").className = "dropdown-item active";
  }
  setupMainSnap();
}
function snapTrafostanica35() {
  citajExtent("trafostanice", 35);
  if(document.querySelector("#snapTrafostanica35")) {
    document.querySelector("#snapTrafostanica35").className = "dropdown-item active";
  }
  setupMainSnap();
}
function snapTrafostanica10Kv() {
  citajExtent("trafostanice", 10);
  if(document.querySelector("#snapTrafostanica10Kv")) {
    document.querySelector("#snapTrafostanica10Kv").className = "dropdown-item active";
  }
  setupMainSnap();
}
function snapNKRO() {
  citajExtent("nkro", 0);
  if(document.querySelector("#snapNKRO")) {
    document.querySelector("#snapNKRO").className = "dropdown-item active";
  }
  setupMainSnap();
}
function snapPrikljucnoMjesto() {
  citajExtent("prikljucno_mjesto", 0);
  if(document.querySelector("#snapPrikljucnoMjesto")) {
    document.querySelector("#snapPrikljucnoMjesto").className = "dropdown-item active";
  }
  setupMainSnap();
}
function snapPotrosac() {
  citajExtent("view_potrosaci", 0);
  if(document.querySelector("#snapPotrosac")) {
    document.querySelector("#snapPotrosac").className = "dropdown-item active";
  }
  setupMainSnap();
}
function snapPOD() {
  citajExtent("view_pod", 0);
  if(document.querySelector("#snapPOD")) {
    document.querySelector("#snapPOD").className = "dropdown-item active";
  }
  setupMainSnap();
}

function setupMainSnap(){
 if(document.querySelector("#snapDiv")){
  document.querySelector("#snapDiv").className = "active";
 }
}

/**
 *
 * @param {Prikazuje objekte iz lejera na vidljivom dijelu ekrana} lejer
 */
function citajExtent(lejer, nivo) {
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
  let wktPoligon = format.writeGeometry(polygon, {});
  console.log("wkt", wktPoligon);

  // Add the polygon to the layer and style it
  prikaziSnapVektor(lejer, nivo, wktPoligon);
}

/**
 * Metoda koja za zadati lejer i poligon (bounding box) prikazuje lejere za snap
 */
function prikaziSnapVektor(lejer, nivo, poligon) {
  //let tekstFiltera = "INTERSECTS(geom," + poligon + ") "
  let tekstFiltera = "INTERSECTS(Geometry," + poligon + ") ";
  if (nivo !== 0) {
    tekstFiltera += " AND napon = " + nivo;
  }

  let nazivLejera = "geonode:" + lejer;
  //let nazivLejera = "winsoft:drvece";
  //const wfsUrl = domainUrl + "/geoserver/winsoft/wfs";
  console.log("wfs putanja", wfsUrl);
  console.log("wfs cql", tekstFiltera);

  $.ajax({
    method: "POST",
    url: wfsUrl,
    data: {
      access_token: geoserverToken,
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
