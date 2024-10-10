if(document.querySelector("#pregledButtonli")){
  document.querySelector("#pregledButtonli").addEventListener("click", setupAtributes)
}

function setupAtributes(){
 akcija = "information";
 document.querySelector("#right-bar-modal-attribute").style.display = "block";
}

function closeAtributes(){
  akcija = "pan";
  document.querySelector("#right-bar-modal-attribute").style.display = "none";
}

let globalCollapseCounter = 0;
function popuniInformacije(odgovor, title) {
  let atributesAccordion = document.querySelector("#atributesAccordion");
  for (let i = 0; i < odgovor.features.length; i++) {
    globalCollapseCounter += 1;
    let id = "";
    let gisodsjek = "";
    let button = "";
    let metapodaci = odgovor.features[i]["properties"];
    let element_id = odgovor.features[i]['id'];
    let objekat = element_id.split(".");
    let metaObject = "";
    for (let key in metapodaci) {
      let finalKey = key;
      if((objekat[0] === "view_trafostanice" || objekat[0] === "trafostanice_poligoni" || objekat[0] === "view_potrosaci" || objekat[0] === "view_pod" || objekat[0] === "view_solari")){
        if(key === "fid_1") {
          id = metapodaci[key];
        }
      } else if(key === "id"){
        id = metapodaci[key];
      }
      let finalValue = "/";
      let extraAtributeClass = "text-dark";
      let datumExtraStyle = "";
      if(metapodaci[key] && metapodaci[key]!== "null"){
        finalValue = metapodaci[key];
        extraAtributeClass = "attribute_value";
        datumExtraStyle = "color: white !important;background-color: #6161bb;";
      }

      if(key === "datum_azuriranja_wizard") {
        finalValue = finalValue.replace("Z", "");
        metaObject= "<li class=\"list-group-item d-flex justify-content-between align-items-center\" style='font-size: 15px;color: #6161bb;'>\n" +
        "" + finalKey + "<span class=\"badge " + extraAtributeClass + "\" style='white-space: inherit;font-size: 15px;" + datumExtraStyle + "'>" + finalValue + "</span> </li>" + metaObject;
      } else {
        metaObject+= "<li class=\"list-group-item d-flex justify-content-between align-items-center\" style='font-size: 15px;'>\n" +
        "" + finalKey + "<span class=\"badge " + extraAtributeClass + "\" style='white-space: inherit;font-size: 15px;'>" + finalValue + "</span> </li>";
      }
      
    }
    if(!id){
      id= objekat[1];
    }
    
    let collapseAtribute = "collapseAtribute" + globalCollapseCounter;
      atributesAccordion.insertAdjacentHTML('beforeend', '<div class="wrap-collabsible">' +
      '<input id="' + collapseAtribute + '" class="toggle checkMain" type="checkbox">' +
     '<label for="' + collapseAtribute + '" class="lbl-toggle"><span>' + title + ' - GIS ID:' + id + '</span></label>' +
      '<div class="collapsible-content">' +
        '<div class="content-inner">' +
          '<ul class="list-group" style="height: 50vh;overflow-x: hidden;overflow-y: scroll;">' + metaObject +
          '</ul>' +
        '</div>' +
      '</div>' +
    '</div>');
  }
}

document.querySelector("#osmMapDiv").addEventListener("click", setupOsmMap);
document.querySelector("#sateliteMapDiv").addEventListener("click", setupSateliteMap);
document.querySelector("#topoMapDiv").addEventListener("click", setupTopoMap);
document.querySelector("#bezPodlogeDiv").addEventListener("click", setupBezPodlogeMap);

