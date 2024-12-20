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
    rasvjeta: el.properties.rasvjeta,
    prikljucak_otcjep: el.properties.prikljucak_otcjep,
    br_pmo: el.properties.br_pmo,
    nad_visina: el.properties.nad_visina,
    vod_10: el.properties.vod10,
    desetvod: el.properties["10vod"],
    tip_nosac_izol: el.properties.tip_izolatora + " / " + el.properties.tip_nosac_izol,
    vlasnistvo: el.properties.vlasnistvo,
    tip: el.properties.tip,
    visina: el.properties.visina,
    optika: el.properties.optika,
    opstina: el.properties.opstina,
    izolator_funkcija: el.properties.izolator_funkcija,
    odvodnik_prenapona: el.properties.odvodnik_prenapona,
    vrsta_drvenog: el.properties.vrsta_drvenog,
    br_nnv: el.properties.br_nnv,
    br_10kv_vodova: el.properties.br_10kv_vodova,
    br_35kv_vodova: el.properties.br_35kv_vodova,
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
    vrsta_materijal: el.properties.vrsta_materijal,
    naziv_rastavljaca: el.properties.naziv_rastavljaca,
    korisnik: globalUsername,
    sifra_napojne: el.properties.sifra_napojne,
    naziv_napojne: el.properties.naziv_napojne,
    izvod_napojne: el.properties.izvod_napojne,
    topologija_mreze: el.properties.topologija_mreze,
    vlasnik: tempVlasnik,
    akcija: action,
    wizard: 0,
    lejer: Lejeri.Stubovi,
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
    most: el.properties.most
  };
  return item;
}


