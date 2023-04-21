// let layersArray = [
//   { id: "planska_podrucja", title: "Planska podrucja", name: "planska_podrucja", fullname: "winsoft:planska_podrucja", group: "coverage" },
//   { id: "planske_cjeline", title: "Planske cjeline", name: "planske_cjeline", fullname: "winsoft:planske_cjeline",group: "coverage" },
//   { id: "pg_rezimi_uredjenja", title: "Pg rezimi uredjenja", name: "pg_rezimi_uredjenja", fullname: "winsoft:pg_rezimi_uredjenja",group: "coverage" },
//   { id: "popisni_krugovi", title: "Popisni krugovi", name: "popisni_krugovi", fullname: "winsoft:popisni_krugovi",group: "coverage" },
//   {
//     id: "statisticki_krugovi",
//     title: "Statisticki krugovi",
//     name: "statisticki_krugovi",
//     fullname: "winsoft:statisticki_krugovi",
//     group: "coverage"
//   },
//   { id: "onp_postojece", title: "Onp postojece", name: "onp_postojece", fullname: "winsoft:onp_postojece" ,group: "coverage", active: true},
//   {
//     id: "onp_planirano",
//     title: "Onp planirano",
//     name: "onp_planirano",
//     fullname: "winsoft:onp_planirano",
//     group: "coverage",
//     active: true,
//   },
//   { id: "dnp_planirano", title: "Dnp planirano", name: "dnp_planirano", fullname: "winsoft:dnp_planirano",group: "coverage", active: true},
//   { id: "pup_pg_geoloska", title: "Pup pg geoloska", name: "pup_pg_geoloska", fullname: "winsoft:pup_pg_geoloska",group: "coverage" },
//   { id: "pup_pg_hipsometrija",title: "Pup pg hipsometrija", name: "pup_pg_hipsometrija", fullname: "winsoft:pup_pg_hipsometrija",group: "coverage" }, 
//   { id: "pup_pg_elektro",title: "Pup pg elektro", name: "pup_pg_elektro", fullname: "winsoft:pup_pg_elektro",group: "coverage" },
//   { id: "pup_pg_telekomunikaciona",title: "Pup pg telekomunikaciona", name: "pup_pg_telekomunikaciona", fullname: "winsoft:pup_pg_telekomunikaciona",group: "coverage" },
//   { id: "pup_pg_vodovod",title: "Pup pg vodovod", name: "pup_pg_vodovod", fullname: "winsoft:pup_pg_vodovod",group: "coverage" },
//   { id: "katastarske_parcele",title: "Katastarske parcele", name: "katastarske_parcele", fullname: "winsoft:katastarske_parcele",group: "cadastre" }, 
//   { id: "katastarski_objekti",title: "Katastarski objekti", name: "katastarski_objekti", fullname: "winsoft:katastarski_objekti",group: "cadastre" }
// ];
// // loadCoverageLayers();

// document.querySelector("#coverage").addEventListener("click", checkAllCoverage);
// document.querySelector("#cadastre").addEventListener("click", checkAllCadastre);
// function checkAllCoverage() {
//   let coverageCheck = document.querySelector("#coverage").checked;
//   layersArray.forEach(function (layer) {
//     if(layer.group === "coverage"){
//       let id = "#" + layer.id;
//       if (coverageCheck) {
//         if(!document.querySelector(id).checked){
//           document.querySelector(id).checked = true;
//           map.addLayer(layer.layer);
//         }
//       } else {
//         document.querySelector(id).checked = false;
//         map.removeLayer(layer.layer);
//       }
//     }
//   });
//   document.querySelector("#coverage").style.border = "1px solid #adb5bd";
// }

// function checkAllCadastre() {
//   let coverageCheck = document.querySelector("#cadastre").checked;
//   layersArray.forEach(function (layer) {
//     if(layer.group === "cadastre"){
//     let id = "#" + layer.id;
//     if (coverageCheck) {
//       if(!document.querySelector(id).checked){
//         document.querySelector(id).checked = true;
//         map.addLayer(layer.layer);
//       }
//     } else {
//       document.querySelector(id).checked = false;
//       map.removeLayer(layer.layer);
//     }
//   }
//   });
//   document.querySelector("#cadastre").style.border = "1px solid #adb5bd";
// }

