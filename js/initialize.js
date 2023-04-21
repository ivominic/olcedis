$("#gradOption").hide();
let pointSize = 7,
  radiusSize = 2,
  pointStroke = "#40f200",
  pointFill = "#40f20070",
  globalText = "default";
const forgotPasswForma = document.querySelectorAll("#zaboraviliSifruLabel");

for (let index = 0; index < forgotPasswForma.length; index++) {
  forgotPasswForma[index].addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".registerForma").style.display = "none";
    document.querySelector(".loginForma").style.display = "none";
    document.querySelector(".forgotPasswordForma").style.display = "block";
  });
}

$("#exampleModal").on("hidden.bs.modal", function () {
  document.querySelector(".registerForma").style.display = "none";
  document.querySelector(".forgotPasswordForma").style.display = "none";
  document.querySelector(".loginForma").style.display = "block";
});

//Events on click
document.querySelector("#drawButton").addEventListener("click", showDrawModal);
document.querySelector("#restart").addEventListener("click", restartWindow);
document
  .querySelector("#btnDownloadMapData")
  .addEventListener("click", downloadDrawnData);
  document.querySelector("#osmMapDiv").addEventListener("click", setupOsmMap);
  document.querySelector("#sateliteMapDiv").addEventListener("click", setupSateliteMap);
  document.querySelector("#topoMapDiv").addEventListener("click", setupTopoMap);
  document.querySelector("#lejeriDiv").addEventListener("click",openMenuForLayers);

function showDrawModal() {
  closeModal();
  document.querySelector("#drawButtonli").className = "activeLi";
  document.querySelector("#right-bar-modal").style.right = "0";
}

function showAttributeModal() {
  closeModal();
  document.querySelector("#attributeButtonli").className = "activeLi";
  document.querySelector("#right-bar-modal-attribute").style.right = "0";
}

function closeModal() {
  document.querySelector("#drawButtonli").className = "";
  document.querySelector("#attributeButtonli").className = "";

  // map.removeInteraction(drawTraceInteraction);
  // map.removeInteraction(snapTraceInteraction);
  // map.removeInteraction(guidedSnapInteraction);
  // map.removeInteraction(guidedDrawInteraction);
  // map.removeInteraction(guidedModifyInteraction);
  map.removeInteraction(draw);
  map.removeInteraction(modify);

  document.querySelector("#right-bar-modal").style.right = "-355px";
  document.querySelector("#right-bar-modal-2").style.right = "-355px";
  document.querySelector("#right-bar-modal-attribute").style.right = "-355px";
}

function pointColor(color) {
  let pointRed = document.querySelector("#pointRed");
  let lineRed = document.querySelector("#lineRed");
  let polygonRed = document.querySelector("#polygonRed");

  let pointOrange = document.querySelector("#pointOrange");
  let lineOrange = document.querySelector("#lineOrange");
  let polygonOrange = document.querySelector("#polygonOrange");

  let pointYellow = document.querySelector("#pointYellow");
  let lineYellow = document.querySelector("#lineYellow");
  let polygonYellow = document.querySelector("#polygonYellow");

  let pointGreen = document.querySelector("#pointGreen");
  let lineGreen = document.querySelector("#lineGreen");
  let polygonGreen = document.querySelector("#polygonGreen");

  let pointBlue = document.querySelector("#pointBlue");
  let lineBlue = document.querySelector("#lineBlue");
  let polygonBlue = document.querySelector("#polygonBlue");

  pointRed.className = "colorSpan";
  lineRed.className = "colorSpan";
  polygonRed.className = "colorSpan";

  pointOrange.className = "colorSpan";
  lineOrange.className = "colorSpan";
  polygonOrange.className = "colorSpan";

  pointYellow.className = "colorSpan";
  lineYellow.className = "colorSpan";
  polygonYellow.className = "colorSpan";

  pointGreen.className = "colorSpan";
  lineGreen.className = "colorSpan";
  polygonGreen.className = "colorSpan";

  pointBlue.className = "colorSpan";
  lineBlue.className = "colorSpan";
  polygonBlue.className = "colorSpan";

  if (color === "red") {
    pointFill = "#d7000073";
    pointStroke = "#d70000";
    pointRed.className = "colorSpanActive";
    lineRed.className = "colorSpanActive";
    polygonRed.className = "colorSpanActive";
  } else if (color === "orange") {
    pointFill = "#ffaa2c8a";
    pointStroke = "#ffaa2c";
    pointOrange.className = "colorSpanActive";
    lineOrange.className = "colorSpanActive";
    polygonOrange.className = "colorSpanActive";
  } else if (color === "yellow") {
    pointFill = "#ffff0087";
    pointStroke = "#ffff00";
    pointYellow.className = "colorSpanActive";
    lineYellow.className = "colorSpanActive";
    polygonYellow.className = "colorSpanActive";
  } else if (color === "green") {
    pointFill = "#40f20070";
    pointStroke = "#40f200";
    pointGreen.className = "colorSpanActive";
    lineGreen.className = "colorSpanActive";
    polygonGreen.className = "colorSpanActive";
  } else if (color === "blue") {
    pointFill = "#00d9ff70";
    pointStroke = "#00d9ff";
    pointBlue.className = "colorSpanActive";
    lineBlue.className = "colorSpanActive";
    polygonBlue.className = "colorSpanActive";

  }
  resetMapStyles();
}

