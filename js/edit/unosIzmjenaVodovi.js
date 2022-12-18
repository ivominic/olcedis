/**
 * Metoda koja dodjeljuje property-e vodu koji se unosi
 */
function dodajPoljaUcrtanomVodu(ucrtaniVod) {
  //let napon = document.querySelector("#ddl_sloj_podataka").value;
  //let napon = document.querySelector("#napon").value;
  let napon = vodNaponskiNivoPrijeOdabira;
  console.log("DODAJ POLJA UCRTANOM VODU", napon);
  console.log(naponskiNivoNapojneTrafostanice, document.querySelector("#napon").value);

  if (napon === NaponskiNivo.String04kV) {
    ucrtaniVod.set("rasvjeta", document.querySelector("#rasvjeta_vod").value);
    ucrtaniVod.set("vrsta", document.querySelector("#vrsta_vod_04").value);
    ucrtaniVod.set("tip", document.querySelector("#tip_vod_04").value);
    ucrtaniVod.set("presjek", document.querySelector("#presjek_vod_04").value);
    ucrtaniVod.set("materijal", document.querySelector("#vrsta_materijal_vod_04").value);
    ucrtaniVod.set("uze_presjek", "");
    ucrtaniVod.set("uze", "");
  }
  if (napon === NaponskiNivo.String10kV) {
    ucrtaniVod.set("vrsta", document.querySelector("#vrsta_vod_10").value);
    ucrtaniVod.set("tip", document.querySelector("#tip_vod_10").value);
    ucrtaniVod.set("presjek", document.querySelector("#presjek_vod_10").value);
    ucrtaniVod.set("materijal", document.querySelector("#vrsta_materijal_vod_10").value);
    ucrtaniVod.set("uze", document.querySelector("#uze_vod_10").value);
    ucrtaniVod.set("rasvjeta", "");
  }
  if (napon === NaponskiNivo.String35kV) {
    ucrtaniVod.set("vrsta", document.querySelector("#vrsta_vod_35").value);
    ucrtaniVod.set("tip", document.querySelector("#tip_vod_35").value);
    ucrtaniVod.set("presjek", document.querySelector("#presjek_vod_35").value);
    ucrtaniVod.set("materijal", document.querySelector("#vrsta_materijal_vod_35").value);
    ucrtaniVod.set("uze_presjek", document.querySelector("#uze_presjek_vod_35").value);
    ucrtaniVod.set("uze", document.querySelector("#uze_vod_35").value);
    ucrtaniVod.set("rasvjeta", "");
  }

  ucrtaniVod.set("wizard", 0);
  ucrtaniVod.set("lejer", "vodovi");
  ucrtaniVod.set("fid_1", document.querySelector("#fid_1").value);
  ucrtaniVod.set("gps", "");
  ucrtaniVod.set("name", document.querySelector("#name").value);
  ucrtaniVod.set("merge", blnSpajanjeVodova);
  ucrtaniVod.set("napon", vodNaponskiNivoPrijeOdabira);
  ucrtaniVod.set("pog_sprem", document.querySelector("#pog_sprem").value);
  ucrtaniVod.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
  ucrtaniVod.set("sifra_napojne", sifraNapojneTrafostanice);
  ucrtaniVod.set("naziv_napojne", nazivNapojneTrafostanice);
  ucrtaniVod.set("izvod_napojne", izvodNapojneTrafostanice);
  ucrtaniVod.set("br_faza", document.querySelector("#br_faza").value);
  ucrtaniVod.set("br_spojnica", document.querySelector("#br_spojnica").value);
  ucrtaniVod.set("god_izg", document.querySelector("#god_izgr").value);
  ucrtaniVod.set("rac_duzina", document.querySelector("#rac_duzina").value);
  ucrtaniVod.set("duzina", document.querySelector("#duzina").value);
  ucrtaniVod.set("sifra_dionice", document.querySelector("#sifra_dionice").value);
  ucrtaniVod.set("originalId", new Date().getTime());
  ucrtaniVod.set("vlasnik", "");
  ucrtaniVod.set("korisnik", globalUsername);
}

