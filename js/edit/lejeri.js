let layernameS = Lejeri.Stubovi,
  fulllayernameS = workspace + Lejeri.Stubovi,
  layertitleS = Lejeri.Stubovi;
let tipGeometrijeS = point;

let wmsStubovi = new ol.layer.Image({
  title: layertitleS,
  name: layernameS,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameS,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernameVodovi = Lejeri.Vodovi,
  fulllayernameVodovi = workspace + Lejeri.Vodovi,
  layertitleVodovi = Lejeri.Vodovi;
let tipGeometrijeVodovi = lineString;

let wmsVodovi = new ol.layer.Image({
  title: layertitleVodovi,
  name: layernameVodovi,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameVodovi,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernameTS = "view_trafostanice",
  fulllayernameTS = "geonode:view_trafostanice",
  layertitleTS = "trafostanice";
let tipGeometrijeTS = point;

let wmsTrafostanice = new ol.layer.Image({
  title: layertitleTS,
  name: layernameTS,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameTS,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernameTSpoligoni = "trafostanice_poligoni",
  fulllayernameTSpoligoni = "geonode:trafostanice_poligoni",
  layertitleTSpoligoni = "trafostanice_poligoni";
let tipGeometrijeTSpoligoni = polygon;

let wmsTrafostanicePoligoni = new ol.layer.Image({
  title: layertitleTSpoligoni,
  name: layernameTSpoligoni,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameTSpoligoni,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernamePotrosaci = Lejeri.Potrosac,
  fulllayernamePotrosaci = workspace + Lejeri.Potrosac,
  layertitlePotrosaci = Lejeri.Potrosac;
let tipGeometrijePotrosaci = point;

let wmsPotrosaci = new ol.layer.Image({
  title: layertitlePotrosaci,
  name: layernamePotrosaci,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernamePotrosaci,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernameNelegalniPotrosaci = Lejeri.NelegalniPotrosac,
  fulllayernameNelegalniPotrosaci = workspace + Lejeri.NelegalniPotrosac,
  layertitleNelegalniPotrosaci = Lejeri.NelegalniPotrosac;
let tipGeometrijeNelegalniPotrosaci = point;

let wmsNelegalniPotrosaci = new ol.layer.Image({
  title: layertitleNelegalniPotrosaci,
  name: layernameNelegalniPotrosaci,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameNelegalniPotrosaci,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernamePrikljucnoMjesto = Lejeri.PrikljucnoMjesto,
  fulllayernamePrikljucnoMjesto = workspace + Lejeri.PrikljucnoMjesto,
  layertitlePrikljucnoMjesto = Lejeri.PrikljucnoMjesto;
let tipGeometrijePrikljucnoMjesto = point;

let wmsPrikljucnoMjesto = new ol.layer.Image({
  title: layertitlePrikljucnoMjesto,
  name: layernamePrikljucnoMjesto,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernamePrikljucnoMjesto,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernameNKRO =  Lejeri.NKRO,
  fulllayernameNKRO = workspace + Lejeri.NKRO,
  layertitleNKRO = Lejeri.NKRO;
let tipGeometrijeNKRO = point;

let wmsNKRO = new ol.layer.Image({
  title: layertitleNKRO,
  name: layernameNKRO,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameNKRO,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernamePOD = Lejeri.POD,
  fulllayernamePOD = workspace + Lejeri.POD,
  layertitlePOD = Lejeri.POD;
let tipGeometrijePOD = point;

let wmsPOD = new ol.layer.Image({
  title: layertitlePOD,
  name: layernamePOD,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernamePOD,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernamePrikljucnaKoznola = Lejeri.PrikljucnaKonzola,
  fulllayernamePrikljucnaKonzola = workspace + Lejeri.PrikljucnaKonzola,
  layertitlePrikljucnaKonzola = Lejeri.PrikljucnaKonzola;
let tipGeometrijePrikljucnaKonzola = point;

let wmsPrikljucnaKonzola = new ol.layer.Image({
  title: layertitlePrikljucnaKonzola,
  name: layernamePrikljucnaKoznola,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernamePrikljucnaKonzola,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernameValidations = Lejeri.Validacija,
  fulllayernameValidations = workspace + Lejeri.Validacija,
  layertitleValidations = Lejeri.Validacija;

let wmsValidations = new ol.layer.Image({
  title: layertitleValidations,
  name: layernameValidations,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameValidations,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernamePoslovniObjekti = Lejeri.PoslovniObjekat,
  fulllayernamePoslovniObjekti = workspace + Lejeri.PoslovniObjekat,
  layertitlePoslovniObjekti = Lejeri.PoslovniObjekat;

let wmsPoslovniObjekti = new ol.layer.Image({
  title: layertitlePoslovniObjekti,
  name: layernamePoslovniObjekti,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernamePoslovniObjekti,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernameOdbijeni = Lejeri.Odbijeni,
  fulllayernameOdbijeni = workspace + Lejeri.Odbijeni,
  layertitleOdbijeni = Lejeri.Odbijeni;

let wmsOdbijeni = new ol.layer.Image({
  title: layertitleOdbijeni,
  name: layernameOdbijeni,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameOdbijeni,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

let layernameSolari = Lejeri.Solari,
  fulllayernameSolari = workspace + Lejeri.Solari,
  layertitleSolari = Lejeri.Solari;

  let wmsSolari = new ol.layer.Image({
    title: layertitleSolari,
    name: layernameSolari,
    source: new ol.source.ImageWMS({
      url: wmsUrl,
      params: {
        LAYERS: fulllayernameSolari,
      },
      ratio: 1,
      serverType: "geoserver",
    }),
  });

map.addLayer(wmsTrafostanicePoligoni);
map.addLayer(wmsStubovi);
map.addLayer(wmsVodovi);
map.addLayer(wmsTrafostanice);
map.addLayer(wmsPotrosaci);
map.addLayer(wmsPrikljucnoMjesto);
map.addLayer(wmsNKRO);
map.addLayer(wmsPOD);
map.addLayer(wmsNelegalniPotrosaci);
map.addLayer(wmsValidations);
map.addLayer(wmsPoslovniObjekti);
map.addLayer(wmsOdbijeni);
map.addLayer(wmsSolari);
map.addLayer(wmsPrikljucnaKonzola);
map.addLayer(vektorObjektiZaAzuriranje);
map.addLayer(vektorKmlAzuriranje);
map.addLayer(vectorKmlFocusedObject);
map.addLayer(vektorKreiraniPonovo);
map.addLayer(vektorKreiraniVodovi);
map.addLayer(vektorObjektiZaBrisanje);

wmsTrafostanicePoligoni.setVisible(false);
wmsValidations.setVisible(false);
wmsNelegalniPotrosaci.setVisible(false);
wmsPoslovniObjekti.setVisible(false);
wmsOdbijeni.setVisible(false);

/**Dio za filtriranje lejera koji se pošalju sa mape map_energetika */

function cqlZaWmsLejer(wmsLejer, filterCql) {
  //console.log(wmsLejer, filterCql);
  let params = wmsLejer.getSource().getParams();
  params.CQL_FILTER = filterCql;
  wmsLejer.getSource().updateParams(params);
}

/**
 * Ukoliko se preda u url-u parametar lejer=odbijeni treba ukloniti sve lejere sa mape i prikazati samo odbijene validcije
 */
function prikazLejeraOdbijenihValidacija() {
  document.querySelector("#lejer_stubovi").checked = false;
  document.querySelector("#lejer_vodovi").checked = false;
  document.querySelector("#lejer_trafostanice").checked = false;
  document.querySelector("#lejer_trafostanice_poligoni").checked = false;
  document.querySelector("#lejer_prikljucno_mjesto").checked = false;
  document.querySelector("#lejer_nkro").checked = false;
  document.querySelector("#lejer_potrosac").checked = false;
  document.querySelector("#lejer_pod").checked = false;

  document.querySelector("#lejer_odbijeni").checked = true;

  wmsStubovi.setVisible(false);
  wmsVodovi.setVisible(false);
  wmsTrafostanicePoligoni.setVisible(false);
  wmsTrafostanice.setVisible(false);
  wmsPotrosaci.setVisible(false);
  wmsPrikljucnoMjesto.setVisible(false);
  wmsNKRO.setVisible(false);
  wmsPOD.setVisible(false);

  wmsOdbijeni.setVisible(true);
}

function pocetniFilter() {
  let url = new URL(location.href);
  let cql_param = unescape(url.searchParams.get("cql_param"));
  let cql_opstina = unescape(url.searchParams.get("cql_opstina"));
  let cql_nivo = unescape(url.searchParams.get("cql_nivo"));
  let inactive_layers = unescape(url.searchParams.get("inactive_layers"));
  let geohash_test = unescape(url.searchParams.get("geohash_id"));
  let odbijeneValidacije = unescape(url.searchParams.get("lejer"));

  if (odbijeneValidacije === "odbijeni") {
    prikazLejeraOdbijenihValidacija();
  }

  if (cql_opstina === "null") {
    cql_opstina = "";
  }
  if (cql_nivo === "null") {
    cql_nivo = "";
  }
  if (cql_param === "null") {
    cql_param = "";
  }

  //Isključivanje lejera koji su proslijeđeni sa glavne mape
  if (inactive_layers !== "null" && inactive_layers !== "") {
    let arr = inactive_layers.split(",");
    arr.forEach((el) => {
      if (el === "stubovi") {
        document.querySelector("#lejer_stubovi").click();
        //wmsStubovi.setVisible(false);
      } else if (el === "vodovi") {
        document.querySelector("#lejer_vodovi").click();
        //wmsVodovi.setVisible(false);
      } else if (el === "trafostanice" || el === "trafostanice_poligoni") {
        document.querySelector("#lejer_trafostanice").click();
        document.querySelector("#lejer_trafostanice_poligoni").click();
        //wmsTrafostanice.setVisible(false);
        //wmsTrafostanicePoligoni.setVisible(false);
      } else if (el === "prikljucno_mjesto") {
        document.querySelector("#lejer_prikljucno_mjesto").click();
        //wmsPrikljucnoMjesto.setVisible(false);
      } else if (el === "potrosac" || el === "view_potrosaci") {
        document.querySelector("#lejer_potrosac").click();
        //wmsPotrosaci.setVisible(false);
      } else if (el === "pod" || el === "view_pod") {
        document.querySelector("#lejer_pod").click();
        //wmsPOD.setVisible(false);
      } else if (el === "nkro") {
        document.querySelector("#lejer_nkro").click();
        //wmsNKRO.setVisible(false);
      }
    });
  }

  let objedinjeni_filter = cql_param;
  objedinjeni_filter !== "" && cql_nivo !== "" && (objedinjeni_filter += " AND ");
  cql_nivo !== "" && (objedinjeni_filter += cql_nivo);

  let cqlStubovi = unescape(url.searchParams.get("stubovi"));
  let cqlVodovi = unescape(url.searchParams.get("vodovi"));
  let cqlTrafostanice = unescape(url.searchParams.get("trafostanice"));
  let cqlPrikljucnoMjesto = unescape(url.searchParams.get("prikljucno_mjesto"));
  let cqlPotrosaci = unescape(url.searchParams.get("view_potrosaci"));
  let cqlNkro = unescape(url.searchParams.get("nkro"));
  let cqlPod = unescape(url.searchParams.get("pod"));

  if (objedinjeni_filter.length > 5) {
    if (cqlStubovi !== "null" && cqlStubovi !== "") {
      cqlStubovi += " AND (" + objedinjeni_filter + ")";
    } else {
      cqlStubovi = objedinjeni_filter;
    }
    if (cqlVodovi !== "null" && cqlVodovi !== "") {
      cqlVodovi += " AND (" + objedinjeni_filter + ")";
    } else {
      cqlVodovi = objedinjeni_filter;
    }
    if (cqlTrafostanice !== "null" && cqlTrafostanice !== "") {
      cqlTrafostanice += " AND (" + objedinjeni_filter + ")";
    } else {
      cqlTrafostanice = objedinjeni_filter;
    }
    if (cqlPrikljucnoMjesto !== "null" && cqlPrikljucnoMjesto !== "") {
      cqlPrikljucnoMjesto += " AND (" + objedinjeni_filter + ")";
    } else {
      cqlPrikljucnoMjesto = objedinjeni_filter;
    }
    if (cqlPotrosaci !== "null" && cqlPotrosaci !== "") {
      cqlPotrosaci += " AND (" + objedinjeni_filter + ")";
    } else {
      cqlPotrosaci = objedinjeni_filter;
    }
    if (cqlNkro !== "null" && cqlNkro !== "") {
      cqlNkro += " AND (" + objedinjeni_filter + ")";
    } else {
      cqlNkro = objedinjeni_filter;
    }
    if (cqlPod !== "null" && cqlPod !== "") {
      cqlPod += " AND (" + objedinjeni_filter + ")";
    } else {
      cqlPod = objedinjeni_filter;
    }
  }

  if (cqlStubovi !== "null" && cqlStubovi !== "") {
    cqlZaWmsLejer(wmsStubovi, cqlStubovi);
  }
  if (cqlVodovi !== "null" && cqlVodovi !== "") {
    cqlZaWmsLejer(wmsVodovi, cqlVodovi);
  }
  if (cqlTrafostanice !== "null" && cqlTrafostanice !== "") {
    cqlZaWmsLejer(wmsTrafostanice, cqlTrafostanice);
  }
  if (cqlPrikljucnoMjesto !== "null" && cqlPrikljucnoMjesto !== "") {
    cqlZaWmsLejer(wmsPrikljucnoMjesto, cqlPrikljucnoMjesto);
  }
  if (cqlPotrosaci !== "null" && cqlPotrosaci !== "") {
    cqlZaWmsLejer(wmsPotrosaci, cqlPotrosaci);
  }
  if (cqlNkro !== "null" && cqlNkro !== "") {
    cqlZaWmsLejer(wmsNKRO, cqlNkro);
  }
  if (cqlPod !== "null" && cqlPod !== "") {
    cqlZaWmsLejer(wmsPOD, cqlPod);
  }
}

pocetniFilter();

/**
 * Returns type of vector fajl uploaded (drag n drop) to map
 * @param {Uploaded vector layer} featureLayer
 */
function vectorLayerType(featureLayer) {
  let retVal = "";
  let fileNameArray = featureLayer.file.name.split(".");
  retVal = fileNameArray[fileNameArray.length - 1].toUpperCase();
  isEditable = retVal !== "KML";
  map.removeInteraction(modifyV);
  //if (isEditable) {
  map.addInteraction(modifyV);
  //}
  retVal = fileNameArray[0];
  return retVal;
}