function pointDraw(number) {
  let point8 = document.querySelector("#point8");
  let point12 = document.querySelector("#point12");
  let point24 = document.querySelector("#point24");
  let point32 = document.querySelector("#point32");

  point8.className = "velicinaPara";
  point12.className = "velicinaPara";
  point24.className = "velicinaPara";
  point32.className = "velicinaPara";

  if (number === 8) {
    pointSize = 8;
    point8.className = "velicinaParaActive";
  } else if (number === 12) {
    pointSize = 12;
    point12.className = "velicinaParaActive";
  } else if (number === 24) {
    pointSize = 24;
    point24.className = "velicinaParaActive";
  } else if (number === 32) {
    pointSize = 32;
    point32.className = "velicinaParaActive";
  }
  resetMapStyles();
}

function lineDraw(number) {
  let line1 = document.querySelector("#line1");
  let line2 = document.querySelector("#line2");
  let line3 = document.querySelector("#line3");
  let line4 = document.querySelector("#line4");
  let polygon1 = document.querySelector("#polygon1");
  let polygon2 = document.querySelector("#polygon2");
  let polygon3 = document.querySelector("#polygon3");
  let polygon4 = document.querySelector("#polygon4");
  line1.className = "velicinaPara";
  line2.className = "velicinaPara";
  line3.className = "velicinaPara";
  line4.className = "velicinaPara";

  polygon1.className = "velicinaPara";
  polygon2.className = "velicinaPara";
  polygon3.className = "velicinaPara";
  polygon4.className = "velicinaPara";

  if (number === 1) {
    radiusSize = 1;
    line1.className = "velicinaParaActive";
    polygon1.className = "velicinaParaActive";
  } else if (number === 2) {
    radiusSize = 2;
    line2.className = "velicinaParaActive";
    polygon2.className = "velicinaParaActive";
  } else if (number === 3) {
    radiusSize = 3;
    line3.className = "velicinaParaActive";
    polygon3.className = "velicinaParaActive";
  } else if (number === 4) {
    radiusSize = 4;
    line4.className = "velicinaParaActive";
    polygon4.className = "velicinaParaActive";
  }
  resetMapStyles();
}

function restartWindow() {
  location.reload();
}

function setupPoint() {
  addGuidedInteraction("Point");
  resetMapStyles();
}

function resetMapStyles() {
  let style = generateVectorStyle(
    pointStroke,
    pointFill,
    radiusSize,
    pointSize
  );
  featurePolygonOverlay.setStyle(style);
  featureLineOverlay.setStyle(style);
  featurePointOverlay.setStyle(style);
}

function changeTextFilter(type) {
  addGuidedInteraction(type);
  let style = generateVectorStyle(
    pointStroke,
    pointFill,
    radiusSize,
    pointSize
  );
  featurePolygonOverlay.setStyle(style);
  featureLineOverlay.setStyle(style);
  featurePointOverlay.setStyle(style);
}

