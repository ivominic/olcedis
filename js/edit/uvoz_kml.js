/**Metode koje se odnose na uvoz podataka iz kml fajlova */

/** Metoda koja za zadati feature nalazi sljedeću tačku iz kml fajla kojoj nisu dodijeljeni podaci (lejer) */
function sljedecaNeobradjenaTackaKml(feature) {
  console.log("radi", vectorSource.getFeatures().length);
  let distanca = 999999999;
  let tempFeature = null;
  let distancaOd = turf.point([feature.values_.geometry.flatCoordinates[0], feature.values_.geometry.flatCoordinates[1]]);
  vectorSource.getFeatures().forEach(function (el) {
    if (el.get("lejer") === undefined) {
      let distancaDo = turf.point([el.values_.geometry.flatCoordinates[0], el.values_.geometry.flatCoordinates[1]]);
      let mjera = {
        units: "kilometers",
      };
      let udaljenost = turf.distance(distancaOd, distancaDo, mjera);
      console.log("udaljenost", udaljenost);
      if (distanca > udaljenost) {
        distanca = udaljenost;
        tempFeature = el;
      }
    }
  });
  //noviEl.set("lejer", "potrosac");
  if (tempFeature) {
    selectGpxFeature = tempFeature;
    select.getFeatures().clear();
    select.getFeatures().push(selectGpxFeature);
  }
}
