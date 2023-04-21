/**
 * Initial module. Contains all properties and methods needed to work with maps and spatial data
 */

const domainUrl = "http://localhost";
const wmsUrl = domainUrl + "/geoserver/wms";
const wfsUrl = domainUrl + "/geoserver/wfs";

const point = "Point",
  lineString = "LineString",
  polygon = "Polygon",
  multiPolygon = "MultiPolygon";

let points = [],
  lines = [],
  polygons = [];
let pointSize = 7,
  radiusSize = 2,
  pointStroke = "#40f200",
  pointFill = "#40f20070",
  globalText = "default";

let draw,
  modify,
  cqlFilter = "",
  action = "pan";
let wktGeometry = "";
let featuresPoint = new ol.Collection();
/**Base maps */
let osmBaseMap = new ol.layer.Tile({
  title: "Open Street Maps",
  source: new ol.source.OSM(),
  crossOrigin: "anonymous",
});
let sateliteBaseMap = new ol.layer.Tile({
  title: "Satelite map",
  source: new ol.source.XYZ({
    url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
    maxZoom: 23,
  }),
  crossOrigin: "anonymous",
});
let ortofotoBaseMap = new ol.layer.Image({
  title: "Ortofoto",
  name: "ortofoto_2018",
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: "geonode:ortofoto_2018",
    },
    ratio: 1,
    serverType: "geoserver",
  }),
  crossOrigin: "anonymous",
});

let topoMap = new ol.layer.Tile({
  title: "Open Topo Maps",
  type: "base",
  visible: true,
  source: new ol.source.XYZ({
    url: "https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png"
  })
});

/**Stilizacija vektora */
var fill = new ol.style.Fill({
  color: "#40f20070",
});
var stroke = new ol.style.Stroke({
  color: "#40f20070",
  width: 2,
});
var circle = new ol.style.Circle({
  radius: 7,
  fill: fill,
});

var vectorStyle = new ol.style.Style({
  stroke: stroke,
  fill: fill,
  image: circle,
});

/**Styling snap vector*/
var fillSnap = new ol.style.Fill({
  color: "rgba(128,0,128,0.5)",
});
var strokeSnap = new ol.style.Stroke({
  color: "#C807FE",
  width: 2,
});
var circleSnap = new ol.style.Circle({
  radius: 7,
  fill: fillSnap,
  stroke: strokeSnap,
});
var vectorStyleSnap = new ol.style.Style({
  fill: fillSnap,
  stroke: strokeSnap,
  image: circleSnap,
});

/**Styling newly created vector elements*/
let fillCreated = new ol.style.Fill({
  color: "rgba(255,0,0,0.8)",
});
let strokeCreated = new ol.style.Stroke({
  color: "#ff0000",
  width: 8,
});
let circleCreated = new ol.style.Circle({
  radius: 8,
  fill: fillCreated,
  stroke: strokeCreated,
});
let vectorStyleCreated = new ol.style.Style({
  fill: fillCreated,
  stroke: strokeCreated,
  image: circleCreated,
});

let overviewMapControl = new ol.control.OverviewMap({
  // see in overviewmap-custom.html to see the custom CSS used
  className: 'ol-overviewmap ol-custom-overviewmap',
  layers: [
      new ol.layer.Tile({
          source: new ol.source.OSM(),
      }) ],
  collapseLabel: '\u00BB',
  label: '\u00AB',
  collapsed: true,
});

//let center = [19.26, 42.56];
let center = ol.proj.transform([19.26, 42.56], "EPSG:4326", "EPSG:3857");
let view = new ol.View({
  center: center,
  zoom: 9,
  //projection: "EPSG:4326",
});

/** Showing scale line on maps*/
const scale = new ol.control.ScaleLine({
  target: document.querySelector("#scale"),
  units: "metric",
  bar: true,
  steps: 4,
  text: true,
  minWidth: 100,
});

/**Initializing map inside div with id = #map*/
let map = new ol.Map({
  target: "map",
  controls: ol.control.defaults().extend([overviewMapControl]),
  //interactions: ol.interaction.defaults().extend([new ol.interaction.PinchZoom(), new ol.interaction.DragPan()]),
  layers:[osmBaseMap],
  view: view,
  crossOrigin: "anonymous",
});

map.addControl(scale);
let featurePointOverlay = kreirajVektorLejerZaCrtanje(featuresPoint);
featurePointOverlay.getSource().on("addfeature", (evt) => {
  resetMapStyles();
  points.push(wktGeometrije(evt.feature));
});
featurePointOverlay.setMap(map);
map.on("pointermove", onMouseMove);

function onMouseMove(evt) {
    let position = ol.proj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
    document.querySelector("#coordinates").innerHTML = "X:" + parseFloat(position[0]).toFixed(6) + " Y:" + parseFloat(position[1]).toFixed(6);
    if (evt.dragging) {
        return;
    }
    map.getTargetElement().style.cursor = "";
    let pixel = map.getEventPixel(evt.originalEvent);
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

/**Kreiranje vektorskih lejera za crtanje i kreiranje nove geometrije ili edit postojeće (point, linestring, polygon, new i edit) */
function kreirajVektorLejerZaCrtanje(olCollection) {
  return new ol.layer.Vector({
    id: "pointLayer",
    source: new ol.source.Vector({
      features: olCollection,
    }),
    style: vectorStyle,
  });
}

/** Vraća well known tekst reprezentaciju geometrije za predati feature */
function wktGeometrije(feature) {
  let format = new ol.format.WKT();
  return format.writeGeometry(feature.getGeometry(), {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  });
}

let dragAndDrop = new ol.interaction.DragAndDrop({
  formatConstructors: [
    ol.format.GPX,
    ol.format.GeoJSON,
    ol.format.IGC,
    ol.format.KML,
    ol.format.TopoJSON,
  ],
});
dragAndDrop.on("addfeatures", function (event) {
  console.log("aaaa", event.features);
  drawVector.getSource().addFeatures(event.features);
  view.fit(drawVector.getSource().getExtent(), map.getSize());
});
map.addInteraction(dragAndDrop);
