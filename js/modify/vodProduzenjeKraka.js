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
  let featureName = e.features.getArray()[0].values_.name;

  //TODO: Ovo obraditi da odgovara izmjeni postojećeg voda
  console.log("MODIFY VOD END", featureName);
  let position = e.features.getArray()[0].values_.geometry.flatCoordinates;
  let coordinates = e.features.getArray()[0].values_.geometry.clone();
  console.log("koordinate m", position);
  let pocetniElement;
  nizKml.forEach((el) => {
    if (el.name === featureName) {
      pocetniElement = el;
      //pocetniElement = ol.proj.transform(el, "EPSG:3857", "EPSG:4326");
    }
  });
  if (isEditable) {
    if (pocetniElement) {
      //pocetniElement = ol.proj.transform(pocetniElement, "EPSG:3857", "EPSG:4326");
      let pocetnaTacka = new ol.geom.Point(ol.proj.fromLonLat([pocetniElement.lng, pocetniElement.lat], "EPSG:4326"));
      //let pocetnaTacka = new ol.geom.Point(ol.proj.fromLonLat([pocetniElement.lng, pocetniElement.lat]));
      //let pocetnaTacka = new ol.geom.Point(ol.proj.fromLonLat([pocetniElement.lng, pocetniElement.lat], "EPSG:3857", "EPSG:4326"));
      //pocetnaTacka = ol.proj.transform(pocetnaTacka, "EPSG:3857", "EPSG:4326");
      let distancaOd = turf.point([position[0], position[1]]);
      let distancaDo = turf.point([pocetniElement.lng, pocetniElement.lat]);
      let mjera = {
        units: "kilometers",
      };
      let distanca = turf.distance(distancaOd, distancaDo, mjera);
      console.log("distanca", distanca);
      if (distanca > dozvoljeniPomjeraj) {
        e.features.getArray()[0].getGeometry().setCoordinates(pocetnaTacka.flatCoordinates);
        poruka(
          "Upozorenje",
          "Tačka ne može biti pomjerena više od " + (dozvoljeniPomjeraj * 1000).toString() + "m od snimljene pozicije."
        );
      }
      //citajExtent();
    }
  } else {
    let original;
    originalKmlLines.forEach((item) => {
      console.log("ITEM", item);
      console.log(e.features.getArray()[0].ol_uid, item.ol_uid);
      if (e.features.getArray()[0].ol_uid === item.ol_uid) {
        original = item;
      }
    });

    let coordinates = e.features.getArray()[0].getGeometry().getCoordinates();

    if (coordinates.length !== original.coordinates.length) {
      e.features.getArray()[0].getGeometry().setCoordinates(original.coordinates);
      poruka(
        "Upozorenje",
        "Geometrija linije je izmijenjena na način da su joj dodate nove prelomne tačke, što nije dozvoljeno."
      );
      return false;
    }

    let isLineModifiedInMiddle = false;
    let isViolatedAllowedDistance = false;
    for (i = 1; i < coordinates.length - 1; i++) {
      if (coordinates[i][0] !== original.coordinates[i][0] || coordinates[i][1] !== original.coordinates[i][1]) {
        isLineModifiedInMiddle = true;
      }
    }
    if (isLineModifiedInMiddle) {
      e.features.getArray()[0].getGeometry().setCoordinates(original.coordinates);
      poruka("Upozorenje", "Nije dozvoljena izmjena geometrije linije, osim pomjeranjem krajnjih tačaka.");
      return false;
    }

    let coordinateLength = coordinates.length;
    let mjera = {
      units: "kilometers",
    };
    if (coordinates[0][0] !== original.coordinates[0][0] || coordinates[0][1] !== original.coordinates[0][1]) {
      let distancaOd = turf.point([coordinates[0][0], coordinates[0][1]]);
      let distancaDo = turf.point([original.coordinates[0][0], original.coordinates[0][1]]);
      let distanca = turf.distance(distancaOd, distancaDo, mjera);
      if (distanca > dozvoljeniPomjeraj) {
        isViolatedAllowedDistance = true;
      }
    }
    if (
      coordinates[coordinateLength - 1][0] !== original.coordinates[coordinateLength - 1][0] ||
      coordinates[coordinateLength - 1][1] !== original.coordinates[coordinateLength - 1][1]
    ) {
      let distancaOd = turf.point([coordinates[coordinateLength - 1][0], coordinates[coordinateLength - 1][1]]);
      let distancaDo = turf.point([
        original.coordinates[coordinateLength - 1][0],
        original.coordinates[coordinateLength - 1][1],
      ]);
      let distanca = turf.distance(distancaOd, distancaDo, mjera);
      if (distanca > dozvoljeniPomjeraj) {
        isViolatedAllowedDistance = true;
      }
    }

    if (isViolatedAllowedDistance) {
      e.features.getArray()[0].getGeometry().setCoordinates(original.coordinates);
      poruka("Upozorenje", "Tačka ne može biti pomjerena više od " + kmlRadius.toString() + "m od snimljene pozicije.");
      return false;
    }
  }
});
