/** Funkcionalnosti za prikaz, na mapi, objekata koji su označeni za brisanje i ažuriranje */

let nizZaVektorBrisanje = [];

function brisanjeDodajObjekatVektorskomLejeru(objekat) {
  let format = new ol.format.WKT();
  let geomObject = objekat.geometry;
  let geom;
  if (geomObject.type === "Point") {
    geom = format.writeGeometry(new ol.geom.Point(geomObject.coordinates), {});
  } else if (geomObject.type === "LineString") {
    geom = format.writeGeometry(new ol.geom.LineString(geomObject.coordinates), {});
  } else if (geomObject.type === "Polygon") {
    geom = format.writeGeometry(new ol.geom.Polygon(geomObject.coordinates), {});
  }

  var feature = format.readFeature(geom, {});
  feature.set("lejer", "brisanje");
  nizZaVektorBrisanje.push(feature);
  vektorObjektiZaBrisanje.getSource().clear();
  vektorObjektiZaBrisanje.getSource().addFeatures(nizZaVektorBrisanje);
}
