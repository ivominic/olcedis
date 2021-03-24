/** Selekcije na mapi */

let nizGpxTacakaZaObradu = [];
let indexGpxTacakaZaObradu = 0;

function klikNaRastere(browserEvent) {
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  console.log("akcija", akcija);
  if (akcija === "atributi") {
    map.forEachLayerAtPixel(pixel, function (layer) {
      if (layer instanceof ol.layer.Image) {
        console.log(layer);
        let title = layer.get("title");
        console.log("title", title);
        let vidljivost = layer.get("visible");
        console.log("vidljivost", vidljivost);
        if (vidljivost) {
          let url = layer.getSource().getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:3857", {
            INFO_FORMAT: "application/json",
          });
          if (url) {
            fetch(url)
              .then(function (response) {
                //restartovanje();
                return response.text();
              })
              .then(function (json) {
                let odgovor = JSON.parse(json);
                if (odgovor.features.length > 0) {
                  if (akcija == "slika") {
                    prikazFotografija(title, odgovor.features[0][0].id);
                  }
                }
              });
          }
        }
      }
    });
  }
}

function klikNaVektore(browserEvent) {
  nizGpxTacakaZaObradu.length = 0;
  indexGpxTacakaZaObradu = 0;
  console.log("feature111");
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  map.forEachFeatureAtPixel(pixel, function (feature) {
    console.log("feature", feature);
    nizGpxTacakaZaObradu.push(feature);
  });
  if (nizGpxTacakaZaObradu.length > 1) {
    document.querySelector("#divPrethodniObjekat").style.display = "none";
    document.querySelector("#divSljedeciObjekat").style.display = "flex";
  } else {
    document.querySelector("#divPrethodniObjekat").style.display = "none";
    document.querySelector("#divSljedeciObjekat").style.display = "none";
  }

  /*vectorSource.getFeatures().forEach(function (el) {
    if (el.values_.name === "065") {
      select.getFeatures().clear();
      select.getFeatures().push(el);
    }
  });*/
}

function sljedeciObjekatGpx() {
  indexGpxTacakaZaObradu++;
  if (indexGpxTacakaZaObradu < nizGpxTacakaZaObradu.length) {
    document.querySelector("#divPrethodniObjekat").style.display = "flex";
    if (indexGpxTacakaZaObradu == nizGpxTacakaZaObradu.length - 1) {
      document.querySelector("#divSljedeciObjekat").style.display = "none";
      document.querySelector("#divPrethodniObjekat").style.float = "none";
    } else {
      document.querySelector("#divSljedeciObjekat").style.display = "flex";
      document.querySelector("#divPrethodniObjekat").style.float = "left";
    }
    select.getFeatures().clear();
    select.getFeatures().push(nizGpxTacakaZaObradu[indexGpxTacakaZaObradu]);
    //Za prikaz atributa stuba
    selectGpxFeature = nizGpxTacakaZaObradu[indexGpxTacakaZaObradu];
    prikazPodatakaIzGpxTacaka();
  } else {
    indexGpxTacakaZaObradu--;
    alert("Kraj niza.");
  }
}

function prethodniObjekatGpx() {
  indexGpxTacakaZaObradu--;
  if (indexGpxTacakaZaObradu >= 0) {
    document.querySelector("#divSljedeciObjekat").style.display = "flex";
    if (indexGpxTacakaZaObradu == 0) {
      document.querySelector("#divPrethodniObjekat").style.display = "none";
    } else {
      document.querySelector("#divPrethodniObjekat").style.display = "flex";
      document.querySelector("#divPrethodniObjekat").style.float = "left";
    }
    select.getFeatures().clear();
    select.getFeatures().push(nizGpxTacakaZaObradu[indexGpxTacakaZaObradu]);
    //Za prikaz atributa stuba
    selectGpxFeature = nizGpxTacakaZaObradu[indexGpxTacakaZaObradu];
    prikazPodatakaIzGpxTacaka();
  } else {
    indexGpxTacakaZaObradu++;
    alert("Kraj niza.");
  }
}

//Select stari način

let select = new ol.interaction.Select({
  wrapX: false,
});

select.on("select", function (e) {
  //console.log("select target", e.target.getFeatures().array_[0].values_.name);
  console.log("select target", e.target.getFeatures());
  selectGpxFeature = e.target.getFeatures().array_[0];
  console.log("gpx feature", selectGpxFeature);
  //if (selectGpxFeature.hasOwnProperty("lejer")) {
  if (!selectGpxFeature) {
    return false;
  }
  if (selectGpxFeature.values_.lejer) {
    //Popuni polja vrijednostima
    console.log("ulazi ovdje", selectGpxFeature.get("lejer"));
    prikazPodatakaIzGpxTacaka();
  } else {
    //Za sad ništa - da li prazniti polja?
    document.querySelector("#gps").value = selectGpxFeature.values_.name;
  }
  /*if (blnZavrsniStub) {
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
  }*/
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
    prikaziPoljaOdabraneGpxTrafostanice();
    let pomLejer = "Trafostanica 35KV";
    if (selectGpxFeature.get("nivo") === "10") {
      pomLejer = "Trafostanica 10KV";
    }
    prikazPanelaAtributa(pomLejer);
  }
}

