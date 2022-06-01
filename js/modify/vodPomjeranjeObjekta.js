/**
 * Modul za pomjeranje lokacije objekata iz sistema
 * Upload fajla sa novim lokacijama objekata, prikazuje forma za odabir objekta koji se pomjera: showDiv("#odabirObjektaZaPomjeranjeDiv");
 * Ovo treba uraditi na serverskoj strani, da bi znali koji dio sadrži nadređeni, a koji podređeni objekat.
 */

//showDiv("#odabirObjektaZaPomjeranjeDiv");

/** Poziva se na klik na čiodu za odabir sa mape */
function odabirObjektaZaPomjeranje() {
  document.querySelector("#btnObjekatZaPomjeranje").className = "dugmeodabirmapa greenClass";
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  $("#ddlObjekatZaPomjeranje").empty();
  map.on("singleclick", klikNaRastereZaPomjeranjeObjekta);
}

function klikNaRastereZaPomjeranjeObjekta(browserEvent) {
  document.querySelector("#btnObjekatZaPomjeranje").className = "dugmeodabirmapa";
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  let brojLejera = 0;
  let tempNiz = [];
  akcija = "pomjeranje";
  map.forEachLayerAtPixel(pixel, function (layer) {
    if (layer instanceof ol.layer.Image) {
      console.log(layer.values_.name);
      let vidljivost = layer.get("visible");
      if (vidljivost) {
        brojLejera++;
        let url = layer
          .getSource()
          .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
            INFO_FORMAT: "application/json",
            feature_count: "5",
          });
        if (url) {
          fetch(url)
            .then(function (response) {
              return response.text();
            })
            .then(function (json) {
              brojLejera--;
              let odgovor = JSON.parse(json);
              if (odgovor.features.length > 0) {
                odabirSaMape = false;
                console.log(odgovor.features);
                odgovor.features.forEach(function (el) {
                  tempNiz.push(el);
                  console.log("el", el);
                });
              }

              if (brojLejera === 0) {
                tempNiz.forEach((el) => {
                  console.log("el čitanje", el);
                  if (el.id.split(".")[0] === "vodovi") {
                    if (selektovaniDdlZaPovezivanjeVoda === "#ddlObjekatZaPomjeranje") {
                      nizPocetnihVodova.push(el.properties.originalId);
                    }
                  }
                  let newId = el.id.split(".")[0] + "." + el.properties.originalId;

                  if (el.id.split(".")[0] !== "vodovi") {
                    $(selektovaniDdlZaPovezivanjeVoda).append(
                      $("<option>", {
                        value: newId,
                        text: newId,
                      })
                    );
                  }
                });
                map.un("singleclick", klikNaRastereZaPomjeranjeObjekta);
                selektovaniDdlZaPovezivanjeVoda = "";
              }
            });
        }
      }
    }
  });
}

/** Klik na dugme "Potvrdi" */
function potvrdaPomjeranjaObjekta() {
  let blnDodaoObjekat = false;
  let postojeciObjekat = document.querySelector("#ddlObjekatZaPomjeranje").value;
  if (!selectGpxFeature || !postojeciObjekat) {
    poruka("Upozorenje", "Nije odabrana tačka i objekat za pomjeranje.");
  } else {
    let novaGeometrija = wktGeometrije(selectGpxFeature);
    console.log("gpx tačka", selectGpxFeature);
    console.log("gpx wkt geometrija", novaGeometrija);
    console.log("wms tačka", postojeciObjekat);

    nizWmsZaPomjeranje.forEach((item) => {
      if (item[0] === postojeciObjekat) {
        item[1] = novaGeometrija;
        blnDodaoObjekat = true;
      }
    });
    if (!blnDodaoObjekat) {
      nizWmsZaPomjeranje.push([postojeciObjekat, novaGeometrija]);
    }
    console.log("niz wms za pomjeranje", nizWmsZaPomjeranje);
    poruka("Uspjeh", "Uspješno povezana nova tačka i postojeći objekat");
  }
}

//TODO: Poziv servisa za slanje niza parova za pomjeranje.
