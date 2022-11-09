/**Metode za unos podataka */

function sakrijSvaPoljaZaUnos() {
  document.querySelector("#divUnosGps").style.display = "none";
  document.querySelector("#divUnosBroj").style.display = "none";
  document.querySelector("#divUnosSifra").style.display = "none";
  document.querySelector("#divUnosTip").style.display = "none";
  document.querySelector("#divUnosNamjena").style.display = "none";
  document.querySelector("#divUnosMaterijal").style.display = "none";
  document.querySelector("#divUnosVrstaDrvenogStuba").style.display = "none";
  document.querySelector("#divUnosNadmorskaVisina").style.display = "none";
  document.querySelector("#divUnosVisina").style.display = "none";
  document.querySelector("#divUnosRasporedProvodnika").style.display = "none";
  document.querySelector("#divUnosIzolatorVrsta").style.display = "none";
  document.querySelector("#divUnosIzolatorFunkcija").style.display = "none";
  document.querySelector("#divUnosBrIzolFaza").style.display = "none";
  document.querySelector("#divUnosTipIzolatora").style.display = "none";
  document.querySelector("#divUnosOdvodnikPrenapona").style.display = "none";
  document.querySelector("#divUnosUzemljivac").style.display = "none";
  document.querySelector("#divUnosOtporUzemljivaca").style.display = "none";
  document.querySelector("#divUnosOptika").style.display = "none";
  document.querySelector("#divUnosRasvjeta").style.display = "none";
  document.querySelector("#divUnosBrPmo").style.display = "none";
  document.querySelector("#divUnosBrNnv").style.display = "none";
  document.querySelector("#divUnosPogSprem").style.display = "none";
  document.querySelector("#divUnosVlasnistvo").style.display = "none";
  document.querySelector("#divUnosOpstina").style.display = "none";
  document.querySelector("#divUnosNapon").style.display = "none";
  document.querySelector("#divUnosPrikljucakOtcjep").style.display = "none";
  document.querySelector("#divUnosNnVod").style.display = "none";
  document.querySelector("#divUnosRastavljac").style.display = "none";
  document.querySelector("#divUnos10KvVod").style.display = "none";

  document.querySelector("#divUnosDionica").style.display = "none";
  document.querySelector("#divUnosIdBr").style.display = "none";
  document.querySelector("#divUnosNaziv").style.display = "none";
  document.querySelector("#divUnosDionicaNn").style.display = "none";
  document.querySelector("#divUnosTs").style.display = "none";
  document.querySelector("#divUnosIzvodTs").style.display = "none";
  document.querySelector("#divUnosBrFaza").style.display = "none";
  document.querySelector("#divUnosVrsta").style.display = "none";
  document.querySelector("#divUnosPresjek").style.display = "none";
  document.querySelector("#divUnosBrSpojnica").style.display = "none";
  document.querySelector("#divUnosGodIzgr").style.display = "none";
  document.querySelector("#divUnosPocDion").style.display = "none";
  document.querySelector("#divUnosKrajDion").style.display = "none";
  document.querySelector("#divUnosUzePresjek").style.display = "none";
  document.querySelector("#divUnosUze").style.display = "none";
  document.querySelector("#divUnosZajednickaDion").style.display = "none";

  document.querySelector("#divUnosBrNnIzvoda").style.display = "none";
  document.querySelector("#divUnosCelije10").style.display = "none";
  document.querySelector("#divUnosProjekSnaga").style.display = "none";
  document.querySelector("#divUnosInstSnaga1").style.display = "none";
  document.querySelector("#divUnosInstSnaga2").style.display = "none";
  document.querySelector("#divUnosInstSnaga3").style.display = "none";
  document.querySelector("#divUnosInstSnaga4").style.display = "none";
  document.querySelector("#divUnosPrenosOdnos").style.display = "none";
  document.querySelector("#divUnosIzvodCelija").style.display = "none";
  document.querySelector("#divUnosNapojnaTs").style.display = "none";
  document.querySelector("#divUnosFunkcija").style.display = "none";
  document.querySelector("#divUnosIdBilling").style.display = "none";

  document.querySelector("#divUnosId").style.display = "none";
  document.querySelector("#divUnosOsiguraci").style.display = "none";
  document.querySelector("#divUnosBrPretplatnika").style.display = "none";

  document.querySelector("#divUnosMontaza").style.display = "none";
  document.querySelector("#divUnosVrata").style.display = "none";
  document.querySelector("#divUnosBrIzvoda").style.display = "none";
  document.querySelector("#divUnosBrPrikljucaka").style.display = "none";
}