function prikaziPoljaOdabranogVoda() {
  //Ovdje kao prikazi iz data u slučaju trafostanica
  if (selectGpxFeature.values_.gps !== undefined) {
    document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  console.log("vod feature", selectGpxFeature);
  document.querySelector("#name").value = selectGpxFeature.values_.name;
  document.querySelector("#fid_1").value = selectGpxFeature.values_.fid_1;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;
  document.querySelector("#pog_sprem").value = selectGpxFeature.values_.pog_sprem;
  document.querySelector("#br_faza").value = selectGpxFeature.values_.br_faza;
  document.querySelector("#br_spojnica").value = selectGpxFeature.values_.br_spojnica;
  document.querySelector("#god_izgr").value = selectGpxFeature.values_.god_izg;
  document.querySelector("#rac_duzina").value = selectGpxFeature.values_.rac_duzina;
  document.querySelector("#duzina").value = selectGpxFeature.values_.duzina;

  if (selectGpxFeature.values_.napon === NaponskiNivo.String04kV) {
    document.querySelector("#rasvjeta_vod").value = selectGpxFeature.values_.rasvjeta;
    document.querySelector("#vrsta_vod_04").value = selectGpxFeature.values_.vrsta;
    document.querySelector("#tip_vod_04").value = selectGpxFeature.values_.tip;
    document.querySelector("#presjek_vod_04").value = selectGpxFeature.values_.presjek;
    document.querySelector("#vrsta_materijal_vod_04").value = selectGpxFeature.values_.materijal;

    //setujDdlVrijednost("#optika_stub_04", selectGpxFeature.values_.optika);
  }
  if (selectGpxFeature.values_.napon === NaponskiNivo.String10kV) {
    document.querySelector("#vrsta_vod_10").value = selectGpxFeature.values_.vrsta;
    document.querySelector("#tip_vod_10").value = selectGpxFeature.values_.tip;
    document.querySelector("#presjek_vod_10").value = selectGpxFeature.values_.presjek;
    document.querySelector("#vrsta_materijal_vod_10").value = selectGpxFeature.values_.materijal;
    document.querySelector("#uze_vod_10").value = selectGpxFeature.values_.uze;
    document.querySelector("#sifra_dionice").value = selectGpxFeature.values_.sifra_dionice;
  }
  if (selectGpxFeature.values_.napon === NaponskiNivo.String35kV) {
    document.querySelector("#vrsta_vod_35").value = selectGpxFeature.values_.vrsta;
    document.querySelector("#tip_vod_35").value = selectGpxFeature.values_.tip;
    document.querySelector("#presjek_vod_35").value = selectGpxFeature.values_.presjek;
    document.querySelector("vrsta_#materijal_vod_35").value = selectGpxFeature.values_.materijal;
    document.querySelector("#uze_presjek_vod_35").value = selectGpxFeature.values_.uze_presjek;
    document.querySelector("#uze_vod_35").value = selectGpxFeature.values_.uze;
    document.querySelector("#sifra_dionice").value = selectGpxFeature.values_.sifra_dionice;
  }

  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);
}

