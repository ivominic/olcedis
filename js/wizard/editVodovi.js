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
          //console.log("feature i", features[i].values_);
          console.log("feature i tip", features[i].values_.naziv);
          //console.log("feature id", features[i].id_);
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
  let nizObradjenihVodova = []; //Završeni vodovi, na koje se više ne treba vraćati
  let nizTrenutnihVodova = []; //Vodovi od kojih treba dalje nastaviti obradu - konektivnost
  let nizPodredjenihVodova = []; //Vodovi koji su pronađeni u tekućem koraku obrade
  //let trenutnaGeometrija = pocetna; //geometrija sa kojom se upoređuje presjek ostalih vodova
  let nizSvihGeometrija = features.slice();
  let blnPostojeNepovezaniZapisi = nizSvihGeometrija.length > 0;
  nizTrenutnihVodova.push(pocetna);

  let writer = new ol.format.GeoJSON();

  nizSvihGeometrija.forEach((elem) => console.log("elementi početnog niza", elem.values_.name));

  while (blnPostojeNepovezaniZapisi) {
    let trenutnaGJ = writer.writeFeatureObject(new ol.Feature(nizTrenutnihVodova[0].getGeometry().clone().transform("EPSG:3857", "EPSG:4326")));
    //console.log("feature kojim se testira", nizTrenutnihVodova[0]);
    console.log("vod za koji tražimo podređene vodove", nizTrenutnihVodova[0].values_.name);
    for (let i = 0; i < nizSvihGeometrija.length; i++) {
      let pojedinacnaLinijaTurf = writer.writeFeatureObject(new ol.Feature(nizSvihGeometrija[i].getGeometry().clone().transform("EPSG:3857", "EPSG:4326")));
      let presjek = turf.lineIntersect(pojedinacnaLinijaTurf, trenutnaGJ);
      //console.log("test presjeka niz dužina", presjek.features.length);

      if (presjek.features.length > 0) {
        //console.log("presijeca početni", nizSvihGeometrija[i]);
        if (nizObradjenihVodova.indexOf(nizSvihGeometrija[i]) < 0) {
          nizPodredjenihVodova.push(nizSvihGeometrija[i]);
          nizObradjenihVodova.push(nizSvihGeometrija[i]);
        }
      }
    }

    //Ukloniti obrađene vodove iz niza svih geometrija za sljedeći korak
    for (let i = 0; i < nizPodredjenihVodova.length; i++) {
      let indexElementaZaUklanjanje = nizSvihGeometrija.indexOf(nizPodredjenihVodova[i]);
      if (indexElementaZaUklanjanje >= 0) {
        //Prikazuje par vodova koji se nadovezuju
        console.log(nizTrenutnihVodova[0].values_.name, nizSvihGeometrija[indexElementaZaUklanjanje].values_.name);
        nizSvihGeometrija.splice(indexElementaZaUklanjanje, 1);
      }
    }

    if (nizTrenutnihVodova.length > 0) {
      //trenutnaGeometrija = nizTrenutnihVodova[0];
      nizTrenutnihVodova.splice(0, 1);
    }
    if (nizTrenutnihVodova.length == 0) {
      nizTrenutnihVodova = nizPodredjenihVodova.slice();
      nizPodredjenihVodova.length = 0;
      if (nizTrenutnihVodova.length == 0) {
        blnPostojeNepovezaniZapisi = false;
        console.log("neupareni", nizSvihGeometrija);
      }
    }
  }
}