function prikaziUnosStubove() {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosBroj").style.display = "flex";
  document.querySelector("#divUnosSifra").style.display = "flex";
  document.querySelector("#divUnosTip").style.display = "flex";
  document.querySelector("#divUnosNamjena").style.display = "flex";
  document.querySelector("#divUnosMaterijal").style.display = "flex";
  document.querySelector("#divUnosVrstaDrvenogStuba").style.display = "flex";
  document.querySelector("#divUnosNadmorskaVisina").style.display = "flex";
  document.querySelector("#divUnosVisina").style.display = "flex";
  document.querySelector("#divUnosRasporedProvodnika").style.display = "flex";
  document.querySelector("#divUnosIzolatorVrsta").style.display = "flex";
  document.querySelector("#divUnosIzolatorFunkcija").style.display = "flex";
  document.querySelector("#divUnosBrIzolFaza").style.display = "flex";
  document.querySelector("#divUnosTipIzolatora").style.display = "flex";
  document.querySelector("#divUnosOdvodnikPrenapona").style.display = "flex";
  document.querySelector("#divUnosUzemljivac").style.display = "flex";
  document.querySelector("#divUnosOtporUzemljivaca").style.display = "flex";
  document.querySelector("#divUnosOptika").style.display = "flex";
  document.querySelector("#divUnosRasvjeta").style.display = "flex";
  document.querySelector("#divUnosBrPmo").style.display = "flex";
  document.querySelector("#divUnosBrNnv").style.display = "flex";
  document.querySelector("#divUnosPogSprem").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosPrikljucakOtcjep").style.display = "flex";
  document.querySelector("#divUnosNnVod").style.display = "flex";
  document.querySelector("#divUnosRastavljac").style.display = "flex";
  document.querySelector("#divUnos10KvVod").style.display = "flex";
}

function prikaziUnosVodove() {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosTip").style.display = "flex";
  document.querySelector("#divUnosMaterijal").style.display = "flex";
  document.querySelector("#divUnosRasvjeta").style.display = "flex";
  document.querySelector("#divUnosPogSprem").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosDionica").style.display = "flex";
  document.querySelector("#divUnosIdBr").style.display = "flex";
  document.querySelector("#divUnosNaziv").style.display = "flex";
  document.querySelector("#divUnosDionicaNn").style.display = "flex";
  document.querySelector("#divUnosTs").style.display = "flex";
  document.querySelector("#divUnosIzvodTs").style.display = "flex";
  document.querySelector("#divUnosBrFaza").style.display = "flex";
  document.querySelector("#divUnosVrsta").style.display = "flex";
  document.querySelector("#divUnosPresjek").style.display = "flex";
  document.querySelector("#divUnosBrSpojnica").style.display = "flex";
  document.querySelector("#divUnosGodIzgr").style.display = "flex";
  document.querySelector("#divUnosPocDion").style.display = "flex";
  document.querySelector("#divUnosKrajDion").style.display = "flex";
  document.querySelector("#divUnosUzePresjek").style.display = "flex";
  document.querySelector("#divUnosUze").style.display = "flex";
  document.querySelector("#divUnosZajednickaDion").style.display = "flex";
}

function prikaziUnosTrafostanice() {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosTip").style.display = "flex";
  document.querySelector("#divUnosNaziv").style.display = "flex";
  document.querySelector("#divUnosGodIzgr").style.display = "flex";
  document.querySelector("#divUnosPogSprem").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosBrNnIzvoda").style.display = "flex";
  document.querySelector("#divUnosCelije10").style.display = "flex";
  document.querySelector("#divUnosProjekSnaga").style.display = "flex";
  document.querySelector("#divUnosInstSnaga1").style.display = "flex";
  document.querySelector("#divUnosInstSnaga2").style.display = "flex";
  document.querySelector("#divUnosInstSnaga3").style.display = "flex";
  document.querySelector("#divUnosInstSnaga4").style.display = "flex";
  document.querySelector("#divUnosPrenosOdnos").style.display = "flex";
  document.querySelector("#divUnosIzvodCelija").style.display = "flex";
  document.querySelector("#divUnosNapojnaTs").style.display = "flex";
  document.querySelector("#divUnosFunkcija").style.display = "flex";
  document.querySelector("#divUnosIdBilling").style.display = "flex";
}

function prikaziUnosPrikljucnoMjesto() {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosNapojnaTs").style.display = "flex";
  document.querySelector("#divUnosIzvodTs").style.display = "flex";
  document.querySelector("#divUnosId").style.display = "flex";
  document.querySelector("#divUnosTip").style.display = "flex";
  document.querySelector("#divUnosOsiguraci").style.display = "none";
  document.querySelector("#divUnosBrPretplatnika").style.display = "none";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
}

function prikaziUnosNkro() {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosTs").style.display = "flex";
  document.querySelector("#divUnosIzvodTs").style.display = "flex";
  document.querySelector("#divUnosId").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosMontaza").style.display = "flex";
  document.querySelector("#divUnosVrata").style.display = "flex";
  document.querySelector("#divUnosBrIzvoda").style.display = "flex";
  document.querySelector("#divUnosBrPrikljucaka").style.display = "flex";
}

