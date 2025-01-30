/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
let layername = "trafostanice",
  fulllayername = "geonode:trafostanice",
  layertitle = "Trafostanice";
let tipGeometrije = point;
let vrijednostPocetneTacke = 0,
  vrijednostKrajnjeTacke = 0;

/**Popunjavanje komponenti u divu za prikaz atributa, nakon pročitanog odgovora za WMS objekat */
function popuniKontrole(odgovor) {
  let atributi = odgovor.features[0]["properties"];
  idObjekta = atributi["id"];
  document.querySelector("#gps").value = atributi["gps"];
  document.querySelector("#broj").value = atributi["broj"];
  //document.querySelector("#tip").value = atributi["tip"];
  //document.querySelector("#vrsta_namjena").value = atributi["vrsta_namjena"];
  //document.querySelector("#vrsta_materijal").value = atributi["vrsta_materijal"];
  //document.querySelector("#vrsta_drvenog").value = atributi["vrsta_drvenog"];
  document.querySelector("#nad_visina").value = atributi["nad_visina"];
  document.querySelector("#visina").value = atributi["visina"];
  document.querySelector("#rasp_prov").value = atributi["rasp_prov"];
  //document.querySelector("#izolator_vrsta").value = atributi["izolator_vrsta"];
  //document.querySelector("#izolator_funkcija").value = atributi["izolator_funkcija"];
  document.querySelector("#br_izol_faza").value = atributi["br_izol_faza"];
  //document.querySelector("#tip_nosac_izol").value = atributi["tip_nosac_izol"];
  //document.querySelector("#odvodnik_prenapona").value = atributi["odvodnik_prenapona"];
  //document.querySelector("#uzemljivac").value = atributi["uzemljivac"];
  document.querySelector("#uzemljivac_otpor").value = atributi["uzemljivac_otpor"];
  //document.querySelector("#optika").value = atributi["optika"];
  //document.querySelector("#rasvjeta").value = atributi["rasvjeta"];
  document.querySelector("#br_pmo").value = atributi["br_pmo"];
  document.querySelector("#br_nnv").value = atributi["br_nnv"];
  //document.querySelector("#br_10kv_vodova").value = atributi["br_10kv_vodova"];
  //document.querySelector("#br_35kv_vodova").value = atributi["br_35kv_vodova"];
  document.querySelector("#pog_sprem").value = atributi["pog_sprem"];
  //document.querySelector("#vlasnistvo").value = atributi["vlasnistvo"];
  document.querySelector("#opstina").value = atributi["opstina"];
  document.querySelector("#napon").value = atributi["napon"];
  //document.querySelector("#prikljucak_otcjep").value = atributi["prikljucak_otcjep"];
  //document.querySelector("#nn_vod").value = atributi["nn_vod"];
  //document.querySelector("#rastavljac").value = atributi["rastavljac"];
  //document.querySelector("#10_vod").value = atributi["10_vod"];

  setujDdlVrijednost("#tip", atributi["tip"]);
  setujDdlVrijednost("#vrsta_namjena", atributi["vrsta_namjena"]);
  setujDdlVrijednost("#vrsta_materijal", atributi["vrsta_materijal"]);
  setujDdlVrijednost("#vrsta_drvenog", atributi["vrsta_drvenog"]);
  setujDdlVrijednost("#izolator_vrsta", atributi["izolator_vrsta"]);
  setujDdlVrijednost("#izolator_funkcija", atributi["izolator_funkcija"]);
  setujDdlVrijednost("#tip_nosac_izol", atributi["tip_nosac_izol"]);
  setujDdlVrijednost("#odvodnik_prenapona", atributi["odvodnik_prenapona"]);
  setujDdlVrijednost("#uzemljivac", atributi["uzemljivac"]);
  setujDdlVrijednost("#optika", atributi["optika"]);
  setujDdlVrijednost("#rasvjeta", atributi["rasvjeta"]);
  setujDdlVrijednost("#vlasnistvo", atributi["vlasnistvo"]);
  setujDdlVrijednost("#prikljucak_otcjep", atributi["prikljucak_otcjep"]);
  setujDdlVrijednost("#nn_vod", atributi["nn_vod"]);
  setujDdlVrijednost("#rastavljac", atributi["rastavljac"]);
  setujDdlVrijednost("#10_vod", atributi["10_vod"]);

  if (akcija === "izmijeni") {
    //Ako se radi o izmjeni geometrije, čita objekat za idObjekta i postavlja ga kao vektor na mapi
    wfsZaEdit(idObjekta);
  }
}

