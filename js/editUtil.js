/**Inicijalna deklaracija vrijednosti koje se korite u stranici*/
const domainUrl = location.origin;
//const domainUrl = "http://localhost:8088";
//const domainUrl = "http://167.172.171.249";
const wmsUrl = domainUrl + "/geoserver/geonode/wms";
const wfsUrl = domainUrl + "/geoserver/geonode/wfs";
const imageUrl = domainUrl + "/slike/";
const point = "Point",
  lineString = "LineString",
  polygon = "Polygon",
  tacke = [],
  linije = [],
  poligoni = [];
let draw,
  modify,
  cqlFilter = "",
  idObjekta = 0,
  akcija = "pan",
  slikaUrl = "",
  slikeUrl = [],
  slikeIndex = 0;
let geometrijaZaBazuWkt = "",
  nacrtan = false,
  modifikovan = false;

/**Definisanje podloga */
let osmBaseMap = new ol.layer.Tile({
  title: "Open Street Maps",
  source: new ol.source.OSM(),
});
let satelitBaseMap = new ol.layer.Tile({
  title: "Satelitski snimak",
  source: new ol.source.XYZ({
    url: "http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
    maxZoom: 23,
  }),
});

/**Stilizacija vektora */
var fill = new ol.style.Fill({
  color: "rgba(255,0,0,0.3)",
});
var stroke = new ol.style.Stroke({
  color: "#ff0000",
  width: 2,
});
var circle = new ol.style.Circle({
  radius: 7,
  fill: fill,
  stroke: stroke,
});
var vectorStyle = new ol.style.Style({
  fill: fill,
  stroke: stroke,
  image: circle,
});

/**Setovanje centra mape */
let center = ol.proj.transform([19.26, 42.56], "EPSG:4326", "EPSG:3857");
let view = new ol.View({
  center: center,
  zoom: 9,
});

/** Prikaz razmjernika na mapi*/
const razmjera = new ol.control.ScaleLine({
  target: document.querySelector("#razmjera"),
  units: "metric",
  bar: true,
  steps: 4,
  text: true,
  minWidth: 100
});

/** Vraća well known tekst reprezentaciju geometrije za predati feature */
function wktGeometrije(feature) {
  let format = new ol.format.WKT();
  return format.writeGeometry(feature.getGeometry(), {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  });
}