/**Metode za unos podataka iz polja */

function unosStubova(geometrijaWkt, servisAkcija) {
  if (!blnDodijeljenoGpxProperties) {
    dodajPoljaGpxStubovi();
  } else {
    console.log("izmijeniti vrijednosti za svaki stub");
  }
}

//unosStubova("POINT(0 0)", "I");

function unosVodova(geometrijaWkt, servisAkcija) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", 0);
  podaciForme.append("id", idObjekta);
  podaciForme.append("akcija", servisAkcija);
  podaciForme.append("Geometry", geometrijaWkt);
  podaciForme.append("fid_1", document.querySelector("#fid_1").value);
  podaciForme.append("gps", document.querySelector("#gps").value);
  podaciForme.append("dionica", document.querySelector("#dionica").value);
  podaciForme.append("id_br", document.querySelector("#id_br").value);
  podaciForme.append("naziv", document.querySelector("#naziv").value);
  podaciForme.append("dionica_nn", document.querySelector("#dionica_nn").value);
  podaciForme.append("ts", document.querySelector("#ts").value);
  podaciForme.append("izvod_ts", document.querySelector("#izvod_ts").value);
  podaciForme.append("napon", document.querySelector("#napon").value);
  podaciForme.append("br_faza", document.querySelector("#br_faza").value);
  podaciForme.append("vrsta", document.querySelector("#vrsta").value);
  podaciForme.append("tip", document.querySelector("#tip").value);
  podaciForme.append("presjek", document.querySelector("#presjek").value);
  podaciForme.append("materijal", document.querySelector("#vrsta_materijal").value);
  podaciForme.append("br_spojnica", document.querySelector("#br_spojnica").value);
  podaciForme.append("rasvjeta", document.querySelector("#rasvjeta").value);
  podaciForme.append("pog_sprem", document.querySelector("#pog_sprem").value);
  podaciForme.append("god_izg", document.querySelector("#god_izg").value);
  podaciForme.append("vlasnistvo", document.querySelector("#vlasnistvo").value);
  podaciForme.append("opstina", document.querySelector("#opstina").value);
  podaciForme.append("poc_dion", document.querySelector("#poc_dion").value);
  podaciForme.append("kraj_dion", document.querySelector("#kraj_dion").value);
  podaciForme.append("uze_presjek", document.querySelector("#uze_presjek").value);
  podaciForme.append("uze", document.querySelector("#uze").value);
  podaciForme.append("zajednicka_dion", document.querySelector("#zajednicka_dion").value);
  podaciForme.append("dionica_gps", document.querySelector("#dionica_gps").value);
  podaciForme.append("rac_duzina", document.querySelector("#rac_duzina").value);
  podaciForme.append("duzina", document.querySelector("#duzina").value);
  podaciForme.append("broj_spojnica", document.querySelector("#broj_spojnica").value);
  podaciForme.append("sifra_dionice", document.querySelector("#sifra_dionice").value);
  //podaciForme.append("sifra_dionice", "obavezno polje");

  //Dodao za poziv Jovanovog servisa
  podaciForme.append("name", "test");
  podaciForme.append("fid", "test");
  podaciForme.append("layer_name", "test");
  //podaciForme.append("br_pmo", 2);
  podaciForme.append("datum_azuriranja", "");

  podaciForme.append("layer_id", 0);
  podaciForme.append("geohash_id", "test");
  podaciForme.append("korisnik", "test");
  podaciForme.append("katastar", "");
  podaciForme.append("originalId", 0);
  podaciForme.append("posjeduje_sliku", "test");
  podaciForme.append("vlasnik", "test");
  podaciForme.append("geohash_id_no", "test");
  podaciForme.append("sifra_napojne", "test");
  podaciForme.append("izvod_napojne", "test");
  podaciForme.append("naziv_napojne", "test");

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/vodovi_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}

//unosVodova("LINESTRING(-71.160281 42.258729,-71.160837 42.259113,-71.161144 42.25932)", "I");

