//Modul koji sadrži sve promjenljive koje se koriste na globalnom nivou u aplikaciji / wizardu kao i opšte metode
const dozvoljeniPomjeraj = 0.01; //0.01km - deset metara je dozvoljeo pomjeriti tačke iz gpx fajlova prije uvoza u bazu
const kmlRadius = 1000; //Distance from klm point where checking existion of other objects
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
let geoserverToken = "",
  isEditable = true; //Promjenljiva koja čuva token za wfs servise, druga označava da li je moguće mijenjati geometriju prevučenih fajlova
let tacke = [],
  linije = [],
  poligoni = [];
let gpxFeatures = []; //Niz feature-a koji se dobije kad se prevuče gpx fajl na mapu
let blnDodijeljenoGpxProperties = false; //Promjenljiva koja označava da li su svim podacima iz gpx-a dodijeljeni atributi
let selectGpxFeature; //Fature iz gpx-a koji se selektuje
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

let blnTopDown = false; //Za niskonaponsku mrežu, određuje da li će se raditi top-down ili bottom-up uparivanje
let odabirSaMape = false; //Promjenljiva koja označava da li je u toku funkcionalnost odabira vrijednosti sa mape
let nizKoordinataPrikljucnihMjesta = {}; //Čuva koordinate nakon odabira priključnog mjesta kod unosa novog potrošača

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
let selektovaniPODoviFeatures = []; //PODovi mjesta u zahvatu poligona
let selektovaniVodoviFeatures3857 = []; //U drugom koordinatnom sistemu
let odabraniLejerUnos = ""; //Mijenja se na meni za unos podataka
let kreiraniStuboviFeatures = [],
  kreiraneTrafostaniceFeatures = [],
  kreiraniNkroFeatures = [],
  kreiraniPotrosaciFeatures = [],
  kreiraniPodoviFeatures = [],
  kreiranaPrikljucnaMjestaFeatures = []; //Nizovi objekata za slanje na server

