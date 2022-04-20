/**Metode koje popunjavaju polja za atribute iz selektovanih raster objekata */

//map.on("singleclick", odabirSvihRasterObjekataKlik);
//metoda za čitanje atributa iz rasterskih lejera

//Tretirati niz dobijen iz rastera kao i nizGpxTacakaZaObradu, za prikaz strelica za prethodni i sljedeći objekat.

function prikazAtributaSelektovanihObjekata() {
  console.log("prikazAtributaSelektovanihObjekata", nizSelektovanihObjekata);
  //TODO: Izvući podatke iz niza: lejer, id i napon
  //TODO: Podesiti ddl za odabir lejera na lejer selektovanog objekta
  //TODO: Popuniti polja za atribute vrijednostima iz selektovanog objekta.
  //TODO: Poziv servisa za brisanje
  //TODO: Ne dozvoliti izmjenu/brisanje potrošača, nelegalnih potrošača i svih temp_ tabela
  nizSelektovanihObjekata.forEach((el) => {
    console.log("el.id", el.id);
    console.log("el.properties.napon", el.properties.napon);
    console.log("lejer iz ddl-a", ddlLejerNaziv(el.id, el.properties.napon));
    //console.log("el.properties.originalId", el.properties.originalId);
  });
}

/**
 * Metoda koja za id selektovan raster objekta i njegov napon vrati value lejera iz ddl liste za prikaz atributa.
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
