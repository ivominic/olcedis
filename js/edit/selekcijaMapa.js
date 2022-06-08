/** Selekcije na mapi */

let nizGpxTacakaZaObradu = [];
let indexGpxTacakaZaObradu = 0;
let selektovaniDdlZaPovezivanjeVoda = "";
let nizPocetnihTacakaVoda = [],
  nizKrajnjihTacakaVoda = [],
  nizKrajnjihTacakaKml = [];
let nizTacakaLinije = [];

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
          let url = layer
            .getSource()
            .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:3857", {
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
  select.getFeatures().clear();
  console.log("feature111");
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  map.forEachFeatureAtPixel(pixel, function (feature) {
    console.log("feature", feature);
    //selektovaniWmsObjekat = null;
    if (feature.values_.name) {
      //To avoid dark blue dot that represents selected feature
      nizGpxTacakaZaObradu.push(feature);
      if (selektovaniDdlZaPovezivanjeVoda !== "") {
        $(selektovaniDdlZaPovezivanjeVoda).append(
          $("<option>", {
            value: feature.values_.name,
            text: feature.values_.name,
          })
        );
      }
    }
  });

  nizGpxTacakaZaObradu.forEach((el) => {
    //console.log("feature za priključno mjesto", el);
    if (el.values_.lejer === "prikljucno_mjesto") {
      if (!provjeraPostojanjaElementaDdla(document.querySelector("#prik_mjesto"), el.values_.id)) {
        //console.log("el za provjeru duplikata", el);
        //console.log("el.geometry.coordinates", el.values_.geometry.flatCoordinates);
        nizKoordinataPrikljucnihMjesta[el.values_.id] = el.values_.geometry.flatCoordinates;
        $("#prik_mjesto").append(
          $("<option>", {
            value: el.values_.id,
            text: el.values_.id,
          })
        );
      }
    }
  });

  if (!odabirSaMape) {
    if (nizGpxTacakaZaObradu.length > 1) {
      document.querySelector("#divPrethodniObjekat").style.display = "none";
      document.querySelector("#divSljedeciObjekat").style.display = "flex";
    } else {
      document.querySelector("#divPrethodniObjekat").style.display = "none";
      document.querySelector("#divSljedeciObjekat").style.display = "none";
    }
  }

  if (nizGpxTacakaZaObradu.length === 0) {
    map.on("singleclick", odabirSvihRasterObjekataKlik);
  }

  /*vectorSource.getFeatures().forEach(function (el) {
    if (el.values_.name === "065") {
      select.getFeatures().clear();
      select.getFeatures().push(el);
    }
  });*/
}

function sljedeciObjekatGpx() {
  if (nizGpxTacakaZaObradu.length > 0) {
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
      poruka("Uspjeh", "Ne postoji sljedeći objekat.");
    }
  } else {
    if (nizSelektovanihObjekata.length > 0) {
      console.log("Sljedeći objekat iz wms-a");
      indexGpxTacakaZaObradu++;
      if (indexGpxTacakaZaObradu < nizSelektovanihObjekata.length) {
        document.querySelector("#divPrethodniObjekat").style.display = "flex";
        if (indexGpxTacakaZaObradu == nizSelektovanihObjekata.length - 1) {
          document.querySelector("#divSljedeciObjekat").style.display = "none";
          document.querySelector("#divPrethodniObjekat").style.float = "none";
        } else {
          document.querySelector("#divSljedeciObjekat").style.display = "flex";
          document.querySelector("#divPrethodniObjekat").style.float = "left";
        }
        selektovaniWmsObjekat = nizSelektovanihObjekata[indexGpxTacakaZaObradu];
        console.log("Pouzvati metodu za prikaz podataka");
        prikazAtributaWmsLejer(selektovaniWmsObjekat);
      } else {
        indexGpxTacakaZaObradu--;
        poruka("Uspjeh", "Ne postoji sljedeći objekat.");
      }
    }
  }
}

