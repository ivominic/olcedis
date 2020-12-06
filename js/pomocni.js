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



function wfsFilter(fulllayer) {
  $.ajax({
      method: "POST",
      url: wfsUrl,
      data: {
          service: "WFS",
          request: "GetFeature",
          typename: fulllayer,
          outputFormat: "application/json",
          srsname: "EPSG:3857",
          //"maxFeatures": 50,
          CQL_FILTER: cqlFilter,
      },
      success: function (response) {
          console.log(response);
          let features = new ol.format.GeoJSON().readFeatures(response);
          console.log("fičeri", features);
          vektorSource.clear();
          vektorSource.addFeatures(features);
          console.log("broj featurea", features.length);
          if(features.length){
              vectorIzvjestaj.setSource(new ol.source.Vector({features: features}));
              console.log(vectorIzvjestaj.getSource().getExtent());
              map.getView().fit(vectorIzvjestaj.getSource().getExtent(), {"maxZoom":17});
              /*let boundingExtent = ol.extent.boundingExtent(vektorSource.getExtent());
              boundingExtent = ol.proj.transformExtent(boundingExtent, ol.proj.get("EPSG:4326"), ol.proj.get("EPSG:3857"));
              console.log("extentovi", boundingExtent);*/
          }else{
              poruka("Uspjeh", "Nema zapisa za prikaz.")
          }

          //console.log("size", map.getSize());
          //console.log("jedan value", features[0].values_);
          //console.log("više valua", features.values_);
          //map.getView().fit(boundingExtent, map.getSize());
          let sloj = document.querySelector("#ddlLejerPretraga").value;
          console.log("sloj", sloj);
      },
      fail: function (jqXHR, textStatus) {
          console.log("Request failed: " + textStatus);
      },
  });
}