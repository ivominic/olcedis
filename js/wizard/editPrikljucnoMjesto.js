/**Metode i promjenljive koje su vezane za konkretan lejer - priključno mjesto */

let layernamePrikljucnoMjesto = "prikljucno_mjesto",
  fulllayernamePrikljucnoMjesto = "geonode:prikljucno_mjesto",
  layertitlePrikljucnoMjesto = "prikljucno_mjesto";
let tipGeometrijePrikljucnoMjesto = point;

let wmsPrikljucnoMjesto = new ol.layer.Image({
  title: layertitlePrikljucnoMjesto,
  name: layernamePrikljucnoMjesto,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernamePrikljucnoMjesto,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

map.addLayer(wmsPrikljucnoMjesto);

/**
 * Metoda koja za odabrani naponski nivo vraća sva priključna mjesta. Za sad je to na 0.4, ali se može desiti da bude i 10kV
 * @param {} napon
 */
function prikljucnaMjestaUpoligonu(napon) {
  let params = wmsPrikljucnoMjesto.getSource().getParams();
  let formiraniFilter = globalCqlZaNaponskiNivo(napon, "prikljucno_mjesto");
  if (params.CQL_FILTER && params.CQL_FILTER.length > 0) {
    formiraniFilter += " AND (" + params.CQL_FILTER + ")";
  }
  formiraniFilter = encodeURIComponent(formiraniFilter);
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernamePrikljucnoMjesto +
    "&outputformat=application/json&cql_filter=" +
    formiraniFilter +
    "&access_token=" +
    geoserverToken;

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovanaPrikljucnaMjestaFeatures = new ol.format.GeoJSON().readFeatures(response);
      nizWizardDodatnaPrikljucnaMjesta.forEach((el) => {
        let blnNePostoji = true;
        selektovanaPrikljucnaMjestaFeatures.forEach((elOld) => {
          el.id_ === elOld.id_ && (blnNePostoji = false);
        });
        blnNePostoji && selektovanaPrikljucnaMjestaFeatures.push(el);
      });
      if (selektovanaPrikljucnaMjestaFeatures.length === 0) {
        poruka(StatusPoruke.Upozorenje, WizardPoruke.NemaPM);
        return false;
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}