if(document.querySelector("#lejeriDiv")){
  document.querySelector("#lejeriDiv").addEventListener("click",openMenuForLayers);
}
function openMenuForLayers(){
  document.querySelector("#chooseLayerContainer").style.display = "block";
  }
  
  function closeMenuForLayers(){
    document.querySelector("#chooseLayerContainer").style.display = "none";
  }

  function setupOsmMap(){
    map.getLayers().setAt(0, osmBaseMap);
    clearMapLayerStyles();
    document.querySelector("#osmMapDiv").className = "col-4 activeMap";
    document.querySelector("#lejeriDiv").className = "lejeri-stil";
  }
  
  function setupSateliteMap(){
    map.getLayers().setAt(0, satelitBaseMap);
    clearMapLayerStyles();
    document.querySelector("#sateliteMapDiv").className = "col-4 activeMap";
    document.querySelector("#lejeriDiv").className = "lejeri-stil-satelite";
  }
  
  function setupTopoMap(){
    map.getLayers().setAt(0, ortofotoBaseMap);
    clearMapLayerStyles();
    document.querySelector("#topoMapDiv").className = "col-4 activeMap";
    document.querySelector("#lejeriDiv").className = "lejeri-stil-topo";
  }
  
  function setupBezPodlogeMap(){
    map.getLayers().setAt(0, bezBaseMap);
    clearMapLayerStyles();
    document.querySelector("#bezPodlogeDiv").className = "col-4 activeMap";
    document.querySelector("#lejeriDiv").className = "lejeri-stil-bez-podloge";
  }

  function clearMapLayerStyles(){
    document.querySelector("#osmMapDiv").className = "col-4";
    document.querySelector("#sateliteMapDiv").className = "col-4";
    document.querySelector("#topoMapDiv").className = "col-4";
    document.querySelector("#bezPodlogeDiv").className = "col-4";
  }

  function showModalLeft(){
    closeAllDivs();
    document.querySelector("#layerMenu").className = "button-menu-mobile waves-effect waves-light active";
    document.querySelector("#pan").className = "tooltip";
    document.querySelector("#modal-left").style.left = "70px";
  }

  document.querySelector("#range_15").oninput = function() {
    wmsStubovi.setOpacity(this.value/100);
    wmsVodovi.setOpacity(this.value/100);
    wmsTrafostanice.setOpacity(this.value/100);
    wmsTrafostanicePoligoni.setOpacity(this.value/100);
    wmsPotrosaci.setOpacity(this.value/100);
    wmsPrikljucnoMjesto.setOpacity(this.value/100);
    wmsNKRO.setOpacity(this.value/100);
    wmsPOD.setOpacity(this.value/100);
    wmsValidations.setOpacity(this.value/100);
  }

  document.querySelector("#checkAllLayers").addEventListener("click", setAllVisible);
function setAllVisible(){
let checkedValue = document.querySelector("#checkAllLayers").checked;
if(checkedValue){
  document.querySelector("#lejer_stubovi").checked = true;
  document.querySelector("#lejer_vodovi").checked = true;
  document.querySelector("#lejer_trafostanice").checked = true;
  document.querySelector("#lejer_trafostanice_poligoni").checked = true;
  document.querySelector("#lejer_prikljucno_mjesto").checked = true;
  document.querySelector("#lejer_nkro").checked = true;
  document.querySelector("#lejer_potrosac").checked = true;
  document.querySelector("#lejer_nelegalni_potrosac").checked = true;
  document.querySelector("#lejer_pod").checked = true;
  document.querySelector("#lejer_validations").checked = true;
  wmsStubovi.setVisible(true);
  wmsVodovi.setVisible(true);
  wmsTrafostanice.setVisible(true);
  wmsTrafostanicePoligoni.setVisible(true);
  wmsPotrosaci.setVisible(true);
  wmsPrikljucnoMjesto.setVisible(true);
  wmsNKRO.setVisible(true);
  wmsPOD.setVisible(true);
  wmsValidations.setVisible(true);
} else {
  document.querySelector("#lejer_stubovi").checked = false;
  document.querySelector("#lejer_vodovi").checked = false;
  document.querySelector("#lejer_trafostanice").checked = false;
  document.querySelector("#lejer_trafostanice_poligoni").checked = false;
  document.querySelector("#lejer_prikljucno_mjesto").checked = false;
  document.querySelector("#lejer_nkro").checked = false;
  document.querySelector("#lejer_potrosac").checked = false;
  document.querySelector("#lejer_nelegalni_potrosac").checked = false;
  document.querySelector("#lejer_pod").checked = false;
  document.querySelector("#lejer_validations").checked = false;
  wmsStubovi.setVisible(false);
  wmsVodovi.setVisible(false);
  wmsTrafostanice.setVisible(false);
  wmsTrafostanicePoligoni.setVisible(false);
  wmsPotrosaci.setVisible(false);
  wmsPrikljucnoMjesto.setVisible(false);
  wmsNKRO.setVisible(false);
  wmsPOD.setVisible(false);
  wmsValidations.setVisible(false);
 }
}


function closeModalLeft(){
  document.querySelector("#layerMenu").className = "button-menu-mobile waves-effect waves-light";
  document.querySelector("#pan").className = "active tooltip";
  document.querySelector("#modal-left").style.left = "-400px";
}