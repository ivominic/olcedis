/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */

/**Popunjavanje komponenti u divu za prikaz atributa, nakon pročitanog odgovora za WMS objekat */
function popuniKontrole(odgovor) {
  let atributi = odgovor.features[0]["properties"];
  idObjekta = atributi["id"];
  document.querySelector("#gps").value = atributi["gps"];
  document.querySelector("#broj").value = atributi["broj"];
  document.querySelector("#nad_visina").value = atributi["nad_visina"];
  document.querySelector("#visina").value = atributi["visina"];
  document.querySelector("#rasp_prov").value = atributi["rasp_prov"];
  document.querySelector("#br_izol_faza").value = atributi["br_izol_faza"];
  document.querySelector("#uzemljivac_otpor").value = atributi["uzemljivac_otpor"];
  document.querySelector("#br_pmo").value = atributi["br_pmo"];
  document.querySelector("#br_nnv").value = atributi["br_nnv"];
  document.querySelector("#pog_sprem").value = atributi["pog_sprem"];
  document.querySelector("#opstina").value = atributi["opstina"];
  document.querySelector("#napon").value = atributi["napon"];

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
  let odabraniSloj = document.querySelector("#ddl_sloj_podataka").value;
  vodNaponskiNivoPrijeOdabira = document.querySelector("#napon").value;
  if (selektovaniWmsObjekat) {
    if (odabraniSloj === Podsloj.Pod) {
      poruka(StatusPoruke.Upozorenje, UnosPoruke.NijeMoguceMijenjatiPod);
      return false;
    }
    if (!provjeraPravaUnosIzmjena(globalUsername, globalVlasnik, selektovaniWmsObjekat.properties.vlasnik)) {
      return false;
    }

    if (obaveznaPolja(odabraniSloj) === false) {
      poruka(StatusPoruke.Upozorenje, UnosPoruke.PopunitiObaveznaPolja);
      return false;
    }

    izmjenaAtributaWmsLejer(selektovaniWmsObjekat);
  } else {
    if (!selectGpxFeature && odabraniLejerUnos !== "vodovi") {
      poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabratiGpxTacku);
      return false;
    }
    if (obaveznaPolja(odabraniSloj) === false) {
      poruka(StatusPoruke.Upozorenje, UnosPoruke.PopunitiObaveznaPolja);
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
        dodajPoljaUcrtanomVodu(selectGpxFeature);
      } else {
        if (isEditable) {
          showDiv("#odabirPoveznicaDiv");
          closeDiv("#atributiDiv");
        } else {
          if (!selectGpxFeature) {
            poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabratiKmlVod);
            return false;
          }
          dodajPoljaUcrtanomVodu(selectGpxFeature);
        }
      }
      select.getFeatures().clear();
      selectGpxFeature = null;
      return false;
    }
    if (odabraniLejerUnos === "trafostanice") {
      dodajPoljaOdabranojGpxTrafostanici();
      select.getFeatures().clear();
      selectGpxFeature = null;
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
      select.getFeatures().clear();
      selectGpxFeature = null;
      return false;
    }
    if (odabraniLejerUnos === "potrosaci") {
      dodajPoljaOdabranomGpxPotrosac();
      //select.getFeatures().clear();
      selectGpxFeature = null;
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
    });
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
}

