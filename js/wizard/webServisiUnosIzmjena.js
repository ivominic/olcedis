/**
 * Metode za unos/izmjenu podataka
 */

/**
 * Metoda koja za predati feature i akciju poziva web servis za unos/izmjenu/brisanje trafostanice
 * @param {*} feature
 * @param {*} akcija
 */
function cudTrafostanica(feature, akcija, wizard) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", wizard);
  podaciForme.append("akcija", akcija);
  podaciForme.append("group_id", globalTimestamp);
  podaciForme.append("Geometry", feature.Geometry);
  podaciForme.append("id", feature.id); //Ovo provjeriti
  podaciForme.append("fid_1", feature.fid_1);
  podaciForme.append("name", feature.name);
  podaciForme.append("celije_10", feature.celije_10);
  podaciForme.append("prenos_odnos", feature.prenos_odnos);
  podaciForme.append("id_billing", feature.id_billing);
  podaciForme.append("izvod_celija", feature.izvod_celija);
  podaciForme.append("funkcija", feature.funkcija);
  podaciForme.append("tip", feature.tip);
  podaciForme.append("nad_vis", feature.nad_vis);
  podaciForme.append("nad_visina", feature.nad_visina);
  podaciForme.append("vlasnistvo", feature.vlasnistvo);
  podaciForme.append("inst_snaga_t4", feature.inst_snaga_t4);
  podaciForme.append("inst_snaga_t3", feature.inst_snaga_t3);
  podaciForme.append("inst_snaga_t2", feature.inst_snaga_t2);
  podaciForme.append("inst_snaga_t1", feature.inst_snaga_t1);
  podaciForme.append("br_nn_izvoda", feature.br_nn_izvoda);
  podaciForme.append("br_vod_cel_nizi_nap", feature.br_vod_cel_nizi_nap);
  podaciForme.append("opstina", feature.opstina);
  podaciForme.append("naziv", feature.naziv);
  podaciForme.append("god_izg", feature.god_izg);
  podaciForme.append("gps", feature.gps);
  podaciForme.append("br_vod_cel_visi_nap", feature.br_vod_cel_visi_nap);
  podaciForme.append("datum_azuriranja", feature.datum_azuriranja);
  podaciForme.append("projek_snaga", feature.projek_snaga);
  podaciForme.append("pog_sprem", feature.pog_sprem);
  podaciForme.append("napon", feature.napon);
  podaciForme.append("geohash_id", feature.geohash_id);
  podaciForme.append("korisnik", feature.korisnik);
  podaciForme.append("katastar", feature.katastar);
  podaciForme.append("originalId", feature.originalId);
  podaciForme.append("posjeduje_sliku", feature.posjeduje_sliku);
  podaciForme.append("vlasnik", feature.vlasnik);
  podaciForme.append("geohash_id_no", feature.geohash_id_no);
  podaciForme.append("sifra_napojne", feature.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.izvod_napojne);
  podaciForme.append("fid", feature.fid);
  podaciForme.append("naziv_napojne", feature.naziv_napojne);

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/trafostanice_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      //poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}

/**
 * Metoda koja za predati feature i akciju poziva web servis za unos/izmjenu/brisanje voda
 * @param {*} feature
 * @param {*} akcija
 */
