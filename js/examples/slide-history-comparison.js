/**
 * Initial module. Contains all properties and methods needed to work with maps and spatial data
 */
//TODO: THIS CAN BE DELETED.
const domainUrl = "http://192.168.1.230:8080";
const wmsUrl = domainUrl + "/geoserver/geonode/wms";
const wfsUrl = domainUrl + "/geoserver/geonode/wfs";

const point = "Point",
  lineString = "LineString",
  polygon = "Polygon";

let points = [],
  lines = [],
  polygons = [];

let draw,
  modify,
  cqlFilter = "",
  action = "pan";
let wktGeometry = "";

/**Base maps */
let osmBaseMap = new ol.layer.Tile({
  title: "Open Street Maps",
  source: new ol.source.OSM(),
});
let sateliteBaseMap = new ol.layer.Tile({
  title: "Satelite map",
  source: new ol.source.XYZ({
    url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
    maxZoom: 23,
  }),
});

/**Stilizacija vektora */
var fill = new ol.style.Fill({
  color: "rgba(0,255,255,0.6)",
});
var stroke = new ol.style.Stroke({
  color: "#00ffff",
  width: 4,
});
var circle = new ol.style.Circle({
  radius: 7,
  fill: fill,
  stroke: stroke,
});
var vectorStyle = new ol.style.Style({
  fill: fill,
  stroke: stroke,
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

let wmsStubovi = new ol.layer.Image({
  title: "Ortofoto",
  name: "ortofoto_2007",
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: "geoportal:Ortofoto_DOF2007",
    },
    ratio: 1,
    serverType: "geoserver",
    crossOrigin: "anonymous",
  }),
});

let ortofoto2007 = new ol.layer.Image({
  title: "Ortofoto",
  name: "ortofoto_2007",
  source: new ol.source.ImageWMS({
    url: "http://192.168.1.230:8080/geoserver/geoportal/wms?service=WMS&version=1.1.0&request=GetMap&layers=geoportal%3AOrtofoto_DOF2007&format=application/openlayers",
    params: {
      LAYERS: "Ortofoto_DOF2007",
    },
    ratio: 1,
    serverType: "geoserver",
    crossOrigin: "anonymous",
  }),
});

let ortofoto2018 = new ol.layer.Image({
  title: "Ortofoto",
  name: "ortofoto_2010",
  source: new ol.source.ImageWMS({
    url: "http://192.168.1.230:8080/geoserver/geoportal/wms?service=WMS&version=1.1.0&request=GetMap&layers=geoportal%3AOrtofoto_DOF2018&format=application/openlayers",
    params: {
      LAYERS: "Ortofoto_DOF2018",
    },
    ratio: 1,
    serverType: "geoserver",
    crossOrigin: "anonymous",
  }),
});

/**Initializing map inside div with id = #map*/
let map = new ol.Map({
  target: "map",
  //interactions: ol.interaction.defaults().extend([new ol.interaction.PinchZoom(), new ol.interaction.DragPan()]),
  layers: [ortofoto2007, ortofoto2018],
  view: view,
});

map.addControl(scale);

const swipe = document.getElementById("swipe");

ortofoto2007.on("prerender", function (event) {
  const ctx = event.context;
  const mapSize = map.getSize();
  const width = mapSize[0] * (swipe.value / 100);
  const tl = ol.render.getRenderPixel(event, [width, 0]);
  const tr = ol.render.getRenderPixel(event, [mapSize[0], 0]);
  const bl = ol.render.getRenderPixel(event, [width, mapSize[1]]);
  const br = ol.render.getRenderPixel(event, mapSize);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(tl[0], tl[1]);
  ctx.lineTo(bl[0], bl[1]);
  ctx.lineTo(br[0], br[1]);
  ctx.lineTo(tr[0], tr[1]);
  ctx.closePath();
  ctx.clip();
});

ortofoto2007.on("postrender", function (event) {
  const ctx = event.context;
  ctx.restore();
});

const listener = function () {
  map.render();
};
swipe.addEventListener("input", listener);
swipe.addEventListener("change", listener);
