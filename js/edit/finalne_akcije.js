/**Metode koje vrše finalnu obradu podataka prije inserta u bazu */

async function insertObjekataIzGpx() {
  let postojiNeobradjenaTacka = false;
  let iterator = 0;
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

  if (postojiNeobradjenaTacka) {
    console.log("Upozorenje", "Nisu obradjeni svi objekti iz fajla za uvoz.");
    poruka(StatusPoruke.Upozorenje, UnosPoruke.NisuObradjeniSviZaUvoz);
    unosUspjeh = false;
    return false;
  } else {
    //TODO: Unijeti sve nizove u bazu (pozvati servis za svaki od nizova)
    await insertAllObjects(
      stuboviArrayFinal,
      vodoviArrayFinal,
      trafostaniceArrayFinal,
      podoviArrayFinal,
      prikljucnaMjestaArrayFinal,
      potrosaciArrayFinal,
      nkroArrayFinal
    );
  }
}

/** Funkcija koja se pripremljene podatke šalje servisima za  unos u bazu */
async function finalnaPotvrdaUnosa() {
  //Pozivanje web servisa za finalni unos
  finalImportMessage = "";
  if (
    !(
      gpxFeatures.length +
      vodoviArrayFinal.length +
      nizVodovaGpx.length +
      nizWmsZaBrisanje.length +
      kmlLinksArray.length +
      nizWmsZaIzmjenu.length
    )
  ) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.NemaObjekataZaObradu);
    return false;
  }
  unosUspjeh = true;
  unosPostojeObjekti = true;
  if (nizWmsZaPomjeranje.length > 0) {
    pomjeranjeObjekataVodaWS();
  } else {
    await kmlConnectionLog(kmlLinksArray);
    await insertObjekataIzGpx();
    await brisanjeWmsObjekata();
  }

  Promise.all(promiseArray).then(function () {
    console.log("Kompletiran unos podataka", finalImportMessage);
    if (finalImportMessage) {
      poruka(StatusPoruke.Greska, finalImportMessage);
      resetovanjeNizovaNakonGreske();
    } else {
      poruka(StatusPoruke.Uspjeh, UnosPoruke.Uspjeh);
      resetovanjeNakonUspjeha();
    }
  });

  console.log("Finalno features", gpxFeatures);
}

function resetovanjeNizovaNakonGreske() {
  stuboviArrayFinal.length = 0;
  vodoviArrayFinal.length = 0;
  trafostaniceArrayFinal.length = 0;
  podoviArrayFinal.length = 0;
  prikljucnaMjestaArrayFinal.length = 0;
  potrosaciArrayFinal.length = 0;
  nkroArrayFinal.length = 0;
  //vektorKreiraniVodovi
}

function resetovanjeNakonUspjeha() {
  resetovanjeNizovaNakonGreske();
  availableLayersPerPowerLevel("");
  vectorSource && vectorSource.clear();
  vektorKreiraniVodovi.getSource().clear();
  gpxFeatures.length = 0;
  nizWmsZaIzmjenu.length = 0;
  nizZaVektorAzuriranje.length = 0;
  vektorObjektiZaAzuriranje.getSource().clear();
  nizWmsZaBrisanje.length = 0;
  nizZaVektorBrisanje.length = 0;
  vektorObjektiZaBrisanje.getSource().clear();
  vodoviArrayFinal.length = 0;
  nizVodovaGpx.length = 0;
  kmlLinksArray.length = 0;

  globalTimestamp = Date.now();

  sifraNapojneTrafostanice = "";
  nazivNapojneTrafostanice = "";
  izvodNapojneTrafostanice = "";
}
