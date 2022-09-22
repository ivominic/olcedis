/**Metode koje služe za interakciju sa kontrolama na mapi */

/** Funkcije za rad sa navigacionim barom*/
function pan() {
  akcija = "pan";
  setujAktivnu("#pan");
}

function dodaj() {
  akcija = "dodaj";
  blnShowAttribute = true;
  setujAktivnu("#dodaj");
  document.querySelector("#ddl_sloj_podataka").classList.remove("disabledInput");
  document.querySelector("#ddl_sloj_podataka").disabled = false;
  ddlLejerChange();
  if (!sifraNapojneTrafostanice) {
    closeDiv("#atributiDiv");
    closeDiv("#pretragaDiv");
    disableMenija();
    showDiv("#odabirNapojneTrafostaniceDiv");
  }
}

function izmijeni() {
  akcija = "izmijeni";
  setujAktivnu("#izmijeni");
}

function atributi() {
  akcija = "atributi";
  blnShowAttribute = true;
  setujAktivnu("#atributi");
  document.querySelector("#ddl_sloj_podataka").classList.add("disabledInput");
  document.querySelector("#ddl_sloj_podataka").disabled = true;
}

function pretraga() {
  akcija = "pretraga";
  setujAktivnu("#pretraga");
}

function restart() {
  location.reload(true);
}

function slika() {
  //testPromjena();
  slikeIndex = 0;
  slikeUrl = [];
  akcija = "slika";
  setujAktivnu("#slika");
  //showDiv("#odabirPoveznicaDiv");
}

function crtajTacku() {
  akcija = point;
  setujAktivnu("#crtanje");
}

function crtajLiniju() {
  akcija = lineString;
  setujAktivnu("#crtanje");
}

function crtajPoligon() {
  akcija = polygon;
  setujAktivnu("#crtanje");
}

function brisanje() {
  //vectorSelektovaniObjekat.getSource().clear();
  poligoni.length = 0;
  linije.length = 0;
  tacke.length = 0;
  featureLineOverlay.getSource().clear();
  featurePointOverlay.getSource().clear();
  featurePolygonOverlay.getSource().clear();
}

/**Funkcije za setovanje podloga */
function osmPodloga() {
  map.getLayers().setAt(0, osmBaseMap);
  zatvoriHamburger();
}

function satelitPodloga() {
  map.getLayers().setAt(0, satelitBaseMap);
  zatvoriHamburger();
}

function ortofotoPodloga() {
  map.getLayers().setAt(0, ortofotoBaseMap);
  zatvoriHamburger();
}

function bezPodloga() {
  map.getLayers().setAt(0, bezBaseMap);
  zatvoriHamburger();
}

/**Funkcije za download WFS-a */
function shpDownload() {
  zatvoriHamburger();
  wfsDownload("SHAPE-ZIP");
}

function kmlDownload() {
  zatvoriHamburger();
  wfsDownload("KML");
}

function excelDownload() {
  zatvoriHamburger();
  wfsDownload("excel2007");
}

$("#topNav").children().prop("disabled", true);

