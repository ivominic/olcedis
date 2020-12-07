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
  console.log("url filter", urlZaFilter);

  let trafostaniceZaWS = '';

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {

    },
    success: function (response) {
        console.log("response", response);
        let features = new ol.format.GeoJSON().readFeatures(response);
        console.log("fičeri", features);
        //vektorSource.clear();
        //vektorSource.addFeatures(features);
        //console.log("broj featurea", features.length);
        if(features.length){
          for(let i=0; i < features.length; i++){
            console.log("feature i", features[i].values_);
            console.log("feature i tip", features[i].values_.tip);
            console.log("feature id", features[i].id_);
            trafostaniceZaWS += features[i].id_ + ',';
            /*let option = document.createElement("option");
            option.text = response.naziv;
            option.value = response.idOperato;
            document.querySelector(idDdl).appendChild(option);*/
          }
          trafostaniceZaWS = trafostaniceZaWS.substring(0, trafostaniceZaWS.length - 1);
          trafostaniceZaWS = '[' + trafostaniceZaWS + ']';

            //vectorIzvjestaj.setSource(new ol.source.Vector({features: features}));
            //console.log(vectorIzvjestaj.getSource().getExtent());
            //map.getView().fit(vectorIzvjestaj.getSource().getExtent(), {"maxZoom":17});
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

}