let kreiraniVodoviFeatures = []; //Niz vodova kreiranih iz tačaka gpx fajla

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
  color: "rgba(0,255,255,0.6)",
});
var stroke = new ol.style.Stroke({
  color: "#00ffff",
  width: 4,
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
  color: "rgba(128,0,128,0.5)",
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

/**Stilizacija vektora za kreirane elemente*/
let fillKreirani = new ol.style.Fill({
  color: "rgba(255,0,0,0.8)",
});
let strokeKreirani = new ol.style.Stroke({
  color: "#ff0000",
  width: 8,
});
let circleKreirani = new ol.style.Circle({
  radius: 8,
  fill: fillKreirani,
  stroke: strokeKreirani,
});
let vectorStyleKreirani = new ol.style.Style({
  fill: fillKreirani,
  stroke: strokeKreirani,
  image: circleKreirani,
});

let neobradjenaTacka = new ol.style.Circle({
  radius: 7,
  fill: new ol.style.Fill({ color: "rgba(0, 255, 255, 0.8)" }),
  stroke: new ol.style.Stroke({
    color: "#00ffff",
    width: 2,
  }),
});
let obradjenaTacka = new ol.style.Circle({
  radius: 7,
  fill: new ol.style.Fill({ color: "rgba(0, 255, 0, 0.8)" }),
  stroke: new ol.style.Stroke({
    color: "#00ff00",
    width: 2,
  }),
});
let kmlDisconnectedPoint = new ol.style.Circle({
  radius: 7,
  fill: new ol.style.Fill({ color: "rgba(255, 0, 0, 0.8)" }),
  stroke: new ol.style.Stroke({
    color: "#ff0000",
    width: 2,
  }),
});

//Styling funkcija za gpx objekte
let kreiranjeTekstStila = function (feature) {
  return new ol.style.Text({
    textAlign: "left",
    textBaseline: "middle",
    font: "14px Verdana",
    offsetX: 14,
    text: feature.values_.name,

    //fill: fill,
    stroke: stroke,
  });
};

let kreiranjeLabeleZaGpxTacke = function () {
  return function (feature) {
    let styleNeobradjeni = new ol.style.Style({
      stroke: stroke,
      fill: fill,
      text: kreiranjeTekstStila(feature),
      image: neobradjenaTacka,
    });
    let styleObradjeni = new ol.style.Style({
      stroke: stroke,
      fill: fill,
      text: kreiranjeTekstStila(feature),
      image: obradjenaTacka,
    });
    let styleKmlDisconnected = new ol.style.Style({
      stroke: stroke,
      fill: fill,
      text: kreiranjeTekstStila(feature),
      image: kmlDisconnectedPoint,
    });

    if (feature.values_.lejer && feature.values_.lejer !== undefined) {
      console.log(" feature", feature.values_.lejer);
      return [styleObradjeni];
    } else if (feature.values_.lejer) {
      //Postaviti uslov za koji će prikazati crvenu boju

      return [styleKmlDisconnected];
    } else {
      return [styleNeobradjeni];
    }
  };
};

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

let vektorKreiraniVodovi = new ol.layer.Vector({
  source: new ol.source.Vector({
    //features: features
  }),
  style: vectorStyleKreirani,
});
map.addLayer(vektorKreiraniVodovi);

/**
 * Metoda koja za naponski nivo trafostanice vraća odgovarajući nivo naponskog voda
 * @param {*} nivo
 */
function globalNaponskiNivoPrenosOdnos(nivo) {
  let retVal = "";
  switch (nivo) {
    case ("10/0,4", "10/0,69", "6/0,4", "35/0.4", "35/0,4"):
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
  popuniDdlAtributima("#tip_stub", "stubovi", "tip", "", "");
  popuniDdlAtributima("#rasvjeta_stub", "stubovi", "rasvjeta", "", "");
  popuniDdlAtributima("#nn_vod_stub", "stubovi", "nn_vod", "", "");
  popuniDdlAtributima("#nn_vod_stub_10", "stubovi", "nn_vod", "", "");
  popuniDdlAtributima("#vrsta_namjena_stub_04", "stubovi", "vrsta_namjena", "napon", "0.4");
  popuniDdlAtributima("#vrsta_namjena_stub_10", "stubovi", "vrsta_namjena", "napon", "10");
  popuniDdlAtributima("#vrsta_namjena_stub_35", "stubovi", "vrsta_namjena", "napon", "35");
  popuniDdlAtributima("#vrsta_materijal_stub_04", "stubovi", "vrsta_materijal", "napon", "0.4");
  popuniDdlAtributima("#vrsta_materijal_stub_10", "stubovi", "vrsta_materijal", "napon", "10");
  popuniDdlAtributima("#vrsta_materijal_stub_35", "stubovi", "vrsta_materijal", "napon", "35");
  popuniDdlAtributima("#vrsta_drvenog_stub_04", "stubovi", "vrsta_drvenog", "napon", "0.4");
  popuniDdlAtributima("#vrsta_drvenog_stub_10", "stubovi", "vrsta_drvenog", "napon", "10");
  popuniDdlAtributima("#vrsta_drvenog_stub_35", "stubovi", "vrsta_drvenog", "napon", "35");
  popuniDdlAtributima("#izolator_vrsta_stub_04", "stubovi", "izolator_vrsta", "napon", "0.4");
  popuniDdlAtributima("#izolator_vrsta_stub_10", "stubovi", "izolator_vrsta", "napon", "10");
  popuniDdlAtributima("#izolator_vrsta_stub_35", "stubovi", "izolator_vrsta", "napon", "35");
  popuniDdlAtributima("#izolator_funkcija_stub_04", "stubovi", "izolator_funkcija", "napon", "0.4");
  popuniDdlAtributima("#izolator_funkcija_stub_10", "stubovi", "izolator_funkcija", "napon", "10");
  popuniDdlAtributima("#izolator_funkcija_stub_35", "stubovi", "izolator_funkcija", "napon", "35");
  popuniDdlAtributima("#tip_izolatora_stub_04", "stubovi", "tip_izolatora", "napon", "0.4");
  popuniDdlAtributima("#tip_izolatora_stub_10", "stubovi", "tip_izolatora", "napon", "10");
  popuniDdlAtributima("#tip_izolatora_stub_35", "stubovi", "tip_izolatora", "napon", "35");
  popuniDdlAtributima("#nosaci_izolatora_stub_04", "stubovi", "nosaci_izolatora", "napon", "0.4");
  popuniDdlAtributima("#nosaci_izolatora_stub_10", "stubovi", "nosaci_izolatora", "napon", "10");
  popuniDdlAtributima("#nosaci_izolatora_stub_35", "stubovi", "nosaci_izolatora", "napon", "35");
  popuniDdlAtributima("#odvodnik_prenapona_stub_04", "stubovi", "odvodnik_prenapona", "napon", "0.4");
  popuniDdlAtributima("#odvodnik_prenapona_stub_10", "stubovi", "odvodnik_prenapona", "napon", "10");
  popuniDdlAtributima("#odvodnik_prenapona_stub_35", "stubovi", "odvodnik_prenapona", "napon", "35");
  popuniDdlAtributima("#uzemljivac_stub_04", "stubovi", "uzemljivac", "napon", "0.4");
  popuniDdlAtributima("#uzemljivac_stub_10", "stubovi", "uzemljivac", "napon", "10");
  popuniDdlAtributima("#uzemljivac_stub_35", "stubovi", "uzemljivac", "napon", "35");
  popuniDdlAtributima("#optika_stub_04", "stubovi", "optika", "napon", "0.4");
  popuniDdlAtributima("#optika_stub_10", "stubovi", "optika", "napon", "10");
  popuniDdlAtributima("#optika_stub_35", "stubovi", "optika", "napon", "35");
  popuniDdlAtributima("#vlasnistvo", "stubovi", "vlasnistvo", "napon", "0.4");
  popuniDdlAtributima("#prikljucak_otcjep_stub_10", "stubovi", "prikljucak_otcjep", "napon", "10");
  popuniDdlAtributima("#prikljucak_otcjep_stub_35", "stubovi", "prikljucak_otcjep", "napon", "35");
  popuniDdlAtributima("#rastavljac_stub_10", "stubovi", "rastavljac", "napon", "10");
  popuniDdlAtributima("#rastavljac_stub_35", "stubovi", "rastavljac", "napon", "35");
  popuniDdlAtributima("#vod_10", "stubovi", "10_vod", "napon", "35");

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
  popuniDdlAtributima("#vrsta_vod_04", "vodovi", "vrsta", "napon", "0.4");
  popuniDdlAtributima("#vrsta_vod_10", "vodovi", "vrsta", "napon", "10");
  popuniDdlAtributima("#vrsta_vod_35", "vodovi", "vrsta", "napon", "35");
  popuniDdlAtributima("#tip_vod_04", "vodovi", "tip", "napon", "0.4");
  popuniDdlAtributima("#tip_vod_10", "vodovi", "tip", "napon", "10");
  popuniDdlAtributima("#tip_vod_35", "vodovi", "tip", "napon", "35");
  popuniDdlAtributima("#presjek_vod_04", "vodovi", "presjek", "napon", "0.4");
  popuniDdlAtributima("#presjek_vod_10", "vodovi", "presjek", "napon", "10");
  popuniDdlAtributima("#presjek_vod_35", "vodovi", "presjek", "napon", "35");
  popuniDdlAtributima("#vrsta_materijal_vod_04", "vodovi", "materijal", "napon", "0.4");
  popuniDdlAtributima("#vrsta_materijal_vod_10", "vodovi", "materijal", "napon", "10");
  popuniDdlAtributima("#vrsta_materijal_vod_35", "vodovi", "materijal", "napon", "35");
  popuniDdlAtributima("#rasvjeta_vod", "vodovi", "rasvjeta", "", "");
  popuniDdlAtributima("#pog_sprem", "vodovi", "pog_sprem", "napon", "0.4");
  popuniDdlAtributima("#uze_presjek_vod_10", "vodovi", "uze_presjek", "napon", "10");
  popuniDdlAtributima("#uze_presjek_vod_35", "vodovi", "uze_presjek", "napon", "35");
  popuniDdlAtributima("#uze_vod_10", "vodovi", "uze", "napon", "10");
  popuniDdlAtributima("#uze_vod_35", "vodovi", "uze", "napon", "35");

  popuniDdlAtributima("#pretraga_br_faza", "vodovi", "br_faza", "", "");
  popuniDdlAtributima("#pretraga_vrsta", "vodovi", "vrsta", "napon", napon);
  popuniDdlAtributima("#pretraga_tip", "vodovi", "tip", "napon", napon);
  popuniDdlAtributima("#pretraga_presjek", "vodovi", "presjek", "napon", napon);
  popuniDdlAtributima("#pretraga_vrsta_materijal", "vodovi", "materijal", "napon", napon);
  popuniDdlAtributima("#pretraga_rasvjeta", "vodovi", "rasvjeta", "", "");
  popuniDdlAtributima("#pretraga_pog_sprem", "vodovi", "pog_sprem", "napon", napon);
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

  popuniDdlAtributima("#pretraga_funkcija", "trafostanice", "funkcija", "napon", napon);
  popuniDdlAtributima("#pretraga_tip", "trafostanice", "tip", "napon", napon);
  popuniDdlAtributima("#pretraga_prenos_odnos", "trafostanice", "prenos_odnos", "napon", napon);
  popuniDdlAtributima("#pretraga_inst_snaga_t1", "trafostanice", "inst_snaga_t1", "napon", napon);
  popuniDdlAtributima("#pretraga_inst_snaga_t2", "trafostanice", "inst_snaga_t2", "napon", napon);
  popuniDdlAtributima("#pretraga_inst_snaga_t3", "trafostanice", "inst_snaga_t3", "napon", napon);
  popuniDdlAtributima("#pretraga_inst_snaga_t4", "trafostanice", "inst_snaga_t4", "napon", napon);
}

function popuniListeZaPrikljucnaMjesta() {
  popuniDdlAtributima("#osiguraci", "prikljucno_mjesto", "osiguraci", "", "");

  popuniDdlAtributima("#pretraga_osiguraci", "prikljucno_mjesto", "osiguraci", "", "");
}

function popuniListeZaNkro() {
  popuniDdlAtributima("#materijal", "nkro", "materijal", "", "");
  popuniDdlAtributima("#montaza", "nkro", "montaza", "", "");
  popuniDdlAtributima("#vrata", "nkro", "vrata", "", "");
  //popuniDdlAtributima("#pog_sprem", "nkro", "pog_sprem", "", "");

  popuniDdlAtributima("#pretraga_materijal", "nkro", "materijal", "", "");
  popuniDdlAtributima("#pretraga_montaza", "nkro", "montaza", "", "");
  popuniDdlAtributima("#pretraga_vrata", "nkro", "vrata", "", "");
  //popuniDdlAtributima("#pretraga_pog_sprem", "nkro", "pog_sprem", "", "");
}

function popuniListeZaPotrosace() {}

function popuniListeZaPod() {}

window.addEventListener("load", function () {
  popuniListeZaStubove("0.4");
  popuniListeZaVodove("0.4");
  popuniListeZaTrafostanice("0.4");
  popuniListeZaPrikljucnaMjesta();
  popuniListeZaNkro();
  popuniListeZaPotrosace();
  popuniListeZaPod();
});

/**
 * Metoda koja za zadatu sifru trafostanice provjerava da li je duga 7 karaktera i ako su prvih 6 cifre, odbacuje poslednje slovo, pošto je to oznaka trafoa
 * @param {} sifra
 */
function srediSifruTrafostanice(sifra) {
  let retval = sifra;
  if (sifra.length > 6) {
    if (!isNaN(sifra.substring(0, 6))) {
      retval = sifra.substring(0, 6);
    }
  }
  return retval;
}

/**
 * Metoda koja za wkt reprezentaciju tačke vraća 2d wkt iste tačke
 * @param {*} wkt3Dtacka
 */
function wkt3Du2D(wkt3Dtacka) {
  const regex = /^(POINT M|POINT Z|POINT MZ|POINT ZM)\(([\d]+\.?[\d]+)\s+([\d]+\.[\d]+).*\)$/gm;
  const subst = `POINT($2 $3)`;
  return wkt3Dtacka.replace(regex, subst);
}

/**
 * Metoda koja provjerava da li se zadata vrijednost već nalazi u drop down listi
 * @param {*} ddl
 * @param {*} vrijednost
 */
function provjeraPostojanjaElementaDdla(ddl, vrijednost) {
  let postoji = false;
  Array.from(ddl.options).forEach(function (item) {
    if (item.value === String(vrijednost)) {
      postoji = true;
    }
  });
  return postoji;
}