function unosTrafostanica(geometrijaWkt, servisAkcija) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", 0);
  podaciForme.append("id", idObjekta);
  podaciForme.append("akcija", servisAkcija);
  podaciForme.append("Geometry", geometrijaWkt);
  podaciForme.append("fid_1", document.querySelector("#fid_1").value);
  podaciForme.append("gps", document.querySelector("#gps").value);
  podaciForme.append("id_billing", document.querySelector("#id_billing").value);
  podaciForme.append("naziv", document.querySelector("#naziv").value);
  podaciForme.append("funkcija", document.querySelector("#funkcija").value);
  podaciForme.append("tip", document.querySelector("#tip").value);
  podaciForme.append("napojna_ts", document.querySelector("#napojna_ts").value);
  podaciForme.append("izvod_celija", document.querySelector("#izvod_celija").value);
  podaciForme.append("prenos_odnos", document.querySelector("#prenos_odnos").value);
  podaciForme.append("inst_snaga_t1", document.querySelector("#inst_snaga_t1").value);
  podaciForme.append("inst_snaga_t2", document.querySelector("#inst_snaga_t2").value);
  podaciForme.append("inst_snaga_t3", document.querySelector("#inst_snaga_t3").value);
  podaciForme.append("inst_snaga_t4", document.querySelector("#inst_snaga_t4").value);
  podaciForme.append("projek_snaga", document.querySelector("#projek_snaga").value);
  podaciForme.append("celije_10", document.querySelector("#celije_10").value);
  podaciForme.append("br_nn_izvoda", document.querySelector("#br_nn_izvoda").value);
  podaciForme.append("god_izg", document.querySelector("#god_izg").value);
  podaciForme.append("pog_sprem", document.querySelector("#pog_sprem").value);
  podaciForme.append("vlasnistvo", document.querySelector("#vlasnistvo").value);
  podaciForme.append("opstina", document.querySelector("#opstina").value);
  podaciForme.append("nad_vis", document.querySelector("#nad_visina").value);
  podaciForme.append("br_vod_cel_visi_nap", document.querySelector("#br_vod_cel_visi_nap").value);
  podaciForme.append("br_vod_cel_nizi_nap", document.querySelector("#br_vod_cel_nizi_nap").value);
  podaciForme.append("napon", document.querySelector("#napon").value);
  podaciForme.append("id_br", document.querySelector("#id_br").value);

  //Dodao za poziv Jovanovog servisa
  podaciForme.append("name", "test");
  podaciForme.append("fid", "test");
  podaciForme.append("layer_name", "test");
  //podaciForme.append("br_pmo", 2);
  podaciForme.append("datum_azuriranja", "");

  podaciForme.append("layer_id", 0);
  podaciForme.append("geohash_id", "test");
  podaciForme.append("korisnik", "test");
  podaciForme.append("katastar", "");
  podaciForme.append("originalId", 0);
  podaciForme.append("posjeduje_sliku", "test");
  podaciForme.append("vlasnik", "test");
  podaciForme.append("geohash_id_no", "test");
  podaciForme.append("sifra_napojne", "test");
  podaciForme.append("izvod_napojne", "test");
  podaciForme.append("naziv_napojne", "test");

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/trafostanice_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}
//unosTrafostanica("POINT(0 0)", "I");

function unosNkro(geometrijaWkt, servisAkcija) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", 0);
  podaciForme.append("id", idObjekta);
  podaciForme.append("akcija", servisAkcija);
  podaciForme.append("Geometry", geometrijaWkt);
  podaciForme.append("fid_1", document.querySelector("#fid_1").value);
  podaciForme.append("gps", document.querySelector("#gps").value);
  podaciForme.append("ts", document.querySelector("#ts").value);
  podaciForme.append("izvod_ts", document.querySelector("#izvod_ts").value);
  podaciForme.append("id", document.querySelector("#id").value);
  podaciForme.append("materijal", document.querySelector("#vrsta_materijal").value);
  podaciForme.append("montaza", document.querySelector("#montaza").value);
  podaciForme.append("vrata", document.querySelector("#vrata").value);
  podaciForme.append("br_izvoda", document.querySelector("#br_izvoda").value);
  podaciForme.append("br_prikljucaka", document.querySelector("#br_prikljucaka").value);
  podaciForme.append("pog_sprem", document.querySelector("#pog_sprem").value);
  podaciForme.append("vlasnistvo", document.querySelector("#vlasnistvo").value);
  podaciForme.append("opstina", document.querySelector("#opstina").value);
  podaciForme.append("napon", document.querySelector("#napon").value);

  //Dodao za poziv Jovanovog servisa
  podaciForme.append("name", "test");
  podaciForme.append("fid", "test");
  podaciForme.append("layer_name", "test");
  //podaciForme.append("br_pmo", 2);
  podaciForme.append("datum_azuriranja", "");

  podaciForme.append("layer_id", 0);
  podaciForme.append("geohash_id", "test");
  podaciForme.append("korisnik", "test");
  podaciForme.append("katastar", "");
  podaciForme.append("originalId", 0);
  podaciForme.append("posjeduje_sliku", "test");
  podaciForme.append("vlasnik", "test");
  podaciForme.append("geohash_id_no", "test");
  podaciForme.append("sifra_napojne", "test");
  podaciForme.append("izvod_napojne", "test");
  podaciForme.append("naziv_napojne", "test");

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/nkro_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}
//unosNkro("POINT(0 0)", "I");