function prikazPanelaAtributa(sloj) {
  console.log("prikazPanelAtributa", sloj);
  let blnPronadjenSloj = false;
  for (i = 0; i < document.querySelector("#ddl_sloj_podataka").options.length; i++) {
    console.log(document.querySelector("#ddl_sloj_podataka").options[i].value);
    if (document.querySelector("#ddl_sloj_podataka").options[i].value === sloj) {
      blnPronadjenSloj = true;
    }
  }
  sakrijSvaPoljaAtributDiv();
  if (sloj === "Stub 35KV" || sloj === "stub35") {
    odabraniLejerUnos = "stubovi";
    akcijaLejerNivo = "35";
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = "stub35";
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Stub 10KV" || sloj === "stub10") {
    odabraniLejerUnos = "stubovi";
    akcijaLejerNivo = "10";
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = "stub10";
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Stub 04KV" || sloj === "stub04") {
    odabraniLejerUnos = "stubovi";
    akcijaLejerNivo = "0.4";
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = "stub04";
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Vod 35KV" || sloj === "vod35") {
    odabraniLejerUnos = "vodovi";
    akcijaLejerNivo = "35";
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = "vod35";
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Vod 10KV" || sloj === "vod10") {
    odabraniLejerUnos = "vodovi";
    akcijaLejerNivo = "10";
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = "vod10";
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Vod 04KV" || sloj === "vod04") {
    odabraniLejerUnos = "vodovi";
    akcijaLejerNivo = "0.4";
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = "vod04";
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Trafostanica35x" || sloj === "trafostanica35") {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = "35";
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = "trafostanica35";
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "Trafostanica1004" || sloj === "trafostanica10") {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = "10";
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = "trafostanica10";
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "Trafostanica110x" || sloj === "trafostanica110") {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = "110";
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = "trafostanica110";
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "NKRO" || sloj === "nkro") {
    odabraniLejerUnos = "nkro";
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = "nkro";
    prikaziAtributDivNkro();
  } else if (sloj === "Priključno mjesto" || sloj === "prikljucno_mjesto") {
    odabraniLejerUnos = "prikljucno_mjesto";
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = "prikljucno_mjesto";
    prikaziAtributDivPrikljucnoMjesto();
  } else if (sloj === "Potrošač" || sloj === "potrosac") {
    odabraniLejerUnos = "potrosaci";
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = "potrosac";
    prikaziAtributDivPotrosac();
  } else if (sloj === "POD" || sloj === "pod") {
    odabraniLejerUnos = "pod";
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = "pod";
    prikaziAtributDivPod();
  }
  //TODO: Ovdje detaljno podesiti kad se prikazuje forma za unos atributa
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //if (akcija !== "pomjeranje") {

  if (blnShowAttribute) {
    console.log("Akcija atributi", akcija);
    console.log("PRikaz 6", odabirSaMape);
    blnShowAttribute && showDiv("#atributiDiv");
    if (blnPronadjenSloj) {
      //document.querySelector("#ddl_sloj_podataka").classList.add("disabledInput");
      //document.querySelector("#ddl_sloj_podataka").disabled = true;
      console.log("NAĐEN");
    } else {
      //poruka("Upozorenje", "Objekat ne pripada odabranom naponskom nivou");
      console.log("NIJE PRONAĐEN LEJER");
    }
  }
  console.log("akcijaLejerNivo", akcijaLejerNivo);
}

function noviStub35() {
  prikazPanelaAtributa("Stub 35KV");
}
function noviStub10() {
  prikazPanelaAtributa("Stub 10KV");
}
function noviStub04() {
  prikazPanelaAtributa("Stub 04KV");
}
function noviVod35() {
  prikazPanelaAtributa("Vod 35KV");
}
function noviVod10() {
  prikazPanelaAtributa("Vod 10KV");
}
function noviVod04() {
  prikazPanelaAtributa("Vod 04KV");
}
function novaTrafostanica35x() {
  prikazPanelaAtributa("Trafostanica35x");
}
function novaTrafostanica1004() {
  prikazPanelaAtributa("Trafostanica1004");
}
function novaTrafostanica110x() {
  prikazPanelaAtributa("Trafostanica110x");
}
function noviNkro() {
  prikazPanelaAtributa("NKRO");
}
function novoPrikljucnoMjesto() {
  prikazPanelaAtributa("Priključno mjesto");
}

function ddlLejerChange() {
  borderClear();
  sakrijSvaPoljaAtributDiv();
  let value = document.querySelector("#ddl_sloj_podataka").value;
  if (value === "stub04") {
    prikazPanelaAtributa("Stub 04KV");
  } else if (value === "stub10") {
    prikazPanelaAtributa("Stub 10KV");
  } else if (value === "stub35") {
    prikazPanelaAtributa("Stub 35KV");
  } else if (value === "vod04") {
    prikazPanelaAtributa("Vod 04KV");
  } else if (value === "vod10") {
    prikazPanelaAtributa("Vod 10KV");
  } else if (value === "vod35") {
    prikazPanelaAtributa("Vod 35KV");
  } else if (value === "trafostanica10") {
    prikazPanelaAtributa("Trafostanica1004");
  } else if (value === "trafostanica35") {
    prikazPanelaAtributa("Trafostanica35x");
  } else if (value === "vod35") {
    prikazPanelaAtributa("trafostanica110");
  } else if (value === "nkro") {
    prikazPanelaAtributa("NKRO");
  } else if (value === "prikljucno_mjesto") {
    prikazPanelaAtributa("Priključno mjesto");
  } else if (value === "potrosac") {
    prikazPanelaAtributa("Potrošač");
  } else if (value === "pod") {
    prikazPanelaAtributa("POD");
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
      kmlLinksArray.length
    )
  ) {
    poruka("Upozorenje", "Ne postoje objekti koje je potrebno obraditi");
    return false;
  }
  unosUspjeh = true;
  unosPostojeObjekti = true;
  await kmlConnectionLog(kmlLinksArray);
  await insertObjekataIzGpx();
  await brisanjeWmsObjekata();
  Promise.all(promiseArray).then(function () {
    console.log("Kompletiran unos podataka", finalImportMessage);
    if (finalImportMessage) {
      poruka("Greska", finalImportMessage);
    } else {
      poruka("Uspjeh", "Uspješno izvršena akcija");
    }
  });

  console.log("Finalno features", gpxFeatures);
}

