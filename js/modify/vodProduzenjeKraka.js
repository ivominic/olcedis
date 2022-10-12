/**
 * Modul za funkcionalnosti produženja postojećih vodova. Postupak uključuje sljedeće korake:
 * Čitanje atributa i geometrije iz wfs-a
 * Prikaz odgovarajućeg vektora na mapi
 * Omogućavanje izmjene nakon klikna na vektor (nisam uspio da kreiram modify interakciju bez dodatnog klika)
 * Snapovanje na odabrani lejer
 * Dodavanje izmjena u niz za slanje na validaciju
 */

/**
 * Metoda koja obrađuje klik na mapu, za prikaz geometrije voda
 * @param {klik na neku lokaciju na mapi} browserEvent
 */
function vodEditGeometrije(browserEvent) {
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  map.forEachLayerAtPixel(pixel, function (layer) {
    let vidljivost = layer.get("visible");
    if (layer instanceof ol.layer.Image && layer.values_.name === "vodovi" && vidljivost) {
      let url = layer
        .getSource()
        .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
          INFO_FORMAT: "application/json",
          feature_count: "1",
        });
      if (url) {
        fetch(url)
          .then(function (response) {
            return response.text();
          })
          .then(function (json) {
            let odgovor = JSON.parse(json);
            if (odgovor.features.length > 0) {
              odabirSaMape = false;
              console.log("PRELAZAK NA FEATURE");
              featureTekuciOverlay.getSource().clear();
              featureTekuciOverlay.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(odgovor.features[0]));

              map.un("singleclick", vodEditGeometrije);
            }
          });
      }
    }
  });

  //Dodaje interakciju u ovom koraku
  var modifyVod = new ol.interaction.Modify({
    condition: false,
    features: select.getFeatures(),
  });

  //TODO: Provjeriti da li funkcionišu prethodne modifikacije
  map.addInteraction(modifyVod);

  let snap = new ol.interaction.Snap({
    source: featureSnapOverlay.getSource(),
  });
  map.addInteraction(snap);

  modifyVod.on("modifyend", function (e) {
    console.log("MODIFY VOD END - features", e.features.getArray()[0]);

    if (!originalnaGeometrijaWmsVoda) {
      return false;
    }

    let coordinates = e.features.getArray()[0].getGeometry().getCoordinates();

    if (coordinates.length !== originalnaGeometrijaWmsVoda.coordinates.length) {
      e.features.getArray()[0].getGeometry().setCoordinates(originalnaGeometrijaWmsVoda.coordinates);
      poruka(
        "Upozorenje",
        "Geometrija linije je izmijenjena na način da su joj dodate nove prelomne tačke, što nije dozvoljeno."
      );
      return false;
    }

    let isLineModifiedInMiddle = false;
    let isViolatedAllowedDistance = false;
    for (i = 1; i < coordinates.length - 1; i++) {
      if (
        coordinates[i][0] !== originalnaGeometrijaWmsVoda.coordinates[i][0] ||
        coordinates[i][1] !== originalnaGeometrijaWmsVoda.coordinates[i][1]
      ) {
        isLineModifiedInMiddle = true;
      }
    }
    if (isLineModifiedInMiddle) {
      e.features.getArray()[0].getGeometry().setCoordinates(originalnaGeometrijaWmsVoda.coordinates);
      poruka("Upozorenje", "Nije dozvoljena izmjena geometrije linije, osim pomjeranjem krajnjih tačaka.");
      return false;
    }

    let coordinateLength = coordinates.length;
    let mjera = {
      units: "kilometers",
    };
    if (
      coordinates[0][0] !== originalnaGeometrijaWmsVoda.coordinates[0][0] ||
      coordinates[0][1] !== originalnaGeometrijaWmsVoda.coordinates[0][1]
    ) {
      let distancaOd = turf.point([coordinates[0][0], coordinates[0][1]]);
      let distancaDo = turf.point([
        originalnaGeometrijaWmsVoda.coordinates[0][0],
        originalnaGeometrijaWmsVoda.coordinates[0][1],
      ]);
      let distanca = turf.distance(distancaOd, distancaDo, mjera);
      if (distanca > dozvoljeniPomjeraj) {
        isViolatedAllowedDistance = true;
      }
    }
    if (
      coordinates[coordinateLength - 1][0] !== originalnaGeometrijaWmsVoda.coordinates[coordinateLength - 1][0] ||
      coordinates[coordinateLength - 1][1] !== originalnaGeometrijaWmsVoda.coordinates[coordinateLength - 1][1]
    ) {
      let distancaOd = turf.point([coordinates[coordinateLength - 1][0], coordinates[coordinateLength - 1][1]]);
      let distancaDo = turf.point([
        originalnaGeometrijaWmsVoda.coordinates[coordinateLength - 1][0],
        originalnaGeometrijaWmsVoda.coordinates[coordinateLength - 1][1],
      ]);
      let distanca = turf.distance(distancaOd, distancaDo, mjera);
      if (distanca > dozvoljeniPomjeraj) {
        isViolatedAllowedDistance = true;
      }
    }

    if (isViolatedAllowedDistance) {
      e.features.getArray()[0].getGeometry().setCoordinates(originalnaGeometrijaWmsVoda.coordinates);
      poruka("Upozorenje", "Tačka ne može biti pomjerena više od " + kmlRadius.toString() + "m od snimljene pozicije.");
      return false;
    }

    //TODO: Dodati u niz objekata za izmjenu. Dodati i novu geometriju kao property "geometrija"
    vodArrayValuesProperties(e.features.getArray()[0], "U");
  });
}

