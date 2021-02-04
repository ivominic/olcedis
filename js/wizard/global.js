//Modul koji sadrži sve promjenljive koje se koriste na globalnom nivou u aplikaciji / wizardu kao i opšte metode
const dozvoljeniPomjeraj = 0.01; //0.01km - deset metara je dozvoljeo pomjeriti tačke iz gpx fajlova prije uvoza u bazu
//const domainUrl = location.origin;
//const wsServerOriginLocation = window.location.protocol + "//" + window.location.hostname;
const wsServerOriginLocation = "https://razvojgis.cedis.me";
const domainUrl = "https://razvojgis.cedis.me";
//const domainUrl = "http://localhost";
const wmsUrl = domainUrl + "/geoserver/geonode/wms";
const wfsUrl = domainUrl + "/geoserver/geonode/wfs";
const imageUrl = domainUrl + "/slike/";
const point = "Point",
  lineString = "LineString",
  polygon = "Polygon";
let tacke = [],
  linije = [],
  poligoni = [];
let naponskiNivoNapojneTrafostanice = "";
let odabraniNaponskiNivo = "";
let sifraNapojneTrafostanice = "";
let nazivNapojneTrafostanice = "";
let izvodNapojneTrafostanice = "";
let geometrijaNapojneTrafostanice = "";
let geohashNapojneTrafostanice = "";
let blnZavrsenoUparivanjeTrafostanica = false;
let blnZavrsenoUparivanjeVodova = false;
let nizSelektovanihTrafostanicaOriginalId = []; //Niz vrijednosti original_id polja trafostanica iz zahvata
let nizSelektovanihVodovaOriginalId = []; //Niz vrijednosti originalId polja vodova iz zahvata
let nizSelektovanihPotrosacaOriginalId = []; //Niz vrijednosti originalId polja potrošači iz zahvata - ovo je null - moguće da je nepotrebno

let paroviTS = []; //Niz koji se popunjava parovima trafostanica iz GIS-a i TBP-a
let paroviVodova = []; //Niz koji se popunjava parovim vodova iz GIS-a i TBP-a
let nizTrafostanicaZaWebServis = []; //Niz u koji će se dodavati svi zapisi za trafostanice koje je potebno upariti. Izmjene se odnose na polja: originalId, sifra napojne trafostanice, izvod napojne trafostanice i naziv napojne trafostanice
let nizVodovaZaWebServis = []; //Niz u koji će se dodati svi vodovi za unos u bazu, sa geohash_id vrijednostima nadređenog
let nizPotrosacaZaWebServis = []; //Niz u koji će se dodati svi potrošači za unos u bazu, sa geohash_id vrijednostima nadređenog
let nizTrafostanicaGeohashZaWebServis = []; //Niz u koji će se dodavati sve trafostanice sa novim geohash_id_no (no = nadređeni objekat)

let draw,
  modify,
  cqlFilter = "",
  idObjekta = 0,
  akcija = "pan",
  slikaUrl = "",
  slikeUrl = [],
  slikeIndex = 0,
  akcijaLejerNivo = "";
let geometrijaZaBazuWkt = "",
  nacrtan = false,
  modifikovan = false;
let nizKml = []; //podaci koji će biti prevučeni na mapu iz kml/gpx fajla
let blnSelekcijaNapojneTS = false; // Kada je true, klik na mapu treba da nađe napojnu trafostanicu
let featureNapojnaTrafostanica; //Ovaj objekat koristiti kao feature iz koje će se pratiti konektivnost
let selektovaneTrafostaniceFeatures = []; //Trafostanice u zahvatu poligona
let selektovaniVodoviFeatures = []; //Vodovi u zahvatu poligona
let selektovaniPotrosaciFeatures = []; //Potrošači u zahvatu poligona
let selektovaniStuboviFeatures = []; //Stubovi u zahvatu poligona
let selektovaniNKROFeatures = []; //NKRO u zahvatu poligona
let selektovanaPrikljucnaMjestaFeatures = []; //Priključna mjesta u zahvatu poligona
let selektovaniVodoviFeatures3857 = []; //U drugom koordinatnom sistemu

