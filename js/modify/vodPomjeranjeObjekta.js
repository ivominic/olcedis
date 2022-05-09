/**
 * Modul za pomjeranje lokacije objekata iz sistema
 * Upload fajla sa novim lokacijama objekata, prikazuje forma za odabir objekta koji se pomjera: showDiv("#odabirObjektaZaPomjeranjeDiv");
 * Ovo treba uraditi na serverskoj strani, da bi znali koji dio sadrži nadređeni, a koji podređeni objekat.
 */

//showDiv("#odabirObjektaZaPomjeranjeDiv");

function odabirObjektaZaPomjeranje() {
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  selektovaniDdlZaPovezivanjeVoda = "#ddlObjekatZaPomjeranje";
  $(selektovaniDdlZaPovezivanjeVoda).empty();
  map.on("singleclick", klikNaRastereZaPomjeranjeObjekta);
}

function klikNaRastereZaPomjeranjeObjekta(browserEvent) {
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  let brojLejera = 0;
  let tempNiz = [];
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
                alert("aaaaaa");
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
                alert("bbbbbb");
              }
            });
        }
      }
    }
  });
}
