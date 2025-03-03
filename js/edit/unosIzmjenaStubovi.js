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
    if (!el.hasOwnProperty("lejer")) {
      let geom = wktGeometrije(el);
      el.set("wizard", 0);
      el.set("lejer", "stubovi");
      el.set("id", el.values_.name);
      el.set("akcija", "Unos");
      el.set("Geometry", geom);
      el.set("geom", geom);
      el.set("wkt", geom);
      el.set("fid_1", document.querySelector("#fid_1").value);
      el.set("gps", el.values_.name);
      el.set("name", document.querySelector("#name").value);
      el.set("napon", document.querySelector("#napon").value);
      el.set("naziv_rastavljaca", document.querySelector("#naziv_rastavljaca").value);

      if (el.values_.napon === NaponskiNivo.String04kV) {
        el.set("rasvjeta", document.querySelector("#rasvjeta_stub").value);
        el.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_04").value);
        el.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_04").value);
        el.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_04").value);
        el.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_04").value);
        el.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_04").value);
        el.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_04").value);
        el.set("tip_nosac_izol", document.querySelector("#nosaci_izolatora_stub_04").value);
        el.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_04").value);
        el.set("uzemljivac", document.querySelector("#uzemljivac_stub_04").value);
        el.set("optika", document.querySelector("#optika_stub_04").value);
      }
      if (el.values_.napon === NaponskiNivo.String10kV) {
        setujDdlVrijednost("#nn_vod_stub", selectGpxFeature.values_.nn_vod);
        el.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_10").value);
        el.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_10").value);
        el.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_10").value);
        el.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_10").value);
        el.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_10").value);
        el.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_10").value);
        el.set("tip_nosac_izol", document.querySelector("#nosaci_izolatora_stub_10").value);
        el.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_10").value);
        el.set("uzemljivac", document.querySelector("#uzemljivac_stub_10").value);
        el.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep_stub_10").value);
        el.set("nn_vod", document.querySelector("#nn_vod_stub_10").value);
        el.set("rastavljac", document.querySelector("#rastavljac_stub_10").value);
      }
      if (el.values_.napon === NaponskiNivo.String35kV) {
        el.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_35").value);
        el.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_35").value);
        el.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_35").value);
        el.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_35").value);
        el.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_35").value);
        el.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_35").value);
        el.set("tip_nosac_izol", document.querySelector("#nosaci_izolatora_stub_35").value);
        el.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_35").value);
        el.set("uzemljivac", document.querySelector("#uzemljivac_stub_35").value);
        el.set("optika", document.querySelector("#optika_stub_35").value);
        el.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep_stub_35").value);
        el.set("rastavljac", document.querySelector("#rastavljac_stub_35").value);
        el.set("10vod", document.querySelector("#vod_10").value);
      }

      el.set("tip", document.querySelector("#tip_stub").value);
      el.set("topologija_mreze", document.querySelector("#topologija_mreze").value);
      el.set("most", document.querySelector("#most").value);
      el.set("broj", document.querySelector("#broj").value);
      el.set("nad_visina", document.querySelector("#nad_visina").value);
      el.set("visina", document.querySelector("#visina").value);
      el.set("rasp_prov", document.querySelector("#rasp_prov").value);
      el.set("br_izol_faza", document.querySelector("#br_izol_faza").value);
      el.set("uzemljivac_otpor", document.querySelector("#uzemljivac_otpor").value);
      el.set("br_pmo", document.querySelector("#br_pmo").value);
      el.set(
        "br_nnv",
        document.querySelector("#br_nnv").value + " / " + document.querySelector("#br_nnv_kablovski").value
      );
      el.set(
        "br_10kv_vodova",
        document.querySelector("#br_10kv_vodova").value +
          " / " +
          document.querySelector("#br_10kv_vodova_kablovski").value
      );
      el.set(
        "br_35kv_vodova",
        document.querySelector("#br_35kv_vodova").value +
          " / " +
          document.querySelector("#br_35kv_vodova_kablovski").value
      );
      el.set("pog_sprem", document.querySelector("#pog_sprem").value);
      el.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
      el.set("opstina", document.querySelector("#opstina").value);

      //Dodao za poziv Jovanovog servisa
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
    }
  });
  console.log("gpx features", gpxFeatures);
}

