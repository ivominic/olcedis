/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
const layername = "nkro",
  layertitle = "NKRO";
const tipGeometrije = point;
let opisSlike = "";

let rasterLayer = new ol.layer.Image({
  title: layertitle,
  name: layername,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: "geonode:" + layername,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

/**Popunjavanje komponenti u divu za prikaz atributa, nakon pročitanog odgovora za WMS objekat */
function popuniKontrole(odgovor) {
  let atributi = odgovor.features[0]["properties"];
  idObjekta = atributi["id"];
  document.querySelector("#idObjekta").value = idObjekta;
  document.querySelector("#gps").value = atributi["gps"];
  document.querySelector("#ts").value = atributi["ts"];
  document.querySelector("#izvod_ts").value = atributi["izvod_ts"];
  document.querySelector("#id").value = atributi["id"];
  //document.querySelector("#materijal").value = atributi["materijal"];
  //document.querySelector("#montaza").value = atributi["montaza"];
  //document.querySelector("#vrata").value = atributi["vrata"];
  document.querySelector("#br_izvoda").value = atributi["br_izvoda"];
  document.querySelector("#br_prikljucaka").value = atributi["br_prikljucaka"];
  //document.querySelector("#pog_sprem").value = atributi["pog_sprem"];
  //document.querySelector("#vlasnistvo").value = atributi["vlasnistvo"];
  //document.querySelector("#opstina").value = atributi["opstina"];
  document.querySelector("#napon").value = atributi["napon"];

  setujDdlVrijednost("#materijal", atributi["materijal"]);
  setujDdlVrijednost("#montaza", atributi["montaza"]);
  setujDdlVrijednost("#vrata", atributi["vrata"]);
  setujDdlVrijednost("#pog_sprem", atributi["pog_sprem"]);
  setujDdlVrijednost("#vlasnistvo", atributi["vlasnistvo"]);
  setujDdlVrijednost("#opstina", atributi["opstina"]);

  if (akcija === "izmijeni") {
    //Ako se radi o izmjeni geometrije, čita objekad za idObjekta i postavlja ga kao vektor na mapi
    wfsZaEdit(idObjekta);
  }
}


/** Unos izmijenjenih vrijednosti atributa, nove fotografije ili unos svih podataka za novu geometriju */
function sacuvaj() {
  if (akcija === "dodaj" && geometrijaZaBazuWkt === "") {
    poruka("Upozorenje", "Potrebno je nacrtati objekat.");
    return false
  }
  if (akcija === "izmijeni" && (geometrijaZaBazuWkt === "" || idObjekta === 0)) {
    poruka("Upozorenje", "Potrebno je izmijeniti geometriju odabranog objekta.");
    return false
  }
  if (akcija === "atributi" && idObjekta === 0) {
    poruka("Upozorenje", "Potrebno je odabrati objekat čije atribute mijenjate.");
    return false
  }

  let podaciForme = new FormData();
  podaciForme.append("id", idObjekta);
  podaciForme.append("akcija", akcija);
  podaciForme.append("geom", geometrijaZaBazuWkt);
  podaciForme.append("gps", document.querySelector("#gps").value);
  podaciForme.append("ts", document.querySelector("#ts").value);
  podaciForme.append("izvod_ts", document.querySelector("#izvod_ts").value);
  podaciForme.append("id", document.querySelector("#id").value);
  podaciForme.append("materijal", document.querySelector("#materijal").value);
  podaciForme.append("montaza", document.querySelector("#montaza").value);
  podaciForme.append("vrata", document.querySelector("#vrata").value);
  podaciForme.append("br_izvoda", document.querySelector("#br_izvoda").value);
  podaciForme.append("br_prikljucaka", document.querySelector("#br_prikljucaka").value);
  podaciForme.append("pog_sprem", document.querySelector("#pog_sprem").value);
  podaciForme.append("vlasnistvo", document.querySelector("#vlasnistvo").value);
  podaciForme.append("opstina", document.querySelector("#opstina").value);
  podaciForme.append("napon", document.querySelector("#napon").value);
  podaciForme.append("", document.querySelector("#").value);

  let xhr = new XMLHttpRequest();
  xhr.open('POST', sacuvajZapisUrl, true);
  xhr.timeout = 100000;
  xhr.ontimeout = function () {
    poruka("Greska", "Akcija je prekinuta jer je trajala predugo.");
  };
  xhr.send(podaciForme);
  openModalSpinner();
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let jsonResponse = JSON.parse(xhr.responseText);
        if (jsonResponse["success"] === true) {
          poruka("Uspjeh", jsonResponse["message"]);
          restartovanje();
        } else {
          poruka("Upozorenje", jsonResponse["message"]);
        }
        closeModalSpinner();
      } else {
        poruka("Greska", xhr.statusText);
        closeModalSpinner();
      }
    }
  };
}