/**Omogućava dodavanje novog vektor lejera drag-drop metodom */
let vektorSource = new ol.source.Vector();
let vectorSource;
let dragAndDrop = new ol.interaction.DragAndDrop({
  formatConstructors: [ol.format.GPX, ol.format.GeoJSON, ol.format.IGC, ol.format.KML, ol.format.TopoJSON],
});
dragAndDrop.on("addfeatures", function (event) {
  kmlLinksArray.length = 0; //Emptying array of links with  nearby objects
  let layerNameImport = vectorLayerType(event);
  closeDiv("#atributiDiv");
  closeDiv("#pretragaDiv");
  disableMenija();
  showDiv("#odabirNapojneTrafostaniceDiv");

  blnDodijeljenoGpxProperties = false;
  event.features.forEach(function (feature) {
    let tempTimestamp = new Date().getTime() + "_" + feature.ol_uid;
    feature.set("originalId", tempTimestamp);
    feature.set("isEditable", isEditable);
    feature.set("napon", naponskiNivoNapojneTrafostanice);
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
  vectorSource = new ol.source.Vector({
    features: event.features,
    projection: event.projection,
  });
  extractKmlLinestringEndPoints();

  //On drag'n'drop layer, all other vector layers are removed
  map.getLayers().forEach(function (layer) {
    if (layer instanceof ol.layer.Vector) {
      map.removeLayer(layer);
    }
  });

  map.getLayers().push(
    new ol.layer.Vector({
      source: vectorSource,
      style: kreiranjeLabeleZaGpxTacke(),
    })
  );
  view.fit(vectorSource.getExtent(), {
    size: map.getSize(),
    padding: [10, 30, 70, 30],
  });
});
map.addInteraction(dragAndDrop);

let snap = new ol.interaction.Snap({
  source: featureSnapOverlay.getSource(),
});
map.addInteraction(snap);

map.addInteraction(select);
map.on("click", klikNaVektore);

/** Brisanje odabranog wms objekta */
function izbrisi() {
  if (select.getFeatures().array_[0] === undefined && !selektovaniWmsObjekat) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.SelektovatiObjekatZaBrisanje);
    return false;
  }
  if (selektovaniWmsObjekat) {
    console.log("PROVJERA", selektovaniWmsObjekat.properties.vlasnik);
    if (document.querySelector("#ddl_sloj_podataka").value === Podsloj.Pod) {
      poruka(StatusPoruke.Upozorenje, UnosPoruke.NijeMoguceUklanjatiPod);
      return false;
    }
    if (!provjeraPravaUnosIzmjena(globalUsername, globalVlasnik, selektovaniWmsObjekat.properties.vlasnik)) {
      return false;
    }
  }
  Swal.fire({
    title: UnosPoruke.DaLiObjekatBrisanje,
    position: "top-end",
    showDenyButton: true,
    confirmButtonText: `Da`,
    denyButtonText: `Ne`,
  }).then((result) => {
    if (result.isConfirmed) {
      //Brisati
      if (select.getFeatures().array_.length && select.getFeatures().array_[0].values_.lejer === "brisanje") {
        poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabranLejerBrisanje);
        return false;
      }
      if (select.getFeatures().array_.length && select.getFeatures().array_[0].values_.lejer === "azuriranje") {
        poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabranLejerAzuriranje);
        return false;
      }
      //console.log("WMS objekat za brisanje", selektovaniWmsObjekat);
      if (select.getFeatures().array_.length) {
        //console.log("Lejer vektorskog objekta", select.getFeatures().array_[0].values_.lejer);
        if (select.getFeatures().array_[0].values_.lejer === "vodovi") {
          let nizZaBrisanje = nizVodovaGpx;
          vektorKreiraniVodovi
            .getSource()
            .getFeatures()
            .forEach(function (el, index, nizZaBrisanje) {
              if (select.getFeatures().array_[0] !== undefined && el.ol_uid == select.getFeatures().array_[0].ol_uid) {
                nizZaBrisanje.splice(index, 1);
                select.getFeatures().array_.splice(0, 1);
                selectGpxFeature = null;
                vektorKreiraniVodovi.getSource().clear();
                vektorKreiraniVodovi.getSource().addFeatures(nizZaBrisanje);
              }
            });
        } else {
          let nizZaBrisanje = vectorSource.getFeatures();
          vectorSource.getFeatures().forEach(function (el, index, nizZaBrisanje) {
            if (select.getFeatures().array_[0] !== undefined && el.ol_uid == select.getFeatures().array_[0].ol_uid) {
              nizZaBrisanje.splice(index, 1);
              select.getFeatures().array_.splice(0, 1);
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
        }
      } else {
        dodajObjekatZaBrisanje(selektovaniWmsObjekat);
      }
    } else if (result.isDenied) {
      //Ako odustane - ništa ne raditi
    }
  });
}

/** Funkcija koja vrši dupliranje selektovanog objekta (tačke) iz gpx fajla */
function dupliraj() {
  if (select.getFeatures().array_[0] === undefined) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabratiGpxTacku);
    return false;
  }

  vectorSource.getFeatures().forEach(function (el) {
    if (select.getFeatures().array_[0] !== undefined && el.ol_uid == select.getFeatures().array_[0].ol_uid) {
      select.getFeatures().clear(); //Da bi uklonili stil selektovane tačke
      let feature = el.clone();
      let timestamp = Date.now();
      if (feature.values_.lejer === Podsloj.PrikljucnoMjesto) {
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

/* Filter wms-a po prostornim i atributskim podacima*/
function filtriranje() {
  let rasterLayer = podesiLejerZaPretragu();
  let prostorniFilter = kreiranjeCqlFilteraProstorno();
  let atributniFilter = kreiranjeCqlFilteraAtributi();
  if (prostorniFilter !== "" && atributniFilter !== "") {
    cqlFilter = "(" + prostorniFilter + ") AND " + atributniFilter;
  } else {
    cqlFilter = prostorniFilter + atributniFilter;
  }
  console.log("CQL FILTER", cqlFilter);
  if (cqlFilter === "") {
    return false;
  }

  let params = rasterLayer.getSource().getParams();
  params.CQL_FILTER = cqlFilter;
  rasterLayer.getSource().updateParams(params);
}

function podesiLejerZaPretragu() {
  let ddlValue = document.querySelector("#ddlLejer").value;

  if (ddlValue === "stubovi") {
    return wmsStubovi;
  }
  if (ddlValue === "vodovi") {
    return wmsVodovi;
  }
  if (ddlValue === "trafostanice") {
    return wmsTrafostanice;
  }
  if (ddlValue === "prikljucno_mjesto") {
    return wmsPrikljucnoMjesto;
  }
  if (ddlValue === "nkro") {
    return wmsNKRO;
  }
}

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
      let features = new ol.format.GeoJSON().readFeatures(response);
      vektorSource.addFeatures(features);
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/**Vraća jedan objekat čiji se id predaje i čija geometrija će se mijenjati */
function wfsZaEdit(id) {
  if (id === "") {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.NijeOdabranIzmjenaGeometrije);
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