function dodajPoljaOdabranomGpxStubu() {
  if (filePowerLevel == NaponskiNivo.Numeric04kV) {
    selectGpxFeature.set("rasvjeta", document.querySelector("#rasvjeta_stub").value);
    selectGpxFeature.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_04").value);
    selectGpxFeature.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_04").value);
    selectGpxFeature.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_04").value);
    selectGpxFeature.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_04").value);
    selectGpxFeature.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_04").value);
    selectGpxFeature.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_04").value);
    selectGpxFeature.set("tip_nosac_izol", document.querySelector("#nosaci_izolatora_stub_04").value);
    selectGpxFeature.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_04").value);
    selectGpxFeature.set("uzemljivac", document.querySelector("#uzemljivac_stub_04").value);
    selectGpxFeature.set("optika", document.querySelector("#optika_stub_04").value);
    selectGpxFeature.set("prikljucak_otcjep", "");
    selectGpxFeature.set("nn_vod", "");
    selectGpxFeature.set("rastavljac", "");
    selectGpxFeature.set("desetvod", "");
  }
  if (filePowerLevel == NaponskiNivo.Numeric10kV) {
    setujDdlVrijednost("#nn_vod_stub", selectGpxFeature.values_.nn_vod);
    selectGpxFeature.set("tip", "");
    selectGpxFeature.set("rasvjeta", "");
    selectGpxFeature.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_10").value);
    selectGpxFeature.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_10").value);
    selectGpxFeature.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_10").value);
    selectGpxFeature.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_10").value);
    selectGpxFeature.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_10").value);
    selectGpxFeature.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_10").value);
    selectGpxFeature.set("tip_nosac_izol", document.querySelector("#nosaci_izolatora_stub_10").value);
    selectGpxFeature.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_10").value);
    selectGpxFeature.set("uzemljivac", document.querySelector("#uzemljivac_stub_10").value);
    selectGpxFeature.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep_stub_10").value);
    selectGpxFeature.set("nn_vod", document.querySelector("#nn_vod_stub_10").value);
    selectGpxFeature.set("rastavljac", document.querySelector("#rastavljac_stub_10").value);
    selectGpxFeature.set("desetvod", "");
  }
  if (filePowerLevel == NaponskiNivo.Numeric35kV) {
    selectGpxFeature.set("tip", "");
    selectGpxFeature.set("rasvjeta", "");
    selectGpxFeature.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_35").value);
    selectGpxFeature.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_35").value);
    selectGpxFeature.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_35").value);
    selectGpxFeature.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_35").value);
    selectGpxFeature.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_35").value);
    selectGpxFeature.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_35").value);
    selectGpxFeature.set("tip_nosac_izol", document.querySelector("#nosaci_izolatora_stub_35").value);
    selectGpxFeature.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_35").value);
    selectGpxFeature.set("uzemljivac", document.querySelector("#uzemljivac_stub_35").value);
    selectGpxFeature.set("optika", document.querySelector("#optika_stub_35").value);
    selectGpxFeature.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep_stub_35").value);
    selectGpxFeature.set("rastavljac", document.querySelector("#rastavljac_stub_35").value);
    //selectGpxFeature.set("10vod", document.querySelector("#vod_10").value);
    selectGpxFeature.set("desetvod", document.querySelector("#vod_10").value);
    selectGpxFeature.set("nn_vod", "");
  }

  selectGpxFeature.set("wizard", 0);
  selectGpxFeature.set("lejer", "stubovi");
  selectGpxFeature.set("fid_1", document.querySelector("#fid_1").value);
  selectGpxFeature.set("naziv_rastavljaca", document.querySelector("#naziv_rastavljaca").value);
  selectGpxFeature.set("gps", document.querySelector("#gps").value);
  selectGpxFeature.set("name", document.querySelector("#name").value);
  selectGpxFeature.set("broj", document.querySelector("#broj").value);
  selectGpxFeature.set("nad_visina", document.querySelector("#nad_visina").value);
  selectGpxFeature.set("visina", document.querySelector("#visina").value);
  selectGpxFeature.set("rasp_prov", document.querySelector("#rasp_prov").value);
  selectGpxFeature.set("br_izol_faza", document.querySelector("#br_izol_faza").value);
  selectGpxFeature.set("uzemljivac_otpor", document.querySelector("#uzemljivac_otpor").value);
  selectGpxFeature.set("br_pmo", document.querySelector("#br_pmo").value);
  selectGpxFeature.set(
    "br_nnv",
    document.querySelector("#br_nnv").value + " / " + document.querySelector("#br_nnv_kablovski").value
  );
  selectGpxFeature.set(
    "br_10kv_vodova",
    document.querySelector("#br_10kv_vodova").value + " / " + document.querySelector("#br_10kv_vodova_kablovski").value
  );
  selectGpxFeature.set(
    "br_35kv_vodova",
    document.querySelector("#br_35kv_vodova").value + " / " + document.querySelector("#br_35kv_vodova_kablovski").value
  );
  selectGpxFeature.set("pog_sprem", document.querySelector("#pog_sprem").value);
  selectGpxFeature.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
  selectGpxFeature.set("opstina", document.querySelector("#opstina").value);
  selectGpxFeature.set("napon", document.querySelector("#napon").value);
  selectGpxFeature.set("sifra_napojne", sifraNapojneTrafostanice);
  selectGpxFeature.set("naziv_napojne", nazivNapojneTrafostanice);
  selectGpxFeature.set("izvod_napojne", izvodNapojneTrafostanice);
  selectGpxFeature.set("tip", document.querySelector("#tip_stub").value);
  selectGpxFeature.set("topologija_mreze", document.querySelector("#topologija_mreze").value);
  selectGpxFeature.set("most", document.querySelector("#most").value);
  selectGpxFeature.set("vlasnik", "");
  selectGpxFeature.set("korisnik", globalUsername);

  if (!isEditable) {
    dodajSacuvaniKmlFeature(selectGpxFeature);
  }
  poruka(StatusPoruke.Uspjeh, UnosPoruke.UspjehAzurirani);
}

