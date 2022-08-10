/**Metode koje vrše finalnu obradu podataka prije inserta u bazu */

function insertObjekataIzGpx() {
  let postojiNeobradjenaTacka = false;
  let iterator = 0;
  /*stuboviArrayFinal.length = 0;
  trafostaniceArrayFinal.length = 0;
  podoviArrayFinal.length = 0;
  prikljucnaMjestaArrayFinal.length = 0;
  potrosaciArrayFinal.length = 0;
  nkroArrayFinal.length = 0;*/
  gpxFeatures.forEach((el) => {
    iterator++;
    console.log("finalno lejer", el.get("lejer"));
    //if (el.hasOwnProperty("lejer") && el.get("lejer") === "stubovi") {
    if (el.get("lejer") === "stubovi") {
      //console.log("stubovi", el);
      stubArrayElement(el, "I", 0, iterator);
    } else if (el.get("lejer") === "trafostanice") {
      //console.log("trafostanice", el);
      trafostanicaArrayElement(el, "I", 0, iterator);
    } else if (el.get("lejer") === "nkro") {
      //console.log("nkro", el);
      nkroArrayElement(el, "I", 0, iterator);
    } else if (el.get("lejer") === "potrosac") {
      //console.log("potrosaci", el);
      potrosacArrayElement(el, "I", 0, iterator);
    } else if (el.get("lejer") === "pod") {
      //console.log("pod", el);
      podArrayElement(el, "I", 0, iterator);
    } else if (el.get("lejer") === "prikljucno_mjesto") {
      //console.log("prikljucno_mjesto", el);
      prikljucnoMjestoArrayElement(el, "I", 0, iterator);
    } else if (el.get("lejer") === undefined) {
      console.log("nedefinisani", el);
      postojiNeobradjenaTacka = true;
    } else if (el.get("lejer") === "vodovi") {
      //console.log("vodovi", el);
      vodArrayElement(el, "I", 0, iterator);
    }
  });

  nizVodovaGpx.forEach((el) => {
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    vodArrayElement(el, "I", 0);
  });
  /*vektorKreiraniVodovi.getSource().forEach((el) => {
    vodArrayElement(el, "I", 0);
  });*/

  console.log("stubovi finalni array", stuboviArrayFinal);
  console.log("vodovi finalni array", vodoviArrayFinal);
  console.log("trafostanice finalni array", trafostaniceArrayFinal);
  console.log("nkro finalni array", nkroArrayFinal);
  console.log("potrosaci finalni array", potrosaciArrayFinal);
  console.log("podovi finalni array", podoviArrayFinal);
  console.log("prikljucna mjesta finalni array", prikljucnaMjestaArrayFinal);

  if (postojiNeobradjenaTacka) {
    poruka("Upozorenje", "Nisu obradjeni svi objekti iz fajla za uvoz.");
    return false;
  } else {
    //TODO: Unijeti sve nizove u bazu (pozvati servis za svaki od nizova)
    insertAllObjects(
      stuboviArrayFinal,
      vodoviArrayFinal,
      trafostaniceArrayFinal,
      podoviArrayFinal,
      prikljucnaMjestaArrayFinal,
      potrosaciArrayFinal,
      nkroArrayFinal
    );
  }
  availableLayersPerPowerLevel(""); //After completion fill ddl with all items.
  //poruka("Uspjeh", "Uspješno sačuvani podaci.");
  //TODO: Resetovati polja, trafostanicu, izvod..
  //Removin vector file from map, after completing action.
  vectorSource && vectorSource.clear();
  vektorKreiraniVodovi.getSource().clear();
  gpxFeatures.length = 0;
}
