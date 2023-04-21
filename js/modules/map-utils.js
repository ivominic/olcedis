/** Utility functions for maps */

function generateVectorStyle(
  colorStroke,
  colorFill,
  strokeSize,
  pointSize,
  textContent = "",
  font = "Arial",
  fontSize = "12"
) {
  let fill = new ol.style.Fill({
    color: colorFill,
  });
  let stroke = new ol.style.Stroke({
    color: colorStroke,
    width: strokeSize,
  });
  let circle = new ol.style.Circle({
    radius: pointSize,
    fill: fill,
    stroke: stroke,
  });
  let text = new ol.style.Text({
    text: textContent,
    font: `${fontSize}px ${font}`,
    scale: pointSize,
    fill: fill,
  });
  if (textContent) {
    return new ol.style.Style({
      fill: fill,
      stroke: stroke,
      text: text,
    });
  } else {
    return new ol.style.Style({
      fill: fill,
      stroke: stroke,
      image: circle,
    });
  }
}

/** Downloading data */
function download(data, filename) {
  let blob = new Blob([data], { type: "text/plain" });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}

function downloadDrawnData() {
  if (featurePolygonOverlay.getSource().getFeatures().length) {
    let text = new ol.format.GeoJSON().writeFeatures(featurePolygonOverlay.getSource().getFeatures(), {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });
    download(text, "draw.json");
  } else {
    Swal.fire("Obaveštenje!", "Nema podataka za preuzimanje!", "error");
  }
}

/**
 * Returns newly created layer
 * @param {Layer title} title
 * @param {Layer name} name
 * @param {Layer name with workspace: prefixed} fullname
 * @param {Properties which values need to be shown} propertyName
 * @returns
 */
function createImageWmsLayer(title, name, fullname, propertyName) {
  let paramsObject = {
    LAYERS: fullname,
    propertyName: propertyName,
    feature_count: "100",
  };
  if (propertyName) {
    paramsObject = {
      LAYERS: fullname,
      feature_count: "100",
    };
  }
  return new ol.layer.Image({
    title: title,
    name: name,
    source: new ol.source.ImageWMS({
      url: wmsUrl,
      params: paramsObject,
      ratio: 1,
      serverType: "geoserver",
    }),
  });
}
