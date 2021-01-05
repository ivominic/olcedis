/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
let layernameVodovi = "vodovi",
  fulllayernameVodovi = "geonode:vodovi",
  layertitleVodovi = "vodovi";
let tipGeometrijeVodovi = lineString;
let opisSlikeVodovi = "";
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

//document.querySelector("#selekecijaVodovaPoligon").addEventListener("click", vodoviUpoligonu);
//document.querySelector("#uparivanjeVodovaForma").addEventListener("click", prikazUparivanjeVodovaDiv);
document.querySelector("#btnPoveziVodove").addEventListener("click", poveziVodove);
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

/**
 * Metoda koja za niz feature-a i početni feature prati konektivnost i dodaje povezane objekte
 */
function povezivanjeVodova(pocetna, features) {
  let nadredjenaLinijaFeature, podredjenaLinijaFeature;
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
      console.log("vod za koji tražimo podređene vodove", nizTrenutnihVodova[0].values_.name);
      for (let j = 0; j < features.length; j++) {
        if (features[j].id === nizTrenutnihVodova[0].id) {
          nadredjenaLinijaFeature = features[j];
        }
      }
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
            for (let j = 0; j < features.length; j++) {
              if (features[j].id === nizSvihGeometrija[i].id) {
                podredjenaLinijaFeature = nizSvihGeometrija[i];
                podredjenaLinijaFeature.akcija = "Izmjena";
                podredjenaLinijaFeature.values_.geohash_id_no = nizSvihGeometrija[i].values_.geohash_id;
              }
            }
          }
        }
      } else {
        let presjek = turf.lineIntersect(pojedinacnaLinijaTurf, trenutnaGJ);
        if (presjek.features.length > 0) {
          //console.log("presijeca početni", nizSvihGeometrija[i]);
          if (nizObradjenihVodova.indexOf(nizSvihGeometrija[i]) < 0) {
            nizPodredjenihVodova.push(nizSvihGeometrija[i]);
            nizObradjenihVodova.push(nizSvihGeometrija[i]);
            for (let j = 0; j < features.length; j++) {
              if (features[j].id === nizSvihGeometrija[i].id) {
                podredjenaLinijaFeature = nizSvihGeometrija[i];
                podredjenaLinijaFeature.akcija = "Izmjena";
                podredjenaLinijaFeature.values_.geohash_id_no = nizSvihGeometrija[i].values_.geohash_id;
              }
            }
            //Poziv metode za provjeru presjeka sa trafostanicama
            presjekVodovaSaTrafostanicama(nadredjenaLinijaFeature, podredjenaLinijaFeature);
          }
        }
      }
    }

    //TODO: Ako postoje podređena i nadređena linija feature, provjeriti da li su obje u presjeku sa nekom trafostanicom
    //Ako jesu, trafostanica dobija geohash_id_no od nadređene linije, a podređena dobija geohash nadređenog voda ili početne trafostanice

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
 * Metoda koja vrši uparivanje vodova iz dvije padajuće liste
 */
function poveziVodove() {
  let odabraniVod = document.querySelector("#ddlPovezivanjeVodovaSelektovane").value;
  let vodIzSistema = document.querySelector("#ddlPovezivanjeVodovaPronadjene").value;
  if (!odabraniVod || !vodIzSistema) {
    alert("Potrebno je odabrati vodove iz oba sistema");
    return false;
  }
  for (let i = 0; i < document.querySelector("#ddlPovezivanjeVodovaSelektovane").length; i++) {
    if (document.querySelector("#ddlPovezivanjeVodovaSelektovane").options[i].value === odabraniVod) {
      document.querySelector("#ddlPovezivanjeVodovaSelektovane").remove(i);
    }
  }
  for (let i = 0; i < document.querySelector("#ddlPovezivanjeVodovaPronadjene").length; i++) {
    if (document.querySelector("#ddlPovezivanjeVodovaPronadjene").options[i].value === vodIzSistema) {
      document.querySelector("#ddlPovezivanjeVodovaPronadjene").remove(i);
    }
  }
  paroviVodova.push({ gis: odabraniVod, tbp: vodIzSistema });
  console.log("povezani vodovi", paroviVodova);
  //Kreiranje niza sa trafostanicama za koje je potrebno izvršiti izmjenu podataka
  for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
    if (odabraniVod === selektovaniVodoviFeatures[i].values_.originalId.toString()) {
      /*console.log("konkretni vod prije izmjena", selektovaniVodoviFeatures[i]);
      nizVodovaZaWebServis.push(selektovaniVodoviFeatures[i]);
      nizVodovaZaWebServis[nizVodovaZaWebServis.length - 1].akcija = "Izmjena";
      nizVodovaZaWebServis[nizVodovaZaWebServis.length - 1].values_.id_billing = vodIzSistema;
      nizVodovaZaWebServis[nizVodovaZaWebServis.length - 1].values_.sifra_napojne = sifraNapojneTrafostanice;
      nizVodovaZaWebServis[nizVodovaZaWebServis.length - 1].values_.napojna_ts = nazivNapojneTrafostanice;
      nizVodovaZaWebServis[nizVodovaZaWebServis.length - 1].values_.izvod_napojne = izvodNapojneTrafostanice;
      console.log("konkretni vod nakon izmjene", nizVodovaZaWebServis[nizVodovaZaWebServis.length - 1]);*/
      selektovaniVodoviFeatures[i].akcija = "Izmjena";
      selektovaniVodoviFeatures[i].values_.id_billing = vodIzSistema;
      selektovaniVodoviFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
      selektovaniVodoviFeatures[i].values_.napojna_ts = nazivNapojneTrafostanice;
      selektovaniVodoviFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
    }
  }
  if (document.querySelector("#ddlPovezivanjeVodovaSelektovane").length === 0 && document.querySelector("#ddlPovezivanjeVodovaPronadjene").length === 0) {
    alert("Uspješno upareni svi vodovi: \n" + paroviVodova.join(",") + "\n Prelazak na sljedeći korak wizard-a");
    console.log("Uspješno upareni svi vodovi:", paroviVodova);
    //TODO: Prelazak na sljedeći korak
    blnZavrsenoUparivanjeVodova = true;
    //document.querySelector("#wizardHeader").inneText = cetvrtiKorakWizarda;
    //document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
    //document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "block";
    //prikaziCetvrtuFormuWizarda();
  }
  //TODO: Dodati da se predaje i izvod trafostanice, prilikom slanja podataka ka web servisu
}

