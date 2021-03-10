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
      el.set("napon", document.querySelector("#napon").value);

      if (el.values_.napon === "0.4") {
        el.set("tip", document.querySelector("#tip_stub").value);
        el.set("rasvjeta", document.querySelector("#rasvjeta_stub").value);
        el.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_04").value);
        el.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_04").value);
        el.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_04").value);
        el.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_04").value);
        el.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_04").value);
        el.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_04").value);
        el.set("nosaci_izolatora", document.querySelector("#nosaci_izolatora_stub_04").value);
        el.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_04").value);
        el.set("uzemljivac", document.querySelector("#uzemljivac_stub_04").value);
        el.set("optika", document.querySelector("#optika_stub_04").value);
      }
      if (el.values_.napon === "10") {
        setujDdlVrijednost("#nn_vod_stub", selectGpxFeature.values_.nn_vod);
        el.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_10").value);
        el.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_10").value);
        el.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_10").value);
        el.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_10").value);
        el.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_10").value);
        el.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_10").value);
        el.set("nosaci_izolatora", document.querySelector("#nosaci_izolatora_stub_10").value);
        el.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_10").value);
        el.set("uzemljivac", document.querySelector("#uzemljivac_stub_10").value);
        el.set("optika", document.querySelector("#optika_stub_10").value);
        el.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep_stub_10").value);
        el.set("nn_vod", document.querySelector("#nn_vod_stub_10").value);
        el.set("rastavljac", document.querySelector("#rastavljac_stub_10").value);
      }
      if (el.values_.napon === "35") {
        el.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_35").value);
        el.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_35").value);
        el.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_35").value);
        el.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_35").value);
        el.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_35").value);
        el.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_35").value);
        el.set("nosaci_izolatora", document.querySelector("#nosaci_izolatora_stub_35").value);
        el.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_35").value);
        el.set("uzemljivac", document.querySelector("#uzemljivac_stub_35").value);
        el.set("optika", document.querySelector("#optika_stub_35").value);
        el.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep_stub_35").value);
        el.set("rastavljac", document.querySelector("#rastavljac_stub_35").value);
        el.set("10vod", document.querySelector("#vod_10").value);
      }

      el.set("broj", document.querySelector("#broj").value);
      el.set("sifra", document.querySelector("#sifra").value);
      el.set("pripadnost", document.querySelector("#pripadnost").value);
      el.set("nad_visina", document.querySelector("#nad_visina").value);
      el.set("visina", document.querySelector("#visina").value);
      el.set("rasp_prov", document.querySelector("#rasp_prov").value);
      el.set("br_izol_faza", document.querySelector("#br_izol_faza").value);
      el.set("uzemljivac_otpor", document.querySelector("#uzemljivac_otpor").value);
      el.set("br_pmo", document.querySelector("#br_pmo").value);
      el.set("br_nnv", document.querySelector("#br_nnv").value);
      el.set("pog_sprem", document.querySelector("#pog_sprem").value);
      el.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
      el.set("opstina", document.querySelector("#opstina").value);

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
    if (selectGpxFeature.values_.napon === "0.4") {
      selectGpxFeature.set("tip", document.querySelector("#tip_stub").value);
      selectGpxFeature.set("rasvjeta", document.querySelector("#rasvjeta_stub").value);
      selectGpxFeature.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_04").value);
      selectGpxFeature.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_04").value);
      selectGpxFeature.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_04").value);
      selectGpxFeature.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_04").value);
      selectGpxFeature.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_04").value);
      selectGpxFeature.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_04").value);
      selectGpxFeature.set("nosaci_izolatora", document.querySelector("#nosaci_izolatora_stub_04").value);
      selectGpxFeature.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_04").value);
      selectGpxFeature.set("uzemljivac", document.querySelector("#uzemljivac_stub_04").value);
      selectGpxFeature.set("optika", document.querySelector("#optika_stub_04").value);
    }
    if (selectGpxFeature.values_.napon === "10") {
      setujDdlVrijednost("#nn_vod_stub", selectGpxFeature.values_.nn_vod);
      selectGpxFeature.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_10").value);
      selectGpxFeature.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_10").value);
      selectGpxFeature.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_10").value);
      selectGpxFeature.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_10").value);
      selectGpxFeature.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_10").value);
      selectGpxFeature.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_10").value);
      selectGpxFeature.set("nosaci_izolatora", document.querySelector("#nosaci_izolatora_stub_10").value);
      selectGpxFeature.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_10").value);
      selectGpxFeature.set("uzemljivac", document.querySelector("#uzemljivac_stub_10").value);
      selectGpxFeature.set("optika", document.querySelector("#optika_stub_10").value);
      selectGpxFeature.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep_stub_10").value);
      selectGpxFeature.set("nn_vod", document.querySelector("#nn_vod_stub_10").value);
      selectGpxFeature.set("rastavljac", document.querySelector("#rastavljac_stub_10").value);
    }
    if (selectGpxFeature.values_.napon === "35") {
      selectGpxFeature.set("vrsta_namjena", document.querySelector("#vrsta_namjena_stub_35").value);
      selectGpxFeature.set("vrsta_materijal", document.querySelector("#vrsta_materijal_stub_35").value);
      selectGpxFeature.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog_stub_35").value);
      selectGpxFeature.set("izolator_vrsta", document.querySelector("#izolator_vrsta_stub_35").value);
      selectGpxFeature.set("izolator_funkcija", document.querySelector("#izolator_funkcija_stub_35").value);
      selectGpxFeature.set("tip_izolatora", document.querySelector("#tip_izolatora_stub_35").value);
      selectGpxFeature.set("nosaci_izolatora", document.querySelector("#nosaci_izolatora_stub_35").value);
      selectGpxFeature.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona_stub_35").value);
      selectGpxFeature.set("uzemljivac", document.querySelector("#uzemljivac_stub_35").value);
      selectGpxFeature.set("optika", document.querySelector("#optika_stub_35").value);
      selectGpxFeature.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep_stub_35").value);
      selectGpxFeature.set("rastavljac", document.querySelector("#rastavljac_stub_35").value);
      selectGpxFeature.set("10vod", document.querySelector("#vod_10").value);
    }

    selectGpxFeature.set("wizard", 0);
    selectGpxFeature.set("lejer", "stubovi");
    selectGpxFeature.set("fid_1", document.querySelector("#fid_1").value);
    selectGpxFeature.set("gps", document.querySelector("#gps").value);
    selectGpxFeature.set("broj", document.querySelector("#broj").value);
    selectGpxFeature.set("sifra", document.querySelector("#sifra").value);
    selectGpxFeature.set("pripadnost", document.querySelector("#pripadnost").value);
    selectGpxFeature.set("nad_visina", document.querySelector("#nad_visina").value);
    selectGpxFeature.set("visina", document.querySelector("#visina").value);
    selectGpxFeature.set("rasp_prov", document.querySelector("#rasp_prov").value);
    selectGpxFeature.set("br_izol_faza", document.querySelector("#br_izol_faza").value);
    selectGpxFeature.set("uzemljivac_otpor", document.querySelector("#uzemljivac_otpor").value);
    selectGpxFeature.set("br_pmo", document.querySelector("#br_pmo").value);
    selectGpxFeature.set("br_nnv", document.querySelector("#br_nnv").value);
    selectGpxFeature.set("pog_sprem", document.querySelector("#pog_sprem").value);
    selectGpxFeature.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
    selectGpxFeature.set("opstina", document.querySelector("#opstina").value);
    selectGpxFeature.set("napon", document.querySelector("#napon").value);
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
  document.querySelector("#nad_visina").value = selectGpxFeature.values_.nad_visina;
  document.querySelector("#visina").value = selectGpxFeature.values_.visina;
  document.querySelector("#rasp_prov").value = selectGpxFeature.values_.rasp_prov;
  document.querySelector("#br_izol_faza").value = selectGpxFeature.values_.br_izol_faza;
  document.querySelector("#uzemljivac_otpor").value = selectGpxFeature.values_.uzemljivac_otpor;
  document.querySelector("#br_pmo").value = selectGpxFeature.values_.br_pmo;
  document.querySelector("#br_nnv").value = selectGpxFeature.values_.br_nnv;
  document.querySelector("#pog_sprem").value = selectGpxFeature.values_.pog_sprem;
  document.querySelector("#opstina").value = selectGpxFeature.values_.opstina;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;

  if (selectGpxFeature.values_.napon === "0.4") {
    setujDdlVrijednost("#tip_stub", selectGpxFeature.values_.tip);
    setujDdlVrijednost("#rasvjeta_stub", selectGpxFeature.values_.rasvjeta);
    setujDdlVrijednost("#vrsta_namjena_stub_04", selectGpxFeature.values_.vrsta_namjena);
    setujDdlVrijednost("#vrsta_materijal_stub_04", selectGpxFeature.values_.vrsta_materijal);
    setujDdlVrijednost("#vrsta_drvenog_stub_04", selectGpxFeature.values_.vrsta_drvenog);
    setujDdlVrijednost("#izolator_vrsta_stub_04", selectGpxFeature.values_.izolator_vrsta);
    setujDdlVrijednost("#izolator_funkcija_stub_04", selectGpxFeature.values_.izolator_funkcija);
    setujDdlVrijednost("#tip_izolatora_stub_04", selectGpxFeature.values_.tip_izolatora);
    setujDdlVrijednost("#nosaci_izolatora_stub_04", selectGpxFeature.values_.nosaci_izolatora);
    setujDdlVrijednost("#odvodnik_prenapona_stub_04", selectGpxFeature.values_.odvodnik_prenapona);
    setujDdlVrijednost("#uzemljivac_stub_04", selectGpxFeature.values_.uzemljivac);
    setujDdlVrijednost("#optika_stub_04", selectGpxFeature.values_.optika);
  }
  if (selectGpxFeature.values_.napon === "10") {
    setujDdlVrijednost("#nn_vod_stub", selectGpxFeature.values_.nn_vod);
    setujDdlVrijednost("#vrsta_namjena_stub_10", selectGpxFeature.values_.vrsta_namjena);
    setujDdlVrijednost("#vrsta_materijal_stub_10", selectGpxFeature.values_.vrsta_materijal);
    setujDdlVrijednost("#vrsta_drvenog_stub_10", selectGpxFeature.values_.vrsta_drvenog);
    setujDdlVrijednost("#izolator_vrsta_stub_10", selectGpxFeature.values_.izolator_vrsta);
    setujDdlVrijednost("#izolator_funkcija_stub_10", selectGpxFeature.values_.izolator_funkcija);
    setujDdlVrijednost("#tip_izolatora_stub_10", selectGpxFeature.values_.tip_izolatora);
    setujDdlVrijednost("#nosaci_izolatora_stub_10", selectGpxFeature.values_.nosaci_izolatora);
    setujDdlVrijednost("#odvodnik_prenapona_stub_10", selectGpxFeature.values_.odvodnik_prenapona);
    setujDdlVrijednost("#uzemljivac_stub_10", selectGpxFeature.values_.uzemljivac);
    setujDdlVrijednost("#optika_stub_10", selectGpxFeature.values_.optika);
    setujDdlVrijednost("#prikljucak_otcjep_stub_10", selectGpxFeature.values_.prikljucak_otcjep);
    setujDdlVrijednost("#nn_vod_stub_10", selectGpxFeature.values_.nn_vod);
    setujDdlVrijednost("#rastavljac_stub_10", selectGpxFeature.values_.rastavljac);
  }
  if (selectGpxFeature.values_.napon === "35") {
    setujDdlVrijednost("#vrsta_namjena_stub_35", selectGpxFeature.values_.vrsta_namjena);
    setujDdlVrijednost("#vrsta_materijal_stub_35", selectGpxFeature.values_.vrsta_materijal);
    setujDdlVrijednost("#vrsta_drvenog_stub_35", selectGpxFeature.values_.vrsta_drvenog);
    setujDdlVrijednost("#izolator_vrsta_stub_35", selectGpxFeature.values_.izolator_vrsta);
    setujDdlVrijednost("#izolator_funkcija_stub_35", selectGpxFeature.values_.izolator_funkcija);
    setujDdlVrijednost("#tip_izolatora_stub_35", selectGpxFeature.values_.tip_izolatora);
    setujDdlVrijednost("#nosaci_izolatora_stub_35", selectGpxFeature.values_.nosaci_izolatora);
    setujDdlVrijednost("#odvodnik_prenapona_stub_35", selectGpxFeature.values_.odvodnik_prenapona);
    setujDdlVrijednost("#uzemljivac_stub_35", selectGpxFeature.values_.uzemljivac);
    setujDdlVrijednost("#optika_stub_35", selectGpxFeature.values_.optika);
    setujDdlVrijednost("#prikljucak_otcjep_stub_35", selectGpxFeature.values_.prikljucak_otcjep);
    setujDdlVrijednost("#rastavljac_stub_35", selectGpxFeature.values_.rastavljac);
    setujDdlVrijednost("#vod_10", selectGpxFeature.values_["10vod"]);
  }

  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);
}