function prikaziPoljaWmsVoda(objekat) {
  if (objekat.properties.gps !== undefined) {
    document.querySelector("#gps").value = objekat.properties.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  document.querySelector("#name").value = objekat.properties.name;
  document.querySelector("#fid_1").value = objekat.properties.fid_1;
  document.querySelector("#napon").value = objekat.properties.napon;
  document.querySelector("#pog_sprem").value = objekat.properties.pog_sprem;
  document.querySelector("#br_faza").value = objekat.properties.br_faza;
  document.querySelector("#br_spojnica").value = objekat.properties.br_spojnica;
  document.querySelector("#god_izgr").value = objekat.properties.god_izg;
  document.querySelector("#rac_duzina").value = objekat.properties.rac_duzina;
  document.querySelector("#duzina").value = objekat.properties.duzina;

  if (objekat.properties.napon === NaponskiNivo.String04kV) {
    document.querySelector("#rasvjeta_vod").value = objekat.properties.rasvjeta;
    document.querySelector("#vrsta_vod_04").value = objekat.properties.vrsta;
    document.querySelector("#tip_vod_04").value = objekat.properties.tip;
    document.querySelector("#presjek_vod_04").value = objekat.properties.presjek;
    document.querySelector("#vrsta_materijal_vod_04").value = objekat.properties.materijal;
  }
  if (objekat.properties.napon === NaponskiNivo.String10kV) {
    document.querySelector("#vrsta_vod_10").value = objekat.properties.vrsta;
    document.querySelector("#tip_vod_10").value = objekat.properties.tip;
    document.querySelector("#presjek_vod_10").value = objekat.properties.presjek;
    document.querySelector("#vrsta_materijal_vod_10").value = objekat.properties.materijal;
    document.querySelector("#uze_vod_10").value = objekat.properties.uze;
    //document.querySelector("#sifra_dionice").value = objekat.properties.sifra_dionice;
    setovanjeSifreDioniceIzAtributa(objekat.properties.sifra_dionice);
  }
  if (objekat.properties.napon === NaponskiNivo.String35kV) {
    document.querySelector("#vrsta_vod_35").value = objekat.properties.vrsta;
    document.querySelector("#tip_vod_35").value = objekat.properties.tip;
    document.querySelector("#presjek_vod_35").value = objekat.properties.presjek;
    document.querySelector("#vrsta_materijal_vod_35").value = objekat.properties.materijal;
    document.querySelector("#uze_presjek_vod_35").value = objekat.properties.uze_presjek;
    document.querySelector("#uze_vod_35").value = objekat.properties.uze;
    //document.querySelector("#sifra_dionice").value = objekat.properties.sifra_dionice;
    setovanjeSifreDioniceIzAtributa(objekat.properties.sifra_dionice);
  }

  setujDdlVrijednost("#vlasnistvo", objekat.properties.vlasnistvo);
}

function izmijeniAtributeWmsVoda(objekat) {
  objekat.properties.name = document.querySelector("#name").value;
  objekat.properties.napon = document.querySelector("#napon").value;
  objekat.properties.pog_sprem = document.querySelector("#pog_sprem").value;
  objekat.properties.br_faza = document.querySelector("#br_faza").value;
  objekat.properties.br_spojnica = document.querySelector("#br_spojnica").value;
  objekat.properties.god_izg = document.querySelector("#god_izgr").value;
  objekat.properties.rac_duzina = document.querySelector("#rac_duzina").value;
  objekat.properties.duzina = document.querySelector("#duzina").value;

  if (objekat.properties.napon === NaponskiNivo.String04kV) {
    objekat.properties.rasvjeta = document.querySelector("#rasvjeta_vod").value;
    objekat.properties.vrsta = document.querySelector("#vrsta_vod_04").value;
    objekat.properties.tip = document.querySelector("#tip_vod_04").value;
    objekat.properties.presjek = document.querySelector("#presjek_vod_04").value;
    objekat.properties.materijal = document.querySelector("#vrsta_materijal_vod_04").value;
  }
  if (objekat.properties.napon === NaponskiNivo.String10kV) {
    objekat.properties.vrsta = document.querySelector("#vrsta_vod_10").value;
    objekat.properties.tip = document.querySelector("#tip_vod_10").value;
    objekat.properties.presjek = document.querySelector("#presjek_vod_10").value;
    objekat.properties.materijal = document.querySelector("#vrsta_materijal_vod_10").value;
    objekat.properties.uze = document.querySelector("#uze_vod_10").value;
    objekat.properties.sifra_dionice = document.querySelector("#sifra_dionice").value;
  }
  if (objekat.properties.napon === NaponskiNivo.String35kV) {
    objekat.properties.vrsta = document.querySelector("#vrsta_vod_35").value;
    objekat.properties.tip = document.querySelector("#tip_vod_35").value;
    objekat.properties.presjek = document.querySelector("#presjek_vod_35").value;
    objekat.properties.materijal = document.querySelector("#vrsta_materijal_vod_35").value;
    objekat.properties.uze_presjek = document.querySelector("#uze_presjek_vod_35").value;
    objekat.properties.uze = document.querySelector("#uze_vod_35").value;
    objekat.properties.sifra_dionice = document.querySelector("#sifra_dionice").value;
  }

  //setujDdlVrijednost("#vlasnistvo", objekat.properties.vlasnistvo);
  return objekat;
}