function prethodniObjekatGpx() {
  if (nizGpxTacakaZaObradu.length > 0) {
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
      poruka("Uspjeh", "Ne postoji prethodni objekat.");
    }
  } else {
    if (nizSelektovanihObjekata.length > 0) {
      console.log("Prethodni objekat iz wms-a");
      indexGpxTacakaZaObradu--;
      if (indexGpxTacakaZaObradu >= 0) {
        document.querySelector("#divSljedeciObjekat").style.display = "flex";
        if (indexGpxTacakaZaObradu == 0) {
          document.querySelector("#divPrethodniObjekat").style.display = "none";
        } else {
          document.querySelector("#divPrethodniObjekat").style.display = "flex";
          document.querySelector("#divPrethodniObjekat").style.float = "left";
        }
        selektovaniWmsObjekat = nizSelektovanihObjekata[indexGpxTacakaZaObradu];
        prikazAtributaWmsLejer(selektovaniWmsObjekat);
      } else {
        indexGpxTacakaZaObradu++;
        poruka("Uspjeh", "Ne postoji prethodni objekat.");
      }
    }
  }
}

let select = new ol.interaction.Select({
  wrapX: false,
  hitTolerance: 5,
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
    if (!odabirSaMape) {
      prikazPodatakaIzGpxTacaka();
    }
  } else {
    if (!odabirSaMape) {
      if (selectGpxFeature.values_.name !== undefined) {
        document.querySelector("#gps").value = selectGpxFeature.values_.name;
        //Kad se klikne na kml objekat da provjeri da li postoji u blizini objekat na koji treba biti povezan.
        //Kml vodovi imaju definisan name property.
        //TODO: Dodati uslov da se ova provjera sprovodi samo ako lejer nije definisan, tj za nove objekte.
        if (!isEditable) {
          console.log("SELECT GXP FEATURE", selectGpxFeature);
          extractKmlFeatureEndPoints(selectGpxFeature).forEach(function (feature) {
            objectNearKmlFeature(selectGpxFeature, feature, "stubovi");
            objectNearKmlFeature(selectGpxFeature, feature, "trafostanice");
            objectNearKmlFeature(selectGpxFeature, feature, "vodovi");
            objectNearKmlFeature(selectGpxFeature, feature, "pod");
            objectNearKmlFeature(selectGpxFeature, feature, "nkro");
            objectNearKmlFeature(selectGpxFeature, feature, "prikljucno_mjesto");
            objectNearKmlFeature(selectGpxFeature, feature, "view_potrosaci");
          });
          showConnectForm();
        }
      } else {
        document.querySelector("#gps").value = "";
        //select.getFeatures().clear();
        //poruka("Upozorenje", "Potrebno je ponovo odabrati objekat sa mape.");
      }
    }
  }
  odabirSaMape = false;
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
  let coordinates = e.features.getArray()[0].values_.geometry.clone();
  console.log("koordinate m", position);
  let pocetniElement;
  nizKml.forEach((el) => {
    if (el.name === featureName) {
      pocetniElement = el;
      //pocetniElement = ol.proj.transform(el, "EPSG:3857", "EPSG:4326");
    }
  });
  if (isEditable) {
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
        poruka(
          "Upozorenje",
          "Tačka ne može biti pomjerena više od " + (dozvoljeniPomjeraj * 1000).toString() + "m od snimljene pozicije."
        );
      }
      //citajExtent();
    }
  } else {
    let original;
    originalKmlLines.forEach((item) => {
      console.log("ITEM", item);
      console.log(e.features.getArray()[0].ol_uid, item.ol_uid);
      if (e.features.getArray()[0].ol_uid === item.ol_uid) {
        original = item;
      }
    });

    let coordinates = e.features.getArray()[0].getGeometry().getCoordinates();

    if (coordinates.length !== original.coordinates.length) {
      e.features.getArray()[0].getGeometry().setCoordinates(original.coordinates);
      poruka(
        "Upozorenje",
        "Geometrija linije je izmijenjena na način da su joj dodate nove prelomne tačke, što nije dozvoljeno."
      );
      return false;
    }

    let isLineModifiedInMiddle = false;
    let isViolatedAllowedDistance = false;
    for (i = 1; i < coordinates.length - 1; i++) {
      if (coordinates[i][0] !== original.coordinates[i][0] || coordinates[i][1] !== original.coordinates[i][1]) {
        isLineModifiedInMiddle = true;
      }
    }
    if (isLineModifiedInMiddle) {
      e.features.getArray()[0].getGeometry().setCoordinates(original.coordinates);
      poruka("Upozorenje", "Nije dozvoljena izmjena geometrije linije, osim pomjeranjem krajnjih tačaka.");
      return false;
    }

    let coordinateLength = coordinates.length;
    let mjera = {
      units: "kilometers",
    };
    if (coordinates[0][0] !== original.coordinates[0][0] || coordinates[0][1] !== original.coordinates[0][1]) {
      let distancaOd = turf.point([coordinates[0][0], coordinates[0][1]]);
      let distancaDo = turf.point([original.coordinates[0][0], original.coordinates[0][1]]);
      let distanca = turf.distance(distancaOd, distancaDo, mjera);
      if (distanca > dozvoljeniPomjeraj) {
        isViolatedAllowedDistance = true;
      }
    }
    if (
      coordinates[coordinateLength - 1][0] !== original.coordinates[coordinateLength - 1][0] ||
      coordinates[coordinateLength - 1][1] !== original.coordinates[coordinateLength - 1][1]
    ) {
      let distancaOd = turf.point([coordinates[coordinateLength - 1][0], coordinates[coordinateLength - 1][1]]);
      let distancaDo = turf.point([
        original.coordinates[coordinateLength - 1][0],
        original.coordinates[coordinateLength - 1][1],
      ]);
      let distanca = turf.distance(distancaOd, distancaDo, mjera);
      if (distanca > dozvoljeniPomjeraj) {
        isViolatedAllowedDistance = true;
      }
    }

    if (isViolatedAllowedDistance) {
      e.features.getArray()[0].getGeometry().setCoordinates(original.coordinates);
      poruka("Upozorenje", "Tačka ne može biti pomjerena više od " + kmlRadius.toString() + "m od snimljene pozicije.");
      return false;
    }
  }
});

