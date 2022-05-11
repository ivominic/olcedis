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
              //let features = new ol.format.GeoJSON().readFeatures(odgovor.features);
              featureTekuciOverlay.getSource().clear();
              featureTekuciOverlay.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(odgovor.features[0]));
              map.un("singleclick", vodEditGeometrije);
            }
          });
      }
    }
  });
}
