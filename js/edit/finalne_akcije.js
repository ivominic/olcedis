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

    unosUspjeh = false;
    isUnprocessed = true;
    return false;
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

  let jsonDataArray = [];
  nizWmsZaPomjeranje.forEach((el) => {
    jsonDataArray.push({ stariObjekat: el[0], novaGeometrija: el[1] });
  });
  let pomjeranje_objekta = JSON.stringify({
    objects: jsonDataArray,
    korisnik: globalUsername,
    group_id: globalTimestamp,
  });

  let objekti_za_azuriranje = { objekti: JSON.stringify(kmlLinksArray), group_id: globalTimestamp };

  await insertObjekataIzGpx();
  let pretplatniBrojDupli = finalProvjeraDuplih();
  if (pretplatniBrojDupli) {
    poruka(StatusPoruke.Upozorenje, "Pretplatnik sa pretplatnim brojem " + pretplatniBrojDupli + " je već sačuvan.");
    return false;
  }
  let object_control = [
    { temp_stubovi: JSON.stringify(stuboviArrayFinal) },
    { temp_vodovi: JSON.stringify(vodoviArrayFinal) },
    { temp_trafostanice: JSON.stringify(trafostaniceArrayFinal) },
    //{ temp_pod: JSON.stringify(podoviArrayFinal) },
    { temp_pod: JSON.stringify([]) },
    { temp_prikljucno_mjesto: JSON.stringify(prikljucnaMjestaArrayFinal) },
    { temp_potrosaci: JSON.stringify(potrosaciArrayFinal) },
    { temp_nkro: JSON.stringify(nkroArrayFinal) },
    { group_id: globalTimestamp },
  ];

  let brisanje_objekta = {
    korisnik: globalUsername,
    objekti: JSON.stringify(nizWmsZaBrisanje),
    group_id: globalTimestamp,
  };

  if (isUnprocessed && nizWmsZaPomjeranje.length === 0) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.NisuObradjeniSviZaUvoz);
    resetovanjeNizovaNakonGreske();
    return false;
  }

  if (
    nizWmsZaPomjeranje.length +
      kmlLinksArray.length +
      stuboviArrayFinal.length +
      vodoviArrayFinal.length +
      trafostaniceArrayFinal.length +
      podoviArrayFinal.length +
      prikljucnaMjestaArrayFinal.length +
      potrosaciArrayFinal.length +
      nkroArrayFinal.length +
      nizWmsZaBrisanje.length ===
    0
  ) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.NemaObjekataZaObradu);
    resetovanjeNizovaNakonGreske();
    return false;
  }

  let pocetna_tacka = {
    pocetna_tacka: globalPocetnaPoveznica,
  };

  serviceWrap(
    objekti_za_azuriranje,
    object_control,
    brisanje_objekta,
    pomjeranje_objekta,
    JSON.stringify(stuboviArrayFinal),
    pocetna_tacka
  );

  /*Promise.all(promiseArray).then(function () {
    console.log("Kompletiran unos podataka", finalImportMessage);
    if (finalImportMessage) {
      poruka(StatusPoruke.Greska, finalImportMessage);
      resetovanjeNizovaNakonGreske();
    } else {
      poruka(StatusPoruke.Uspjeh, UnosPoruke.Uspjeh);
      resetovanjeNakonUspjeha();
    }
  });*/

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
  isUnprocessed = false;
}

function resetovanjeNakonUspjeha() {
  resetovanjeNizovaNakonGreske();
  availableLayersPerPowerLevel("");
  vectorSource && vectorSource.clear();
  vektorKreiraniPonovo.getSource().clear();
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

  globalPocetnaPoveznica = "";

  blnIsChange = false;
  isUnprocessed = false;
}
