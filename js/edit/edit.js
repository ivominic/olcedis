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
  //document.querySelector("#nosaci_izolatora").value = atributi["nosaci_izolatora"];
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
  setujDdlVrijednost("#nosaci_izolatora", atributi["nosaci_izolatora"]);
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
  console.log("Administracija sacuvaj()");
  if (selektovaniWmsObjekat) {
    alert("Odabran je wms objekat");
    //TODO: Logika za slanje ažuriranja atributa
    izmjenaAtributaWmsLejer(selektovaniWmsObjekat);
  } else {
    if (!selectGpxFeature && odabraniLejerUnos !== "vodovi") {
      poruka("Upozorenje", "Potrebno je odabrati tačku iz gpx fajla.");
      return false;
    }
    if (obaveznaPolja(document.querySelector("#ddl_sloj_podataka").value) === false) {
      poruka("Upozorenje", "Potrebno je popuniti obavezna polja.");
      return false;
    }
    if (odabraniLejerUnos === "stubovi") {
      if (selectGpxFeature) {
        dodajPoljaOdabranomGpxStubu();
        sledecaGpxTacka();
      }
      return false;
    }
    if (odabraniLejerUnos === "vodovi") {
      if (selectGpxFeature.get("lejer") === "vodovi") {
        //If user selects already created power line
        dodajPoljaUcrtanomVodu(selectGpxFeature);
      } else {
        if (isEditable) {
          //TODO: Provjera da li je iscrtan poligon
          showDiv("#odabirPoveznicaDiv");
          closeDiv("#atributiDiv");
        } else {
          if (!selectGpxFeature) {
            poruka("Upozorenje", "Potrebno je odabrati vod iz kml fajla.");
            return false;
          }
          console.log("kml za atribute vodovima");
          //ucrtaniVod = selectGpxFeature;
          dodajPoljaUcrtanomVodu(selectGpxFeature);
        }
      }

      return false;
    }
    if (odabraniLejerUnos === "trafostanice") {
      dodajPoljaOdabranojGpxTrafostanici();
      return false;
    }
    if (odabraniLejerUnos === "nkro") {
      dodajPoljaOdabranomGpxNKRO();
      sledecaGpxTacka();
      return false;
    }
    if (odabraniLejerUnos === "prikljucno_mjesto") {
      dodajPoljaOdabranomGpxPM();
      sledecaGpxTacka();
      return false;
    }
    if (odabraniLejerUnos === "pod") {
      dodajPoljaOdabranomGpxPod();
      //sledecaGpxTacka();
      return false;
    }
    if (odabraniLejerUnos === "potrosaci") {
      dodajPoljaOdabranomGpxPotrosac();
      //sledecaGpxTacka();
      return false;
    }
  }
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
    var snap = new ol.interaction.Snap({
      source: featureSnapOverlay.getSource(),
    });
    map.addInteraction(snap);
  }
  if (akcija === lineString) {
    draw = new ol.interaction.Draw({
      features: featuresLine,
      type: lineString,
      freehand: blnFreeHandDraw,
    });
    modify = new ol.interaction.Modify({
      features: featuresLine,
      condition: function (e) {
        let f = this.getMap().getFeaturesAtPixel(e.pixel, {
          hitTolerance: 5,
        });
        if (f) {
          let v = f[0].getGeometry().getClosestPoint(e.coordinate);
          console.log("koordinate vertexa", v);
        }
        return true;
      },
      deleteCondition: function (event) {
        return ol.events.condition.shiftKeyOnly(event) && ol.events.condition.singleClick(event);
      },
      insertVertexCondition: function () {
        return false;
      },
    });
    map.addInteraction(draw);
    map.addInteraction(modify);
    var snap = new ol.interaction.Snap({
      source: featureSnapOverlay.getSource(),
    });
    map.addInteraction(snap);
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
    var snap = new ol.interaction.Snap({
      source: featureSnapOverlay.getSource(),
    });
    map.addInteraction(snap);
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
  console.log("aaaa", event);
  kmlLinksArray.length = 0; //Emptying array of links with  nearby objects
  let layerNameImport = vectorLayerType(event);
  closeDiv("#atributiDiv");
  closeDiv("#pretragaDiv");
  disableMenija();
  showDiv("#odabirNapojneTrafostaniceDiv");

  blnDodijeljenoGpxProperties = false;
  event.features.forEach(function (feature) {
    console.log("feature unos", feature);
    let tempTimestamp = new Date().getTime() + "_" + feature.ol_uid;
    feature.set("originalId", tempTimestamp);
    feature.set("layer_name", layerNameImport);
    feature.set("isEditable", isEditable);
    feature.set("napon", naponskiNivoNapojneTrafostanice);
    /*if (!isEditable) {
      //if (feature.getGeometry().getType().toString().includes("oint")) {
      //TODO: ovo zakomentarisati. Pravi probleme za veći fajl.
      objectNearKmlFeature(feature, feature, "stubovi");
      objectNearKmlFeature(feature, feature, "trafostanice");
      objectNearKmlFeature(feature, feature, "vodovi");
      objectNearKmlFeature(feature, feature, "pod");
      objectNearKmlFeature(feature, feature, "nkro");
      objectNearKmlFeature(feature, feature, "prikljucno_mjesto");
      objectNearKmlFeature(feature, feature, "view_potrosaci");
    }*/

    //let position = ol.proj.transform(feature.values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326");
    let position = feature.values_.geometry.flatCoordinates;
    nizKml.push({
      lat: position[1],
      lng: position[0],
      name: feature.values_.name,
      originalId: feature.values_.originalId,
      description: feature.values_.description,
    });
  });

  gpxFeatures = event.features;

  console.log("niz", nizKml);
  //distanceFromKmlPoints();
  vectorSource = new ol.source.Vector({
    features: event.features,
    projection: event.projection,
  });
  //generisanjeGpxPodaIzGeometrije(20, 20);

  //Provjera za kml tačke sa krajeva linije
  extractKmlLinestringEndPoints();
  /*kmlEndPoints.forEach(function (feature) {
    if (feature.getGeometry().getType().toString().includes("oint")) {
      objectNearKmlFeature(feature, "stubovi");
      objectNearKmlFeature(feature, "trafostanice");
      objectNearKmlFeature(feature, "vodovi");
    }
  });*/

  //On drag'n'drop layer, all other vector layers are removed
  map.getLayers().forEach(function (layer) {
    if (layer instanceof ol.layer.Vector) {
      console.log("vektorski lejeri", layer);
      map.removeLayer(layer);
    }
  });

  map.getLayers().push(
    new ol.layer.Vector({
      source: vectorSource,
      style: kreiranjeLabeleZaGpxTacke(),
    })
  );
  view.fit(vectorSource.getExtent(), map.getSize());
});
map.addInteraction(dragAndDrop);