/** Unos izmijenjenih vrijednosti atributa, nove fotografije ili unos svih podataka za novu geometriju */
function sacuvaj() {
  if (akcija === "dodaj" && geometrijaZaBazuWkt === "") {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.NacrtatiObjekat);
    return false;
  }
  if (akcija === "izmijeni" && (geometrijaZaBazuWkt === "" || idObjekta === 0)) {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.IzmijenitiGeometriju);
    return false;
  }
  if (akcija === "atributi" && idObjekta === 0) {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.OdabratiObjekatIzmjenaAtributa);
    return false;
  }

  let podaciForme = new FormData();
  podaciForme.append("id", idObjekta);
  podaciForme.append("akcija", akcija);
  podaciForme.append("geom", geometrijaZaBazuWkt);
  podaciForme.append("gps", document.querySelector("#gps").value);
  podaciForme.append("broj", document.querySelector("#broj").value);
  podaciForme.append("tip", document.querySelector("#tip").value);
  podaciForme.append("vrsta_namjena", document.querySelector("#vrsta_namjena").value);
  podaciForme.append("vrsta_materijal", document.querySelector("#vrsta_materijal").value);
  podaciForme.append("vrsta_drvenog", document.querySelector("#vrsta_drvenog").value);
  podaciForme.append("nad_visina", document.querySelector("#nad_visina").value);
  podaciForme.append("visina", document.querySelector("#visina").value);
  podaciForme.append("rasp_prov", document.querySelector("#rasp_prov").value);
  podaciForme.append("izolator_vrsta", document.querySelector("#izolator_vrsta").value);
  podaciForme.append("izolator_funkcija", document.querySelector("#izolator_funkcija").value);
  podaciForme.append("br_izol_faza", document.querySelector("#br_izol_faza").value);
  podaciForme.append("tip_nosac_izol", document.querySelector("#tip_nosac_izol").value);
  podaciForme.append("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona").value);
  podaciForme.append("uzemljivac", document.querySelector("#uzemljivac").value);
  podaciForme.append("uzemljivac_otpor", document.querySelector("#uzemljivac_otpor").value);
  podaciForme.append("optika", document.querySelector("#optika").value);
  podaciForme.append("rasvjeta", document.querySelector("#rasvjeta").value);
  podaciForme.append("br_pmo", document.querySelector("#br_pmo").value);
  podaciForme.append("br_nnv", document.querySelector("#br_nnv").value);
  //podaciForme.append("br_10kv_vodova", document.querySelector("#br_10kv_vodova").value);
  //podaciForme.append("br_35kv_vodova", document.querySelector("#br_35kv_vodova").value);
  podaciForme.append("pog_sprem", document.querySelector("#pog_sprem").value);
  podaciForme.append("vlasnistvo", document.querySelector("#vlasnistvo").value);
  podaciForme.append("opstina", document.querySelector("#opstina").value);
  podaciForme.append("napon", document.querySelector("#napon").value);
  podaciForme.append("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep").value);
  podaciForme.append("nn_vod", document.querySelector("#nn_vod").value);
  podaciForme.append("rastavljac", document.querySelector("#rastavljac").value);
  podaciForme.append("10_vod", document.querySelector("#10_vod").value);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", sacuvajZapisUrl, true);
  xhr.timeout = 100000;
  xhr.ontimeout = function () {
    poruka(StatusPoruke.Greska, UnosPoruke.PrekidTrajePredugo);
  };
  xhr.send(podaciForme);
  openModalSpinner();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let jsonResponse = JSON.parse(xhr.responseText);
        if (jsonResponse["success"] === true) {
          poruka(StatusPoruke.Uspjeh, jsonResponse["message"]);
          restartovanje();
        } else {
          poruka(StatusPoruke.Upozorenje, jsonResponse["message"]);
        }
        closeModalSpinner();
      } else {
        poruka(StatusPoruke.Greska, xhr.statusText);
        closeModalSpinner();
      }
    }
  };
}

/** Sve podešava na početne vrijednosti*/
function restartovanje() {
  idObjekta = 0;
  document.querySelector("#idObjekta").value = "";
  document.querySelector("#visina").value = "";
  document.querySelector("#tip").value = "";
  document.querySelector("#dodavanjeSlike").value = "";
  slikaUrl = "";
  slikeUrl = [];

  isprazniGeometrije();
}

/** Prazni sve promjenljive vezane za crtanje i edit geometrije*/
function isprazniGeometrije() {
  featureTekuciOverlay.getSource().clear();
  geometrijaZaBazuWkt = "";
  nacrtan = false;
  modifikovan = false;
}

/** Dodavanje vektorskih lejera za crtanje i edit geometrije na mapu */
featureLineOverlay.setMap(map);
featurePointOverlay.setMap(map);
featurePolygonOverlay.setMap(map);
featureSnapOverlay.setMap(map);
featureTekuciOverlay.setMap(map);

map.addLayer(vektorNeupareniVodovi);

let blnFreeHandDraw = false;
/**Podešava kada da se omogući crtanje i izmjena i na kojim lejerima */
function podesiInterakciju() {
  //uklanja draw i modify
  map.removeInteraction(draw);
  map.removeInteraction(modify);

  if (akcija === point) {
    draw = new ol.interaction.Draw({
      features: featuresPoint,
      type: akcija,
    });
    modify = new ol.interaction.Modify({
      features: featuresPoint,
      deleteCondition: function (event) {
        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
      },
    });
    map.addInteraction(draw);
    map.addInteraction(modify);
  }
  if (akcija === lineString) {
    draw = new ol.interaction.Draw({
      features: featuresLine,
      type: lineString,
      freehand: blnFreeHandDraw,
    });
    modify = new ol.interaction.Modify({
      features: featuresLine,
      deleteCondition: function (event) {
        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
      },
    });
    map.addInteraction(draw);
    map.addInteraction(modify);
    map.addInteraction(new ol.interaction.DragPan({}));
  }
  if (akcija === polygon) {
    draw = new ol.interaction.Draw({
      features: featuresPolygon,
      type: polygon,
      freehand: blnFreeHandDraw,
    });
    modify = new ol.interaction.Modify({
      features: featuresPolygon,
      deleteCondition: function (event) {
        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
      },
    });
    map.addInteraction(draw);
    map.addInteraction(modify);
    map.addInteraction(new ol.interaction.DragPan({}));
  }
  if (akcija === "izmijeni") {
    modify = new ol.interaction.Modify({
      features: featuresTekuci,
      deleteCondition: function (event) {
        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
      },
    });
    map.addInteraction(modify);
    modify.on("modifyend", function (e) {
      modifikovan = true;
      geometrijaZaBazuWkt = wktGeometrije(e.features.getArray()[0]);
      console.log("feature geometrija", wktGeometrije(e.features.getArray()[0]));
    });
    var snap = new ol.interaction.Snap({
      source: featureSnapOverlay.getSource(),
    });
    map.addInteraction(snap);
  }
  if (akcija === "dodaj") {
    draw = new ol.interaction.Draw({
      features: featuresTekuci,
      type: tipGeometrije,
    });
    modify = new ol.interaction.Modify({
      features: featuresTekuci,
      deleteCondition: function (event) {
        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
      },
    });
    draw.on("drawend", function (e) {
      nacrtan = true;
      //TODO: ovo možda dodati u promjeni akcije i poništi
      featureTekuciOverlay.getSource().clear(); //Samo jedan može da se crta
      geometrijaZaBazuWkt = wktGeometrije(e.feature);
      console.log("PRikaz 1");
      showDiv("#atributiDiv");
      console.log("feature nova geometrija", geometrijaZaBazuWkt);
    });
    modify.on("modifyend", function (e) {
      //Iz nekog razloga na brisanje čvora ne očitava odmah izmjenu
      console.log("broj geometrija", e.features.getArray().length);
      geometrijaZaBazuWkt = wktGeometrije(e.features.getArray()[0]);
      console.log("PRikaz 2");
      showDiv("#atributiDiv");
      console.log("feature nova mijenjana geometrija", geometrijaZaBazuWkt);
    });
    map.addInteraction(draw);
    map.addInteraction(modify);
    var snap = new ol.interaction.Snap({
      source: featureSnapOverlay.getSource(),
    });
    map.addInteraction(snap);
  }
}

