/**
 * Metoda koja dodjeljuje property-e vodu koji se unosi
 */
function dodajPoljaUcrtanomVodu(ucrtaniVod) {
  //let napon = document.querySelector("#ddl_sloj_podataka").value;
  let napon = document.querySelector("#napon").value;
  napon === "";
  if (napon === "0.4") {
    ucrtaniVod.set("rasvjeta", document.querySelector("#rasvjeta_vod").value);
    ucrtaniVod.set("vrsta", document.querySelector("#vrsta_vod_04").value);
    ucrtaniVod.set("tip", document.querySelector("#tip_vod_04").value);
    ucrtaniVod.set("presjek", document.querySelector("#presjek_vod_04").value);
    ucrtaniVod.set("materijal", document.querySelector("#vrsta_materijal_vod_04").value);
    ucrtaniVod.set("uze_presjek", "");
    ucrtaniVod.set("uze", "");
  }
  if (napon === "10") {
    ucrtaniVod.set("vrsta", document.querySelector("#vrsta_vod_10").value);
    ucrtaniVod.set("tip", document.querySelector("#tip_vod_10").value);
    ucrtaniVod.set("presjek", document.querySelector("#presjek_vod_10").value);
    ucrtaniVod.set("materijal", document.querySelector("#vrsta_materijal_vod_10").value);
    ucrtaniVod.set("uze_presjek", document.querySelector("#uze_presjek_vod_10").value);
    ucrtaniVod.set("uze", document.querySelector("#uze_vod_10").value);
    ucrtaniVod.set("rasvjeta", "");
  }
  if (napon === "35") {
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
  //ucrtaniVod.set("gps", document.querySelector("#gps").value);
  ucrtaniVod.set("napon", document.querySelector("#napon").value);
  ucrtaniVod.set("pog_sprem", document.querySelector("#pog_sprem").value);
  ucrtaniVod.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
  ucrtaniVod.set("dionica", document.querySelector("#dionica").value);
  ucrtaniVod.set("id_br", document.querySelector("#id_br").value);
  ucrtaniVod.set("naziv", document.querySelector("#naziv").value);
  ucrtaniVod.set("name", document.querySelector("#naziv").value);
  ucrtaniVod.set("dionica_nn", document.querySelector("#dionica_nn").value);
  ucrtaniVod.set("ts", sifraNapojneTrafostanice);
  ucrtaniVod.set("sifra_napojne", sifraNapojneTrafostanice);
  ucrtaniVod.set("naziv_napojne", nazivNapojneTrafostanice);
  ucrtaniVod.set("izvod_napojne", izvodNapojneTrafostanice);
  ucrtaniVod.set("izvod_ts", izvodNapojneTrafostanice);
  ucrtaniVod.set("layer_name", izvodNapojneTrafostanice);
  ucrtaniVod.set("br_faza", document.querySelector("#br_faza").value);
  ucrtaniVod.set("br_spojnica", document.querySelector("#br_spojnica").value);
  ucrtaniVod.set("god_izgr", document.querySelector("#god_izgr").value);
  ucrtaniVod.set("poc_dion", document.querySelector("#poc_dion").value);
  ucrtaniVod.set("kraj_dion", document.querySelector("#kraj_dion").value);
  ucrtaniVod.set("zajednicka_dion", document.querySelector("#zajednicka_dion").value);
  ucrtaniVod.set("dionica_gps", document.querySelector("#dionica_gps").value);
  ucrtaniVod.set("rac_duzina", document.querySelector("#rac_duzina").value);
  ucrtaniVod.set("duzina", document.querySelector("#duzina").value);
  ucrtaniVod.set("broj_spojnica", document.querySelector("#broj_spojnica").value);
  ucrtaniVod.set("sifra_dionice", document.querySelector("#sifra_dionice").value);
  ucrtaniVod.set("originalId", new Date().getTime());
}

function prikaziPoljaOdabranogVoda() {
  //Ovdje kao prikazi iz data u slučaju trafostanica
  if (selectGpxFeature.values_.gps !== undefined) {
    document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  console.log("vod napon", selectGpxFeature.values_.napon);
  //document.querySelector("#fid_1").value = selectGpxFeature.values_.fid_1;
  document.querySelector("#fid_1").value = selectGpxFeature.values_.fid_1;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;
  document.querySelector("#pog_sprem").value = selectGpxFeature.values_.pog_sprem;
  document.querySelector("#dionica").value = selectGpxFeature.values_.dionica;
  document.querySelector("#id_br").value = selectGpxFeature.values_.id_br;
  document.querySelector("#naziv").value = selectGpxFeature.values_.naziv;
  document.querySelector("#dionica_nn").value = selectGpxFeature.values_.dionica_nn;
  document.querySelector("#ts").value = selectGpxFeature.values_.ts;
  //document.querySelector("#sifra_napojne").value = selectGpxFeature.values_.sifra_napojne;
  //document.querySelector("#naziv_napojne").value = selectGpxFeature.values_.naziv_napojne;
  //document.querySelector("#izvod_napojne").value = selectGpxFeature.values_.izvod_napojne;
  document.querySelector("#br_faza").value = selectGpxFeature.values_.br_faza;
  document.querySelector("#br_spojnica").value = selectGpxFeature.values_.br_spojnica;
  document.querySelector("#god_izgr").value = selectGpxFeature.values_.god_izgr;
  document.querySelector("#poc_dion").value = selectGpxFeature.values_.poc_dion;
  document.querySelector("#kraj_dion").value = selectGpxFeature.values_.kraj_dion;
  document.querySelector("#zajednicka_dion").value = selectGpxFeature.values_.zajednicka_dion;
  document.querySelector("#dionica_gps").value = selectGpxFeature.values_.dionica_gps;
  document.querySelector("#rac_duzina").value = selectGpxFeature.values_.rac_duzina;
  document.querySelector("#duzina").value = selectGpxFeature.values_.duzina;
  document.querySelector("#broj_spojnica").value = selectGpxFeature.values_.broj_spojnica;
  document.querySelector("#sifra_dionice").value = selectGpxFeature.values_.sifra_dionice;

  if (selectGpxFeature.values_.napon === "0.4") {
    document.querySelector("#rasvjeta_vod").value = selectGpxFeature.values_.rasvjeta_vod;
    document.querySelector("#vrsta_vod_04").value = selectGpxFeature.values_.vrsta_vod_04;
    document.querySelector("#tip_vod_04").value = selectGpxFeature.values_.tip_vod_04;
    document.querySelector("#presjek_vod_04").value = selectGpxFeature.values_.presjek_vod_04;
    document.querySelector("#materijal_vod_04").value = selectGpxFeature.values_.broj;

    //setujDdlVrijednost("#optika_stub_04", selectGpxFeature.values_.optika);
  }
  if (selectGpxFeature.values_.napon === "10") {
    document.querySelector("#vrsta_vod_10").value = selectGpxFeature.values_.vrsta_vod_10;
    document.querySelector("#tip_vod_10").value = selectGpxFeature.values_.tip_vod_10;
    document.querySelector("#presjek_vod_10").value = selectGpxFeature.values_.presjek_vod_10;
    document.querySelector("#vrsta_materijal_vod_10").value = selectGpxFeature.values_.materijal_vod_10;
    document.querySelector("#uze_presjek_vod_10").value = selectGpxFeature.values_.uze_presjek_vod_10;
    document.querySelector("#uze_vod_10").value = selectGpxFeature.values_.uze_vod_10;
  }
  if (selectGpxFeature.values_.napon === "35") {
    ucrtaniVod.set("vrsta_vod_35", document.querySelector("#vrsta_vod_35").value);
    ucrtaniVod.set("tip_vod_35", document.querySelector("#tip_vod_35").value);
    ucrtaniVod.set("presjek_vod_35", document.querySelector("#presjek_vod_35").value);
    ucrtaniVod.set("materijal_vod_35", document.querySelector("#materijal_vod_35").value);
    ucrtaniVod.set("uze_presjek_vod_35", document.querySelector("#uze_presjek_vod_35").value);
    ucrtaniVod.set("uze_vod_10", document.querySelector("#uze_vod_35").value);
  }

  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);
}
