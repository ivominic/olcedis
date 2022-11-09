function pozivButton() {
  let sloj = document.querySelector("#ddl_sloj_podataka").value;
  let poruka = obaveznaPolja(sloj);

  if (poruka) {
  } else {
    Swal.fire({
      icon: "error",
      title: "Greška",
      text: "Morate popuniti obavezna polja",
    });
  }
}
function obaveznaPolja(sloj) {
  borderClear();
  //Iz ddl_sloj_podataka ddl liste
  let popunjen = true;
  let message = "";
  if (sloj === "stub04") {
    //Inputi
    /*if (document.querySelector("#fid_1").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#fid_1"));
    }*/
    if (document.querySelector("#rasp_prov").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#rasp_prov"));
    }
    if (document.querySelector("#napon").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#napon"));
    }
    //Selekti
    if (document.querySelector("#tip_stub").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#tip_stub"));
    }
    if (document.querySelector("#vrsta_namjena_stub_04").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrsta_namjena_stub_04"));
    }
    if (document.querySelector("#uzemljivac_stub_04").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#uzemljivac_stub_04"));
    }
    if (document.querySelector("#optika_stub_04").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#optika_stub_04"));
    }
    if (document.querySelector("#rasvjeta_stub").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#rasvjeta_stub"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
  } else if (sloj === "stub10") {
    //Inputi
    /*if (document.querySelector("#fid_1").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#fid_1"));
    }*/
    if (document.querySelector("#rasp_prov").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#rasp_prov"));
    }
    if (document.querySelector("#br_pmo").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#br_pmo"));
    }
    if (document.querySelector("#br_nnv").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#br_nnv"));
    }
    if (document.querySelector("#napon").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#napon"));
    }
    //Selekti
    if (document.querySelector("#vrsta_namjena_stub_10").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrsta_namjena_stub_10"));
    }
    if (document.querySelector("#uzemljivac_stub_10").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#uzemljivac_stub_10"));
    }
    if (document.querySelector("#optika_stub_10").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#optika_stub_10"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#nn_vod_stub_10").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#nn_vod_stub_10"));
    }
  } else if (sloj === "stub35") {
  } else if (sloj === "vod04") {
    //Inputi
    /*if (document.querySelector("#fid_1").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#fid_1"));
    }*/
    if (document.querySelector("#naziv").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#naziv"));
    }
    if (document.querySelector("#zajednicka_dion").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#zajednicka_dion"));
    }
    if (document.querySelector("#dionica_gps").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#dionica_gps"));
    }
    if (document.querySelector("#broj_spojnica").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#broj_spojnica"));
    }
    /*if (document.querySelector("#sifra_dionice").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#sifra_dionice"));
    }*/
    //Selekti
    if (document.querySelector("#tip_vod_04").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#tip_vod_04"));
    }
    if (document.querySelector("#vrsta_materijal_vod_04").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrsta_materijal_vod_04"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#br_faza").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#br_faza"));
    }
    if (document.querySelector("#vrsta_vod_04").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrsta_vod_04"));
    }
    if (document.querySelector("#presjek_vod_04").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#presjek_vod_04"));
    }
  } else if (sloj === "vod10") {
    //Inputi
    /*if (document.querySelector("#fid_1").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#fid_1"));
    }*/
    if (document.querySelector("#naziv").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#naziv"));
    }
    if (document.querySelector("#zajednicka_dion").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#zajednicka_dion"));
    }
    if (document.querySelector("#dionica_gps").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#dionica_gps"));
    }
    if (document.querySelector("#broj_spojnica").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#broj_spojnica"));
    }
    if (document.querySelector("#sifra_dionice").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#sifra_dionice"));
    }
    //Selekti
    if (document.querySelector("#tip_vod_10").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#tip_vod_10"));
    }
    if (document.querySelector("#vrsta_materijal_vod_10").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrsta_materijal_vod_10"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#br_faza").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#br_faza"));
    }
    if (document.querySelector("#vrsta_vod_10").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrsta_vod_10"));
    }
    if (document.querySelector("#presjek_vod_10").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#presjek_vod_10"));
    }
    if (document.querySelector("#uze_presjek_vod_10").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#uze_presjek_vod_10"));
    }
  } else if (sloj === "vod35") {
    //Inputi
    /*if (document.querySelector("#fid_1").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#fid_1"));
    }*/
    if (document.querySelector("#naziv").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#naziv"));
    }
    if (document.querySelector("#zajednicka_dion").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#zajednicka_dion"));
    }
    if (document.querySelector("#dionica_gps").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#dionica_gps"));
    }
    if (document.querySelector("#broj_spojnica").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#broj_spojnica"));
    }
    if (document.querySelector("#sifra_dionice").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#sifra_dionice"));
    }
    //Selekti
    if (document.querySelector("#tip_vod_35").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#tip_vod_35"));
    }
    if (document.querySelector("#vrsta_materijal_vod_35").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrsta_materijal_vod_35"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#br_faza").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#br_faza"));
    }
    if (document.querySelector("#vrsta_vod_35").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrsta_vod_35"));
    }
    if (document.querySelector("#presjek_vod_35").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#presjek_vod_35"));
    }
    if (document.querySelector("#uze_presjek_vod_35").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#uze_presjek_vod_35"));
    }
  } else if (sloj === "nkro") {
    //Inputi
    if (document.querySelector("#napon").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#napon"));
    }
    if (document.querySelector("#id").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#id"));
    }
    //Selekti
    if (document.querySelector("#vlasnistvo").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#montaza").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#montaza"));
    }
    if (document.querySelector("#vrsta_materijal").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrsta_materijal"));
    }
    if (document.querySelector("#vrata").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vrata"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
  } else if (sloj === "prikljucno_mjesto") {
    //Inputi
    /*if (document.querySelector("#fid_1").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#fid_1"));
    }*/
    if (document.querySelector("#vlasnistvo").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#id").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#id"));
    }
    if (document.querySelector("#br_pretplatnika").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#br_pretplatnika"));
    }
    //Selekti
    if (document.querySelector("#vlasnistvo").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#osiguraci").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#osiguraci"));
    }
  } else if (sloj === "potrosac") {
    //Inputi
    /*if (document.querySelector("#fid_1").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#fid_1"));
    }
    if (document.querySelector("#prik_kabal").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#prik_kabal"));
    }
    if (document.querySelector("#pod").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pod"));
    }
    if (document.querySelector("#adresa_mm").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#adresa_mm"));
    } */
    if (document.querySelector("#prik_mjesto").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#prik_mjesto"));
    }
    /*if (document.querySelector("#naziv_nn_izvod").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#naziv_nn_izvod"));
    }*/
    if (document.querySelector("#pretplatni_br").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pretplatni_br"));
    }
    /*if (document.querySelector("#br_brojila").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#br_brojila"));
    }
    if (document.querySelector("#naziv_ts").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#naziv_ts"));
    }
    if (document.querySelector("#sifra_ts").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#sifra_ts"));
    }
    if (document.querySelector("#izvod_ts").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#izvod_ts"));
    } 
    if (document.querySelector("#napojna_ts").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#napojna_ts"));
    }
    if (document.querySelector("#id").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#id"));
    }*/
  } else if (sloj === "pod") {
    //Inputi
    /*if (document.querySelector("#fid_1").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#fid_1"));
    }*/
    if (document.querySelector("#prik_kabal").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#prik_kabal"));
    }
    if (document.querySelector("#pod").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pod"));
    }
    if (document.querySelector("#adresa_mm").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#adresa_mm"));
    }
    if (document.querySelector("#prik_mjesto").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#prik_mjesto"));
    }
    if (document.querySelector("#naziv_nn_izvod").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#naziv_nn_izvod"));
    }
    if (document.querySelector("#pretplatni_br").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#pretplatni_br"));
    }
    if (document.querySelector("#br_brojila").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#br_brojila"));
    }
    if (document.querySelector("#naziv_ts").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#naziv_ts"));
    }
    if (document.querySelector("#sifra_ts").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#sifra_ts"));
    }
    if (document.querySelector("#izvod_ts").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#izvod_ts"));
    }
    if (document.querySelector("#napojna_ts").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#napojna_ts"));
    }
    if (document.querySelector("#id").value === "") {
      popunjen = false;
      borderChange(document.querySelector("#id"));
    }
  }
  return popunjen;
}
function borderChange(el) {
  el.style.border = "1px solid red";
}

function borderClear() {
  let lista = document.querySelector("#atributiDiv").getElementsByTagName("input");
  let listaSelekt = document.querySelector("#atributiDiv").getElementsByTagName("select");
  for (let i = 0; i < lista.length; i++) {
    lista[i].style.border = "1px solid #c1c1c1";
  }

  for (let i = 0; i < listaSelekt.length; i++) {
    listaSelekt[i].style.border = "1px solid #c1c1c1";
  }
}
