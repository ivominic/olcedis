/**Metode za unos i izmjenu podataka u procesima vezanim za stubove */

/**Metoda koja svim tačkama dodjeljuje vrijednosti atributa za stubove. Provjerava da li određena tačka ima već property lejer i ako ima preskače taj objekat, jer su mu podaci već popunjeni. */
function dodajPoljaGpxStubovi() {
  if (blnDodijeljenoGpxProperties) {
    return false;
  }
  blnDodijeljenoGpxProperties = true;
  gpxFeatures.forEach((el) => {
    console.log("el has property", el.hasOwnProperty("lejer"));
    console.log("el", el);
    console.log("el.values_.lejer", el.values_.lejer);
    if (!el.hasOwnProperty("lejer")) {
      let geom = wktGeometrije(el);
      console.log("geom", geom + " " + el.values_.name);
      el.set("wizard", 0);
      el.set("lejer", "stubovi");
      el.set("id", el.values_.name);
      el.set("akcija", "Unos");
      el.set("Geometry", geom);
      el.set("geom", geom);
      el.set("wkt", geom);
      el.set("fid_1", document.querySelector("#fid_1").value);
      //el.set("gps", document.querySelector("#gps").value);
      el.set("gps", el.values_.name);
      el.set("broj", document.querySelector("#broj").value);
      el.set("sifra", document.querySelector("#sifra").value);
      el.set("pripadnost", document.querySelector("#pripadnost").value);
      el.set("tip", document.querySelector("#tip").value);
      el.set("vrsta_namjena", document.querySelector("#vrsta_namjena").value);
      el.set("vrsta_materijal", document.querySelector("#vrsta_materijal").value);
      el.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog").value);
      el.set("nad_visina", document.querySelector("#nad_visina").value);
      el.set("visina", document.querySelector("#visina").value);
      el.set("rasp_prov", document.querySelector("#rasp_prov").value);
      el.set("izolator_vrsta", document.querySelector("#izolator_vrsta").value);
      el.set("izolator_funkcija", document.querySelector("#izolator_funkcija").value);
      el.set("tip_izolatora", document.querySelector("#tip_izolatora").value);
      el.set("br_izol_faza", document.querySelector("#br_izol_faza").value);
      el.set("nosaci_izolatora", document.querySelector("#nosaci_izolatora").value);
      el.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona").value);
      el.set("uzemljivac", document.querySelector("#uzemljivac").value);
      el.set("uzemljivac_otpor", document.querySelector("#uzemljivac_otpor").value);
      el.set("optika", document.querySelector("#optika").value);
      el.set("rasvjeta", document.querySelector("#rasvjeta").value);
      el.set("br_pmo", document.querySelector("#br_pmo").value);
      el.set("br_nnv", document.querySelector("#br_nnv").value);
      el.set("pog_sprem", document.querySelector("#pog_sprem").value);
      el.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
      el.set("opstina", document.querySelector("#opstina").value);
      el.set("napon", document.querySelector("#napon").value);
      el.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep").value);
      el.set("nn_vod", document.querySelector("#nn_vod").value);
      el.set("rastavljac", document.querySelector("#rastavljac").value);
      el.set("10vod", document.querySelector("#vod_10").value);

      //Dodao za poziv Jovanovog servisa
      el.set("name", el.values_.name);
      el.set("fid", "test");
      el.set("layer_name", "test");
      el.set("broj_priklj_mjernih_ormara", 2);
      el.set("datum_azuriranja", "");

      el.set("layer_id", 0);
      el.set("geohash_id", "test");
      el.set("korisnik", "test");
      el.set("katastar", "");
      el.set("originalId", 0);
      el.set("posjeduje_sliku", "test");
      el.set("vlasnik", "test");
      el.set("geohash_id_no", "test");
      el.set("sifra_napojne", "test");
      el.set("izvod_napojne", "test");
      el.set("naziv_napojne", "test");
    }
  });
  console.log("gpx features", gpxFeatures);
}

function dodajPoljaOdabranomGpxStubu() {
  if (!selectGpxFeature.hasOwnProperty("lejer") || selectGpxFeature.get("lejer") === "stubovi") {
    selectGpxFeature.set("wizard", 0);
    selectGpxFeature.set("lejer", "stubovi");
    selectGpxFeature.set("fid_1", document.querySelector("#fid_1").value);
    selectGpxFeature.set("gps", document.querySelector("#gps").value);
    selectGpxFeature.set("broj", document.querySelector("#broj").value);
    selectGpxFeature.set("sifra", document.querySelector("#sifra").value);
    selectGpxFeature.set("pripadnost", document.querySelector("#pripadnost").value);
    selectGpxFeature.set("tip", document.querySelector("#tip").value);
    selectGpxFeature.set("vrsta_namjena", document.querySelector("#vrsta_namjena").value);
    selectGpxFeature.set("vrsta_materijal", document.querySelector("#vrsta_materijal").value);
    selectGpxFeature.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog").value);
    selectGpxFeature.set("nad_visina", document.querySelector("#nad_visina").value);
    selectGpxFeature.set("visina", document.querySelector("#visina").value);
    selectGpxFeature.set("rasp_prov", document.querySelector("#rasp_prov").value);
    selectGpxFeature.set("izolator_vrsta", document.querySelector("#izolator_vrsta").value);
    selectGpxFeature.set("izolator_funkcija", document.querySelector("#izolator_funkcija").value);
    selectGpxFeature.set("br_izol_faza", document.querySelector("#br_izol_faza").value);
    selectGpxFeature.set("nosaci_izolatora", document.querySelector("#nosaci_izolatora").value);
    selectGpxFeature.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona").value);
    selectGpxFeature.set("uzemljivac", document.querySelector("#uzemljivac").value);
    selectGpxFeature.set("uzemljivac_otpor", document.querySelector("#uzemljivac_otpor").value);
    selectGpxFeature.set("optika", document.querySelector("#optika").value);
    selectGpxFeature.set("rasvjeta", document.querySelector("#rasvjeta").value);
    selectGpxFeature.set("br_pmo", document.querySelector("#br_pmo").value);
    selectGpxFeature.set("br_nnv", document.querySelector("#br_nnv").value);
    selectGpxFeature.set("pog_sprem", document.querySelector("#pog_sprem").value);
    selectGpxFeature.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
    selectGpxFeature.set("opstina", document.querySelector("#opstina").value);
    selectGpxFeature.set("napon", document.querySelector("#napon").value);
    selectGpxFeature.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep").value);
    selectGpxFeature.set("nn_vod", document.querySelector("#nn_vod").value);
    selectGpxFeature.set("rastavljac", document.querySelector("#rastavljac").value);
    selectGpxFeature.set("10vod", document.querySelector("#vod_10").value);
  } else {
    poruka("Upozorenje", "Odabrani objekat je već definisan kao drugi lejer");
  }
}

