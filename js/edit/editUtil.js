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
    console.log("PRikaz 5", odabirSaMape);
    !odabirSaMape && showDiv("#atributiDiv");
  }
  if (element === "#pretraga") {
    showDiv("#pretragaDiv");
  }
  if (element === "#selekcijaPocetnogStuba") {
  }
  if (element === "#selekcijaZavrsnogStuba") {
  }
  if (element === "#dijeljenjeVoda") {
  }
  if (element === "#spajanjeVoda") {
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

document.querySelector("#confirmPotvrdi").addEventListener("click", confirmPotvrdi);
document.querySelector("#confirmOdustani").addEventListener("click", confirmOdustani);

let blnPocetniStub = false,
  blnZavrsniStub = false;
/**Metoda koja bira prvi stub voda */
function selekcijaPocetnogStuba() {
  akcija = "pocetniStub";
  setujAktivnu("#selekcijaPocetnogStuba");
  if (blnZavrsniStub) {
    poruka("Upozorenje", "Potrebno je odabrati završni stub.");
  } else {
    poruka("Uspjeh", "Odaberite početni stub voda koji želite da uvezete.");
    blnPocetniStub = true;
  }
}

/**Metoda koja bira krajnji stub */
function selekcijaZavrsnogStuba() {
  akcija = "zavrsniStub";
  setujAktivnu("#selekcijaZavrsnogStuba");
  if (blnPocetniStub) {
    poruka("Upozorenje", "Potrebno je odabrati početni stub.");
  } else {
    poruka("Uspjeh", "Odaberite završni stub voda koji želite da uvezete.");
    blnZavrsniStub = true;
  }
}

/**Paljenje i gašenje lejera */
document.querySelector("#lejer_stubovi").addEventListener("click", prikazLejeraStubovi);
document.querySelector("#lejer_vodovi").addEventListener("click", prikazLejeraVodovi);
document.querySelector("#lejer_trafostanice").addEventListener("click", prikazLejeraTrafostanice);
document.querySelector("#lejer_trafostanice_poligoni").addEventListener("click", prikazLejeraTrafostanicePoligoni);
document.querySelector("#lejer_prikljucno_mjesto").addEventListener("click", prikazLejeraPrikljucnoMjesto);
document.querySelector("#lejer_nkro").addEventListener("click", prikazLejeraNkro);
document.querySelector("#lejer_potrosac").addEventListener("click", prikazLejeraPotrosac);
document.querySelector("#lejer_nelegalni_potrosac").addEventListener("click", prikazLejeraNelegalniPotrosac);
document.querySelector("#lejer_pod").addEventListener("click", prikazLejeraPod);
document.querySelector("#lejer_validations").addEventListener("click", prikazLejeraValidations);

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
