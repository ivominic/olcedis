/** Module for data preparation - converting features into JSON arrays, expected by web service for WIZARD*/

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 * @param {* "0" if web service is not call from wizard form, "1" else} wizard
 * @param {* Serial number inside gpx/kml file. Used to generate unique originalId with timestamp} serialNo
 */
function stubArrayElement(el, action, wizard, serialNo) {
  let item = {
    //fid_1: el.values_.fid_1,
    Geometry: wkt3Du2D(wktGeometrije(el)),
    name: el.values_.name,
    //fid: el.values_.fid,
    br_izol_faza: el.values_.br_izol_faza,
    uzemljivac: el.values_.uzemljivac,
    pripadnost: el.values_.pripadnost,
    broj: el.values_.broj,
    napon: el.values_.napon,
    vrsta_namjena: el.values_.vrsta_namjena,
    vrsta_materijal: el.values_.vrsta_materijal,
    rasvjeta: el.values_.rasvjeta,
    prikljucak_otcjep: el.values_.prikljucak_otcjep,
    br_pmo: el.values_.br_pmo,
    nad_visina: el.values_.nad_visina,
    vod_10: el.values_.vod10, //Jovanu je polje 10vod - vidjeti može li se json poslati ovako ili da mijenjamo naziv
    desetvod: el.values_.desetvod,
    //tip_nosac_izol: el.values_.tip_nosac_izol,
    tip_nosac_izol: el.values_.nosaci_izolatora,
    vlasnistvo: el.values_.vlasnistvo,
    tip: el.values_.tip,
    id: el.values_.id, //Vidjeti šta ovdje predajem
    layer_name: el.values_.layer_name, //Mislim da se ovo ne popunjava. Provjeriti
    br_pmo: el.values_.br_pmo,
    visina: el.values_.visina,
    optika: el.values_.optika,
    opstina: el.values_.opstina,
    izolator_funkcija: el.values_.izolator_funkcija,
    odvodnik_prenapona: el.values_.odvodnik_prenapona,
    vrsta_drvenog: el.values_.vrsta_drvenog,
    br_nnv: el.values_.br_nnv,
    gps: el.values_.gps,
    rastavljac: el.values_.rastavljac,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    izolator_vrsta: el.values_.izolator_vrsta,
    uzemljivac_otpor: el.values_.uzemljivac_otpor,
    sifra: el.values_.sifra,
    rasp_prov: el.values_.rasp_prov,
    nn_vod: el.values_.nn_vod,
    pog_sprem: el.values_.pog_sprem,
    layer_id: el.values_.layer_id,
    geohash_id: el.values_.geohash_id,
    geohash_id_no: el.values_.geohash_id_no,
    korisnik: globalUsername,
    posjeduje_sliku: "NE",
    originalId: parseInt(new Date().getTime() + "" + serialNo), //el.values_.originalId,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    vlasnik: el.values_.vlasnik,
    akcija: action,
    wizard: wizard,
    isEditable: isEditable,
  };
  console.log("Stubovi finalno", item);
  stuboviArrayFinal.push(item);
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 * @param {* "0" if web service is not call from wizard form, "1" else} wizard
 * @param {* Serial number inside gpx/kml file. Used to generate unique originalId with timestamp} serialNo
 */
function vodArrayElement(el, action, wizard, serialNo) {
  let item = {
    fid_1: el.values_.fid_1,
    Geometry: wktGeometrije(el),
    name: el.values_.name,
    fid: el.values_.fid,
    materijal: el.values_.materijal,
    zajednicka_dion: el.values_.zajednicka_dion,
    id_br: el.values_.id_br,
    dionica_nn: el.values_.dionica_nn,
    napon: el.values_.napon,
    dionica: el.values_.dionica,
    dionica_gps: el.values_.dionica_gps,
    rasvjeta: el.values_.rasvjeta,
    rac_duzina: el.values_.rac_duzina,
    poc_dion: el.values_.poc_dion,
    vrsta: el.values_.vrsta,
    vlasnistvo: el.values_.vlasnistvo,
    tip: el.values_.tip,
    br_spojnica: el.values_.br_spojnica,
    id: el.values_.id, //Vidjeti šta ovdje predajem
    kraj_dion: el.values_.kraj_dion,
    uze_presjek: el.values_.uze_presjek,
    layer_name: el.values_.layer_name, //Mislim da se ovo ne popunjava. Provjeriti
    izvod_ts: el.values_.izvod_ts,
    uze: el.values_.uze,
    br_faza: el.values_.br_faza,
    presjek: el.values_.presjek,
    opstina: el.values_.opstina,
    naziv: el.values_.naziv,
    god_izg: el.values_.god_izg,
    gps: el.values_.gps,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    pog_sprem: el.values_.pog_sprem,
    duzina: el.values_.duzina,
    broj_spojnica: el.values_.broj_spojnica,
    layer_id: el.values_.layer_id,
    geohash_id: el.values_.geohash_id,
    geohash_id_no: el.values_.geohash_id_no,
    korisnik: globalUsername,
    katastar: "",
    posjeduje_sliku: "NE",
    //originalId: new Date().getTime() + "" + serialNo, //el.values_.originalId,
    originalId: el.values_.originalId,
    sifra_dionice: el.values_.sifra_dionice,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    vlasnik: el.values_.vlasnik,
    ts: el.values_.ts,
    akcija: action,
    wizard: wizard,
    isEditable: isEditable,
  };
  console.log("Vodovi finalno", item);
  vodoviArrayFinal.push(item);
}

//TODO: Made procedures for other layers

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 * @param {* "0" if web service is not call from wizard form, "1" else} wizard
 * @param {* Serial number inside gpx/kml file. Used to generate unique originalId with timestamp} serialNo
 */
function trafostanicaArrayElement(el, action, wizard, serialNo) {
  let item = {
    fid_1: el.values_.fid_1,
    Geometry: wkt3Du2D(wktGeometrije(el)),
    name: el.values_.name,
    fid: el.values_.fid,
    celije_10: el.values_.celije_10,
    prenos_odnos: el.values_.prenos_odnos,
    id_billing: el.values_.id_billing,
    id: el.values_.id_billing,
    izvod_celija: el.values_.izvod_celija,
    funkcija: el.values_.funkcija,
    nad_vis: el.values_.nad_vis,
    inst_snaga_t4: el.values_.inst_snaga_t4,
    inst_snaga_t3: el.values_.inst_snaga_t3,
    inst_snaga_t2: el.values_.inst_snaga_t2,
    inst_snaga_t1: el.values_.inst_snaga_t1,
    br_nn_izvoda: el.values_.br_nn_izvoda,
    napojna_ts: el.values_.napojna_ts,
    br_vod_cel_visi_nap: el.values_.br_vod_cel_visi_nap,
    br_vod_cel_nizi_nap: el.values_.br_vod_cel_nizi_nap,
    projek_snaga: el.values_.projek_snaga,
    id_br: el.values_.id_br,
    napon: el.values_.napon,
    vlasnistvo: el.values_.vlasnistvo,
    tip: el.values_.tip,
    id: el.values_.id, //Vidjeti šta ovdje predajem
    layer_name: el.values_.layer_name, //Mislim da se ovo ne popunjava. Provjeriti
    opstina: el.values_.opstina,
    naziv: el.values_.naziv,
    god_izg: el.values_.god_izg,
    gps: el.values_.gps,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    pog_sprem: el.values_.pog_sprem,
    layer_id: el.values_.layer_id,
    geohash_id: el.values_.geohash_id,
    geohash_id_no: el.values_.geohash_id_no,
    korisnik: globalUsername,
    katastar: "",
    posjeduje_sliku: "NE",
    originalId: new Date().getTime() + "" + serialNo, //el.values_.originalId,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    vlasnik: el.values_.vlasnik,
    akcija: action,
    wizard: wizard,
    isEditable: isEditable,
  };
  console.log("Trafostanice finalno", item);
  trafostaniceArrayFinal.push(item);
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 * @param {* "0" if web service is not call from wizard form, "1" else} wizard
 * @param {* Serial number inside gpx/kml file. Used to generate unique originalId with timestamp} serialNo
 */
function prikljucnoMjestoArrayElement(el, action, wizard, serialNo) {
  let item = {
    fid_1: el.values_.fid_1,
    Geometry: wkt3Du2D(wktGeometrije(el)),
    name: el.values_.name,
    fid: el.values_.fid,
    osiguraci: el.values_.osiguraci,
    br_pretplatnika: el.values_.br_pretplatnika,
    izvod_ts: el.values_.izvod_ts,
    ts: el.values_.ts,
    napon: el.values_.napon,
    vlasnistvo: el.values_.vlasnistvo,
    tip: el.values_.tip,
    tip: el.values_.tip_pm,
    id: el.values_.id, //Vidjeti šta ovdje predajem
    layer_name: el.values_.layer_name, //Mislim da se ovo ne popunjava. Provjeriti
    opstina: el.values_.opstina,
    gps: el.values_.gps,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    layer_id: el.values_.layer_id,
    geohash_id: el.values_.geohash_id,
    geohash_id_no: el.values_.geohash_id_no,
    korisnik: globalUsername,
    katastar: "",
    posjeduje_sliku: "NE",
    originalId: new Date().getTime() + "" + serialNo, //el.values_.originalId,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    vlasnik: el.values_.vlasnik,
    akcija: action,
    wizard: wizard,
    isEditable: isEditable,
  };
  console.log("Priključno mjesto finalno", item);
  prikljucnaMjestaArrayFinal.push(item);
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 * @param {* "0" if web service is not call from wizard form, "1" else} wizard
 * @param {* Serial number inside gpx/kml file. Used to generate unique originalId with timestamp} serialNo
 */
function potrosacArrayElement(el, action, wizard, serialNo) {
  let item = {
    fid_1: el.values_.fid_1,
    Geometry: wkt3Du2D(wktGeometrije(el)),
    name: el.values_.name,
    fid: el.values_.fid,
    prik_kabal: el.values_.prik_kabal,
    pod: el.values_.pod,
    adresa_mm: el.values_.adresa_mm,
    naziv_ts: el.values_.naziv_ts,
    prik_mjesto: el.values_.prik_mjesto,
    sifra_ts: el.values_.sifra_ts,
    naziv: el.values_.naziv,
    naziv_nn_izvod: el.values_.naziv_nn_izvod,
    pretplatni_br: el.values_.pretplatni_br,
    br_brojila: el.values_.br_brojila,
    napon: el.values_.napon,
    id: el.values_.id, //Vidjeti šta ovdje predajem
    layer_name: el.values_.layer_name, //Mislim da se ovo ne popunjava. Provjeriti
    opstina: el.values_.opstina,
    gps: el.values_.gps,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    layer_id: el.values_.layer_id,
    geohash_id: el.values_.geohash_id,
    geohash_id_no: el.values_.geohash_id_no,
    korisnik: globalUsername,
    katastar: "",
    posjeduje_sliku: "NE",
    originalId: new Date().getTime() + "" + serialNo, //el.values_.originalId,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    status: el.values_.status,
    vlasnik: el.values_.vlasnik,
    akcija: action,
    wizard: wizard,
    isEditable: isEditable,
  };
  console.log("Potrošači finalno", item);
  potrosaciArrayFinal.push(item);
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 * @param {* "0" if web service is not call from wizard form, "1" else} wizard
 * @param {* Serial number inside gpx/kml file. Used to generate unique originalId with timestamp} serialNo
 */
function podArrayElement(el, action, wizard, serialNo) {
  let item = {
    fid_1: el.values_.fid_1,
    Geometry: wkt3Du2D(wktGeometrije(el)),
    name: el.values_.name,
    fid: el.values_.fid,
    prik_kabal: el.values_.prik_kabal,
    pod: el.values_.pod,
    adresa_mm: el.values_.adresa_mm,
    naziv_ts: el.values_.naziv_ts,
    prik_mjesto: el.values_.prik_mjesto,
    sifra_ts: el.values_.sifra_ts,
    naziv: el.values_.naziv,
    naziv_nn_izvod: el.values_.naziv_nn_izvod,
    pretplatni_br: el.values_.pretplatni_br,
    br_brojila: el.values_.br_brojila,
    napon: el.values_.napon,
    id: el.values_.id, //Vidjeti šta ovdje predajem
    layer_name: el.values_.layer_name, //Mislim da se ovo ne popunjava. Provjeriti
    opstina: el.values_.opstina,
    gps: el.values_.gps,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    layer_id: el.values_.layer_id,
    geohash_id: el.values_.geohash_id,
    geohash_id_no: el.values_.geohash_id_no,
    korisnik: globalUsername,
    katastar: "",
    posjeduje_sliku: "NE",
    originalId: new Date().getTime() + "" + serialNo, //el.values_.originalId,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    status: el.values_.status,
    vlasnik: el.values_.vlasnik,
    akcija: action,
    wizard: wizard,
    isEditable: isEditable,
  };
  console.log("Podovi finalno", item);
  podoviArrayFinal.push(item);
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 * @param {* "0" if web service is not call from wizard form, "1" else} wizard
 * @param {* Serial number inside gpx/kml file. Used to generate unique originalId with timestamp} serialNo
 */
function nkroArrayElement(el, action, wizard, serialNo) {
  let item = {
    fid_1: el.values_.fid_1,
    Geometry: wkt3Du2D(wktGeometrije(el)),
    name: el.values_.name,
    fid: el.values_.fid,
    materijal: el.values_.materijal,
    montaza: el.values_.montaza,
    vlasnistvo: el.values_.vlasnistvo,
    br_prikljucaka: el.values_.br_prikljucaka,
    izvod_ts: el.values_.izvod_ts,
    vrata: el.values_.vrata,
    br_izvoda: el.values_.br_izvoda,
    pog_sprem: el.values_.pog_sprem,
    ts: el.values_.ts,
    napon: el.values_.napon,
    id: el.values_.id, //Vidjeti šta ovdje predajem
    layer_name: el.values_.layer_name, //Mislim da se ovo ne popunjava. Provjeriti
    opstina: el.values_.opstina,
    gps: el.values_.gps,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    layer_id: el.values_.layer_id,
    geohash_id: el.values_.geohash_id,
    geohash_id_no: el.values_.geohash_id_no,
    korisnik: globalUsername,
    katastar: "",
    posjeduje_sliku: "NE",
    originalId: new Date().getTime() + "" + serialNo, //el.values_.originalId,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    vlasnik: el.values_.vlasnik,
    akcija: action,
    wizard: wizard,
    isEditable: isEditable,
  };
  console.log("Nkro finalno", item);
  nkroArrayFinal.push(item);
}
