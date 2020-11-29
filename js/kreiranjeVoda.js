/**
 * MEtoda koja za početnu i krajnju vrijednost (brojeve) kreira vod za unos u bazu
 * @param {} pocetnaVrijednost 
 * @param {*} krajnjaVrijednost 
 */
function kreirajVod(pocetnaVrijednost, krajnjaVrijednost){
  if(pocetnaVrijednost > krajnjaVrijednost){
    let pom = pocetnaVrijednost;
    pocetnaVrijednost = krajnjaVrijednost;
    krajnjaVrijednost = pom;
  }
  let nizTacakaLinije = []
  for(i=pocetnaVrijednost; i<= krajnjaVrijednost; i++){
    vectorSource.getFeatures().forEach(function(el) {
      if(parseInt(el.values_.name) == i){    
        //console.log(el.values_);   
        let position = ol.proj.transform(el.values_.geometry.flatCoordinates, "EPSG:3857", "EPSG:4326"); 
        //let position = el.values_.geometry.flatCoordinates; 
        //console.log("pos", position);
        nizTacakaLinije.push([position[0], position[1], position[2]]);     
      }    
    });
    /*nizKml.forEach((el) => {      
      if(parseInt(el.name) == i){        
        nizTacakaLinije.push([el.lng, el.lat]);        
      }    
    })*/
  }

  let vod = new ol.geom.LineString([nizTacakaLinije]);
  /*let feature = new ol.Feature({
    name: "Novi vod",
    geometry: vod
  });
  featureSnapOverlay.getSource().clear(); 
  featureSnapOverlay.getSource().addFeature(feature);*/

  let format = new ol.format.WKT();
  //console.log("geometrija", vod);
  //polygon.transform('EPSG:4326', 'EPSG:3857');
  
  let wktVod = format.writeGeometry(vod, {});
  alert(wktVod);

  console.log("kreirani niz koordinata", nizTacakaLinije);
}