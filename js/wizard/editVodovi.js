/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
let layernameVodovi = "vodovi",
  fulllayernameVodovi = "geonode:vodovi",
  layertitleVodovi = "vodovi";
let tipGeometrijeVodovi = lineString;
let opisSlikeVodovi = "";
let nizSelektovanihVodova = [];
let paroviVodova = [];

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

//document.querySelector("#selekecijaVodovaPoligon").addEventListener("click", vodoviUpoligonu);
//document.querySelector("#uparivanjeVodovaForma").addEventListener("click", prikazUparivanjeVodovaDiv);
//document.querySelector("#btnPoveziVodove").addEventListener("click", poveziVodove);
//document.querySelector("#btnOdabirNapojneTSVodovi").addEventListener("click", selektujNapojnuTS);
/*
//document.querySelector("#selekcijaNapojneTrafostanice").addEventListener("click", selektujNapojnuTS);
document.querySelector("#btnPoveziTS").addEventListener("click", poveziTS);

document.querySelector("#btnOdabirNapojneTS").style.display = "none";*/

function prikazUparivanjeVodovaDiv() {
  //vodoviIzBilignaZaUparivanje([2486, 2487]);
  showDiv("#povezivanjeVodovaDiv");
}

/**
 * Metoda koja za odabrani naponski nivo vraća sve vodove tog nivoa
 * @param {} napon
 */
