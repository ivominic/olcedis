/**
 * Metoda koja dodjeljuje property-e vodu koji se unosi
 */
function dodajPoljaUcrtanomVodu() {
  if (napon === "0.4") {
    ucrtaniVod.set("rasvjeta_vod", document.querySelector("#rasvjeta_vod").value);
    ucrtaniVod.set("vrsta_vod_04", document.querySelector("#vrsta_vod_04").value);
    ucrtaniVod.set("tip_vod_04", document.querySelector("#tip_vod_04").value);
    ucrtaniVod.set("presjek_vod_04", document.querySelector("#presjek_vod_04").value);
    ucrtaniVod.set("materijal_vod_04", document.querySelector("#materijal_vod_04").value);
  }
  if (napon === "10") {
    ucrtaniVod.set("vrsta_vod_10", document.querySelector("#vrsta_vod_10").value);
    ucrtaniVod.set("tip_vod_10", document.querySelector("#tip_vod_10").value);
    ucrtaniVod.set("presjek_vod_10", document.querySelector("#presjek_vod_10").value);
    ucrtaniVod.set("materijal_vod_10", document.querySelector("#materijal_vod_10").value);
    ucrtaniVod.set("uze_presjek_vod_10", document.querySelector("#uze_presjek_vod_10").value);
    ucrtaniVod.set("uze_vod_10", document.querySelector("#uze_vod_10").value);
  }
  if (napon === "35") {
    ucrtaniVod.set("vrsta_vod_35", document.querySelector("#vrsta_vod_35").value);
    ucrtaniVod.set("tip_vod_35", document.querySelector("#tip_vod_35").value);
    ucrtaniVod.set("presjek_vod_35", document.querySelector("#presjek_vod_35").value);
    ucrtaniVod.set("materijal_vod_35", document.querySelector("#materijal_vod_35").value);
    ucrtaniVod.set("uze_presjek_vod_35", document.querySelector("#uze_presjek_vod_35").value);
    ucrtaniVod.set("uze_vod_10", document.querySelector("#uze_vod_35").value);
  }

  ucrtaniVod.set("wizard", 0);
  ucrtaniVod.set("lejer", "vodovi");
  ucrtaniVod.set("fid_1", document.querySelector("#fid_1").value);
  //ucrtaniVod.set("gps", document.querySelector("#gps").value);
  ucrtaniVod.set("napon", document.querySelector("#napon").value);
  ucrtaniVod.set("pog_sprem", document.querySelector("#pog_sprem").value);
  ucrtaniVod.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
  ucrtaniVod.set("dionica", document.querySelector("#dionica").value);
  ucrtaniVod.set("id_br", document.querySelector("#id_br").value);
  ucrtaniVod.set("naziv", document.querySelector("#naziv").value);
  ucrtaniVod.set("dionica_nn", document.querySelector("#dionica_nn").value);
  ucrtaniVod.set("ts", sifraNapojneTrafostanice);
  ucrtaniVod.set("sifra_napojne", sifraNapojneTrafostanice);
  ucrtaniVod.set("naziv_napojne", nazivNapojneTrafostanice);
  ucrtaniVod.set("izvod_napojne", izvodNapojneTrafostanice);
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
}
