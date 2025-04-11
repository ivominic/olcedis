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
  document.querySelector("#divOdabirSloja").style.display = "flex";
  selektovaniWmsObjekat = null; //TODO: Dodato da se izbjegne poruka o nemate prava, kad se klikne plus, uklanja se wms objekat

  ponovnoPunjenjeSifreDionice();
  ddlLejerChange();

  if (!sifraNapojneTrafostanice) {
    closeDiv("#atributiDiv");
    closeDiv("#pretragaDiv");
    closeDiv("#potvrdaProduzenjaKrakaDiv");
    disableMenija();
    showDiv("#odabirNapojneTrafostaniceDiv");
  }
}

function izmijeni() {
  akcija = "izmijeni";
  setujAktivnu("#izmijeni");
}

function atributi() {
  closeAllDivs();
  akcija = "atributi";
  blnShowAttribute = true;
  setujAktivnu("#atributi");
  document.querySelector("#ddl_sloj_podataka").classList.add("disabledInput");
  document.querySelector("#ddl_sloj_podataka").disabled = true;
}

function pretraga() {
  closeAllDivs();
  akcija = "pretraga";
  showDiv("#pretragaDiv");
  document.querySelector("#pretragaMenu").className = "activeLi";
  document.querySelector("#handButton").className = "";
}

function restart() {
  location.reload(true);
}

