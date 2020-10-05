/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
const layername = "vodovi",
  layertitle = "Vodovi";
const tipGeometrije = lineString;
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
  document.querySelector("#dionica").value = atributi["dionica"];
  document.querySelector("#id_br").value = atributi["id_br"];
  document.querySelector("#naziv").value = atributi["naziv"];
  document.querySelector("#dionica_nn").value = atributi["dionica_nn"];
  document.querySelector("#ts").value = atributi["ts"];
  document.querySelector("#izvod_ts").value = atributi["izvod_ts"];
  document.querySelector("#napon").value = atributi["napon"];
  //document.querySelector("#br_faza").value = atributi["br_faza"];
  //document.querySelector("#vrsta").value = atributi["vrsta"];
  //document.querySelector("#tip").value = atributi["tip"];
  //document.querySelector("#presjek").value = atributi["presjek"];
  //document.querySelector("#materijal").value = atributi["materijal"];
  document.querySelector("#br_spojnica").value = atributi["br_spojnica"];
  //document.querySelector("#rasvjeta").value = atributi["rasvjeta"];
  //document.querySelector("#pog_sprem").value = atributi["pog_sprem"];
  document.querySelector("#god_izg").value = atributi["god_izg"];
  //document.querySelector("#vlasnistvo").value = atributi["vlasnistvo"];
  //document.querySelector("#opstina").value = atributi["opstina"];
  document.querySelector("#poc_dion").value = atributi["poc_dion"];
  document.querySelector("#kraj_dion").value = atributi["kraj_dion"];
  //document.querySelector("#uze_presjek").value = atributi["uze_presjek"];
  //document.querySelector("#uze").value = atributi["uze"];
  document.querySelector("#zajednicka_dion").value = atributi["zajednicka_dion"];

  setujDdlVrijednost("#br_faza", atributi["br_faza"]);
  setujDdlVrijednost("#vrsta", atributi["vrsta"]);
  setujDdlVrijednost("#tip", atributi["tip"]);
  setujDdlVrijednost("#presjek", atributi["presjek"]);
  setujDdlVrijednost("#materijal", atributi["materijal"]);
  setujDdlVrijednost("#rasvjeta", atributi["rasvjeta"]);
  setujDdlVrijednost("#pog_sprem", atributi["pog_sprem"]);
  setujDdlVrijednost("#vlasnistvo", atributi["vlasnistvo"]);
  setujDdlVrijednost("#opstina", atributi["opstina"]);
  setujDdlVrijednost("#uze_presjek", atributi["uze_presjek"]);
  setujDdlVrijednost("#uze", atributi["uze"]);

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
  podaciForme.append("dionica", document.querySelector("#dionica").value);
  podaciForme.append("id_br", document.querySelector("#id_br").value);
  podaciForme.append("naziv", document.querySelector("#naziv").value);
  podaciForme.append("dionica_nn", document.querySelector("#dionica_nn").value);
  podaciForme.append("ts", document.querySelector("#ts").value);
  podaciForme.append("izvod_ts", document.querySelector("#izvod_ts").value);
  podaciForme.append("napon", document.querySelector("#napon").value);
  podaciForme.append("br_faza", document.querySelector("#br_faza").value);
  podaciForme.append("vrsta", document.querySelector("#vrsta").value);
  podaciForme.append("tip", document.querySelector("#tip").value);
  podaciForme.append("presjek", document.querySelector("#presjek").value);
  podaciForme.append("materijal", document.querySelector("#materijal").value);
  podaciForme.append("br_spojnica", document.querySelector("#br_spojnica").value);
  podaciForme.append("rasvjeta", document.querySelector("#rasvjeta").value);
  podaciForme.append("pog_sprem", document.querySelector("#pog_sprem").value);
  podaciForme.append("god_izg", document.querySelector("#god_izg").value);
  podaciForme.append("vlasnistvo", document.querySelector("#vlasnistvo").value);
  podaciForme.append("opstina", document.querySelector("#opstina").value);
  podaciForme.append("poc_dion", document.querySelector("#poc_dion").value);
  podaciForme.append("kraj_dion", document.querySelector("#kraj_dion").value);
  podaciForme.append("uze_presjek", document.querySelector("#uze_presjek").value);
  podaciForme.append("uze", document.querySelector("#uze").value);
  podaciForme.append("zajednicka_dion", document.querySelector("#zajednicka_dion").value);

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
  document.querySelector("#dionica").value = "";
  document.querySelector("#id_br").value = "";
  document.querySelector("#naziv").value = "";
  document.querySelector("#dionica_nn").value = "";
  document.querySelector("#ts").value = "";
  document.querySelector("#izvod_ts").value = "";
  document.querySelector("#napon").value = "";
  document.querySelector("#br_faza").value = "";
  document.querySelector("#vrsta").value = "";
  document.querySelector("#tip").value = "";
  document.querySelector("#presjek").value = "";
  document.querySelector("#materijal").value = "";
  document.querySelector("#br_spojnica").value = "";
  document.querySelector("#rasvjeta").value = "";
  document.querySelector("#pog_sprem").value = "";
  document.querySelector("#god_izg").value = "";
  document.querySelector("#vlasnistvo").value = "";
  document.querySelector("#opstina").value = "";
  document.querySelector("#poc_dion").value = "";
  document.querySelector("#kraj_dion").value = "";
  document.querySelector("#uze_presjek").value = "";
  document.querySelector("#uze").value = "";
  document.querySelector("#zajednicka_dion").value = "";

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
featureSnapOverlay.setMap(map);
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
  document.querySelector("#pretraga_dionica").value !== "" && (retVal += "dionica = '" + document.querySelector("#pretraga_dionica").value + "' AND ");
  document.querySelector("#pretraga_id_br").value !== "" && (retVal += "id_br = '" + document.querySelector("#pretraga_id_br").value + "' AND ");
  document.querySelector("#pretraga_naziv").value !== "" && (retVal += "naziv = '" + document.querySelector("#pretraga_naziv").value + "' AND ");
  document.querySelector("#pretraga_dionica_nn").value !== "" && (retVal += "dionica_nn = '" + document.querySelector("#pretraga_dionica_nn").value + "' AND ");
  document.querySelector("#pretraga_ts").value !== "" && (retVal += "ts = '" + document.querySelector("#pretraga_ts").value + "' AND ");
  document.querySelector("#pretraga_izvod_ts").value !== "" && (retVal += "izvod_ts = '" + document.querySelector("#pretraga_izvod_ts").value + "' AND ");
  document.querySelector("#pretraga_napon").value !== "" && (retVal += "napon = '" + document.querySelector("#pretraga_napon").value + "' AND ");
  document.querySelector("#pretraga_br_faza").value !== "" && (retVal += "br_faza = '" + document.querySelector("#pretraga_br_faza").value + "' AND ");
  document.querySelector("#pretraga_vrsta").value !== "" && (retVal += "vrsta = '" + document.querySelector("#pretraga_vrsta").value + "' AND ");
  document.querySelector("#pretraga_tip").value !== "" && (retVal += "tip = '" + document.querySelector("#pretraga_tip").value + "' AND ");
  document.querySelector("#pretraga_presjek").value !== "" && (retVal += "presjek = '" + document.querySelector("#pretraga_presjek").value + "' AND ");
  document.querySelector("#pretraga_materijal").value !== "" && (retVal += "materijal = '" + document.querySelector("#pretraga_materijal").value + "' AND ");
  document.querySelector("#pretraga_br_spojnica").value !== "" && (retVal += "br_spojnica = '" + document.querySelector("#pretraga_br_spojnica").value + "' AND ");
  document.querySelector("#pretraga_rasvjeta").value !== "" && (retVal += "rasvjeta = '" + document.querySelector("#pretraga_rasvjeta").value + "' AND ");
  document.querySelector("#pretraga_pog_sprem").value !== "" && (retVal += "pog_sprem = '" + document.querySelector("#pretraga_pog_sprem").value + "' AND ");
  document.querySelector("#pretraga_god_izg").value !== "" && (retVal += "god_izg = '" + document.querySelector("#pretraga_god_izg").value + "' AND ");
  document.querySelector("#pretraga_vlasnistvo").value !== "" && (retVal += "vlasnistvo = '" + document.querySelector("#pretraga_vlasnistvo").value + "' AND ");
  document.querySelector("#pretraga_opstina").value !== "" && (retVal += "opstina = '" + document.querySelector("#pretraga_opstina").value + "' AND ");
  document.querySelector("#pretraga_poc_dion").value !== "" && (retVal += "poc_dion = '" + document.querySelector("#pretraga_poc_dion").value + "' AND ");
  document.querySelector("#pretraga_kraj_dion").value !== "" && (retVal += "kraj_dion = '" + document.querySelector("#pretraga_kraj_dion").value + "' AND ");
  document.querySelector("#pretraga_uze_presjek").value !== "" && (retVal += "uze_presjek = '" + document.querySelector("#pretraga_uze_presjek").value + "' AND ");
  document.querySelector("#pretraga_uze").value !== "" && (retVal += "uze = '" + document.querySelector("#pretraga_uze").value + "' AND ");
  document.querySelector("#pretraga_zajednicka_dion").value !== "" && (retVal += "zajednicka_dion = '" + document.querySelector("#pretraga_zajednicka_dion").value + "' AND ");

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

