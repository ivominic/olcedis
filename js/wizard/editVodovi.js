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
  let params = wmsVodovi.getSource().getParams();
  let formiraniFilter = globalCqlZaNaponskiNivo(napon, "vodovi");
  if (params.CQL_FILTER && params.CQL_FILTER.length > 0) {
    formiraniFilter += " AND (" + params.CQL_FILTER + ")";
  }
  formiraniFilter = encodeURIComponent(formiraniFilter);
  console.log("filter za cql", formiraniFilter);
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernameVodovi +
    "&outputformat=application/json&cql_filter=" +
    formiraniFilter +
    "&access_token=" +
    geoserverToken;
  console.log("url filter", urlZaFilter);

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaniVodoviFeatures = new ol.format.GeoJSON().readFeatures(response);
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
 * Metoda koja za niz feature-a i početni feature prati konektivnost i dodaje povezane objekte.
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
  let trenutniGeohash;
  console.log("pocetni objekat", pocetna);
  console.log("pocetne linije", features);

  //Metoda koja svim trafostanicama daje geohash_id_no voda koji je presijeca
  presjekVodovaSaTrafostanicamaPrviKorak();

  if (!pocetna || pocetna === undefined) {
    //napraviti geometriju iz promjenljivih: geometrijaNapojneTrafostanice i geohashNapojneTrafostanice
    let format = new ol.format.WKT();
    let geometrija = format.readFeature(geometrijaNapojneTrafostanice, {});
    trenutnaGJ = writer.writeFeatureObject(new ol.Feature(geometrija.getGeometry()));
    trenutniGeohash = geohashNapojneTrafostanice;
    //trenutniGeohash = generisiGeohashId("trafostanice", geometrijaNapojneTrafostanice);
  } else {
    let tempPosition = pocetna.geometry.coordinates;
    let point = new ol.Feature(new ol.geom.Point([tempPosition[0].toFixed(10), tempPosition[1].toFixed(10)]));
    trenutnaGJ = writer.writeFeatureObject(new ol.Feature(point.getGeometry()));
    trenutniGeohash = pocetna.values_.geohash_id;
  }
  console.log("geometrija trafostanice 11111", geometrijaNapojneTrafostanice);
  console.log("trenutni geohash 222222 ", trenutniGeohash);
  console.log("NizSvihGeometrija ", nizSvihGeometrija);

  //nizSvihGeometrija.forEach((elem) => console.log("elementi početnog niza", elem.values_.name));
  //nizSvihGeometrija.forEach((elem) => console.log("geometrije početnog niza vodova", elem.values_.geometry.flatCoordinates));

  while (blnPostojeNepovezaniZapisi) {
    if (nizTrenutnihVodova.length > 0) {
      //trenutnaGJ = writer.writeFeatureObject(new ol.Feature(nizTrenutnihVodova[0].getGeometry().clone().transform("EPSG:3857", "EPSG:4326")));
      trenutnaGJ = writer.writeFeatureObject(new ol.Feature(nizTrenutnihVodova[0].getGeometry()));
      console.log("vod za koji tražimo podređene vodove", nizTrenutnihVodova[0].values_.name);
      trenutniGeohash = nizTrenutnihVodova[0].values_.geohash_id;
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
      let presjektElemenata = false;
      if (trenutnaGJ.geometry.type === "Point") {
        presjektElemenata = turf.pointToLineDistance(trenutnaGJ, pojedinacnaLinijaTurf, { units: "kilometers" }) === 0;
      } else {
        presjektElemenata = turf.lineIntersect(pojedinacnaLinijaTurf, trenutnaGJ).features.length > 0;
      }

      if (trenutnaGJ.geometry.type === "Point") {
        if (turf.pointToLineDistance(trenutnaGJ, pojedinacnaLinijaTurf, { units: "kilometers" }) === 0) {
          if (nizObradjenihVodova.indexOf(nizSvihGeometrija[i]) < 0) {
            nizPodredjenihVodova.push(nizSvihGeometrija[i]);
            nizObradjenihVodova.push(nizSvihGeometrija[i]);
            for (let j = 0; j < features.length; j++) {
              if (features[j].id_ === nizSvihGeometrija[i].id_) {
                podredjenaLinijaFeature = nizSvihGeometrija[i];
                podredjenaLinijaFeature.akcija = "Izmjena";
                //podredjenaLinijaFeature.values_.geohash_id_no = nizSvihGeometrija[i].values_.geohash_id;
                /*podredjenaLinijaFeature.values_.geohash_id_no = nizTrenutnihVodova[0].values_.geohash_id;
                podredjenaLinijaFeature.values_.naziv_napojne = nazivNapojneTrafostanice;
                podredjenaLinijaFeature.values_.sifra_napojne = sifraNapojneTrafostanice;
                podredjenaLinijaFeature.values_.izvod_napojne = izvodNapojneTrafostanice;*/
                features[j].akcija = "Izmjena";
                features[j].values_.geohash_id_no = trenutniGeohash;
                features[j].values_.naziv_napojne = nazivNapojneTrafostanice;
                features[j].values_.sifra_napojne = sifraNapojneTrafostanice;
                features[j].values_.izvod_napojne = izvodNapojneTrafostanice;
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
                /*podredjenaLinijaFeature.values_.geohash_id_no = nizSvihGeometrija[i].values_.geohash_id;
                podredjenaLinijaFeature.values_.naziv_napojne = nazivNapojneTrafostanice;
                podredjenaLinijaFeature.values_.sifra_napojne = sifraNapojneTrafostanice;
                podredjenaLinijaFeature.values_.izvod_napojne = izvodNapojneTrafostanice;*/
                features[j].akcija = "Izmjena";
                features[j].values_.geohash_id_no = trenutniGeohash;
                features[j].values_.naziv_napojne = nazivNapojneTrafostanice;
                features[j].values_.sifra_napojne = sifraNapojneTrafostanice;
                features[j].values_.izvod_napojne = izvodNapojneTrafostanice;
              }
            }
            //Poziv metode za provjeru presjeka sa trafostanicama
            if (
              nadredjenaLinijaFeature &&
              podredjenaLinijaFeature &&
              nadredjenaLinijaFeature !== undefined &&
              podredjenaLinijaFeature !== undefined
            ) {
              presjekVodovaSaTrafostanicama(nadredjenaLinijaFeature, podredjenaLinijaFeature);
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
      //trenutnaGeometrija = nizTrenutnihVodova[0];
      nizTrenutnihVodova.splice(0, 1);
    }
    if (nizTrenutnihVodova.length == 0) {
      nizTrenutnihVodova = nizPodredjenihVodova.slice();
      nizPodredjenihVodova.length = 0;
      if (nizTrenutnihVodova.length == 0) {
        if (nizSvihGeometrija.length > 0) {
          blnOnemogucitiWizard = true;
          poruka("Upozorenje", "Postoje nepovezani vodovi");
          alert("Postoje nepovezani vodovi");

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

/**
 * Metoda koja vrši uparivanje vodova iz dvije padajuće liste
 */
function poveziVodove() {
  let odabraniVod = document.querySelector("#ddlPovezivanjeVodovaSelektovane").value;
  let vodIzSistema = document.querySelector("#ddlPovezivanjeVodovaPronadjene").value;
  if (!odabraniVod || !vodIzSistema) {
    poruka("Upozorenje", "Potrebno je odabrati vodove iz oba sistema");
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
  //paroviVodova.push({ gis: odabraniVod, tbp: vodIzSistema });
  //console.log("povezani vodovi", paroviVodova);
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
      //selektovaniVodoviFeatures[i].values_.id_billing = vodIzSistema;
      selektovaniVodoviFeatures[i].values_.napojna_ts = nazivNapojneTrafostanice;
      selektovaniVodoviFeatures[i].values_.sifra_dionice = vodIzSistema;
      selektovaniVodoviFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
      selektovaniVodoviFeatures[i].values_.naziv_napojne = nazivNapojneTrafostanice;
      selektovaniVodoviFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
    }
  }
  if (
    document.querySelector("#ddlPovezivanjeVodovaSelektovane").length === 1 &&
    document.querySelector("#ddlPovezivanjeVodovaPronadjene").length === 0
  ) {
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
  zumVodovaIzListe(this.value);
});

function zumVodovaIzListe(value) {
  for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
    if (value === selektovaniVodoviFeatures[i].values_.originalId.toString()) {
      let featureZaTransofrmaciju = selektovaniVodoviFeatures[i].clone();
      map.getView().fit(featureZaTransofrmaciju.getGeometry(), { maxZoom: 20 });
    }
  }
}

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
    //Samo za trafostanice koje imaju izlaznu stavku prenos_odnos kao odabrani naponski nivo dajemo da je nadređeni izlazog voda
    if (
      globalNaponskiNivoPrenosOdnos(selektovaneTrafostaniceFeatures[i].values_.prenos_odnos) === odabraniNaponskiNivo
    ) {
      let trafostanicaGeometrija = writer.writeFeatureObject(
        new ol.Feature(selektovaneTrafostaniceFeatures[i].getGeometry())
      );
      if (trafostanicaGeometrija.geometry.type === "Point") {
        if (
          turf.pointToLineDistance(trafostanicaGeometrija, nadredjenaGeometrija, { units: "kilometers" }) === 0 &&
          turf.pointToLineDistance(trafostanicaGeometrija, podredjenaGeometrija, { units: "kilometers" }) === 0
        ) {
          selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
          selektovaneTrafostaniceFeatures[i].values_.geohash_id_no = nadredjenaLinijaFeature.values_.geohash_id;
          selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.naziv_napojne = nazivNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
          podredjenaLinijaFeature.akcija = "Izmjena";
          podredjenaLinijaFeature.values_.geohash_id_no = selektovaneTrafostaniceFeatures[i].values_.geohash_id;
        }
      } else {
        if (
          turf.lineIntersect(nadredjenaGeometrija, trafostanicaGeometrija) &&
          turf.lineIntersect(podredjenaGeometrija, trafostanicaGeometrija)
        ) {
          selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
          selektovaneTrafostaniceFeatures[i].values_.geohash_id_no = nadredjenaLinijaFeature.values_.geohash_id;
          selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.naziv_napojne = nazivNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
          podredjenaLinijaFeature.akcija = "Izmjena";
          podredjenaLinijaFeature.values_.geohash_id_no = selektovaneTrafostaniceFeatures[i].values_.geohash_id;
        }
      }
    } else {
      //Ako nije - razlika samo u dijelu da podređeni vod ne dobija geohash_id_no trafostanice
      let trafostanicaGeometrija = writer.writeFeatureObject(
        new ol.Feature(selektovaneTrafostaniceFeatures[i].getGeometry())
      );
      if (trafostanicaGeometrija.geometry.type === "Point") {
        if (
          turf.pointToLineDistance(trafostanicaGeometrija, nadredjenaGeometrija, { units: "kilometers" }) === 0 &&
          turf.pointToLineDistance(trafostanicaGeometrija, podredjenaGeometrija, { units: "kilometers" }) === 0
        ) {
          selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
          selektovaneTrafostaniceFeatures[i].values_.geohash_id_no = nadredjenaLinijaFeature.values_.geohash_id;
          selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.naziv_napojne = nazivNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
        }
      } else {
        if (
          turf.lineIntersect(nadredjenaGeometrija, trafostanicaGeometrija) &&
          turf.lineIntersect(podredjenaGeometrija, trafostanicaGeometrija)
        ) {
          selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
          selektovaneTrafostaniceFeatures[i].values_.geohash_id_no = nadredjenaLinijaFeature.values_.geohash_id;
          selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.naziv_napojne = nazivNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
        }
      }
    }
    //Mislim da ovaj dio nije potreban, već će trafostanicama u prvom koraku biti dodijeljene vrijednosti iz bilinga
    /*if (odabranaTS === selektovaneTrafostaniceFeatures[i].values_.originalId.toString()) {
      selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
      selektovaneTrafostaniceFeatures[i].values_.id_billing = tsIzSistema;
      selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.napojna_ts = nazivNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
    }*/
  }
}

/**Metoda koja će svim trafostanicama dati da je geohash_id_no vrijednost iz voda koji je siječe. U metodi presjekVodovaSaTrafostanicama() se obrađuje slučaj kad više vodova presijeca istu trafostanicu */
function presjekVodovaSaTrafostanicamaPrviKorak() {
  let writer = new ol.format.GeoJSON();

  for (let j = 0; j < selektovaniVodoviFeatures.length; j++) {
    for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
      let trafostanicaGeometrija = writer.writeFeatureObject(
        new ol.Feature(selektovaneTrafostaniceFeatures[i].getGeometry())
      );
      let vodGeometrija = writer.writeFeatureObject(new ol.Feature(selektovaniVodoviFeatures[j].getGeometry()));
      if (trafostanicaGeometrija.geometry.type === "Point") {
        if (turf.pointToLineDistance(trafostanicaGeometrija, vodGeometrija, { units: "kilometers" }) === 0) {
          selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
          selektovaneTrafostaniceFeatures[i].values_.geohash_id_no = selektovaniVodoviFeatures[j].values_.geohash_id;
          selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.naziv_napojne = nazivNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
        }
      } else {
        if (turf.lineIntersect(vodGeometrija, trafostanicaGeometrija)) {
          selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
          selektovaneTrafostaniceFeatures[i].values_.geohash_id_no = selektovaniVodoviFeatures[j].values_.geohash_id;
          selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.naziv_napojne = nazivNapojneTrafostanice;
          selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
        }
      }
    }
  }
}
