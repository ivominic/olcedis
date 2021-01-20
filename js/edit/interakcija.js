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

/**Povezivanje kontrola sa akcijama */
document.querySelector("#pan").addEventListener("click", pan);
document.querySelector("#dodaj").addEventListener("click", dodaj);
document.querySelector("#izmijeni").addEventListener("click", izmijeni);
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
