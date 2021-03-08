/** Selekcije na mapi */

let select = new ol.interaction.Select({
  wrapX: false,
});

select.on("select", function (e) {
  //console.log("select target", e.target.getFeatures().array_[0].values_.name);
  console.log("select target", e.target.getFeatures());
  selectGpxFeature = e.target.getFeatures().array_[0];
  console.log("gpx feature", selectGpxFeature);
  //if (selectGpxFeature.hasOwnProperty("lejer")) {
  if (selectGpxFeature.values_.lejer) {
    //Popuni polja vrijednostima
    console.log("ulazi ovdje", selectGpxFeature.get("lejer"));
    prikazPodatakaIzGpxTacaka();
  } else {
    //Za sad ništa - da li prazniti polja?
  }
  if (blnZavrsniStub) {
    blnZavrsniStub = false;
    vrijednostKrajnjeTacke = parseInt(e.target.getFeatures().array_[0].values_.name);
    poruka("Uspjeh", "Završni stub voda je " + e.target.getFeatures().array_[0].values_.name);
  }
  if (blnPocetniStub) {
    blnPocetniStub = false;
    vrijednostPocetneTacke = parseInt(e.target.getFeatures().array_[0].values_.name);
    poruka("Uspjeh", "Početni stub voda je " + e.target.getFeatures().array_[0].values_.name);
  }
  if (vrijednostPocetneTacke > 0 && vrijednostKrajnjeTacke > 0 && vrijednostPocetneTacke !== vrijednostKrajnjeTacke) {
    kreirajVod(vrijednostPocetneTacke, vrijednostKrajnjeTacke);
  }
});

var modifyV = new ol.interaction.Modify({
  condition: false,
  features: select.getFeatures(),
});

modifyV.on("modifyend", function (e) {
  let featureName = e.features.getArray()[0].values_.name;

  console.log("select m", e.features.getArray()[0].values_);
  console.log("ime tačke m", e.features.getArray()[0].values_.name);
  //console.log("koordinate", e.selected[0].values_.geometry.flatCoordinates);
  //let position = ol.proj.transform(e.features.getArray()[0].values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326");
  let position = e.features.getArray()[0].values_.geometry.flatCoordinates;
  console.log("koordinate m", position);
  let pocetniElement;
  nizKml.forEach((el) => {
    if (el.name === featureName) {
      pocetniElement = el;
      //pocetniElement = ol.proj.transform(el, "EPSG:3857", "EPSG:4326");
    }
  });
  if (pocetniElement) {
    //pocetniElement = ol.proj.transform(pocetniElement, "EPSG:3857", "EPSG:4326");
    let pocetnaTacka = new ol.geom.Point(ol.proj.fromLonLat([pocetniElement.lng, pocetniElement.lat], "EPSG:4326"));
    //let pocetnaTacka = new ol.geom.Point(ol.proj.fromLonLat([pocetniElement.lng, pocetniElement.lat]));
    //let pocetnaTacka = new ol.geom.Point(ol.proj.fromLonLat([pocetniElement.lng, pocetniElement.lat], "EPSG:3857", "EPSG:4326"));
    //pocetnaTacka = ol.proj.transform(pocetnaTacka, "EPSG:3857", "EPSG:4326");
    let distancaOd = turf.point([position[0], position[1]]);
    let distancaDo = turf.point([pocetniElement.lng, pocetniElement.lat]);
    let mjera = {
      units: "kilometers",
    };
    let distanca = turf.distance(distancaOd, distancaDo, mjera);
    console.log("distanca", distanca);
    if (distanca > dozvoljeniPomjeraj) {
      e.features.getArray()[0].getGeometry().setCoordinates(pocetnaTacka.flatCoordinates);
      poruka("Upozorenje", "Tačka ne može biti pomjerena više od " + (dozvoljeniPomjeraj * 1000).toString() + "m od snimljene pozicije.");
    }
    //citajExtent();
  }
});

modifyV.on("change", function (e) {
  console.log("koordinate", e.selected[0].values_.geometry.flatCoordinates);
  let position = ol.proj.transform(e.features.getArray()[0].values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326");
  console.log("koordinate c", position);
});

map.addInteraction(select);
map.addInteraction(modifyV);

function prikazPodatakaIzGpxTacaka() {
  console.log("prikaz podataka iz GPX tačke", selectGpxFeature.get("lejer"));
  //if (selectGpxFeature.hasOwnProperty("lejer")) {
  //console.log("prikaz podataka iz GPX tačke", selectGpxFeature.get("lejer"));
  //prikazPanelaAtributa se nalazi u fajlu interakcija.js
  if (selectGpxFeature.get("lejer") === "stubovi") {
    prikaziPoljaOdabranogGpxStuba();
    let pomLejer = "Stub 35KV";
    if (selectGpxFeature.get("nivo") === "10") {
      pomLejer = "Stub 10KV";
    }
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "trafostanice") {
    popuniKontroleIzTrafostanice();
    let pomLejer = "Trafostanica 35KV";
    if (selectGpxFeature.get("nivo") === "10") {
      pomLejer = "Trafostanica 10KV";
    }
    prikazPanelaAtributa(pomLejer);
  }
}