let snap = new ol.interaction.Snap({
  source: featureSnapOverlay.getSource(),
});
map.addInteraction(snap);

/*** Završena selekcija i modifikacija */

map.addInteraction(select);
//map.addInteraction(modifyV);

//Klik na mapu - prikaz vektora ili rastera
map.on("click", klikNaVektore);

function izbrisi() {
  if (select.getFeatures().array_[0] === undefined && !selektovaniWmsObjekat) {
    poruka("Upozorenje", "Potrebno je selektovati objekat koji želite da izbrišete.");
    return false;
  }
  Swal.fire({
    title: "Da li ste sigurni da želite da izbrišete odabrani objekat?",
    //text: "",
    //icon: "info",
    position: "top-end",
    showDenyButton: true,
    confirmButtonText: `Da`,
    denyButtonText: `Ne`,
  }).then((result) => {
    if (result.isConfirmed) {
      //Brisati
      if (select.getFeatures().array_.length) {
        if (select.getFeatures().array_[0].values_.lejer === "vodovi") {
          let nizZaBrisanje = nizVodovaGpx;
          vektorKreiraniVodovi
            .getSource()
            .getFeatures()
            .forEach(function (el, index, nizZaBrisanje) {
              if (select.getFeatures().array_[0] !== undefined && el.ol_uid == select.getFeatures().array_[0].ol_uid) {
                //if (el.values_.name == select.getFeatures().array_[0].values_.name) {
                nizZaBrisanje.splice(index, 1);
                select.getFeatures().array_.splice(0, 1);
                console.log("ol_uid", el.ol_uid);
                selectGpxFeature = null;
                vektorKreiraniVodovi.getSource().clear();
                vektorKreiraniVodovi.getSource().addFeatures(nizZaBrisanje);
              }
            });
        } else {
          let nizZaBrisanje = vectorSource.getFeatures();
          vectorSource.getFeatures().forEach(function (el, index, nizZaBrisanje) {
            if (select.getFeatures().array_[0] !== undefined && el.ol_uid == select.getFeatures().array_[0].ol_uid) {
              //if (el.values_.name == select.getFeatures().array_[0].values_.name) {
              nizZaBrisanje.splice(index, 1);
              select.getFeatures().array_.splice(0, 1);
              console.log("ol_uid", el.ol_uid);
              selectGpxFeature = null;
              vectorSource.clear();
              vectorSource.addFeatures(nizZaBrisanje);
            }
          });
          //TODO: Dodao ovaj blok koda za uklanjanje dugmadi next/prev kod brisanja gpx tačke. Ali ne radi kako trevba.
          if (nizGpxTacakaZaObradu.length) {
            console.log("nizGpxTacakaZaObradu", nizGpxTacakaZaObradu.length);
            nizGpxTacakaZaObradu.splice(indexGpxTacakaZaObradu, 1);
            console.log("nizGpxTacakaZaObradu", nizGpxTacakaZaObradu.length);
            console.log("indexGpxTacakaZaObradu", indexGpxTacakaZaObradu);
            if (nizGpxTacakaZaObradu.length < 2) {
              document.querySelector("#divPrethodniObjekat").style.display = "none";
              document.querySelector("#divSljedeciObjekat").style.display = "none";
            } else {
              document.querySelector("#divPrethodniObjekat").style.display = "none";
              document.querySelector("#divSljedeciObjekat").style.display = "none";
              if (indexGpxTacakaZaObradu > 0) {
                document.querySelector("#divPrethodniObjekat").style.display = "flex";
              }
              if (indexGpxTacakaZaObradu < nizGpxTacakaZaObradu.length) {
                document.querySelector("#divSljedeciObjekat").style.display = "flex";
              }
            }
          }
          //TODO: Novi blok, koji ne radi, se završava ovdje
        }
      } else {
        console.log("WMS objekat", selektovaniWmsObjekat);
        alert("Briše se objekat iz wms-a");
        //TODO: Poziv servisa za brisanje objekata
        dodajObjekatZaBrisanje(selektovaniWmsObjekat);
      }
    } else if (result.isDenied) {
      //Ako odustane - ništa ne raditi
    }
  });
}