document.querySelector("#ddlPovezivanjeVodovaSelektovane").addEventListener("change", function () {
  console.log("odabrani vod", this.value);
  for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
    console.log("originalId", selektovaniVodoviFeatures[i].values_.originalId);
    if (this.value === selektovaniVodoviFeatures[i].values_.originalId.toString()) {
      console.log("feature id", selektovaniVodoviFeatures[i].id_);
      //let featureZaTransofrmaciju = Object.assign({}, selektovaneTSfeatures[i]);
      let featureZaTransofrmaciju = selektovaniVodoviFeatures[i].clone();
      map.getView().fit(featureZaTransofrmaciju.getGeometry(), { maxZoom: 20 });
    }
  }
});

/**
 *Metoda koja za dvije linije/voda koji se sijeku provjerava da li se u toj tački nalazi i trafostanica i određuje odgovarajuće geohash id no
 * @param {*Linija koja je bliža napojnoj trafostanici} nadredjenaLinijaFeature
 * @param {*Linija koja je udaljenija od napojne trafostanice} podredjenaLinijaFeature
 */
function presjekVodovaSaTrafostanicama(nadredjenaLinijaFeature, podredjenaLinijaFeature) {
  let writer = new ol.format.GeoJSON();
  let nadredjenaGeometrija = writer.writeFeatureObject(new ol.Feature(nadredjenaLinijaFeature.getGeometry()));
  let podredjenaGeometrija = writer.writeFeatureObject(new ol.Feature(podredjenaLinijaFeature.getGeometry()));

  for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
    let trafostanicaGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaneTrafostaniceFeatures[i].getGeometry()));
    if (trafostanicaGeometrija.geometry.type === "Point") {
      if (
        turf.pointToLineDistance(trafostanicaGeometrija, nadredjenaGeometrija, { units: "kilometers" }) === 0 &&
        turf.pointToLineDistance(trafostanicaGeometrija, podredjenaGeometrija, { units: "kilometers" }) === 0
      ) {
        selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
        selektovaneTrafostaniceFeatures[i].values_.geohash_id_no = nadredjenaLinijaFeature.values_.geohash_id;
        podredjenaLinijaFeature.akcija = "Izmjena";
        podredjenaLinijaFeature.values_.geohash_id_no = selektovaneTrafostaniceFeatures[i].values_.geohash_id;
      }
    } else {
      if (turf.lineIntersect(nadredjenaGeometrija, trafostanicaGeometrija) && turf.lineIntersect(podredjenaGeometrija, trafostanicaGeometrija)) {
        selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
        selektovaneTrafostaniceFeatures[i].values_.geohash_id_no = nadredjenaLinijaFeature.values_.geohash_id;
        podredjenaLinijaFeature.akcija = "Izmjena";
        podredjenaLinijaFeature.values_.geohash_id_no = selektovaneTrafostaniceFeatures[i].values_.geohash_id;
      }
    }

    if (odabranaTS === selektovaneTrafostaniceFeatures[i].values_.originalId.toString()) {
      selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
      selektovaneTrafostaniceFeatures[i].values_.id_billing = tsIzSistema;
      selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.napojna_ts = nazivNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
    }
  }
}