/**Povezivanje kontrola sa akcijama */
document.querySelector("#pan").addEventListener("click", pan);
//document.querySelector("#dodaj").addEventListener("click", ddlLejerChange);
document.querySelector("#dodaj").addEventListener("click", dodaj);
//document.querySelector("#izmijeni").addEventListener("click", izmijeni);
document.querySelector("#atributi").addEventListener("click", atributi);
document.querySelector("#slika").addEventListener("click", slika);
document.querySelector("#marker").addEventListener("click", crtajTacku);
document.querySelector("#linija").addEventListener("click", crtajLiniju);
document.querySelector("#poligon").addEventListener("click", crtajPoligon);
document.querySelector("#brisanje").addEventListener("click", brisanje);
document.querySelector("#pretraga").addEventListener("click", pretraga);
document.querySelector("#selekcijaPocetnogStuba").addEventListener("click", selekcijaPocetnogStuba);
document.querySelector("#selekcijaZavrsnogStuba").addEventListener("click", selekcijaZavrsnogStuba);
document.querySelector("#selekecijaPoligon").addEventListener("click", selekcijaGpxPoligonom);
document.querySelector("#potvrda").addEventListener("click", finalnaPotvrdaUnosa);
document.querySelector("#restart").addEventListener("click", restart);
document.querySelector("#podloga_osm").addEventListener("click", osmPodloga);
document.querySelector("#podloga_satelit").addEventListener("click", satelitPodloga);
document.querySelector("#podloga_ortofoto").addEventListener("click", ortofotoPodloga);
document.querySelector("#podloga_bez").addEventListener("click", bezPodloga);
document.querySelector("#shp").addEventListener("click", shpDownload);
document.querySelector("#kml").addEventListener("click", kmlDownload);
document.querySelector("#excel").addEventListener("click", excelDownload);

function closeAllDivs() {
  closeDiv("#odabirCvorovaVodaDiv");
  closeDiv("#odabirObjektaZaPomjeranjeDiv");
  closeDiv("#atributiDiv");
}

document.querySelector("#vodDodvanjeObjektaBtn").addEventListener("click", function () {
  closeAllDivs();
  showDiv("#odabirCvorovaVodaDiv");
});
document.querySelector("#vodPomjeranjeObjektaBtn").addEventListener("click", function () {
  closeAllDivs();
  showDiv("#odabirObjektaZaPomjeranjeDiv");
});
document.querySelector("#vodProduzenjeKrakaBtn").addEventListener("click", function () {
  closeAllDivs();
  map.on("singleclick", vodEditGeometrije);
});
document.querySelector("#ddl_sloj_podataka").addEventListener("click", ddlLejerChange);
document.querySelector("#btnPrethodniObjekat").addEventListener("click", prethodniObjekatGpx);
document.querySelector("#btnSljedeciObjekat").addEventListener("click", sljedeciObjekatGpx);

//Akcije za povezivanje voda sa početnom i krajnjom tačkom
document.querySelector("#btnPotvrdiPoveznica").addEventListener("click", potvrdaUnosaVoda);
document.querySelector("#btnPocetnaTackaPoveznica").addEventListener("click", odabirPocetneTackeVoda);
document.querySelector("#btnKrajnjaTackaPoveznica").addEventListener("click", odabirKrajnjeTackeVoda);

document.querySelector("#btnBliskiObjekatKml").addEventListener("click", odabirTackePovezivanjaKmla);
document.querySelector("#btnPotvrdiKmlPoveznicu").addEventListener("click", saveKmlConnection);

document.querySelector("#btnOdabirNapojneTrafostanice").addEventListener("click", odabirNapojneTrafostaniceUnos);
document.querySelector("#btnPotvrdiNapojnuTrafostanicu").addEventListener("click", potvrdaNapojneTrafostaniceUnos);
document.querySelector("#txtSifraNapojneTrafostanice").addEventListener("keyup", promjenaSifreNapojneTrafostanice);

//Odabir priključnog mjesta za potrošače
document.querySelector("#btnMapaPrikljucnoMjesto").addEventListener("click", odabirPrikljucnogMjestaZaUnosPotrosaca);

//Akcije za dodavanje novog objekta postojećem vodu
document.querySelector("#btnPotvrdiDodavanjeVodu").addEventListener("click", potvrdaDodavanjaVodu);
document.querySelector("#btnPocetniCvorVoda").addEventListener("click", odabirPocetnogCvoraVoda);
document.querySelector("#btnKrajnjiCvorVoda").addEventListener("click", odabirKrajnjegCvoraVoda);

