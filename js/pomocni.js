map.forEachLayerAtPixel(pixel, function (layer) {
  //console.log(pixel);
  console.log(layer);
  var title = layer.get("title");
  var vidljivost = layer.get("visible");
  console.log("vidljivost", vidljivost);
  //console.log(title);
  if (layer instanceof ol.layer.Image) {
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
                          console.log(odgovor);
                          popuniKontrole(odgovor);
                          //showDiv("#atributiDiv");
                      }
                  });
          }
      }
  }
});