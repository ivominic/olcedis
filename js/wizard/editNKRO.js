/**Metode i promjenljive koje su vezane za konkretan lejer - nkro */

let layernameNKRO = "nkro",
  fulllayernameNKRO = "geonode:nkro",
  layertitleNKRO = "nkro";
let tipGeometrijeNKRO = point;

let wmsNKRO = new ol.layer.Image({
  title: layertitleNKRO,
  name: layernameNKRO,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameNKRO,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

map.addLayer(wmsNKRO);

/**
 * Metoda koja za odabrani naponski nivo vraća sve NKRO tog nivoa
 * @param {} napon
 */
function nkroUpoligonu(napon) {
  let params = wmsNKRO.getSource().getParams();
  let formiraniFilter = globalCqlZaNaponskiNivo(napon, "nkro");
  if (params.CQL_FILTER && params.CQL_FILTER.length > 0) {
    formiraniFilter += " AND (" + params.CQL_FILTER + ")";
  }
  formiraniFilter = encodeURIComponent(formiraniFilter);
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernameNKRO +
    "&outputformat=application/json&cql_filter=" +
    formiraniFilter +
    "&access_token=" +
    geoserverToken;

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaniNKROFeatures = new ol.format.GeoJSON().readFeatures(response);
      if (selektovaniNKROFeatures.length === 0) {
        poruka(StatusPoruke.Upozorenje, WizardPoruke.NemaNkro);
        return false;
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}
