/** Prikazuje sliku za odabrani objekat u modalnom prozoru */
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
  vectorSource && vectorSource.clear();
}

/** Akcija promjene ikonice u navbaru */
function setujAktivnu(element) {
  if (nacrtan || modifikovan) {
    poruka(
      "Upozorenje",
      "Nije moguće promijeniti aktivnost dok ne poništite crtanje nove ili izmjenu postojeće geometrije."
    );
    return false;
  }
  let els = document.querySelectorAll(".active");
  for (let i = 0; i < els.length; i++) {
    els[i].classList.remove("active");
  }
  document.querySelector(element).classList.add("active");
  closeDiv("#pretragaDiv");
  closeDiv("#atributiDiv");
  if (element === "#atributi" || element === "#dodaj") {
    //if (element === "#atributi") {
    console.log("PRikaz 3");
    showDiv("#atributiDiv");
  }
  if (element === "#pretraga") {
    showDiv("#pretragaDiv");
  }
  podesiInterakciju();
  zatvoriHamburger();
}

function closeDiv(nazivDiva) {
  document.querySelector(nazivDiva).style.width = "0";
  if (blnShowAttribute && nazivDiva === "#atributiDiv") {
    blnShowAttribute = false;
  }
}

function showDiv(nazivDiva) {
  if (screen.width < 700) {
    document.querySelector(nazivDiva).style.width = "270px";
  } else {
    document.querySelector(nazivDiva).style.width = "500px";
  }
}

/**Prenosivi sidenav */
var windows = document.querySelectorAll(".draggable");
[].forEach.call(windows, function (win) {
  let title = win.querySelector(".titleAndClose");
  title.addEventListener(
    "mousedown",
    function (evt) {
      let real = window.getComputedStyle(win),
        winX = parseFloat(real.left),
        winY = parseFloat(real.top);
      let mX = evt.clientX,
        mY = evt.clientY;
      document.body.addEventListener("mousemove", drag, false);
      document.body.addEventListener(
        "mouseup",
        function () {
          document.body.removeEventListener("mousemove", drag, false);
        },
        false
      );
      function drag(evt) {
        win.style.left = winX + evt.clientX - mX + "px";
        win.style.top = winY + evt.clientY - mY + "px";
        if (winY + evt.clientY - mY < 60) {
          win.style.left = winX + evt.clientX - mX + "px";
          win.style.top = 60 + "px";
        }
      }
    },
    false
  );
});

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

/**Povezivanje kontrola sa akcijama */
document.querySelector("#pan").addEventListener("click", pan);
document.querySelector("#marker").addEventListener("click", crtajTacku);
document.querySelector("#linija").addEventListener("click", crtajLiniju);
document.querySelector("#poligon").addEventListener("click", crtajPoligon);
document.querySelector("#brisanje").addEventListener("click", brisanje);
document.querySelector("#pretraga").addEventListener("click", pretraga);
document.querySelector("#restart").addEventListener("click", restart);
document.querySelector("#podloga_osm").addEventListener("click", osmPodloga);
document.querySelector("#podloga_satelit").addEventListener("click", satelitPodloga);
document.querySelector("#podloga_ortofoto").addEventListener("click", ortofotoPodloga);
//document.querySelector("#podloga_bez").addEventListener("click", bezPodloga);
//Ovo otkomentarisati za snap

document.querySelector("#confirmPotvrdi").addEventListener("click", confirmPotvrdi);
document.querySelector("#confirmOdustani").addEventListener("click", confirmOdustani);

let blnPocetniStub = false,
  blnZavrsniStub = false;
/**Metoda koja bira prvi stub voda */
function selekcijaPocetnogStuba() {
  akcija = "pocetniStub";
  setujAktivnu("#selekcijaPocetnogStuba");
  if (blnZavrsniStub) {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.OdabratiZavrsniStub);
  } else {
    poruka(StatusPoruke.Uspjeh, WizardPoruke.PocetniStubVodaUvoz);
    blnPocetniStub = true;
  }
}

/**Metoda koja bira prvi stub */
function selekcijaZavrsnogStuba() {
  akcija = "zavrsniStub";
  setujAktivnu("#selekcijaZavrsnogStuba");
  if (blnPocetniStub) {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.OdabratiPocetniStub);
  } else {
    poruka(StatusPoruke.Uspjeh, WizardPoruke.ZavrsniStubVodaUvoz);
    blnZavrsniStub = true;
  }
}

/**Paljenje i gašenje lejera */
document.querySelector("#lejer_stubovi").addEventListener("click", prikazLejeraStubovi);
document.querySelector("#lejer_vodovi").addEventListener("click", prikazLejeraVodovi);
document.querySelector("#lejer_trafostanice").addEventListener("click", prikazLejeraTrafostanice);
document.querySelector("#lejer_prikljucno_mjesto").addEventListener("click", prikazLejeraPrikljucnoMjesto);
document.querySelector("#lejer_nkro").addEventListener("click", prikazLejeraNkro);
document.querySelector("#lejer_potrosac").addEventListener("click", prikazLejeraPotrosac);
//document.querySelector("#lejer_nelegalni_potrosac").addEventListener("click", prikazLejeraNelegalniPotrosac);
document.querySelector("#lejer_pod").addEventListener("click", prikazLejeraPod);
//document.querySelector("#lejer_validations").addEventListener("click", prikazLejeraValidations);

function prikazLejeraStubovi() {
  wmsStubovi.setVisible(!wmsStubovi.getVisible());
  zatvoriHamburger();
}

function prikazLejeraVodovi() {
  wmsVodovi.setVisible(!wmsVodovi.getVisible());
  zatvoriHamburger();
}

function prikazLejeraTrafostanice() {
  wmsTrafostanice.setVisible(!wmsTrafostanice.getVisible());
  zatvoriHamburger();
}
function prikazLejeraTrafostanicePoligoni() {
  wmsTrafostanicePoligoni.setVisible(!wmsTrafostanicePoligoni.getVisible());
  zatvoriHamburger();
}

function prikazLejeraPrikljucnoMjesto() {
  wmsPrikljucnoMjesto.setVisible(!wmsPrikljucnoMjesto.getVisible());
  zatvoriHamburger();
}

function prikazLejeraNkro() {
  wmsNKRO.setVisible(!wmsNKRO.getVisible());
  zatvoriHamburger();
}

function prikazLejeraPotrosac() {
  wmsPotrosaci.setVisible(!wmsPotrosaci.getVisible());
  zatvoriHamburger();
}

function prikazLejeraNelegalniPotrosac() {
  wmsNelegalniPotrosaci.setVisible(!wmsNelegalniPotrosaci.getVisible());
  zatvoriHamburger();
}

function prikazLejeraPod() {
  wmsPOD.setVisible(!wmsPOD.getVisible());
  zatvoriHamburger();
}

function prikazLejeraValidations() {
  wmsValidations.setVisible(!wmsValidations.getVisible());
  zatvoriHamburger();
}
