function obaveznaPolja(sloj) {
  borderClear();
  //Iz ddl_sloj_podataka ddl liste
  if ([Podsloj.Stub04, Podsloj.Stub10, Podsloj.Stub35].includes(sloj)) {
    return provjeraObaveznostiStubovi(sloj);
  } else if ([Podsloj.Vod04, Podsloj.Vod10, Podsloj.Vod35].includes(sloj)) {
    return provjeraObaveznostiVodovi(sloj);
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
  return false;
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

function provjeraObaveznostiStubovi(sloj) {
  let isFilled = true;
  if (document.querySelector("#name").value === "") {
    isFilled = borderChange(document.querySelector("#name"));
  }
  if (document.querySelector("#vlasnistvo").value === "") {
    isFilled = borderChange(document.querySelector("#vlasnistvo"));
  }
  if (document.querySelector("#tip_stub").value === "") {
    isFilled = borderChange(document.querySelector("#tip_stub"));
  }
  if (document.querySelector("#rasp_prov").value === "") {
    isFilled = borderChange(document.querySelector("#rasp_prov"));
  }
  if (document.querySelector("#pog_sprem").value === "") {
    isFilled = borderChange(document.querySelector("#pog_sprem"));
  }

  if (sloj === Podsloj.Stub04) {
    if (document.querySelector("#uzemljivac_stub_04").value === "") {
      isFilled = borderChange(document.querySelector("#uzemljivac_stub_04"));
    }
    if (document.querySelector("#vrsta_namjena_stub_04").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_namjena_stub_04"));
    }
    if (document.querySelector("#rasvjeta_stub").value === "") {
      isFilled = borderChange(document.querySelector("#rasvjeta_stub"));
    }
    if (document.querySelector("#br_pmo").value === "") {
      isFilled = borderChange(document.querySelector("#br_pmo"));
    }
    if (document.querySelector("#optika_stub_04").value === "") {
      isFilled = borderChange(document.querySelector("#optika_stub_04"));
    }
    if (document.querySelector("#br_nnv").value === "") {
      isFilled = borderChange(document.querySelector("#br_nnv"));
    }
    if (document.querySelector("#vrsta_materijal_stub_04").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_materijal_stub_04"));
    }
  } else if (sloj === Podsloj.Stub10) {
    if (document.querySelector("#uzemljivac_stub_10").value === "") {
      isFilled = borderChange(document.querySelector("#uzemljivac_stub_10"));
    }
    if (document.querySelector("#vrsta_namjena_stub_10").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_namjena_stub_10"));
    }
    if (document.querySelector("#br_10kv_vodova").value === "") {
      isFilled = borderChange(document.querySelector("#br_10kv_vodova"));
    }
    if (document.querySelector("#nn_vod_stub_10").value === "") {
      isFilled = borderChange(document.querySelector("#nn_vod_stub_10"));
    }
    if (document.querySelector("#vrsta_materijal_stub_10").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_materijal_stub_10"));
    }
  } else if (sloj === Podsloj.Stub35) {
    if (document.querySelector("#uzemljivac_stub_35").value === "") {
      isFilled = borderChange(document.querySelector("#uzemljivac_stub_35"));
    }
    if (document.querySelector("#vrsta_namjena_stub_35").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_namjena_stub_35"));
    }
    if (document.querySelector("#optika_stub_35").value === "") {
      isFilled = borderChange(document.querySelector("#optika_stub_35"));
    }
    if (document.querySelector("#br_35kv_vodova").value === "") {
      isFilled = borderChange(document.querySelector("#br_35kv_vodova"));
    }
    if (document.querySelector("#vrsta_materijal_stub_35").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_materijal_stub_35"));
    }
  }
  return isFilled;
}

function provjeraObaveznostiVodovi(sloj) {
  let isFilled = true;
  if (document.querySelector("#name").value === "") {
    isFilled = borderChange(document.querySelector("#name"));
  }
  if (document.querySelector("#vlasnistvo").value === "") {
    isFilled = borderChange(document.querySelector("#vlasnistvo"));
  }
  if (document.querySelector("#br_spojnica").value === "") {
    isFilled = borderChange(document.querySelector("#br_spojnica"));
  }
  if (document.querySelector("#br_faza").value === "") {
    isFilled = borderChange(document.querySelector("#br_faza"));
  }
  if (document.querySelector("#pog_sprem").value === "") {
    isFilled = borderChange(document.querySelector("#pog_sprem"));
  }

  if (sloj === Podsloj.Vod04) {
    if (document.querySelector("#vrsta_materijal_vod_04").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_materijal_vod_04"));
    }
    if (document.querySelector("#vrsta_vod_04").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_vod_04"));
    }
    if (document.querySelector("#tip_vod_04").value === "") {
      isFilled = borderChange(document.querySelector("#tip_vod_04"));
    }
    if (document.querySelector("#uze").value === "") {
      isFilled = borderChange(document.querySelector("#uze"));
    }
    if (document.querySelector("#presjek_vod_04").value === "") {
      isFilled = borderChange(document.querySelector("#presjek_vod_04"));
    }
  } else if (sloj === Podsloj.Vod10) {
    if (document.querySelector("#vrsta_materijal_vod_10").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_materijal_vod_10"));
    }
    if (document.querySelector("#vrsta_vod_10").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_vod_10"));
    }
    if (document.querySelector("#tip_vod_10").value === "") {
      isFilled = borderChange(document.querySelector("#tip_vod_10"));
    }
    if (document.querySelector("#uze_vod_10").value === "") {
      isFilled = borderChange(document.querySelector("#uze_vod_10"));
    }
    if (document.querySelector("#presjek_vod_10").value === "") {
      isFilled = borderChange(document.querySelector("#presjek_vod_10"));
    }
    if (document.querySelector("#sifra_dionice").value === "") {
      isFilled = borderChange(document.querySelector("#sifra_dionice"));
    }
  } else if (sloj === Podsloj.Vod35) {
    if (document.querySelector("#vrsta_materijal_vod_35").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_materijal_vod_35"));
    }
    if (document.querySelector("#vrsta_vod_35").value === "") {
      isFilled = borderChange(document.querySelector("#vrsta_vod_35"));
    }
    if (document.querySelector("#tip_vod_35").value === "") {
      isFilled = borderChange(document.querySelector("#tip_vod_35"));
    }
    if (document.querySelector("#uze_presjek_vod_35").value === "") {
      isFilled = borderChange(document.querySelector("#uze_presjek_vod_35"));
    }
    if (document.querySelector("#presjek_vod_35").value === "") {
      isFilled = borderChange(document.querySelector("#presjek_vod_35"));
    }
    if (document.querySelector("#uze_vod_35").value === "") {
      isFilled = borderChange(document.querySelector("#uze_vod_35"));
    }
    if (document.querySelector("#sifra_dionice").value === "") {
      isFilled = borderChange(document.querySelector("#sifra_dionice"));
    }
  }
  return isFilled;
}

function provjeraObaveznostiNkro() {
  let isFilled = true;
  if (document.querySelector("#name").value === "") {
    isFilled = borderChange(document.querySelector("#name"));
  }
  if (document.querySelector("#id").value === "") {
    isFilled = borderChange(document.querySelector("#id"));
  }
  if (document.querySelector("#vrsta_materijal").value === "") {
    isFilled = borderChange(document.querySelector("#vrsta_materijal"));
  }
  if (document.querySelector("#montaza").value === "") {
    isFilled = borderChange(document.querySelector("#montaza"));
  }
  if (document.querySelector("#vlasnistvo").value === "") {
    isFilled = borderChange(document.querySelector("#vlasnistvo"));
  }
  if (document.querySelector("#vrata").value === "") {
    isFilled = borderChange(document.querySelector("#vrata"));
  }
  if (document.querySelector("#pog_sprem").value === "") {
    isFilled = borderChange(document.querySelector("#pog_sprem"));
  }
  return isFilled;
}

function provjeraObaveznostiPrikljucnoMjesto() {
  let isFilled = true;
  if (document.querySelector("#name").value === "") {
    isFilled = borderChange(document.querySelector("#name"));
  }
  if (document.querySelector("#osiguraci").value === "") {
    isFilled = borderChange(document.querySelector("#osiguraci"));
  }
  if (document.querySelector("#vlasnistvo").value === "") {
    isFilled = borderChange(document.querySelector("#vlasnistvo"));
  }
  if (document.querySelector("#id").value === "") {
    isFilled = borderChange(document.querySelector("#id"));
  }
  return isFilled;
}

function provjeraObaveznostiPotrosac() {
  let isFilled = true;
  if (document.querySelector("#name").value === "") {
    isFilled = borderChange(document.querySelector("#name"));
  }
  if (document.querySelector("#prik_mjesto").value === "") {
    isFilled = borderChange(document.querySelector("#prik_mjesto"));
  }
  if (document.querySelector("#pretplatni_br").value === "") {
    isFilled = borderChange(document.querySelector("#pretplatni_br"));
  }
  return isFilled;
}

function provjeraObaveznostiPod() {
  let isFilled = true;
  if (document.querySelector("#name").value === "") {
    isFilled = borderChange(document.querySelector("#name"));
  }
  if (document.querySelector("#prik_mjesto").value === "") {
    isFilled = borderChange(document.querySelector("#prik_mjesto"));
  }
  if (document.querySelector("#pretplatni_br").value === "") {
    isFilled = borderChange(document.querySelector("#pretplatni_br"));
  }
  return isFilled;
}
