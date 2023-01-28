/**
 * Modul koji sadrži sve promjenljive koje se koriste na globalnom nivou u aplikaciji / wizardu kao i opšte metode
 */

let dozvoljeniPomjeraj = 0.01; //0.01km - deset metara je dozvoljeo pomjeriti tačke iz gpx fajlova prije uvoza u bazu
let kmlRadius = 2; //Radijus (u metrima) za koji se vrši provjera da li postoje objekti koji bi, potencijalno,
//trebali biti povezani na geometriju iz kml fajla, koja se smatra apsolutno preciznom
let minGpsPointName = 0,
  maxGpsPointName = 0; //min i max gps vrijednost tačaka koje formiraju jedan vod (krajnje tačke voda iz fajla)
let globalUsername = ""; //Username korisnika aplikacije
let globalVlasnik = ""; //Username vlasnika za korisnika aplikacije
let geoserverToken = ""; //Promjenljiva koja čuva token za wfs servise
let isEditable = true; //Promjenljiva koja definiše da li je dozvoljeno pomjeranje objekata iz fajla. Za kml nije dozvoljeno.
let isUnprocessed = false; //Promjenljiva koja prati da li ima neobrađenih objekata
let globalTimestamp = Date.now();
let tacke = [],
  linije = [],
  poligoni = [];
let unosUspjeh = true,
  unosPostojeObjekti = true,
  finalImportMessage = "";
let promiseArray = [];
let selektovaniWmsObjekat; //Objekat koji je selektovan sa wms lejera. Prazniti ga kada se odabere druga akcija.
let originalnaGeometrijaWmsVoda;
let nizWmsZaBrisanje = []; //Niz postojećih objekata za brisanje, grupisan po geohash_no
let nizWmsZaIzmjenu = []; //Niz postojećih objekata kojima se mijenjaju atributi
let nizWmsZaPomjeranje = []; //Niz postojećih objekata kojima se mijenja lokacija
let nizSelektovanihObjekata = []; //Objekti pročitani iz raster lejera, na klik event
let gpxFeatures = []; //Niz feature-a koji se dobije kad se prevuče gpx fajl na mapu
let kmlFeature,
  kmlEndPoints = []; //Feature iz kml fajla koju povezujemo sa ostatkom mreže. EndPoint krajevi kml linije
let kmlLinksArray = []; //Niz objekata koje je potrebno povezati sa ostatkom mreže
let blnDodijeljenoGpxProperties = false; //Promjenljiva koja označava da li su svim podacima iz gpx-a dodijeljeni atributi
let selectGpxFeature; //Feature iz gpx-a koji se selektuje
let naponskiNivoNapojneTrafostanice = ""; //Prenos-odnos: ova promjenljiva se setuje, ali se nigdje ne koristi.
let odabraniNaponskiNivo = "",
  filePowerLevel = "",
  vodNaponskiNivoPrijeOdabira = "";
let blnSpajanjeVodova = false;
let sifraNapojneTrafostanice = "";
let nazivNapojneTrafostanice = "";
let izvodNapojneTrafostanice = "";
let geometrijaNapojneTrafostanice = "";
let geohashNapojneTrafostanice = "";
let blnZavrsenoUparivanjeTrafostanica = false; //Wizard, true ako su uparene sve trafostanice. Setuje se, a ne koristi.
let blnZavrsenoUparivanjeVodova = false; //Wizard, true ako su upareni svi vodovi.
let nizSelektovanihTrafostanicaOriginalId = []; //Wizard, niz vrijednosti original_id polja trafostanica iz zahvata
let nizSelektovanihPotrosacaOriginalId = []; //Wizard, niz vrijednosti originalId polja potrošači iz zahvata - ovo je null - moguće da je nepotrebno