function unosPrikljucnoMjesto(geometrijaWkt, servisAkcija) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", 0);
  podaciForme.append("id", idObjekta);
  podaciForme.append("akcija", servisAkcija);
  podaciForme.append("Geometry", geometrijaWkt);
  podaciForme.append("fid_1", document.querySelector("#fid_1").value);
  podaciForme.append("gps", document.querySelector("#gps").value);
  podaciForme.append("ts", document.querySelector("#ts").value);
  podaciForme.append("izvod_ts", document.querySelector("#izvod_ts").value);
  podaciForme.append("id", document.querySelector("#id").value);
  podaciForme.append("tip", document.querySelector("#tip").value);
  podaciForme.append("osiguraci", document.querySelector("#osiguraci").value);
  podaciForme.append("br_pretplatnika", document.querySelector("#br_pretplatnika").value);
  podaciForme.append("vlasnistvo", document.querySelector("#vlasnistvo").value);
  podaciForme.append("opstina", document.querySelector("#opstina").value);
  podaciForme.append("napon", document.querySelector("#napon").value);

  //Dodao za poziv Jovanovog servisa
  podaciForme.append("name", "test");
  podaciForme.append("fid", "test");
  podaciForme.append("layer_name", "test");
  //podaciForme.append("br_pmo", 2);
  podaciForme.append("datum_azuriranja", "");

  podaciForme.append("layer_id", 0);
  podaciForme.append("geohash_id", "test");
  podaciForme.append("korisnik", "test");
  podaciForme.append("katastar", "");
  podaciForme.append("originalId", 0);
  podaciForme.append("posjeduje_sliku", "test");
  podaciForme.append("vlasnik", "test");
  podaciForme.append("geohash_id_no", "test");
  podaciForme.append("sifra_napojne", "test");
  podaciForme.append("izvod_napojne", "test");
  podaciForme.append("naziv_napojne", "test");

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/prikljucno_mjesto_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}
//unosPrikljucnoMjesto("POINT(0 0)", "I");

function unosPotrosac(geometrijaWkt, servisAkcija) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", 0);
  podaciForme.append("id", idObjekta);
  podaciForme.append("akcija", servisAkcija);
  podaciForme.append("Geometry", geometrijaWkt);
  podaciForme.append("fid_1", document.querySelector("#fid_1").value);
  podaciForme.append("gps", document.querySelector("#gps").value);
  podaciForme.append("naziv_ts", document.querySelector("#naziv_ts").value);
  podaciForme.append("sifra_ts", document.querySelector("#sifra_ts").value);
  podaciForme.append("id", document.querySelector("#id").value);
  podaciForme.append("opstina", document.querySelector("#opstina").value);
  podaciForme.append("napon", document.querySelector("#napon").value);
  podaciForme.append("prik_kabal", document.querySelector("#prik_kabal").value);
  podaciForme.append("pod", document.querySelector("#pod").value);
  podaciForme.append("adresa_mm", document.querySelector("#adresa_mm").value);
  podaciForme.append("prik_mjesto", document.querySelector("#prik_mjesto").value);
  podaciForme.append("naziv", document.querySelector("#naziv").value);
  podaciForme.append("naziv_nn_izvod", document.querySelector("#naziv_nn_izvod").value);
  podaciForme.append("pretplatni_br", document.querySelector("#pretplatni_br").value);
  podaciForme.append("br_brojila", document.querySelector("#br_brojila").value);

  //Dodao za poziv Jovanovog servisa
  podaciForme.append("name", "test");
  podaciForme.append("fid", "test");
  podaciForme.append("layer_name", "test");
  //podaciForme.append("br_pmo", 2);
  podaciForme.append("datum_azuriranja", "");

  podaciForme.append("layer_id", 0);
  podaciForme.append("geohash_id", "test");
  podaciForme.append("korisnik", "test");
  podaciForme.append("katastar", "");
  podaciForme.append("originalId", 0);
  podaciForme.append("posjeduje_sliku", "test");
  podaciForme.append("vlasnik", "test");
  podaciForme.append("geohash_id_no", "test");
  podaciForme.append("sifra_napojne", "test");
  podaciForme.append("izvod_napojne", "test");
  podaciForme.append("naziv_napojne", "test");

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/potrosaci_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}
//unosPotrosac("POINT(0 0)", "I");

