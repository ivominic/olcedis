/** Module for data preparation - converting features into JSON arrays, expected by web service */

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 * @param {* "0" if web service is not call from wizard form, "1" else} wizard
 */
function stubArrayElement(el, action, wizard) {
  let item = {
    fid_1: el.values_.fid_1,
    Geometry: wktGeometrije(el),
    name: el.values_.name,
    fid: el.values_.fid,
    br_izol_faza: el.values_.br_izol_faza,
    uzemljivac: el.values_.uzemljivac,
    pripadnost: el.values_.pripadnost,
    broj: el.values_.broj,
    napon: el.values_.napon,
    vrsta_namjena: el.values_.vrsta_namjena,
    rasvjeta: el.values_.rasvjeta,
    prikljucak_otcjep: el.values_.prikljucak_otcjep,
    br_pmo: el.values_.br_pmo,
    nad_visina: el.values_.nad_visina,
    vod_10: el.values_.vod10, //Jovanu je polje 10vod - vidjeti može li se json poslati ovako ili da mijenjamo naziv
    tip_nosac_izol: el.values_.tip_nosac_izol,
    vlasnistvo: el.values_.vlasnistvo,
    tip: el.values_.tip,
    id: el.values_.id, //Vidjeti šta ovdje predajem
    layer_name: el.values_.layer_name, //Mislim da se ovo ne popunjava. Provjeriti
    broj_priklj_mjernih_ormara: el.values_.broj_priklj_mjernih_ormara,
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
    layer_id: "", //Provjeriti da li treba da se šalje
    geohash_id: "", //Provjeriti da li treba da se šalje
    geohash_id_no: "", //Provjeriti da li treba da se šalje
    korisnik: "test", //TODO: Pročitati korisnika koji vrši unos
    posjeduje_sliku: false,
    originalId: el.values_.originalId,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    vlasnik: el.values_.vlasnik,
    akcija: action,
    wizard: wizard,
  };
  console.log("Stubovi finalno", item);
  stuboviArrayFinal.push(item);

  /*kmlLinksArray.push({
    new_object_id: kmlFeature.get("originalId"),
    old_object_id: oldObject[1],
    old_object_type: oldObject[0],
  });*/
}

/**
 * Preparing JSON object from feature
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 * @param {* "0" if web service is not call from wizard form, "1" else} wizard
 */
function vodArrayElement(el, action, wizard) {
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
    layer_id: "", //Provjeriti da li treba da se šalje
    broj_spojnica: el.values_.broj_spojnica,
    geohash_id: "", //Provjeriti da li treba da se šalje
    geohash_id_no: "", //Provjeriti da li treba da se šalje
    korisnik: "test", //TODO: Pročitati korisnika koji vrši unos
    katastar: "",
    posjeduje_sliku: false,
    originalId: el.values_.originalId,
    sifra_dionice: el.values_.sifra_dionice,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    vlasnik: el.values_.vlasnik,
    ts: el.values_.ts,
    akcija: action,
    wizard: wizard,
  };
  console.log("Vodovi finalno", item);
  stuboviArrayFinal.push(item);
}

//TODO: Made procedures for other layers
