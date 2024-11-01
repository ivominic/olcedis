/**Metode za unos i izmjenu podataka u procesima vezanim za stubove */

/**Metoda koja svim tačkama dodjeljuje vrijednosti atributa za stubove. Provjerava da li određena tačka ima već property lejer i ako ima preskače taj objekat, jer su mu podaci već popunjeni. */
function dodajPoljaGpxPrikljucnaKonzola() {
  if (blnDodijeljenoGpxProperties) {
    return false;
  }
  blnDodijeljenoGpxProperties = true;
  gpxFeatures.forEach((el) => {
    console.log("el has property", el.hasOwnProperty("lejer"));
    console.log("el", el);
    if (!el.hasOwnProperty("lejer")) {
      let geom = wktGeometrije(el);
      el.set("wizard", 0);
      el.set("lejer", "prikljucna_konzola");
      el.set("id", el.values_.name);
      el.set("akcija", "Unos");
      el.set("Geometry", geom);
      el.set("geom", geom);
      el.set("wkt", geom);
      el.set("fid_1", document.querySelector("#fid_1").value);
      el.set("gps", el.values_.name);
      el.set("name", document.querySelector("#name").value);
      el.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
      el.set("opstina", document.querySelector("#opstina").value);
      el.set("name", el.values_.name);
      el.set("fid", "");
      el.set("datum_azuriranja", "");
      el.set("geohash_id", "");
      el.set("korisnik", globalUsername);
      el.set("katastar", "");
      el.set("originalId", 0);
      el.set("posjeduje_sliku", false);
      el.set("vlasnik", "");
      el.set("geohash_id_no", "");
      el.set("sifra_napojne", sifraNapojneTrafostanice);
      el.set("naziv_napojne", nazivNapojneTrafostanice);
      el.set("izvod_napojne", izvodNapojneTrafostanice);
      el.set("uzemljivac",document.querySelector("#uzemljivac_prikljucna_konzola").value);
      el.set("pog_sprem",document.querySelector("#pog_sprem_prikljucna_konzola").value);
      el.set("izvod_id", document.querySelector("#izvod_id").value);
    }
  });
  console.log("gpx features", gpxFeatures);
}

function dodajPoljaOdabranomGpxPrikljucnaKonzola() {
  selectGpxFeature.set("wizard", 0);
  selectGpxFeature.set("lejer", "prikljucna_konzola");
  selectGpxFeature.set("fid_1", document.querySelector("#fid_1").value);
  selectGpxFeature.set("naziv_rastavljaca", document.querySelector("#naziv_rastavljaca").value);
  selectGpxFeature.set("gps", document.querySelector("#gps").value);
  selectGpxFeature.set("name", document.querySelector("#name").value);
  selectGpxFeature.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
  selectGpxFeature.set("izvod_id", document.querySelector("#izvod_id").value);
  selectGpxFeature.set("opstina", document.querySelector("#opstina").value);
  selectGpxFeature.set("napon", document.querySelector("#napon").value);
  selectGpxFeature.set("sifra_napojne", sifraNapojneTrafostanice);
  selectGpxFeature.set("naziv_napojne", nazivNapojneTrafostanice);
  selectGpxFeature.set("izvod_napojne", izvodNapojneTrafostanice);
  selectGpxFeature.set("tip", document.querySelector("#tip_stub").value);
  selectGpxFeature.set("vlasnik", "");
  selectGpxFeature.set("korisnik", globalUsername);
  selectGpxFeature.set("uzemljivac", document.querySelector("#uzemljivac_prikljucna_konzola").value);
  selectGpxFeature.set("pog_sprem", document.querySelector("#pog_sprem_prikljucna_konzola").value);

  if (!isEditable) {
    dodajSacuvaniKmlFeature(selectGpxFeature);
  }
  poruka(StatusPoruke.Uspjeh, UnosPoruke.UspjehAzurirani);
}

function prikaziPoljaOdabranogGpxPrikljucnaKonzola() {
  document.querySelector("#gps").value = selectGpxFeature.values_.gps ?? "";
  document.querySelector("#name").value = selectGpxFeature.values_.name;
  document.querySelector("#opstina").value = selectGpxFeature.values_.opstina;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;
  document.querySelector("#uzemljivac_prikljucna_konzola").value = selectGpxFeature.values_.uzemljivac;
  document.querySelector("#pog_sprem_prikljucna_konzola").value = selectGpxFeature.values_.pog_sprem;
  document.querySelector("#izvod_id").value = selectGpxFeature.values_.izvod_id;
  setujDdlVrijednost("#nosaci_izolatora", selectGpxFeature.values_.tip_nosac_izol);
  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);
}

function prikaziAtributeWmsPrikljucnaKonzola(objekat) {
  document.querySelector("#gps").value = objekat.properties.gps ?? "";
  document.querySelector("#name").value = objekat.properties.name;
  document.querySelector("#opstina").value = objekat.properties.opstina;
  document.querySelector("#napon").value = objekat.properties.napon;
  document.querySelector("#naziv_rastavljaca").value = objekat.properties.naziv_rastavljaca;
  setujDdlVrijednost("#vlasnistvo", objekat.properties.vlasnistvo);
  document.querySelector("#uzemljivac_prikljucna_konzola").value = objekat.properties.uzemljivac;
  document.querySelector("#pog_sprem_prikljucna_konzola").value = objekat.properties.pog_sprem;
}

function izmijeniAtributeWmsPrikljucnaKonzola(objekat) {
  objekat.properties.name = document.querySelector("#name").value;
  objekat.properties.uzemljivac = document.querySelector("#uzemljivac_prikljucna_konzola").value;
  objekat.properties.pog_sprem = document.querySelector("#pog_sprem_prikljucna_konzola").value;
  objekat.properties.opstina = document.querySelector("#opstina").value;
  objekat.properties.napon = document.querySelector("#napon").value;
  objekat.properties.vlasnistvo = document.querySelector("#vlasnistvo").value;
  objekat.properties.tip = document.querySelector("#tip_stub").value;
  objekat.properties.naziv_rastavljaca = document.querySelector("#naziv_rastavljaca").value;
  objekat.properties.izvod_id = document.querySelector("#izvod_id").value;
  return objekat;
}