function unosPod(geometrijaWkt, servisAkcija) {
  let podaciForme = new FormData();
  podaciForme.append("wizard", 0);
  podaciForme.append("id", idObjekta);
  podaciForme.append("akcija", servisAkcija);
  podaciForme.append("Geometry", geometrijaWkt);
  podaciForme.append("fid_1", document.querySelector("#fid_1").value);
  podaciForme.append("gps", document.querySelector("#gps").value);
  podaciForme.append("naziv_ts", document.querySelector("#naziv_ts").value);
  podaciForme.append("sifra_ts", document.querySelector("#sifra_ts").value);
  podaciForme.append("id", document.querySelector("#id").value);
  podaciForme.append("opstina", document.querySelector("#opstina").value);
  podaciForme.append("napon", document.querySelector("#napon").value);
  podaciForme.append("prik_kabal", document.querySelector("#prik_kabal").value);
  podaciForme.append("pod", document.querySelector("#pod").value);
  podaciForme.append("adresa_mm", document.querySelector("#adresa_mm").value);
  podaciForme.append("prik_mjesto", document.querySelector("#prik_mjesto").value);
  podaciForme.append("naziv", document.querySelector("#naziv").value);
  podaciForme.append("naziv_nn_izvod", document.querySelector("#naziv_nn_izvod").value);
  podaciForme.append("pretplatni_br", document.querySelector("#pretplatni_br").value);
  podaciForme.append("br_brojila", document.querySelector("#br_brojila").value);

  //Dodao za poziv Jovanovog servisa
  podaciForme.append("name", "test");
  podaciForme.append("fid", "test");
  podaciForme.append("layer_name", "test");
  //podaciForme.append("br_pmo", 2);
  podaciForme.append("datum_azuriranja", "");

  podaciForme.append("layer_id", 0);
  podaciForme.append("geohash_id", "test");
  podaciForme.append("korisnik", "test");
  podaciForme.append("katastar", "");
  podaciForme.append("originalId", 0);
  podaciForme.append("posjeduje_sliku", "test");
  podaciForme.append("vlasnik", "test");
  podaciForme.append("geohash_id_no", "test");
  podaciForme.append("sifra_napojne", "test");
  podaciForme.append("izvod_napojne", "test");
  podaciForme.append("naziv_napojne", "test");

  $.ajax({
    url: wsServerOriginLocation + "/novi_portal/api/pod_store",
    method: "post",
    data: podaciForme,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log("success", response);
      poruka("Uspjeh", response.message);
    },
    error: function (response) {
      console.log("error", response);
    },
  });
}

//unosPod("POINT(0 0)", "I");

/**Metode za popunjavanje polja atributima iz baze */

function popuniPoljaStubovi(odgovor) {
  let atributi = odgovor.features[0]["properties"];
  idObjekta = atributi["id"];
  document.querySelector("#gps").value = atributi["gps"];
  document.querySelector("#broj").value = atributi["broj"];
  document.querySelector("#sifra").value = atributi["sifra"];
  document.querySelector("#nad_visina").value = atributi["nad_visina"];
  document.querySelector("#visina").value = atributi["visina"];
  document.querySelector("#rasp_prov").value = atributi["rasp_prov"];
  document.querySelector("#br_izol_faza").value = atributi["br_izol_faza"];
  document.querySelector("#uzemljivac_otpor").value = atributi["uzemljivac_otpor"];
  document.querySelector("#br_pmo").value = atributi["br_pmo"];
  document.querySelector("#br_nnv").value = atributi["br_nnv"];
  document.querySelector("#pog_sprem").value = atributi["pog_sprem"];
  document.querySelector("#opstina").value = atributi["opstina"];
  document.querySelector("#napon").value = atributi["napon"];

  setujDdlVrijednost("#tip", atributi["tip"]);
  setujDdlVrijednost("#vrsta_namjena", atributi["vrsta_namjena"]);
  setujDdlVrijednost("#vrsta_materijal", atributi["vrsta_materijal"]);
  setujDdlVrijednost("#vrsta_drvenog", atributi["vrsta_drvenog"]);
  setujDdlVrijednost("#izolator_vrsta", atributi["izolator_vrsta"]);
  setujDdlVrijednost("#izolator_funkcija", atributi["izolator_funkcija"]);
  setujDdlVrijednost("#nosaci_izolatora", atributi["nosaci_izolatora"]);
  setujDdlVrijednost("#odvodnik_prenapona", atributi["odvodnik_prenapona"]);
  setujDdlVrijednost("#uzemljivac", atributi["uzemljivac"]);
  setujDdlVrijednost("#optika", atributi["optika"]);
  setujDdlVrijednost("#rasvjeta", atributi["rasvjeta"]);
  setujDdlVrijednost("#vlasnistvo", atributi["vlasnistvo"]);
  setujDdlVrijednost("#prikljucak_otcjep", atributi["prikljucak_otcjep"]);
  setujDdlVrijednost("#nn_vod", atributi["nn_vod"]);
  setujDdlVrijednost("#rastavljac", atributi["rastavljac"]);
  setujDdlVrijednost("#10_vod", atributi["10_vod"]);

  /*if (akcija === "izmijeni") {
    wfsZaEdit(idObjekta);
  }*/
}

