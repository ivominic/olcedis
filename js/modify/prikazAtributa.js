/**Metode koje popunjavaju polja za atribute iz selektovanih raster objekata */

//map.on("singleclick", odabirSvihRasterObjekataKlik);
//metoda za čitanje atributa iz rasterskih lejera
//Tretirati niz dobijen iz rastera kao i nizGpxTacakaZaObradu, za prikaz strelica za prethodni i sljedeći objekat.

/**
 * Metoda za prikaz atributa odabranih objekata sa mape (wms objekata). Postupak se sprovodi kroz sljedeće korake:
 * Za svaki objekat se u niz selektovanih dodaju: lejer, id i napon
 * Podešava se ddl lista na vrijednost lejera prvog odabranog objekta. Ovim se prikazuju odgovarajući atributi.
 * Popunjavanje svih prikazanih polja vrijednostima atributa objekta.
 */
function prikazAtributaSelektovanihObjekata() {
  console.log("prikazAtributaSelektovanihObjekata", nizSelektovanihObjekata);
  //TODO: Ne dozvoliti izmjenu/brisanje potrošača, nelegalnih potrošača i svih temp_ tabela
  nizSelektovanihObjekata.forEach((el) => {
    el.ddlLejer = ddlLejerNaziv(el.id, el.properties.napon);
  });
  //Zadržavamo sve funkcionalnosti prikaza za rad sa nizom gpx tačaka

  if (nizSelektovanihObjekata.length > 1) {
    document.querySelector("#divPrethodniObjekat").style.display = "none";
    document.querySelector("#divSljedeciObjekat").style.display = "flex";
  } else {
    document.querySelector("#divPrethodniObjekat").style.display = "none";
    document.querySelector("#divSljedeciObjekat").style.display = "none";
  }

  selektovaniWmsObjekat = nizSelektovanihObjekata[0];
  nizSelektovanihObjekata.length && prikazPanelaAtributa(nizSelektovanihObjekata[0].ddlLejer);
  nizSelektovanihObjekata.length && prikazAtributaWmsLejer(nizSelektovanihObjekata[0]);
}

/**
 * Metoda koja za id selektovanog raster objekta i njegov napon vrati value lejera iz ddl liste za prikaz atributa.
 * @param {zapis oblika "stubovi.3243"} elId
 * @param {04, 10 ili 35} napon
 */
function ddlLejerNaziv(elId, napon) {
  if (elId.startsWith("nkro") || elId.startsWith("temp_nkro")) {
    return "nkro";
  }
  if (elId.startsWith("priklj") || elId.startsWith("temp_priklj")) {
    return "prikljucno_mjesto";
  }
  if (elId.startsWith("view_potrosac") || elId.startsWith("temp_potrosac")) {
    return "potrosac";
  }
  if (elId.startsWith("pod") || elId.startsWith("temp_pod")) {
    return "pod";
  }

  if (napon === "0.4" || napon === "0,4") {
    if (elId.startsWith("stub") || elId.startsWith("temp_stub")) {
      return "stub04";
    }
    if (elId.startsWith("vod") || elId.startsWith("temp_vod")) {
      return "vod04";
    }
    if (elId.startsWith("trafostanic") || elId.startsWith("temp_trafostanic")) {
      return "trafostanica10";
    }
  }
  if (napon === "10") {
    if (elId.startsWith("stub") || elId.startsWith("temp_stub")) {
      return "stub10";
    }
    if (elId.startsWith("vod") || elId.startsWith("temp_vod")) {
      return "vod10";
    }
    if (elId.startsWith("trafostanic") || elId.startsWith("temp_trafostanic")) {
      return "trafostanica35";
    }
  }
  if (napon === "35") {
    if (elId.startsWith("stub") || elId.startsWith("temp_stub")) {
      return "stub35";
    }
    if (elId.startsWith("vod") || elId.startsWith("temp_vod")) {
      return "vod35";
    }
    if (elId.startsWith("trafostanic") || elId.startsWith("temp_trafostanic")) {
      return "trafostanica110";
    }
  }
}

/**
 * Metoda koja selektovani objekat sa mape predaje, u zavisnoti kojem lejeru pripada,
 * metodama za popunjavanje odgovarajućih polja vrijednostima atributa objekta.
 * @param {Ovo je selektovaniWmsObjekat koji je definisan na globalnom nivou} objekat
 */
function prikazAtributaWmsLejer(objekat) {
  document.querySelector("#ddl_sloj_podataka").classList.add("disabledInput");
  document.querySelector("#ddl_sloj_podataka").disabled = true;
  console.log("WMS OBJEKAT", objekat);
  originalnaGeometrijaWmsVoda = objekat.geometry;
  document.querySelector("#ddl_sloj_podataka").value = objekat.ddlLejer;
  ddlLejerChange();
  if (objekat.ddlLejer === "stub35" || objekat.ddlLejer === "stub10" || objekat.ddlLejer === "stub04") {
    prikaziAtributeWmsStuba(objekat);
  }
  if (objekat.ddlLejer === "vod35" || objekat.ddlLejer === "vod10" || objekat.ddlLejer === "vod04") {
    prikaziPoljaWmsVoda(objekat);
  }
  if (
    objekat.ddlLejer === "trafostanica110" ||
    objekat.ddlLejer === "trafostanica35" ||
    objekat.ddlLejer === "trafostanica10"
  ) {
    prikaziPoljaWmsTrafostanice(objekat);
  }
  if (objekat.ddlLejer === "nkro") {
    prikaziPoljaWmsNKRO(objekat);
  }
  if (objekat.ddlLejer === "prikljucno_mjesto") {
    prikaziPoljaWmsPM(objekat);
  }
  if (objekat.ddlLejer === "potrosac") {
    prikaziPoljaWmsPotrosac(objekat);
  }
  if (objekat.ddlLejer === "pod") {
    prikaziPoljaWmsPod(objekat);
  }
}
