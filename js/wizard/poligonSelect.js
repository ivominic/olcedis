//document.querySelector("#selekecijaPoligon").addEventListener("click", izPoligona);

function izPoligona() {
  if (poligoni.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati poligon");
    return false;
  }
  //trafostaniceUpoligonu();
  vodoviUpoligonu();
}

/**
 * Selekcija tačaka iz gpx fajla koje su obuhvaćene poligonima
 */
function gpxUPoligonu() {
  if (poligoni.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati poligon");
    return false;
  }

  let selectItems = new ol.interaction.Select();
  map.addInteraction(selectItems);
  let selectedFeatures = selectItems.getFeatures();

  //let polygon = featurePolygonOverlay.getSource().getFeatures()[0].getGeometry();
  //var polygon = event.feature.getGeometry();
  let features = vectorSource.getFeatures();

  for (let j = 0; j < featurePolygonOverlay.getSource().getFeatures().length; j++) {
    let polygon = featurePolygonOverlay.getSource().getFeatures()[j].getGeometry();
    for (let i = 0; i < features.length; i++) {
      if (polygon.intersectsExtent(features[i].getGeometry().getExtent())) {
        selectedFeatures.push(features[i]);
      }
    }
  }
}