function dupliraj() {
  if (select.getFeatures().array_[0] === undefined) {
    poruka("Upozorenje", "Potrebno je selektovati objekat iz gpx fajla.");
    return false;
  }

  vectorSource.getFeatures().forEach(function (el) {
    if (select.getFeatures().array_[0] !== undefined && el.ol_uid == select.getFeatures().array_[0].ol_uid) {
      select.getFeatures().clear(); //Da bi uklonili stil selektovane tačke
      let feature = el.clone();
      let timestamp = Date.now();
      if (feature.values_.lejer === "prikljucno_mjesto") {
        feature.values_.id = timestamp;
        provjeraWfsPrikljucnaMjesta(feature, timestamp);
      } else {
        vectorSource.addFeature(el.clone());
      }
    }
  });
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

  document.querySelector("#pretraga_gps").value !== "" &&
    (retVal += "gps = '" + document.querySelector("#pretraga_gps").value + "' AND ");
  document.querySelector("#pretraga_broj").value !== "" &&
    (retVal += "broj = '" + document.querySelector("#pretraga_broj").value + "' AND ");
  document.querySelector("#pretraga_sifra").value !== "" &&
    (retVal += "sifra = '" + document.querySelector("#pretraga_sifra").value + "' AND ");
  document.querySelector("#pretraga_pripadnost").value !== "" &&
    (retVal += "pripadnost = '" + document.querySelector("#pretraga_pripadnost").value + "' AND ");
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
  //document.querySelector("#pretraga_nosaci_izolatora").value !== "" &&
  //  (retVal += "nosaci_izolatora = '" + document.querySelector("#pretraga_nosaci_izolatora").value + "' AND ");
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
  //document.querySelector("#pretraga_opstina").value !== "" &&
  //  (retVal += "opstina = '" + document.querySelector("#pretraga_opstina").value + "' AND ");
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

function wfsFilter() {
  $.ajax({
    method: "POST",
    url: wfsUrl,
    data: {
      access_token: geoserverToken,
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
      access_token: geoserverToken,
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
      dodajCqlFilter +
      "&access_token=" +
      geoserverToken,
    "_blank"
  );
  return false;
}

/**Povezivanje kontrola koje zavise od lejera sa akcijama */
document.querySelector("#btnSacuvaj").addEventListener("click", sacuvaj);
document.querySelector("#btnIzbrisi").addEventListener("click", izbrisi);
document.querySelector("#btnDupliraj").addEventListener("click", dupliraj);
document.querySelector("#btnFilter").addEventListener("click", filtriranje);

/**Popunjavanje ddl-ova */

/*popuniDdlAtributima("#tip", "stubovi", "tip", "", "");
popuniDdlAtributima("#vrsta_namjena", "stubovi", "vrsta_namjena", "", "");
popuniDdlAtributima("#vrsta_materijal", "stubovi", "vrsta_materijal", "", "");
popuniDdlAtributima("#vrsta_drvenog", "stubovi", "vrsta_drvenog", "", "");
popuniDdlAtributima("#izolator_vrsta", "stubovi", "izolator_vrsta", "", "");
popuniDdlAtributima("#izolator_funkcija", "stubovi", "izolator_funkcija", "", "");
popuniDdlAtributima("#nosaci_izolatora", "stubovi", "nosaci_izolatora", "", "");
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
popuniDdlAtributima("#pretraga_nosaci_izolatora", "stubovi", "nosaci_izolatora", "", "");
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
