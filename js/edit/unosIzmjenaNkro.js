function dodajPoljaOdabranomGpxNKRO() {
  selectGpxFeature.set("wizard", 0);
  selectGpxFeature.set("lejer", "nkro");
  selectGpxFeature.set("gps", document.querySelector("#gps").value);
  selectGpxFeature.set("name", document.querySelector("#name").value);
  selectGpxFeature.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
  selectGpxFeature.set("napon", document.querySelector("#napon").value);
  selectGpxFeature.set("id", document.querySelector("#id").value);
  selectGpxFeature.set("montaza", document.querySelector("#montaza").value);
  selectGpxFeature.set("materijal", document.querySelector("#vrsta_materijal").value);
  selectGpxFeature.set("vrata", document.querySelector("#vrata").value);
  selectGpxFeature.set("br_izvoda", document.querySelector("#br_izvoda").value);
  selectGpxFeature.set("br_prikljucaka", document.querySelector("#br_prikljucaka").value);
  selectGpxFeature.set("pog_sprem", document.querySelector("#pog_sprem").value);
  selectGpxFeature.set("vlasnik", "test");
  selectGpxFeature.set("sifra_napojne", sifraNapojneTrafostanice);
  selectGpxFeature.set("naziv_napojne", nazivNapojneTrafostanice);
  selectGpxFeature.set("izvod_napojne", izvodNapojneTrafostanice);
  poruka("Uspjeh", "Ažurirani podaci za odabranu gpx tačku");
}

function prikaziPoljaOdabranogGpxNKRO() {
  if (selectGpxFeature.values_.gps !== undefined) {
    document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  document.querySelector("#name").value = selectGpxFeature.values_.name;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;
  document.querySelector("#id").value = selectGpxFeature.values_.id;
  document.querySelector("#montaza").value = selectGpxFeature.values_.montaza;
  document.querySelector("#vrata").value = selectGpxFeature.values_.vrata;
  document.querySelector("#br_izvoda").value = selectGpxFeature.values_.br_izvoda;
  document.querySelector("#br_prikljucaka").value = selectGpxFeature.values_.br_prikljucaka;

  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);
}

function prikaziPoljaWmsNKRO(objekat) {
  if (objekat.properties.gps !== undefined) {
    document.querySelector("#gps").value = objekat.properties.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  document.querySelector("#name").value = objekat.properties.name;
  document.querySelector("#napon").value = objekat.properties.napon;
  document.querySelector("#id").value = objekat.properties.id;
  document.querySelector("#montaza").value = objekat.properties.montaza;
  document.querySelector("#vrata").value = objekat.properties.vrata;
  document.querySelector("#br_izvoda").value = objekat.properties.br_izvoda;
  document.querySelector("#br_prikljucaka").value = objekat.properties.br_prikljucaka;

  setujDdlVrijednost("#vlasnistvo", objekat.properties.vlasnistvo);
}

function izmijeniAtributeWmsNKRO(objekat) {
  objekat.properties.name = document.querySelector("#napon").name;
  objekat.properties.napon = document.querySelector("#napon").value;
  objekat.properties.id = document.querySelector("#id").value;
  objekat.properties.montaza = document.querySelector("#montaza").value;
  objekat.properties.vrata = document.querySelector("#vrata").value;
  objekat.properties.br_izvoda = document.querySelector("#br_izvoda").value;
  objekat.properties.br_prikljucaka = document.querySelector("#br_prikljucaka").value;

  return objekat;
  //setujDdlVrijednost("#vlasnistvo", objekat.properties.vlasnistvo);
}
