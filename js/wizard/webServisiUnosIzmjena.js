/**
 * Metode za unos/izmjenu podataka
 */

/**
 * Metoda koja za predati feature i akciju poziva web servis za unos/izmjenu/brisanje trafostanice
 * @param {*} feature
 * @param {*} akcija
 */
function cudTrafostanica(feature, akcija) {
  let wkt = wktGeometrije(feature);
  let podaciForme = new FormData();
  podaciForme.append("akcija", akcija);
  podaciForme.append("Geometry", wkt);
  podaciForme.append("id", feature.values_.id); //Ovo provjeriti
  //podaciForme.append("fid_1", feature.values_.fid_1);
  podaciForme.append("fid_1", feature.id_.split(".")[1]);
  podaciForme.append("name", feature.values_.name);
  podaciForme.append("address", feature.values_.address);
  podaciForme.append("phoneNumber", feature.values_.phoneNumber);
  podaciForme.append("id_br", feature.values_.id_br);
  podaciForme.append("celije_10", feature.values_.celije_10);
  podaciForme.append("prenos_odnos", feature.values_.prenos_odnos);
  podaciForme.append("id_billing", feature.values_.id_billing);
  podaciForme.append("izvod_celija", feature.values_.izvod_celija);
  podaciForme.append("funkcija", feature.values_.funkcija);
  podaciForme.append("tip", feature.values_.tip);
  podaciForme.append("nad_vis", feature.values_.nad_vis);
  podaciForme.append("nad_visina", feature.values_.nad_visina);
  podaciForme.append("vlasnistvo", feature.values_.vlasnistvo);
  podaciForme.append("inst_snaga_t4", feature.values_.inst_snaga_t4);
  podaciForme.append("inst_snaga_t3", feature.values_.inst_snaga_t3);
  podaciForme.append("inst_snaga_t2", feature.values_.inst_snaga_t2);
  podaciForme.append("inst_snaga_t1", feature.values_.inst_snaga_t1);
  podaciForme.append("br_nn_izvoda", feature.values_.br_nn_izvoda);
  podaciForme.append("br_vod_cel_nizi_nap", feature.values_.br_vod_cel_nizi_nap);
  podaciForme.append("layer_name", feature.values_.layer_name);
  podaciForme.append("napojna_ts", feature.values_.napojna_ts);
  podaciForme.append("opstina", feature.values_.opstina);
  podaciForme.append("naziv", feature.values_.naziv);
  podaciForme.append("god_izg", feature.values_.god_izg);
  podaciForme.append("gps", feature.values_.gps);
  podaciForme.append("br_vod_cel_visi_nap", feature.values_.br_vod_cel_visi_nap);
  podaciForme.append("datum_azuriranja", feature.values_.datum_azuriranja);
  podaciForme.append("projek_snaga", feature.values_.projek_snaga);
  podaciForme.append("pog_sprem", feature.values_.pog_sprem);
  podaciForme.append("layer_id", feature.values_.layer_id);
  podaciForme.append("napon", feature.values_.napon);
  podaciForme.append("geohash_id", feature.values_.geohash_id);
  podaciForme.append("korisnik", feature.values_.korisnik);
  podaciForme.append("katastar", feature.values_.katastar);
  podaciForme.append("originalId", feature.values_.originalId);
  podaciForme.append("posjeduje_sliku", feature.values_.posjeduje_sliku);
  podaciForme.append("vlasnik", feature.values_.vlasnik);
  podaciForme.append("geohash_id_no", feature.values_.geohash_id_no);
  podaciForme.append("sifra_napojne", feature.values_.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.values_.izvod_napojne);
  podaciForme.append("visibility", feature.values_.visibility);
  podaciForme.append("open", feature.values_.open);
  podaciForme.append("Folder", feature.values_.Folder);
  podaciForme.append("fid", feature.values_.fid);
  podaciForme.append("naziv_napojne", feature.values_.naziv_napojne);

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
function cudVod(feature, akcija) {
  let wkt = wktGeometrije(feature);
  let podaciForme = new FormData();
  podaciForme.append("akcija", akcija);
  podaciForme.append("Geometry", wkt);
  podaciForme.append("id", feature.values_.id); //Ovo provjeriti
  //podaciForme.append("fid1", feature.values_.fid1);
  podaciForme.append("fid_1", feature.id_.split(".")[1]);
  podaciForme.append("name", feature.values_.name);
  podaciForme.append("address", feature.values_.address);
  podaciForme.append("phoneNumber", feature.values_.phoneNumber);
  podaciForme.append("id_br", feature.values_.id_br);
  podaciForme.append("materijal", feature.values_.materijal);
  podaciForme.append("zajednicka_dion", feature.values_.zajednicka_dion);
  podaciForme.append("dionica_nn", feature.values_.dionica_nn);
  podaciForme.append("napon", feature.values_.napon);
  podaciForme.append("dionica", feature.values_.dionica);
  podaciForme.append("dionica_gps", feature.values_.dionica_gps);
  podaciForme.append("rasvjeta", feature.values_.rasvjeta);
  podaciForme.append("rac_duzina", feature.values_.rac_duzina);
  podaciForme.append("poc_dion", feature.values_.poc_dion);
  podaciForme.append("vrsta", feature.values_.vrsta);
  podaciForme.append("vlasnistvo", feature.values_.vlasnistvo);
  podaciForme.append("tip", feature.values_.tip);
  podaciForme.append("br_spojnica", feature.values_.br_spojnica);
  podaciForme.append("kraj_dion", feature.values_.kraj_dion);
  podaciForme.append("uze_presjek", feature.values_.uze_presjek);
  podaciForme.append("layer_name", feature.values_.layer_name);
  podaciForme.append("izvod_ts", feature.values_.izvod_ts);
  podaciForme.append("uze", feature.values_.uze);
  podaciForme.append("br_faza", feature.values_.br_faza);
  podaciForme.append("presjek", feature.values_.presjek);
  podaciForme.append("opstina", feature.values_.opstina);
  podaciForme.append("naziv", feature.values_.naziv);
  podaciForme.append("god_izg", feature.values_.god_izg);
  podaciForme.append("gps", feature.values_.gps);
  podaciForme.append("datum_azuriranja", feature.values_.datum_azuriranja);
  podaciForme.append("pog_sprem", feature.values_.pog_sprem);
  podaciForme.append("duzina", feature.values_.duzina);
  podaciForme.append("ts", feature.values_.ts);
  podaciForme.append("layer_id", feature.values_.layer_id);
  podaciForme.append("broj_spojnica", feature.values_.broj_spojnica);
  podaciForme.append("geohash_id", feature.values_.geohash_id);
  podaciForme.append("korisnik", feature.values_.korisnik);
  podaciForme.append("katastar", feature.values_.katastar);
  podaciForme.append("originalId", feature.values_.originalId);
  podaciForme.append("posjeduje_sliku", feature.values_.posjeduje_sliku);
  podaciForme.append("vlasnik", feature.values_.vlasnik);
  podaciForme.append("geohash_id_no", feature.values_.geohash_id_no);
  podaciForme.append("sifra_dionice", feature.values_.sifra_dionice);
  podaciForme.append("sifra_napojne", feature.values_.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.values_.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.values_.naziv_napojne);
  podaciForme.append("visibility", feature.values_.visibility);
  podaciForme.append("open", feature.values_.open);
  podaciForme.append("Folder", feature.values_.Folder);
  podaciForme.append("fid", feature.values_.fid);

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
function cudStub(feature, akcija) {
  let wkt = wktGeometrije(feature);
  let podaciForme = new FormData();
  podaciForme.append("akcija", akcija);
  podaciForme.append("Geometry", wkt);
  podaciForme.append("id", feature.values_.id); //Ovo provjeriti
  //podaciForme.append("fid_1", feature.values_.fid_1);
  podaciForme.append("fid_1", feature.id_.split(".")[1]);
  podaciForme.append("name", feature.values_.name);
  podaciForme.append("address", feature.values_.address);
  podaciForme.append("phoneNumber", feature.values_.phoneNumber);
  podaciForme.append("br_izol_faza", feature.values_.br_izol_faza);
  podaciForme.append("uzemljivac", feature.values_.uzemljivac);
  podaciForme.append("pripadnost", feature.values_.pripadnost);
  podaciForme.append("broj", feature.values_.broj);
  podaciForme.append("napon", feature.values_.napon);
  podaciForme.append("vrsta_namjena", feature.values_.vrsta_namjena);
  podaciForme.append("rasvjeta", feature.values_.rasvjeta);
  podaciForme.append("prikljucak_otcjep", feature.values_.prikljucak_otcjep);
  podaciForme.append("br_pmo", feature.values_.br_pmo);
  podaciForme.append("nad_visina", feature.values_.nad_visina);
  podaciForme.append("10vod", feature.values_["10vod"]);
  podaciForme.append("tip_nosac_izol", feature.values_.tip_nosac_izol);
  podaciForme.append("vlasnistvo", feature.values_.vlasnistvo);
  podaciForme.append("tip", feature.values_.tip);
  podaciForme.append("layer_name", feature.values_.layer_name);
  podaciForme.append("broj_priklj_mjernih_ormara", feature.values_.broj_priklj_mjernih_ormara);
  podaciForme.append("visina", feature.values_.visina);
  podaciForme.append("optika", feature.values_.optika);
  podaciForme.append("opstina", feature.values_.opstina);
  podaciForme.append("izolator_funkcija", feature.values_.izolator_funkcija);
  podaciForme.append("odvodnik_prenapona", feature.values_.odvodnik_prenapona);
  podaciForme.append("vrsta_drvenog", feature.values_.vrsta_drvenog);
  podaciForme.append("br_nnv", feature.values_.br_nnv);
  podaciForme.append("rastavljac", feature.values_.rastavljac);
  podaciForme.append("gps", feature.values_.gps);
  podaciForme.append("datum_azuriranja", feature.values_.datum_azuriranja);
  podaciForme.append("izolator_vrsta", feature.values_.izolator_vrsta);
  podaciForme.append("uzemljivac_otpor", feature.values_.uzemljivac_otpor);
  podaciForme.append("sifra", feature.values_.sifra);
  podaciForme.append("rasp_prov", feature.values_.rasp_prov);
  podaciForme.append("nn_vod", feature.values_.nn_vod);
  podaciForme.append("pog_sprem", feature.values_.pog_sprem);
  podaciForme.append("vrsta_materijal", feature.values_.vrsta_materijal);
  podaciForme.append("layer_id", feature.values_.layer_id);
  podaciForme.append("geohash_id", feature.values_.geohash_id);
  podaciForme.append("korisnik", feature.values_.korisnik);
  podaciForme.append("katastar", feature.values_.katastar);
  podaciForme.append("originalId", feature.values_.originalId);
  podaciForme.append("posjeduje_sliku", feature.values_.posjeduje_sliku);
  podaciForme.append("vlasnik", feature.values_.vlasnik);
  podaciForme.append("geohash_id_no", feature.values_.geohash_id_no);
  podaciForme.append("sifra_napojne", feature.values_.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.values_.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.values_.naziv_napojne);
  podaciForme.append("visibility", feature.values_.visibility);
  podaciForme.append("open", feature.values_.open);
  podaciForme.append("Folder", feature.values_.Folder);
  podaciForme.append("fid", feature.values_.fid);

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
function cudPotrosac(feature, akcija) {
  let wkt = wktGeometrije(feature);
  let podaciForme = new FormData();
  podaciForme.append("akcija", akcija);
  podaciForme.append("Geometry", wkt);
  podaciForme.append("id", feature.values_.id); //Ovo provjeriti
  //podaciForme.append("fid_1", feature.values_.fid_1);
  podaciForme.append("fid_1", feature.id_.split(".")[1]);
  podaciForme.append("name", feature.values_.name);
  podaciForme.append("address", feature.values_.address);
  podaciForme.append("phoneNumber", feature.values_.phoneNumber);
  podaciForme.append("prik_kabal", feature.values_.prik_kabal);
  podaciForme.append("pod", feature.values_.pod);
  podaciForme.append("layer_name", feature.values_.layer_name);
  podaciForme.append("adresa_mm", feature.values_.adresa_mm);
  podaciForme.append("naziv_ts", feature.values_.naziv_ts);
  podaciForme.append("prik_mjesto", feature.values_.prik_mjesto);
  podaciForme.append("opstina", feature.values_.opstina);
  podaciForme.append("sifra_ts", feature.values_.sifra_ts);
  podaciForme.append("naziv", feature.values_.naziv);
  podaciForme.append("gps", feature.values_.gps);
  podaciForme.append("datum_azuriranja", feature.values_.datum_azuriranja);
  podaciForme.append("naziv_nn_izvod", feature.values_.naziv_nn_izvod);
  podaciForme.append("pretplatni_br", feature.values_.pretplatni_br);
  podaciForme.append("br_brojila", feature.values_.br_brojila);
  podaciForme.append("layer_id", feature.values_.layer_id);
  podaciForme.append("napon", feature.values_.napon);
  podaciForme.append("geohash_id", feature.values_.geohash_id);
  podaciForme.append("korisnik", feature.values_.korisnik);
  podaciForme.append("katastar", feature.values_.katastar);
  podaciForme.append("posjeduje_sliku", feature.values_.posjeduje_sliku);
  podaciForme.append("originalId", feature.values_.originalId);
  podaciForme.append("geohash_id_no", feature.values_.geohash_id_no);
  podaciForme.append("vlasnik", feature.values_.vlasnik);
  podaciForme.append("sifra_napojne", feature.values_.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.values_.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.values_.naziv_napojne);
  podaciForme.append("visibility", feature.values_.visibility);
  podaciForme.append("open", feature.values_.open);
  podaciForme.append("Folder", feature.values_.Folder);
  podaciForme.append("fid", feature.values_.fid);

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
function cudNKRO(feature, akcija) {
  let wkt = wktGeometrije(feature);
  let podaciForme = new FormData();
  podaciForme.append("akcija", akcija);
  podaciForme.append("Geometry", wkt);
  podaciForme.append("id", feature.values_.id); //Ovo provjeriti
  //podaciForme.append("fid_1", feature.values_.fid_1);
  podaciForme.append("fid_1", feature.id_.split(".")[1]);
  podaciForme.append("name", feature.values_.name);
  podaciForme.append("address", feature.values_.address);
  podaciForme.append("phoneNumber", feature.values_.phoneNumber);
  podaciForme.append("materijal", feature.values_.materijal);
  podaciForme.append("sys_id", feature.values_.sys_id);
  podaciForme.append("montaza", feature.values_.montaza);
  podaciForme.append("vlasnistvo", feature.values_.vlasnistvo);
  podaciForme.append("br_prikljucaka", feature.values_.br_prikljucaka);
  podaciForme.append("layer_name", feature.values_.layer_name);
  podaciForme.append("izvod_ts", feature.values_.izvod_ts);
  podaciForme.append("vrata", feature.values_.vrata);
  podaciForme.append("opstina", feature.values_.opstina);
  podaciForme.append("gps", feature.values_.gps);
  podaciForme.append("datum_azuriranja", feature.values_.datum_azuriranja);
  podaciForme.append("br_izvoda", feature.values_.br_izvoda);
  podaciForme.append("pog_sprem", feature.values_.pog_sprem);
  podaciForme.append("ts", feature.values_.ts);
  podaciForme.append("layer_id", feature.values_.layer_id);
  podaciForme.append("napon", feature.values_.napon);
  podaciForme.append("geohash_id", feature.values_.geohash_id);
  podaciForme.append("korisnik", feature.values_.korisnik);
  podaciForme.append("katastar", feature.values_.katastar);
  podaciForme.append("posjeduje_sliku", feature.values_.posjeduje_sliku);
  podaciForme.append("originalId", feature.values_.originalId);
  podaciForme.append("geohash_id_no", feature.values_.geohash_id_no);
  podaciForme.append("vlasnik", feature.values_.vlasnik);
  podaciForme.append("sifra_napojne", feature.values_.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.values_.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.values_.naziv_napojne);
  podaciForme.append("visibility", feature.values_.visibility);
  podaciForme.append("open", feature.values_.open);
  podaciForme.append("Folder", feature.values_.Folder);
  podaciForme.append("fid", feature.values_.fid);

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
function cudPrikljucnoMjesto(feature, akcija) {
  let wkt = wktGeometrije(feature);
  let podaciForme = new FormData();
  podaciForme.append("akcija", akcija);
  podaciForme.append("Geometry", wkt);
  podaciForme.append("id", feature.values_.id); //Ovo provjeriti
  //podaciForme.append("fid_1", feature.values_.fid_1);
  podaciForme.append("fid_1", feature.id_.split(".")[1]);
  podaciForme.append("name", feature.values_.name);
  podaciForme.append("address", feature.values_.address);
  podaciForme.append("phoneNumber", feature.values_.phoneNumber);
  podaciForme.append("osiguraci", feature.values_.osiguraci);
  podaciForme.append("opstina", feature.values_.opstina);
  podaciForme.append("gps", feature.values_.gps);
  podaciForme.append("br_pretplatnika", feature.values_.br_pretplatnika);
  podaciForme.append("sys_id", feature.values_.sys_id);
  podaciForme.append("datum_azuriranja", feature.values_.datum_azuriranja);
  podaciForme.append("vlasnistvo", feature.values_.vlasnistvo);
  podaciForme.append("tip", feature.values_.tip);
  podaciForme.append("layer_name", feature.values_.layer_name);
  podaciForme.append("izvod_ts", feature.values_.izvod_ts);
  podaciForme.append("ts", feature.values_.ts);
  podaciForme.append("layer_id", feature.values_.layer_id);
  podaciForme.append("napon", feature.values_.napon);
  podaciForme.append("geohash_id", feature.values_.geohash_id);
  podaciForme.append("korisnik", feature.values_.korisnik);
  podaciForme.append("katastar", feature.values_.katastar);
  podaciForme.append("originalId", feature.values_.originalId);
  podaciForme.append("posjeduje_sliku", feature.values_.posjeduje_sliku);
  podaciForme.append("geohash_id_no", feature.values_.geohash_id_no);
  podaciForme.append("vlasnik", feature.values_.vlasnik);
  podaciForme.append("sifra_napojne", feature.values_.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.values_.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.values_.naziv_napojne);
  podaciForme.append("visibility", feature.values_.visibility);
  podaciForme.append("open", feature.values_.open);
  podaciForme.append("Folder", feature.values_.Folder);
  podaciForme.append("fid", feature.values_.fid);

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
function cudPOD(feature, akcija) {
  let wkt = wktGeometrije(feature);
  let podaciForme = new FormData();
  podaciForme.append("akcija", akcija);
  podaciForme.append("Geometry", wkt);
  podaciForme.append("id", feature.values_.id); //Ovo provjeriti
  //podaciForme.append("fid_1", feature.values_.fid_1);
  podaciForme.append("fid_1", feature.id_.split(".")[1]);
  podaciForme.append("name", feature.values_.name);
  podaciForme.append("address", feature.values_.address);
  podaciForme.append("phoneNumber", feature.values_.phoneNumber);
  podaciForme.append("prik_kabal", feature.values_.prik_kabal);
  podaciForme.append("pod", feature.values_.pod);
  podaciForme.append("layer_name", feature.values_.layer_name);
  podaciForme.append("adresa_mm", feature.values_.adresa_mm);
  podaciForme.append("naziv_ts", feature.values_.naziv_ts);
  podaciForme.append("prik_mjesto", feature.values_.prik_mjesto);
  podaciForme.append("opstina", feature.values_.opstina);
  podaciForme.append("sifra_ts", feature.values_.sifra_ts);
  podaciForme.append("naziv", feature.values_.naziv);
  podaciForme.append("gps", feature.values_.gps);
  podaciForme.append("datum_azuriranja", feature.values_.datum_azuriranja);
  podaciForme.append("naziv_nn_izvod", feature.values_.naziv_nn_izvod);
  podaciForme.append("pretplatni_br", feature.values_.pretplatni_br);
  podaciForme.append("br_brojila", feature.values_.br_brojila);
  podaciForme.append("layer_id", feature.values_.layer_id);
  podaciForme.append("napon", feature.values_.napon);
  podaciForme.append("geohash_id", feature.values_.geohash_id);
  podaciForme.append("korisnik", feature.values_.korisnik);
  podaciForme.append("katastar", feature.values_.katastar);
  podaciForme.append("posjeduje_sliku", feature.values_.posjeduje_sliku);
  podaciForme.append("originalId", feature.values_.originalId);
  podaciForme.append("geohash_id_no", feature.values_.geohash_id_no);
  podaciForme.append("vlasnik", feature.values_.vlasnik);
  podaciForme.append("sifra_napojne", feature.values_.sifra_napojne);
  podaciForme.append("izvod_napojne", feature.values_.izvod_napojne);
  podaciForme.append("naziv_napojne", feature.values_.naziv_napojne);
  podaciForme.append("visibility", feature.values_.visibility);
  podaciForme.append("open", feature.values_.open);
  podaciForme.append("Folder", feature.values_.Folder);
  podaciForme.append("fid", feature.values_.fid);

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