map.on("pointermove", onMouseMove);

function onMouseMove(evt) {
  let position = evt.coordinate;
  document.querySelector("#koordinate").innerHTML = "X:" + position[0] + " Y:" + position[1];
  if (evt.dragging) {
    return;
  }
  map.getTargetElement().style.cursor = "";
  let pixel = map.getEventPixel(evt.originalEvent);
}

/**Omogućava dodavanje novog vektor lejera drag-drop metodom */
let vektorSource = new ol.source.Vector();
let vectorSource;
let dragAndDrop = new ol.interaction.DragAndDrop({
  formatConstructors: [ol.format.GPX, ol.format.GeoJSON, ol.format.IGC, ol.format.KML, ol.format.TopoJSON],
});
dragAndDrop.on("addfeatures", function (event) {
  console.log("aaaa", event.features);
  featurePolygonOverlay.getSource().addFeatures(event.features);
  event.features.forEach(function (feature) {
    let position = ol.proj.transform(feature.values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326");
    let tempWkt = wktGeometrije(feature);
    if (tempWkt.includes("POLYGON")) {
      poligoni.push(tempWkt);
      //Dodavanje poligona iz prevučenog fajla u skup poligona na osnovu kojeg se vrši filtriranje
    }
    nizKml.push({
      lat: position[1],
      lng: position[0],
      name: feature.values_.name,
      description: feature.values_.description,
    });
  });
  console.log("niz", nizKml);
  vectorSource = new ol.source.Vector({
    features: event.features,
    projection: event.projection,
  });
  map.getLayers().push(
    new ol.layer.Vector({
      source: vectorSource,
      style: vectorStyle,
    })
  );
  var pixelTolerance = 10;
  var modifyKmlLine = new ol.interaction.Modify({
    source: vectorSource,
    pixelTolerance: pixelTolerance,
    condition: function (e) {
      var f = this.getMap().getFeaturesAtPixel(e.pixel, {
        hitTolerance: pixelTolerance,
        layerFilter: function (candidate) {
          return true; //candidate === vector;
        },
      });
      console.log("Radi");
      if (f && f[0] && f[0].getGeometry() && f[0].getGeometry().getType() == "LineString") {
        var coordinates = f[0].getGeometry().getCoordinates();
        var p0 = e.pixel;
        var p1 = this.getMap().getPixelFromCoordinate(coordinates[0]);
        var dx = p0[0] - p1[0];
        var dy = p0[1] - p1[1];
        if (Math.sqrt(dx * dx + dy * dy) <= pixelTolerance) {
          return false;
        }
        var p1 = this.getMap().getPixelFromCoordinate(coordinates.slice(-1)[0]);
        var dx = p0[0] - p1[0];
        var dy = p0[1] - p1[1];
        if (Math.sqrt(dx * dx + dy * dy) <= pixelTolerance) {
          return false;
        }
      }
      return true;
    },
  });
  map.addInteraction(modifyKmlLine);
  view.fit(vectorSource.getExtent(), map.getSize());
});
map.addInteraction(dragAndDrop);

/** Selekcija i modifikacija */

var select = new ol.interaction.Select({
  wrapX: false,
  layers: function (layer) {
    return layer.get("id") !== "brisanje" && layer.get("id") !== "azuriranje";
  },
});

select.on("select", function (e) {
  //console.log("select target", e.target.getFeatures().array_[0].values_.name);
  console.log("select target", e.target.getFeatures());
  if (blnZavrsniStub) {
    blnZavrsniStub = false;
    vrijednostKrajnjeTacke = parseInt(e.target.getFeatures().array_[0].values_.name);
    poruka(StatusPoruke.Uspjeh, WizardPoruke.ZavrsniStubVodaJe + e.target.getFeatures().array_[0].values_.name);
  }
  if (blnPocetniStub) {
    blnPocetniStub = false;
    vrijednostPocetneTacke = parseInt(e.target.getFeatures().array_[0].values_.name);
    poruka(StatusPoruke.Uspjeh, WizardPoruke.PocetniStubVodaJe + e.target.getFeatures().array_[0].values_.name);
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

  //console.log("select m", e.features.getArray()[0].values_);
  //console.log("ime tačke m", e.features.getArray()[0].values_.name);
  //console.log("koordinate", e.selected[0].values_.geometry.flatCoordinates);
  let position = ol.proj.transform(e.features.getArray()[0].values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326");
  //console.log("koordinate m", position);
  let pocetniElement;
  nizKml.forEach((el) => {
    if (el.name === featureName) {
      pocetniElement = el;
    }
  });
  if (pocetniElement) {
    let pocetnaTacka = new ol.geom.Point(ol.proj.fromLonLat([pocetniElement.lng, pocetniElement.lat]));
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
});

modifyV.on("change", function (e) {
  console.log("koordinate", e.selected[0].values_.geometry.flatCoordinates);
  let position = ol.proj.transform(e.features.getArray()[0].values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326");
  console.log("koordinate c", position);
});

map.addInteraction(select);
map.addInteraction(modifyV);
let snap = new ol.interaction.Snap({
  source: featureSnapOverlay.getSource(),
});
map.addInteraction(snap);

/*** Završena selekcija i modifikacija */

//Klik na feature
map.on("click", onMouseClick);

function onMouseClick(browserEvent) {
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  console.log("jeste selekcija ts", blnSelekcijaNapojneTS);
  if(akcija === "information" && document.querySelector("#atributesAccordion")){
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
  }
  if (blnSelekcijaNapojneTS) {
    //blnSelekcijaNapojneTS = false;
    let url = wmsTrafostanice
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
            console.log("odgovor napojna", odgovor);
            console.log("napojna properties", odgovor.features[0]["properties"]);
            console.log("napojna id", odgovor.features[0]["id"]);
            let atributi = odgovor.features[0]["properties"];
            featureNapojnaTrafostanica = odgovor.features[0];
            sifraNapojneTrafostanice = odgovor.features[0]["properties"]["id_billing"];
            naponskiNivoNapojneTrafostanice = atributi["prenos_odnos"];
            geohashNapojneTrafostanice = atributi["geohash_id"];
            pretragaTrafostanica(sifraNapojneTrafostanice);
            //trafostaniceIzBilingaZaUparivanje(trafostaniceIzBilingaZaUparivanje, sifraNapojneTrafostanice, nazivNapojneTrafostanice, )
          }
        });
    }
  } else {
    map.forEachLayerAtPixel(pixel, function (layer) {
      if (layer instanceof ol.layer.Image) {
        //console.log(layer);
        let title = layer.get("title");
        //console.log("title", title);
        let vidljivost = layer.get("visible");
        //console.log("vidljivost", vidljivost);
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
                  //TODO: Provjeriti, ovo može da se ukloni - kompletan else blok
                }
              });
          }
        }
      }
    });
  }
}