/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 */
 function prikljucnaKonzolaArrayElementProperties(el, action) {
  let tempVlasnik = el.properties.vlasnik;
  action === "I" && (tempVlasnik = globalUsername);
  let item = {
    //fid_1: el.properties.fid_1,
    Geometry: wkt3Du2D(prepareGeometryWms(el)),
    name: el.properties.name,
    izvod_id: el.properties.izvod_id,
    pog_sprem: el.properties.pog_sprem,
    uzemljivac: el.properties.uzemljivac,
    //fid: el.properties.fid,
    br_izol_faza: el.properties.br_izol_faza,
    uzemljivac: el.properties.uzemljivac,
    broj: el.properties.broj,
    napon: el.properties.napon,
    vrsta_namjena: el.properties.vrsta_namjena,
    rasvjeta: el.properties.rasvjeta,
    prikljucak_otcjep: el.properties.prikljucak_otcjep,
    br_pmo: el.properties.br_pmo,
    nad_visina: el.properties.nad_visina,
    vod_10: el.properties.vod10,
    desetvod: el.properties["10vod"],
    tip_nosac_izol: el.properties.tip_izolatora + " / " + el.properties.tip_nosac_izol,
    vlasnistvo: el.properties.vlasnistvo,
    tip: el.properties.tip,
    visina: el.properties.visina,
    optika: el.properties.optika,
    opstina: el.properties.opstina,
    izolator_funkcija: el.properties.izolator_funkcija,
    odvodnik_prenapona: el.properties.odvodnik_prenapona,
    vrsta_drvenog: el.properties.vrsta_drvenog,
    br_nnv: el.properties.br_nnv,
    br_10kv_vodova: el.properties.br_10kv_vodova,
    br_35kv_vodova: el.properties.br_35kv_vodova,
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
    vrsta_materijal: el.properties.vrsta_materijal,
    naziv_rastavljaca: el.properties.naziv_rastavljaca,
    korisnik: globalUsername,
    sifra_napojne: el.properties.sifra_napojne,
    naziv_napojne: el.properties.naziv_napojne,
    izvod_napojne: el.properties.izvod_napojne,
    vlasnik: tempVlasnik,
    akcija: action,
    wizard: 0,
    lejer: Lejeri.PrikljucnaKonzola,
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
    topologija_mreze: el.properties.topologija_mreze,
    vlasnik: tempVlasnik,
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
    ebs_sifra: el.values_.ebs_sifra,
    sifra_trafoa: el.values_.sifra_trafoa,
    fid: el.properties.fid,
    celije_10: el.properties.celije_10,
    prenos_odnos: el.properties.prenos_odnos,
    id_billing: el.properties.id_billing,
    izvod_celija: el.properties.izvod_celija,
    funkcija: el.properties.funkcija,
    nad_vis: el.properties.nad_vis,
    inst_snaga_t4: el.properties.inst_snaga_t4,
    inst_snaga_t3: el.properties.inst_snaga_t3,
    inst_snaga_t2: el.properties.inst_snaga_t2,
    inst_snaga_t1: el.properties.inst_snaga_t1,
    br_nn_izvoda: el.properties.br_nn_izvoda,
    br_vod_cel_visi_nap: el.properties.br_vod_cel_visi_nap,
    br_vod_cel_nizi_nap: el.properties.br_vod_cel_nizi_nap,
    projek_snaga: el.properties.projek_snaga,
    napon: el.properties.napon,
    vlasnistvo: el.properties.vlasnistvo,
    tip: el.properties.tip,
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
    lejer: Lejeri.Trafostanice,
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
    napon: el.properties.napon,
    vlasnistvo: el.properties.vlasnistvo,
    tip: el.properties.tip,
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
    lejer: Podsloj.PrikljucnoMjesto,
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
    skriveni_id_pm: el?.properties?.skriveni_id_pm,
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
    prik_mjesto: el.properties.prik_mjesto,
    skriveni_id_pm: el.properties.prik_mjesto,
    naziv: el.properties.naziv,
    naziv_nn_izvod: el.properties.naziv_nn_izvod,
    pretplatni_br: el.properties.pretplatni_br,
    br_brojila: el.properties.br_brojila,
    napon: el.properties.napon,
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
    lejer: Podsloj.Potrosac,
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
  };
  //Korisnici koji vrše unos, često imaju bolju sliku u nazivu nn izvoda.
  //Ako je ovo polje popunjeno, tu vrijednost treba proslijediti.
  if (document.querySelector("#naziv_nn_izvod").value.trim()) {
    item.naziv_nn_izvod = document.querySelector("#naziv_nn_izvod").value.trim();
  }
  return item;
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 */
function solariArrayElementProperties(el, action) {
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
    prik_mjesto: el.properties.prik_mjesto,
    skriveni_id_pm: el.properties.prik_mjesto,
    naziv: el.properties.naziv,
    naziv_nn_izvod: el.properties.naziv_nn_izvod,
    snaga_elektrane: el.properties.snaga_elektrane,
    vlasnistvo: el.properties.vlasnistvo,
    legalan: el.properties.legalan,
    pretplatni_br: el.properties.pretplatni_br,
    br_brojila: el.properties.br_brojila,
    napon: el.properties.napon,
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
    lejer: Podsloj.Solari,
    geohash_id: el.properties.geohash_id,
    geohash_id_no: el.properties.geohash_id_no,
    posjeduje_sliku: el.properties.posjeduje_sliku,
    originalId: el.properties.originalId,
  };
  //Korisnici koji vrše unos, često imaju bolju sliku u nazivu nn izvoda.
  //Ako je ovo polje popunjeno, tu vrijednost treba proslijediti.
  if (document.querySelector("#naziv_nn_izvod").value.trim()) {
    item.naziv_nn_izvod = document.querySelector("#naziv_nn_izvod").value.trim();
  }
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
    prik_mjesto: el.properties.prik_mjesto,
    naziv: el.properties.naziv,
    naziv_nn_izvod: el.properties.naziv_nn_izvod,
    pretplatni_br: el.properties.pretplatni_br,
    br_brojila: el.properties.br_brojila,
    napon: el.properties.napon,
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
    lejer: Podsloj.Pod,
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
    lejer: Podsloj.Nkro,
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
  if (lejer === Lejeri.Stubovi) {
    item = stubArrayElementProperties(el, "U");
    stuboviArrayFinal.push(item);
  } else if (lejer === Lejeri.Trafostanice) {
    item = trafostanicaArrayElementProperties(el, "U");
    trafostaniceArrayFinal.push(item);
  } else if (lejer === Lejeri.NKRO) {
    item = nkroArrayElementProperties(el, "U");
    nkroArrayFinal.push(item);
  } else if (lejer === Podsloj.Potrosac || lejer === Lejeri.Potrosac) {
    item = potrosacArrayElementProperties(el, "U");
    if (!provjeraPostojanjaPotrosacaZaAzuriranjeSaGeometrijom(item)) {
      potrosaciArrayFinal.push(item);
    }
  } else if (lejer === Podsloj.Solari || lejer === Lejeri.Solari) {
    item = solariArrayElementProperties(el, "U");
    if (!provjeraPostojanjaZaAzuriranjeSaGeometrijomSolari(item)) {
      solariArrayFinal.push(item);
    }
  } else if (lejer === Podsloj.Pod || lejer === Lejeri.POD) {
    item = podArrayElementProperties(el, "U");
    podoviArrayFinal.push(item);
  } else if (lejer === Lejeri.PrikljucnoMjesto) {
    item = prikljucnoMjestoArrayElementProperties(el, "U");
    prikljucnaMjestaArrayFinal.push(item);
  } else if (lejer === Lejeri.Vodovi) {
    item = vodArrayElementProperties(el, "U");
    vodoviArrayFinal.push(item);
  } else if(lejer === Lejeri.PrikljucnaKonzola) {
    item = prikljucnaKonzolaArrayElementProperties(el, "U");
    prikljucnaKonzolaArrayFinal.push(item);
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
