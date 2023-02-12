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
  }

  if (blnShowAttribute) {
    console.log("Akcija atributi", akcija);
    console.log("PRikaz 6", odabirSaMape);
    blnShowAttribute && showDiv("#atributiDiv");
  }
  if (!blnPronadjenSloj) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.NePripadaNivou);
    console.log("NIJE PRONAĐEN LEJER");
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
    poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabratiIzvodTS);
    return false;
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
