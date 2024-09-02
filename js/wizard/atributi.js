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