function prikazPodatakaIzGpxTacaka() {
  console.log("prikaz podataka iz GPX tačke", selectGpxFeature.get("lejer"));
  //if (selectGpxFeature.hasOwnProperty("lejer")) {
  //console.log("prikaz podataka iz GPX tačke", selectGpxFeature.get("lejer"));
  //prikazPanelaAtributa se nalazi u fajlu interakcija.js
  document.querySelector("#gps").value = selectGpxFeature.get("name");
  console.log("gpx vrijednost", selectGpxFeature.get("name"));
  if (selectGpxFeature.get("lejer") === "stubovi") {
    prikaziPoljaOdabranogGpxStuba();
    let pomLejer = "Stub 35KV";
    if (selectGpxFeature.get("napon") === "10") {
      pomLejer = "Stub 10KV";
    }
    if (selectGpxFeature.get("napon") === "0.4") {
      pomLejer = "Stub 04KV";
    }
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "trafostanice") {
    prikaziPoljaOdabraneGpxTrafostanice();
    let pomLejer = "Trafostanica 35KV";
    if (selectGpxFeature.get("napon") === "10") {
      pomLejer = "Trafostanica 10KV";
    }
    if (selectGpxFeature.get("napon") === "0.4") {
      pomLejer = "Trafostanica 04KV";
    }
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "vodovi") {
    //Ovo će trebati za poseban wfs lejer za iscrtane vodove
    prikaziPoljaOdabranogVoda();
    let pomLejer = "Vod 35KV";
    if (selectGpxFeature.get("napon") === "10") {
      pomLejer = "Vod 10KV";
    }
    if (selectGpxFeature.get("napon") === "0.4") {
      pomLejer = "Vod 04KV";
    }
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "nkro") {
    prikaziPoljaOdabranogGpxNKRO();
    let pomLejer = "NKRO";
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "prikljucno_mjesto") {
    prikaziPoljaOdabranogGpxPM();
    let pomLejer = "Priključno mjesto";
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "pod") {
    prikaziPoljaOdabranogGpxPod();
    let pomLejer = "POD";
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "potrosac") {
    prikaziPoljaOdabranogGpxPotrosac();
    let pomLejer = "Potrošač";
    prikazPanelaAtributa(pomLejer);
  }
}