function prikaziPoljaOdabranogGpxStuba() {
  document.querySelector("#gps").value = selectGpxFeature.values_.gps ?? "";
  document.querySelector("#name").value = selectGpxFeature.values_.name;
  document.querySelector("#broj").value = selectGpxFeature.values_.broj;
  document.querySelector("#nad_visina").value = selectGpxFeature.values_.nad_visina;
  document.querySelector("#visina").value = selectGpxFeature.values_.visina;
  document.querySelector("#rasp_prov").value = selectGpxFeature.values_.rasp_prov;
  document.querySelector("#br_izol_faza").value = selectGpxFeature.values_.br_izol_faza;
  document.querySelector("#uzemljivac_otpor").value = selectGpxFeature.values_.uzemljivac_otpor;
  document.querySelector("#br_pmo").value = selectGpxFeature.values_.br_pmo;
  if (selectGpxFeature.values_.br_nnv?.includes(" / ")) {
    document.querySelector("#br_nnv").value = selectGpxFeature.values_.br_nnv.split(" / ")[0];
    document.querySelector("#br_nnv_kablovski").value = selectGpxFeature.values_.br_nnv.split(" / ")[1];
  } else {
    document.querySelector("#br_nnv").value = selectGpxFeature.values_.br_nnv;
  }
  if (selectGpxFeature.values_.br_10kv_vodova?.includes(" / ")) {
    document.querySelector("#br_10kv_vodova").value = selectGpxFeature.values_.br_10kv_vodova.split(" / ")[0];
    document.querySelector("#br_10kv_vodova_kablovski").value = selectGpxFeature.values_.br_10kv_vodova.split(" / ")[1];
  } else {
    document.querySelector("#br_10kv_vodova").value = selectGpxFeature.values_.br_10kv_vodova;
  }
  if (selectGpxFeature.values_.br_35kv_vodova?.includes(" / ")) {
    document.querySelector("#br_35kv_vodova").value = selectGpxFeature.values_.br_35kv_vodova.split(" / ")[0];
    document.querySelector("#br_35kv_vodova_kablovski").value = selectGpxFeature.values_.br_35kv_vodova.split(" / ")[1];
  } else {
    document.querySelector("#br_35kv_vodova").value = selectGpxFeature.values_.br_35kv_vodova;
  }
  document.querySelector("#pog_sprem").value = selectGpxFeature.values_.pog_sprem;
  document.querySelector("#opstina").value = selectGpxFeature.values_.opstina;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;
  document.querySelector("#naziv_rastavljaca").value = selectGpxFeature.values_.naziv_rastavljaca;
  document.querySelector("#most").value = selectGpxFeature.values_.most;
  document.querySelector("#topologija_mreze").value = selectGpxFeature.values_.topologija_mreze;

  setujDdlVrijednost("#nosaci_izolatora", selectGpxFeature.values_.tip_nosac_izol);
  setujDdlVrijednost("#tip_stub", selectGpxFeature.values_.tip);

  if (selectGpxFeature.values_.napon === NaponskiNivo.String04kV) {
    setujDdlVrijednost("#rasvjeta_stub", selectGpxFeature.values_.rasvjeta);
    setujDdlVrijednost("#vrsta_namjena_stub_04", selectGpxFeature.values_.vrsta_namjena);
    setujDdlVrijednost("#vrsta_materijal_stub_04", selectGpxFeature.values_.vrsta_materijal);
    setujDdlVrijednost("#vrsta_drvenog_stub_04", selectGpxFeature.values_.vrsta_drvenog);
    setujDdlVrijednost("#izolator_vrsta_stub_04", selectGpxFeature.values_.izolator_vrsta);
    setujDdlVrijednost("#izolator_funkcija_stub_04", selectGpxFeature.values_.izolator_funkcija);
    setujDdlVrijednost("#tip_izolatora_stub_04", selectGpxFeature.values_.tip_izolatora);
    setujDdlVrijednost("#nosaci_izolatora_stub_04", selectGpxFeature.values_.tip_nosac_izol);
    setujDdlVrijednost("#odvodnik_prenapona_stub_04", selectGpxFeature.values_.odvodnik_prenapona);
    setujDdlVrijednost("#uzemljivac_stub_04", selectGpxFeature.values_.uzemljivac);
    setujDdlVrijednost("#optika_stub_04", selectGpxFeature.values_.optika);
  }
  if (selectGpxFeature.values_.napon === NaponskiNivo.String10kV) {
    setujDdlVrijednost("#nn_vod_stub", selectGpxFeature.values_.nn_vod);
    setujDdlVrijednost("#vrsta_namjena_stub_10", selectGpxFeature.values_.vrsta_namjena);
    setujDdlVrijednost("#vrsta_materijal_stub_10", selectGpxFeature.values_.vrsta_materijal);
    setujDdlVrijednost("#vrsta_drvenog_stub_10", selectGpxFeature.values_.vrsta_drvenog);
    setujDdlVrijednost("#izolator_vrsta_stub_10", selectGpxFeature.values_.izolator_vrsta);
    setujDdlVrijednost("#izolator_funkcija_stub_10", selectGpxFeature.values_.izolator_funkcija);
    setujDdlVrijednost("#tip_izolatora_stub_10", selectGpxFeature.values_.tip_izolatora);
    setujDdlVrijednost("#nosaci_izolatora_stub_10", selectGpxFeature.values_.tip_nosac_izol);
    setujDdlVrijednost("#odvodnik_prenapona_stub_10", selectGpxFeature.values_.odvodnik_prenapona);
    setujDdlVrijednost("#uzemljivac_stub_10", selectGpxFeature.values_.uzemljivac);
    setujDdlVrijednost("#prikljucak_otcjep_stub_10", selectGpxFeature.values_.prikljucak_otcjep);
    setujDdlVrijednost("#nn_vod_stub_10", selectGpxFeature.values_.nn_vod);
    setujDdlVrijednost("#rastavljac_stub_10", selectGpxFeature.values_.rastavljac);
  }
  if (selectGpxFeature.values_.napon === NaponskiNivo.String35kV) {
    setujDdlVrijednost("#vrsta_namjena_stub_35", selectGpxFeature.values_.vrsta_namjena);
    setujDdlVrijednost("#vrsta_materijal_stub_35", selectGpxFeature.values_.vrsta_materijal);
    setujDdlVrijednost("#vrsta_drvenog_stub_35", selectGpxFeature.values_.vrsta_drvenog);
    setujDdlVrijednost("#izolator_vrsta_stub_35", selectGpxFeature.values_.izolator_vrsta);
    setujDdlVrijednost("#izolator_funkcija_stub_35", selectGpxFeature.values_.izolator_funkcija);
    setujDdlVrijednost("#tip_izolatora_stub_35", selectGpxFeature.values_.tip_izolatora);
    setujDdlVrijednost("#nosaci_izolatora_stub_35", selectGpxFeature.values_.tip_nosac_izol);
    setujDdlVrijednost("#odvodnik_prenapona_stub_35", selectGpxFeature.values_.odvodnik_prenapona);
    setujDdlVrijednost("#uzemljivac_stub_35", selectGpxFeature.values_.uzemljivac);
    setujDdlVrijednost("#optika_stub_35", selectGpxFeature.values_.optika);
    setujDdlVrijednost("#prikljucak_otcjep_stub_35", selectGpxFeature.values_.prikljucak_otcjep);
    setujDdlVrijednost("#rastavljac_stub_35", selectGpxFeature.values_.rastavljac);
    if(selectGpxFeature.values_["10vod"]) {
      setujDdlVrijednost("#vod_10", selectGpxFeature.values_["10vod"]);
    }
    if(selectGpxFeature.values_.desetvod){
      setujDdlVrijednost("#vod_10", selectGpxFeature.values_.desetvod);
    }
  }

  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);
}