function cudVod(feature, akcija, wizard) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", wizard);
  podaciForme.append("akcija", akcija);
  podaciForme.append("group_id", globalTimestamp);
  podaciForme.append("Geometry", feature.Geometry);
  podaciForme.append("id", feature.id); //Ovo provjeriti
  podaciForme.append("fid1", feature.fid_1);
  podaciForme.append("name", feature.name);
  podaciForme.append("materijal", feature.materijal);
  podaciForme.append("napon", feature.napon);
  podaciForme.append("rasvjeta", feature.rasvjeta);
  podaciForme.append("rac_duzina", feature.rac_duzina);
  podaciForme.append("vrsta", feature.vrsta);
  podaciForme.append("vlasnistvo", feature.vlasnistvo);
  podaciForme.append("tip", feature.tip);
  podaciForme.append("br_spojnica", feature.br_spojnica);
  podaciForme.append("uze_presjek", feature.uze_presjek);
  podaciForme.append("uze", feature.uze);
  podaciForme.append("br_faza", feature.br_faza);
  podaciForme.append("presjek", feature.presjek);
  podaciForme.append("opstina", feature.opstina);
  podaciForme.append("naziv", feature.naziv);
  podaciForme.append("god_izg", feature.god_izg);
  podaciForme.append("gps", feature.gps);
  podaciForme.append("datum_azuriranja", feature.datum_azuriranja);
  podaciForme.append("pog_sprem", feature.pog_sprem);
  podaciForme.append("duzina", feature.duzina);
  podaciForme.append("ts", feature.ts);
  podaciForme.append("geohash_id", feature.geohash_id);
  podaciForme.append("korisnik", feature.korisnik);
  podaciForme.append("katastar", feature.katastar);
  podaciForme.append("originalId", feature.originalId);
  podaciForme.append("posjeduje_sliku", feature.posjeduje_sliku);
  podaciForme.append("vlasnik", feature.vlasnik);
  podaciForme.append("geohash_id_no", feature.geohash_id_no);
  podaciForme.append("sifra_dionice", feature.sifra_dionice);
  podaciForme.append("sifra_napojne", feature.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.naziv_napojne);
  podaciForme.append("fid", feature.fid);

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/vodovi_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      //poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}

/**
 * Metoda koja za predati feature i akciju poziva web servis za unos/izmjenu/brisanje stuba
 * @param {*} feature
 * @param {*} akcija
 */
