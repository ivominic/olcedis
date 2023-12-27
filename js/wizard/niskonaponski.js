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
  console.log(pocetna, features);

  if (!pocetna || pocetna === undefined) {
    //napraviti geometriju iz promjenljivih: geometrijaNapojneTrafostanice i geohashNapojneTrafostanice
    let format = new ol.format.WKT();
    let geometrija = format.readFeature(geometrijaNapojneTrafostanice, {});
    trenutnaGJ = writer.writeFeatureObject(new ol.Feature(geometrija.getGeometry()));
    trenutniGeohash = geohashNapojneTrafostanice;
  }
  console.log("geometrija trafostanice", geometrijaNapojneTrafostanice);
  console.log("trenutni geohash", trenutniGeohash);

  while (blnPostojeNepovezaniZapisi) {
    if (nizTrenutnihVodova.length > 0) {
      trenutnaGJ = writer.writeFeatureObject(new ol.Feature(nizTrenutnihVodova[0].getGeometry()));
      trenutniGeohash = nizTrenutnihVodova[0].values_.geohash_id;
      for (let j = 0; j < features.length; j++) {
        if (features[j].id_ === nizTrenutnihVodova[0].id_) {
          nadredjenaLinijaFeature = features[j];
        }
      }
    }
    for (let i = 0; i < nizSvihGeometrija.length; i++) {
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
        console.log("PRESJEK");
        console.log(pojedinacnaLinijaTurf, trenutnaGJ);
        if (presjek.features.length > 0) {
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

            if (nadredjenaLinijaFeature && podredjenaLinijaFeature) {
              presjekVodovaSaPODovima(nadredjenaLinijaFeature, podredjenaLinijaFeature);
            }
          }
        }
      }
    }

    //Ukloniti obrađene vodove iz niza svih geometrija za sljedeći korak
    for (let i = 0; i < nizPodredjenihVodova.length; i++) {
      let indexElementaZaUklanjanje = nizSvihGeometrija.indexOf(nizPodredjenihVodova[i]);
      if (indexElementaZaUklanjanje >= 0) {
        //Prikazuje par vodova koji se nadovezuju
        /*if (nizTrenutnihVodova.length === 0) {
          console.log("pocetna trafostanica", nizSvihGeometrija[indexElementaZaUklanjanje].values_.name);
        } else {
          console.log(nizTrenutnihVodova[0].values_.name, nizSvihGeometrija[indexElementaZaUklanjanje].values_.name);
        }*/
        nizSvihGeometrija.splice(indexElementaZaUklanjanje, 1);
      }
    }

    if (nizTrenutnihVodova.length > 0) {
      nizTrenutnihVodova.splice(0, 1);
    }
    if (nizTrenutnihVodova.length == 0) {
      nizTrenutnihVodova = nizPodredjenihVodova.slice();
      nizPodredjenihVodova.length = 0;
      if (nizTrenutnihVodova.length == 0) {
        if (nizSvihGeometrija.length > 0) {
          blnOnemogucitiWizard = true;
          prikazNepravilnihObjekataNaMapi(nizSvihGeometrija);
          brisanje();
          poruka(StatusPoruke.Upozorenje, WizardPoruke.PostojeneNepovezaniVodovi);
          prekidWizarda();
        }
        //TODO: Provjeriti ovaj prikaz divova, djeluje da ne treba tako da funkcioniše nakon što se utvrdi nepravilnost podataka.
        console.log("PREKID WIZARD", blnOnemogucitiWizard);
        blnPostojeNepovezaniZapisi = false;
        //prikaziCetvrtuFormuWizarda();
        document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = nazivNapojneTrafostanice;
        document.querySelector("#uparivanjeTxtSifraTS").textContent = sifraNapojneTrafostanice;
        let opt = document.createElement("option");
        opt.value = izvodNapojneTrafostanice;
        opt.innerHTML = izvodNapojneTrafostanice;
        document.querySelector("#uparivanjeTxtNazivIzvodaTS").appendChild(opt);
        document.querySelector("#wizardHeader").innerText = treciKorakWizarda;
        document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
        document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "block";
        //document.querySelector("#divWizardUparivanjeVodova").style.display = "block";
      }
    }
  }

  //Metoda koja svim potrošačima dodjeljuje geohash_id_no od voda koji ga siječe
  presjekVodovaSaPotrosacimaPocetni();
  presjekVodovaSaPodIPrikljMj();
  prekidZbogNepovezanostiObjekataNn();
  presjekVodovaSaStubovima();
  console.log("VODOVI", selektovaniVodoviFeatures);
  console.log("PODOVI", selektovaniPODoviFeatures);
  console.log("POTROSACI", selektovaniPotrosaciFeatures);
  console.log("PM", selektovanaPrikljucnaMjestaFeatures);
  console.log("KRAJ");
}