function traceAndGuideForLine() {
  let lineTrace = document.querySelector("#lineTrace").checked;
  if (lineTrace) {
    addGuidedInteraction("LineString");
  } else {
    addTraceInteraction("LineString");
  }
}

function traceAndGuideForPolygon() {
  let lineTrace = document.querySelector("#polygonTrace").checked;
  if (lineTrace) {
    addGuidedInteraction("Polygon");
  } else {
    addTraceInteraction("Polygon");
  }
}

function setupOsmMap(){
  map.getLayers().setAt(0, osmBaseMap);
  clearMapLayerStyles();
  document.querySelector("#osmMapDiv").className = "col-4 activeMap";
  document.querySelector("#lejeriDiv").className = "lejeri-stil";
}

function setupSateliteMap(){
  map.getLayers().setAt(0, sateliteBaseMap);
  clearMapLayerStyles();
  document.querySelector("#sateliteMapDiv").className = "col-4 activeMap";
  document.querySelector("#lejeriDiv").className = "lejeri-stil-satelite";
}

function setupTopoMap(){
  map.getLayers().setAt(0, topoMap);
  clearMapLayerStyles();
  document.querySelector("#topoMapDiv").className = "col-4 activeMap";
  document.querySelector("#lejeriDiv").className = "lejeri-stil-topo";
}

function clearMapLayerStyles(){
  document.querySelector("#osmMapDiv").className = "col-4";
  document.querySelector("#sateliteMapDiv").className = "col-4";
  document.querySelector("#topoMapDiv").className = "col-4";
}

function openMenuForLayers(){
document.querySelector("#chooseLayerContainer").style.display = "block";
}

function closeMenuForLayers(){
  document.querySelector("#chooseLayerContainer").style.display = "none";
}

function closeModalLeft(){
  document.querySelector("#layerMenu").className = "";
  document.querySelector("#handButton").className = "activeLi";
  document.querySelector("#modal-center").style.display = "none";
  document.querySelector("#modal-left").style.left = "-400px";
}

function showModalLeft(){
  document.querySelector("#layerMenu").className = "activeLi";
  document.querySelector("#handButton").className = "";
  document.querySelector("#modal-left").style.left = "unset";
}

function stampaMape() {
  map.once("rendercomplete", function () {
    const mapCanvas = document.createElement("canvas");
    const size = map.getSize();
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    const mapContext = mapCanvas.getContext("2d");
    Array.prototype.forEach.call(
      map.getViewport().querySelectorAll(".ol-layer canvas, canvas.ol-layer"),
      function (canvas) {
        if (canvas.width > 0) {
          const opacity =
            canvas.parentNode.style.opacity || canvas.style.opacity;
          mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);

          const backgroundColor = canvas.parentNode.style.backgroundColor;
          if (backgroundColor) {
            mapContext.fillStyle = backgroundColor;
            mapContext.fillRect(0, 0, canvas.width, canvas.height);
          }

          let matrix;
          const transform = canvas.style.transform;
          if (transform) {
            // Get the transform parameters from the style's transform matrix
            matrix = transform
              .match(/^matrix\(([^\(]*)\)$/)[1]
              .split(",")
              .map(Number);
          } else {
            matrix = [
              parseFloat(canvas.style.width) / canvas.width,
              0,
              0,
              parseFloat(canvas.style.height) / canvas.height,
              0,
              0,
            ];
          }
          // Apply the transform to the export map context
          CanvasRenderingContext2D.prototype.setTransform.apply(
            mapContext,
            matrix
          );
          mapContext.drawImage(canvas, 0, 0);
        }
      }
    );
    mapContext.globalAlpha = 1;
    if (navigator.msSaveBlob) {
      // link download attribute does not work on MS browsers
      navigator.msSaveBlob(mapCanvas.msToBlob(), "map.png");
    } else {
      const link = document.getElementById("image-download");
      link.href = mapCanvas.toDataURL("image/jpeg");
      link.click();
    }
  });
  map.renderSync();
}