function vodoviUpoligonu(napon) {
  let urlZaFilter =
    wfsUrl + "?version=1.0.0&request=GetFeature&typeName=" + fulllayernameVodovi + "&outputformat=application/json&cql_filter=" + globalCqlZaNaponskiNivo(napon, "vodovi");
  console.log("url filter", urlZaFilter);

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaniVodoviFeatures = new ol.format.GeoJSON().readFeatures(response);
      selektovaniVodoviFeatures3857 = new ol.format.GeoJSON().readFeatures(response);
      if (selektovaniVodoviFeatures.length === 0) {
        poruka("Upozorenje", "Nema vodova u odabranom zahvatu.");
        return false;
      } else {
        if (selektovaneTrafostaniceFeatures.length > 0) {
          provjeriTrafostanice();
        }
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

function vodoviUpoligonu_orig() {
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
        //povezivanjeVodova(featureNapojnaTrafostanica, naponskiNivoNapojneTrafostanice, features);
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
  let nizSvihGeometrija = features.slice();
  let blnPostojeNepovezaniZapisi = nizSvihGeometrija.length > 0;
  let nizObradjenihVodova = []; //Završeni vodovi, na koje se više ne treba vraćati
  let nizTrenutnihVodova = []; //Vodovi od kojih treba dalje nastaviti obradu - konektivnost
  let nizPodredjenihVodova = []; //Vodovi koji su pronađeni u tekućem koraku obrade
  let writer = new ol.format.GeoJSON();
  let trenutnaGJ;
  console.log("pocetni objekat", pocetna);
  console.log("pocetne linije", features);
  if (!pocetna) {
    //napraviti geometriju iz promjenljivih: geometrijaNapojneTrafostanice i geohashNapojneTrafostanice
    let format = new ol.format.WKT();
    let geometrija = format.readFeature(geometrijaNapojneTrafostanice, {});
    trenutnaGJ = writer.writeFeatureObject(new ol.Feature(geometrija.getGeometry()));
  } else {
    let tempPosition = pocetna.geometry.coordinates;
    let point = new ol.Feature(new ol.geom.Point([tempPosition[0].toFixed(10), tempPosition[1].toFixed(10)]));
    trenutnaGJ = writer.writeFeatureObject(new ol.Feature(point.getGeometry()));
  }
  console.log("trenutna geometrija 1111111", trenutnaGJ);

  nizSvihGeometrija.forEach((elem) => console.log("elementi početnog niza", elem.values_.name));
  nizSvihGeometrija.forEach((elem) => console.log("geometrije početnog niza vodova", elem.values_.geometry.flatCoordinates));

  while (blnPostojeNepovezaniZapisi) {
    //
    if (nizTrenutnihVodova.length > 0) {
      //trenutnaGJ = writer.writeFeatureObject(new ol.Feature(nizTrenutnihVodova[0].getGeometry().clone().transform("EPSG:3857", "EPSG:4326")));
      trenutnaGJ = writer.writeFeatureObject(new ol.Feature(nizTrenutnihVodova[0].getGeometry()));
    }

    if (nizTrenutnihVodova[0]) {
      console.log("vod za koji tražimo podređene vodove", nizTrenutnihVodova[0].values_.name);
    }
    for (let i = 0; i < nizSvihGeometrija.length; i++) {
      //let pojedinacnaLinijaTurf = writer.writeFeatureObject(new ol.Feature(nizSvihGeometrija[i].getGeometry().clone().transform("EPSG:3857", "EPSG:4326")));
      let pojedinacnaLinijaTurf = writer.writeFeatureObject(new ol.Feature(nizSvihGeometrija[i].getGeometry()));
      //Ne postoji funkcija za presjek linije i tačke pa se, ukoliko je prva linija tačka, koristi provjera da je udaljenost = 0
      if (trenutnaGJ.geometry.type === "Point") {
        if (turf.pointToLineDistance(trenutnaGJ, pojedinacnaLinijaTurf, { units: "kilometers" }) === 0) {
          if (nizObradjenihVodova.indexOf(nizSvihGeometrija[i]) < 0) {
            nizPodredjenihVodova.push(nizSvihGeometrija[i]);
            nizObradjenihVodova.push(nizSvihGeometrija[i]);
          }
        }
      } else {
        let presjek = turf.lineIntersect(pojedinacnaLinijaTurf, trenutnaGJ);
        if (presjek.features.length > 0) {
          //console.log("presijeca početni", nizSvihGeometrija[i]);
          if (nizObradjenihVodova.indexOf(nizSvihGeometrija[i]) < 0) {
            nizPodredjenihVodova.push(nizSvihGeometrija[i]);
            nizObradjenihVodova.push(nizSvihGeometrija[i]);
          }
        }
      }
    }

    //Ukloniti obrađene vodove iz niza svih geometrija za sljedeći korak
    for (let i = 0; i < nizPodredjenihVodova.length; i++) {
      let indexElementaZaUklanjanje = nizSvihGeometrija.indexOf(nizPodredjenihVodova[i]);
      if (indexElementaZaUklanjanje >= 0) {
        //Prikazuje par vodova koji se nadovezuju
        if (nizTrenutnihVodova.length === 0) {
          console.log("pocetna trafostanica", nizSvihGeometrija[indexElementaZaUklanjanje].values_.name);
        } else {
          console.log(nizTrenutnihVodova[0].values_.name, nizSvihGeometrija[indexElementaZaUklanjanje].values_.name);
        }

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
        let vektorNeupareniVodovi1 = new ol.layer.Vector({
          source: new ol.source.Vector({
            //features: selektovaniVodoviFeatures3857,
            features: selektovaniVodoviFeatures,
          }),
          style: vectorStyleUnmatched,
        });
        map.addLayer(vektorNeupareniVodovi1);
        console.log("neupareni", vektorNeupareniVodovi1);
        document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
        document.querySelector("#divWizardUparivanjeVodova").style.display = "block";
        /*console.log("neupareni", nizSvihGeometrija);
        
        //
        console.log("vodovi na mapi", vektorNeupareniVodovi);*/
        //vektorNeupareniVodovi.getSource().clear(); //Ispraznimo prethodne zapise
        //vektorNeupareniVodovi.getSource().addFeatures(nizSvihGeometrija);
      }
    }
  }
}

//TODO: Ako preostanu neupareni vodovi, šta raditi

/**
 * Metoda koja vrsi povezivanje (uparivanje) vodova iz ddl GIS-a i ddl iz TBP
 */
function poveziVodove() {
  if (!document.querySelector("#uparivanjeTxtNazivIzvodaTSVod").value) {
    alert("Potrebno je odabrati napojnu trafostanicu i izvod");
    return false;
  }
  let odabraniVodZaUparivanje = document.querySelector("#ddlPovezivanjeSelektovanihVodova").value;
  let vodIzSistema = document.querySelector("#ddlPovezivanjePronadjenihVodova").value;
  if (!odabraniVodZaUparivanje || !vodIzSistema) {
    alert("Potrebno je odabrati trafostanice iz oba sistema");
    return false;
  }
  for (let i = 0; i < document.querySelector("#ddlPovezivanjeSelektovanihVodova").length; i++) {
    if (document.querySelector("#ddlPovezivanjeSelektovanihVodova").options[i].value === vodIzSistema) {
      document.querySelector("#ddlPovezivanjeSelektovanihVodova").remove(i);
    }
  }
  for (let i = 0; i < document.querySelector("#ddlPovezivanjePronadjenihVodova").length; i++) {
    if (document.querySelector("#ddlPovezivanjePronadjenihVodova").options[i].value === vodIzSistema) {
      document.querySelector("#ddlPovezivanjePronadjenihVodova").remove(i);
    }
  }
  paroviVodova.push({ gis: odabranaTS, tbp: vodIzSistema });
  console.log("povezani vodovi", paroviVodova);
  if (document.querySelector("#ddlPovezivanjeSelektovanihVodova").length === 0 && document.querySelector("#ddlPovezivanjePronadjenihVodova").length === 0) {
    alert("Uspješno upareni svi vodovi: \n" + paroviVodova.join(",") + "\n Prelazak na sljedeći korak wizard-a");
    console.log("Uspješno upareni svi vodovi:", paroviVodova);
  }
}
