document.querySelector("#selekecijaPoligon").addEventListener("click", izPoligona);

function izPoligona(){
  if(poligoni.length === 0){
    poruka("Upozorenje", "Potrebno je nacrtati poligon");
    return false;
  }
  alert(poligoni[0]);
  let selectItems = new ol.interaction.Select();
  map.addInteraction(selectItems);
  let selectedFeatures = selectItems.getFeatures();


  let polygon = featurePolygonOverlay.getSource().getFeatures()[0].getGeometry();
  //var polygon = event.feature.getGeometry();
  var features = vectorSource.getFeatures();

  for (var i = 0 ; i < features.length; i++){
    if(polygon.intersectsExtent( features[i].getGeometry().getExtent() )){
      selectedFeatures.push(features[i]);
    }
  } 
}