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
    akcijaLejerNivo = "35";
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Stub 10KV") {
    akcijaLejerNivo = "10";
    prikaziAtributDivStubove(akcijaLejerNivo);
  } else if (sloj === "Vod 35KV") {
    akcijaLejerNivo = "35";
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Vod 10KV") {
    akcijaLejerNivo = "10";
    prikaziAtributDivVodove(akcijaLejerNivo);
  } else if (sloj === "Trafostanica 35KV") {
    akcijaLejerNivo = "35";
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "Trafostanica 10KV") {
    akcijaLejerNivo = "10";
    prikaziAtributDivTrafostanice(akcijaLejerNivo);
  } else if (sloj === "NKRO") {
    prikaziAtributDivNkro();
  } else if (sloj === "Priključno mjesto") {
    prikaziAtributDivPrikljucnoMjesto();
  } else if (sloj === "Potrošač") {
  } else if (sloj === "POD") {
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
function noviVod35() {
  prikazPanelaAtributa("Vod 35KV");
}
function noviVod10() {
  prikazPanelaAtributa("Vod 10KV");
}
function novaTrafostanica35() {
  prikazPanelaAtributa("Trafostanica 35KV");
}
function novaTrafostanica10() {
  prikazPanelaAtributa("Trafostanica 10KV");
}
function noviNkro() {
  prikazPanelaAtributa("NKRO");
}
function novoPrikljucnoMjesto() {
  prikazPanelaAtributa("Priključno mjesto");
}

/**Povezivanje kontrola sa akcijama */
document.querySelector("#pan").addEventListener("click", pan);
//document.querySelector("#dodaj").addEventListener("click", dodaj);
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
document.querySelector("#restart").addEventListener("click", restart);
document.querySelector("#podloga_osm").addEventListener("click", osmPodloga);
document.querySelector("#podloga_satelit").addEventListener("click", satelitPodloga);
document.querySelector("#shp").addEventListener("click", shpDownload);
document.querySelector("#kml").addEventListener("click", kmlDownload);
document.querySelector("#excel").addEventListener("click", excelDownload);

document.querySelector("#noviStub35").addEventListener("click", noviStub35);
document.querySelector("#noviStub10Kv").addEventListener("click", noviStub10);
document.querySelector("#noviVod35").addEventListener("click", noviVod35);
document.querySelector("#noviVod10Kv").addEventListener("click", noviVod10);
document.querySelector("#novaTrafostanica35").addEventListener("click", novaTrafostanica35);
document.querySelector("#novaTrafostanica10Kv").addEventListener("click", novaTrafostanica10);
document.querySelector("#noviNKRO").addEventListener("click", noviNkro);
document.querySelector("#novoPrikljucnoMjesto").addEventListener("click", novoPrikljucnoMjesto);

document.querySelector("#editStub35").addEventListener("click", noviStub35);
document.querySelector("#editStub10Kv").addEventListener("click", noviStub10);
document.querySelector("#editVod35").addEventListener("click", noviVod35);
document.querySelector("#editVod10Kv").addEventListener("click", noviVod10);
document.querySelector("#editTrafostanica35").addEventListener("click", novaTrafostanica35);
document.querySelector("#editTrafostanica10Kv").addEventListener("click", novaTrafostanica10);
document.querySelector("#editNKRO").addEventListener("click", noviNkro);
document.querySelector("#editPrikljucnoMjesto").addEventListener("click", novoPrikljucnoMjesto);