/**Metoda koja će svim stubovima dati da je geohash_id_no vrijednost iz voda koji je siječe.*/
function presjekVodovaSaStubovima() {
  let writer = new ol.format.GeoJSON();

  for (let j = 0; j < selektovaniVodoviFeatures.length; j++) {
    for (let i = 0; i < selektovaniStuboviFeatures.length; i++) {
      let stubGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniStuboviFeatures[i].getGeometry()));
      let vodGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniVodoviFeatures[j].getGeometry()));
      if (turf.pointToLineDistance(stubGeometrija, vodGeometrija, { units: "kilometers" }) === 0) {        
        selektovaniStuboviFeatures[i].akcija = "Izmjena";
        selektovaniStuboviFeatures[i].values_.geohash_id_no = selektovaniVodoviFeatures[j].values_.geohash_id;
      }
    }
  }
}

/**Metoda koja će svim trafostanicama dati da je geohash_id_no vrijednost iz voda koji je siječe.
 *U metodi presjekVodovaSaTrafostanicama() se obrađuje slučaj kad više vodova presijeca istu trafostanicu */
function presjekVodovaSaPotrosacimaPocetni() {
  let writer = new ol.format.GeoJSON();

  for (let j = 0; j < selektovaniVodoviFeatures.length; j++) {
    for (let i = 0; i < selektovaniPotrosaciFeatures.length; i++) {
      let potrosacGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniPotrosaciFeatures[i].getGeometry()));
      let vodGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniVodoviFeatures[j].getGeometry()));
      if (turf.pointToLineDistance(potrosacGeometrija, vodGeometrija, { units: "kilometers" }) === 0) {
        selektovaniPotrosaciFeatures[i].povezanostVod = true;
        selektovaniPotrosaciFeatures[i].akcija = "Izmjena";
        selektovaniPotrosaciFeatures[i].values_.geohash_id_no = selektovaniVodoviFeatures[j].values_.geohash_id;
      }
    }
  }
}

/**
 * Metoda koja za dvije linije/voda koji se sijeku provjerava da li se u toj tački nalazi i priključno mjesto
 * @param {*Linija koja je bliža napojnoj trafostanici} nadredjenaLinijaFeature
 * @param {*Linija koja je udaljenija od napojne trafostanice} podredjenaLinijaFeature
 */
