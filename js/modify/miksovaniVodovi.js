/** Metode za kreiranje voda koji čini jedan broj postojećih, a jedan broj stubova iz gopx fajla */

async function dodajWmsObjekte() {
  let napon = "10";
  console.log("AKo je čekirano da se pravi mješoviti vod");
  let params = wmsStubovi.getSource().getParams();
  let formiraniFilter = globalCqlZaNaponskiNivo(napon, "stub");
  if (params.CQL_FILTER && params.CQL_FILTER.length > 0) {
    formiraniFilter += " AND (" + params.CQL_FILTER + ")";
  }
  formiraniFilter = encodeURIComponent(formiraniFilter);
  console.log("FILTER ZA VOD!!!!!", formiraniFilter);
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernameS +
    "&outputformat=application/json&cql_filter=" +
    formiraniFilter +
    "&access_token=" +
    geoserverToken;

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      console.log("RESPONSE", response);
      let stuboviZaDodavanje = new ol.format.GeoJSON().readFeatures(response);
      console.log("STUBOVI", stuboviZaDodavanje);
      if (stuboviZaDodavanje.length === 0) {
        poruka("Upozorenje", "Nema stubova u odabranom zahvatu.");
        return false;
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}