// function setupMainCoverage(group) {
//   let hashGroup = "#" + group;
//   let counter = 0;
//   layersArray.forEach(function (layer) {
//     if(layer.group === group){
//       let id = "#" + layer.id;
//       let coverageCheck = document.querySelector(id).checked;
//       if (coverageCheck) {
//         counter += 1;
//       }
//     }
//   });
//   let layerCounter = findGroupLength(group);
//   if (counter < layerCounter) {
//     document.querySelector(hashGroup).checked = false;
//   } else if (counter === layerCounter) {
//     document.querySelector(hashGroup).checked = true;
//   }

//   if (counter > 0) {
//     document.querySelector(hashGroup).style.border = "1px solid #00acc1";
//   } else {
//     document.querySelector(hashGroup).style.border = "1px solid #adb5bd";
//   }
// }

// function checkCoverageItem(evt, group) {
//   layersArray.forEach(function (item) {
//     if (item.id === evt.id) {
//       if (evt.checked) {
//         map.addLayer(item.layer);
//       } else {
//         map.removeLayer(item.layer);
//       }
//     }
//   });
//   setupMainCoverage(group);
// }

// $("#range_27").ionRangeSlider({ skin: "round", min: 0, max: 100 });

// function loadCoverageLayers() {
//   layersArray.forEach(function (layer) {
//     let geoLayer = createImageWmsLayer(layer.title, layer.name, layer.fullname, "");
//     if (geoLayer) {
//       layer.layer = geoLayer;
//       if(layer.active){
//         let id = "#" + layer.id;
//         document.querySelector(id).checked = true;
//         map.addLayer(geoLayer);
//       }
//     }
//   });
//   setupMainCoverage("coverage");
// }

// function findGroupLength(group){
//   let counterGroup = 0
//   layersArray.forEach(function (layer) {
//     if(layer.group === group){
//       counterGroup += 1;
//     }
//   });
//   return counterGroup;
// }

document.querySelector("#range_15").oninput = function() {
  wmsStubovi.setOpacity(this.value/100);
  wmsVodovi.setOpacity(this.value/100);
  wmsTrafostanice.setOpacity(this.value/100);
  wmsTrafostanicePoligoni.setOpacity(this.value/100);
  wmsPotrosaci.setOpacity(this.value/100);
  wmsNelegalniPotrosaci.setOpacity(this.value/100);
  wmsPrikljucnoMjesto.setOpacity(this.value/100);
  wmsNKRO.setOpacity(this.value/100);
  wmsPOD.setOpacity(this.value/100);
  wmsValidations.setOpacity(this.value/100);
  wmsPoslovniObjekti.setOpacity(this.value/100);
  wmsOdbijeni.setOpacity(this.value/100);
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
  document.querySelector("#lejer_poslovni_objekat").checked = true;
  document.querySelector("#lejer_odbijeni").checked = true;
  wmsStubovi.setVisible(true);
  wmsVodovi.setVisible(true);
  wmsTrafostanice.setVisible(true);
  wmsTrafostanicePoligoni.setVisible(true);
  wmsPotrosaci.setVisible(true);
  wmsNelegalniPotrosaci.setVisible(true);
  wmsPrikljucnoMjesto.setVisible(true);
  wmsNKRO.setVisible(true);
  wmsPOD.setVisible(true);
  wmsValidations.setVisible(true);
  wmsPoslovniObjekti.setVisible(true);
  wmsOdbijeni.setVisible(true);
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
  document.querySelector("#lejer_poslovni_objekat").checked = false;
  document.querySelector("#lejer_odbijeni").checked = false;
  wmsStubovi.setVisible(false);
  wmsVodovi.setVisible(false);
  wmsTrafostanice.setVisible(false);
  wmsTrafostanicePoligoni.setVisible(false);
  wmsPotrosaci.setVisible(false);
  wmsNelegalniPotrosaci.setVisible(false);
  wmsPrikljucnoMjesto.setVisible(false);
  wmsNKRO.setVisible(false);
  wmsPOD.setVisible(false);
  wmsValidations.setVisible(false);
  wmsPoslovniObjekti.setVisible(false);
  wmsOdbijeni.setVisible(false);
 }
}

function setupImageLegend(item){
  let layerPart = "geonode:" + item;
  let link = "https://razvojgis.cedis.me/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=" + layerPart + "&legend_options=bgColor:0xF2F2F2";
  document.querySelector("#legenda").src = link;
  document.querySelector("#modal-center").style.display = "block"
}

function closeLegendModal(){
  document.querySelector("#modal-center").style.display = "none"
}
