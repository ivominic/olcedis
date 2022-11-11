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
  if ([Podsloj.Stub04, Podsloj.Stub10, Podsloj.Stub35].includes(sloj)) {
    return provjeraObaveznostiStubovi();
  } else if ([Podsloj.Vod04, Podsloj.Vod10, Podsloj.Vod35].includes(sloj)) {
    return provjeraObaveznostiVodovi();
  } else if (sloj === Podsloj.Nkro) {
    return provjeraObaveznostiNkro();
  } else if (sloj === Podsloj.PrikljucnoMjesto) {
    return provjeraObaveznostiPrikljucnoMjesto();
  } else if (sloj === Podsloj.Potrosac) {
    return provjeraObaveznostiPotrosac();
  } else if (sloj === Podsloj.Pod) {
    return provjeraObaveznostiPod();
  }
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

function provjeraObaveznostiStubovi() {
  let isFilled = true;

  //Input
  if (document.querySelector("#rasp_prov").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#rasp_prov"));
  }

  if (sloj === Podsloj.Stub04) {
    //Input
    if (document.querySelector("#br_pmo").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#br_pmo"));
    }
    //Select
    if (document.querySelector("#tip_stub").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#tip_stub"));
    }
    if (document.querySelector("#vrsta_namjena_stub_04").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vrsta_namjena_stub_04"));
    }
    if (document.querySelector("#uzemljivac_stub_04").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#uzemljivac_stub_04"));
    }
    if (document.querySelector("#optika_stub_04").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#optika_stub_04"));
    }
    if (document.querySelector("#rasvjeta_stub").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#rasvjeta_stub"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
  } else if (sloj === Podsloj.Stub10) {
    //Input
    if (document.querySelector("#br_nnv").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#br_nnv"));
    }
    //Selekti
    if (document.querySelector("#vrsta_namjena_stub_10").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vrsta_namjena_stub_10"));
    }
    if (document.querySelector("#uzemljivac_stub_10").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#uzemljivac_stub_10"));
    }
    if (document.querySelector("#optika_stub_10").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#optika_stub_10"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#nn_vod_stub_10").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#nn_vod_stub_10"));
    }
  } else if (sloj === Podsloj.Stub35) {
  }
  return isFilled;
}

function provjeraObaveznostiVodovi() {
  let isFilled = true;
  if (sloj === "vod04") {
    //Inputi
    //Selekti
    if (document.querySelector("#tip_vod_04").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#tip_vod_04"));
    }
    if (document.querySelector("#vrsta_materijal_vod_04").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vrsta_materijal_vod_04"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#br_faza").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#br_faza"));
    }
    if (document.querySelector("#vrsta_vod_04").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vrsta_vod_04"));
    }
    if (document.querySelector("#presjek_vod_04").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#presjek_vod_04"));
    }
  } else if (sloj === "vod10") {
    //Inputi
    if (document.querySelector("#sifra_dionice").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#sifra_dionice"));
    }
    //Selekti
    if (document.querySelector("#tip_vod_10").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#tip_vod_10"));
    }
    if (document.querySelector("#vrsta_materijal_vod_10").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vrsta_materijal_vod_10"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#br_faza").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#br_faza"));
    }
    if (document.querySelector("#vrsta_vod_10").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vrsta_vod_10"));
    }
    if (document.querySelector("#presjek_vod_10").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#presjek_vod_10"));
    }
    if (document.querySelector("#uze_presjek_vod_10").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#uze_presjek_vod_10"));
    }
  } else if (sloj === "vod35") {
    //Inputi
    if (document.querySelector("#sifra_dionice").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#sifra_dionice"));
    }
    //Selekti
    if (document.querySelector("#tip_vod_35").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#tip_vod_35"));
    }
    if (document.querySelector("#vrsta_materijal_vod_35").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vrsta_materijal_vod_35"));
    }
    if (document.querySelector("#pog_sprem").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#pog_sprem"));
    }
    if (document.querySelector("#vlasnistvo").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vlasnistvo"));
    }
    if (document.querySelector("#br_faza").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#br_faza"));
    }
    if (document.querySelector("#vrsta_vod_35").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#vrsta_vod_35"));
    }
    if (document.querySelector("#presjek_vod_35").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#presjek_vod_35"));
    }
    if (document.querySelector("#uze_presjek_vod_35").value === "") {
      isFilled = false;
      borderChange(document.querySelector("#uze_presjek_vod_35"));
    }
  }
  return isFilled;
}

function provjeraObaveznostiNkro() {
  let isFilled = true;
  if (document.querySelector("#id").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#id"));
  }
  if (document.querySelector("#vrsta_materijal").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#vrsta_materijal"));
  }
  if (document.querySelector("#montaza").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#montaza"));
  }
  if (document.querySelector("#vlasnistvo").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#vlasnistvo"));
  }
  if (document.querySelector("#vrata").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#vrata"));
  }
  if (document.querySelector("#pog_sprem").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#pog_sprem"));
  }
  return isFilled;
}

function provjeraObaveznostiPrikljucnoMjesto() {
  let isFilled = true;
  if (document.querySelector("#vlasnistvo").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#vlasnistvo"));
  }
  if (document.querySelector("#id").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#id"));
  }
  if (document.querySelector("#br_pretplatnika").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#br_pretplatnika"));
  }
  //Selekti
  if (document.querySelector("#vlasnistvo").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#vlasnistvo"));
  }
  if (document.querySelector("#osiguraci").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#osiguraci"));
  }
  return isFilled;
}

function provjeraObaveznostiPotrosac() {
  let isFilled = true;
  if (document.querySelector("#prik_mjesto").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#prik_mjesto"));
  }
  if (document.querySelector("#pretplatni_br").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#pretplatni_br"));
  }
  return isFilled;
}

function provjeraObaveznostiPod() {
  let isFilled = true;
  if (document.querySelector("#prik_mjesto").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#prik_mjesto"));
  }
  if (document.querySelector("#pretplatni_br").value === "") {
    isFilled = false;
    borderChange(document.querySelector("#pretplatni_br"));
  }
  return isFilled;
}
