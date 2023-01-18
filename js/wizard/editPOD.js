/**Metode i promjenljive koje su vezane za konkretan lejer - POD */

let layernamePOD = "view_pod",
  fulllayernamePOD = "geonode:view_pod",
  layertitlePOD = "view_pod";
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

let layernameValidations = "validations",
  fulllayernameValidations = "geonode:validations",
  layertitleValidations = "validations";

let wmsValidations = new ol.layer.Image({
  title: layertitleValidations,
  name: layernameValidations,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameValidations,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

map.addLayer(wmsValidations);
wmsValidations.setVisible(false);

/**
 * Metoda koja za odabrani naponski nivo vraća sve POD tog nivoa
 * @param {} napon
 */
function podUpoligonu(napon) {
  let params = wmsPOD.getSource().getParams();
  let formiraniFilter = globalCqlZaNaponskiNivo(napon, "view_pod");
  if (params.CQL_FILTER && params.CQL_FILTER.length > 0) {
    formiraniFilter += " AND (" + params.CQL_FILTER + ")";
  }
  formiraniFilter = encodeURIComponent(formiraniFilter);
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernamePOD +
    "&outputformat=application/json&cql_filter=" +
    formiraniFilter +
    "&access_token=" +
    geoserverToken;

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaniPODoviFeatures = new ol.format.GeoJSON().readFeatures(response);
      nizWizardDodatniPodovi.forEach((el) => {
        let blnNePostoji = true;
        selektovaniPODoviFeatures.forEach((elOld) => {
          el.id_ === elOld.id_ && (blnNePostoji = false);
        });
        blnNePostoji && selektovaniPODoviFeatures.push(el);
      });
      if (selektovaniPODoviFeatures.length === 0) {
        poruka(StatusPoruke.Upozorenje, WizardPoruke.NemaPod);
        return false; //TODO: Ukloniti, bespotrebno
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}