function popuniPoljaVodovi(odgovor) {
  let atributi = odgovor.features[0]["properties"];
  idObjekta = atributi["id"];
  document.querySelector("#idObjekta").value = idObjekta;
  document.querySelector("#gps").value = atributi["gps"];
  document.querySelector("#dionica").value = atributi["dionica"];
  document.querySelector("#id_br").value = atributi["id_br"];
  document.querySelector("#naziv").value = atributi["naziv"];
  document.querySelector("#dionica_nn").value = atributi["dionica_nn"];
  document.querySelector("#ts").value = atributi["ts"];
  document.querySelector("#izvod_ts").value = atributi["izvod_ts"];
  document.querySelector("#napon").value = atributi["napon"];
  document.querySelector("#br_spojnica").value = atributi["br_spojnica"];
  document.querySelector("#god_izg").value = atributi["god_izg"];
  document.querySelector("#poc_dion").value = atributi["poc_dion"];
  document.querySelector("#kraj_dion").value = atributi["kraj_dion"];
  document.querySelector("#zajednicka_dion").value = atributi["zajednicka_dion"];

  setujDdlVrijednost("#br_faza", atributi["br_faza"]);
  setujDdlVrijednost("#vrsta", atributi["vrsta"]);
  setujDdlVrijednost("#tip", atributi["tip"]);
  setujDdlVrijednost("#presjek", atributi["presjek"]);
  setujDdlVrijednost("#materijal", atributi["materijal"]);
  setujDdlVrijednost("#rasvjeta", atributi["rasvjeta"]);
  setujDdlVrijednost("#pog_sprem", atributi["pog_sprem"]);
  setujDdlVrijednost("#vlasnistvo", atributi["vlasnistvo"]);
  setujDdlVrijednost("#opstina", atributi["opstina"]);
  setujDdlVrijednost("#uze_presjek", atributi["uze_presjek"]);
  setujDdlVrijednost("#uze", atributi["uze"]);

  /*if (akcija === "izmijeni") {
    wfsZaEdit(idObjekta);
  }*/
}

function popuniPoljaTrafostanice(odgovor) {
  let atributi = odgovor.features[0]["properties"];
  idObjekta = atributi["id"];
  /*document.querySelector("#idObjekta").value = idObjekta;
  document.querySelector("#gps").value = atributi["gps"];
  document.querySelector("#id_billing").value = atributi["id_billing"];
  document.querySelector("#naziv").value = atributi["naziv"];
  document.querySelector("#napojna_ts").value = atributi["napojna_ts"];
  document.querySelector("#izvod_celija").value = atributi["izvod_celija"];
  document.querySelector("#projek_snaga").value = atributi["projek_snaga"];
  document.querySelector("#celije_10").value = atributi["celije_10"];
  document.querySelector("#br_nn_izvoda").value = atributi["br_nn_izvoda"];
  document.querySelector("#god_izg").value = atributi["god_izg"];
  document.querySelector("#pog_sprem").value = atributi["pog_sprem"];

  setujDdlVrijednost("#funkcija", atributi["funkcija"]);
  setujDdlVrijednost("#tip", atributi["tip"]);
  setujDdlVrijednost("#prenos_odnos", atributi["prenos_odnos"]);
  setujDdlVrijednost("#inst_snaga_t1", atributi["inst_snaga_t1"]);
  setujDdlVrijednost("#inst_snaga_t2", atributi["inst_snaga_t2"]);
  setujDdlVrijednost("#inst_snaga_t3", atributi["inst_snaga_t3"]);
  setujDdlVrijednost("#inst_snaga_t4", atributi["inst_snaga_t4"]);
  setujDdlVrijednost("#vlasnistvo", atributi["vlasnistvo"]);
  setujDdlVrijednost("#opstina", atributi["opstina"]);*/

  document.querySelector("#ddlTrafostanice").value = atributi["ddlTrafostanice"];
  document.querySelector("#read_fid_1").value = atributi["fid_1"];
  document.querySelector("#read_id_br").value = atributi["id_br"];
  document.querySelector("#read_celije_10").value = atributi["celije_10"];
  document.querySelector("#read_izvod_celija").value = atributi["izvod_celija"];
  document.querySelector("#read_funkcija").value = atributi["funkcija"];
  document.querySelector("#read_br_nn_izvoda").value = atributi["br_nn_izvoda"];
  document.querySelector("#read_geohash_id").value = atributi["geohash_id"];
  document.querySelector("#read_geohash_id_no").value = atributi["geohash_id_no"];
  document.querySelector("#read_br_vod_cel_nizi_nap").value = atributi["br_vod_cel_nizi_nap"];
  document.querySelector("#read_br_vod_cel_visi_nap").value = atributi["br_vod_cel_visi_nap"];
  document.querySelector("#read_layer_name").value = atributi["layer_name"];
  document.querySelector("#read_god_izg").value = atributi["god_izg"];
  document.querySelector("#read_vlasnistvo").value = atributi["vlasnistvo"];
  document.querySelector("#read_datum_azuriranja").value = atributi["datum_azuriranja"];
  document.querySelector("#read_layer_id").value = atributi["layer_id"];
  document.querySelector("#read_nad_vis").value = atributi["nad_vis"];
  document.querySelector("#read_gps").value = atributi["gps"];
  document.querySelector("#read_pog_sprem").value = atributi["pog_sprem"];
  document.querySelector("#read_napon").value = atributi["napon"];
  document.querySelector("#read_posjeduje_sliku").value = atributi["posjeduje_sliku"];
  document.querySelector("#read_originalId").value = atributi["originalId"];
  document.querySelector("#read_korisnik").value = atributi["korisnik"];
  document.querySelector("#read_vlasnik").value = atributi["vlasnik"];
  document.querySelector("#read_katastar").value = atributi["katastar"];
  document.querySelector("#read_id_trafostanice").value = atributi["id_trafostanice"];
  document.querySelector("#read_opstina").value = atributi["opstina"];
  document.querySelector("#read_region").value = atributi["region"];
  document.querySelector("#read_naziv_napojne").value = atributi["naziv_napojne"];
  document.querySelector("#read_sifra_napojne").value = atributi["sifra_napojne"];
  document.querySelector("#read_izvod_napojne").value = atributi["izvod_napojne"];
  document.querySelector("#read_prenos_odnos").value = atributi["prenos_odnos"];
  document.querySelector("#read_id_billing").value = atributi["id_billing"];
  document.querySelector("#read_adresa").value = atributi["adresa"];
  document.querySelector("#read_tip").value = atributi["tip"];
  document.querySelector("#read_naziv").value = atributi["naziv"];
  document.querySelector("#read_inst_snaga_t1").value = atributi["inst_snaga_t1"];
  document.querySelector("#read_inst_snaga_t2").value = atributi["inst_snaga_t2"];
  document.querySelector("#read_inst_snaga_t3").value = atributi["inst_snaga_t3"];
  document.querySelector("#read_tabela").value = atributi["tabela"];

  /*if (akcija === "izmijeni") {
    wfsZaEdit(idObjekta);
  }*/
}

