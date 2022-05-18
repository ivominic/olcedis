//TODO: Čitanje podataka i geometrije iz wfs-a
//TODO: Prikaz vektora na mapi
//TODO: Omogućavanje izmjene na način kako je kreirano za kml vodove
//TODO: Snap na odabrani lejer
//TODO: Dodavanje izmjene u niz

//map.on("singleclick", vodEditGeometrije);

function vodEditGeometrije(browserEvent) {
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  map.forEachLayerAtPixel(pixel, function (layer) {
    let vidljivost = layer.get("visible");
    if (layer instanceof ol.layer.Image && layer.values_.name === "vodovi" && vidljivost) {
      let url = layer
        .getSource()
        .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
          INFO_FORMAT: "application/json",
          feature_count: "1",
        });
      if (url) {
        fetch(url)
          .then(function (response) {
            return response.text();
          })
          .then(function (json) {
            let odgovor = JSON.parse(json);
            if (odgovor.features.length > 0) {
              odabirSaMape = false;
              console.log("PRELAZAK NA FEATURE");
              featureTekuciOverlay.getSource().clear();
              featureTekuciOverlay.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(odgovor.features[0]));

              map.un("singleclick", vodEditGeometrije);
            }
          });
      }
    }
  });
}

var modifyVod = new ol.interaction.Modify({
  condition: false,
  features: select.getFeatures(),
});

//TODO: Provjeriti da li funkcionišu prethodne modifikacije
map.addInteraction(modifyVod);

modifyVod.on("modifyend", function (e) {
  console.log("MODIFY VOD END - features", e.features.getArray()[0]);

  let coordinates = e.features.getArray()[0].getGeometry().getCoordinates();
  //console.log("koordinate", coordinates);
  //console.log("koordinate1", originalnaGeometrijaWmsVoda.coordinates);

  if (coordinates.length !== originalnaGeometrijaWmsVoda.coordinates.length) {
    e.features.getArray()[0].getGeometry().setCoordinates(originalnaGeometrijaWmsVoda.coordinates);
    poruka(
      "Upozorenje",
      "Geometrija linije je izmijenjena na način da su joj dodate nove prelomne tačke, što nije dozvoljeno."
    );
    return false;
  }

  let isLineModifiedInMiddle = false;
  let isViolatedAllowedDistance = false;
  for (i = 1; i < coordinates.length - 1; i++) {
    if (
      coordinates[i][0] !== originalnaGeometrijaWmsVoda.coordinates[i][0] ||
      coordinates[i][1] !== originalnaGeometrijaWmsVoda.coordinates[i][1]
    ) {
      isLineModifiedInMiddle = true;
    }
  }
  if (isLineModifiedInMiddle) {
    e.features.getArray()[0].getGeometry().setCoordinates(originalnaGeometrijaWmsVoda.coordinates);
    poruka("Upozorenje", "Nije dozvoljena izmjena geometrije linije, osim pomjeranjem krajnjih tačaka.");
    return false;
  }

  let coordinateLength = coordinates.length;
  let mjera = {
    units: "kilometers",
  };
  if (
    coordinates[0][0] !== originalnaGeometrijaWmsVoda.coordinates[0][0] ||
    coordinates[0][1] !== originalnaGeometrijaWmsVoda.coordinates[0][1]
  ) {
    let distancaOd = turf.point([coordinates[0][0], coordinates[0][1]]);
    let distancaDo = turf.point([
      originalnaGeometrijaWmsVoda.coordinates[0][0],
      originalnaGeometrijaWmsVoda.coordinates[0][1],
    ]);
    let distanca = turf.distance(distancaOd, distancaDo, mjera);
    if (distanca > dozvoljeniPomjeraj) {
      isViolatedAllowedDistance = true;
    }
  }
  if (
    coordinates[coordinateLength - 1][0] !== originalnaGeometrijaWmsVoda.coordinates[coordinateLength - 1][0] ||
    coordinates[coordinateLength - 1][1] !== originalnaGeometrijaWmsVoda.coordinates[coordinateLength - 1][1]
  ) {
    let distancaOd = turf.point([coordinates[coordinateLength - 1][0], coordinates[coordinateLength - 1][1]]);
    let distancaDo = turf.point([
      originalnaGeometrijaWmsVoda.coordinates[coordinateLength - 1][0],
      originalnaGeometrijaWmsVoda.coordinates[coordinateLength - 1][1],
    ]);
    let distanca = turf.distance(distancaOd, distancaDo, mjera);
    if (distanca > dozvoljeniPomjeraj) {
      isViolatedAllowedDistance = true;
    }
  }

  if (isViolatedAllowedDistance) {
    e.features.getArray()[0].getGeometry().setCoordinates(originalnaGeometrijaWmsVoda.coordinates);
    poruka("Upozorenje", "Tačka ne može biti pomjerena više od " + kmlRadius.toString() + "m od snimljene pozicije.");
    return false;
  }

  //TODO: Dodati u niz objekata za izmjenu. Dodati i novu geometriju kao property "geometrija"
});
