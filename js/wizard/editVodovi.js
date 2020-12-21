/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
let layernameVodovi = "vodovi",
  fulllayernameVodovi = "geonode:vodovi",
  layertitleVodovi = "vodovi";
let tipGeometrijeVodovi = lineString;
let opisSlikeVodovi = "";
let selektovaniVodoviFeatures;
let nizSelektovanihVodova = [];

let wmsVodovi = new ol.layer.Image({
  title: layertitleVodovi,
  name: layernameVodovi,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameVodovi,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

map.addLayer(wmsVodovi);
//console.log("dodao lejer na mapu");

document.querySelector("#selekecijaVodovaPoligon").addEventListener("click", vodoviUpoligonu);
/*document.querySelector("#uparivanjeTrafostanica").addEventListener("click", prikazUparivanje);
//document.querySelector("#selekcijaNapojneTrafostanice").addEventListener("click", selektujNapojnuTS);
document.querySelector("#btnPoveziTS").addEventListener("click", poveziTS);
document.querySelector("#btnOdabirNapojneTS").addEventListener("click", selektujNapojnuTS);
document.querySelector("#btnOdabirNapojneTS").style.display = "none";*/

function vodoviUpoligonu() {
  if (poligoni.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati poligon");
    return false;
  }
  let cqlText = "";

  poligoni.forEach((item) => {
    if (cqlText === "") {
      cqlText = "INTERSECTS(Geometry," + item + ") ";
    } else {
      cqlText += " OR INTERSECTS(Geometry," + item + ") ";
    }
  });

  console.log("vodovi poligon", cqlText);
  let urlZaFilter = wfsUrl + "?version=1.0.0&request=GetFeature&typeName=" + fulllayernameVodovi + "&outputformat=application/json&cql_filter=" + cqlText;
  console.log("url filter", urlZaFilter);

  let vodoviZaWS = "";
  $("#ddlPovezivanjeTSselektovane").empty();
  nizSelektovanihVodova.length = 0;

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      console.log("response", response);
      let features = new ol.format.GeoJSON().readFeatures(response);
      selektovaneTSfeatures = new ol.format.GeoJSON().readFeatures(response);
      console.log("fičeri", features);
      //vektorSource.clear();
      //vektorSource.addFeatures(features);
      //console.log("broj featurea", features.length);
      if (features.length) {
        for (let i = 0; i < features.length; i++) {
          console.log("feature i", features[i].values_);
          console.log("feature i tip", features[i].values_.tip);
          console.log("feature id", features[i].id_);
        }
        povezivanjeVodova(features[0], features);
      } else {
        poruka("Uspjeh", "Nema zapisa za prikaz.");
      }

      //console.log("size", map.getSize());
      //console.log("jedan value", features[0].values_);
      //console.log("više valua", features.values_);
      //map.getView().fit(boundingExtent, map.getSize());
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/**
 * Metoda koja za niz feature-a i početni feature prati konektivnost i dodaje povezane objekte
 */
function povezivanjeVodova(pocetna, features) {
  console.log("pocetni vod", pocetna);

  let writer = new ol.format.GeoJSON();
  let pocetnaGJ = writer.writeFeatureObject(new ol.Feature(pocetna.getGeometry().clone().transform("EPSG:3857", "EPSG:4326")));
  console.log("pocetnaGJ", pocetnaGJ);

  for (let i = 0; i < features.length; i++) {
    let pojedinacnaLinijaTurf = writer.writeFeatureObject(new ol.Feature(features[i].getGeometry().clone().transform("EPSG:3857", "EPSG:4326")));
    let presjek = turf.lineIntersect(pojedinacnaLinijaTurf, pocetnaGJ);
    console.log("test presjeka", presjek);
    //console.log("test presjeka niz", presjek.features);
    //console.log("test presjeka niz dužina", presjek.features.length);

    if (presjek.features.length > 0) {
      console.log("presijeca početni", features[i]);
    }

    /*if (turf.lineIntersect(pojedinacnaLinijaTurf, pocetnaGJ)) {
      console.log("susjedni vod", features[i]);
    }*/

    /*if (turf.lineIntersect(features[i].getGeometry, pocetna.getGeometry())) {
      console.log("susjedni vod", features[i]);
    }*/

    /*if (pocetna.getGeometry().intersects(features[i].getGeometry())) {
      console.log("susjedni vod", features[i]);      
    }*/
  }
}