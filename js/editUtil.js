/** Vraća well known tekst reprezentaciju geometrije za predati feature.
 * Ukoliko feature ima Geometry property, nema getGeometry funkciju. */
function wktGeometrije(feature) {
  let format = new ol.format.WKT();
  let geom = feature.Geometry;
  if (!geom) {
    geom = feature.getGeometry();
    console.log("editUtil.js wktGeometrije geom", geom);
    let wktgeom = format.writeGeometry(geom);
    console.log("wkt geom", wktgeom);
    return wktgeom;
  } else {
    return geom;
  }
}

/**Kreiranje vektorskih lejera za snaponvanje */
function kreirajVektorLejerZaSnap(olCollection) {
  return new ol.layer.Vector({
    source: new ol.source.Vector({
      features: olCollection,
    }),
    style: vectorStyleSnap,
  });
}

/**Kreiranje vektorskih lejera za crtanje i kreiranje nove geometrije ili edit postojeće (point, linestring, polygon, new i edit) */
function kreirajVektorLejerZaCrtanje(olCollection) {
  return new ol.layer.Vector({
    source: new ol.source.Vector({
      features: olCollection,
    }),
    style: vectorStyle,
  });
}
/**Definisanje vektor lejera za crtanje figura i kreiranje i izmjenu tekuće geometrije */
let featuresPoint = new ol.Collection(),
  featuresLine = new ol.Collection(),
  featuresPolygon = new ol.Collection(),
  featuresSnap = new ol.Collection();
featuresTekuci = new ol.Collection();
let featurePointOverlay = kreirajVektorLejerZaCrtanje(featuresPoint),
  featureLineOverlay = kreirajVektorLejerZaCrtanje(featuresLine),
  featurePolygonOverlay = kreirajVektorLejerZaCrtanje(featuresPolygon),
  featureSnapOverlay = kreirajVektorLejerZaSnap(featuresSnap),
  featureTekuciOverlay = kreirajVektorLejerZaCrtanje(featuresTekuci);
featureLineOverlay.getSource().on("addfeature", (evt) => linije.push(wktGeometrije(evt.feature)));
featurePointOverlay.getSource().on("addfeature", (evt) => tacke.push(wktGeometrije(evt.feature)));
featurePolygonOverlay.getSource().on("addfeature", (evt) => poligoni.push(wktGeometrije(evt.feature)));

/** Klikom na modalnu sliku, otvara novi tab sa istom slikom */
document.querySelector("#imgModal").onclick = function () {
  //window.open(slikaUrl, "_blank");
  window.open(slikeUrl[slikeIndex], "_blank");
};

/** Podešava vrijednost ddl liste */
function setujDdlVrijednost(ddl, vrijednost) {
  for (let i = 0; i < document.querySelector(ddl).length; i++) {
    document.querySelector(ddl).options[i].text === vrijednost &&
      (document.querySelector(ddl).options[i].selected = true);
  }
}

/** Sljedeća ili prethodna slika, zavisno je li n=1 ili n=-1*/
function prikaziSliku(n) {
  slikeIndex += n;
  slikeIndex < 0 && (slikeIndex = slikeUrl.length - 1);
  slikeIndex >= slikeUrl.length && (slikeIndex = 0);
  document.querySelector("#imgModal").src = slikeUrl[slikeIndex];
}

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

/**Funkcija koja prolazi kroz nizove tačaka, linija i polgiona i kreira CQL uslov u zavisnosti od odabranih opcija */
function kreiranjeCqlFilteraProstorno() {
  let retVal = "";
  let pretragaTacka = document.querySelector("#pretragaTacke").checked;
  let pretragaTackaUdaljenost = document.querySelector("#pretragaTackeUdaljenost").value;
  let pretragaLinije = document.querySelector("#pretragaLinije").checked;
  let pretragaPoligonObuhvata = document.querySelector("#pretragaPoligonObuhvata").checked;
  let pretragaPoligonPresijeca = document.querySelector("#pretragaPoligonPresijeca").checked;
  if (pretragaTacka && pretragaTackaUdaljenost === "") {
    poruka(
      "Upozorenje",
      "Potrebno je unijeti udaljenost od iscrtanih tačaka na kojoj će se prikazivati objekti iz sloja koji se pretražuje."
    );
    return false;
  }
  if (pretragaTacka && tacke.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati bar jednu tačku za pretragu objekata po udaljenosti.");
    return false;
  }
  if (pretragaLinije && linije.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati bar jednu liiju za pretragu objekata koje linija presijeca.");
    return false;
  }
  if ((pretragaPoligonPresijeca || pretragaPoligonObuhvata) && poligoni.length === 0) {
    poruka(
      "Upozorenje",
      "Potrebno je nacrtati bar jedan poligon za pretragu objekata koje poligon presijeca ili obuhvata."
    );
    return false;
  }

  pretragaTacka &&
    tacke.forEach((item) => {
      if (retVal === "") {
        retVal = "DWITHIN(Geometry," + item + "," + pretragaTackaUdaljenost + ",meters) ";
      } else {
        retVal += " OR DWITHIN(Geometry," + item + "," + pretragaTackaUdaljenost + ",meters) ";
      }
    });

  pretragaLinije &&
    linije.forEach((item) => {
      if (retVal === "") {
        retVal = "INTERSECTS(Geometry," + item + ") ";
      } else {
        retVal += " OR INTERSECTS(Geometry," + item + ") ";
      }
    });

  (pretragaPoligonObuhvata || pretragaPoligonPresijeca) &&
    poligoni.forEach((item) => {
      if (retVal === "") {
        if (pretragaPoligonPresijeca) {
          retVal = "INTERSECTS(Geometry," + item + ") ";
        } else {
          retVal = "WITHIN(Geometry," + item + ") ";
        }
      } else {
        if (pretragaPoligonPresijeca) {
          retVal += " OR INTERSECTS(Geometry," + item + ") ";
        } else {
          retVal += " OR WITHIN(Geometry," + item + ") ";
        }
      }
    });

  return retVal;
}

