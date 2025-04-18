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
  closeDiv("#pretragaDiv");
  closeDiv("#atributiDiv");
  if (element === "#atributi" || element === "#dodaj") {
    //if (element === "#atributi") {
    console.log("PRikaz 5", odabirSaMape);
    !odabirSaMape && showDiv("#atributiDiv");
  }
  if (element === "#dodaj") {
    blnIsChange = false;
  }
  if (element === "#pretraga") {
    showDiv("#pretragaDiv");
  }
  podesiInterakciju();
  zatvoriHamburger();
  document.querySelector(element).classList.add("active");
}

function closeDiv(nazivDiva) {
  document.querySelector(nazivDiva).style.width = "0";
  if (blnShowAttribute && nazivDiva === "#atributiDiv") {
    blnShowAttribute = false;
  }
  if (nazivDiva === "#potvrdaProduzenjaKrakaDiv") {
    console.log("Na zatvaranje diva se isključuje mogućnost odabira voda sa mape.");
    odabirSaMape = false;
    map.un("singleclick", vodEditGeometrije);
    document.querySelector("#vodProduzenjeKrakaBtn").className = "";
    document.querySelector("#izmjenaVodaDiv").className = "";
  }
  if(document.querySelector("#atributi")){
    document.querySelector("#atributi").className = "";
  }
  if(document.querySelector("#pretragaMenu")){
    document.querySelector("#pretragaMenu").className = "";
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

/**Paljenje i gašenje lejera */
document.querySelector("#lejer_stubovi").addEventListener("click", prikazLejeraStubovi);
document.querySelector("#lejer_prikljucna_konzola").addEventListener("click", prikazLejeraPrikljucnaKonzola);
document.querySelector("#lejer_vodovi").addEventListener("click", prikazLejeraVodovi);
document.querySelector("#lejer_trafostanice").addEventListener("click", prikazLejeraTrafostanice);
document.querySelector("#lejer_trafostanice_poligoni").addEventListener("click", prikazLejeraTrafostanicePoligoni);
document.querySelector("#lejer_prikljucno_mjesto").addEventListener("click", prikazLejeraPrikljucnoMjesto);
document.querySelector("#lejer_nkro").addEventListener("click", prikazLejeraNkro);
document.querySelector("#lejer_potrosac").addEventListener("click", prikazLejeraPotrosac);
document.querySelector("#lejer_nelegalni_potrosac").addEventListener("click", prikazLejeraNelegalniPotrosac);
document.querySelector("#lejer_pod").addEventListener("click", prikazLejeraPod);
document.querySelector("#lejer_validations").addEventListener("click", prikazLejeraValidations);
document.querySelector("#lejer_poslovni_objekat").addEventListener("click", prikazLejeraPoslovniObjekat);
document.querySelector("#lejer_odbijeni").addEventListener("click", prikazLejeraOdbijeneValidacije);
document.querySelector("#lejer_solari").addEventListener("click", prikazLejeraSolari);

function prikazLejeraStubovi() {
  wmsStubovi.setVisible(!wmsStubovi.getVisible());
  zatvoriHamburger();
}

function prikazLejeraVodovi() {
  wmsVodovi.setVisible(!wmsVodovi.getVisible());
  zatvoriHamburger();
}


function prikazLejeraPrikljucnaKonzola(){
  wmsPrikljucnaKonzola.setVisible(!wmsPrikljucnaKonzola.getVisible());
  zatvoriHamburger();
}

function prikazLejeraTrafostanice() {
  wmsTrafostanice.setVisible(!wmsTrafostanice.getVisible());
  zatvoriHamburger();
}
function prikazLejeraTrafostanicePoligoni() {
  if(!wmsTrafostanicePoligoni.getVisible()){
    getGeoIds();
  } else {
    let params = wmsTrafostanice.getSource().getParams();
    params.CQL_FILTER = "INCLUDE";
    wmsTrafostanice.getSource().updateParams(params);
  }

  wmsTrafostanicePoligoni.setVisible(!wmsTrafostanicePoligoni.getVisible());
  zatvoriHamburger();
}

function getGeoIds() {
  $.ajax({
      url: wfsUrl,
      type: 'GET',
      dataType: 'json',
      data: {
          service: 'WFS',
          version: '1.0.0',
          request: 'GetFeature',
          typeName: 'geonode:trafostanice_poligoni',
          outputFormat: 'application/json'
      },
      success: function(response) {
        const geoIds = response.features.map(feature => feature.properties.fid_1);
        if (geoIds.length > 0) {
            const cqlFilter = `fid_1 IN (${geoIds.join(',')})`;
            let params = wmsTrafostanice.getSource().getParams();
            params.CQL_FILTER = cqlFilter;
            wmsTrafostanice.getSource().updateParams(params);
        }
      },
      error: function(xhr, status, error) {
          console.error("Error fetching geo_ids:", error);
      }
  });
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

function prikazLejeraPoslovniObjekat() {
  wmsPoslovniObjekti.setVisible(!wmsPoslovniObjekti.getVisible());
  zatvoriHamburger();
}

function prikazLejeraOdbijeneValidacije() {
  wmsOdbijeni.setVisible(!wmsOdbijeni.getVisible());
  zatvoriHamburger();
}

function prikazLejeraSolari() {
  wmsSolari.setVisible(!wmsSolari.getVisible());
  zatvoriHamburger();
}
