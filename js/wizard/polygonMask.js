/**
 * Metode koje omogućavaju preuzimanje maske/iscrtanih poligona koje označavaju trafo reon.
 * Ovo omogućava da se ne iscrtava traforeon prilikom svakog pokretanja wizarda.
 */

function download(data, filename) {
  var blob = new Blob([data], { type: "text/plain" });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}

function downloadMask() {
  var text = new ol.format.GeoJSON().writeFeatures(featurePolygonOverlay.getSource().getFeatures(), {});
  download(text, "maska_wizard.json");
}

document.querySelector("#download").addEventListener("click", downloadMask);
