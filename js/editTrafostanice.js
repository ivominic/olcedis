/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
let layernameTS = "trafostanice",
  fulllayernameTS = "winsoft:trafostanice",
  layertitleTS = "trafostanice";
let tipGeometrijeTS = point;
let opisSlikeTS = "";

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

map.addLayer(wmsTrafostanice);
console.log("dodao lejer na mapu");


document.querySelector("#selekecijaTrafostanicaPoligon").addEventListener("click", trafostaniceUpoligonu);


function trafostaniceUpoligonu(){
  if(poligoni.length === 0){
    poruka("Upozorenje", "Potrebno je nacrtati poligon");
    return false;
  }
  let cqlText = ""

  poligoni.forEach((item) => {
    if (cqlText === "") {
      cqlText = "INTERSECTS(geom," + item + ") ";
    } else {
      cqlText += " OR INTERSECTS(geom," + item + ") ";
    }
  });

  console.log("trafo poligon", cqlText);

let urlZaFilter = wfsUrl + "?version=1.0.0&request=GetFeature&typeName=" + fulllayernameTS + "&outputformat=application/json&cql_filter=" + cqlText;

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {

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
    },
    fail: function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    },
});

/*  $.ajax({
    method: "POST",
    url: wfsUrl,
    data: {
        service: "WFS",
        request: "GetFeature",
        typename: fulllayernameTS,
        outputFormat: "application/json",
        srsname: "EPSG:3857",
        //srsname: "EPSG:4326",
        //"maxFeatures": 50,
        CQL_FILTER: cqlText,
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
        }else{
            poruka("Uspjeh", "Nema zapisa za prikaz.")
        }

        //console.log("size", map.getSize());
        //console.log("jedan value", features[0].values_);
        //console.log("više valua", features.values_);
        //map.getView().fit(boundingExtent, map.getSize());
    },
    fail: function (jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
    },
});*/
  

}