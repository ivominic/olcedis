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
  if (atributi["br_nnv"]?.includes(" / ")) {
    document.querySelector("#br_nnv").value = atributi["br_nnv"].split(" / ")[0];
    document.querySelector("#br_nnv_kablovski").value = atributi["br_nnv"].split(" / ")[1];
  } else {
    document.querySelector("#br_nnv").value = atributi["br_nnv"];
  }
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
  if (selektovaniWmsObjekat && selectGpxFeature) {
    console.log("PRAZNI WMS OBJEKAT!!!!!!! Provjeriti ovaj slučaj.");
    selektovaniWmsObjekat = null;
  }
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
    if (odabraniLejerUnos === Lejeri.Stubovi) {
      if (selectGpxFeature) {
        dodajPoljaOdabranomGpxStubu();
        sledecaGpxTacka();
      }
      return false;
    }
    if (odabraniLejerUnos === Lejeri.Vodovi) {
      if (selectGpxFeature?.get("lejer") === "vodovi") {
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
    if (odabraniLejerUnos === Lejeri.Trafostanice) {
      dodajPoljaOdabranojGpxTrafostanici();
      select.getFeatures().clear();
      selectGpxFeature = null;
      return false;
    }
    if (odabraniLejerUnos === Lejeri.NKRO) {
      dodajPoljaOdabranomGpxNKRO();
      sledecaGpxTacka();
      return false;
    }
    if (odabraniLejerUnos === Lejeri.PrikljucnoMjesto) {
      dodajPoljaOdabranomGpxPM();
      sledecaGpxTacka();
      return false;
    }
    if (odabraniLejerUnos === Podsloj.Pod) {
      dodajPoljaOdabranomGpxPod();
      select.getFeatures().clear();
      selectGpxFeature = null;
      return false;
    }
    if (odabraniLejerUnos === "potrosaci") {
      dodajPoljaOdabranomGpxPotrosac();
      //select.getFeatures().clear();
      //selectGpxFeature = null;
      return false;
    }
    if (odabraniLejerUnos === Podsloj.Solari) {
      dodajPoljaOdabranomGpxSolari();
      return false;
    }
    if (odabraniLejerUnos === Lejeri.PrikljucnaKonzola || odabraniLejerUnos === "prikljucna_konzola") {
      dodajPoljaOdabranomGpxPrikljucnaKonzola();
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

    draw.on("drawend", function (e) {
      if (statisticDraw) {
        document.querySelector("#inputStatisticLi").click();
        drawGeom = wktGeometrije(e.feature);
        setupDeleteLayers();
      }
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
    const geometry = feature.getGeometry();
    if (geometry.getType() === 'Point') {
      let coords = geometry.getCoordinates();
      if(coords[0] && coords[1]) {
        coords[0] = truncateToDecimals(coords[0], 6);
        coords[1] = truncateToDecimals(coords[1], 6);
        geometry.setCoordinates(coords);
      }
    }
  });
  
  event.features.forEach(function (feature) {
    let tempTimestamp = new Date().getTime() + "_" + feature.ol_uid;
    feature.set("originalId", tempTimestamp);
    feature.set("isEditable", isEditable);
    // feature.set("napon", naponskiNivoNapojneTrafostanice);
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
    if (selektovaniWmsObjekat.id.startsWith("trafostan") && !selektovaniWmsObjekat.properties.brisanje) {
      poruka(StatusPoruke.Upozorenje, UnosPoruke.TsNijeZaBrisanje);
      return false;
    }
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
      if (select.getFeatures().array_.length) {
        if (select.getFeatures().array_[0].values_.lejer === "vodovi") {
          vektorKreiraniPonovo
            .getSource()
            .getFeatures()
            .forEach(function (el, index) {
              if (el.ol_uid == select.getFeatures().array_[0]?.ol_uid) {
                if (!isEditable) {
                  ukloniSacuvaniKmlFeature(select.getFeatures().array_[0]);
                }
                nizVodovaGpx.splice(index, 1);
                select.getFeatures().array_.splice(0, 1);
                selectGpxFeature = null;
                vektorKreiraniPonovo.getSource().clear();
                vektorKreiraniPonovo.getSource().addFeatures(nizVodovaGpx);
              }
            });
        } else {
          let nizZaBrisanje = vectorSource.getFeatures();
          let olUid = select?.getFeatures()?.array_[0]?.ol_uid;
          vectorSource.getFeatures().forEach(function (el, index) {
            if (el.ol_uid == olUid) {
              if (!isEditable) {
                ukloniSacuvaniKmlFeature(el);
              }
              nizZaBrisanje.splice(index, 1);
              select.getFeatures().array_.splice(0, 1);
              selectGpxFeature = null;
              vectorSource.clear();
              vectorSource.addFeatures(nizZaBrisanje);
            }
          });

          let idxObj = gpxFeatures.findIndex((object) => {
            return object.ol_uid === olUid;
          });
          if (idxObj >= 0) {
            gpxFeatures.splice(idxObj, 1);
          }

          document.querySelector("#divPrethodniObjekat").style.display = "none";
          document.querySelector("#divSljedeciObjekat").style.display = "none";
          nizGpxTacakaZaObradu.length = 0;

          //TODO: Dodao ovaj blok koda za uklanjanje dugmadi next/prev kod brisanja gpx tačke. Ali ne radi kako trevba.
          /*if (nizGpxTacakaZaObradu.length) {
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
          }*/
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
    if (el.ol_uid == select.getFeatures()?.array_[0]?.ol_uid) {
      select.getFeatures().clear(); //Da bi uklonili stil selektovane tačke
      let feature = el.clone();
      let timestamp = Date.now();
      if (feature.values_.lejer === Podsloj.PrikljucnoMjesto) {
        feature.values_.id = timestamp;
        provjeraWfsPrikljucnaMjesta(feature, timestamp);
      } else {
        vectorSource.addFeature(feature);
        gpxFeatures.push(feature);
      }
    }
  });
}

/**Metoda koja će sve resetovati na početne vrijednosti */
function ponisti() {
  restartovanje();
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
  map.getLayers().forEach(function (layer) {
    if (layer instanceof ol.layer.Image) {
      if (layer.get("visible")) {
        window.open(
          wfsUrl +
            "?version=1.0.0&request=GetFeature&typeName=geonode:" +
            layer.values_.name +
            "&outputformat=" +
            format +
            dodajCqlFilter +
            "&access_token=" +
            geoserverToken,
          "_blank"
        );
      }
    }
  });
  return false;
}

async function setupDeleteLayers() {
  let brisanjeLejer = document.querySelector("#brisanjeLejer");
  brisanjeLejer.innerHTML = "";
  const layers = map.getLayers().getArray();
  for (const layer of layers) {
    if (layer instanceof ol.layer.Image && layer.get("visible")) {
        const nasaoLayer = await findIfLayerHasData(layer.values_.name);
        if(nasaoLayer){
          let titleLayer = await vratiTitleOdLejera(layer.values_.name);
           let option = document.createElement("option");
           option.value = layer.values_.name;
           option.text =  titleLayer;
           if(layer.values_.name == "validations" || layer.values_.name == "view_odbijeni") {
           } else {
            brisanjeLejer.appendChild(option);
           }
        }
    }
  }
}

async function findIfLayerHasData(lejer) {
  const tekstFiltera = `INTERSECTS(Geometry, ${drawGeom})`;
  const nazivLejera = `geonode:${lejer}`;
  return new Promise((resolve, reject) => {
    $.ajax({
      method: "POST",
      url: wfsUrl,
      data: {
        access_token: geoserverToken,
        service: "WFS",
        version: "1.0.0",
        request: "GetFeature",
        typeName: nazivLejera,
        outputFormat: "application/json",
        srsname: "EPSG:4326",
        CQL_FILTER: tekstFiltera,
        maxFeatures: 1
      },
      success: function (response) {
        const features = response.features;
        if (features && features.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      error: function (jqXHR, textStatus) {
        console.error(`Error checking layer data: ${textStatus}`);
        resolve(false); // Treat error as no data found
      },
    });
  });
}

async function vratiTitleOdLejera(lejer){
 if(lejer === "view_solari"){
   return 'Solari';
 } else if(lejer === "stubovi"){
  return 'Stubovi';
 } else if(lejer === "vodovi"){
  return 'Vodovi';
 } else if(lejer === "trafostanice"){
  return 'Trafostanice';
 } else if(lejer === "trafostanice_poligoni"){
  return 'Trafostanice poligoni';
 } else if(lejer === "prikljucno_mjesto"){
  return 'Priključno mjesto';
 } else if(lejer === "nkro"){
  return 'NKRO';
 } else if(lejer === "view_potrosaci"){
  return 'Potrošač';
 } else if(lejer === "nelegalni_potrosac"){
  return 'Nelegalni potrošač';
 } else if(lejer === "view_pod"){
  return 'POD';
 } else if(lejer === "validations"){
  return 'Validacija';
 } else if(lejer === "poslovni_objekti"){
  return 'Poslovni objekat';
 } else if(lejer === "view_odbijeni"){
  return 'Odbijene validacije';
 } else if(lejer === "prikljucna_konzola"){
  return 'Priključna konzola';
 } else {
   return lejer;
 }
}

function truncateToDecimals(value, decimals = 6) {
  const factor = Math.pow(10, decimals);
  return Math.trunc(value * factor) / factor;
}

/**Povezivanje kontrola koje zavise od lejera sa akcijama */
document.querySelector("#btnSacuvaj").addEventListener("click", sacuvaj);
document.querySelector("#btnIzbrisi").addEventListener("click", izbrisi);
document.querySelector("#btnDupliraj").addEventListener("click", dupliraj);
