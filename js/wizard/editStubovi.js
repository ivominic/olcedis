/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
let layernameS = "stubovi",
  fulllayernameS = "geonode:stubovi",
  layertitleS = "stubovi";
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
//console.log("dodao stubove");

/**
 * Metoda koja za odabrani naponski nivo vraća sve stubove tog nivoa
 * @param {} napon
 */
function stuboviUpoligonu(napon) {
  let params = wmsStubovi.getSource().getParams();
  let formiraniFilter = globalCqlZaNaponskiNivo(napon, "vodovi");
  if (params.CQL_FILTER && params.CQL_FILTER.length > 0) {
    formiraniFilter += " AND (" + params.CQL_FILTER + ")";
  }
  formiraniFilter = encodeURIComponent(formiraniFilter);
  //console.log("filter za cql", formiraniFilter);
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernameS +
    "&outputformat=application/json&cql_filter=" +
    formiraniFilter +
    "&access_token=" +
    geoserverToken;
  //console.log("url filter", urlZaFilter);

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaniStuboviFeatures = new ol.format.GeoJSON().readFeatures(response);
      if (selektovaniStuboviFeatures.length === 0) {
        poruka("Upozorenje", "Nema stubova u odabranom zahvatu.");
        return false;
      } else {
        for (let i = 0; i < selektovaniStuboviFeatures.length; i++) {
          cudStub(selektovaniStuboviFeatures[i], "akcija");
          //console.log("spisak stubova", selektovaniStuboviFeatures[i]);
        }
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}
