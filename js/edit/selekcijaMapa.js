/** Selekcije na mapi */

let nizGpxTacakaZaObradu = [];
let indexGpxTacakaZaObradu = 0;
let selektovaniDdlZaPovezivanjeVoda = "";
let nizPocetnihTacakaVoda = [],
  nizKrajnjihTacakaVoda = [],
  nizKrajnjihTacakaKml = [];
let nizTacakaLinije = [];
let promiseArrayNew = [];
let odgovorJson = [];

async function klikNaVektore(browserEvent) {
  console.log("Akcija: " + akcija);
  nizGpxTacakaZaObradu.length = 0;
  indexGpxTacakaZaObradu = 0;
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);

  if (akcija === "information") {
    let atributesAccordion = document.querySelector("#atributesAccordion");
    atributesAccordion.innerHTML = "";
    map.forEachLayerAtPixel(pixel, function (layer) {
      let title = layer.get("title");
      let vidljivost = layer.get("visible");
      if (layer instanceof ol.layer.Image) {
        if (vidljivost) {
          let url = layer
            .getSource()
            .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
              INFO_FORMAT: "application/json",
              feature_count: "50",
            });
          if (url) {
            fetch(url)
              .then(function (response) {
                return response.text();
              })
              .then(function (json) {
                let odgovor = JSON.parse(json);
                if (odgovor.features.length > 0) {
                  popuniInformacije(odgovor, title);
                }
              });
          }
        }
      }
    });
  } else {
    map.forEachFeatureAtPixel(pixel, function (feature) {
      console.log("feature", feature);
      //selektovaniWmsObjekat = null;
      //nizGpxTacakaZaObradu.push(feature);
      if (
        (feature.values_.name || feature.values_.lejer) &&
        !["brisanje", "azuriranje"].includes(feature.values_.lejer)
      ) {
        //To avoid dark blue dot that represents selected feature
        nizGpxTacakaZaObradu.push(feature);
        selektovaniWmsObjekat = null;
        blnIsChange = false;
        //Izvukao iznad if uslova, jer gpx koji postane TS nema name i nije prikazivao atribute
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
      if (el.values_.lejer === Podsloj.PrikljucnoMjesto) {
        if (!provjeraPostojanjaElementaDdla(document.querySelector("#prik_mjesto"), el.values_?.skriveni_id_pm)) {
          nizKoordinataPrikljucnihMjesta[el.values_.skriveni_id_pm] = el.values_.geometry.flatCoordinates;
          $("#prik_mjesto").append(
            $("<option>", {
              value: el.values_?.skriveni_id_pm,
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
    } else {
      document.querySelector("#divPrethodniObjekat").style.display = "none";
      document.querySelector("#divSljedeciObjekat").style.display = "none";
    }

    if (nizGpxTacakaZaObradu.length === 0 || odabirPrikljucnogMjestaSaMape) {
      map.on("singleclick", odabirSvihRasterObjekataKlik);
    }
  }
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
      if (!selectGpxFeature.get("lejer")) {
        poruka(StatusPoruke.Uspjeh, UnosPoruke.NeobradjenaGpxTacka);
      }
      prikazPodatakaIzGpxTacaka();
    } else {
      indexGpxTacakaZaObradu--;
      poruka(StatusPoruke.Uspjeh, UnosPoruke.NemaSledecegObjekta);
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
        prikazAtributaWmsLejer(selektovaniWmsObjekat);
      } else {
        indexGpxTacakaZaObradu--;
        poruka(StatusPoruke.Uspjeh, UnosPoruke.NemaSledecegObjekta);
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
      if (!selectGpxFeature.get("lejer")) {
        poruka(StatusPoruke.Uspjeh, UnosPoruke.NeobradjenaGpxTacka);
      }
      prikazPodatakaIzGpxTacaka();
    } else {
      indexGpxTacakaZaObradu++;
      poruka(StatusPoruke.Uspjeh, UnosPoruke.NemaPrethodnogObjekta);
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
        blnIsChange = true;
      } else {
        indexGpxTacakaZaObradu++;
        poruka(StatusPoruke.Uspjeh, UnosPoruke.NemaPrethodnogObjekta);
      }
    }
  }
}

let select = new ol.interaction.Select({
  wrapX: false,
  hitTolerance: 5,
  layers: function (layer) {
    return layer.get("id") !== "brisanje" && layer.get("id") !== "azuriranje";
  },
});

select.on("select", function (e) {
  //console.log("select target", e.target.getFeatures().array_[0].values_.name);
  console.log("select target", e.target.getFeatures());
  selectGpxFeature = e.target.getFeatures().array_[0];
  //Da ne može da odabere drugi kml objekat i spoji sa objektima iz prvog
  closeDiv("#odabirBliskogObjektaKmlDiv");
  //if (selectGpxFeature.hasOwnProperty("lejer")) {
  if (!selectGpxFeature) {
    return false;
  }
  document.querySelector("#naziv_napojne").value = nazivNapojneTrafostanice;
  document.querySelector("#sifra_napojne").value = sifraNapojneTrafostanice;
  document.querySelector("#izvod_napojne").value = izvodNapojneTrafostanice;
  if (selectGpxFeature.values_.lejer) {
    if (!odabirSaMape && !odabirPrikljucnogMjestaSaMapeVektor) {
      prikazPodatakaIzGpxTacaka();
    }
    odabirPrikljucnogMjestaSaMapeVektor = false;
  } else {
    if (!odabirSaMape) {
      document.querySelector("#gps").value = "";
      if (selectGpxFeature.values_.hasOwnProperty("name")) {
        document.querySelector("#gps").value = selectGpxFeature.values_.name;
        document.querySelector("#name").value = selectGpxFeature.values_.name;
        //Kad se klikne na kml objekat da provjeri da li postoji u blizini objekat na koji treba biti povezan.
        //Kml vodovi imaju definisan name property.
        if (!(isEditable || selectGpxFeature.values_.hasOwnProperty("kml_povezati"))) {
          $("#ddlObjekatZaPovezivanje").empty();
          extractKmlFeatureEndPoints(selectGpxFeature).forEach(function (feature) {
            objectNearKmlFeature(selectGpxFeature, feature, "stubovi");
            objectNearKmlFeature(selectGpxFeature, feature, "trafostanice");
            objectNearKmlFeature(selectGpxFeature, feature, "vodovi");
            objectNearKmlFeature(selectGpxFeature, feature, "view_pod");
            objectNearKmlFeature(selectGpxFeature, feature, "nkro");
            objectNearKmlFeature(selectGpxFeature, feature, "prikljucno_mjesto");
            objectNearKmlFeature(selectGpxFeature, feature, "view_potrosaci");
          });
          showConnectForm();
        }
      }
    }
  }
  odabirSaMape = false;

  if (potrosacZaKogSeBiraPrikljucnoMjesto !== "") {
    vectorSource?.getFeatures()?.forEach(function (el) {
      //odabirPrikljucnogMjestaSaMapeVektor = false;
      if (el.ol_uid === potrosacZaKogSeBiraPrikljucnoMjesto) {
        potrosacZaKogSeBiraPrikljucnoMjesto = "";
        selectGpxFeature = el;
      }
    });
    select.getFeatures().clear();
    select.getFeatures().push(selectGpxFeature);
  }
  if(document.querySelector("#potvrdaProduzenjaKrakaDiv") && document.querySelector("#potvrdaProduzenjaKrakaDiv").style.width === "500px"){
    document.querySelector("#potvrdaProduzenjaKrakaDiv").style.width = "0px";
  }
});

var modifyV = new ol.interaction.Modify({
  condition: false,
  features: select.getFeatures(),
});

modifyV.on("modifyend", function (e) {
  let featureId = e?.features?.getArray()[0]?.values_?.originalId;
  //let position = ol.proj.transform(e.features.getArray()[0].values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326");
  let position = e?.features?.getArray()[0]?.values_?.geometry?.flatCoordinates;
  //let coordinates = e?.features?.getArray()[0]?.values_?.geometry?.clone();
  let pocetniElement;
  nizKml.forEach((el) => {
    if (el.originalId === featureId) {
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
      if (distanca > dozvoljeniPomjeraj && !radiusBezOgranicenja) {
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
      console.log(e?.features?.getArray()[0]?.ol_uid, item?.ol_uid);
      if (e?.features?.getArray()[0]?.ol_uid === item?.ol_uid) {
        original = item;
      }
    });

    if (!original) {
      let pocetnaTacka = new ol.geom.Point(ol.proj.fromLonLat([pocetniElement.lng, pocetniElement.lat], "EPSG:4326"));
      e.features.getArray()[0].getGeometry().setCoordinates(pocetnaTacka.flatCoordinates);
      //e.features.getArray()[0].getGeometry().setCoordinates(original.coordinates);
      poruka(StatusPoruke.Upozorenje, UnosPoruke.NedozvoljenoPomjeranjeKmlTacke);
      return false;
    }

    let coordinates = e.features.getArray()[0].getGeometry().getCoordinates();

    if (coordinates.length !== original.coordinates.length) {
      e.features.getArray()[0].getGeometry().setCoordinates(original.coordinates);
      poruka(StatusPoruke.Upozorenje, UnosPoruke.NedozvoljenaIzmjenaGeometrijeLinije);
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
      poruka(StatusPoruke.Upozorenje, UnosPoruke.NedozvoljenaIzmjenaGeometrijeLinije);
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
      if (distanca > dozvoljeniPomjeraj && !radiusBezOgranicenja) {
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
      if (distanca > dozvoljeniPomjeraj && !radiusBezOgranicenja) {
        isViolatedAllowedDistance = true;
      }
    }

    if (isViolatedAllowedDistance) {
      e.features.getArray()[0].getGeometry().setCoordinates(original.coordinates);
      poruka(
        StatusPoruke.Upozorenje,
        UnosPoruke.NedozvoljenPomjerajTacka1 + kmlRadius.toString() + StatusPoruke.NedozvoljenPomjerajTacka2
      );
      return false;
    }
  }
});

function prikazPodatakaIzGpxTacaka() {
  document.querySelector("#gps").value = selectGpxFeature.get("name");
  document.querySelector("#name").value = selectGpxFeature.get("name");
  console.log("gpx vrijednost", selectGpxFeature.get("name"));
  if (selectGpxFeature.get("lejer") === "stubovi") {
    prikaziPoljaOdabranogGpxStuba();
    let pomLejer = Podsloj.Stub35;
    if (selectGpxFeature.get("napon") === "10") {
      pomLejer = Podsloj.Stub10;
    }
    if (selectGpxFeature.get("napon") === "0.4") {
      pomLejer = Podsloj.Stub04;
    }
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "trafostanice") {
    prikaziPoljaOdabraneGpxTrafostanice();
    let pomLejer = selectGpxFeature.get("ddl_sloj_podataka");
    if (!pomLejer) {
      //TODO: MISLIM DA KOMPLETAN OVAJ IF TREBA UKLONITI
      pomLejer = Podsloj.TS35;
      if (selectGpxFeature.get("napon") === "10") {
        pomLejer = Podsloj.TS10;
      }
      if (selectGpxFeature.get("napon") === "0.4") {
        pomLejer = Podsloj.TS10;
      }
    }
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "vodovi") {
    //Ovo će trebati za poseban wfs lejer za iscrtane vodove
    prikaziPoljaOdabranogVoda();
    let pomLejer = Podsloj.Vod35;
    if (selectGpxFeature.get("napon") === "10") {
      pomLejer = Podsloj.Vod10;
    }
    if (selectGpxFeature.get("napon") === "0.4") {
      pomLejer = Podsloj.Vod04;
    }
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "nkro") {
    prikaziPoljaOdabranogGpxNKRO();
    let pomLejer = Podsloj.Nkro;
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "prikljucno_mjesto") {
    prikaziPoljaOdabranogGpxPM();
    let pomLejer = Podsloj.PrikljucnoMjesto;
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "pod") {
    prikaziPoljaOdabranogGpxPod();
    let pomLejer = Podsloj.Pod;
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "potrosac") {
    prikaziPoljaOdabranogGpxPotrosac();
    let pomLejer = Podsloj.Potrosac;
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "prikljucna_konzola") {
    prikaziPoljaOdabranogGpxPrikljucnaKonzola();
    let pomLejer = Podsloj.PrikljucnaKonzola;
    prikazPanelaAtributa(pomLejer);
  } else if (selectGpxFeature.get("lejer") === "solari") {
    prikaziPoljaOdabranogGpxSolari();
    let pomLejer = Podsloj.Solari;
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
  let minValue = 99999,
    maxValue = 0;
  minGpsPointName = 0;
  maxGpsPointName = 0;
  if (vectorSource && vectorSource.getFeatures().length) {
    minValue = minGpxName(vectorSource.getFeatures());
    maxValue = maxGpxName(vectorSource.getFeatures());
  }
  let pocetnaTacka, krajnjaTacka;
  for (let i = minValue; i <= maxValue; i++) {
    vectorSource.getFeatures().forEach(function (el) {
      let elementName = el.values_.name.replace(/[^\d]/g, '');
      if (i === parseInt(elementName)) {
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

  if (nizTacakaLinije.length) {
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
  }

  //vektorKreiraniVodovi.getSource().clear();
  //vektorKreiraniVodovi.getSource().addFeatures(nizVodovaGpx);
  vektorKreiraniPonovo.getSource().clear();
  vektorKreiraniPonovo.getSource().addFeatures(nizVodovaGpx);
}

function minGpxName(tacke) {
  let retval = 99999;
  if (tacke && tacke.length > 0) {
    tacke.forEach(function (el) {
      let elementName = el.values_.name.replace(/[^\d]/g, '');
      parseInt(elementName) < retval && (retval = parseInt(elementName));
    });
  }
  return retval;
}

function maxGpxName(tacke) {
  let retval = 0;
  if (tacke && tacke.length > 0) {
    tacke.forEach(function (el) {
      let elementName = el.values_.name.replace(/[^\d]/g, '');
      parseInt(elementName) > retval && (retval = parseInt(elementName));
    });
  }
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
      selectGpxFeature && el.values_.gps &&
      parseInt(el.values_.gps) === parseInt(selectGpxFeature.values_.gps) + 1 &&
      nijeOdabranaNovaTacka
    ) {
      console.log("postojeći ", parseInt(selectGpxFeature.values_.gps));
      console.log("novi ", parseInt(el.values_.gps));
      selectGpxFeature = el;
      select.getFeatures().clear();
      select.getFeatures().push(selectGpxFeature);
      nijeOdabranaNovaTacka = false;
      prikazPodatakaIzGpxTacaka();
      // Praznimo name za sledecu tacku svaki put
      if(selectGpxFeature && !selectGpxFeature.values_.lejer){
        document.querySelector("#name").value = "";
      }
    } else if(selectGpxFeature && el.values_.name && nijeOdabranaNovaTacka &&
       parseInt(el.values_.name) === parseInt(selectGpxFeature.values_.gps) + 1) {
      console.log("evo ga ", el.values_.name);
      selectGpxFeature = el;
      select.getFeatures().clear();
      select.getFeatures().push(selectGpxFeature);
      nijeOdabranaNovaTacka = false;
      prikazPodatakaIzGpxTacaka();
      // Praznimo name za sledecu tacku svaki put
      if(selectGpxFeature && !selectGpxFeature.values_.lejer){
        document.querySelector("#name").value = "";
      }
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
  document.querySelector("#btnPocetnaTackaPoveznica").className = "dugmeodabirmapa greenClass";
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  blnShowAttribute = false;
  selektovaniDdlZaPovezivanjeVoda = "#ddlPocetnaTackaVodovi";
  nizPocetnihTacakaVoda.length = 0;
  $(selektovaniDdlZaPovezivanjeVoda).empty();
  map.on("singleclick", klikNaRastereZaVodove);
}

function odabirKrajnjeTackeVoda() {
  document.querySelector("#btnKrajnjaTackaPoveznica").className = "dugmeodabirmapa greenClass";
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  blnShowAttribute = false;
  selektovaniDdlZaPovezivanjeVoda = "#ddlKrajnjaTackaVodovi";
  nizKrajnjihTacakaVoda.length = 0;
  $(selektovaniDdlZaPovezivanjeVoda).empty();
  map.on("singleclick", klikNaRastereZaVodove);
}

/**
 * Ukoliko je odabran vod koji se formira od gpx i postojećih tačaka, finalno formiranje niza se radi u dodajWmsObjekte metodi
 * Tamo se objedinjavaju tačke iz oba izvora i ponovo poziva metoda koordinateObjekataIzDdlova
 */
function potvrdaUnosaVoda() {
  blnShowAttribute = true;
  if (document.querySelector("#chkSpajanjePostojecihVodova").checked) {
    blnSpajanjeVodova = true;
  } else {
    blnSpajanjeVodova = false;
  }
  selekcijaGpxPoligonom();
  if (document.querySelector("#chkMjesovitiVod").checked) {
    dodajWmsObjekte();
  } else {
    koordinateObjekataIzDdlova();
  }
  document.querySelector("#chkSpajanjePostojecihVodova").checked = false;
}

function klikNaRastereZaVodove(browserEvent) {
  document.querySelector("#btnPocetnaTackaPoveznica").className = "dugmeodabirmapa";
  document.querySelector("#btnKrajnjaTackaPoveznica").className = "dugmeodabirmapa";
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  let brojLejera = 0;
  let tempNiz = [];
  map.forEachLayerAtPixel(pixel, function (layer) {
    if (layer instanceof ol.layer.Image) {
      console.log(layer.values_.name);
      //let title = layer.get("title");
      let vidljivost = layer.get("visible");
      if (vidljivost && layer.values_.name !== Lejeri.Vodovi) {
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
                  let newText = el.id.split(".")[0] + "." + el.properties.name + "-" + el.properties.originalId;

                  $(selektovaniDdlZaPovezivanjeVoda).append(
                    $("<option>", {
                      value: newId,
                      text: newText,
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
          odabirPrikljucnogMjestaSaMape = false;
          //map.un("singleclick", klikNaRastereZaOdabirPrikljucnogMjesta);
          odabirSaMape = false;

          odgovor.features.forEach(function (el) {
            nizKoordinataPrikljucnihMjesta[el.properties.skriveni_id_pm] = el.geometry.coordinates;
            tempNiz.push(el);
          });
        }

        tempNiz.forEach((el) => {
          $("#prik_mjesto").append(
            $("<option>", {
              value: el.properties.skriveni_id_pm,
              text: "prikljucno mjesto:" + el.properties.id,
            })
          );
        });
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
    poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabirTacakaZaVod);
    return false;
  }
  let foundPocetna = nizTacakaLinije.some((r) => JSON.stringify(r) === JSON.stringify(pocetna));
  let foundKrajnja = nizTacakaLinije.some((r) => JSON.stringify(r) === JSON.stringify(krajnja));
  if (foundPocetna) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.PocetnaTackaDioVoda);
    return false;
  }
  if (foundKrajnja) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.KrajnjaTackaDioVoda);
    return false;
  }

  let startGpxValue = document.querySelector("#txtPocetnaTackaVodovi").value;
  let endGpxValue = document.querySelector("#txtKrajnjaTackaVodovi").value;
  let options = { units: "miles" };
  if (startGpxValue || endGpxValue) {
    if (startGpxValue && endGpxValue) {
      if (startGpxValue === endGpxValue) {
        poruka(StatusPoruke.Upozorenje, UnosPoruke.NeMoguIstiRedniBrojeviTacaka);
        return false;
      }
      if (startGpxValue !== minGpsPointName && startGpxValue !== maxGpsPointName) {
        poruka(StatusPoruke.Upozorenje, UnosPoruke.TrebaMinIliMaxVrijednost);
        return false;
      }
      if (parseInt(endGpxValue) !== minGpsPointName && parseInt(endGpxValue) !== maxGpsPointName) {
        poruka(StatusPoruke.Upozorenje, UnosPoruke.TrebaMinIliMaxVrijednost);
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
          poruka(StatusPoruke.Upozorenje, UnosPoruke.TrebaMinIliMaxVrijednost);
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
          poruka(StatusPoruke.Upozorenje, UnosPoruke.TrebaMinIliMaxVrijednost);
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
    if (pocetna?.length && krajnja?.length) {
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
      if (pocetna?.length) {
        if (
          turf.distance(turf.point(pocetna), turf.point(nizTacakaLinije[0]), options) >
          turf.distance(turf.point(pocetna), turf.point(nizTacakaLinije[nizTacakaLinije.length - 1]), options)
        ) {
          nizTacakaLinije.push(pocetna);
        } else {
          nizTacakaLinije.unshift(pocetna);
        }
      }
      if (krajnja?.length) {
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
  //vektorKreiraniVodovi.getSource().clear();
  //vektorKreiraniVodovi.getSource().addFeatures(nizVodovaGpx);
  vektorKreiraniPonovo.getSource().clear();
  vektorKreiraniPonovo.getSource().addFeatures(nizVodovaGpx);
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
  odabirSaMape = true;
  document.querySelector("#btnOdabirNapojneTrafostanice").className = "dugmeodabirmapa";
  blnShowAttribute = false;
  document.querySelector("#txtNazivNapojneTrafostanice").value = "";
  document.querySelector("#txtSifraNapojneTrafostanice").value = "";
  $("#ddlIzvodNapojneTrafostanice").empty();
  let url = wmsTrafostanice
    .getSource()
    .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
      INFO_FORMAT: "application/json",
    });
  if (url) {
    fetch(url)
      .then(function (response) {
        //restartovanje();
        odabirSaMape = false;
        return response.text();
      })
      .then(function (json) {
        let odgovor = JSON.parse(json);
        map.un("singleclick", klikNapojnaTrafostanicaMapa);
        if (
          odgovor.features[0]?.properties?.id_billing !== null &&
          odgovor.features[0]?.properties?.id_billing?.length >= 6 &&
          odgovor.features[0]?.properties?.id_billing?.length <= 8
        ) {
          pretragaTrafostanicaGpx(odgovor.features[0].properties.id_billing);
        } else {
          poruka(StatusPoruke.Upozorenje, UnosPoruke.NijeOdabranaTsSaSifrom);
        }
        //Dodao jer se inicijalno prikazivalo dugme za prelazak na sljedeći objekat
        document.querySelector("#divPrethodniObjekat").style.display = "none";
        document.querySelector("#divSljedeciObjekat").style.display = "none";
      });
  }
}

function odabirPrikljucnogMjestaZaUnosPotrosaca() {
  console.log("Trenutni objekat", selectGpxFeature);
  potrosacZaKogSeBiraPrikljucnoMjesto = "";
  if (selectGpxFeature) {
    potrosacZaKogSeBiraPrikljucnoMjesto = selectGpxFeature.ol_uid;
  }
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirPrikljucnogMjestaSaMape = true;
  odabirPrikljucnogMjestaSaMapeVektor = true;
  odabirSaMape = true;
  blnShowAttribute = false;
  nizKoordinataPrikljucnihMjesta = {};
  $("#prik_mjesto").empty();
  //map.on("singleclick", klikNaRastereZaOdabirPrikljucnogMjesta);
}

/**
 * Metoda koja popunjava niz featurima koje pročita iz raster lejera na mapi.
 * @param {*} browserEvent
 */
function odabirSvihRasterObjekataKlik(browserEvent) {
  console.log("odabirSvihRasterObjekataKlik");
  if (odabirPrikljucnogMjestaSaMape) {
    klikNaRastereZaOdabirPrikljucnogMjesta(browserEvent);
    odabirPrikljucnogMjestaSaMape = false;
    odabirSaMape = false;
    return false;
  }
  if ([point, lineString, polygon].includes(akcija)) {
    return false;
  }
  //TODO: Dodati loader dok se ne završi učitavanje podataka
  nizSelektovanihObjekata.length = 0;
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  let brojLejera = 0;
  map.forEachLayerAtPixel(pixel, function (layer) {
    if (layer instanceof ol.layer.Image) {
      //console.log(layer.values_.name);
      //Ne razmatramo nelegalne potrošače za prikaz
      if (layer.get("visible")) {
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
                });
              }

              if (brojLejera === 0) {
                //Ukloniti metodu koja se poziva na klik
                !odabirSaMape && map.un("singleclick", odabirSvihRasterObjekataKlik);
                //console.log("Svi selektovani objekti", nizSelektovanihObjekata);
                //TODO: Pozvati metodu koja će vršiti prikaz atributa objekta.
                prikazAtributaSelektovanihObjekata();
                //ddlLejerChange();
              }
            });
        }
      }
    }
  });
}

/**
 * Odabir objekta na koji se nadovezuje dio mreže koji se unosi.
 * Poziva se samo ako nije odabrano da se unosi dio mreže koji ne treba povezivati sa postojećom mrežom (unos ostrva).
 */
function odabirPocetnePoveznice() {
  document.querySelector("#btnMapaOdabirPoveznice").className = "dugmeodabirmapa greenClass";
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  blnShowAttribute = false;
  $("#ddlPocetnaPoveznica").empty();
  map.on("singleclick", klikNaRastereZaPocetnuPoveznicu);
}

function klikNaRastereZaPocetnuPoveznicu(browserEvent) {
  document.querySelector("#btnMapaOdabirPoveznice").className = "dugmeodabirmapa";
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  let brojLejera = 0;
  let tempNiz = [];
  map.forEachLayerAtPixel(pixel, function (layer) {
    if (layer instanceof ol.layer.Image && layer.get("visible")) {
      console.log(layer.values_.name);
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
            return response.text();
          })
          .then(function (json) {
            brojLejera--;
            let odgovor = JSON.parse(json);
            if (odgovor.features.length > 0) {
              odabirSaMape = false;
              odgovor.features.forEach(function (el) {
                tempNiz.push(el);
              });
            }

            if (brojLejera === 0) {
              tempNiz.forEach((el) => {
                let newId = el.id.split(".")[0] + "." + el.properties.originalId;
                let newText = el.id.split(".")[0] + "." + el.properties.name + "-" + el.properties.originalId;
                if(el.id.split(".")[0] !== "trafostanice_poligoni"){
                  $("#ddlPocetnaPoveznica").append(
                    $("<option>", {
                      value: newId,
                      text: newText,
                    })
                  );
                }

              });
              //Ukloniti metodu koja se poziva na klik
              map.un("singleclick", klikNaRastereZaPocetnuPoveznicu);
            }
          });
      }
    }
  });
}