let nizVodovaGpx = [];
/**
 * Metoda koja vrši selekciju stubova iz gpx fajla, koji upadaju u poligon
 */
function selekcijaGpxPoligonom() {
  nizTacakaLinije.length = 0;
  //console.log("vectorSource prije for each", featuresPolygon);
  //console.log("vectorSource prije for each array", featuresPolygon.array_);
  //console.log("vectorSource prije for each array[0]", featuresPolygon.array_[0].getGeometry());
  let minValue = minGpxName(vectorSource);
  let maxValue = maxGpxName(vectorSource);
  (minGpsPointName = 0), (maxGpsPointName = 0);
  let pocetnaTacka, krajnjaTacka;
  for (let i = minValue; i <= maxValue; i++) {
    vectorSource.getFeatures().forEach(function (el) {
      if (i === parseInt(el.values_.name)) {
        featuresPolygon.array_.forEach(function (poligon_el) {
          if (poligon_el.getGeometry().intersectsExtent(el.getGeometry().getExtent())) {
            //selectedFeatures.push(features[i]);
            if (!pocetnaTacka) {
              pocetnaTacka = el;
              minGpsPointName = i;
            }
            krajnjaTacka = el;
            maxGpsPointName = i;
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

  //TODO: Prevesti vod u feature i dodati propertije

  let vod = new ol.geom.LineString([nizTacakaLinije]);
  let format = new ol.format.WKT();

  let wktVod = format.writeGeometry(vod, {});
  wktVod = wktVod.replace(/ /g, "_");
  wktVod = wktVod.replace(/,/g, " ");
  wktVod = wktVod.replace(/_/g, ",");
  wktVod = wktVod.replace(",ZM", "");
  wktVod = wktVod.replace(",Z", "");
  let feature = format.readFeature(wktVod, {});
  //TODO: Ovdje dodati properties

  vektorKreiraniVodovi.getSource().clear();
  vektorKreiraniVodovi.getSource().addFeatures(nizVodovaGpx);
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

function sledecaGpxTacka() {
  let nijeOdabranaNovaTacka = true;
  if (document.querySelector("#divSljedeciObjekat").style.display !== "none") {
    return false;
  }
  document.querySelector("#divPrethodniObjekat").style.display = "none";
  vectorSource.getFeatures().forEach(function (el) {
    if (
      selectGpxFeature &&
      parseInt(el.values_.name) === parseInt(selectGpxFeature.values_.name) + 1 &&
      nijeOdabranaNovaTacka
    ) {
      console.log("postojeći ", parseInt(selectGpxFeature.values_.name));
      console.log("novi ", parseInt(el.values_.name));
      selectGpxFeature = el;
      select.getFeatures().clear();
      select.getFeatures().push(selectGpxFeature);
      nijeOdabranaNovaTacka = false;
      prikazPodatakaIzGpxTacaka();
    }
  });

  if (nijeOdabranaNovaTacka) {
    select.getFeatures().clear();
    selectGpxFeature = null;
  }

  nizGpxTacakaZaObradu.length = 0;
  if (selectGpxFeature) {
    vectorSource.getFeatures().forEach(function (el) {
      if (
        el.values_.geometry.flatCoordinates[0] === selectGpxFeature.values_.geometry.flatCoordinates[0] &&
        el.values_.geometry.flatCoordinates[1] === selectGpxFeature.values_.geometry.flatCoordinates[1]
      ) {
        //if (el.getGeometry() === selectGpxFeature.getGeometry()) {
        console.log("prva geom", el);
        console.log("druga geom", selectGpxFeature);
        nizGpxTacakaZaObradu.push(el);
        if (nizGpxTacakaZaObradu.length > 1) {
          document.querySelector("#divSljedeciObjekat").style.display = "flex";
        }
      }
    });
  }
}

function odabirPocetneTackeVoda() {
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  selektovaniDdlZaPovezivanjeVoda = "#ddlPocetnaTackaVodovi";
  nizPocetnihTacakaVoda.length = 0;
  $(selektovaniDdlZaPovezivanjeVoda).empty();
  map.on("singleclick", klikNaRastereZaVodove);
}

function odabirKrajnjeTackeVoda() {
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  selektovaniDdlZaPovezivanjeVoda = "#ddlKrajnjaTackaVodovi";
  nizKrajnjihTacakaVoda.length = 0;
  $(selektovaniDdlZaPovezivanjeVoda).empty();
  map.on("singleclick", klikNaRastereZaVodove);
}

function odabirTackePovezivanjaKmla() {
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  selektovaniDdlZaPovezivanjeVoda = "#ddlObjekatZaPovezivanje";
  //nizKrajnjihTacakaKml.length = 0;//Nepotrebno
  $(ddlObjekatZaPovezivanje).empty();
  map.on("singleclick", klikNaRastereZaVodove);
}

/**
 * Ukoliko je odabran vod koji se formira od gpx i postojećih tačaka, finalno formiranje niza se radi u dodajWmsObjekte metodi
 * Tamo se objedinjavaju tačke iz oba izvora i ponovo poziva metoda koordinateObjekataIzDdlova
 */
function potvrdaUnosaVoda() {
  selekcijaGpxPoligonom();
  if (document.querySelector("#chkMjesovitiVod").checked) {
    dodajWmsObjekte();
  } else {
    koordinateObjekataIzDdlova();
  }
}

function klikNaRastereZaVodove(browserEvent) {
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  let brojLejera = 0;
  let tempNiz = [];
  map.forEachLayerAtPixel(pixel, function (layer) {
    if (layer instanceof ol.layer.Image) {
      console.log(layer.values_.name);
      //let title = layer.get("title");
      let vidljivost = layer.get("visible");
      if (vidljivost) {
        brojLejera++;
        let url = layer
          .getSource()
          .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
            INFO_FORMAT: "application/json",
            feature_count: "5",
          });
        if (url) {
          fetch(url)
            .then(function (response) {
              //restartovanje();
              //let features = new ol.format.GeoJSON().readFeatures(response);
              return response.text();
            })
            .then(function (json) {
              brojLejera--;
              let odgovor = JSON.parse(json);
              if (odgovor.features.length > 0) {
                odabirSaMape = false;
                console.log(odgovor.features);
                odgovor.features.forEach(function (el) {
                  tempNiz.push(el);
                  console.log("el", el);
                });
              }

              if (brojLejera === 0) {
                //dodati wms objekte u padajuću listu
                if (selektovaniDdlZaPovezivanjeVoda === "#ddlPocetnaTackaVodovi") {
                  nizPocetnihTacakaVoda = tempNiz.slice();
                }
                if (selektovaniDdlZaPovezivanjeVoda === "#ddlKrajnjaTackaVodovi") {
                  nizKrajnjihTacakaVoda = tempNiz.slice();
                }
                tempNiz.forEach((el) => {
                  console.log("el čitanje", el);
                  //let newId = el.id.split(".")[0] + "." + el.values_.originalId;
                  let newId = el.id.split(".")[0] + "." + el.properties.originalId;

                  $(selektovaniDdlZaPovezivanjeVoda).append(
                    $("<option>", {
                      value: newId,
                      text: newId,
                    })
                  );
                });
                //Ukloniti metodu koja se poziva na klik
                map.un("singleclick", klikNaRastereZaVodove);
                selektovaniDdlZaPovezivanjeVoda = "";
              }
            });
        }
      }
    }
  });
}

function klikNaRastereZaOdabirPrikljucnogMjesta(browserEvent) {
  let coordinate = browserEvent.coordinate;
  let tempNiz = [];
  let url = wmsPrikljucnoMjesto
    .getSource()
    .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
      INFO_FORMAT: "application/json",
      feature_count: "5",
    });
  if (url) {
    fetch(url)
      .then(function (response) {
        return response.text();
      })
      .then(function (json) {
        let odgovor = JSON.parse(json);
        if (odgovor.features.length > 0) {
          console.log(odgovor.features);
          odabirSaMape = false;

          odgovor.features.forEach(function (el) {
            //console.log("el.geometry.coordinates", el.geometry.coordinates);
            nizKoordinataPrikljucnihMjesta[el.properties.id] = el.geometry.coordinates;
            tempNiz.push(el);
          });
        }

        tempNiz.forEach((el) => {
          $(prik_mjesto).append(
            $("<option>", {
              value: el.properties.id,
              text: "prikljucno mjesto:" + el.properties.id,
            })
          );
        });
        //Ukloniti metodu koja se poziva na klik
        map.un("singleclick", klikNaRastereZaOdabirPrikljucnogMjesta);
      });
  }
}

function koordinateObjekataIzDdlova() {
  let pocetna = document.querySelector("#ddlPocetnaTackaVodovi").value;
  let krajnja = document.querySelector("#ddlKrajnjaTackaVodovi").value;
  let koordinatePocetna, koordinateKrajnja;
  if (pocetna) {
    if (pocetna.includes(".")) {
      nizPocetnihTacakaVoda.forEach((el) => {
        if (el.id === pocetna) {
          koordinatePocetna = [el.geometry.coordinates[0], el.geometry.coordinates[1]];
        }
      });
    } else {
      vectorSource.getFeatures().forEach(function (el) {
        if (el.values_.name === pocetna) {
          //koordinatePocetna = el.values_.geometry.flatCoordinates;
          koordinatePocetna = [el.values_.geometry.flatCoordinates[0], el.values_.geometry.flatCoordinates[1]];
          /*console.log("gpx iz prve liste ", el);
          let position = el.values_.geometry.flatCoordinates;
          console.log(position[0], position[1]);*/
        }
      });
    }
  }
  if (krajnja) {
    if (krajnja.includes(".")) {
      nizKrajnjihTacakaVoda.forEach((el) => {
        if (el.id === krajnja) {
          koordinateKrajnja = [el.geometry.coordinates[0], el.geometry.coordinates[1]];
          /*console.log("bbb", el.geometry.coordinates);
          console.log(el.geometry.coordinates[0], el.geometry.coordinates[1]);*/
        }
      });
    } else {
      vectorSource.getFeatures().forEach(function (el) {
        if (el.values_.name === krajnja) {
          //koordinateKrajnja = el.values_.geometry.flatCoordinates;
          koordinateKrajnja = [el.values_.geometry.flatCoordinates[0], el.values_.geometry.flatCoordinates[1]];
          /*let position = el.values_.geometry.flatCoordinates;
          console.log(position[0], position[1]);*/
        }
      });
    }
  }
  pridruzivanjeKoordinataNizuVoda(koordinatePocetna, koordinateKrajnja);
}

/**
 * Metoda koja, ukoliko postoje, tačke iz padajućih listi dodjeljuje najbljižim krajnjim tačkama voda.
 * Korisnik može da unese redni broj tačke kojoj je potrebno pridružiti odabranu tačku.
 * Te vrijednosti mogu biti mininalni ili maksimalni redni broj niza tačaka iz kojih se formira vod.
 * @param {koordinate tačke koja je selektovana iz prve liste krajnjih tačaka voda} pocetna
 * @param {koordinate tačke koja je selektovana iz druge liste krajnjih tačaka voda} krajnja
 * @returns
 */
function pridruzivanjeKoordinataNizuVoda(pocetna, krajnja) {
  if (nizTacakaLinije.length === 0) {
    poruka("Upozorenje", "Potrebno je selektovati tačke za kreiranje voda.");
    return false;
  }
  let foundPocetna = nizTacakaLinije.some((r) => JSON.stringify(r) === JSON.stringify(pocetna));
  let foundKrajnja = nizTacakaLinije.some((r) => JSON.stringify(r) === JSON.stringify(krajnja));
  if (foundPocetna) {
    poruka("Upozorenje", "Početna tačka ne može biti dio voda koji je potrebno kreirati.");
    return false;
  }
  if (foundKrajnja) {
    poruka("Upozorenje", "Krajnja tačka ne može biti dio voda koji je potrebno kreirati.");
    return false;
  }

  let startGpxValue = document.querySelector("#txtPocetnaTackaVodovi").value;
  let endGpxValue = document.querySelector("#txtKrajnjaTackaVodovi").value;
  let options = { units: "miles" };
  if (startGpxValue || endGpxValue) {
    if (startGpxValue && endGpxValue) {
      if (startGpxValue === endGpxValue) {
        poruka("Upozorenje", "Redni brojevi tačaka koje se povezuju na elemente mreže ne mogu biti isti.");
        return false;
      }
      if (startGpxValue !== minGpsPointName && startGpxValue !== maxGpsPointName) {
        poruka("Upozorenje", "Vrijednost treba da bude minimalna ili maksimalna vrijednost selektovanih tačaka.");
        return false;
      }
      if (parseInt(endGpxValue) !== minGpsPointName && parseInt(endGpxValue) !== maxGpsPointName) {
        poruka("Upozorenje", "Vrijednost treba da bude minimalna ili maksimalna vrijednost selektovanih tačaka.");
        return false;
      }
      if (parseInt(startGpxValue) < parseInt(endGpxValue)) {
        nizTacakaLinije.push(krajnja);
        nizTacakaLinije.unshift(pocetna);
      } else {
        nizTacakaLinije.unshift(krajnja);
        nizTacakaLinije.push(pocetna);
      }
    } else {
      if (startGpxValue) {
        if (parseInt(startGpxValue) !== minGpsPointName && parseInt(startGpxValue) !== maxGpsPointName) {
          poruka("Upozorenje", "Vrijednost treba da bude minimalna ili maksimalna vrijednost selektovanih tačaka.");
          return false;
        }
        if (parseInt(startGpxValue) === minGpsPointName) {
          //nizTacakaLinije.push(krajnja);
          nizTacakaLinije.unshift(pocetna);
        } else {
          nizTacakaLinije.push(pocetna);
          //nizTacakaLinije.unshift(krajnja);
        }
      }
      if (endGpxValue) {
        if (parseInt(endGpxValue) !== minGpsPointName && parseInt(endGpxValue) !== maxGpsPointName) {
          poruka("Upozorenje", "Vrijednost treba da bude minimalna ili maksimalna vrijednost selektovanih tačaka.");
          return false;
        }
        if (parseInt(endGpxValue) === minGpsPointName) {
          //nizTacakaLinije.push(pocetna);
          nizTacakaLinije.unshift(krajnja);
        } else {
          nizTacakaLinije.push(krajnja);
          //nizTacakaLinije.unshift(pocetna);
        }
      }
    }
  } else {
    if (pocetna && pocetna !== undefined && pocetna.length && krajnja && krajnja !== undefined && krajnja.length) {
      //Ako su selektovani i nadređeni i podređeni objekat
      if (
        turf.distance(turf.point(pocetna), turf.point(nizTacakaLinije[0]), options) >
        turf.distance(turf.point(krajnja), turf.point(nizTacakaLinije[0]), options)
      ) {
        nizTacakaLinije.unshift(krajnja);
        nizTacakaLinije.push(pocetna);
      } else {
        nizTacakaLinije.push(krajnja);
        nizTacakaLinije.unshift(pocetna);
      }
    } else {
      if (pocetna && pocetna !== undefined && pocetna.length) {
        if (
          turf.distance(turf.point(pocetna), turf.point(nizTacakaLinije[0]), options) >
          turf.distance(turf.point(pocetna), turf.point(nizTacakaLinije[nizTacakaLinije.length - 1]), options)
        ) {
          nizTacakaLinije.push(pocetna);
        } else {
          nizTacakaLinije.unshift(pocetna);
        }
      }
      if (krajnja && krajnja !== undefined && krajnja.length) {
        if (
          turf.distance(turf.point(krajnja), turf.point(nizTacakaLinije[0]), options) >
          turf.distance(turf.point(krajnja), turf.point(nizTacakaLinije[nizTacakaLinije.length - 1]), options)
        ) {
          nizTacakaLinije.push(krajnja);
        } else {
          nizTacakaLinije.unshift(krajnja);
        }
      }
    }
  }

  //Iscrtavanje voda
  let vod = new ol.geom.LineString([nizTacakaLinije]);
  let format = new ol.format.WKT();
  let wktVod = format.writeGeometry(vod, {});
  wktVod = wktVod.replace(/ /g, "_");
  wktVod = wktVod.replace(/,/g, " ");
  wktVod = wktVod.replace(/_/g, ",");
  wktVod = wktVod.replace(",ZM", "");
  wktVod = wktVod.replace(",Z", "");
  var feature = format.readFeature(wktVod, {});
  dodajPoljaUcrtanomVodu(feature);
  nizVodovaGpx.push(feature);
  vektorKreiraniVodovi.getSource().clear();
  vektorKreiraniVodovi.getSource().addFeatures(nizVodovaGpx);
  restartNakonUnosaVoda();
  map.removeInteraction(modify);
  map.removeInteraction(modifyV);
}

function restartNakonUnosaVoda() {
  nizTacakaLinije.length = 0;
  selektovaniDdlZaPovezivanjeVoda = "";
  $("#ddlPocetnaTackaVodovi").empty();
  $("#ddlKrajnjaTackaVodovi").empty();
  nizPocetnihTacakaVoda.length = 0;
  nizKrajnjihTacakaVoda.length = 0;
  closeDiv("#odabirPoveznicaDiv");
  brisanje();
  document.querySelector("#txtPocetnaTackaVodovi").value = "";
  document.querySelector("#txtKrajnjaTackaVodovi").value = "";
}

function odabirNapojneTrafostaniceSaMape() {
  document.querySelector("#btnOdabirNapojneTrafostanice").className = "dugmeodabirmapa greenClass";
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  map.on("singleclick", klikNapojnaTrafostanicaMapa);
}

function klikNapojnaTrafostanicaMapa(browserEvent) {
  document.querySelector("#btnOdabirNapojneTrafostanice").className = "dugmeodabirmapa";
  blnShowAttribute = false;
  let url = wmsTrafostanice
    .getSource()
    .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
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
        map.un("singleclick", klikNapojnaTrafostanicaMapa);
        if (
          odgovor.features[0].properties.id_billing !== null &&
          odgovor.features[0].properties.id_billing !== "null" &&
          odgovor.features[0].properties.id_billing.length >= 6 &&
          odgovor.features[0].properties.id_billing.length <= 8
        ) {
          pretragaTrafostanicaGpx(odgovor.features[0].properties.id_billing);
        } else {
          poruka("Upozorenje", "Nije odabrana trafostanica koja ima šifru iz bilinga.");
        }
      });
  }
}

function odabirPrikljucnogMjestaZaUnosPotrosaca() {
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  nizKoordinataPrikljucnihMjesta = {};
  $(prik_mjesto).empty();
  map.on("singleclick", klikNaRastereZaOdabirPrikljucnogMjesta);
}

/**
 * Metoda koja popunjava niz featurima koje pročita iz raster lejera na mapi.
 * @param {*} browserEvent
 */
function odabirSvihRasterObjekataKlik(browserEvent) {
  console.log("odabirSvihRasterObjekataKlik");
  //TODO: Dodati loader dok se ne završi učitavanje podataka
  nizSelektovanihObjekata.length = 0;
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  let brojLejera = 0;
  map.forEachLayerAtPixel(pixel, function (layer) {
    if (layer instanceof ol.layer.Image) {
      //console.log(layer.values_.name);
      //Ne razmatramo nelegalne potrošače za prikaz
      if (layer.get("visible") && !layer.values_.name.startsWith("nelegalni_potrosac")) {
        brojLejera++;
        let url = layer
          .getSource()
          .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
            INFO_FORMAT: "application/json",
            feature_count: "10",
          });
        if (url) {
          fetch(url)
            .then(function (response) {
              return response.text();
            })
            .then(function (json) {
              brojLejera--;
              let odgovor = JSON.parse(json);
              if (odgovor.features.length > 0) {
                odabirSaMape = false;
                odgovor.features.forEach(function (el) {
                  nizSelektovanihObjekata.push(el);
                  console.log("el", el);
                });
              }

              if (brojLejera === 0) {
                //Ukloniti metodu koja se poziva na klik
                !odabirSaMape && map.un("singleclick", odabirSvihRasterObjekataKlik);
                //console.log("Svi selektovani objekti", nizSelektovanihObjekata);
                //TODO: Pozvati metodu koja će vršiti prikaz atributa objekta.
                prikazAtributaSelektovanihObjekata();
              }
            });
        }
      }
    }
  });
}