/**Prikaz toast poruke. Od naslova zavisi boja, tj klasa koja se dodjeljuje */
function poruka(naslov, tekst) {
  if (naslov.toLowerCase().trim() === "uspjeh") {
    Swal.fire({
      //position: "top-end",
      icon: "success",
      title: tekst,
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: naslov,
      text: tekst,
    });
  }
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

/** Zatvara meni nakon odabira akcije, na malim ekranima */
function zatvoriHamburger() {
  let x = document.querySelector("#topNav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
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

/**Tri funkcije koje rade sa konfirm modalom - za potvrdu akcija/brisanja */
function confirmModal(naslov, text, funkcija) {
  document.querySelector("#modalConfirmHeader").innerHTML = naslov;
  document.querySelector("#modalConfirmText").innerHTML = text;
  document.querySelector("#modalConfirm").style.display = "block";
}

function confirmPotvrdi(funkcija) {
  document.querySelector("#modalConfirm").style.display = "none";
  brisanje();
}

function confirmOdustani() {
  document.querySelector("#modalConfirm").style.display = "none";
}

function openModalSpinner() {
  document.querySelector("#modalSpinner").style.display = "block";
  document.querySelector("#fadeSpinner").style.display = "block";
}

function closeModalSpinner() {
  document.querySelector("#modalSpinner").style.display = "none";
  document.querySelector("#fadeSpinner").style.display = "none";
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
document.querySelector("#podloga_bez").addEventListener("click", bezPodloga);
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
    poruka("Upozorenje", "Potrebno je odabrati završni stub.");
  } else {
    poruka("Uspjeh", "Odaberite početni stub voda koji želite da uvezete.");
    blnPocetniStub = true;
  }
}

/**Metoda koja bira prvi stub */
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

/**
 * Metoda koja popunjava zadati ddl vrijednostima atributa koje vrate servisi za predati objekat, naziv atributa i
 * @param {*} ddl - naziv select-a "#napon"
 * @param {*} objekat - stubovi, trafostanice, vodovi...
 * @param {*} atribut - napon, visina...
 * @param {*} key_param - dodatni parametar, ako postoji
 * @param {*} value_param - vrijednost dodatnog parametra, ako postoji
 */
function popuniDdlAtributima(ddl, objekat, atribut, key_param, value_param) {
  $(ddl).empty();
  let urlServisa =
    window.location.protocol +
    "//" +
    window.location.hostname +
    "/portal/services/_getObjectAttributes.php?objekat=" +
    objekat +
    "&atribut=" +
    atribut;
  if (key_param !== "" && value_param !== "") {
    urlServisa += "&" + key_param + "=" + value_param;
  }
  $(ddl).append(
    $("<option>", {
      value: "",
      text: "Izaberite vrijednost",
    })
  );
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      data.data.forEach(function (response) {
        response.vrijednosti.forEach(function (vrijednost) {
          $(ddl).append(
            $("<option>", {
              value: vrijednost,
              text: vrijednost,
            })
          );
        });
      });
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}

function prikaziVektor() {
  let tekstFiltera = "";
  poligoni.forEach((item) => {
    if (tekstFiltera === "") {
      tekstFiltera = "INTERSECTS(geom," + item + ") ";
    } else {
      tekstFiltera += " OR INTERSECTS(geom," + item + ") ";
    }
  });

  if (document.querySelector("#ddl_vektor").value === "") {
    poruka("Upozorenje", "Nije odabran sloj za prikaz.");
    return false;
  }
  if (tekstFiltera === "") {
    poruka("Upozorenje", "Nije kreiran nijedan poligon.");
    return false;
  }

  console.log("tekst filtera", tekstFiltera);
  tekstFiltera = "";

  //TODO: brisati poligone

  let nazivLejera = "geonode:" + document.querySelector("#ddl_vektor").value;

  $.ajax({
    method: "POST",
    url: wfsUrl,
    data: {
      service: "WFS",
      request: "GetFeature",
      typename: nazivLejera,
      outputFormat: "application/json",
      srsname: "EPSG:4326",
      CQL_FILTER: tekstFiltera,
    },
    success: function (response) {
      console.log(response);
      let features = new ol.format.GeoJSON().readFeatures(response);
      console.log("fičeri", features);
      featureSnapOverlay.getSource().clear(); //Ispraznimo prethodne zapise da bi imali samo jedan koji ćemo editovati
      featureSnapOverlay.getSource().addFeatures(features);
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/**Paljenje i gašenje lejera */
document.querySelector("#lejer_stubovi").addEventListener("click", prikazLejeraStubovi);
document.querySelector("#lejer_vodovi").addEventListener("click", prikazLejeraVodovi);
document.querySelector("#lejer_trafostanice").addEventListener("click", prikazLejeraTrafostanice);
document.querySelector("#lejer_trafostanice_poligoni").addEventListener("click", prikazLejeraTrafostanice);
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