function presjekVodovaSaPODovima(nadredjenaLinijaFeature, podredjenaLinijaFeature) {
  let writer = new ol.format.GeoJSON();
  let nadredjenaGeometrija = writer.writeFeatureObject(new ol.Feature(nadredjenaLinijaFeature.getGeometry()));
  let podredjenaGeometrija = writer.writeFeatureObject(new ol.Feature(podredjenaLinijaFeature.getGeometry()));

  for (let i = 0; i < selektovaniPODoviFeatures.length; i++) {
    let pmGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniPODoviFeatures[i].getGeometry()));
    if (
      turf.pointToLineDistance(pmGeometrija, nadredjenaGeometrija, { units: "kilometers" }) === 0 &&
      turf.pointToLineDistance(pmGeometrija, podredjenaGeometrija, { units: "kilometers" }) === 0
    ) {
      selektovaniPODoviFeatures[i].akcija = "Izmjena";
      selektovaniPODoviFeatures[i].values_.geohash_id_no = nadredjenaLinijaFeature.values_.geohash_id;
      podredjenaLinijaFeature.akcija = "Izmjena";
      podredjenaLinijaFeature.values_.geohash_id_no = selektovaniPODoviFeatures[i].values_.geohash_id;
    }
  }
  for (let i = 0; i < selektovanaPrikljucnaMjestaFeatures.length; i++) {
    let pmGeometrija = writer.writeFeatureObject(new ol.Feature(selektovanaPrikljucnaMjestaFeatures[i].getGeometry()));
    if (
      turf.pointToLineDistance(pmGeometrija, nadredjenaGeometrija, { units: "kilometers" }) === 0 &&
      turf.pointToLineDistance(pmGeometrija, podredjenaGeometrija, { units: "kilometers" }) === 0
    ) {
      selektovanaPrikljucnaMjestaFeatures[i].akcija = "Izmjena";
      selektovanaPrikljucnaMjestaFeatures[i].values_.geohash_id_no = nadredjenaLinijaFeature.values_.geohash_id;
    }
  }
}

/**
 * Vrši provjeru da li podovi i priključna mjesta pripadaju linijama voda, da li se poklapa lokacija PODa i priključnog mjesta.
 * Provjerava da li se poklapa lokacija PODa i potrošača, i ako je tako, geohash poda postaje geohsh_no potrošača.
 */
function presjekVodovaSaPodIPrikljMj() {
  let writer = new ol.format.GeoJSON();

  for (let j = 0; j < selektovaniVodoviFeatures.length; j++) {
    for (let i = 0; i < selektovaniPODoviFeatures.length; i++) {
      let podGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniPODoviFeatures[i].getGeometry()));
      let vodGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniVodoviFeatures[j].getGeometry()));
      if (turf.pointToLineDistance(podGeometrija, vodGeometrija, { units: "kilometers" }) === 0) {
        selektovaniPODoviFeatures[i].povezanostVod = true;
        selektovaniPODoviFeatures[i].akcija = "Izmjena";
      }
    }

    for (let i = 0; i < selektovanaPrikljucnaMjestaFeatures.length; i++) {
      let pmGeometrija = writer.writeFeatureObject(
        new ol.Feature(selektovanaPrikljucnaMjestaFeatures[i].getGeometry())
      );
      let vodGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniVodoviFeatures[j].getGeometry()));
      if (turf.pointToLineDistance(pmGeometrija, vodGeometrija, { units: "kilometers" }) === 0) {
        selektovanaPrikljucnaMjestaFeatures[i].povezanostVod = true;
        selektovanaPrikljucnaMjestaFeatures[i].akcija = "Izmjena";
      }
    }
  }

  for (let j = 0; j < selektovanaPrikljucnaMjestaFeatures.length; j++) {
    for (let i = 0; i < selektovaniPODoviFeatures.length; i++) {
      let podGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniPODoviFeatures[i].getGeometry()));
      let pmGeometrija = writer.writeFeatureObject(
        new ol.Feature(selektovanaPrikljucnaMjestaFeatures[j].getGeometry())
      );
      if (turf.distance(podGeometrija, pmGeometrija, { units: "kilometers" }) === 0) {
        if (selektovaniPODoviFeatures[i].values_.prik_mjesto == selektovanaPrikljucnaMjestaFeatures[j].values_.id) {
          selektovaniPODoviFeatures[i].akcija = "Izmjena";
          selektovanaPrikljucnaMjestaFeatures[j].akcija = "Izmjena";
          selektovaniPODoviFeatures[i].povezanostPM = true;
          selektovanaPrikljucnaMjestaFeatures[j].povezanostPOD = true;
        }
      }
    }
  }

  for (let j = 0; j < selektovaniPotrosaciFeatures.length; j++) {
    for (let i = 0; i < selektovaniPODoviFeatures.length; i++) {
      let podGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniPODoviFeatures[i].getGeometry()));
      let potrosacGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniPotrosaciFeatures[j].getGeometry()));
      if (turf.distance(podGeometrija, potrosacGeometrija, { units: "kilometers" }) === 0) {
        if (selektovaniPODoviFeatures[i].values_.pod == selektovaniPotrosaciFeatures[j].values_.pod) {
          selektovaniPotrosaciFeatures[j].akcija = "Izmjena";
          selektovaniPotrosaciFeatures[j].values_.geohash_id_no = selektovaniPODoviFeatures[i].values_.geohash_id;
        }
      }
    }
  }
}