function slika() {
  if (selektovaniWmsObjekat) {
    let splitedData = selektovaniWmsObjekat.id.split(".");
    prikazFotografija(splitedData[0], splitedData[1]);
    slikeIndex = 0;
    slikeUrl = [];
    //akcija = "slika";
  }
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

$("#topNav").children().prop("disabled", true);

function prikazPanelaAtributa(sloj) {
  console.log("prikazPanelAtributa", sloj);
  if (sloj === "POD") sloj = Podsloj.Pod;
  let blnPronadjenSloj = false;
  if (sloj === Podsloj.TS10 && selektovaniWmsObjekat?.properties?.tip === "RP") {
    sloj = Podsloj.Rasklopiste10;
  }
  if (sloj === Podsloj.TS35 && selektovaniWmsObjekat?.properties?.tip === "RP") {
    sloj = Podsloj.Rasklopiste35;
  }
  for (i = 0; i < document.querySelector("#ddl_sloj_podataka").options.length; i++) {
    console.log(document.querySelector("#ddl_sloj_podataka").options[i].value);
    if (document.querySelector("#ddl_sloj_podataka").options[i].value === sloj) {
      blnPronadjenSloj = true;
    }
  }

  sakrijSvaPoljaAtributDiv();
  if (sloj === "Stub 35KV" || sloj === Podsloj.Stub35) {
    odabraniLejerUnos = "stubovi";
    akcijaLejerNivo = NaponskiNivo.String35kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Stub35;
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Stub 10KV" || sloj === Podsloj.Stub10) {
    odabraniLejerUnos = "stubovi";
    akcijaLejerNivo = NaponskiNivo.String10kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Stub10;
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Stub 04KV" || sloj === Podsloj.Stub04) {
    odabraniLejerUnos = "stubovi";
    akcijaLejerNivo = NaponskiNivo.String04kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Stub04;
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Vod 35KV" || sloj === Podsloj.Vod35) {
    odabraniLejerUnos = "vodovi";
    akcijaLejerNivo = NaponskiNivo.String35kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Vod35;
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Vod 10KV" || sloj === Podsloj.Vod10) {
    odabraniLejerUnos = "vodovi";
    akcijaLejerNivo = NaponskiNivo.String10kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Vod10;
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Vod 04KV" || sloj === Podsloj.Vod04) {
    odabraniLejerUnos = "vodovi";
    akcijaLejerNivo = NaponskiNivo.String04kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Vod04;
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Trafostanica35x" || sloj === Podsloj.TS35) {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = NaponskiNivo.String35kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.TS35;
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === Podsloj.Rasklopiste35) {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = NaponskiNivo.String35kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Rasklopiste35;
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "Trafostanica1004" || sloj === Podsloj.TS10) {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = NaponskiNivo.String10kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.TS10;
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === Podsloj.Rasklopiste10) {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = NaponskiNivo.String10kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Rasklopiste10;
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "Trafostanica110x" || sloj === Podsloj.TS110) {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = NaponskiNivo.String110kV;
    document.querySelector("#napon").value = akcijaLejerNivo;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.TS110;
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "NKRO" || sloj === Podsloj.Nkro) {
    odabraniLejerUnos = "nkro";
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Nkro;
    prikaziAtributDivNkro();
  } else if (sloj === "Priključno mjesto" || sloj === Podsloj.PrikljucnoMjesto) {
    odabraniLejerUnos = "prikljucno_mjesto";
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.PrikljucnoMjesto;
    prikaziAtributDivPrikljucnoMjesto();
    //TODO: Izbrisati potrošač iz if uslova, predavao se iz selekcijaMapa.js prikazPodatakaIzGpxTacaka()
  } else if (sloj === "Potrošač" || sloj === Podsloj.Potrosac) {
    odabraniLejerUnos = "potrosaci";
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Potrosac;
    prikaziAtributDivPotrosac();
  } else if (sloj === "Solari" || sloj === Podsloj.Solari) {
    odabraniLejerUnos = "solari";
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Solari;
    prikaziAtributDivSolari();
  } else if (sloj === "POD" || sloj === Podsloj.Pod) {
    odabraniLejerUnos = "pod";
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Pod;
    prikaziAtributDivPod();
  } else if (sloj === Podsloj.NelegalniPotrosac) {
    odabraniLejerUnos = Podsloj.NelegalniPotrosac;
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.NelegalniPotrosac;
    prikaziAtributDivNelegalniPotrosac();
  } else if (sloj === Podsloj.PoslovniObjekat) {
    odabraniLejerUnos = Podsloj.PoslovniObjekat;
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.PoslovniObjekat;
    prikaziAtributDivPoslovniObjekti();
  } else if (sloj === Podsloj.Odbijeni) {
    odabraniLejerUnos = Podsloj.Odbijeni;
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.Odbijeni;
    prikaziAtributDivOdbijeni();
  } else if (sloj === Podsloj.PrikljucnaKonzola || sloj === "prikljucna_konzola") {
    odabraniLejerUnos = Podsloj.PrikljucnaKonzola;
    document.querySelector("#napon").value = filePowerLevel;
    document.querySelector("#ddl_sloj_podataka").value = Podsloj.PrikljucnaKonzola;
    prikaziAtributDivPrikljucnaKonzola();
  }

  if (blnShowAttribute) {
    console.log("Akcija atributi", akcija);
    console.log("PRikaz 6", odabirSaMape);
    blnShowAttribute && showDiv("#atributiDiv");
    if (!blnPronadjenSloj) {
      poruka(StatusPoruke.Upozorenje, UnosPoruke.NePripadaNivou);
    }
  }
  console.log("akcijaLejerNivo", akcijaLejerNivo);
}

function noviStub35() {
  prikazPanelaAtributa(Podsloj.Stub35);
}
function noviStub10() {
  prikazPanelaAtributa(Podsloj.Stub10);
}
function noviStub04() {
  prikazPanelaAtributa(Podsloj.Stub04);
}
function noviVod35() {
  prikazPanelaAtributa(Podsloj.Vod35);
}
function noviVod10() {
  prikazPanelaAtributa(Podsloj.Vod10);
}
function noviVod04() {
  prikazPanelaAtributa(Podsloj.Vod04);
}
function novaTrafostanica35x() {
  prikazPanelaAtributa(Podsloj.TS35);
}
function novaTrafostanica1004() {
  prikazPanelaAtributa(Podsloj.TS10);
}
function novaTrafostanica110x() {
  prikazPanelaAtributa(Podsloj.TS110);
}
function noviNkro() {
  prikazPanelaAtributa(Podsloj.Nkro);
}
function novoPrikljucnoMjesto() {
  prikazPanelaAtributa(Podsloj.PrikljucnoMjesto);
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
document.querySelector("#potvrda").addEventListener("click", finalnaPotvrdaUnosa);
// document.querySelector("#restart").addEventListener("click", restart);
// document.querySelector("#podloga_osm").addEventListener("click", osmPodloga);
// document.querySelector("#podloga_satelit").addEventListener("click", satelitPodloga);
// document.querySelector("#podloga_ortofoto").addEventListener("click", ortofotoPodloga);
// document.querySelector("#podloga_bez").addEventListener("click", bezPodloga);
document.querySelector("#shp").addEventListener("click", shpDownload);
document.querySelector("#kml").addEventListener("click", kmlDownload);
document.querySelector("#excel").addEventListener("click", excelDownload);

function closeAllDivs() {
  closeDiv("#odabirCvorovaVodaDiv");
  closeDiv("#odabirObjektaZaPomjeranjeDiv");
  closeDiv("#atributiDiv");
  closeDiv('#pretragaDiv');
  closeModalLeft();
  document.querySelector("#vodDodvanjeObjektaBtn").className = "";
  document.querySelector("#vodPomjeranjeObjektaBtn").className = "";
  document.querySelector("#vodProduzenjeKrakaBtn").className = "";
  document.querySelector("#izmjenaVodaDiv").className = "";
}

document.querySelector("#vodDodvanjeObjektaBtn").addEventListener("click", function () {
  closeAllDivs();
  showDiv("#odabirCvorovaVodaDiv");
  document.querySelector("#vodDodvanjeObjektaBtn").className = "active";
  document.querySelector("#izmjenaVodaDiv").className = "active";
});
document.querySelector("#vodPomjeranjeObjektaBtn").addEventListener("click", function () {
  closeAllDivs();
  showDiv("#odabirObjektaZaPomjeranjeDiv");
  document.querySelector("#vodPomjeranjeObjektaBtn").className = "active";
  document.querySelector("#izmjenaVodaDiv").className = "active";
});
document.querySelector("#vodProduzenjeKrakaBtn").addEventListener("click", function () {
  closeAllDivs();
  map.on("singleclick", vodEditGeometrije);
  document.querySelector("#vodProduzenjeKrakaBtn").className = "active";
  document.querySelector("#izmjenaVodaDiv").className = "active";
  document.querySelector("#btnPotvrdiProduzenjeKraka").style.display = "none";
  document.querySelector("#produzenjeVodaPoruka").style.display = "block";
});
document.querySelector("#ddl_sloj_podataka").addEventListener("click", ddlLejerChange);
document.querySelector("#btnPrethodniObjekat").addEventListener("click", prethodniObjekatGpx);
document.querySelector("#btnSljedeciObjekat").addEventListener("click", sljedeciObjekatGpx);

//Akcije za povezivanje voda sa početnom i krajnjom tačkom
document.querySelector("#btnPotvrdiPoveznica").addEventListener("click", potvrdaUnosaVoda);
document.querySelector("#btnPocetnaTackaPoveznica").addEventListener("click", odabirPocetneTackeVoda);
document.querySelector("#btnKrajnjaTackaPoveznica").addEventListener("click", odabirKrajnjeTackeVoda);

document.querySelector("#btnPotvrdiKmlPoveznicu").addEventListener("click", saveKmlConnection);

document.querySelector("#btnMapaOdabirPoveznice").addEventListener("click", odabirPocetnePoveznice);
document.querySelector("#btnOdabirNapojneTrafostanice").addEventListener("click", odabirNapojneTrafostaniceUnos);
document.querySelector("#btnPotvrdiNapojnuTrafostanicu").addEventListener("click", potvrdaNapojneTrafostaniceUnos);
document.querySelector("#txtSifraNapojneTrafostanice").addEventListener("input", promjenaSifreNapojneTrafostanice);

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
  if (
    !document.querySelector("#chkUnosPocetnePoveznice").checked &&
    !document.querySelector("#ddlPocetnaPoveznica").value
  ) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabratiPoveznicu);
    return false;
  }
  if (izvod === "") {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabratiIzvodTS);
    return false;
  }

  if (!document.querySelector("#chkUnosPocetnePoveznice").checked) {
    globalPocetnaPoveznica = document.querySelector("#ddlPocetnaPoveznica").value;
  }

  selektovaniWmsObjekat = null;
  sifraNapojneTrafostanice = document.querySelector("#txtSifraNapojneTrafostanice").value;
  nazivNapojneTrafostanice = document.querySelector("#txtNazivNapojneTrafostanice").value;
  izvodNapojneTrafostanice = izvod;
  document.querySelector("#sifra_napojne").value = sifraNapojneTrafostanice;
  document.querySelector("#naziv_napojne").value = nazivNapojneTrafostanice;
  document.querySelector("#izvod_napojne").value = izvodNapojneTrafostanice;
  closeDiv("#odabirNapojneTrafostaniceDiv");
  poruka(StatusPoruke.Uspjeh, UnosPoruke.OdabranIzvodTS);
  isprazniVrijednostiPoljaTrafostanice();
  enableMenija();
  readRadius();
  if (!isEditable) {
    //TODO: Vratiti
    //showConnectForm();
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
  let pocetnaDiv = document.querySelector("#topNav");
  if (pocetnaDiv) {
    pocetnaDiv.style.opacity = "0.3";
  }
  let leftSideMenu = document.getElementsByClassName("left-side-menu");
  if(leftSideMenu) {
    leftSideMenu[0].style.opacity = "0.3";
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
  document.querySelector("#handButton").style.cursor = "not-allowed";
  document.querySelector("#handButton").style.pointerEvents = "none";
  document.querySelector("#layerMenu").style.cursor = "not-allowed";
  document.querySelector("#layerMenu").style.pointerEvents = "none";
  document.querySelector("#dodajMenu").style.cursor = "not-allowed";
  document.querySelector("#dodajMenu").style.pointerEvents = "none";
  document.querySelector("#potvrdaMenu").style.cursor = "not-allowed";
  document.querySelector("#potvrdaMenu").style.pointerEvents = "none";

  let sideMenu = document.querySelector("#side-menu").getElementsByTagName("li");
  for (let i = 0; i < sideMenu.length; i++) {
    sideMenu[i].style.cursor = "not-allowed";
    sideMenu[i].style.pointerEvents = "none";
  }
}

function enableMenija() {
  let pocetnaDiv = document.querySelector("#topNav");
  if (pocetnaDiv) {
    pocetnaDiv.style.opacity = "1";
  }

  let leftSideMenu = document.getElementsByClassName("left-side-menu");
  if(leftSideMenu) {
    leftSideMenu[0].style.opacity = "1";
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
  document.querySelector("#handButton").style.cursor = "pointer";
  document.querySelector("#handButton").style.pointerEvents = "all";
  document.querySelector("#layerMenu").style.cursor = "pointer";
  document.querySelector("#layerMenu").style.pointerEvents = "all";
  document.querySelector("#dodajMenu").style.cursor = "pointer";
  document.querySelector("#dodajMenu").style.pointerEvents = "all";
  document.querySelector("#potvrdaMenu").style.cursor = "pointer";
  document.querySelector("#potvrdaMenu").style.pointerEvents = "all";

  let sideMenu = document.querySelector("#side-menu").getElementsByTagName("li");
  for (let i = 0; i < sideMenu.length; i++) {
    sideMenu[i].style.cursor = "pointer";
    sideMenu[i].style.pointerEvents = "all";
  }
}

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
document.querySelector("#chkShowGpsFields").addEventListener("click", showGpsFields);

/**
 * Metoda koja prikazuje/skriva polja za odabir početne poveznice, na formi za odavir napojne TS i izvoda.
 */
function prikazPoljaPoveznice() {
  document
    .querySelector("#chkUnosPocetnePoveznice")
    .setAttribute("checked", !document.querySelector("#chkUnosPocetnePoveznice").checked);
  if (document.querySelector("#chkUnosPocetnePoveznice").checked) {
    document.querySelector("#btnMapaOdabirPoveznice").style.display = "none";
    document.querySelector("#ddlPocetnaPoveznica").style.display = "none";
  } else {
    document.querySelector("#btnMapaOdabirPoveznice").style.display = "inherit";
    document.querySelector("#ddlPocetnaPoveznica").style.display = "inherit";
  }
}
document.querySelector("#chkUnosPocetnePoveznice").addEventListener("click", prikazPoljaPoveznice);

document.querySelector("#pregled").addEventListener("click", clickOnInformation);
function clickOnInformation(){
document.querySelector("#pregled").className = "active";
akcija = "information";
document.querySelector("#right-bar-modal-attribute").style.right = "0px";
document.querySelector("#right-bar-modal").style.right = "-650px";
document.querySelector("#drawButton").className = "";
}

document.querySelector("#nextStatistic").addEventListener("click", nextStatistic);

/**
 * Metoda koja prikazuje wizzard za brisanje više objekata
 */
document.querySelector("#brisanjeViseObjekata").addEventListener("click",clickOnDeleteMultipleFeatures )
function clickOnDeleteMultipleFeatures(){
  statisticDraw = true;
  document.querySelector("#navDelete").style.display = "block";
  closeModal();
  document.querySelector("#right-bar-modal").style.right = "0";
}

function statisticMap() {
  document.querySelector("#tab-content-statistic").style.display = "none";
  document.querySelector("#progressBarStatistic").style.width = "50.00%";
}

function statisticData() {
  closeModal();
  document.querySelector("#tab-content-statistic").style.display = "block";
  document.querySelector("#progressBarStatistic").style.width = "100%";
}

function closeStatisticReport(){
  document.querySelector("#navDelete").style.display = "none";
  closeModal();
}

function nextStatistic(){
  let lejer = document.querySelector("#brisanjeLejer").value;
  let tekstFiltera = "INTERSECTS(Geometry," + drawGeom + ") ";
  let nazivLejera = "geonode:" + lejer;
  $.ajax({
    method: "POST",
    url: wfsUrl,
    data: {
      access_token: geoserverToken,
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: nazivLejera,
      outputFormat: "application/json",
      srsname: "EPSG:4326",
      CQL_FILTER: tekstFiltera,
    },
    success: function (response) {
      let features = response.features;
      if(features && features.length == 0){
        Swal.fire({
          icon: "error",
          title: "Obavještenje",
          text: "Objekti koje ste izabrali nisu selektovani.",
        });
        return false;
      }
      //Provjeravamo ima li pravo za brisanje svih featura
      for(let i=0;i< features.length;i++){
        if (!provjeraPravaUnosIzmjena(globalUsername, globalVlasnik, features[i].properties.vlasnik)) {
          return false;
        }
      }
      // Dodajemo objekat za brisanje
      for(let i=0;i< features.length;i++){
        dodajObjekatZaBrisanje(features[i]);
      }
      document.querySelector("#navDelete").style.display = "none";
      featureLineOverlay.getSource().clear();
      featurePointOverlay.getSource().clear();
      featurePolygonOverlay.getSource().clear();
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}