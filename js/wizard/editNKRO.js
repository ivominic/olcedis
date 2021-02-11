/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */

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
  let formiraniFilter = globalCqlZaNaponskiNivo(napon, "vodovi");
  if (params.CQL_FILTER && params.CQL_FILTER.length > 0) {
    formiraniFilter += " AND (" + params.CQL_FILTER + ")";
  }
  formiraniFilter = encodeURIComponent(formiraniFilter);
  console.log("filter za cql", formiraniFilter);
  let urlZaFilter = wfsUrl + "?version=1.0.0&request=GetFeature&typeName=" + fulllayernameNKRO + "&outputformat=application/json&cql_filter=" + formiraniFilter;

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaniNKROFeatures = new ol.format.GeoJSON().readFeatures(response);
      if (selektovaniNKROFeatures.length === 0) {
        poruka("Upozorenje", "Nema NKRO u odabranom zahvatu.");
        return false;
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}
