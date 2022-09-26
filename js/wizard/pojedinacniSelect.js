/** Metode koje su vezane za pojedinačni odabir (dodavanje) objekata za pokretanje wizarda */
document.querySelector("#pojedinacniSelect").addEventListener("click", prikazFormeZaOdabirWizard);
document.querySelector("#btnObjekatZaDodavanjeWizard").addEventListener("click", selekcijaObjektaZaDodavanjeWizard);
document
  .querySelector("#btnPotvrdiObjekatZaDodavanjeWizard")
  .addEventListener("click", potvrdaObjektaZaDodavanjeWizard);

function prikazFormeZaOdabirWizard() {
  showDiv("#odabirObjektaZaDodavanjeWizardDiv");
}

function selekcijaObjektaZaDodavanjeWizard() {
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  map.on("singleclick", klikNaRastereZaWizardDodavanje);
}

function potvrdaObjektaZaDodavanjeWizard() {
  alert("Dugme za potvrdu");
}

function klikNaRastereZaWizardDodavanje(browserEvent) {
  showDiv("#odabirObjektaZaDodavanjeWizardDiv");
  let trenutniDdl = "#ddlObjekatZaDodavanjeWizard";
  $(trenutniDdl).empty();
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
  let tempNizWizard = [];
  let promiseWizardArray = [];
  map.forEachLayerAtPixel(pixel, function (layer) {
    if (layer instanceof ol.layer.Image) {
      console.log(layer.values_.name);
      let vidljivost = layer.get("visible");
      if (vidljivost) {
        let url = layer
          .getSource()
          .getFeatureInfoUrl(browserEvent.coordinate, map.getView().getResolution(), "EPSG:4326", {
            INFO_FORMAT: "application/json",
            feature_count: "5",
          });
        if (url) {
          promiseWizardArray.push(
            fetch(url)
              .then(function (response) {
                return response.text();
              })
              .then(function (json) {
                let odgovor = JSON.parse(json);
                console.log("Odgovor", odgovor);
                if (odgovor.features.length > 0) {
                  odgovor.features.forEach(function (el) {
                    tempNizWizard.push(el);
                    console.log("el", el);
                  });
                }
              })
              .catch(status, (err) => {
                return console.log("insertAllObject greška", err);
              })
          );
        }
      }
    }
  });

  Promise.all(promiseWizardArray).then(function () {
    tempNizWizard.forEach((el) => {
      console.log("el čitanje", el);
      let newId = el.id.split(".")[0] + "." + el.properties.originalId;
      let newText = el.id.split(".")[0] + "." + el.properties.name;

      $(trenutniDdl).append(
        $("<option>", {
          value: newId,
          text: newText,
        })
      );
    });
    map.un("singleclick", klikNaRastereZaWizardDodavanje);
    trenutniDdl = "";
  });
}
