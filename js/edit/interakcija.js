/**Metode koje služe za interakciju sa kontrolama na mapi */

/** Funkcije za rad sa navigacionim barom*/
function pan() {
  akcija = "pan";
  setujAktivnu("#pan");
}

function dodaj() {
  akcija = "dodaj";
  setujAktivnu("#dodaj");
}

function izmijeni() {
  akcija = "izmijeni";
  setujAktivnu("#izmijeni");
}

function atributi() {
  akcija = "atributi";
  setujAktivnu("#atributi");
}

function pretraga() {
  akcija = "pretraga";
  setujAktivnu("#pretraga");
}

function restart() {
  location.reload(true);
}

function slika() {
  slikeIndex = 0;
  slikeUrl = [];
  akcija = "slika";
  setujAktivnu("#slika");
  showDiv("#odabirPoveznicaDiv");
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

function prikazPanelaAtributa(sloj) {
  sakrijSvaPoljaAtributDiv();
  if (sloj === "Stub 35KV") {
    odabraniLejerUnos = "stubovi";
    akcijaLejerNivo = "35";
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Stub 10KV") {
    odabraniLejerUnos = "stubovi";
    akcijaLejerNivo = "10";
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Stub 04KV") {
    odabraniLejerUnos = "stubovi";
    akcijaLejerNivo = "0.4";
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Vod 35KV") {
    odabraniLejerUnos = "vodovi";
    akcijaLejerNivo = "35";
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Vod 10KV") {
    odabraniLejerUnos = "vodovi";
    akcijaLejerNivo = "10";
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Vod 04KV") {
    odabraniLejerUnos = "vodovi";
    akcijaLejerNivo = "0.4";
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Trafostanica35x") {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = "35";
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "Trafostanica1004") {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = "10";
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "Trafostanica110x") {
    odabraniLejerUnos = "trafostanice";
    akcijaLejerNivo = "110";
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "NKRO") {
    odabraniLejerUnos = "nkro";
    prikaziAtributDivNkro();
  } else if (sloj === "Priključno mjesto") {
    odabraniLejerUnos = "prikljucno_mjesto";
    prikaziAtributDivPrikljucnoMjesto();
  } else if (sloj === "Potrošač") {
    odabraniLejerUnos = "potrosaci";
  } else if (sloj === "POD") {
    odabraniLejerUnos = "pod";
  }
  showDiv("#atributiDiv");
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
  let value = document.querySelector("#ddl_sloj_podataka").value;
  if (value === "stub04") {
    prikazPanelaAtributa("Stub 04KV");
  } else if (value === "stub10") {
    prikazPanelaAtributa("Stub 10KV");
  } else if (value === "stub04") {
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
  }
}

function finalnaPotvrdaUnosa() {
  //Pozivanje web servisa za finalni unos
  insertStubovaIzGpx();
  poruka("Uspjeh", "Završen unos podataka");

  console.log("Finalno features", gpxFeatures);
}

/**Povezivanje kontrola sa akcijama */
document.querySelector("#pan").addEventListener("click", pan);
document.querySelector("#dodaj").addEventListener("click", ddlLejerChange);
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
document.querySelector("#shp").addEventListener("click", shpDownload);
document.querySelector("#kml").addEventListener("click", kmlDownload);
document.querySelector("#excel").addEventListener("click", excelDownload);

/*document.querySelector("#noviStub35").addEventListener("click", noviStub35);
document.querySelector("#noviStub10Kv").addEventListener("click", noviStub10);
document.querySelector("#noviStub04Kv").addEventListener("click", noviStub04);
document.querySelector("#noviVod35").addEventListener("click", noviVod35);
document.querySelector("#noviVod10Kv").addEventListener("click", noviVod10);
document.querySelector("#noviVod04Kv").addEventListener("click", noviVod04);
document.querySelector("#novaTrafostanica35x").addEventListener("click", novaTrafostanica35x);
document.querySelector("#novaTrafostanica110x").addEventListener("click", novaTrafostanica110x);
document.querySelector("#novaTrafostanica1004").addEventListener("click", novaTrafostanica1004);
document.querySelector("#noviNKRO").addEventListener("click", noviNkro);
document.querySelector("#novoPrikljucnoMjesto").addEventListener("click", novoPrikljucnoMjesto);*/

document.querySelector("#editStub35").addEventListener("click", noviStub35);
document.querySelector("#editStub10Kv").addEventListener("click", noviStub10);
document.querySelector("#editVod35").addEventListener("click", noviVod35);
document.querySelector("#editVod10Kv").addEventListener("click", noviVod10);
document.querySelector("#editTrafostanica35").addEventListener("click", novaTrafostanica35x);
document.querySelector("#editTrafostanica10Kv").addEventListener("click", novaTrafostanica110x);
document.querySelector("#editNKRO").addEventListener("click", noviNkro);
document.querySelector("#editPrikljucnoMjesto").addEventListener("click", novoPrikljucnoMjesto);

document.querySelector("#ddl_sloj_podataka").addEventListener("click", ddlLejerChange);
