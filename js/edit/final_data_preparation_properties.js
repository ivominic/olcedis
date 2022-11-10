/** Module for data preparation - converting wms objects into JSON arrays, expected by web service */

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action

 */
function stubArrayElementProperties(el, action) {
  let tempVlasnik = el.properties.vlasnik;
  action === "I" && (tempVlasnik = globalUsername);
  let item = {
    //fid_1: el.properties.fid_1,
    Geometry: wkt3Du2D(prepareGeometryWms(el)),
    name: el.properties.name,
    //fid: el.properties.fid,
    br_izol_faza: el.properties.br_izol_faza,
    uzemljivac: el.properties.uzemljivac,
    broj: el.properties.broj,
    napon: el.properties.napon,
    vrsta_namjena: el.properties.vrsta_namjena,
    vrsta_materijal: el.properties.vrsta_materijal,
    rasvjeta: el.properties.rasvjeta,
    prikljucak_otcjep: el.properties.prikljucak_otcjep,
    br_pmo: el.properties.br_pmo,
    nad_visina: el.properties.nad_visina,
    vod_10: el.properties.vod10, //Jovanu je polje 10vod - vidjeti može li se json poslati ovako ili da mijenjamo naziv
    desetvod: el.properties["10vod"],
    //tip_nosac_izol: el.properties.tip_nosac_izol,
    tip_nosac_izol: el.properties.nosaci_izolatora,
    vlasnistvo: el.properties.vlasnistvo,
    tip: el.properties.tip,
    id: el.properties.id, //Vidjeti šta ovdje predajem
    br_pmo: el.properties.br_pmo,
    visina: el.properties.visina,
    optika: el.properties.optika,
    opstina: el.properties.opstina,
    izolator_funkcija: el.properties.izolator_funkcija,
    odvodnik_prenapona: el.properties.odvodnik_prenapona,
    vrsta_drvenog: el.properties.vrsta_drvenog,
    br_nnv: el.properties.br_nnv,
    gps: el.properties.gps,
    rastavljac: el.properties.rastavljac,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    izolator_vrsta: el.properties.izolator_vrsta,
    uzemljivac_otpor: el.properties.uzemljivac_otpor,
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    rasp_prov: el.properties.rasp_prov,
    nn_vod: el.properties.nn_vod,
    pog_sprem: el.properties.pog_sprem,
    korisnik: globalUsername,
    sifra_napojne: el.properties.sifra_napojne,
    naziv_napojne: el.properties.naziv_napojne,
    izvod_napojne: el.properties.izvod_napojne,
    vlasnik: tempVlasnik,
    akcija: action,
    wizard: 0,
    lejer: "stubovi",
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
  };
  return item;
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 */
function vodArrayElementProperties(el, action) {
  let tempVlasnik = el.properties.vlasnik;
  action === "I" && (tempVlasnik = globalUsername);
  let item = {
    fid_1: el.properties.fid_1,
    Geometry: prepareGeometryWms(el),
    name: el.properties.name,
    merge: el.properties.merge,
    fid: el.properties.fid,
    materijal: el.properties.materijal,
    napon: el.properties.napon,
    rasvjeta: el.properties.rasvjeta,
    rac_duzina: el.properties.rac_duzina,
    vrsta: el.properties.vrsta,
    vlasnistvo: el.properties.vlasnistvo,
    tip: el.properties.tip,
    br_spojnica: el.properties.br_spojnica,
    id: el.properties.id, //Vidjeti šta ovdje predajem    
    uze_presjek: el.properties.uze_presjek,
    uze: el.properties.uze,
    br_faza: el.properties.br_faza,
    presjek: el.properties.presjek,
    opstina: el.properties.opstina,
    god_izg: el.properties.god_izg,
    gps: el.properties.gps,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    pog_sprem: el.properties.pog_sprem,
    duzina: el.properties.duzina,
    geohash_id: "", //Provjeriti da li treba da se šalje
    geohash_id_no: "", //Provjeriti da li treba da se šalje
    korisnik: globalUsername,
    katastar: "",
    posjeduje_sliku: "NE",
    originalId: el.properties.originalId,
    sifra_dionice: el.properties.sifra_dionice,
    sifra_napojne: el.properties.sifra_napojne,
    naziv_napojne: el.properties.naziv_napojne,
    izvod_napojne: el.properties.izvod_napojne,
    vlasnik: tempVlasnik,
    ts: el.properties.ts,
    akcija: action,
    wizard: 0,
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    posjeduje_sliku: el.properties.posjeduje_sliku,
  };
  return item;
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 */
function trafostanicaArrayElementProperties(el, action) {
  let tempVlasnik = el.properties.vlasnik;
  action === "I" && (tempVlasnik = globalUsername);
  let item = {
    fid_1: el.properties.fid_1,
    Geometry: wkt3Du2D(prepareGeometryWms(el)),
    name: el.properties.name,
    fid: el.properties.fid,
    celije_10: el.properties.celije_10,
    prenos_odnos: el.properties.prenos_odnos,
    id_billing: el.properties.id_billing,
    id: el.properties.id_billing,
    izvod_celija: el.properties.izvod_celija,
    funkcija: el.properties.funkcija,
    nad_vis: el.properties.nad_vis,
    inst_snaga_t4: el.properties.inst_snaga_t4,
    inst_snaga_t3: el.properties.inst_snaga_t3,
    inst_snaga_t2: el.properties.inst_snaga_t2,
    inst_snaga_t1: el.properties.inst_snaga_t1,
    br_nn_izvoda: el.properties.br_nn_izvoda,
    napojna_ts: el.properties.napojna_ts,
    br_vod_cel_visi_nap: el.properties.br_vod_cel_visi_nap,
    br_vod_cel_nizi_nap: el.properties.br_vod_cel_nizi_nap,
    projek_snaga: el.properties.projek_snaga,
    napon: el.properties.napon,
    vlasnistvo: el.properties.vlasnistvo,
    tip: el.properties.tip,
    id: el.properties.id, //Vidjeti šta ovdje predajem
    opstina: el.properties.opstina,
    god_izg: el.properties.god_izg,
    gps: el.properties.gps,
    pog_sprem: el.properties.pog_sprem,
    korisnik: globalUsername,
    sifra_napojne: el.properties.sifra_napojne,
    naziv_napojne: el.properties.naziv_napojne,
    izvod_napojne: el.properties.izvod_napojne,
    vlasnik: tempVlasnik,
    akcija: action,
    wizard: 0,
    lejer: "trafostanice",
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
  };
  return item;
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 */
function prikljucnoMjestoArrayElementProperties(el, action) {
  let tempVlasnik = el.properties.vlasnik;
  action === "I" && (tempVlasnik = globalUsername);
  let item = {
    fid_1: el.properties.fid_1,
    Geometry: wkt3Du2D(prepareGeometryWms(el)),
    name: el.properties.name,
    fid: el.properties.fid,
    osiguraci: el.properties.osiguraci,
    br_pretplatnika: el.properties.br_pretplatnika,
    ts: el.properties.ts,
    napon: el.properties.napon,
    vlasnistvo: el.properties.vlasnistvo,
    tip: el.properties.tip,
    tip: el.properties.tip_pm,
    id: el.properties.id, //Vidjeti šta ovdje predajem
    opstina: el.properties.opstina,
    gps: el.properties.gps,
    korisnik: globalUsername,
    sifra_napojne: el.properties.sifra_napojne,
    naziv_napojne: el.properties.naziv_napojne,
    izvod_napojne: el.properties.izvod_napojne,
    vlasnik: tempVlasnik,
    akcija: action,
    wizard: 0,
    lejer: "prikljucno_mjesto",
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
  };
  return item;
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 */
function potrosacArrayElementProperties(el, action) {
  let tempVlasnik = el.properties.vlasnik;
  action === "I" && (tempVlasnik = globalUsername);
  let item = {
    fid_1: el.properties.fid_1,
    Geometry: wkt3Du2D(prepareGeometryWms(el)),
    name: el.properties.name,
    fid: el.properties.fid,
    prik_kabal: el.properties.prik_kabal,
    pod: el.properties.pod,
    adresa_mm: el.properties.adresa_mm,
    naziv_ts: el.properties.naziv_ts,
    prik_mjesto: el.properties.prik_mjesto,
    sifra_ts: el.properties.sifra_ts,
    naziv: el.properties.naziv,
    naziv_nn_izvod: el.properties.naziv_nn_izvod,
    pretplatni_br: el.properties.pretplatni_br,
    br_brojila: el.properties.br_brojila,
    napon: el.properties.napon,
    id: el.properties.id, //Vidjeti šta ovdje predajem
    opstina: el.properties.opstina,
    gps: el.properties.gps,
    korisnik: globalUsername,
    sifra_napojne: el.properties.sifra_napojne,
    naziv_napojne: el.properties.naziv_napojne,
    izvod_napojne: el.properties.izvod_napojne,
    status: el.properties.status,
    vlasnik: tempVlasnik,
    akcija: action,
    wizard: 0,
    lejer: "potrosac",
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
  };
  return item;
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 */
function podArrayElementProperties(el, action) {
  let tempVlasnik = el.properties.vlasnik;
  action === "I" && (tempVlasnik = globalUsername);
  let item = {
    fid_1: el.properties.fid_1,
    Geometry: wkt3Du2D(prepareGeometryWms(el)),
    name: el.properties.name,
    fid: el.properties.fid,
    prik_kabal: el.properties.prik_kabal,
    pod: el.properties.pod,
    adresa_mm: el.properties.adresa_mm,
    naziv_ts: el.properties.naziv_ts,
    prik_mjesto: el.properties.prik_mjesto,
    sifra_ts: el.properties.sifra_ts,
    naziv: el.properties.naziv,
    naziv_nn_izvod: el.properties.naziv_nn_izvod,
    pretplatni_br: el.properties.pretplatni_br,
    br_brojila: el.properties.br_brojila,
    napon: el.properties.napon,
    id: el.properties.id, //Vidjeti šta ovdje predajem
    opstina: el.properties.opstina,
    gps: el.properties.gps,
    korisnik: globalUsername,
    sifra_napojne: el.properties.sifra_napojne,
    naziv_napojne: el.properties.naziv_napojne,
    izvod_napojne: el.properties.izvod_napojne,
    status: el.properties.status,
    vlasnik: tempVlasnik,
    akcija: action,
    wizard: 0,
    lejer: "pod",
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
  };
  return item;
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 */
function nkroArrayElementProperties(el, action) {
  let tempVlasnik = el.properties.vlasnik;
  action === "I" && (tempVlasnik = globalUsername);
  let item = {
    fid_1: el.properties.fid_1,
    Geometry: wkt3Du2D(prepareGeometryWms(el)),
    name: el.properties.name,
    fid: el.properties.fid,
    materijal: el.properties.materijal,
    montaza: el.properties.montaza,
    vlasnistvo: el.properties.vlasnistvo,
    br_prikljucaka: el.properties.br_prikljucaka,
    vrata: el.properties.vrata,
    br_izvoda: el.properties.br_izvoda,
    pog_sprem: el.properties.pog_sprem,
    ts: el.properties.ts,
    napon: el.properties.napon,
    id: el.properties.id, //Vidjeti šta ovdje predajem
    opstina: el.properties.opstina,
    gps: el.properties.gps,
    korisnik: globalUsername,
    sifra_napojne: el.properties.sifra_napojne,
    naziv_napojne: el.properties.naziv_napojne,
    izvod_napojne: el.properties.izvod_napojne,
    vlasnik: tempVlasnik,
    akcija: action,
    wizard: 0,
    lejer: "nkro",
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
  };
  return item;
}

function pripremaZaAzuriranjeWmsObjekta(el) {
  let lejer;
  if (el.id) {
    lejer = el.id.split(".")[0];
  }
  if (el.id_) {
    lejer = el.id_.split(".")[0];
  }
  let item;
  console.log("Lejer ažuriranje", lejer);
  if (lejer === "stubovi") {
    item = stubArrayElementProperties(el, "U");
    stuboviArrayFinal.push(item);
  } else if (lejer === "trafostanice") {
    item = trafostanicaArrayElementProperties(el, "U");
    trafostaniceArrayFinal.push(item);
  } else if (lejer === "nkro") {
    item = nkroArrayElementProperties(el, "U");
    nkroArrayFinal.push(item);
  } else if (lejer === "potrosac") {
    item = potrosacArrayElementProperties(el, "U");
    potrosaciArrayFinal.push(item);
  } else if (lejer === "pod") {
    item = podArrayElementProperties(el, "U");
    podoviArrayFinal.push(item);
  } else if (lejer === "prikljucno_mjesto") {
    item = prikljucnoMjestoArrayElementProperties(el, "U");
    prikljucnaMjestaArrayFinal.push(item);
  } else if (lejer === "vodovi") {
    item = vodArrayElementProperties(el, "U");
    vodoviArrayFinal.push(item);
  }

  return item;
}

function prepareGeometryWms(objekat) {
  let format = new ol.format.WKT();
  let geomObject = objekat.geometry;
  let geom;
  if (geomObject.type === "Point") {
    geom = format.writeGeometry(new ol.geom.Point(geomObject.coordinates), {});
  } else if (geomObject.type === "LineString") {
    geom = format.writeGeometry(new ol.geom.LineString(geomObject.coordinates), {});
  } else if (geomObject.type === "Polygon") {
    geom = format.writeGeometry(new ol.geom.Polygon(geomObject.coordinates), {});
  }

  return geom;
}