//Akcije za pomjeranje objekata
document.querySelector("#btnObjekatZaPomjeranje").addEventListener("click", odabirObjektaZaPomjeranje);
document.querySelector("#btnPotvrdiPomjeranjeObjekta").addEventListener("click", potvrdaPomjeranjaObjekta);

function odabirNapojneTrafostaniceUnos() {
  odabirNapojneTrafostaniceSaMape();
}

function potvrdaNapojneTrafostaniceUnos() {
  let izvod = document.querySelector("#ddlIzvodNapojneTrafostanice").value;
  if (izvod === "") {
    poruka("Upozorenje", "Potrebno je odabrati izvod trafostanice");
    return false;
  }
  selektovaniWmsObjekat = null;
  sifraNapojneTrafostanice = document.querySelector("#txtSifraNapojneTrafostanice").value;
  nazivNapojneTrafostanice = document.querySelector("#txtNazivNapojneTrafostanice").value;
  izvodNapojneTrafostanice = izvod;
  document.querySelector("#sifra_ts").value = sifraNapojneTrafostanice;
  document.querySelector("#naziv_ts").value = nazivNapojneTrafostanice;
  document.querySelector("#izvod_ts").value = izvodNapojneTrafostanice;
  closeDiv("#odabirNapojneTrafostaniceDiv");
  poruka("Uspjeh", "Uspješno odabran izvod napojne trafostanice.");
  isprazniVrijednostiPoljaTrafostanice();
  enableMenija();
  readRadius();
  if (!isEditable) {
    showConnectForm();
  }
  sifreDionicaVodova(nazivNapojneTrafostanice, sifraNapojneTrafostanice, izvodNapojneTrafostanice);
  availableLayersPerPowerLevel(filePowerLevel);
  neupareneTrafostanice(sifraNapojneTrafostanice, izvodNapojneTrafostanice);
}

function promjenaSifreNapojneTrafostanice() {
  let sifra = document.querySelector("#txtSifraNapojneTrafostanice").value;
  if (sifra.length >= 6 && sifra.length <= 8) {
    pretragaTrafostanicaGpx(sifra);
    geometrijaTrafostaniceCentar(sifra);
    //Poziv web servisa
  } else {
    document.querySelector("#txtNazivNapojneTrafostanice").value = "";
    $("#ddlIzvodNapojneTrafostanice").empty();
  }
}

function disableMenija() {
  let pocetnaDiv = document.getElementsByClassName("pocetni-div");
  if (pocetnaDiv) {
    pocetnaDiv[0].style.opacity = "0.3";
  }
  let akcija = document.getElementsByClassName("akcija");
  kontroleZaDisable = akcija;
  for (i = 0; i < akcija.length; i++) {
    akcija[i].style.cursor = "not-allowed";
    akcija[i].style.pointerEvents = "none";
  }
  let dropdown = document.getElementsByClassName("dropdown-content");
  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].style.display = "none";
  }
}

function enableMenija() {
  let pocetnaDiv = document.getElementsByClassName("pocetni-div");
  if (pocetnaDiv) {
    pocetnaDiv[0].style.opacity = "1";
  }
  let akcija = document.getElementsByClassName("akcija");
  for (i = 0; i < akcija.length; i++) {
    akcija[i].style.cursor = "pointer";
    akcija[i].style.pointerEvents = "all";
  }
  let dropdown = document.getElementsByClassName("dropdown-content");
  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].style.removeProperty("display");
  }
}

document.querySelector("#chkShowGpsFields").addEventListener("click", showGpsFields);
/**
 * Method that show input fields for entering gps number of points that needs to be connected to selected element.
 * This overrides default behavior of connecting to nearest gps point.
 */
function showGpsFields() {
  document
    .querySelector("#chkShowGpsFields")
    .setAttribute("checked", !document.querySelector("#chkShowGpsFields").checked);
  if (document.querySelector("#chkShowGpsFields").checked) {
    document.querySelector("#txtPocetnaTackaVodovi").style.display = "block";
    document.querySelector("#txtKrajnjaTackaVodovi").style.display = "block";
  } else {
    document.querySelector("#txtPocetnaTackaVodovi").style.display = "none";
    document.querySelector("#txtKrajnjaTackaVodovi").style.display = "none";
    document.querySelector("#txtPocetnaTackaVodovi").value = "";
    document.querySelector("#txtKrajnjaTackaVodovi").value = "";
  }
}
