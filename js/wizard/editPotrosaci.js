/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */

let layernamePotrosaci = "view_potrosaci",
  fulllayernamePotrosaci = "geonode:view_potrosaci",
  layertitlePotrosaci = "view_potrosaci";
let tipGeometrijePotrosaci = point;

let wmsPotrosaci = new ol.layer.Image({
  title: layertitlePotrosaci,
  name: layernamePotrosaci,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernamePotrosaci,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

map.addLayer(wmsPotrosaci);
//console.log("dodao lejer na mapu");

/*document.querySelector("#selekecijaTrafostanicaPoligon").addEventListener("click", trafostaniceUpoligonu);
document.querySelector("#uparivanjeTrafostanica").addEventListener("click", prikazUparivanje);
document.querySelector("#btnPoveziTS").addEventListener("click", poveziTS);
document.querySelector("#btnOdabirNapojneTS").addEventListener("click", selektujNapojnuTS);
document.querySelector("#btnOdabirNapojneTS").style.display = "none";*/

/**
 * Metoda koja vrši provjeru da li su svi selektovan potrošači sa istog izvoda trafostanice
 */
function provjeriPotrosace() {
  if (selektovaniPotrosaciFeatures.length === 0) {
    poruka("Upozorenje", "Ne postoji nijedan potrošač u odabranom zahvatu.");
    return false;
  }
  let razliciteSifre = [],
    razlicitiIzvodi = [];
  let retVal = true;
  let tempSifraTS = selektovaniPotrosaciFeatures[0].values_.sifra_ts,
    tempNazivTS = selektovaniPotrosaciFeatures[0].values_.naziv_ts,
    tempIzvodTS = selektovaniPotrosaciFeatures[0].values_.naziv_nn_izvod;
  razliciteSifre.push(tempSifraTS);
  razlicitiIzvodi.push(tempIzvodTS);
  //Provjera da li neki od potrošača ima različit izvod ili trafostanicu od početnog potrošača
  for (let i = 0; i < selektovaniPotrosaciFeatures.length; i++) {
    if (
      tempSifraTS !== selektovaniPotrosaciFeatures[i].values_.sifra_ts ||
      tempNazivTS !== selektovaniPotrosaciFeatures[i].values_.naziv_ts ||
      tempIzvodTS !== selektovaniPotrosaciFeatures[i].values_.naziv_nn_izvod
    ) {
      !razliciteSifre.includes(selektovaniPotrosaciFeatures[i].values_.sifra_ts) && razliciteSifre.push(selektovaniPotrosaciFeatures[i].values_.sifra_ts);
      !razlicitiIzvodi.includes(selektovaniPotrosaciFeatures[i].values_.naziv_nn_izvod) && razliciteSifre.push(selektovaniPotrosaciFeatures[i].values_.naziv_nn_izvod);
      //console.log("provjeriPotrosace prekidWizarda", selektovaniPotrosaciFeatures[i]);
      retVal = false;
    }
  }
  //Ako je false, prekinuti wizard
  if (!retVal) {
    console.log("Ne napajaju se svi sa istog izvoda trafostanice: ", razliciteSifre.join(",") + "***" + razlicitiIzvodi.join(","));
    alert("U zahvatu se nalaze objekti koji se napajaju sa različitih izvoda \nŠifre trafostanica: " + razliciteSifre.join(",") + "\nIzvodi: " + razlicitiIzvodi.join(","));
    prekidWizarda();
  }
  return retVal;
}

/**
 * Metoda koja za odabrani naponski nivo vraća sve potrošača tog nivoa
 * @param {} napon
 */
function potrosaciUpoligonu(napon) {
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernamePotrosaci +
    "&outputformat=application/json&cql_filter=" +
    globalCqlZaNaponskiNivo(napon, "view_potrosaci");
  console.log("url filter", urlZaFilter);

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaniPotrosaciFeatures = new ol.format.GeoJSON().readFeatures(response);
      if (selektovaniPotrosaciFeatures.length === 0) {
        //poruka("Upozorenje", "Nema potrošača u odabranom zahvatu.");
        return false;
      } else {
        if (selektovaniPotrosaciFeatures.length > 0) {
          provjeriPotrosace();
        }
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/**
 * Metoda koja za niz potrosaca i vodova prati konektivnost i dodaje povezane objekte
 */
function povezivanjePotrosacaVodova(potrosaci, vodovi) {
  let nadredjenaLinijaFeature, podredjenaLinijaFeature;
  let nizSvihGeometrija = vodovi.slice();
  let blnPostojeNepovezaniZapisi = nizSvihGeometrija.length > 0;
  let nizObradjenihVodova = []; //Završeni vodovi, na koje se više ne treba vraćati
  let nizTrenutnihVodova = []; //Vodovi od kojih treba dalje nastaviti obradu - konektivnost
  let nizPodredjenihVodova = []; //Vodovi koji su pronađeni u tekućem koraku obrade
  let writer = new ol.format.GeoJSON();
  let trenutnaGJ;

  for (let j = 0; j < potrosaci.length; j++) {
    //Povezivanje sa potrošačima
    trenutnaGJ = writer.writeFeatureObject(new ol.Feature(potrosaci[j].getGeometry()));
    for (let i = 0; i < nizSvihGeometrija.length; i++) {
      let pojedinacnaLinijaTurf = writer.writeFeatureObject(new ol.Feature(nizSvihGeometrija[i].getGeometry()));
      //Ne postoji funkcija za presjek linije i tačke pa se, ukoliko je prva linija tačka, koristi provjera da je udaljenost = 0
      if (turf.pointToLineDistance(trenutnaGJ, pojedinacnaLinijaTurf, { units: "kilometers" }) === 0) {
        if (nizObradjenihVodova.indexOf(nizSvihGeometrija[i]) < 0) {
          nizPodredjenihVodova.push(nizSvihGeometrija[i]);
          nizObradjenihVodova.push(nizSvihGeometrija[i]);
          console.log("povezivanjePotrošačaVodova - potrošač", potrosaci[j].values_.name);
          console.log("povezivanjePotrošačaVodova - vodovi", vodovi[i].values_.name);
          if (potrosaci[j].values_.geohash_id_no !== nizSvihGeometrija[i].values_.geohash_id) {
            potrosaci[j].akcija = "Izmjena";
            potrosaci[j].values_.geohash_id_no = nizSvihGeometrija[i].values_.geohash_id;
          }
          if (
            vodovi[i].values_.sifra_ts !== potrosaci[j].values_.sifra_ts ||
            vodovi[i].values_.naziv_ts !== potrosaci[j].values_.naziv_ts ||
            vodovi[i].values_.naziv_nn_izvod !== potrosaci[j].values_.naziv_nn_izvod
          ) {
            vodovi[i].akcija = "Izmjena";
            vodovi[i].values_.sifra_ts = potrosaci[j].values_.sifra_ts;
            vodovi[i].values_.naziv_ts = potrosaci[j].values_.naziv_ts;
            vodovi[i].values_.naziv_nn_izvod = potrosaci[j].values_.naziv_nn_izvod;
          }
        }
      }
    }
  }

  //Ukloniti obrađene vodove iz niza svih geometrija za sljedeći korak
  for (let i = 0; i < nizPodredjenihVodova.length; i++) {
    let indexElementaZaUklanjanje = nizSvihGeometrija.indexOf(nizPodredjenihVodova[i]);
    if (indexElementaZaUklanjanje >= 0) {
      nizSvihGeometrija.splice(indexElementaZaUklanjanje, 1);
    }
  }

  //U prethodnom dijelu je završen dio sa prenosom podataka od potrošača do prvog voda. Dalje radimo presjeke vodova bližih potrošaču sa nadređenim vodom
  nizTrenutnihVodova = nizPodredjenihVodova.slice();
  nizPodredjenihVodova.length = 0;
  if (blnPostojeNepovezaniZapisi && nizTrenutnihVodova.length === 0) {
    poruka("Upozorenje", "Nijedan vod nije povezan sa selektovanim potrošačima");
    prekidWizarda();
    return false;
  }

  nizSvihGeometrija.forEach((elem) => console.log("elementi početnog niza potrošači", elem.values_.name));
  nizSvihGeometrija.forEach((elem) => console.log("geometrije početnog niza vodova potrošači", elem.values_.geometry.flatCoordinates));

  while (blnPostojeNepovezaniZapisi) {
    if (nizTrenutnihVodova.length > 0) {
      trenutnaGJ = writer.writeFeatureObject(new ol.Feature(nizTrenutnihVodova[0].getGeometry()));
      console.log("vod za koji tražimo podređene vodove", nizTrenutnihVodova[0].values_.name);
      for (let j = 0; j < vodovi.length; j++) {
        if (vodovi[j].id === nizTrenutnihVodova[0].id) {
          nadredjenaLinijaFeature = vodovi[j]; //nadređena linija je u ovom slučaju bliža potrošaču, što bi značilo da je podređena u praksi
        }
      }
    }
    for (let i = 0; i < nizSvihGeometrija.length; i++) {
      let pojedinacnaLinijaTurf = writer.writeFeatureObject(new ol.Feature(nizSvihGeometrija[i].getGeometry()));

      let presjek = turf.lineIntersect(pojedinacnaLinijaTurf, trenutnaGJ);
      if (presjek.features.length > 0) {
        //Ignorisati ukoliko se radi o istoj liniji ili spoju dvije već obrađene linije
        if (nizObradjenihVodova.indexOf(nizSvihGeometrija[i]) < 0) {
          nizPodredjenihVodova.push(nizSvihGeometrija[i]);
          nizObradjenihVodova.push(nizSvihGeometrija[i]);
          for (let j = 0; j < vodovi.length; j++) {
            if (vodovi[j].id === nizSvihGeometrija[i].id) {
              podredjenaLinijaFeature = nizSvihGeometrija[i];
              podredjenaLinijaFeature.akcija = "Izmjena";
              podredjenaLinijaFeature.values_.geohash_id_no = nizSvihGeometrija[i].values_.geohash_id;
              podredjenaLinijaFeature.values_.sifra_ts = nizSvihGeometrija[i].values_.sifra_ts;
              podredjenaLinijaFeature.values_.naziv_ts = nizSvihGeometrija[i].values_.naziv_ts;
              podredjenaLinijaFeature.values_.naziv_nn_izvod = nizSvihGeometrija[i].values_.naziv_nn_izvod;
            }
          }
        }
      }
    }

    //Ukloniti obrađene vodove iz niza svih geometrija za sljedeći korak
    for (let i = 0; i < nizPodredjenihVodova.length; i++) {
      let indexElementaZaUklanjanje = nizSvihGeometrija.indexOf(nizPodredjenihVodova[i]);
      if (indexElementaZaUklanjanje >= 0) {
        nizSvihGeometrija.splice(indexElementaZaUklanjanje, 1);
      }
    }

    if (nizTrenutnihVodova.length > 0) {
      nizTrenutnihVodova.splice(0, 1);
    }
    if (nizTrenutnihVodova.length === 0) {
      nizTrenutnihVodova = nizPodredjenihVodova.slice();
      nizPodredjenihVodova.length = 0;
      if (nizTrenutnihVodova.length === 0 && nizSvihGeometrija.length > 0) {
        blnPostojeNepovezaniZapisi = false;
        let vektorNeupareniVodovi1 = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: nizSvihGeometrija,
          }),
          style: vectorStyleUnmatched,
        });
        map.addLayer(vektorNeupareniVodovi1);
        console.log("neupareni", vektorNeupareniVodovi1);
        document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
        document.querySelector("#divWizardUparivanjeVodova").style.display = "block";
        poruka("Upozorenje", "Postoje vodovi koji nisu povezani sa potrošačima.");
        prekidWizarda();
      }
    }
  }
}

