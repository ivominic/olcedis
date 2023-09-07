document.querySelector("#pocetniPrikazMape").addEventListener("click", pocetniPrikazMape);
document.querySelector("#undo").addEventListener("click", undoMoveMap);
document.querySelector("#redo").addEventListener("click", redoMoveMap);
let nizKoordinataMove = [], nizNivoaZuma = [], indexUndoRedoNiza = -1, pomjerajUndoRedo = false;
function undoMoveMap(){
  if(indexUndoRedoNiza > 0){
    indexUndoRedoNiza--;
    pomjerajUndoRedo = true;
    map.getView().setCenter(nizKoordinataMove[indexUndoRedoNiza]);
    map.getView().setZoom(nizNivoaZuma[indexUndoRedoNiza]);
  }
}

function redoMoveMap(){
  if(indexUndoRedoNiza < nizKoordinataMove.length - 1){
    indexUndoRedoNiza++;
    pomjerajUndoRedo = true;
    map.getView().setCenter(nizKoordinataMove[indexUndoRedoNiza]);
    map.getView().setZoom(nizNivoaZuma[indexUndoRedoNiza]);
  }
}

function pocetniPrikazMape(){
  indexUndoRedoNiza = 0;
  pomjerajUndoRedo = true;
  map.getView().setCenter([19.26, 42.56]);
  map.getView().setZoom(nizNivoaZuma[indexUndoRedoNiza]);
}

map.on('moveend', onMoveEnd);
function onMoveEnd(evt) {
  if(!pomjerajUndoRedo){
    let centar = evt.map.getView().getCenter();
    let nivoZuma = evt.map.getView().getZoom();
    indexUndoRedoNiza++;
    nizKoordinataMove.length = indexUndoRedoNiza;
    nizNivoaZuma.length = indexUndoRedoNiza;
    nizKoordinataMove.push(centar);
    nizNivoaZuma.push(nivoZuma);
  }
  pomjerajUndoRedo = false;
}