/**Kreiranje vektorskih lejera za snaponvanje */
function kreirajVektorLejerZaSnap(olCollection) {
  return new ol.layer.Vector({
    source: new ol.source.Vector({
      features: olCollection,
    }),
    style: vectorStyle,
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
  featuresSnap = new ol.Collection()
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
    document.querySelector(ddl).options[i].text === vrijednost && (document.querySelector(ddl).options[i].selected = true);
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

  if (idObjekta > 0) {
    let parametri = new FormData();
    parametri.append("id", idObjekta);
    let xhr = new XMLHttpRequest();
    xhr.open('POST', citajSlikeUrl, true);
    xhr.send(parametri);
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          let jsonResponse = JSON.parse(xhr.responseText);
          console.log(jsonResponse);
          if (jsonResponse["success"] === true && jsonResponse["data"].length > 0) {
            for (let i = 0; i < jsonResponse["data"].length; i++) {
              let tmpSlika = jsonResponse["data"][i].fotografija;
              tmpSlika.length && (tmpSlika = tmpSlika.substring(tmpSlika.lastIndexOf("/") + 1, tmpSlika.length));
              slikeUrl[i] = imageUrl + tmpSlika;
              console.log(i, slikeUrl[i]);
            }
            //akcija = "slika";
            document.querySelector("#modalFotografija").style.display = "block";
            prikaziSliku(0);
            document.querySelector("#naslovFotografija").innerHTML = opisSlike;

            document.querySelector("#zatvoriModalFotografija").onclick = function () {
              document.querySelector("#modalFotografija").style.display = "none";
            };
            //setujAktivnu("#slika"); //Da ne zatvara stranicu sa atributima
          }
        } else {
          poruka("Greska", xhr.statusText);
        }
      }
    };
  } else {
    poruka("Upozorenje", "Nije odabran objekat na mapi za koji želite da se prikaže fotografija.");
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

/**Funkcija koja prolazi kroz nizove tačaka, linija i polgiona i kreira CQL uslov u zavisnosti od odabranih opcija */
function kreiranjeCqlFilteraProstorno() {
  let retVal = "";
  let pretragaTacka = document.querySelector("#pretragaTacke").checked;
  let pretragaTackaUdaljenost = document.querySelector("#pretragaTackeUdaljenost").value;
  let pretragaLinije = document.querySelector("#pretragaLinije").checked;
  let pretragaPoligonObuhvata = document.querySelector("#pretragaPoligonObuhvata").checked;
  let pretragaPoligonPresijeca = document.querySelector("#pretragaPoligonPresijeca").checked;
  if (pretragaTacka && pretragaTackaUdaljenost === "") {
    poruka("Upozorenje", "Potrebno je unijeti udaljenost od iscrtanih tačaka na kojoj će se prikazivati objekti iz sloja koji se pretražuje.");
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
    poruka("Upozorenje", "Potrebno je nacrtati bar jedan poligon za pretragu objekata koje poligon presijeca ili obuhvata.");
    return false;
  }

  pretragaTacka &&
    tacke.forEach((item) => {
      if (retVal === "") {
        retVal = "DWITHIN(geom," + item + "," + pretragaTackaUdaljenost + ",meters) ";
      } else {
        retVal += " OR DWITHIN(geom," + item + "," + pretragaTackaUdaljenost + ",meters) ";
      }
    });

  pretragaLinije &&
    linije.forEach((item) => {
      if (retVal === "") {
        retVal = "INTERSECTS(geom," + item + ") ";
      } else {
        retVal += " OR INTERSECTS(geom," + item + ") ";
      }
    });

  (pretragaPoligonObuhvata || pretragaPoligonPresijeca) &&
  poligoni.forEach((item) => {
    if (retVal === "") {
      if (pretragaPoligonPresijeca) {
        retVal = "INTERSECTS(geom," + item + ") ";
      } else {
        retVal = "WITHIN(geom," + item + ") ";
      }
    } else {
      if (pretragaPoligonPresijeca) {
        retVal += " OR INTERSECTS(geom," + item + ") ";
      } else {
        retVal += " OR WITHIN(geom," + item + ") ";
      }
    }
  });

  return retVal;
}

/**Prikaz toast poruke. Od naslova zavisi boja, tj klasa koja se dodjeljuje */
function poruka(naslov, tekst) {
  let klasa = naslov.toLowerCase().trim();
  klasa !== "uspjeh" && klasa !== "upozorenje" && klasa !== "greska" && (klasa = "obavjestenje");
  document.querySelector("#toast").innerHTML = tekst;
  document.querySelector("#toast").className = klasa;
  setTimeout(function () {
    document.querySelector("#toast").className = "";
    document.querySelector("#toast").innerHTML = "";
  }, 3000);
}

/** Akcija promjene ikonice u navbaru */
function setujAktivnu(element) {
  if (nacrtan || modifikovan) {
    poruka("Upozorenje", "Nije moguće promijeniti aktivnost dok ne poništite crtanje nove ili izmjenu postojeće geometrije.");
    return false;
  }
  let els = document.querySelectorAll(".active");
  for (let i = 0; i < els.length; i++) {
    els[i].classList.remove("active");
  }
  document.querySelector(element).classList.add("active");
  closeDiv("#pretragaDiv");
  closeDiv("#atributiDiv");
  //if (element === "#atributi" || element === "#dodaj") {
  if (element === "#atributi") {
    showDiv("#atributiDiv");
  }
  if (element === "#pretraga") {
    showDiv("#pretragaDiv");
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
}

function showDiv(nazivDiva) {
  if (screen.width < 700) {
    document.querySelector(nazivDiva).style.width = "340px";
  } else {
    document.querySelector(nazivDiva).style.width = "500px";
  }

}

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
  document.querySelector('#modalSpinner').style.display = 'block';
  document.querySelector('#fadeSpinner').style.display = 'block';
}

function closeModalSpinner() {
  document.querySelector('#modalSpinner').style.display = 'none';
  document.querySelector('#fadeSpinner').style.display = 'none';
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
//document.querySelector("#btnPrikaziVektor").addEventListener("click", prikaziVektor);
//Ovo otkomentarisati za snap

document.querySelector("#confirmPotvrdi").addEventListener("click", confirmPotvrdi);
document.querySelector("#confirmOdustani").addEventListener("click", confirmOdustani);

let blnPocetniStub = false, blnZavrsniStub = false;
/**Metoda koja bira prvi stub voda */
function selekcijaPocetnogStuba(){
  if(blnZavrsniStub){
    poruka("Upozorenje", "Potrebno je odabrati završni stub.");
  }else{
    poruka("Uspjeh", "Odaberite početni stub voda koji želite da uvezete.");
    blnPocetniStub = true;
  }  
}

/**Metoda koja bira prvi stub */
function selekcijaZavrsnogStuba(){
  if(blnPocetniStub){
    poruka("Upozorenje", "Potrebno je odabrati početni stub.");
  }else{
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
  let urlServisa = window.location.protocol + "//" + window.location.hostname + "/portal/services/_getObjectAttributes.php?objekat=" + objekat + "&atribut=" + atribut;
  if (key_param !== "" && value_param !== "") {
    urlServisa += "&" + key_param + "=" + value_param;
  }
  $(ddl).append($("<option>", {
    value: "",
    text: ""
  }));
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      data.data.vrijednosti.forEach(function (response) {
        $(ddl).append($("<option>", {
          value: response,
          text: response
        }));
      });
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
    }
  });
}

function prikaziVektor() {
  let tekstFiltera = ""
  poligoni.forEach((item) => {
    if (tekstFiltera === "") {
      tekstFiltera = "INTERSECTS(geom," + item + ") ";
    } else {
      tekstFiltera += " OR INTERSECTS(geom," + item + ") ";
    }
  });

  if (document.querySelector("#ddl_vektor").value === "") {
    poruka("Upozorenje", "Nije odabran sloj za prikaz.")
    return false
  }
  if (tekstFiltera === "") {
    poruka("Upozorenje", "Nije kreiran nijedan poligon.")
    return false
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
      srsname: "EPSG:3857",
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