function nnPrenosTrafostanica(sifra, naziv, izvod) {
  for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
    if (
      selektovaniVodoviFeatures[i].values_.sifra_napojne !== sifra ||
      selektovaniVodoviFeatures[i].values_.naziv_napojne !== naziv ||
      selektovaniVodoviFeatures[i].values_.izvod_napojne !== izvod
    ) {
      selektovaniVodoviFeatures[i].values_.sifra_napojne = sifra;
      selektovaniVodoviFeatures[i].values_.naziv_napojne = naziv;
      selektovaniVodoviFeatures[i].values_.izvod_napojne = izvod;
      selektovaniVodoviFeatures[i].akcija = "Izmjena";
    }
  }
  for (let i = 0; i < selektovaniPODoviFeatures.length; i++) {
    if (
      selektovaniPODoviFeatures[i].values_.sifra_napojne !== sifra ||
      selektovaniPODoviFeatures[i].values_.naziv_napojne !== naziv ||
      selektovaniPODoviFeatures[i].values_.izvod_napojne !== izvod
    ) {
      selektovaniPODoviFeatures[i].values_.sifra_napojne = sifra;
      selektovaniPODoviFeatures[i].values_.naziv_napojne = naziv;
      selektovaniPODoviFeatures[i].values_.izvod_napojne = izvod;
      selektovaniPODoviFeatures[i].akcija = "Izmjena";
    }
  }
  for (let i = 0; i < selektovanaPrikljucnaMjestaFeatures.length; i++) {
    if (
      selektovanaPrikljucnaMjestaFeatures[i].values_.sifra_napojne !== sifra ||
      selektovanaPrikljucnaMjestaFeatures[i].values_.naziv_napojne !== naziv ||
      selektovanaPrikljucnaMjestaFeatures[i].values_.izvod_napojne !== izvod
    ) {
      selektovaniVodovselektovanaPrikljucnaMjestaFeaturesFeatures[i].values_.sifra_napojne = sifra;
      selektovanaPrikljucnaMjestaFeatures[i].values_.naziv_napojne = naziv;
      selektovanaPrikljucnaMjestaFeatures[i].values_.izvod_napojne = izvod;
      selektovanaPrikljucnaMjestaFeatures[i].akcija = "Izmjena";
    }
  }
}