function izbrisi() {
  console.log("kml", vectorSource);
}

/**Metoda koja će sve resetovati na početne vrijednosti */
function ponisti() {
  restartovanje();
}

/* Filter wms-a po prostornim i atributskim podacima*/
function filtriranje() {
  let atributniFilter = kreiranjeCqlFilteraAtributiNew();
  cqlFilter = atributniFilter;
  let naponNivo = document.querySelector("#ddl_pretraga_napon").value;
  if(naponNivo){
    if(cqlFilter === ""){
      cqlFilter += "napon ILIKE '%" + naponNivo + "%'";
    } else if(cqlFilter !== ""){
      cqlFilter += " AND napon ILIKE '%" + naponNivo + "%'";
    }
  }

  console.log("CQL FILTER", cqlFilter);
  if (cqlFilter === "") {
    ponistiFilter();
    return false;
  }

  if (tempLejerZaFilter) {
    map.getLayers().forEach(function (layer) {
      if (layer instanceof ol.layer.Image) {
        if (layer.get("visible")) {
          let params = layer.getSource().getParams();
          params.CQL_FILTER = "1=2";
          layer.getSource().updateParams(params);
        }
      }
    });

    let params = tempLejerZaFilter.getSource().getParams();
    params.CQL_FILTER = cqlFilter;
    tempLejerZaFilter.getSource().updateParams(params);
  } else {
    //Filtrirati sve lejere po prostornim uslovima, ako nije odabran nijedan lejer
    map.getLayers().forEach(function (layer) {
      if (layer instanceof ol.layer.Image) {
        console.log("Lejer", layer.values_.name);
        if (layer.get("visible")) {
          let params = layer.getSource().getParams();
          params.CQL_FILTER = cqlFilter;
          layer.getSource().updateParams(params);
        }
      }
    });
  }
}

function ponistiFilter() {
  map.getLayers().forEach(function (layer) {
    if (layer instanceof ol.layer.Image) {
      console.log("Lejer", layer.values_.name);
      if (layer.get("visible")) {
        let params = layer.getSource().getParams();
        params.CQL_FILTER = "INCLUDE";
        layer.getSource().updateParams(params);
      }
    }
  });
}

document.querySelector("#btnPonistiFilter").addEventListener("click", ponistiFilterMain);
function ponistiFilterMain() {
  tempLejerZaFilter = null;
  clearFilterFields();
  map.getLayers().forEach(function (layer) {
    if (layer instanceof ol.layer.Image) {
      console.log("Lejer", layer.values_.name);
      if (layer.get("visible")) {
        let params = layer.getSource().getParams();
        params.CQL_FILTER = "INCLUDE";
        layer.getSource().updateParams(params);
      }
    }
  });
  document.querySelector("#ddlLejer").value = "";
  document.querySelector("#ddl_pretraga_napon").value = "";
  sakrijSvaPoljaPretrage();
}