function prikaziAtributeWmsStuba(objekat) {
  document.querySelector("#gps").value = objekat.properties.gps ?? "";
  document.querySelector("#name").value = objekat.properties.name;
  document.querySelector("#broj").value = objekat.properties.broj;
  document.querySelector("#nad_visina").value = objekat.properties.nad_visina;
  document.querySelector("#visina").value = objekat.properties.visina;
  document.querySelector("#rasp_prov").value = objekat.properties.rasp_prov;
  document.querySelector("#br_izol_faza").value = objekat.properties.br_izol_faza;
  document.querySelector("#uzemljivac_otpor").value = objekat.properties.uzemljivac_otpor;
  document.querySelector("#br_pmo").value = objekat.properties.br_pmo;
  if (objekat.properties.br_nnv?.includes(" / ")) {
    document.querySelector("#br_nnv").value = objekat.properties.br_nnv.split(" / ")[0];
    document.querySelector("#br_nnv_kablovski").value = objekat.properties.br_nnv.split(" / ")[1];
  } else {
    document.querySelector("#br_nnv").value = objekat.properties.br_nnv;
  }
  if (objekat.properties.br_10kv_vodova?.includes(" / ")) {
    document.querySelector("#br_10kv_vodova").value = objekat.properties.br_10kv_vodova.split(" / ")[0];
    document.querySelector("#br_10kv_vodova_kablovski").value = objekat.properties.br_10kv_vodova.split(" / ")[1];
  } else {
    document.querySelector("#br_10kv_vodova").value = objekat.properties.br_10kv_vodova;
  }
  if (objekat.properties.br_35kv_vodova?.includes(" / ")) {
    document.querySelector("#br_35kv_vodova").value = objekat.properties.br_35kv_vodova.split(" / ")[0];
    document.querySelector("#br_35kv_vodova_kablovski").value = objekat.properties.br_35kv_vodova.split(" / ")[1];
  } else {
    document.querySelector("#br_35kv_vodova").value = objekat.properties.br_35kv_vodova;
  }
  document.querySelector("#pog_sprem").value = objekat.properties.pog_sprem;
  document.querySelector("#opstina").value = objekat.properties.opstina;
  document.querySelector("#napon").value = objekat.properties.napon;
  document.querySelector("#naziv_rastavljaca").value = objekat.properties.naziv_rastavljaca;
  document.querySelector("#most").value = objekat.properties.most;
  document.querySelector("#topologija_mreze").value = objekat.properties.topologija_mreze;

  if (objekat.properties.napon === NaponskiNivo.String04kV) {
    setujDdlVrijednost("#tip_stub", objekat.properties.tip);
    setujDdlVrijednost("#rasvjeta_stub", objekat.properties.rasvjeta);
    setujDdlVrijednost("#vrsta_namjena_stub_04", objekat.properties.vrsta_namjena);
    setujDdlVrijednost("#vrsta_materijal_stub_04", objekat.properties.vrsta_materijal);
    setujDdlVrijednost("#vrsta_drvenog_stub_04", objekat.properties.vrsta_drvenog);
    setujDdlVrijednost("#izolator_vrsta_stub_04", objekat.properties.izolator_vrsta);
    setujDdlVrijednost("#izolator_funkcija_stub_04", objekat.properties.izolator_funkcija);
    if (objekat.properties.tip_nosac_izol?.includes(" / ")) {
      let tempNizSplit = objekat.properties.tip_nosac_izol.split(" / ");
      setujDdlVrijednost("#tip_izolatora_stub_04", tempNizSplit[0]);
      setujDdlVrijednost("#nosaci_izolatora_stub_04", tempNizSplit[1]);
    } else {
      setujDdlVrijednost("#tip_izolatora_stub_04", objekat.properties.tip_izolatora);
      setujDdlVrijednost("#nosaci_izolatora_stub_04", objekat.properties.tip_nosac_izol);
    }
    setujDdlVrijednost("#odvodnik_prenapona_stub_04", objekat.properties.odvodnik_prenapona);
    setujDdlVrijednost("#uzemljivac_stub_04", objekat.properties.uzemljivac);
    setujDdlVrijednost("#optika_stub_04", objekat.properties.optika);
  }
  if (objekat.properties.napon === NaponskiNivo.String10kV) {
    setujDdlVrijednost("#nn_vod_stub", objekat.properties.nn_vod);
    setujDdlVrijednost("#vrsta_namjena_stub_10", objekat.properties.vrsta_namjena);
    setujDdlVrijednost("#vrsta_materijal_stub_10", objekat.properties.vrsta_materijal);
    setujDdlVrijednost("#vrsta_drvenog_stub_10", objekat.properties.vrsta_drvenog);
    setujDdlVrijednost("#izolator_vrsta_stub_10", objekat.properties.izolator_vrsta);
    setujDdlVrijednost("#izolator_funkcija_stub_10", objekat.properties.izolator_funkcija);
    if (objekat.properties.tip_nosac_izol?.includes(" / ")) {
      let tempNizSplit = objekat.properties.tip_nosac_izol.split(" / ");
      setujDdlVrijednost("#tip_izolatora_stub_10", tempNizSplit[0]);
      setujDdlVrijednost("#nosaci_izolatora_stub_10", tempNizSplit[1]);
    } else {
      setujDdlVrijednost("#tip_izolatora_stub_10", objekat.properties.tip_izolatora);
      setujDdlVrijednost("#nosaci_izolatora_stub_10", objekat.properties.tip_nosac_izol);
    }
    setujDdlVrijednost("#odvodnik_prenapona_stub_10", objekat.properties.odvodnik_prenapona);
    setujDdlVrijednost("#uzemljivac_stub_10", objekat.properties.uzemljivac);
    setujDdlVrijednost("#prikljucak_otcjep_stub_10", objekat.properties.prikljucak_otcjep);
    setujDdlVrijednost("#nn_vod_stub_10", objekat.properties.nn_vod);
    setujDdlVrijednost("#rastavljac_stub_10", objekat.properties.rastavljac);
  }
  if (objekat.properties.napon === NaponskiNivo.String35kV) {
    setujDdlVrijednost("#vrsta_namjena_stub_35", objekat.properties.vrsta_namjena);
    setujDdlVrijednost("#vrsta_materijal_stub_35", objekat.properties.vrsta_materijal);
    setujDdlVrijednost("#vrsta_drvenog_stub_35", objekat.properties.vrsta_drvenog);
    setujDdlVrijednost("#izolator_vrsta_stub_35", objekat.properties.izolator_vrsta);
    setujDdlVrijednost("#izolator_funkcija_stub_35", objekat.properties.izolator_funkcija);
    if (objekat.properties.tip_nosac_izol?.includes(" / ")) {
      let tempNizSplit = objekat.properties.tip_nosac_izol.split(" / ");
      setujDdlVrijednost("#tip_izolatora_stub_35", tempNizSplit[0]);
      setujDdlVrijednost("#nosaci_izolatora_stub_35", tempNizSplit[1]);
    } else {
      setujDdlVrijednost("#tip_izolatora_stub_35", objekat.properties.tip_izolatora);
      setujDdlVrijednost("#nosaci_izolatora_stub_35", objekat.properties.tip_nosac_izol);
    }
    setujDdlVrijednost("#odvodnik_prenapona_stub_35", objekat.properties.odvodnik_prenapona);
    setujDdlVrijednost("#uzemljivac_stub_35", objekat.properties.uzemljivac);
    setujDdlVrijednost("#optika_stub_35", objekat.properties.optika);
    setujDdlVrijednost("#prikljucak_otcjep_stub_35", objekat.properties.prikljucak_otcjep);
    setujDdlVrijednost("#rastavljac_stub_35", objekat.properties.rastavljac);
    setujDdlVrijednost("#vod_10", objekat.properties["10vod"]);
  }

  setujDdlVrijednost("#vlasnistvo", objekat.properties.vlasnistvo);
}