/** Sve podešava na početne vrijednosti*/
function restartovanje() {
  idObjekta = 0;
  document.querySelector("#idObjekta").value = "";
  document.querySelector("#gps").value = "";
  document.querySelector("#ts").value = "";
  document.querySelector("#izvod_ts").value = "";
  document.querySelector("#id").value = "";
  document.querySelector("#materijal").value = "";
  document.querySelector("#montaza").value = "";
  document.querySelector("#vrata").value = "";
  document.querySelector("#br_izvoda").value = "";
  document.querySelector("#br_prikljucaka").value = "";
  document.querySelector("#pog_sprem").value = "";
  document.querySelector("#vlasnistvo").value = "";
  document.querySelector("#opstina").value = "";
  document.querySelector("#napon").value = "";

  slikaUrl = "";
  opisSlike = "";
  slikeUrl = [];

  isprazniGeometrije();
}

/** Prazni sve promjenljive vezane za crtanje i edit geometrije*/
function isprazniGeometrije() {
  featureTekuciOverlay.getSource().clear();
  geometrijaZaBazuWkt = "";
  nacrtan = false;
  modifikovan = false;
  let paramsRestart = rasterLayer.getSource().getParams();
  rasterLayer.getSource().updateParams(paramsRestart);
}


/**Smještanje mape u div sa id-jem "map" */
let map = new ol.Map({
  target: "map",
  interactions: ol.interaction.defaults().extend([new ol.interaction.PinchZoom(), new ol.interaction.DragPan()]),
  layers: [osmBaseMap, rasterLayer],
  view: view,
});

/** Prikaz razmjere na mapi */
/*let razmjera = new ol.control.ScaleLine({
  target: document.querySelector("#razmjera")
});*/
//Sve ovo je nepotrebno u OL3, u šestici prikazuje i scale bar
map.addControl(razmjera);

/** Dodavanje vektorskih lejera za crtanje i edit geometrije na mapu */
featureLineOverlay.setMap(map);
featurePointOverlay.setMap(map);
featurePolygonOverlay.setMap(map);
featureTekuciOverlay.setMap(map);

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
    });
    modify = new ol.interaction.Modify({
      features: featuresLine,
      deleteCondition: function (event) {
        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
      },
    });
    map.addInteraction(draw);
    map.addInteraction(modify);
  }
  if (akcija === polygon) {
    draw = new ol.interaction.Draw({
      features: featuresPolygon,
      type: polygon,
    });
    modify = new ol.interaction.Modify({
      features: featuresPolygon,
      deleteCondition: function (event) {
        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
      },
    });
    map.addInteraction(draw);
    map.addInteraction(modify);
  }
  if (akcija === "izmijeni") {
    modify = new ol.interaction.Modify({
      features: featuresTekuci,
      deleteCondition: function (event) {
        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
      },
    });
    map.addInteraction(modify);
    modify.on('modifyend', function (e) {
      modifikovan = true;
      geometrijaZaBazuWkt = wktGeometrije(e.features.getArray()[0]);
      console.log("feature geometrija", wktGeometrije(e.features.getArray()[0]));
    });
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
    draw.on('drawend', function (e) {
      nacrtan = true;
      //TODO: ovo možda dodati u promjeni akcije i poništi
      featureTekuciOverlay.getSource().clear(); //Samo jedan može da se crta
      geometrijaZaBazuWkt = wktGeometrije(e.feature);
      showDiv("#atributiDiv");
      console.log("feature nova geometrija", geometrijaZaBazuWkt);
    });
    modify.on('modifyend', function (e) {
      //Iz nekog razloga na brisanje čvora ne očitava odmah izmjenu
      console.log("broj geometrija", e.features.getArray().length);
      geometrijaZaBazuWkt = wktGeometrije(e.features.getArray()[0]);
      showDiv("#atributiDiv");
      console.log("feature nova mijenjana geometrija", geometrijaZaBazuWkt);
    });
    map.addInteraction(draw);
    map.addInteraction(modify);
  }
}

