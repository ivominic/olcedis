/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
let layername = "trafostanice",
  fulllayername = "geonode:trafostanice",
  layertitle = "Trafostanice";
let tipGeometrije = point;
let opisSlike = "";
let vrijednostPocetneTacke = 0,
  vrijednostKrajnjeTacke = 0;

/**Popunjavanje komponenti u divu za prikaz atributa, nakon pročitanog odgovora za WMS objekat */
function popuniKontrole(odgovor) {
  let atributi = odgovor.features[0]["properties"];
  idObjekta = atributi["id"];
  document.querySelector("#gps").value = atributi["gps"];
  document.querySelector("#broj").value = atributi["broj"];
  document.querySelector("#sifra").value = atributi["sifra"];
  document.querySelector("#pripadnost").value = atributi["pripadnost"];
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
    poruka("Upozorenje", "Potrebno je nacrtati objekat.");
    return false;
  }
  if (akcija === "izmijeni" && (geometrijaZaBazuWkt === "" || idObjekta === 0)) {
    poruka("Upozorenje", "Potrebno je izmijeniti geometriju odabranog objekta.");
    return false;
  }
  if (akcija === "atributi" && idObjekta === 0) {
    poruka("Upozorenje", "Potrebno je odabrati objekat čije atribute mijenjate.");
    return false;
  }

  let podaciForme = new FormData();
  podaciForme.append("id", idObjekta);
  podaciForme.append("akcija", akcija);
  podaciForme.append("geom", geometrijaZaBazuWkt);
  podaciForme.append("gps", document.querySelector("#gps").value);
  podaciForme.append("broj", document.querySelector("#broj").value);
  podaciForme.append("sifra", document.querySelector("#sifra").value);
  podaciForme.append("pripadnost", document.querySelector("#pripadnost").value);
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
  podaciForme.append("br_nnv", document.querySelector("#").value);
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
  document.querySelector("#visina").value = "";
  document.querySelector("#tip").value = "";
  document.querySelector("#dodavanjeSlike").value = "";
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
      showDiv("#atributiDiv");
      console.log("feature nova geometrija", geometrijaZaBazuWkt);
    });
    modify.on("modifyend", function (e) {
      //Iz nekog razloga na brisanje čvora ne očitava odmah izmjenu
      console.log("broj geometrija", e.features.getArray().length);
      geometrijaZaBazuWkt = wktGeometrije(e.features.getArray()[0]);
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
  event.features.forEach(function (feature) {
    let position = ol.proj.transform(feature.values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326");
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
  view.fit(vectorSource.getExtent(), map.getSize());
});
map.addInteraction(dragAndDrop);

/** Selekcija i modifikacija */

var select = new ol.interaction.Select({
  wrapX: false,
});

select.on("select", function (e) {
  //console.log("select target", e.target.getFeatures().array_[0].values_.name);
  console.log("select target", e.target.getFeatures());
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
  let position = ol.proj.transform(e.features.getArray()[0].values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326");
  console.log("koordinate m", position);
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
    if (distanca > dozvoljeniPomjeraj) {
      e.features.getArray()[0].getGeometry().setCoordinates(pocetnaTacka.flatCoordinates);
      poruka("Upozorenje", "Tačka ne može biti pomjerena više od " + (dozvoljeniPomjeraj * 1000).toString() + "m od snimljene pozicije.");
    }
    citajExtent();
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

function izbrisi() {
  console.log("kml", vectorSource);
  //confirmModal("UKLANJANJE", "Da li ste sigurni da želite da uklonite odabrani objekat?");
}

/**Metoda koja će sve resetovati na početne vrijednosti */
function ponisti() {
  restartovanje();
}

function brisanje() {
  let podaciForme = new FormData();
  podaciForme.append("id", idObjekta);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", izbrisiZapisUrl, true);
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

  document.querySelector("#pretraga_gps").value !== "" && (retVal += "gps = '" + document.querySelector("#pretraga_gps").value + "' AND ");
  document.querySelector("#pretraga_broj").value !== "" && (retVal += "broj = '" + document.querySelector("#pretraga_broj").value + "' AND ");
  document.querySelector("#pretraga_sifra").value !== "" && (retVal += "sifra = '" + document.querySelector("#pretraga_sifra").value + "' AND ");
  document.querySelector("#pretraga_pripadnost").value !== "" && (retVal += "pripadnost = '" + document.querySelector("#pretraga_pripadnost").value + "' AND ");
  document.querySelector("#pretraga_tip").value !== "" && (retVal += "tip = '" + document.querySelector("#pretraga_tip").value + "' AND ");
  document.querySelector("#pretraga_vrsta_namjena").value !== "" && (retVal += "vrsta_namjena = '" + document.querySelector("#pretraga_vrsta_namjena").value + "' AND ");
  document.querySelector("#pretraga_vrsta_materijal").value !== "" && (retVal += "vrsta_materijal = '" + document.querySelector("#pretraga_vrsta_materijal").value + "' AND ");
  document.querySelector("#pretraga_vrsta_drvenog").value !== "" && (retVal += "vrsta_drvenog = '" + document.querySelector("#pretraga_vrsta_drvenog").value + "' AND ");
  document.querySelector("#pretraga_nad_visina").value !== "" && (retVal += "nad_visina = '" + document.querySelector("#pretraga_nad_visina").value + "' AND ");
  document.querySelector("#pretraga_visina").value !== "" && (retVal += "visina = '" + document.querySelector("#pretraga_visina").value + "' AND ");
  document.querySelector("#pretraga_rasp_prov").value !== "" && (retVal += "rasp_prov = '" + document.querySelector("#pretraga_rasp_prov").value + "' AND ");
  document.querySelector("#pretraga_izolator_vrsta").value !== "" && (retVal += "izolator_vrsta = '" + document.querySelector("#pretraga_izolator_vrsta").value + "' AND ");
  document.querySelector("#pretraga_izolator_funkcija").value !== "" &&
    (retVal += "izolator_funkcija = '" + document.querySelector("#pretraga_izolator_funkcija").value + "' AND ");
  document.querySelector("#pretraga_br_izol_faza").value !== "" && (retVal += "br_izol_faza = '" + document.querySelector("#pretraga_br_izol_faza").value + "' AND ");
  document.querySelector("#pretraga_tip_nosac_izol").value !== "" && (retVal += "tip_nosac_izol = '" + document.querySelector("#pretraga_tip_nosac_izol").value + "' AND ");
  document.querySelector("#pretraga_odvodnik_prenapona").value !== "" &&
    (retVal += "odvodnik_prenapona = '" + document.querySelector("#pretraga_odvodnik_prenapona").value + "' AND ");
  document.querySelector("#pretraga_uzemljivac").value !== "" && (retVal += "uzemljivac = '" + document.querySelector("#pretraga_uzemljivac").value + "' AND ");
  document.querySelector("#pretraga_uzemljivac_otpor").value !== "" && (retVal += "uzemljivac_otpor = '" + document.querySelector("#pretraga_uzemljivac_otpor").value + "' AND ");
  document.querySelector("#pretraga_optika").value !== "" && (retVal += "optika = '" + document.querySelector("#pretraga_optika").value + "' AND ");
  document.querySelector("#pretraga_rasvjeta").value !== "" && (retVal += "rasvjeta = '" + document.querySelector("#pretraga_rasvjeta").value + "' AND ");
  document.querySelector("#pretraga_br_pmo").value !== "" && (retVal += "br_pmo = '" + document.querySelector("#pretraga_br_pmo").value + "' AND ");
  document.querySelector("#pretraga_br_nnv").value !== "" && (retVal += "br_nnv = '" + document.querySelector("#pretraga_br_nnv").value + "' AND ");
  document.querySelector("#pretraga_pog_sprem").value !== "" && (retVal += "pog_sprem = '" + document.querySelector("#pretraga_pog_sprem").value + "' AND ");
  document.querySelector("#pretraga_vlasnistvo").value !== "" && (retVal += "vlasnistvo = '" + document.querySelector("#pretraga_vlasnistvo").value + "' AND ");
  document.querySelector("#pretraga_opstina").value !== "" && (retVal += "opstina = '" + document.querySelector("#pretraga_opstina").value + "' AND ");
  document.querySelector("#pretraga_napon").value !== "" && (retVal += "napon = '" + document.querySelector("#pretraga_napon").value + "' AND ");
  document.querySelector("#pretraga_prikljucak_otcjep").value !== "" &&
    (retVal += "prikljucak_otcjep = '" + document.querySelector("#pretraga_prikljucak_otcjep").value + "' AND ");
  document.querySelector("#pretraga_nn_vod").value !== "" && (retVal += "nn_vod = '" + document.querySelector("#pretraga_nn_vod").value + "' AND ");
  document.querySelector("#pretraga_rastavljac").value !== "" && (retVal += "rastavljac = '" + document.querySelector("#pretraga_rastavljac").value + "' AND ");
  document.querySelector("#pretraga_10_vod").value !== "" && (retVal += "10_vod = '" + document.querySelector("#pretraga_10_vod").value + "' AND ");

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
      //boundingExtent = ol.proj.transformExtent(boundingExtent, ol.proj.get("EPSG:4326"), ol.proj.get("EPSG:3857"));
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

popuniDdlAtributima("#pretraga_tip", "stubovi", "tip", "", "");
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