let nizTrafostanicaZaWebServis = []; //Wizard, niz u koji će se dodavati svi zapisi za trafostanice koje je potebno upariti.
//Ne koristi se. Izmjene se odnose na polja: originalId, sifra napojne trafostanice, izvod napojne trafostanice i naziv napojne trafostanice
let nizVodovaZaWebServis = []; //Wizard, niz u koji će se dodati svi vodovi za unos u bazu, sa geohash_id vrijednostima nadređenog
let nizPotrosacaZaWebServis = []; //Wizard, niz u koji će se dodati svi potrošači za unos u bazu, sa geohash_id vrijednostima nadređenog
//Ne koristi se
let nizTrafostanicaGeohashZaWebServis = []; //Wizard, niz u koji će se dodavati sve trafostanice sa novim geohash_id_no (no = nadređeni objekat)
//Ne koristi se

let blnTopDown = false; //Wizard, za niskonaponsku mrežu, određuje da li će se raditi top-down ili bottom-up uparivanje
let odabirSaMape = false; //Promjenljiva koja označava da li je u toku funkcionalnost odabira vrijednosti sa mape
let odabirPrikljucnogMjestaSaMape = false,
  odabirPrikljucnogMjestaSaMapeVektor = false; //označava da je odabir u pitanju, da se ne prikazuju atributi
let potrosacZaKogSeBiraPrikljucnoMjesto; //Privremena promjenjljiva, da bi se vratili na potrošača, automatski, nakon selekcije priključnog mjesta sa mape
let blnShowAttribute = false; //Promjenljiva koja označava da li je potrebno prikazati modal atributi
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
let odabraniLejerUnos = ""; //Mijenja se na meni za unos podataka

let isModifyDisabled = false; //Ne koristi se. Da onemogući izmjenu pozicije tačaka nakon iscrtavanja voda.

let stuboviArrayFinal = [],
  vodoviArrayFinal = [],
  trafostaniceArrayFinal = [],
  nkroArrayFinal = [],
  potrosaciArrayFinal = [],
  podoviArrayFinal = [],
  prikljucnaMjestaArrayFinal = []; //Nizovi za unos u bazu - finalni korak

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

let bezBaseMap = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: null,
  }),
});

/**Stilizacija vektora */
let fill = new ol.style.Fill({
  color: "rgba(0,255,255,0.6)",
});
let stroke = new ol.style.Stroke({
  color: "#00ffff",
  width: 4,
});
let circle = new ol.style.Circle({
  radius: 7,
  fill: fill,
  stroke: stroke,
});
let vectorStyle = new ol.style.Style({
  fill: fill,
  stroke: stroke,
  image: circle,
});