popuniDdlAtributima("#br_faza", "vodovi", "br_faza", "", "");
popuniDdlAtributima("#vrsta", "vodovi", "vrsta", "", "");
popuniDdlAtributima("#tip", "vodovi", "tip", "", "");
popuniDdlAtributima("#presjek", "vodovi", "presjek", "", "");
popuniDdlAtributima("#materijal", "vodovi", "materijal", "", "");
popuniDdlAtributima("#rasvjeta", "vodovi", "rasvjeta", "", "");
popuniDdlAtributima("#pog_sprem", "vodovi", "pog_sprem", "", "");
popuniDdlAtributima("#vlasnistvo", "vodovi", "vlasnistvo", "", "");
popuniDdlAtributima("#opstina", "vodovi", "opstina", "", "");
popuniDdlAtributima("#uze_presjek", "vodovi", "uze_presjek", "", "");
popuniDdlAtributima("#uze", "vodovi", "uze", "", "");

popuniDdlAtributima("#pretraga_br_faza", "vodovi", "br_faza", "", "");
popuniDdlAtributima("#pretraga_vrsta", "vodovi", "vrsta", "", "");
popuniDdlAtributima("#pretraga_tip", "vodovi", "tip", "", "");
popuniDdlAtributima("#pretraga_presjek", "vodovi", "presjek", "", "");
popuniDdlAtributima("#pretraga_materijal", "vodovi", "materijal", "", "");
popuniDdlAtributima("#pretraga_rasvjeta", "vodovi", "rasvjeta", "", "");
popuniDdlAtributima("#pretraga_pog_sprem", "vodovi", "pog_sprem", "", "");
popuniDdlAtributima("#pretraga_vlasnistvo", "vodovi", "vlasnistvo", "", "");
popuniDdlAtributima("#pretraga_opstina", "vodovi", "opstina", "", "");
popuniDdlAtributima("#pretraga_uze_presjek", "vodovi", "uze_presjek", "", "");
popuniDdlAtributima("#pretraga_uze", "vodovi", "uze", "", "");