function cudStub(feature, akcija, wizard) {
  //let wkt = wktGeometrije(feature);
  //wkt = wkt3Du2D(wkt);
  let podaciForme = new FormData();
  podaciForme.append("wizard", wizard);
  podaciForme.append("akcija", akcija);
  podaciForme.append("group_id", globalTimestamp);
  podaciForme.append("Geometry", feature.Geometry);
  podaciForme.append("id", feature.id); //Ovo provjeriti
  podaciForme.append("fid_1", feature.fid_1);
  podaciForme.append("name", feature.name);
  podaciForme.append("br_izol_faza", feature.br_izol_faza);
  podaciForme.append("uzemljivac", feature.uzemljivac);
  podaciForme.append("broj", feature.broj);
  podaciForme.append("napon", feature.napon);
  podaciForme.append("vrsta_namjena", feature.vrsta_namjena);
  podaciForme.append("rasvjeta", feature.rasvjeta);
  podaciForme.append("prikljucak_otcjep", feature.prikljucak_otcjep);
  podaciForme.append("br_pmo", feature.br_pmo);
  podaciForme.append("nad_visina", feature.nad_visina);
  podaciForme.append("10vod", feature.vod_10);
  podaciForme.append("desetvod", feature.desetvod);
  podaciForme.append("tip_nosac_izol", feature.tip_nosac_izol);
  podaciForme.append("vlasnistvo", feature.vlasnistvo);
  podaciForme.append("tip", feature.tip);
  podaciForme.append("br_pmo", feature.br_pmo);
  podaciForme.append("visina", feature.visina);
  podaciForme.append("optika", feature.optika);
  podaciForme.append("opstina", feature.opstina);
  podaciForme.append("izolator_funkcija", feature.izolator_funkcija);
  podaciForme.append("odvodnik_prenapona", feature.odvodnik_prenapona);
  podaciForme.append("vrsta_drvenog", feature.vrsta_drvenog);
  podaciForme.append("br_nnv", feature.br_nnv);
  podaciForme.append("rastavljac", feature.rastavljac);
  podaciForme.append("gps", feature.gps);
  podaciForme.append("datum_azuriranja", feature.datum_azuriranja);
  podaciForme.append("izolator_vrsta", feature.izolator_vrsta);
  podaciForme.append("uzemljivac_otpor", feature.uzemljivac_otpor);
  podaciForme.append("sifra", feature.sifra);
  podaciForme.append("rasp_prov", feature.rasp_prov);
  podaciForme.append("nn_vod", feature.nn_vod);
  podaciForme.append("pog_sprem", feature.pog_sprem);
  podaciForme.append("vrsta_materijal", feature.vrsta_materijal);
  podaciForme.append("geohash_id", feature.geohash_id);
  podaciForme.append("korisnik", feature.korisnik);
  podaciForme.append("katastar", feature.katastar);
  podaciForme.append("originalId", feature.originalId.replace("_", ""));
  podaciForme.append("posjeduje_sliku", feature.posjeduje_sliku);
  podaciForme.append("vlasnik", feature.vlasnik);
  podaciForme.append("geohash_id_no", feature.geohash_id_no);
  podaciForme.append("sifra_napojne", feature.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.naziv_napojne);
  podaciForme.append("fid", feature.fid);

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/stubovi_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      //poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}

/**
 * Metoda koja za predati feature i akciju poziva web servis za unos/izmjenu/brisanje potrošača
 * @param {*} feature
 * @param {*} akcija
 */
function cudPotrosac(feature, akcija, wizard) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", wizard);
  podaciForme.append("akcija", akcija);
  podaciForme.append("group_id", globalTimestamp);
  podaciForme.append("Geometry", feature.Geometry);
  podaciForme.append("id", feature.id); //Ovo provjeriti
  podaciForme.append("fid_1", feature.fid_1);
  podaciForme.append("name", feature.name);
  podaciForme.append("prik_kabal", feature.prik_kabal);
  podaciForme.append("pod", feature.pod);
  podaciForme.append("adresa_mm", feature.adresa_mm);
  podaciForme.append("prik_mjesto", feature.prik_mjesto);
  podaciForme.append("opstina", feature.opstina);
  podaciForme.append("naziv", feature.naziv);
  podaciForme.append("gps", feature.gps);
  podaciForme.append("datum_azuriranja", feature.datum_azuriranja);
  podaciForme.append("pretplatni_br", feature.pretplatni_br);
  podaciForme.append("br_brojila", feature.br_brojila);
  podaciForme.append("napon", feature.napon);
  podaciForme.append("geohash_id", feature.geohash_id);
  podaciForme.append("korisnik", feature.korisnik);
  podaciForme.append("katastar", feature.katastar);
  podaciForme.append("posjeduje_sliku", feature.posjeduje_sliku);
  podaciForme.append("originalId", feature.originalId);
  podaciForme.append("geohash_id_no", feature.geohash_id_no);
  podaciForme.append("vlasnik", feature.vlasnik);
  podaciForme.append("naziv_napojne", feature.naziv_napojne);
  podaciForme.append("sifra_napojne", feature.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.izvod_napojne);
  podaciForme.append("fid", feature.fid);

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/potrosaci_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      //poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}

/**
 * Metoda koja za predati feature i akciju poziva web servis za unos/izmjenu/brisanje nkro
 * @param {*} feature
 * @param {*} akcija
 */
function cudNKRO(feature, akcija, wizard) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", wizard);
  podaciForme.append("akcija", akcija);
  podaciForme.append("group_id", globalTimestamp);
  podaciForme.append("Geometry", feature.Geometry);
  podaciForme.append("id", feature.id); //Ovo provjeriti
  podaciForme.append("fid_1", feature.fid_1);
  podaciForme.append("name", feature.name);
  podaciForme.append("materijal", feature.materijal);
  podaciForme.append("montaza", feature.montaza);
  podaciForme.append("vlasnistvo", feature.vlasnistvo);
  podaciForme.append("br_prikljucaka", feature.br_prikljucaka);
  podaciForme.append("vrata", feature.vrata);
  podaciForme.append("opstina", feature.opstina);
  podaciForme.append("gps", feature.gps);
  podaciForme.append("datum_azuriranja", feature.datum_azuriranja);
  podaciForme.append("br_izvoda", feature.br_izvoda);
  podaciForme.append("pog_sprem", feature.pog_sprem);
  podaciForme.append("ts", feature.ts);
  podaciForme.append("napon", feature.napon);
  podaciForme.append("geohash_id", feature.geohash_id);
  podaciForme.append("korisnik", feature.korisnik);
  podaciForme.append("katastar", feature.katastar);
  podaciForme.append("posjeduje_sliku", feature.posjeduje_sliku);
  podaciForme.append("originalId", feature.originalId);
  podaciForme.append("geohash_id_no", feature.geohash_id_no);
  podaciForme.append("vlasnik", feature.vlasnik);
  podaciForme.append("sifra_napojne", feature.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.naziv_napojne);
  podaciForme.append("fid", feature.fid);

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/nkro_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      //poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}

/**
 * Metoda koja za predati feature i akciju poziva web servis za unos/izmjenu/brisanje priključnog mjesta
 * @param {*} feature
 * @param {*} akcija
 */
function cudPrikljucnoMjesto(feature, akcija, wizard) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", wizard);
  podaciForme.append("akcija", akcija);
  podaciForme.append("group_id", globalTimestamp);
  podaciForme.append("Geometry", feature.Geometry);
  podaciForme.append("id", feature.id); //Ovo provjeriti
  podaciForme.append("fid_1", feature.fid_1);
  podaciForme.append("name", feature.name);
  podaciForme.append("osiguraci", feature.osiguraci);
  podaciForme.append("opstina", feature.opstina);
  podaciForme.append("gps", feature.gps);
  podaciForme.append("br_pretplatnika", feature.br_pretplatnika);
  podaciForme.append("datum_azuriranja", feature.datum_azuriranja);
  podaciForme.append("vlasnistvo", feature.vlasnistvo);
  podaciForme.append("tip", feature.tip);
  podaciForme.append("ts", feature.ts);
  podaciForme.append("napon", feature.napon);
  podaciForme.append("geohash_id", feature.geohash_id);
  podaciForme.append("korisnik", feature.korisnik);
  podaciForme.append("katastar", feature.katastar);
  podaciForme.append("originalId", feature.originalId);
  podaciForme.append("posjeduje_sliku", feature.posjeduje_sliku);
  podaciForme.append("geohash_id_no", feature.geohash_id_no);
  podaciForme.append("vlasnik", feature.vlasnik);
  podaciForme.append("sifra_napojne", feature.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.naziv_napojne);
  podaciForme.append("fid", feature.fid);

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/prikljucno_mjesto_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      //poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}

/**
 * Metoda koja za predati feature i akciju poziva web servis za unos/izmjenu/brisanje pod-a
 * @param {*} feature
 * @param {*} akcija
 */
function cudPOD(feature, akcija, wizard) {
  console.log("Unos pod-a", feature);
  let wkt = wktGeometrije(feature);
  let podaciForme = new FormData();
  podaciForme.append("wizard", wizard);
  podaciForme.append("akcija", akcija);
  podaciForme.append("group_id", globalTimestamp);
  podaciForme.append("Geometry", feature.Geometry);
  podaciForme.append("id", feature.id); //Ovo provjeriti
  podaciForme.append("fid_1", feature.fid_1);
  podaciForme.append("name", feature.name);
  podaciForme.append("prik_kabal", feature.prik_kabal);
  podaciForme.append("pod", feature.pod);
  podaciForme.append("adresa_mm", feature.adresa_mm);
  podaciForme.append("prik_mjesto", feature.prik_mjesto);
  podaciForme.append("opstina", feature.opstina);
  podaciForme.append("naziv", feature.naziv);
  podaciForme.append("gps", feature.gps);
  podaciForme.append("datum_azuriranja", feature.datum_azuriranja);
  podaciForme.append("pretplatni_br", feature.pretplatni_br);
  podaciForme.append("br_brojila", feature.br_brojila);
  podaciForme.append("napon", feature.napon);
  podaciForme.append("geohash_id", feature.geohash_id);
  podaciForme.append("korisnik", feature.korisnik);
  podaciForme.append("katastar", feature.katastar);
  podaciForme.append("posjeduje_sliku", feature.posjeduje_sliku);
  podaciForme.append("originalId", feature.originalId);
  podaciForme.append("geohash_id_no", feature.geohash_id_no);
  podaciForme.append("vlasnik", feature.vlasnik);
  podaciForme.append("naziv_napojne", feature.naziv_napojne);
  podaciForme.append("sifra_napojne", feature.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.izvod_napojne);  
  podaciForme.append("fid", feature.fid);

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/pod_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      //poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}
