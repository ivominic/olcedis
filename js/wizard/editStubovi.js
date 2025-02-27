/**Metode i promjenljive koje su vezane za konkretan lejer - stubovi */

let layernameS = "stubovi",
  fulllayernameS = "geonode:stubovi",
  layertitleS = "stubovi";
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
  // formiraniFilter = encodeURIComponent(formiraniFilter);
  let urlZaFilter = wfsUrl;

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {
      version: "1.0.0",
      access_token: geoserverToken,
      service: "WFS",
      request: "GetFeature",
      typeName: fulllayernameS,
      outputFormat: "application/json",
      srsname: "EPSG:4326",
      CQL_FILTER: formiraniFilter,
    },
    success: function (response) {
      selektovaniStuboviFeatures = new ol.format.GeoJSON().readFeatures(response);
      nizWizardDodatniStubovi.forEach((el) => {
        let blnNePostoji = true;
        selektovaniStuboviFeatures.forEach((elOld) => {
          el.id_ === elOld.id_ && (blnNePostoji = false);
        });
        blnNePostoji && selektovaniStuboviFeatures.push(el);
      });
      if (selektovaniStuboviFeatures.length === 0) {
        poruka(StatusPoruke.Upozorenje, WizardPoruke.NemaStub);
        return false; //TODO: Nepotrebno
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}
