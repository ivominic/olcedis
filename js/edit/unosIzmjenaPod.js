function dodajPoljaOdabranomGpxPod() {
  parsiranjeProvjeraPotrosaca();
  return false;
}

function prikaziPoljaOdabranogGpxPod() {
  if (selectGpxFeature.values_.gps !== undefined) {
    document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  //document.querySelector("#fid_1").value = selectGpxFeature.values_.fid_1;  
  document.querySelector("#id").value = selectGpxFeature.values_.id;
  document.querySelector("#naziv_ts").value = selectGpxFeature.values_.naziv_ts;
  document.querySelector("#sifra_ts").value = selectGpxFeature.values_.sifra_ts;
  document.querySelector("#prik_kabal").value = selectGpxFeature.values_.prik_kabal;
  document.querySelector("#pod").value = selectGpxFeature.values_.pod;
  document.querySelector("#adresa_mm").value = selectGpxFeature.values_.adresa_mm;
  document.querySelector("#prik_mjesto").value = selectGpxFeature.values_.prik_mjesto;
  document.querySelector("#naziv_nn_izvod").value = selectGpxFeature.values_.naziv_nn_izvod;
  document.querySelector("#pretplatni_br").value = selectGpxFeature.values_.pretplatni_br;
  document.querySelector("#br_brojila").value = selectGpxFeature.values_.br_brojila;
}

function prikaziPoljaWmsPod(objekat) {
  if (objekat.properties.gps !== undefined) {
    document.querySelector("#gps").value = objekat.properties.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  document.querySelector("#id").value = objekat.properties.id;
  document.querySelector("#naziv_ts").value = objekat.properties.naziv_ts;
  document.querySelector("#sifra_ts").value = objekat.properties.sifra_ts;
  document.querySelector("#prik_kabal").value = objekat.properties.prik_kabal;
  document.querySelector("#pod").value = objekat.properties.pod;
  document.querySelector("#adresa_mm").value = objekat.properties.adresa_mm;
  document.querySelector("#prik_mjesto").value = objekat.properties.prik_mjesto;
  document.querySelector("#naziv_nn_izvod").value = objekat.properties.naziv_nn_izvod;
  document.querySelector("#pretplatni_br").value = objekat.properties.pretplatni_br;
  document.querySelector("#br_brojila").value = objekat.properties.br_brojila;
}

function generisanjeGpxPodaIzGeometrije(lat, lng, jsonPretplatnik) {
  let tackaGeom = new ol.geom.Point([lat, lng]);
  let featureTacka = new ol.Feature({ name: "tacka", geometry: tackaGeom });
  //featureTacka.values_.lejer = "pod";
  featureTacka.set("wizard", 0);
  featureTacka.set("lejer", "pod");
  featureTacka.set("gps", document.querySelector("#gps").value); //šta sa ovim?  
  featureTacka.set("id", jsonPretplatnik.id);
  featureTacka.set("naziv", jsonPretplatnik.naziv_potrosaca);
  featureTacka.set("name", jsonPretplatnik.naziv_potrosaca);
  featureTacka.set("naziv_ts", jsonPretplatnik.naziv_trafostanice);
  featureTacka.set("sifra_ts", jsonPretplatnik.sifra_trafostanice);
  featureTacka.set("prik_kabal", jsonPretplatnik.provodnik_spolja + " " + jsonPretplatnik.presjek_spolja);
  featureTacka.set("pod", jsonPretplatnik.pod_na_mm);
  featureTacka.set("status", jsonPretplatnik.status);
  featureTacka.set("adresa_mm", jsonPretplatnik.adresa_mjesta_mjerenja);
  featureTacka.set("prik_mjesto", document.querySelector("#prik_mjesto").value);
  featureTacka.set("naziv_nn_izvod", jsonPretplatnik.naziv_voda);
  featureTacka.set("pretplatni_br", jsonPretplatnik.sifra);
  featureTacka.set("br_brojila", jsonPretplatnik.broj_brojila);
  featureTacka.set("status", jsonPretplatnik.status);
  featureTacka.set("sifra_napojne", sifraNapojneTrafostanice);
  featureTacka.set("naziv_napojne", nazivNapojneTrafostanice);
  featureTacka.set("izvod_napojne", izvodNapojneTrafostanice);
  featureTacka.set("napon", document.querySelector("#napon").value);
  featureTacka.set("korisnik", globalUsername);
  featureTacka.set("vlasnik", "");
  //console.log("feature tacka ****************************************************", featureTacka);
  vectorSource.addFeatures([featureTacka]);
  gpxFeatures.push(featureTacka);
}

function izmijeniAtributeWmsPod(objekat) {
  objekat.properties.id = document.querySelector("#id").value;
  objekat.properties.naziv_ts = document.querySelector("#naziv_ts").value;
  objekat.properties.sifra_ts = document.querySelector("#sifra_ts").value;
  objekat.properties.prik_kabal = document.querySelector("#prik_kabal").value;
  objekat.properties.pod = document.querySelector("#pod").value;
  objekat.properties.adresa_mm = document.querySelector("#adresa_mm").value;
  objekat.properties.prik_mjesto = document.querySelector("#prik_mjesto").value;
  objekat.properties.naziv_nn_izvod = document.querySelector("#naziv_nn_izvod").value;
  objekat.properties.pretplatni_br = document.querySelector("#pretplatni_br").value;
  objekat.properties.br_brojila = document.querySelector("#br_brojila").value;

  return objekat;
}