function popuniPoljaNkro(odgovor) {
  let atributi = odgovor.features[0]["properties"];
  idObjekta = atributi["id"];
  document.querySelector("#idObjekta").value = idObjekta;
  document.querySelector("#gps").value = atributi["gps"];
  document.querySelector("#id_billing").value = atributi["id_billing"];
  document.querySelector("#naziv").value = atributi["naziv"];
  document.querySelector("#napojna_ts").value = atributi["napojna_ts"];
  document.querySelector("#izvod_celija").value = atributi["izvod_celija"];
  document.querySelector("#projek_snaga").value = atributi["projek_snaga"];
  document.querySelector("#celije_10").value = atributi["celije_10"];
  document.querySelector("#br_nn_izvoda").value = atributi["br_nn_izvoda"];
  document.querySelector("#god_izg").value = atributi["god_izg"];
  document.querySelector("#pog_sprem").value = atributi["pog_sprem"];

  setujDdlVrijednost("#funkcija", atributi["funkcija"]);
  setujDdlVrijednost("#tip", atributi["tip"]);
  setujDdlVrijednost("#prenos_odnos", atributi["prenos_odnos"]);
  setujDdlVrijednost("#inst_snaga_t1", atributi["inst_snaga_t1"]);
  setujDdlVrijednost("#inst_snaga_t2", atributi["inst_snaga_t2"]);
  setujDdlVrijednost("#inst_snaga_t3", atributi["inst_snaga_t3"]);
  setujDdlVrijednost("#inst_snaga_t4", atributi["inst_snaga_t4"]);
  setujDdlVrijednost("#vlasnistvo", atributi["vlasnistvo"]);
  setujDdlVrijednost("#opstina", atributi["opstina"]);

  /*if (akcija === "izmijeni") {
    wfsZaEdit(idObjekta);
  }*/
}

function popuniPoljaPrikljucnoMjesto(odgovor) {
  let atributi = odgovor.features[0]["properties"];
  idObjekta = atributi["id"];
  document.querySelector("#idObjekta").value = idObjekta;
  document.querySelector("#gps").value = atributi["gps"];
  document.querySelector("#ts").value = atributi["ts"];
  document.querySelector("#izvod_ts").value = atributi["izvod_ts"];
  document.querySelector("#id").value = atributi["id"];
  document.querySelector("#tip").value = atributi["tip"];
  document.querySelector("#osiguraci").value = atributi["osiguraci"];
  document.querySelector("#br_pretplatnika").value = atributi["br_pretplatnika"];
  document.querySelector("#vlasnistvo").value = atributi["vlasnistvo"];
  document.querySelector("#opstina").value = atributi["opstina"];
  document.querySelector("#napon").value = atributi["napon"];

  setujDdlVrijednost("#osiguraci", atributi["osiguraci"]);
  setujDdlVrijednost("#vlasnistvo", atributi["vlasnistvo"]);
  setujDdlVrijednost("#opstina", atributi["opstina"]);

  /*if (akcija === "izmijeni") {
    wfsZaEdit(idObjekta);
  }*/
}
