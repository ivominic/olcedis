/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
let layernameS = "stubovi", fulllayernameS = "geonode:stubovi", layertitleS = "stubovi";
//let layernameS = "stubovi", fulllayernameS = "winsoft:stubovi", layertitleS = "stubovi";
let tipGeometrijeS = point;
let opisSlikeS = "";

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

map.addLayer(wmsStubovi);
console.log("dodao stubove");