/**Stilizacija vektora za snap*/
let fillSnap = new ol.style.Fill({
  color: "rgba(128,0,128,0.5)",
});
let strokeSnap = new ol.style.Stroke({
  color: "#C807FE",
  width: 2,
});
let circleSnap = new ol.style.Circle({
  radius: 7,
  fill: fillSnap,
  stroke: strokeSnap,
});
let vectorStyleSnap = new ol.style.Style({
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

/**Stilizacija vektora za kreirane vodove - ponovljen*/
let fillKreiranPonovo = new ol.style.Fill({
  color: "rgba(0,0,255,0.8)",
});
let strokeKreiranPonovo = new ol.style.Stroke({
  color: "#0000ff",
  width: 8,
});
let circleKreiranPonovo = new ol.style.Circle({
  radius: 8,
  fill: fillKreiranPonovo,
  stroke: strokeKreiranPonovo,
});
let vectorStyleKreiranPonovo = new ol.style.Style({
  fill: fillKreiranPonovo,
  stroke: strokeKreiranPonovo,
  image: circleKreiranPonovo,
});

/**Stilizacija vektora za kreirane elemente*/
let fillKreirani = new ol.style.Fill({
  color: "rgba(0,0,255,0.8)",
});
let strokeKreirani = new ol.style.Stroke({
  color: "#0000ff",
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

let fillBrisanje = new ol.style.Fill({
  color: "rgba(255,0,0,0.8)",
});
let strokeBrisanje = new ol.style.Stroke({
  color: "#ff0000",
  width: 8,
});
let circleBrisanje = new ol.style.Circle({
  radius: 8,
  fill: fillBrisanje,
  stroke: strokeBrisanje,
});
let vectorStyleBrisanje = new ol.style.Style({
  fill: fillBrisanje,
  stroke: strokeBrisanje,
  image: circleBrisanje,
});

let fillAzuriranje = new ol.style.Fill({
  color: "rgba(255,140,0,0.8)",
});
let strokeAzuriranje = new ol.style.Stroke({
  color: "#FF8C00",
  width: 8,
});
let circleAzuriranje = new ol.style.Circle({
  radius: 8,
  fill: fillAzuriranje,
  stroke: strokeAzuriranje,
});
let vectorStyleAzuriranje = new ol.style.Style({
  fill: fillAzuriranje,
  stroke: strokeAzuriranje,
  image: circleAzuriranje,
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
  source: new ol.source.Vector({}),
  style: vectorStyleUnmatched,
});

let vektorKreiraniVodovi = new ol.layer.Vector({
  source: new ol.source.Vector({}),
  style: vectorStyleKreirani,
});
map.addLayer(vektorKreiraniVodovi);

let vektorKreiraniPonovo = new ol.layer.Vector({
  source: new ol.source.Vector({}),
  style: vectorStyleKreiranPonovo,
});
map.addLayer(vektorKreiraniPonovo);

let vectorKmlFocusedObject = new ol.layer.Vector({
  source: new ol.source.Vector({
    //features: features
  }),
  style: vectorStyleKreirani,
});
map.addLayer(vectorKmlFocusedObject);

let vektorObjektiZaAzuriranje = new ol.layer.Vector({
  id: "azuriranje",
  source: new ol.source.Vector({}),
  style: vectorStyleAzuriranje,
});
map.addLayer(vektorObjektiZaAzuriranje);

let vektorObjektiZaBrisanje = new ol.layer.Vector({
  id: "brisanje",
  source: new ol.source.Vector({}),
  style: vectorStyleBrisanje,
});
map.addLayer(vektorObjektiZaBrisanje);

/**
 * Metoda koja za naponski nivo trafostanice vraća odgovarajući nivo naponskog voda
 * @param {*} nivo
 */
function globalNaponskiNivoPrenosOdnos(nivo) {
  let retVal = "";
  if (["10/04", "10/0,4", "10/0,69", "6/0,4", "35/0.4", "35/0,4"].includes(nivo)) {
    retVal = "0.4";
  } else if (["10/10", "35/10", "35/6", "110/10"].includes(nivo)) {
    retVal = "10";
  } else if (["110/35", "35/35"].includes(nivo)) {
    retVal = "35";
  }
  return retVal;
}

/**
 * Metoda koja za naponski nivo vraća cql text za filter objekata prema iscrtanim poligonima i naponskom nivou
 * @param {Naponski nivo} nivo
 * @param { Tip objekta} sloj
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
  return retVal;
}

/**
 * Inicijalno popunjavanje svih ddl listi, za stubove, u zavisnosti od odabranog naponskog nivoa
 * @param { Naponski nivo} napon
 */
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

/**
 * Inicijalno popunjavanje svih ddl listi, za vodove, u zavisnosti od odabranog naponskog nivoa
 * @param { Naponski nivo} napon
 */
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

/**
 * Inicijalno popunjavanje svih ddl listi, za trafostanice, u zavisnosti od odabranog naponskog nivoa
 * @param { Naponski nivo} napon
 */
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

/**
 * Inicijalno popunjavanje svih ddl listi, za priključna mjesta
 */
function popuniListeZaPrikljucnaMjesta() {
  popuniDdlAtributima("#osiguraci", "prikljucno_mjesto", "osiguraci", "", "");

  popuniDdlAtributima("#pretraga_osiguraci", "prikljucno_mjesto", "osiguraci", "", "");
}

/**
 * Inicijalno popunjavanje svih ddl listi, za nkro
 */
function popuniListeZaNkro() {
  popuniDdlAtributima("#vrsta_materijal", "nkro", "materijal", "", "");
  popuniDdlAtributima("#montaza", "nkro", "montaza", "", "");
  popuniDdlAtributima("#vrata", "nkro", "vrata", "", "");

  popuniDdlAtributima("#pretraga_materijal", "nkro", "materijal", "", "");
  popuniDdlAtributima("#pretraga_montaza", "nkro", "montaza", "", "");
  popuniDdlAtributima("#pretraga_vrata", "nkro", "vrata", "", "");
}

window.addEventListener("load", function () {
  popuniListeZaStubove(NaponskiNivo.String04kV);
  popuniListeZaVodove(NaponskiNivo.String04kV);
  popuniListeZaTrafostanice(NaponskiNivo.String04kV);
  popuniListeZaPrikljucnaMjesta();
  popuniListeZaNkro();
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

/**
 * Metoda koja dodaje jedan zapis u drop down listu.
 * @param {*} ddl - dropdown id
 * @param {*} value - record value
 * @param {*} text - record text
 */
function fillDdl(ddl, value, text) {
  $("#" + ddl).append(
    $("<option>", {
      value: value,
      text: text,
    })
  );
}

/**
 * Metoda koja vraća true ukoliko je vlasnik objekata istovremeno i vlasnik vezan za logovanog korisnika
 * vlasnikObjekta može da bude prazan string, za objekte koji se tek unose
 * @param {Username logovanog korisnika} username
 * @param {Username vlasnika za koga je vezan logovani korisnik} vlasnik
 * @param {Username vlasnika koji se čita iz podataka} vlasnikObjekta
 * @returns
 */
function provjeraPravaUnosIzmjena(username, vlasnik, vlasnikObjekta) {
  let retval = false;
  if (username !== "" && vlasnik !== "" && vlasnik === vlasnikObjekta) {
    retval = true;
  } else {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.NedostatakPrava);
  }
  return retval;
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

/** Zatvara meni nakon odabira akcije, na malim ekranima */
function zatvoriHamburger() {
  let x = document.querySelector("#topNav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
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
  //console.log("poziv_web_servisa", urlServisa);
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
  featuresSnap = new ol.Collection(),
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

/**Funkcija koja prolazi kroz nizove tačaka, linija i polgiona i kreira CQL uslov u zavisnosti od odabranih opcija */
function kreiranjeCqlFilteraProstorno() {
  let retVal = "";
  let pretragaTacka = document.querySelector("#pretragaTacke").checked;
  let pretragaTackaUdaljenost = document.querySelector("#pretragaTackeUdaljenost").value;
  let pretragaLinije = document.querySelector("#pretragaLinije").checked;
  let pretragaPoligonObuhvata = document.querySelector("#pretragaPoligonObuhvata").checked;
  let pretragaPoligonPresijeca = document.querySelector("#pretragaPoligonPresijeca").checked;
  if (pretragaTacka && pretragaTackaUdaljenost === "") {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.UdaljenostZaPretragu);
    return false;
  }
  if (pretragaTacka && tacke.length === 0) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.TackaZaPretragu);
    return false;
  }
  if (pretragaLinije && linije.length === 0) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.LinijaZaPretragu);
    return false;
  }
  if ((pretragaPoligonPresijeca || pretragaPoligonObuhvata) && poligoni.length === 0) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.PoligonZaPretragu);
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

function openModalSpinner() {
  document.querySelector("#modalSpinner").style.display = "block";
  document.querySelector("#fadeSpinner").style.display = "block";
}

function closeModalSpinner() {
  document.querySelector("#modalSpinner").style.display = "none";
  document.querySelector("#fadeSpinner").style.display = "none";
}

//Ove dvije funkcije treba ukloniti nakon uklanjanjadocument.querySelector("#confirmPotvrdi").addEventListener
function confirmPotvrdi(funkcija) {
  document.querySelector("#modalConfirm").style.display = "none";
  brisanje();
}

function confirmOdustani() {
  document.querySelector("#modalConfirm").style.display = "none";
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
