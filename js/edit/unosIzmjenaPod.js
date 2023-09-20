function dodajPoljaOdabranomGpxPod() {
  parsiranjeProvjeraPotrosaca();
  return false;
}

function prikaziPoljaOdabranogGpxPod() {
  document.querySelector("#gps").value = selectGpxFeature.values_.gps ?? "";
  document.querySelector("#name").value = selectGpxFeature.values_.name;
  document.querySelector("#id").value = selectGpxFeature.values_.id;
  document.querySelector("#naziv_napojne").value = selectGpxFeature.values_.naziv_napojne;
  document.querySelector("#sifra_napojne").value = selectGpxFeature.values_.sifra_napojne;
  document.querySelector("#izvod_napojne").value = selectGpxFeature.values_.izvod_napojne;
  document.querySelector("#prik_kabal").value = selectGpxFeature.values_.prik_kabal;
  document.querySelector("#pod").value = selectGpxFeature.values_.pod;
  document.querySelector("#adresa_mm").value = selectGpxFeature.values_.adresa_mm;
  document.querySelector("#prik_mjesto").value = selectGpxFeature.values_.prik_mjesto;
  document.querySelector("#pretplatni_br").value = selectGpxFeature.values_.pretplatni_br;
  document.querySelector("#br_brojila").value = selectGpxFeature.values_.br_brojila;
}

function prikaziPoljaWmsPod(objekat) {
  document.querySelector("#gps").value = objekat.properties.gps ?? "";
  document.querySelector("#name").value = objekat.properties.name;
  document.querySelector("#id").value = objekat.properties.id;
  document.querySelector("#naziv_napojne").value = objekat.properties.naziv_napojne;
  document.querySelector("#sifra_napojne").value = objekat.properties.sifra_napojne;
  document.querySelector("#izvod_napojne").value = objekat.properties.izvod_napojne;
  document.querySelector("#prik_kabal").value = objekat.properties.prik_kabal;
  document.querySelector("#pod").value = objekat.properties.pod;
  document.querySelector("#adresa_mm").value = objekat.properties.adresa_mm;
  document.querySelector("#prik_mjesto").value = objekat.properties.prik_mjesto;
  document.querySelector("#pretplatni_br").value = objekat.properties.pretplatni_br;
  document.querySelector("#br_brojila").value = objekat.properties.br_brojila;
}

function izmijeniAtributeWmsPod(objekat) {
  objekat.properties.name = document.querySelector("#name").value;
  objekat.properties.id = document.querySelector("#id").value;
  objekat.properties.naziv_napojne = document.querySelector("#naziv_napojne").value;
  objekat.properties.sifra_napojne = document.querySelector("#sifra_napojne").value;
  objekat.properties.izvod_napojne = document.querySelector("#izvod_napojne").value;
  objekat.properties.prik_kabal = document.querySelector("#prik_kabal").value;
  objekat.properties.pod = document.querySelector("#pod").value;
  objekat.properties.adresa_mm = document.querySelector("#adresa_mm").value;
  objekat.properties.prik_mjesto = document.querySelector("#prik_mjesto").value;
  objekat.properties.pretplatni_br = document.querySelector("#pretplatni_br").value;
  objekat.properties.br_brojila = document.querySelector("#br_brojila").value;

  return objekat;
}