map.on("pointermove", onMouseMove);

function onMouseMove(evt) {
  let position = ol.proj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
  document.querySelector("#koordinate").innerHTML = "X:" + position[0] + " Y:" + position[1];
  if (evt.dragging) {
    return;
  }
  map.getTargetElement().style.cursor = "";
  let pixel = map.getEventPixel(evt.originalEvent);
  //let hit = map.forEachLayerAtPixel(pixel, function (layer) {
  /*map.forEachLayerAtPixel(pixel, function (layer) {
    if (layer.N.name === layername) {      
      map.getTargetElement().style.cursor = "pointer";
      return false;
    }
  });*/
}

/**Omogućava dodavanje novog vektor lejera drag-drop metodom */
let vektorSource = new ol.source.Vector();
let dragAndDrop = new ol.interaction.DragAndDrop({
  formatConstructors: [ol.format.GPX, ol.format.GeoJSON, ol.format.IGC, ol.format.KML, ol.format.TopoJSON],
});
dragAndDrop.on("addfeatures", function (event) {
  let vectorSource = new ol.source.Vector({
    features: event.features,
    projection: event.projection,
  });
  map.getLayers().push(
    new ol.layer.Vector({
      source: vectorSource,
      style: vectorStyle,
    })
  );
  view.fit(vectorSource.getExtent(), map.getSize());
});
map.addInteraction(dragAndDrop);

//Klik na feature
map.on("click", onMouseClick);

function onMouseClick(browserEvent) {
  if (akcija === "atributi" || akcija === "izmijeni") {
    //let coordinate = browserEvent.coordinate;
    //let pixel = map.getPixelFromCoordinate(coordinate);

    let url = rasterLayer.getSource().getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:3857", {
      INFO_FORMAT: "application/json",
    });
    if (url) {
      fetch(url)
        .then(function (response) {
          restartovanje();
          return response.text();
        })
        .then(function (json) {
          let odgovor = JSON.parse(json);
          if (odgovor.features.length > 0) {
            popuniKontrole(odgovor);
            showDiv("#atributiDiv");
          }
        });
    }
  }
}

function izbrisi() {
  confirmModal("UKLANJANJE", "Da li ste sigurni da želite da uklonite odabrani objekat?");
}

/**Metoda koja će sve resetovati na početne vrijednosti */
function ponisti() {
  restartovanje();
}

function brisanje() {
  let podaciForme = new FormData();
  podaciForme.append("id", idObjekta);
  let xhr = new XMLHttpRequest();
  xhr.open('POST', izbrisiZapisUrl, true);
  xhr.timeout = 100000;
  xhr.ontimeout = function () {
    poruka("Greska", "Akcija je prekinuta jer je trajala predugo.");
  };
  xhr.send(podaciForme);
  openModalSpinner();

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let jsonResponse = JSON.parse(xhr.responseText);
        if (jsonResponse["success"] === true) {
          poruka("Uspjeh", jsonResponse["message"]);
          restartovanje();
        } else {
          poruka("Upozorenje", jsonResponse["message"]);
        }
        closeModalSpinner();
      } else {
        poruka("Greska", xhr.statusText);
        closeModalSpinner();
      }
    }
  };
}

/* Filter wms-a po prostornim i atributskim podacima*/
function filtriranje() {
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
}