let nizVodovaGpx = [];
/**
 * Metoda koja vrši selekciju stubova iz gpx fajla, koji upadaju u poligon
 */
function selekcijaGpxPoligonom() {
  let nizTacakaLinije = [];

  //console.log("vectorSource prije for each", featuresPolygon);
  //console.log("vectorSource prije for each array", featuresPolygon.array_);
  //console.log("vectorSource prije for each array[0]", featuresPolygon.array_[0].getGeometry());
  let minValue = minGpxName(vectorSource);
  let maxValue = maxGpxName(vectorSource);
  let pocetnaTacka, krajnjaTacka;
  for (let i = minValue; i <= maxValue; i++) {
    vectorSource.getFeatures().forEach(function (el) {
      if (i === parseInt(el.values_.name)) {
        featuresPolygon.array_.forEach(function (poligon_el) {
          if (poligon_el.getGeometry().intersectsExtent(el.getGeometry().getExtent())) {
            //selectedFeatures.push(features[i]);
            if (!pocetnaTacka) {
              pocetnaTacka = el;
            }
            krajnjaTacka = el;
            let position = el.values_.geometry.flatCoordinates;
            let elevacija = position[2];
            elevacija > 3000 && (elevacija = 0);
            //let found = nizTacakaLinije.some((r) => JSON.stringify(r) === JSON.stringify([position[0], position[1], elevacija]));
            let found = nizTacakaLinije.some((r) => JSON.stringify(r) === JSON.stringify([position[0], position[1]]));
            if (!found) {
              //nizTacakaLinije.push([position[0], position[1], elevacija]);
              nizTacakaLinije.push([position[0], position[1]]);
            }
          }
        });
      }
    });
  }

  /*vectorSource.getFeatures().forEach(function (el) {
    featuresPolygon.array_.forEach(function (poligon_el) {
      if (poligon_el.getGeometry().intersectsExtent(el.getGeometry().getExtent())) {
        //selectedFeatures.push(features[i]);
        console.log(el.values_.name, el);
        let position = el.values_.geometry.flatCoordinates;
        let elevacija = position[2];
        elevacija > 3000 && (elevacija = 0);
        let found = nizTacakaLinije.some((r) => JSON.stringify(r) === JSON.stringify([position[0], position[1], elevacija]));
        if (!found) {
          //nizTacakaLinije.push([position[0], position[1], elevacija]);
          nizTacakaLinije.push([position[0], position[1]]);
        }
      }
    });
  });*/

  //TODO: očitavanje tačaka
  //let udaljenost = pocetnaTacka.distanceTo(krajnjaTacka);

  //TODO: Brisati iscrtane poligone nakon selekcije

  //TODO: Prevesti vod u feature i dodati propertije

  let vod = new ol.geom.LineString([nizTacakaLinije]);
  /*let feature = new ol.Feature({
    name: "Novi vod",
    geometry: vod,
  });
  vektorKreiraniVodovi.getSource().clear();
  vektorKreiraniVodovi.getSource().addFeature(feature);*/

  let format = new ol.format.WKT();

  let wktVod = format.writeGeometry(vod, {});
  wktVod = wktVod.replace(/ /g, "_");
  wktVod = wktVod.replace(/,/g, " ");
  wktVod = wktVod.replace(/_/g, ",");
  alert(wktVod);
  var feature = format.readFeature(wktVod, {});

  nizVodovaGpx.push(feature);

  vektorKreiraniVodovi.getSource().clear();
  //vektorKreiraniVodovi.getSource().addFeatures(feature);
  vektorKreiraniVodovi.getSource().addFeatures(nizVodovaGpx);

  //console.log("wkt", wktVod);
  //console.log("kreirani niz koordinata", vod);
}

function minGpxName(tacke) {
  let retval = 99999;
  tacke.getFeatures().forEach(function (el) {
    parseInt(el.values_.name) < retval && (retval = parseInt(el.values_.name));
  });
  return retval;
}

function maxGpxName(tacke) {
  let retval = 0;
  tacke.getFeatures().forEach(function (el) {
    parseInt(el.values_.name) > retval && (retval = parseInt(el.values_.name));
  });
  return retval;
}
