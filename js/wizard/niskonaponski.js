/**Metode za provjeru niskonaponskih objekata */

/**
 * Metoda koja za niz feature-a i početnu geometriju prati konektivnost i dodaje povezane objekte
 */
function povezivanjeNnVodovaTopDown(pocetna, features) {
  let nadredjenaLinijaFeature, podredjenaLinijaFeature;
  let nizSvihGeometrija = features.slice();
  let blnPostojeNepovezaniZapisi = nizSvihGeometrija.length > 0;
  let nizObradjenihVodova = []; //Završeni vodovi, na koje se više ne treba vraćati
  let nizTrenutnihVodova = []; //Vodovi od kojih treba dalje nastaviti obradu - konektivnost
  let nizPodredjenihVodova = []; //Vodovi koji su pronađeni u tekućem koraku obrade
  let writer = new ol.format.GeoJSON();
  let trenutnaGJ;
  let trenutniGeohash;
  console.log("pocetni objekat", pocetna);
  console.log("pocetne linije", features);

  //Metoda koja svim potrošačima dodjeljuje geohash_id_no od voda koji ga siječe
  presjekVodovaSaPotrosacimaPocetni();

  if (!pocetna || pocetna === undefined) {
    //napraviti geometriju iz promjenljivih: geometrijaNapojneTrafostanice i geohashNapojneTrafostanice
    let format = new ol.format.WKT();
    let geometrija = format.readFeature(geometrijaNapojneTrafostanice, {});
    trenutnaGJ = writer.writeFeatureObject(new ol.Feature(geometrija.getGeometry()));
    trenutniGeohash = geohashNapojneTrafostanice;
    //trenutniGeohash = generisiGeohashId("trafostanice", geometrijaNapojneTrafostanice);
  } /* else {
    let tempPosition = pocetna.geometry.coordinates;
    let point = new ol.Feature(new ol.geom.Point([tempPosition[0].toFixed(10), tempPosition[1].toFixed(10)]));
    trenutnaGJ = writer.writeFeatureObject(new ol.Feature(point.getGeometry()));
    trenutniGeohash = pocetna.values_.geohash_id;
  }*/
  console.log("geometrija trafostanice 444444", geometrijaNapojneTrafostanice);
  console.log("trenutni geohash 555555", trenutniGeohash);

  while (blnPostojeNepovezaniZapisi) {
    //
    if (nizTrenutnihVodova.length > 0) {
      trenutnaGJ = writer.writeFeatureObject(new ol.Feature(nizTrenutnihVodova[0].getGeometry()));
      console.log("vod za koji tražimo podređene vodove", nizTrenutnihVodova[0].values_.name);
      trenutniGeohash = nizTrenutnihVodova[0].values_.geohash_id;
      console.log(nizTrenutnihVodova[0].values_.name, nizTrenutnihVodova[0].values_.geohash_id);
      for (let j = 0; j < features.length; j++) {
        if (features[j].id_ === nizTrenutnihVodova[0].id_) {
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
              if (features[j].id_ === nizSvihGeometrija[i].id_) {
                podredjenaLinijaFeature = nizSvihGeometrija[i];
                podredjenaLinijaFeature.akcija = "Izmjena";
                features[j].akcija = "Izmjena";
                features[j].values_.geohash_id_no = trenutniGeohash;
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
              if (features[j].id_ === nizSvihGeometrija[i].id_) {
                podredjenaLinijaFeature = nizSvihGeometrija[i];
                podredjenaLinijaFeature.akcija = "Izmjena";
                features[j].akcija = "Izmjena";
                features[j].values_.geohash_id_no = trenutniGeohash;
              }
            }
            //Poziv metode za provjeru presjeka sa trafostanicama - ovo nije potrebno za niskonaponske vodove
            /*if (nadredjenaLinijaFeature && podredjenaLinijaFeature && nadredjenaLinijaFeature !== undefined && podredjenaLinijaFeature !== undefined) {
              presjekVodovaSaPrikljucnimMjestima(nadredjenaLinijaFeature, podredjenaLinijaFeature);
            }*/
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
        //Trebalo bi zamijeniti ovom if komandom:
        //if (nizTrenutnihVodova.length === 0 && nizSvihGeometrija.length > 0) {
        if (nizSvihGeometrija.length > 0) {
          blnOnemogucitiWizard = true;
          poruka("Upozorenje", "Postoje nepovezani vodovi");
          prekidWizarda();
        }
        blnPostojeNepovezaniZapisi = false;
        let vektorNeupareniVodovi1 = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: nizSvihGeometrija,
          }),
          style: vectorStyleUnmatched,
        });
        map.addLayer(vektorNeupareniVodovi1);
        //console.log("neupareni", vektorNeupareniVodovi1);
        document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
        document.querySelector("#divWizardUparivanjeVodova").style.display = "block";
      }
    }
  }
}

/**Metoda koja će svim trafostanicama dati da je geohash_id_no vrijednost iz voda koji je siječe. U metodi presjekVodovaSaTrafostanicama() se obrađuje slučaj kad više vodova presijeca istu trafostanicu */
function presjekVodovaSaPotrosacimaPocetni() {
  let writer = new ol.format.GeoJSON();

  for (let j = 0; j < selektovaniVodoviFeatures.length; j++) {
    for (let i = 0; i < selektovaniPotrosaciFeatures.length; i++) {
      let ptrosacGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniPotrosaciFeatures[i].getGeometry()));
      let vodGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniVodoviFeatures[j].getGeometry()));
      if (turf.pointToLineDistance(ptrosacGeometrija, vodGeometrija, { units: "kilometers" }) === 0) {
        selektovaniPotrosaciFeatures[i].akcija = "Izmjena";
        selektovaniPotrosaciFeatures[i].values_.geohash_id_no = selektovaniVodoviFeatures[j].values_.geohash_id;
      }
    }
  }
}

/**
 *Metoda koja za dvije linije/voda koji se sijeku provjerava da li se u toj tački nalazi i priključno mjesto
 * @param {*Linija koja je bliža napojnoj trafostanici} nadredjenaLinijaFeature
 * @param {*Linija koja je udaljenija od napojne trafostanice} podredjenaLinijaFeature
 */
function presjekVodovaSaPrikljucnimMjestima(nadredjenaLinijaFeature, podredjenaLinijaFeature) {
  let writer = new ol.format.GeoJSON();
  let nadredjenaGeometrija = writer.writeFeatureObject(new ol.Feature(nadredjenaLinijaFeature.getGeometry()));
  let podredjenaGeometrija = writer.writeFeatureObject(new ol.Feature(podredjenaLinijaFeature.getGeometry()));

  for (let i = 0; i < selektovanaPrikljucnaMjestaFeatures.length; i++) {
    let pmGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaneTrafostaniceFeatures[i].getGeometry()));
    if (
      turf.pointToLineDistance(pmGeometrija, nadredjenaGeometrija, { units: "kilometers" }) === 0 &&
      turf.pointToLineDistance(pmGeometrija, podredjenaGeometrija, { units: "kilometers" }) === 0
    ) {
      selektovanaPrikljucnaMjestaFeatures[i].akcija = "Izmjena";
      selektovanaPrikljucnaMjestaFeatures[i].values_.geohash_id_no = nadredjenaLinijaFeature.values_.geohash_id;
      podredjenaLinijaFeature.akcija = "Izmjena";
      podredjenaLinijaFeature.values_.geohash_id_no = selektovanaPrikljucnaMjestaFeatures[i].values_.geohash_id;
    }
  }
}
