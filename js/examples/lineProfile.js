      // Layers
      var layer = new ol.layer.Tile({
        title: "Satelite map",
        source: new ol.source.XYZ({
          url: "https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}",
          maxZoom: 23,
        }),
      });

      // The map
      var map = new ol.Map({
        target: "map",
        view: new ol.View({
          zoom: 13,
          //center: [740741, 5776642]
          center: [646752, 5407059],
        }),
        layers: [layer],
      });

      // GPX vector layer
      var source = new ol.source.Vector({
        url: "../assets/data/lineProfile.gpx",
        format: new ol.format.GPX(),
      });
      var style = ol.style.Style.defaultStyle();
      style.push(
        new ol.style.Profile({
          stroke: new ol.style.Stroke({ color: [255, 255, 255, 0.5], width: 1 }),
          fill: new ol.style.Fill({ color: [255, 255, 255, 0.3] }),
          scale: 0.2,
        })
      );
      var vector = new ol.layer.Vector({
        source: source,
        style: style,
      });
      map.addLayer(vector);

      // Profil control
      var profil = new ol.control.Profil({
        target: $(".options").get(0),
      });
      map.addControl(profil);
      source.once("change", function (e) {
        if (source.getState() === "ready") {
          profil.setGeometry(source.getFeatures()[0]);
        }
      });

      // Show feature profile when loaded
      var pt = new ol.Feature(new ol.geom.Point([0, 0]));
      var overlay = new ol.layer.Vector({ source: new ol.source.Vector() });
      overlay.getSource().addFeature(pt);
      overlay.setMap(map);

      source.once("change", function (e) {
        if (source.getState() === "ready") {
          profil.setGeometry(source.getFeatures()[0]);
        }
      });

      // Show a popup on over
      profil.on(["over", "out"], function (e) {
        if (!pt) return;
        if (e.type == "over") {
          // Show point at coord
          pt.setGeometry(new ol.geom.Point(e.coord));
          pt.setStyle(style);
        } else {
          // hide point
          pt.setStyle([]);
        }
      });