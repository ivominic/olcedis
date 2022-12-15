/** Metode koje vrše presjek objekata sa iscrtanim poligonom */
//TODO: Ukloniti ovaj fajl, jer se ne koristi nigdje

function izPoligona() {
  if (poligoni.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati poligon");
    return false;
  }
  //trafostaniceUpoligonu();
  vodoviUpoligonu();
}

/**
 * Metoda koja sve gpx tačke, obuhvaćene poligonom, dodaje u niz selectedFeatures
 */
function gpxUPoligonu() {
  if (poligoni.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati poligon");
    return false;
  }

  let selectItems = new ol.interaction.Select({
    layers: function (layer) {
      return layer.get("id") !== "brisanje" && layer.get("id") !== "azuriranje";
    },
  });
  map.addInteraction(selectItems);
  let selectedFeatures = selectItems.getFeatures();
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