/**
 * Preparing JSON object from feature, for powerline update geometry
 * @param {* Feature of element for insert} el
 * @param {* "I" for insert, "U" for update} action
 */
function vodArrayValuesProperties(el, action) {
  if (!el.id_) return false;
  let item = {
    //fid_1: el.values_.fid_1,
    fid_1: el.id_.split(".")[1],
    Geometry: geometrijaIzmijenjenogVoda(el),
    name: el.values_.name,
    merge: el.values_.merge,
    fid: el.values_.fid,
    materijal: el.values_.materijal,
    zajednicka_dion: el.values_.zajednicka_dion,
    id_br: el.values_.id_br,
    dionica_nn: el.values_.dionica_nn,
    napon: el.values_.napon,
    dionica: el.values_.dionica,
    dionica_gps: el.values_.dionica_gps,
    rasvjeta: el.values_.rasvjeta,
    rac_duzina: el.values_.rac_duzina,
    poc_dion: el.values_.poc_dion,
    vrsta: el.values_.vrsta,
    vlasnistvo: el.values_.vlasnistvo,
    tip: el.values_.tip,
    br_spojnica: el.values_.br_spojnica,
    id: el.values_.id, //Vidjeti šta ovdje predajem
    kraj_dion: el.values_.kraj_dion,
    uze_presjek: el.values_.uze_presjek,
    layer_name: el.values_.layer_name, //Mislim da se ovo ne popunjava. Provjeriti
    izvod_ts: el.values_.izvod_ts,
    uze: el.values_.uze,
    br_faza: el.values_.br_faza,
    presjek: el.values_.presjek,
    opstina: el.values_.opstina,
    naziv: el.values_.naziv,
    god_izg: el.values_.god_izg,
    gps: el.values_.gps,
    datum_azuriranja: "", //Jovan će popuniti na serverskoj strani
    pog_sprem: el.values_.pog_sprem,
    duzina: el.values_.duzina,
    layer_id: el.values_.layer_id,
    broj_spojnica: el.values_.broj_spojnica,
    geohash_id: "", //Provjeriti da li treba da se šalje
    geohash_id_no: "", //Provjeriti da li treba da se šalje
    korisnik: globalUsername,
    katastar: el.values_.katastar,
    posjeduje_sliku: el.values_.posjeduje_sliku,
    originalId: el.values_.originalId,
    sifra_dionice: el.values_.sifra_dionice,
    sifra_napojne: el.values_.sifra_napojne,
    naziv_napojne: el.values_.naziv_napojne,
    izvod_napojne: el.values_.izvod_napojne,
    vlasnik: el.values_.vlasnik,
    ts: el.values_.ts,
    akcija: action,
    wizard: 0,
    isEditable: isEditable,
    geohash_id: el.values_.geohash_id,
    geohash_id_no: el.values_.geohash_id_no,
    posjeduje_sliku: el.values_.posjeduje_sliku,
  };
  vodoviArrayFinal.push(item);
  return item;
}

function geometrijaIzmijenjenogVoda(objekat) {
  //console.log("Izvlačenje geometrije", objekat);
  let format = new ol.format.WKT();
  //let geomObject = objekat.values_.geometry;
  let geom = format.writeGeometry(objekat.getGeometry());
  //let geom = format.writeGeometry(new ol.geom.LineString(geomObject.flatCoordinates), {});
  return geom;
}