let nizPoljaZaPretragu = [
  { id: "pretraga_naziv_napojne_ts", field: "naziv_napojne", numeric: false, ddl: false },
  { id: "pretraga_sifra_napojne_ts", field: "sifra_napojne", numeric: false, ddl: false },
  { id: "pretraga_izvod_napojne_ts", field: "izvod_napojne", numeric: false, ddl: false },
  { id: "pretraga_gps", field: "gps", numeric: false, ddl: false },
  { id: "pretraga_broj", field: "broj", numeric: false, ddl: false },
  { id: "pretraga_tip", field: "tip", numeric: false, ddl: false },
  { id: "pretraga_vrsta_namjena", field: "vrsta_namjena", numeric: false, ddl: false },
  { id: "pretraga_vrsta_materijal", field: "vrsta_materijal", numeric: false, ddl: false },
  { id: "pretraga_vrsta_drvenog", field: "vrsta_drvenog", numeric: false, ddl: false },
  { id: "pretraga_nad_visina", field: "nad_visina", numeric: false, ddl: false },
  { id: "pretraga_visina", field: "visina", numeric: false, ddl: false },
  { id: "pretraga_rasp_prov", field: "rasp_prov", numeric: false, ddl: false },
  { id: "pretraga_izolator_vrsta", field: "izolator_vrsta", numeric: false, ddl: false },
  { id: "pretraga_izolator_funkcija", field: "izolator_funkcija", numeric: false, ddl: false },
  { id: "pretraga_br_izol_faza", field: "br_izol_faza", numeric: false, ddl: false },
  { id: "pretraga_tip_nosac_izol", field: "tip_nosac_izol", numeric: false, ddl: false },
  { id: "pretraga_odvodnik_prenapona", field: "odvodnik_prenapona", numeric: false, ddl: false },
  { id: "pretraga_uzemljivac", field: "uzemljivac", numeric: false, ddl: false },
  { id: "pretraga_uzemljivac_otpor", field: "uzemljivac_otpor", numeric: false, ddl: false },
  { id: "pretraga_optika", field: "optika", numeric: false, ddl: false },
  { id: "pretraga_rasvjeta", field: "rasvjeta", numeric: false, ddl: false },
  { id: "pretraga_br_pmo", field: "br_pmo", numeric: false, ddl: false },
  { id: "pretraga_br_nnv", field: "br_nnv", numeric: false, ddl: false },
  { id: "pretraga_pog_sprem", field: "pog_sprem", numeric: false, ddl: false },
  { id: "pretraga_vlasnistvo", field: "vlasnistvo", numeric: false, ddl: false },
  { id: "pretraga_napon", field: "napon", numeric: false, ddl: false },
  { id: "pretraga_prikljucak_otcjep", field: "prikljucak_otcjep", numeric: false, ddl: false },
  { id: "pretraga_nn_vod", field: "nn_vod", numeric: false, ddl: false },
  { id: "pretraga_rastavljac", field: "rastavljac", numeric: false, ddl: false },
  { id: "pretraga_10_vod", field: "10vod", numeric: false, ddl: false },
  { id: "pretraga_naziv_potrosaca", field: "naziv_potrosaca", numeric: false, ddl: false },
  { id: "pretraga_naziv", field: "naziv", numeric: false, ddl: false },
  { id: "pretraga_ts", field: "ts", numeric: false, ddl: false },
  { id: "pretraga_br_faza", field: "br_faza", numeric: false, ddl: false },
  { id: "pretraga_vrsta", field: "vrsta", numeric: false, ddl: false },
  { id: "pretraga_presjek", field: "presjek", numeric: false, ddl: false },
  { id: "pretraga_br_spojnica", field: "br_spojnica", numeric: false, ddl: false },
  { id: "pretraga_god_izg", field: "god_izg", numeric: false, ddl: false },
  { id: "pretraga_uze_presjek", field: "uze_presjek", numeric: false, ddl: false },
  { id: "pretraga_uze", field: "uze", numeric: false, ddl: false },
  { id: "pretraga_br_nn_izvoda", field: "br_nn_izvoda", numeric: false, ddl: false },
  { id: "pretraga_celije_10", field: "celije_10", numeric: false, ddl: false },
  { id: "pretraga_projek_snaga", field: "projek_snaga", numeric: false, ddl: false },
  { id: "pretraga_inst_snaga_t1", field: "inst_snaga_t1", numeric: false, ddl: false },
  { id: "pretraga_inst_snaga_t2", field: "inst_snaga_t2", numeric: false, ddl: false },
  { id: "pretraga_inst_snaga_t3", field: "inst_snaga_t3", numeric: false, ddl: false },
  { id: "pretraga_inst_snaga_t4", field: "inst_snaga_t4", numeric: false, ddl: false },
  { id: "pretraga_prenos_odnos", field: "prenos_odnos", numeric: false, ddl: false },
  { id: "pretraga_izvod_celija", field: "izvod_celija", numeric: false, ddl: false },
  { id: "pretraga_funkcija", field: "funkcija", numeric: false, ddl: false },
  { id: "pretraga_id_billing", field: "id_billing", numeric: false, ddl: false },
  { id: "pretraga_id", field: "id", numeric: false, ddl: false },
  { id: "pretraga_osiguraci", field: "osiguraci", numeric: false, ddl: false },
  { id: "pretraga_montaza", field: "montaza", numeric: false, ddl: false },
  { id: "pretraga_vrata", field: "vrata", numeric: false, ddl: false },
  { id: "pretraga_br_izvoda", field: "br_izvoda", numeric: false, ddl: false },
  { id: "pretraga_br_prikljucaka", field: "br_prikljucaka", numeric: false, ddl: false },
  { id: "pretraga_pretplatni_br", field: "pretplatni_br", numeric: false, ddl: false },
  { id: "pretraga_br_brojila", field: "br_brojila", numeric: false, ddl: false },
  { id: "pretraga_tip_trafostanica", field: "tip", numeric: false, ddl: false },
  { id: "pretraga_tip_vodovi", field: "tip", numeric: false, ddl: false },
  { id: "pretraga_vodovi_materijal", field: "materijal", numeric: false, ddl: false }
];

function clearFilterFields() {
  nizPoljaZaPretragu.forEach((el) => {
    let tempField = document.querySelector("#" + el.id);
    tempField.value !== "" && (tempField.value = "");
  });
}

/** Filtriranje po atributima */
function kreiranjeCqlFilteraAtributiNew() {
  let retVal = "";

  nizPoljaZaPretragu.forEach((el) => {
    let tempValue = document.querySelector("#" + el.id).value;
    let elementName = el.field;
    if(el.id === "pretraga_naziv" && tempLejerZaFilter && tempLejerZaFilter.get('title') === "stubovi") {
      elementName = "name";
    }
    tempValue !== "" && (retVal += `${elementName} = '${tempValue}' AND `);
  });

  retVal.length > 5 && (retVal = retVal.substring(0, retVal.length - 5));
  return retVal;
}

function cqlZaWmsLejer(wmsLejer, filterCql) {
  //console.log(wmsLejer, filterCql);
  let params = wmsLejer.getSource().getParams();
  params.CQL_FILTER = filterCql;
  wmsLejer.getSource().updateParams(params);
}

/*function filtriranje() {
  let prostorniFilter = kreiranjeCqlFilteraProstorno();
  let atributniFilter = kreiranjeCqlFilteraAtributi();
  if (prostorniFilter !== "" && atributniFilter !== "") {
    cqlFilter = "(" + prostorniFilter + ") AND " + atributniFilter;
  } else {
    cqlFilter = prostorniFilter + atributniFilter;
  }
  if (cqlFilter === "") {
    return false;
  }
  let params = rasterLayer.getSource().getParams();
  params.CQL_FILTER = cqlFilter;
  rasterLayer.getSource().updateParams(params);
}*/