function izmijeniAtributeWmsStuba(objekat) {
  objekat.properties.name = document.querySelector("#name").value;
  objekat.properties.broj = document.querySelector("#broj").value;
  objekat.properties.nad_visina = document.querySelector("#nad_visina").value;
  objekat.properties.visina = document.querySelector("#visina").value;
  objekat.properties.rasp_prov = document.querySelector("#rasp_prov").value;
  objekat.properties.br_izol_faza = document.querySelector("#br_izol_faza").value;
  objekat.properties.uzemljivac_otpor = document.querySelector("#uzemljivac_otpor").value;
  objekat.properties.br_pmo = document.querySelector("#br_pmo").value;
  objekat.properties.br_nnv =
    document.querySelector("#br_nnv").value + " / " + document.querySelector("#br_nnv_kablovski").value;
  objekat.properties.br_10kv_vodova =
    document.querySelector("#br_10kv_vodova").value + " / " + document.querySelector("#br_10kv_vodova_kablovski").value;
  objekat.properties.br_35kv_vodova =
    document.querySelector("#br_35kv_vodova").value + " / " + document.querySelector("#br_35kv_vodova_kablovski").value;
  objekat.properties.pog_sprem = document.querySelector("#pog_sprem").value;
  objekat.properties.opstina = document.querySelector("#opstina").value;
  objekat.properties.napon = document.querySelector("#napon").value;
  objekat.properties.vlasnistvo = document.querySelector("#vlasnistvo").value;
  objekat.properties.tip = document.querySelector("#tip_stub").value;
  objekat.properties.most = document.querySelector("#most").value;
  objekat.properties.topologija_mreze = document.querySelector("#topologija_mreze").value;
  objekat.properties.naziv_rastavljaca = document.querySelector("#naziv_rastavljaca").value;

  if (objekat.properties.napon === NaponskiNivo.String04kV) {
    objekat.properties.rasvjeta = document.querySelector("#rasvjeta_stub").value;
    objekat.properties.vrsta_namjena = document.querySelector("#vrsta_namjena_stub_04").value;
    objekat.properties.vrsta_materijal = document.querySelector("#vrsta_materijal_stub_04").value;
    objekat.properties.vrsta_drvenog = document.querySelector("#vrsta_drvenog_stub_04").value;
    objekat.properties.izolator_vrsta = document.querySelector("#izolator_vrsta_stub_04").value;
    objekat.properties.izolator_funkcija = document.querySelector("#izolator_funkcija_stub_04").value;
    objekat.properties.tip_izolatora = document.querySelector("#tip_izolatora_stub_04").value;
    objekat.properties.tip_nosac_izol = document.querySelector("#nosaci_izolatora_stub_04").value;
    objekat.properties.odvodnik_prenapona = document.querySelector("#odvodnik_prenapona_stub_04").value;
    objekat.properties.uzemljivac = document.querySelector("#uzemljivac_stub_04").value;
    objekat.properties.optika = document.querySelector("#optika_stub_04").value;
  }
  if (objekat.properties.napon === NaponskiNivo.String10kV) {
    objekat.properties.nn_vod = document.querySelector("#nn_vod_stub").value;
    objekat.properties.vrsta_namjena = document.querySelector("#vrsta_namjena_stub_10").value;
    objekat.properties.vrsta_materijal = document.querySelector("#vrsta_materijal_stub_10").value;
    objekat.properties.vrsta_drvenog = document.querySelector("#vrsta_drvenog_stub_10").value;
    objekat.properties.izolator_vrsta = document.querySelector("#izolator_vrsta_stub_10").value;
    objekat.properties.izolator_funkcija = document.querySelector("#izolator_funkcija_stub_10").value;
    objekat.properties.tip_izolatora = document.querySelector("#tip_izolatora_stub_10").value;
    objekat.properties.tip_nosac_izol = document.querySelector("#nosaci_izolatora_stub_10").value;
    objekat.properties.odvodnik_prenapona = document.querySelector("#odvodnik_prenapona_stub_10").value;
    objekat.properties.uzemljivac = document.querySelector("#uzemljivac_stub_10").value;
    objekat.properties.prikljucak_otcjep = document.querySelector("#prikljucak_otcjep_stub_10").value;
    objekat.properties.nn_vod = document.querySelector("#nn_vod_stub_10").value;
    objekat.properties.rastavljac = document.querySelector("#rastavljac_stub_10").value;
  }
  if (objekat.properties.napon === NaponskiNivo.String35kV) {
    objekat.properties.vrsta_namjena = document.querySelector("#vrsta_namjena_stub_35").value;
    objekat.properties.vrsta_materijal = document.querySelector("#vrsta_materijal_stub_35").value;
    objekat.properties.vrsta_drvenog = document.querySelector("#vrsta_drvenog_stub_35").value;
    objekat.properties.izolator_vrsta = document.querySelector("#izolator_vrsta_stub_35").value;
    objekat.properties.izolator_funkcija = document.querySelector("#izolator_funkcija_stub_35").value;
    objekat.properties.tip_izolatora = document.querySelector("#tip_izolatora_stub_35").value;
    objekat.properties.tip_nosac_izol = document.querySelector("#nosaci_izolatora_stub_35").value;
    objekat.properties.odvodnik_prenapona = document.querySelector("#odvodnik_prenapona_stub_35").value;
    objekat.properties.uzemljivac = document.querySelector("#uzemljivac_stub_35").value;
    objekat.properties.optika = document.querySelector("#optika_stub_35").value;
    objekat.properties.prikljucak_otcjep = document.querySelector("#prikljucak_otcjep_stub_35").value;
    objekat.properties.rastavljac = document.querySelector("#rastavljac_stub_35").value;
    objekat.properties["10vod"] = document.querySelector("#vod_10").value;
  }

  return objekat;
}
