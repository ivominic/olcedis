/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */

let layernamePOD = "pod",
  fulllayernamePOD = "geonode:pod",
  layertitlePOD = "pod";
let tipGeometrijePOD = point;

let wmsPOD = new ol.layer.Image({
  title: layertitlePOD,
  name: layernamePOD,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernamePOD,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

map.addLayer(wmsPOD);

/**
 * Metoda koja za odabrani naponski nivo vraća sve POD tog nivoa
 * @param {} napon
 */
function podUpoligonu(napon) {
  let urlZaFilter =
    wfsUrl + "?version=1.0.0&request=GetFeature&typeName=" + fulllayernamePOD + "&outputformat=application/json&cql_filter=" + globalCqlZaNaponskiNivo(napon, "pod");

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaniPODoviFeatures = new ol.format.GeoJSON().readFeatures(response);
      if (selektovaniPODoviFeatures.length === 0) {
        poruka("Upozorenje", "Nema PODova u odabranom zahvatu.");
        return false;
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}