function prikaziPoljaOdabranogGpxStuba() {
  document.querySelector("#fid_1").value = selectGpxFeature.values_.fid_1;
  document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  document.querySelector("#broj").value = selectGpxFeature.values_.broj;
  document.querySelector("#sifra").value = selectGpxFeature.values_.sifra;
  document.querySelector("#pripadnost").value = selectGpxFeature.values_.pripadnost;
  //document.querySelector("#tip").value = selectGpxFeature.values_.tip;
  //document.querySelector("#vrsta_namjena").value = selectGpxFeature.values_.vrsta_namjena;
  //document.querySelector("#vrsta_materijal").value = selectGpxFeature.values_.vrsta_materijal;
  //document.querySelector("#vrsta_drvenog").value = selectGpxFeature.values_.vrsta_drvenog;
  document.querySelector("#nad_visina").value = selectGpxFeature.values_.nad_visina;
  document.querySelector("#visina").value = selectGpxFeature.values_.visina;
  document.querySelector("#rasp_prov").value = selectGpxFeature.values_.rasp_prov;
  //document.querySelector("#izolator_vrsta").value = selectGpxFeature.values_.izolator_vrsta;
  //document.querySelector("#izolator_funkcija").value = selectGpxFeature.values_.izolator_funkcija;
  document.querySelector("#br_izol_faza").value = selectGpxFeature.values_.br_izol_faza;
  //document.querySelector("#nosaci_izolatora").value = selectGpxFeature.values_.nosaci_izolatora;
  //document.querySelector("#odvodnik_prenapona").value = selectGpxFeature.values_.odvodnik_prenapona;
  //document.querySelector("#uzemljivac").value = selectGpxFeature.values_.uzemljivac;
  document.querySelector("#uzemljivac_otpor").value = selectGpxFeature.values_.uzemljivac_otpor;
  //document.querySelector("#optika").value = selectGpxFeature.values_.optika;
  //document.querySelector("#rasvjeta").value = selectGpxFeature.values_.rasvjeta;
  document.querySelector("#br_pmo").value = selectGpxFeature.values_.br_pmo;
  document.querySelector("#br_nnv").value = selectGpxFeature.values_.br_nnv;
  document.querySelector("#pog_sprem").value = selectGpxFeature.values_.pog_sprem;
  //document.querySelector("#vlasnistvo").value = selectGpxFeature.values_.vlasnistvo;
  document.querySelector("#opstina").value = selectGpxFeature.values_.opstina;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;
  //document.querySelector("#prikljucak_otcjep").value = selectGpxFeature.values_.prikljucak_otcjep;
  //document.querySelector("#nn_vod").value = selectGpxFeature.values_.nn_vod;
  //document.querySelector("#rastavljac").value = selectGpxFeature.values_.rastavljac;
  //document.querySelector("#vod_10").value = selectGpxFeature.values_["10vod"];
  console.log("tip iz stubova", selectGpxFeature.values_.tip);
  setujDdlVrijednost("#tip", selectGpxFeature.values_.tip);
  setujDdlVrijednost("#vrsta_namjena", selectGpxFeature.values_.vrsta_namjena);
  setujDdlVrijednost("#vrsta_materijal", selectGpxFeature.values_.vrsta_materijal);
  setujDdlVrijednost("#vrsta_drvenog", selectGpxFeature.values_.vrsta_drvenog);
  setujDdlVrijednost("#izolator_vrsta", selectGpxFeature.values_.izolator_vrsta);
  setujDdlVrijednost("#izolator_funkcija", selectGpxFeature.values_.izolator_funkcija);
  setujDdlVrijednost("#tip_izolatora", selectGpxFeature.values_.tip_izolatora);
  setujDdlVrijednost("#nosaci_izolatora", selectGpxFeature.values_.nosaci_izolatora);
  setujDdlVrijednost("#odvodnik_prenapona", selectGpxFeature.values_.odvodnik_prenapona);
  setujDdlVrijednost("#uzemljivac", selectGpxFeature.values_.uzemljivac);
  setujDdlVrijednost("#optika", selectGpxFeature.values_.optika);
  setujDdlVrijednost("#rasvjeta", selectGpxFeature.values_.rasvjeta);
  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);
  setujDdlVrijednost("#prikljucak_otcjep", selectGpxFeature.values_.prikljucak_otcjep);
  setujDdlVrijednost("#nn_vod", selectGpxFeature.values_.nn_vod);
  setujDdlVrijednost("#rastavljac", selectGpxFeature.values_.rastavljac);
  setujDdlVrijednost("#vod_10", selectGpxFeature.values_["10vod"]);
}