/**
 * Metoda koja provjerava da li, nakon obrade, postoje objekti 0.4 nivoa, koji nisu povezani sa ostatkom mreže traforeona.
 * @returns true ako postoje nepovezani objekti, false ako je sve iscrtano kako treba
 */
function prekidZbogNepovezanostiObjekataNn() {
  let prekid = false;
  let message = "";
  let nizNepovezanihPotrosaca = [],
    nizNepovezanihPODova = [],
    nizNepovezanihPMa = [];

  console.log("POČETAK PREKIDA");
  for (let i = 0; i < selektovaniPotrosaciFeatures.length; i++) {
    if (!selektovaniPotrosaciFeatures[i].povezanostVod || selektovaniPotrosaciFeatures[i].povezanostVod !== true) {
      nizNepovezanihPotrosaca.push(selektovaniPotrosaciFeatures[i]);
    }
  }
  for (let i = 0; i < selektovaniPODoviFeatures.length; i++) {
    if (!selektovaniPODoviFeatures[i].povezanostVod || selektovaniPODoviFeatures[i].povezanostVod !== true) {
      nizNepovezanihPODova.push(selektovaniPODoviFeatures[i]);
    }
  }

  for (let i = 0; i < selektovanaPrikljucnaMjestaFeatures.length; i++) {
    if (
      !selektovanaPrikljucnaMjestaFeatures[i].povezanostVod ||
      selektovanaPrikljucnaMjestaFeatures[i].povezanostVod !== true
    ) {
      nizNepovezanihPMa.push(selektovanaPrikljucnaMjestaFeatures[i]);
    }
  }

  if (nizNepovezanihPotrosaca.length > 0) {
    message += "Postoje potrošači do kojih ne dolazi vod.\n";
    prikazNepravilnihObjekataNaMapi(nizNepovezanihPotrosaca);
    prekid = true;
  }
  if (nizNepovezanihPODova.length > 0) {
    message += "Postoje PODovi do kojih ne dolazi vod.\n";
    prikazNepravilnihObjekataNaMapi(nizNepovezanihPODova);
    prekid = true;
  }
  if (nizNepovezanihPMa.length > 0) {
    message += "Postoje priključna mjesta do kojih ne dolazi vod.\n";
    prikazNepravilnihObjekataNaMapi(nizNepovezanihPMa);
    prekid = true;
  }

  if (prekid) {
    blnOnemogucitiWizard = true;
    alert(message);
    prekidWizarda();
    brisanje();
  }
  return prekid;
}

/**
 * Dodaje niz featura, koje nisu prošle provjere povezanosti, u vektorski lejer koji će biti prikazan na mapi.
 * @param {} nepravilniFeatures
 */
function prikazNepravilnihObjekataNaMapi(nepravilniFeatures) {
  map.addLayer(
    new ol.layer.Vector({
      source: new ol.source.Vector({
        features: nepravilniFeatures,
      }),
      style: vectorStyleUnmatched,
    })
  );
}