/** Filtriranje po atributima */
function kreiranjeCqlFilteraAtributi() {
  let retVal = "";

  document.querySelector("#pretraga_gps").value !== "" &&
    (retVal += "gps = '" + document.querySelector("#pretraga_gps").value + "' AND ");
  document.querySelector("#pretraga_broj").value !== "" &&
    (retVal += "broj = '" + document.querySelector("#pretraga_broj").value + "' AND ");
  document.querySelector("#pretraga_tip").value !== "" &&
    (retVal += "tip = '" + document.querySelector("#pretraga_tip").value + "' AND ");
  document.querySelector("#pretraga_vrsta_namjena").value !== "" &&
    (retVal += "vrsta_namjena = '" + document.querySelector("#pretraga_vrsta_namjena").value + "' AND ");
  document.querySelector("#pretraga_vrsta_materijal").value !== "" &&
    (retVal += "vrsta_materijal = '" + document.querySelector("#pretraga_vrsta_materijal").value + "' AND ");
  document.querySelector("#pretraga_vrsta_drvenog").value !== "" &&
    (retVal += "vrsta_drvenog = '" + document.querySelector("#pretraga_vrsta_drvenog").value + "' AND ");
  document.querySelector("#pretraga_nad_visina").value !== "" &&
    (retVal += "nad_visina = '" + document.querySelector("#pretraga_nad_visina").value + "' AND ");
  document.querySelector("#pretraga_visina").value !== "" &&
    (retVal += "visina = '" + document.querySelector("#pretraga_visina").value + "' AND ");
  document.querySelector("#pretraga_rasp_prov").value !== "" &&
    (retVal += "rasp_prov = '" + document.querySelector("#pretraga_rasp_prov").value + "' AND ");
  document.querySelector("#pretraga_izolator_vrsta").value !== "" &&
    (retVal += "izolator_vrsta = '" + document.querySelector("#pretraga_izolator_vrsta").value + "' AND ");
  document.querySelector("#pretraga_izolator_funkcija").value !== "" &&
    (retVal += "izolator_funkcija = '" + document.querySelector("#pretraga_izolator_funkcija").value + "' AND ");
  document.querySelector("#pretraga_br_izol_faza").value !== "" &&
    (retVal += "br_izol_faza = '" + document.querySelector("#pretraga_br_izol_faza").value + "' AND ");
  document.querySelector("#pretraga_tip_nosac_izol").value !== "" &&
    (retVal += "tip_nosac_izol = '" + document.querySelector("#pretraga_tip_nosac_izol").value + "' AND ");
  document.querySelector("#pretraga_odvodnik_prenapona").value !== "" &&
    (retVal += "odvodnik_prenapona = '" + document.querySelector("#pretraga_odvodnik_prenapona").value + "' AND ");
  document.querySelector("#pretraga_uzemljivac").value !== "" &&
    (retVal += "uzemljivac = '" + document.querySelector("#pretraga_uzemljivac").value + "' AND ");
  document.querySelector("#pretraga_uzemljivac_otpor").value !== "" &&
    (retVal += "uzemljivac_otpor = '" + document.querySelector("#pretraga_uzemljivac_otpor").value + "' AND ");
  document.querySelector("#pretraga_optika").value !== "" &&
    (retVal += "optika = '" + document.querySelector("#pretraga_optika").value + "' AND ");
  document.querySelector("#pretraga_rasvjeta").value !== "" &&
    (retVal += "rasvjeta = '" + document.querySelector("#pretraga_rasvjeta").value + "' AND ");
  document.querySelector("#pretraga_br_pmo").value !== "" &&
    (retVal += "br_pmo = '" + document.querySelector("#pretraga_br_pmo").value + "' AND ");
  document.querySelector("#pretraga_br_nnv").value !== "" &&
    (retVal += "br_nnv = '" + document.querySelector("#pretraga_br_nnv").value + "' AND ");
  document.querySelector("#pretraga_pog_sprem").value !== "" &&
    (retVal += "pog_sprem = '" + document.querySelector("#pretraga_pog_sprem").value + "' AND ");
  document.querySelector("#pretraga_vlasnistvo").value !== "" &&
    (retVal += "vlasnistvo = '" + document.querySelector("#pretraga_vlasnistvo").value + "' AND ");
  document.querySelector("#pretraga_opstina").value !== "" &&
    (retVal += "opstina = '" + document.querySelector("#pretraga_opstina").value + "' AND ");
  document.querySelector("#pretraga_napon").value !== "" &&
    (retVal += "napon = '" + document.querySelector("#pretraga_napon").value + "' AND ");
  document.querySelector("#pretraga_prikljucak_otcjep").value !== "" &&
    (retVal += "prikljucak_otcjep = '" + document.querySelector("#pretraga_prikljucak_otcjep").value + "' AND ");
  document.querySelector("#pretraga_nn_vod").value !== "" &&
    (retVal += "nn_vod = '" + document.querySelector("#pretraga_nn_vod").value + "' AND ");
  document.querySelector("#pretraga_rastavljac").value !== "" &&
    (retVal += "rastavljac = '" + document.querySelector("#pretraga_rastavljac").value + "' AND ");
  document.querySelector("#pretraga_10_vod").value !== "" &&
    (retVal += "10_vod = '" + document.querySelector("#pretraga_10_vod").value + "' AND ");

  retVal.length > 5 && (retVal = retVal.substring(0, retVal.length - 5));
  return retVal;
}