/**Definisanje podloga */
let osmBaseMap = new ol.layer.Tile({
  title: "Open Street Maps",
  source: new ol.source.OSM(),
});
let satelitBaseMap = new ol.layer.Tile({
  title: "Satelitski snimak",
  source: new ol.source.XYZ({
    url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
    maxZoom: 23,
  }),
});
let ortofotoBaseMap = new ol.layer.Image({
  title: "Ortofoto",
  name: "ortofoto_2018",
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: "geonode:ortofoto_2018",
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

/**Stilizacija vektora */
var fill = new ol.style.Fill({
  color: "rgba(255,255,0,0.3)",
});
var stroke = new ol.style.Stroke({
  color: "#ffff00",
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

/**Stilizacija vektora za snap*/
var fillSnap = new ol.style.Fill({
  color: "rgba(128,0,128,0.3)",
});
var strokeSnap = new ol.style.Stroke({
  color: "#C807FE",
  width: 2,
});
var circleSnap = new ol.style.Circle({
  radius: 7,
  fill: fillSnap,
  stroke: strokeSnap,
});
var vectorStyleSnap = new ol.style.Style({
  fill: fillSnap,
  stroke: strokeSnap,
  image: circleSnap,
});

/**Stilizacija vektora za neuparene i sporne elemente na mapi*/
let fillUnmatched = new ol.style.Fill({
  color: "rgba(0,255,255,0.8)",
});
let strokeUnmatched = new ol.style.Stroke({
  color: "#00ffff",
  width: 4,
});
let circleUnmatched = new ol.style.Circle({
  radius: 14,
  fill: fillUnmatched,
  stroke: strokeUnmatched,
});
let vectorStyleUnmatched = new ol.style.Style({
  fill: fillUnmatched,
  stroke: strokeUnmatched,
  image: circleUnmatched,
});

/**Setovanje centra mape */
let center = [19.26, 42.56];
//let center = ol.proj.transform([19.2381, 43.1271], "EPSG:4326", "EPSG:3857");
let view = new ol.View({
  center: center,
  zoom: 9,
  projection: "EPSG:4326",
});

/** Prikaz razmjernika na mapi*/
const razmjera = new ol.control.ScaleLine({
  target: document.querySelector("#razmjera"),
  units: "metric",
  bar: true,
  steps: 4,
  text: true,
  minWidth: 100,
});

/**Smještanje mape u div sa id-jem "map" */
let map = new ol.Map({
  target: "map",
  interactions: ol.interaction.defaults().extend([new ol.interaction.PinchZoom(), new ol.interaction.DragPan()]),
  layers: [osmBaseMap],
  view: view,
});

map.addControl(razmjera);

let vektorNeupareniVodovi = new ol.layer.Vector({
  source: new ol.source.Vector({
    //features: features
  }),
  style: vectorStyleUnmatched,
});
//vektorNeupareniVodovi.setSource(new ol.source.Vector({features: features}));

/**
 * Metoda koja za naponski nivo trafostanice vraća odgovarajući nivo naponskog voda
 * @param {*} nivo
 */
function globalNaponskiNivo(nivo) {
  let retVal = "";
  switch (nivo) {
    case ("10/0,4", "10/0,69", "6/0,4", "35/0.4"):
      retVal = "0.4";
      break;
    case ("10/10", "35/10", "35/6", "110/10"):
      retVal = "10";
      break;
    case ("110/35", "35/35"):
      retVal = "35";
      break;
    default:
      retVal = nivo;
  }
  return retVal;
}

/**
 * Metoda koja za naponski nivo vraća cql text za filter objekata prema iscrtanim poligonima i naponskom nivou
 * @param {*} nivo
 */
function globalCqlZaNaponskiNivo(nivo, sloj) {
  let retVal = "";
  poligoni.forEach((item) => {
    if (retVal === "") {
      retVal = "INTERSECTS(Geometry," + item + ")";
    } else {
      retVal += " OR INTERSECTS(Geometry," + item + ")";
    }
  });

  retVal = "(" + retVal + ")";
  if (sloj === "trafostanice" || sloj === "vodovi" || sloj === "view_potrosaci") {
    if (nivo === "35") {
      retVal += " AND napon='35'";
    } else if (nivo === "10") {
      retVal += " AND napon='10'";
    } else if (nivo === "0.4") {
      retVal += " AND napon='0.4'";
    }
  }
  console.log("cql retval", retVal);
  return retVal;
}

//x/y uzimam sve koje počinju sa y

//Popunjavanje ddl listi
function popuniListeZaStubove(napon) {
  console.log("vrsta_namjena", napon);
  popuniDdlAtributima("#tip", "stubovi", "tip", "", "");
  popuniDdlAtributima("#vrsta_namjena", "stubovi", "vrsta_namjena", "napon", napon);
  popuniDdlAtributima("#vrsta_materijal", "stubovi", "vrsta_materijal", "napon", napon);
  popuniDdlAtributima("#vrsta_drvenog", "stubovi", "vrsta_drvenog", "napon", napon);
  popuniDdlAtributima("#izolator_vrsta", "stubovi", "izolator_vrsta", "napon", napon);
  popuniDdlAtributima("#izolator_funkcija", "stubovi", "izolator_funkcija", "napon", napon);
  popuniDdlAtributima("#tip_izolatora", "stubovi", "tip_izolatora", "napon", napon);
  popuniDdlAtributima("#nosaci_izolatora", "stubovi", "nosaci_izolatora", "napon", napon);
  popuniDdlAtributima("#odvodnik_prenapona", "stubovi", "odvodnik_prenapona", "napon", napon);
  popuniDdlAtributima("#uzemljivac", "stubovi", "uzemljivac", "napon", napon);
  popuniDdlAtributima("#optika", "stubovi", "optika", "napon", napon);
  popuniDdlAtributima("#rasvjeta", "stubovi", "rasvjeta", "", "");
  popuniDdlAtributima("#vlasnistvo", "stubovi", "vlasnistvo", "napon", napon);
  popuniDdlAtributima("#prikljucak_otcjep", "stubovi", "prikljucak_otcjep", "napon", napon);
  popuniDdlAtributima("#nn_vod", "stubovi", "nn_vod", "", "");
  popuniDdlAtributima("#rastavljac", "stubovi", "rastavljac", "napon", napon);
  popuniDdlAtributima("#vod_10", "stubovi", "10_vod", "napon", napon);

  popuniDdlAtributima("#pretraga_tip", "stubovi", "tip", "napon", napon);
  popuniDdlAtributima("#pretraga_vrsta_namjena", "stubovi", "vrsta_namjena", "napon", napon);
  popuniDdlAtributima("#pretraga_vrsta_materijal", "stubovi", "vrsta_materijal", "napon", napon);
  popuniDdlAtributima("#pretraga_vrsta_drvenog", "stubovi", "vrsta_drvenog", "napon", napon);
  popuniDdlAtributima("#pretraga_izolator_vrsta", "stubovi", "izolator_vrsta", "napon", napon);
  popuniDdlAtributima("#pretraga_izolator_funkcija", "stubovi", "izolator_funkcija", "napon", napon);
  popuniDdlAtributima("#pretraga_tip_nosac_izol", "stubovi", "tip_nosac_izol", "napon", napon);
  popuniDdlAtributima("#pretraga_odvodnik_prenapona", "stubovi", "odvodnik_prenapona", "napon", napon);
  popuniDdlAtributima("#pretraga_uzemljivac", "stubovi", "uzemljivac", "napon", napon);
  popuniDdlAtributima("#pretraga_optika", "stubovi", "optika", "napon", napon);
  popuniDdlAtributima("#pretraga_rasvjeta", "stubovi", "rasvjeta", "", "");
  popuniDdlAtributima("#pretraga_vlasnistvo", "stubovi", "vlasnistvo", "napon", napon);
  popuniDdlAtributima("#pretraga_prikljucak_otcjep", "stubovi", "prikljucak_otcjep", "napon", napon);
  popuniDdlAtributima("#pretraga_nn_vod", "stubovi", "nn_vod", "", "");
  popuniDdlAtributima("#pretraga_rastavljac", "stubovi", "rastavljac", "napon", napon);
  popuniDdlAtributima("#pretraga_10_vod", "stubovi", "10_vod", "napon", napon);
}

function popuniListeZaVodove(napon) {
  popuniDdlAtributima("#br_faza", "vodovi", "br_faza", "", "");
  popuniDdlAtributima("#vrsta", "vodovi", "vrsta", "napon", napon);
  popuniDdlAtributima("#tip", "vodovi", "tip", "napon", napon);
  popuniDdlAtributima("#presjek", "vodovi", "presjek", "napon", napon);
  popuniDdlAtributima("#vrsta_materijal", "vodovi", "materijal", "napon", napon);
  popuniDdlAtributima("#rasvjeta", "vodovi", "rasvjeta", "", "");
  popuniDdlAtributima("#pog_sprem", "vodovi", "pog_sprem", "napon", napon);
  popuniDdlAtributima("#vlasnistvo", "vodovi", "vlasnistvo", "napon", napon);
  popuniDdlAtributima("#uze_presjek", "vodovi", "uze_presjek", "napon", napon);
  popuniDdlAtributima("#uze", "vodovi", "uze", "napon", napon);

  popuniDdlAtributima("#pretraga_br_faza", "vodovi", "br_faza", "", "");
  popuniDdlAtributima("#pretraga_vrsta", "vodovi", "vrsta", "napon", napon);
  popuniDdlAtributima("#pretraga_tip", "vodovi", "tip", "napon", napon);
  popuniDdlAtributima("#pretraga_presjek", "vodovi", "presjek", "napon", napon);
  popuniDdlAtributima("#pretraga_vrsta_materijal", "vodovi", "materijal", "napon", napon);
  popuniDdlAtributima("#pretraga_rasvjeta", "vodovi", "rasvjeta", "", "");
  popuniDdlAtributima("#pretraga_pog_sprem", "vodovi", "pog_sprem", "napon", napon);
  popuniDdlAtributima("#pretraga_vlasnistvo", "vodovi", "vlasnistvo", "napon", napon);
  popuniDdlAtributima("#pretraga_uze_presjek", "vodovi", "uze_presjek", "napon", napon);
  popuniDdlAtributima("#pretraga_uze", "vodovi", "uze", "napon", napon);
}

function popuniListeZaTrafostanice(napon) {
  popuniDdlAtributima("#funkcija", "trafostanice", "funkcija", "napon", napon);
  popuniDdlAtributima("#tip", "trafostanice", "tip", "napon", napon);
  popuniDdlAtributima("#prenos_odnos", "trafostanice", "prenos_odnos", "napon", napon);
  popuniDdlAtributima("#inst_snaga_t1", "trafostanice", "inst_snaga_t1", "napon", napon);
  popuniDdlAtributima("#inst_snaga_t2", "trafostanice", "inst_snaga_t2", "napon", napon);
  popuniDdlAtributima("#inst_snaga_t3", "trafostanice", "inst_snaga_t3", "napon", napon);
  popuniDdlAtributima("#inst_snaga_t4", "trafostanice", "inst_snaga_t4", "napon", napon);
  popuniDdlAtributima("#vlasnistvo", "trafostanice", "vlasnistvo", "napon", napon);

  popuniDdlAtributima("#pretraga_funkcija", "trafostanice", "funkcija", "napon", napon);
  popuniDdlAtributima("#pretraga_tip", "trafostanice", "tip", "napon", napon);
  popuniDdlAtributima("#pretraga_prenos_odnos", "trafostanice", "prenos_odnos", "napon", napon);
  popuniDdlAtributima("#pretraga_inst_snaga_t1", "trafostanice", "inst_snaga_t1", "napon", napon);
  popuniDdlAtributima("#pretraga_inst_snaga_t2", "trafostanice", "inst_snaga_t2", "napon", napon);
  popuniDdlAtributima("#pretraga_inst_snaga_t3", "trafostanice", "inst_snaga_t3", "napon", napon);
  popuniDdlAtributima("#pretraga_inst_snaga_t4", "trafostanice", "inst_snaga_t4", "napon", napon);
  popuniDdlAtributima("#pretraga_vlasnistvo", "trafostanice", "vlasnistvo", "napon", napon);
}

function popuniListeZaPrikljucnaMjesta() {
  popuniDdlAtributima("#osiguraci", "prikljucno_mjesto", "osiguraci", "", "");
  popuniDdlAtributima("#vlasnistvo", "prikljucno_mjesto", "vlasnistvo", "", "");
  //popuniDdlAtributima("#tip", "prikljucno_mjesto", "tip", "", "");

  popuniDdlAtributima("#pretraga_osiguraci", "prikljucno_mjesto", "osiguraci", "", "");
  popuniDdlAtributima("#pretraga_vlasnistvo", "prikljucno_mjesto", "vlasnistvo", "", "");
  //popuniDdlAtributima("#pretraga_tip", "prikljucno_mjesto", "pretraga_tip", "", "");
}

function popuniListeZaNkro() {
  popuniDdlAtributima("#materijal", "nkro", "materijal", "", "");
  popuniDdlAtributima("#montaza", "nkro", "montaza", "", "");
  popuniDdlAtributima("#vrata", "nkro", "vrata", "", "");
  popuniDdlAtributima("#pog_sprem", "nkro", "pog_sprem", "", "");
  popuniDdlAtributima("#vlasnistvo", "nkro", "vlasnistvo", "", "");

  popuniDdlAtributima("#pretraga_materijal", "nkro", "materijal", "", "");
  popuniDdlAtributima("#pretraga_montaza", "nkro", "montaza", "", "");
  popuniDdlAtributima("#pretraga_vrata", "nkro", "vrata", "", "");
  popuniDdlAtributima("#pretraga_pog_sprem", "nkro", "pog_sprem", "", "");
  popuniDdlAtributima("#pretraga_vlasnistvo", "nkro", "vlasnistvo", "", "");
}
