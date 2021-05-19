/**Metode koje se odnose na uvoz podataka iz kml fajlova */

/** Metoda koja za zadati feature nalazi sljedeću tačku iz kml fajla kojoj nisu dodijeljeni podaci (lejer) */
function sljedecaNeobradjenaTackaKml(feature) {
  let distanca = 999999999;
  let tempFeature = null;
  let distancaOd = turf.point([
    feature.values_.geometry.flatCoordinates[0],
    feature.values_.geometry.flatCoordinates[1],
  ]);
  vectorSource.getFeatures().forEach(function (el) {
    if (el.get("lejer") === undefined) {
      let distancaDo = turf.point([el.values_.geometry.flatCoordinates[0], el.values_.geometry.flatCoordinates[1]]);
      let mjera = {
        units: "kilometers",
      };
      let udaljenost = turf.distance(distancaOd, distancaDo, mjera);
      if (distanca > udaljenost) {
        distanca = udaljenost;
        tempFeature = el;
      }
    }
  });
  //noviEl.set("lejer", "potrosac");
  if (tempFeature) {
    selectGpxFeature = tempFeature;
    select.getFeatures().clear();
    select.getFeatures().push(selectGpxFeature);
  }
}

/**
 * Finds all object that are near imported kml objects
 */
function distanceFromKmlPoints() {
  let cqlCondition = "";
  nizKml.forEach((item) => {
    if (cqlCondition === "") {
      cqlCondition = "DWITHIN(Geometry,POINT(" + item.lng + " " + item.lat + ")," + kmlRadius + ",meters) ";
    } else {
      cqlCondition += "OR DWITHIN(Geometry,POINT(" + item.lng + " " + item.lat + ")," + kmlRadius + ",meters) ";
    }
  });
  cqlCondition = "&cql_filter=" + cqlCondition;
  let wfsUrl1 =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    //"geonode:stubovi" +
    "geonode:stubovi,geonode:vodovi,geonode:trafostanice,geonode:view_potrosaci,geonode:prikljucno_mjesto,geonode:nkro,geonode:pod" +
    "&outputformat=application/json&propertyname='originalId'" +
    cqlCondition +
    "&access_token=" +
    geoserverToken;
  $.ajax({
    method: "GET",
    url: wfsUrl1,
    data: {
      /*access_token: geoserverToken,
        service: "WFS",
        request: "GetFeature",
        propertyName: "originalId",
        typename:
          "geonode:stubovi,geonode:vodovi,geonode:trafostanice,geonode:view_potrosaci,geonode:prikljucno_mjesto,geonode:nkro,geonode:pod",
        outputFormat: "application/json",
        //srsname: "EPSG:4326",
        //"maxFeatures": 50,
        CQL_FILTER: cqlCondition,*/
    },
    success: function (response) {
      let features = new ol.format.GeoJSON().readFeatures(response);
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/**
 * Zooms to location, asks user if object needs to be connected to existing network and shows form for picking objects.
 * @param {Feature uploaded from kml file} feature
 * @param {Name of Geoserver layer} layerName
 */
function objectNearKmlFeature(feature, layerName) {
  let coordinates = feature.values_.geometry.flatCoordinates;
  //let position = ol.proj.transform(feature.values_.geometry.flatCoordinates, "EPSG:4326", "EPSG:4326");
  let cqlCondition = "";

  if (feature.getGeometry().getType().toString().includes("oint")) {
    cqlCondition = "DWITHIN(Geometry,POINT(" + coordinates[0] + " " + coordinates[1] + ")," + kmlRadius + ",meters)";
  }

  cqlCondition = "&cql_filter=" + cqlCondition;
  let wfsUrl1 =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=geonode:" +
    layerName +
    //"geonode:stubovi,geonode:vodovi,geonode:trafostanice,geonode:view_potrosaci,geonode:prikljucno_mjesto,geonode:nkro,geonode:pod" +
    "&outputformat=application/json" +
    cqlCondition +
    "&access_token=" +
    geoserverToken;
  $.ajax({
    method: "GET",
    url: wfsUrl1,
    data: {},
    success: function (response) {
      if (response.features.length) {
        feature.values_.kml_povezati = true;
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

function objectNearKmlEndPoints(feature, layerName) {
  let coordinates = feature.values_.geometry.flatCoordinates;
  let cqlCondition = "";

  if (feature.getGeometry().getType().toString().includes("oint")) {
    cqlCondition = "DWITHIN(Geometry,POINT(" + coordinates[0] + " " + coordinates[1] + ")," + kmlRadius + ",meters)";
  }

  cqlCondition = "&cql_filter=" + cqlCondition;
  let wfsUrl1 =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=geonode:" +
    layerName +
    //"geonode:stubovi,geonode:vodovi,geonode:trafostanice,geonode:view_potrosaci,geonode:prikljucno_mjesto,geonode:nkro,geonode:pod" +
    "&outputformat=application/json" +
    cqlCondition +
    "&access_token=" +
    geoserverToken;
  $.ajax({
    method: "GET",
    url: wfsUrl1,
    data: {},
    success: function (response) {
      if (response.features.length) {
        kmlEndPoint.push(feature);
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

function showConnectForm() {
  let isFlaggedForConnection = false;
  vectorSource.getFeatures().forEach(function (el) {
    if (el.values_.kml_povezati) {
      let position = el.values_.geometry.flatCoordinates;
      //nizTacakaLinije.push([position[0], position[1], position[2]]);
      if (!isFlaggedForConnection) {
        el.values_.kml_povezati = false;
        isFlaggedForConnection = true;
        kmlFeature = el;
        map.getView().setCenter(position);
        map.getView().setZoom(20);

        let feature = new ol.Feature({
          geometry: new ol.geom.Point([position[0], position[1]]),
        });
        let features = [];
        features.push(feature);
        let tempFeatureArray = [];
        tempFeatureArray.push(el);
        vectorKmlFocusedObject.getSource().clear();
        vectorKmlFocusedObject.setSource(new ol.source.Vector({ features: features }));
      }
    }
  });
  //Kad završi sa tačkama, prelazi na niz endpointa kml linija
  if (!isFlaggedForConnection) {
    kmlEndPoints.forEach(function (el) {
      if (el.values_.kml_povezati) {
        let position = el.values_.geometry.flatCoordinates;
        //nizTacakaLinije.push([position[0], position[1], position[2]]);
        if (!isFlaggedForConnection) {
          el.values_.kml_povezati = false;
          isFlaggedForConnection = true;
          kmlFeature = el;
          map.getView().setCenter(position);
          map.getView().setZoom(20);

          let feature = new ol.Feature({
            geometry: new ol.geom.Point([position[0], position[1]]),
          });
          let features = [];
          features.push(feature);
          let tempFeatureArray = [];
          tempFeatureArray.push(el);
          vectorKmlFocusedObject.getSource().clear();
          vectorKmlFocusedObject.setSource(new ol.source.Vector({ features: features }));
        }
      }
    });
  }
  if (isFlaggedForConnection) {
    Swal.fire({
      title: "Da li je potrebno povezati ovaj objekat sa ostatkom mreže?",
      //icon: "info",
      position: "top-end",
      showDenyButton: true,
      confirmButtonText: `Da`,
      denyButtonText: `Ne`,
    }).then((result) => {
      if (result.isConfirmed) {
        $(ddlObjekatZaPovezivanje).empty();
        showDiv("#odabirBliskogObjektaKmlDiv");
      } else if (result.isDenied) {
        saveKmlConnection(false);
      }
    });
    isFlaggedForConnection = false;
  } else {
    closeDiv("#odabirBliskogObjektaKmlDiv");
  }
}

function saveKmlConnection(isConnecting) {
  showConnectForm();
}

/**
 * Creates array of end points from all kml linestrings
 */
function extractKmlLinestringEndPoints() {
  kmlEndPoints.length = 0;
  vectorSource.getFeatures().forEach(function (el) {
    if (el.getGeometry().getType().toString().includes("tring")) {
      let coordinates = el.values_.geometry.flatCoordinates;
      let feature1 = new ol.Feature({
        geometry: new ol.geom.Point([coordinates[0], coordinates[1]]),
      });
      let feature2;

      if (coordinates[coordinates.length - 1] === 0) {
        feature2 = new ol.Feature({
          geometry: new ol.geom.Point([coordinates[coordinates.length - 3], coordinates[coordinates.length - 4]]),
        });
      } else {
        feature2 = new ol.Feature({
          geometry: new ol.geom.Point([coordinates[coordinates.length - 2], coordinates[coordinates.length - 1]]),
        });
      }
      kmlEndPoints.push(feature1);
      kmlEndPoints.push(feature2);
    }
  });
}