/**Vraća jedan objekat čiji se id predaje i čija geometrija će se mijenjati */
function wfsZaEdit(id) {
  if (id === "") {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.OdabratiObjekatIzmjenaGeometrije);
    return false;
  }
  $.ajax({
    method: "POST",
    url: wfsUrl,
    data: {
      service: "WFS",
      request: "GetFeature",
      typename: "geonode:" + layername,
      outputFormat: "application/json",
      srsname: "EPSG:3857",
      //"maxFeatures": 50,
      CQL_FILTER: "id=" + id.toString(),
    },
    success: function (response) {
      let features = new ol.format.GeoJSON().readFeatures(response);
      featureTekuciOverlay.getSource().clear(); //Ispraznimo prethodne zapise da bi imali samo jedan koji ćemo editovati
      featureTekuciOverlay.getSource().addFeatures(features);
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/** Download WFS-a u zavisnosti od predatog formata */
function wfsDownload(format) {
  let dodajCqlFilter = "";
  cqlFilter !== "" && (dodajCqlFilter = "&cql_filter=" + cqlFilter);
  window.open(
    wfsUrl +
      "?version=1.0.0&request=GetFeature&typeName=geonode:" +
      layername +
      "&outputformat=" +
      format +
      dodajCqlFilter,
    "_blank"
  );
  return false;
}

/**Povezivanje kontrola koje zavise od lejera sa akcijama */
document.querySelector("#btnSacuvaj").addEventListener("click", sacuvaj);
document.querySelector("#btnIzbrisi").addEventListener("click", izbrisi);
document.querySelector("#btnFilter").addEventListener("click", filtriranje);


let tempLejerZaFilter = null;

document.querySelector("#ddlLejer").addEventListener("change", function () {
  tempLejerZaFilter = null;
  clearFilterFields();
  sakrijSvaPoljaPretrage();
  if (this.value === Lejeri.Stubovi) {
    tempLejerZaFilter = wmsStubovi;
    prikaziPretraguStubove();
  } else if (this.value === Lejeri.Vodovi) {
    tempLejerZaFilter = wmsVodovi;
    prikaziPretraguVodove();
  } else if (this.value === Lejeri.Trafostanice) {
    tempLejerZaFilter = wmsTrafostanice;
    prikaziPretraguTrafostanice();
  } else if (this.value === Lejeri.NKRO) {
    tempLejerZaFilter = wmsNKRO;
    prikaziPretraguNkro();
  } else if (this.value === Lejeri.PrikljucnoMjesto) {
    tempLejerZaFilter = wmsPrikljucnoMjesto;
    prikaziPretraguPrikljucnoMjesto();
  } else if (this.value === Lejeri.Potrosac) {
    tempLejerZaFilter = wmsPotrosaci;
    prikaziPretraguPotrosaci();
  } else if (this.value === Lejeri.POD || this.value === "pod") {
    tempLejerZaFilter = wmsPOD;
    prikaziPretraguPodovi();
  } else if (this.value === Lejeri.NelegalniPotrosac) {
    tempLejerZaFilter = wmsNelegalniPotrosaci;
    prikaziPretraguNelegalniPotrosaci();
  }
});
sakrijSvaPoljaPretrage();
function sakrijSvaPoljaPretrage() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "none";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "none";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "none";
  document.querySelector("#divPretragaGps").style.display = "none";
  document.querySelector("#divPretragaBroj").style.display = "none";
  document.querySelector("#divPretragaTip").style.display = "none";
  document.querySelector("#divPretragaNamjena").style.display = "none";
  document.querySelector("#divPretragaMaterijal").style.display = "none";
  document.querySelector("#divPretragaVrstaDrvenogStuba").style.display = "none";
  document.querySelector("#divPretragaNadmorskaVisina").style.display = "none";
  document.querySelector("#divPretragaVisina").style.display = "none";
  document.querySelector("#divPretragaRasporedProvodnika").style.display = "none";
  document.querySelector("#divPretragaIzolatorVrsta").style.display = "none";
  document.querySelector("#divPretragaIzolatorFunkcija").style.display = "none";
  document.querySelector("#divPretragaBrIzolFaza").style.display = "none";
  document.querySelector("#divPretragaTipIzolatora").style.display = "none";
  document.querySelector("#divPretragaOdvodnikPrenapona").style.display = "none";
  document.querySelector("#divPretragaUzemljivac").style.display = "none";
  document.querySelector("#divPretragaOtporUzemljivaca").style.display = "none";
  document.querySelector("#divPretragaOptika").style.display = "none";
  document.querySelector("#divPretragaRasvjeta").style.display = "none";
  document.querySelector("#divPretragaBrPmo").style.display = "none";
  document.querySelector("#divPretragaBrNnv").style.display = "none";
  document.querySelector("#divPretragaPogSprem").style.display = "none";
  document.querySelector("#divPretragaVlasnistvo").style.display = "none";
  document.querySelector("#divPretragaNapon").style.display = "none";
  document.querySelector("#divPretragaPrikljucakOtcjep").style.display = "none";
  document.querySelector("#divPretragaNnVod").style.display = "none";
  document.querySelector("#divPretragaRastavljac").style.display = "none";
  document.querySelector("#divPretraga10KvVod").style.display = "none";

  document.querySelector("#divPretragaNaziv").style.display = "none";
  document.querySelector("#divPretragaNazivPotrosaca").style.display = "none";
  document.querySelector("#divPretragaTs").style.display = "none";
  document.querySelector("#divPretragaBrFaza").style.display = "none";
  document.querySelector("#divPretragaVrsta").style.display = "none";
  document.querySelector("#divPretragaPresjek").style.display = "none";
  document.querySelector("#divPretragaBrSpojnica").style.display = "none";
  document.querySelector("#divPretragaGodIzgr").style.display = "none";
  document.querySelector("#divPretragaUzePresjek").style.display = "none";
  document.querySelector("#divPretragaUze").style.display = "none";

  document.querySelector("#divPretragaBrNnIzvoda").style.display = "none";
  document.querySelector("#divPretragaCelije10").style.display = "none";
  document.querySelector("#divPretragaProjekSnaga").style.display = "none";
  document.querySelector("#divPretragaInstSnaga1").style.display = "none";
  document.querySelector("#divPretragaInstSnaga2").style.display = "none";
  document.querySelector("#divPretragaInstSnaga3").style.display = "none";
  document.querySelector("#divPretragaInstSnaga4").style.display = "none";
  document.querySelector("#divPretragaPrenosOdnos").style.display = "none";
  document.querySelector("#divPretragaIzvodCelija").style.display = "none";
  document.querySelector("#divPretragaFunkcija").style.display = "none";
  document.querySelector("#divPretragaIdBilling").style.display = "none";

  document.querySelector("#divPretragaId").style.display = "none";
  document.querySelector("#divPretragaOsiguraci").style.display = "none";
  //document.querySelector("#divPretragaDionica").style.display = "none";

  document.querySelector("#divPretragaMontaza").style.display = "none";
  document.querySelector("#divPretragaVrata").style.display = "none";
  document.querySelector("#divPretragaBrIzvoda").style.display = "none";
  document.querySelector("#divPretragaBrPrikljucaka").style.display = "none";
  document.querySelector("#divPretragaPretplatniBr").style.display = "none";
  document.querySelector("#divPretragaBrBrojila").style.display = "none";
  document.querySelector("#divPretragaTrafostanicaTip").style.display = "none";
  document.querySelector("#divPretragaVodoviTip").style.display = "none";
  document.querySelector("#divPretragaVodoviMaterijal").style.display = "none";
}

function prikaziPretraguStubove() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaNaziv").style.display = "flex";
  document.querySelector("#divPretragaBroj").style.display = "flex";
  document.querySelector("#divPretragaTip").style.display = "flex";
  document.querySelector("#divPretragaNamjena").style.display = "flex";
  document.querySelector("#divPretragaMaterijal").style.display = "flex";
  document.querySelector("#divPretragaVrstaDrvenogStuba").style.display = "flex";
  document.querySelector("#divPretragaNadmorskaVisina").style.display = "flex";
  document.querySelector("#divPretragaVisina").style.display = "flex";
  document.querySelector("#divPretragaRasporedProvodnika").style.display = "flex";
  document.querySelector("#divPretragaIzolatorVrsta").style.display = "flex";
  document.querySelector("#divPretragaIzolatorFunkcija").style.display = "flex";
  document.querySelector("#divPretragaBrIzolFaza").style.display = "flex";
  document.querySelector("#divPretragaTipIzolatora").style.display = "flex";
  document.querySelector("#divPretragaOdvodnikPrenapona").style.display = "flex";
  document.querySelector("#divPretragaUzemljivac").style.display = "flex";
  document.querySelector("#divPretragaOtporUzemljivaca").style.display = "flex";
  document.querySelector("#divPretragaPogSprem").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaOptika").style.display = "flex";
  document.querySelector("#divPretragaRasvjeta").style.display = "flex";
  document.querySelector("#divPretragaBrPmo").style.display = "flex";
  document.querySelector("#divPretragaBrNnv").style.display = "flex";
  document.querySelector("#divPretragaNnVod").style.display = "flex";
  document.querySelector("#divPretragaRastavljac").style.display = "flex";
  document.querySelector("#divPretraga10KvVod").style.display = "flex";
}

function prikaziPretraguVodove() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaVodoviTip").style.display = "flex";
  document.querySelector("#divPretragaVodoviMaterijal").style.display = "flex";
  document.querySelector("#divPretragaRasvjeta").style.display = "flex";
  document.querySelector("#divPretragaPogSprem").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNaziv").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaBrFaza").style.display = "flex";
  document.querySelector("#divPretragaVrsta").style.display = "flex";
  document.querySelector("#divPretragaPresjek").style.display = "flex";
  document.querySelector("#divPretragaBrSpojnica").style.display = "flex";
  document.querySelector("#divPretragaGodIzgr").style.display = "flex";
  document.querySelector("#divPretragaUzePresjek").style.display = "flex";
  document.querySelector("#divPretragaUze").style.display = "flex";
}