/** */
function povezivanjeNiskonaponskihObjekata() {
  if (selektovaniPotrosaciFeatures.length === 0 || selektovaniPODoviFeatures.length === 0 || selektovanaPrikljucnaMjestaFeatures.length === 0) {
    poruka("Upozorenje", "U zahvatu moraju postojati potrošači, PODovi i priključna mjesta.");
    return false;
  }
  let nizSvihPotrosaca = selektovaniPotrosaciFeatures.slice(),
    nizSvihPodova = selektovaniPODoviFeatures.slice(),
    nizSvihPrikljucnimMjesta = selektovanaPrikljucnaMjestaFeatures.slice(),
    nizSvihVodova = selektovaniVodoviFeatures.slice();
  /*********** */
  let writer = new ol.format.GeoJSON();
  let gPotrosac, gPod, gPM, gVod;

  for (let j = 0; j < potrosaci.length; j++) {
    //Povezivanje sa potrošačima
    trenutnaGJ = writer.writeFeatureObject(new ol.Feature(potrosaci[j].getGeometry()));
    for (let i = 0; i < nizSvihGeometrija.length; i++) {
      let pojedinacnaLinijaTurf = writer.writeFeatureObject(new ol.Feature(nizSvihGeometrija[i].getGeometry()));
      //Ne postoji funkcija za presjek linije i tačke pa se, ukoliko je prva linija tačka, koristi provjera da je udaljenost = 0
      if (turf.pointToLineDistance(trenutnaGJ, pojedinacnaLinijaTurf, { units: "kilometers" }) === 0) {
        if (nizObradjenihVodova.indexOf(nizSvihGeometrija[i]) < 0) {
          nizPodredjenihVodova.push(nizSvihGeometrija[i]);
          nizObradjenihVodova.push(nizSvihGeometrija[i]);
          console.log("povezivanjePotrošačaVodova - potrošač", potrosaci[j].values_.name);
          console.log("povezivanjePotrošačaVodova - vodovi", vodovi[i].values_.name);
          if (potrosaci[j].values_.geohash_id_no !== nizSvihGeometrija[i].values_.geohash_id) {
            potrosaci[j].akcija = "Izmjena";
            potrosaci[j].values_.geohash_id_no = nizSvihGeometrija[i].values_.geohash_id;
          }
          if (
            vodovi[i].values_.sifra_ts !== potrosaci[j].values_.sifra_ts ||
            vodovi[i].values_.naziv_ts !== potrosaci[j].values_.naziv_ts ||
            vodovi[i].values_.naziv_nn_izvod !== potrosaci[j].values_.naziv_nn_izvod
          ) {
            vodovi[i].akcija = "Izmjena";
            vodovi[i].values_.sifra_ts = potrosaci[j].values_.sifra_ts;
            vodovi[i].values_.naziv_ts = potrosaci[j].values_.naziv_ts;
            vodovi[i].values_.naziv_nn_izvod = potrosaci[j].values_.naziv_nn_izvod;
          }
        }
      }
    }
  }

  //Ukloniti obrađene vodove iz niza svih geometrija za sljedeći korak
  for (let i = 0; i < nizPodredjenihVodova.length; i++) {
    let indexElementaZaUklanjanje = nizSvihGeometrija.indexOf(nizPodredjenihVodova[i]);
    if (indexElementaZaUklanjanje >= 0) {
      nizSvihGeometrija.splice(indexElementaZaUklanjanje, 1);
    }
  }

  //U prethodnom dijelu je završen dio sa prenosom podataka od potrošača do prvog voda. Dalje radimo presjeke vodova bližih potrošaču sa nadređenim vodom
  nizTrenutnihVodova = nizPodredjenihVodova.slice();
  nizPodredjenihVodova.length = 0;
  if (blnPostojeNepovezaniZapisi && nizTrenutnihVodova.length === 0) {
    poruka("Upozorenje", "Nijedan vod nije povezan sa selektovanim potrošačima");
    prekidWizarda();
    return false;
  }

  nizSvihGeometrija.forEach((elem) => console.log("elementi početnog niza potrošači", elem.values_.name));
  nizSvihGeometrija.forEach((elem) => console.log("geometrije početnog niza vodova potrošači", elem.values_.geometry.flatCoordinates));

  while (blnPostojeNepovezaniZapisi) {
    if (nizTrenutnihVodova.length > 0) {
      trenutnaGJ = writer.writeFeatureObject(new ol.Feature(nizTrenutnihVodova[0].getGeometry()));
      console.log("vod za koji tražimo podređene vodove", nizTrenutnihVodova[0].values_.name);
      for (let j = 0; j < vodovi.length; j++) {
        if (vodovi[j].id === nizTrenutnihVodova[0].id) {
          nadredjenaLinijaFeature = vodovi[j]; //nadređena linija je u ovom slučaju bliža potrošaču, što bi značilo da je podređena u praksi
        }
      }
    }
    for (let i = 0; i < nizSvihGeometrija.length; i++) {
      let pojedinacnaLinijaTurf = writer.writeFeatureObject(new ol.Feature(nizSvihGeometrija[i].getGeometry()));

      let presjek = turf.lineIntersect(pojedinacnaLinijaTurf, trenutnaGJ);
      if (presjek.features.length > 0) {
        //Ignorisati ukoliko se radi o istoj liniji ili spoju dvije već obrađene linije
        if (nizObradjenihVodova.indexOf(nizSvihGeometrija[i]) < 0) {
          nizPodredjenihVodova.push(nizSvihGeometrija[i]);
          nizObradjenihVodova.push(nizSvihGeometrija[i]);
          for (let j = 0; j < vodovi.length; j++) {
            if (vodovi[j].id === nizSvihGeometrija[i].id) {
              podredjenaLinijaFeature = nizSvihGeometrija[i];
              podredjenaLinijaFeature.akcija = "Izmjena";
              podredjenaLinijaFeature.values_.geohash_id_no = nizSvihGeometrija[i].values_.geohash_id;
              podredjenaLinijaFeature.values_.sifra_ts = nizSvihGeometrija[i].values_.sifra_ts;
              podredjenaLinijaFeature.values_.naziv_ts = nizSvihGeometrija[i].values_.naziv_ts;
              podredjenaLinijaFeature.values_.naziv_nn_izvod = nizSvihGeometrija[i].values_.naziv_nn_izvod;
            }
          }
        }
      }
    }

    //Ukloniti obrađene vodove iz niza svih geometrija za sljedeći korak
    for (let i = 0; i < nizPodredjenihVodova.length; i++) {
      let indexElementaZaUklanjanje = nizSvihGeometrija.indexOf(nizPodredjenihVodova[i]);
      if (indexElementaZaUklanjanje >= 0) {
        nizSvihGeometrija.splice(indexElementaZaUklanjanje, 1);
      }
    }

    if (nizTrenutnihVodova.length > 0) {
      nizTrenutnihVodova.splice(0, 1);
    }
    if (nizTrenutnihVodova.length === 0) {
      nizTrenutnihVodova = nizPodredjenihVodova.slice();
      nizPodredjenihVodova.length = 0;
      if (nizTrenutnihVodova.length === 0 && nizSvihGeometrija.length > 0) {
        blnPostojeNepovezaniZapisi = false;
        let vektorNeupareniVodovi1 = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: nizSvihGeometrija,
          }),
          style: vectorStyleUnmatched,
        });
        map.addLayer(vektorNeupareniVodovi1);
        console.log("neupareni", vektorNeupareniVodovi1);
        document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
        document.querySelector("#divWizardUparivanjeVodova").style.display = "block";
        poruka("Upozorenje", "Postoje vodovi koji nisu povezani sa potrošačima.");
        prekidWizarda();
      }
    }
  }
}