/** Filtriranje po atributima */
function kreiranjeCqlFilteraAtributi() {
  let retVal = "";

  document.querySelector("#pretragaIdObjekta").value !== "" && (retVal += "id = '" + document.querySelector("#pretragaIdObjekta").value + "' AND ");
  document.querySelector("#pretraga_gps").value !== "" && (retVal += "gps = '" + document.querySelector("#pretraga_gps").value + "' AND ");
  document.querySelector("#pretraga_ts").value !== "" && (retVal += "ts = '" + document.querySelector("#pretraga_ts").value + "' AND ");
  document.querySelector("#pretraga_izvod_ts").value !== "" && (retVal += "izvod_ts = '" + document.querySelector("#pretraga_izvod_ts").value + "' AND ");
  document.querySelector("#pretraga_id").value !== "" && (retVal += "id = '" + document.querySelector("#pretraga_id").value + "' AND ");
  document.querySelector("#pretraga_materijal").value !== "" && (retVal += "materijal = '" + document.querySelector("#pretraga_materijal").value + "' AND ");
  document.querySelector("#pretraga_montaza").value !== "" && (retVal += "montaza = '" + document.querySelector("#pretraga_montaza").value + "' AND ");
  document.querySelector("#pretraga_vrata").value !== "" && (retVal += "vrata = '" + document.querySelector("#pretraga_vrata").value + "' AND ");
  document.querySelector("#pretraga_br_izvoda").value !== "" && (retVal += "br_izvoda = '" + document.querySelector("#pretraga_br_izvoda").value + "' AND ");
  document.querySelector("#pretraga_br_prikljucaka").value !== "" && (retVal += "br_prikljucaka = '" + document.querySelector("#pretraga_br_prikljucaka").value + "' AND ");
  document.querySelector("#pretraga_pog_sprem").value !== "" && (retVal += "pog_sprem = '" + document.querySelector("#pretraga_pog_sprem").value + "' AND ");
  document.querySelector("#pretraga_vlasnistvo").value !== "" && (retVal += "vlasnistvo = '" + document.querySelector("#pretraga_vlasnistvo").value + "' AND ");
  document.querySelector("#pretraga_opstina").value !== "" && (retVal += "opstina = '" + document.querySelector("#pretraga_opstina").value + "' AND ");
  document.querySelector("#pretraga_napon").value !== "" && (retVal += "napon = '" + document.querySelector("#pretraga_napon").value + "' AND ");



  retVal.length > 5 && (retVal = retVal.substring(0, retVal.length - 5));
  return retVal;
}


function wfsFilter() {
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
      CQL_FILTER: cqlFilter,
    },
    success: function (response) {
      console.log(response);
      let features = new ol.format.GeoJSON().readFeatures(response);
      console.log(features);
      vektorSource.addFeatures(features);
      console.log(vektorSource.getExtent());
      let boundingExtent = ol.extent.boundingExtent(vektorSource.getExtent());
      boundingExtent = ol.proj.transformExtent(boundingExtent, ol.proj.get("EPSG:4326"), ol.proj.get("EPSG:3857"));
      console.log(boundingExtent);
      console.log("size", map.getSize());
      //map.getView().fit(boundingExtent, map.getSize());
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/**Vraća jedan objekat čiji se id predaje i čija geometrija će se mijenjati */
function wfsZaEdit(id) {
  if (id === "") {
    poruka("Upozorenje", "Nije odabran objekat čija geometrija se želi mijenjati.");
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
  window.open(wfsUrl + "?version=1.0.0&request=GetFeature&typeName=geonode:" + layername + "&outputformat=" + format + dodajCqlFilter, "_blank");
  return false;
}

/**Povezivanje kontrola koje zavise od lejera sa akcijama */
document.querySelector("#btnSacuvaj").addEventListener("click", sacuvaj);
document.querySelector("#btnIzbrisi").addEventListener("click", izbrisi);
document.querySelector("#btnFilter").addEventListener("click", filtriranje);

popuniDdlAtributima("#materijal", "nkro", "materijal", "", "");
popuniDdlAtributima("#montaza", "nkro", "montaza", "", "");
popuniDdlAtributima("#vrata", "nkro", "vrata", "", "");
popuniDdlAtributima("#pog_sprem", "nkro", "pog_sprem", "", "");
popuniDdlAtributima("#vlasnistvo", "nkro", "vlasnistvo", "", "");
popuniDdlAtributima("#opstina", "nkro", "opstina", "", "");

popuniDdlAtributima("#pretraga_materijal", "nkro", "materijal", "", "");
popuniDdlAtributima("#pretraga_montaza", "nkro", "montaza", "", "");
popuniDdlAtributima("#pretraga_vrata", "nkro", "vrata", "", "");
popuniDdlAtributima("#pretraga_pog_sprem", "nkro", "pog_sprem", "", "");
popuniDdlAtributima("#pretraga_vlasnistvo", "nkro", "vlasnistvo", "", "");
popuniDdlAtributima("#pretraga_opstina", "nkro", "opstina", "", "");