function prikaziPretraguTrafostanice() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTrafostanicaTip").style.display = "flex";
  document.querySelector("#divPretragaNaziv").style.display = "flex";
  document.querySelector("#divPretragaGodIzgr").style.display = "flex";
  document.querySelector("#divPretragaPogSprem").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaBrNnIzvoda").style.display = "flex";
  document.querySelector("#divPretragaCelije10").style.display = "flex";
  document.querySelector("#divPretragaProjekSnaga").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga1").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga2").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga3").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga4").style.display = "flex";
  document.querySelector("#divPretragaPrenosOdnos").style.display = "flex";
  document.querySelector("#divPretragaIzvodCelija").style.display = "flex";
  document.querySelector("#divPretragaFunkcija").style.display = "flex";
  document.querySelector("#divPretragaIdBilling").style.display = "flex";
}

function prikaziPretraguPrikljucnoMjesto() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaTip").style.display = "flex";
  document.querySelector("#divPretragaOsiguraci").style.display = "none";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
}

function prikaziPretraguNkro() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaMontaza").style.display = "flex";
  document.querySelector("#divPretragaVrata").style.display = "flex";
  document.querySelector("#divPretragaBrIzvoda").style.display = "flex";
  document.querySelector("#divPretragaBrPrikljucaka").style.display = "flex";
}

function prikaziPretraguPotrosaci() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaPretplatniBr").style.display = "flex";
  document.querySelector("#divPretragaBrBrojila").style.display = "flex";
}

function prikaziPretraguPodovi() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
}

function prikaziPretraguNelegalniPotrosaci() {
  document.querySelector("#divPretragaNazivPotrosaca").style.display = "flex";
}

/**Popunjavanje ddl-ova */

/*popuniDdlAtributima("#tip", "stubovi", "tip", "", "");
popuniDdlAtributima("#vrsta_namjena", "stubovi", "vrsta_namjena", "", "");
popuniDdlAtributima("#vrsta_materijal", "stubovi", "vrsta_materijal", "", "");
popuniDdlAtributima("#vrsta_drvenog", "stubovi", "vrsta_drvenog", "", "");
popuniDdlAtributima("#izolator_vrsta", "stubovi", "izolator_vrsta", "", "");
popuniDdlAtributima("#izolator_funkcija", "stubovi", "izolator_funkcija", "", "");
popuniDdlAtributima("#tip_nosac_izol", "stubovi", "tip_nosac_izol", "", "");
popuniDdlAtributima("#odvodnik_prenapona", "stubovi", "odvodnik_prenapona", "", "");
popuniDdlAtributima("#uzemljivac", "stubovi", "uzemljivac", "", "");
popuniDdlAtributima("#optika", "stubovi", "optika", "", "");
popuniDdlAtributima("#rasvjeta", "stubovi", "rasvjeta", "", "");
popuniDdlAtributima("#vlasnistvo", "stubovi", "vlasnistvo", "", "");
popuniDdlAtributima("#prikljucak_otcjep", "stubovi", "prikljucak_otcjep", "", "");
popuniDdlAtributima("#nn_vod", "stubovi", "nn_vod", "", "");
popuniDdlAtributima("#rastavljac", "stubovi", "rastavljac", "", "");
popuniDdlAtributima("#10_vod", "stubovi", "10_vod", "", "");

popuniDdlAtributima("#pretraga_vrsta_namjena", "stubovi", "vrsta_namjena", "", "");
popuniDdlAtributima("#pretraga_vrsta_materijal", "stubovi", "vrsta_materijal", "", "");
popuniDdlAtributima("#pretraga_vrsta_drvenog", "stubovi", "vrsta_drvenog", "", "");
popuniDdlAtributima("#pretraga_izolator_vrsta", "stubovi", "izolator_vrsta", "", "");
popuniDdlAtributima("#pretraga_izolator_funkcija", "stubovi", "izolator_funkcija", "", "");
popuniDdlAtributima("#pretraga_tip_nosac_izol", "stubovi", "tip_nosac_izol", "", "");
popuniDdlAtributima("#pretraga_odvodnik_prenapona", "stubovi", "odvodnik_prenapona", "", "");
popuniDdlAtributima("#pretraga_uzemljivac", "stubovi", "uzemljivac", "", "");
popuniDdlAtributima("#pretraga_optika", "stubovi", "optika", "", "");
popuniDdlAtributima("#pretraga_rasvjeta", "stubovi", "rasvjeta", "", "");
popuniDdlAtributima("#pretraga_vlasnistvo", "stubovi", "vlasnistvo", "", "");
popuniDdlAtributima("#pretraga_opstina", "stubovi", "opstina", "", "");
popuniDdlAtributima("#pretraga_prikljucak_otcjep", "stubovi", "prikljucak_otcjep", "", "");
popuniDdlAtributima("#pretraga_nn_vod", "stubovi", "nn_vod", "", "");
popuniDdlAtributima("#pretraga_rastavljac", "stubovi", "rastavljac", "", "");
popuniDdlAtributima("#pretraga_10_vod", "stubovi", "10_vod", "", "");*/
