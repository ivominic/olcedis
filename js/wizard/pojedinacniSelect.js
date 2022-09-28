/** Metode koje su vezane za pojedinačni odabir (dodavanje) objekata za pokretanje wizarda */
document.querySelector("#pojedinacniSelect").addEventListener("click", prikazFormeZaOdabirWizard);
document.querySelector("#btnObjekatZaDodavanjeWizard").addEventListener("click", selekcijaObjektaZaDodavanjeWizard);
document
  .querySelector("#btnPotvrdiObjekatZaDodavanjeWizard")
  .addEventListener("click", potvrdaObjektaZaDodavanjeWizard);

let nizDodatnihObjekataWizard = [],
  nizDodatnihObjekataJsonWizard = [];

let nizWizardDodatniVodovi = [],
  nizWizardDodatneTrafostanice = [],
  nizWizardDodatniPotrosaci = [],
  nizWizardDodatniPodovi = [],
  nizWizardDodatnaPrikljucnaMjesta = [];

function isprazniNizoveDodatnihObjekataWizard() {
  nizDodatnihObjekataWizard.length = 0;
  nizDodatnihObjekataJsonWizard.length = 0;
  nizWizardDodatniVodovi.length = 0;
  nizWizardDodatneTrafostanice.length = 0;
  nizWizardDodatniPotrosaci.length = 0;
  nizWizardDodatniPodovi.length = 0;
  nizWizardDodatnaPrikljucnaMjesta.length = 0;
}

function prikazFormeZaOdabirWizard() {
  showDiv("#odabirObjektaZaDodavanjeWizardDiv");
}

function selekcijaObjektaZaDodavanjeWizard() {
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  map.on("singleclick", klikNaRastereZaWizardDodavanje);
}

/**Metoda za dodavanje odabranog objekta */
function potvrdaObjektaZaDodavanjeWizard() {
  let objectId = document.querySelector("#ddlObjekatZaDodavanjeWizard").value;
  let tip = objectId.split(".")[0];
  let blnNadjen = false;
  let blnNePostoji = true;
  nizDodatnihObjekataJsonWizard.forEach((el) => {
    if (objectId === el.id_) {
      blnNadjen = true;
      if (tip === "vodovi") {
        nizWizardDodatniVodovi.forEach((elTemp) => {
          objectId === elTemp.id_ && (blnNePostoji = false);
        });
        blnNePostoji && nizWizardDodatniVodovi.push(el);
      }
      if (tip === "trafostanice") {
        nizWizardDodatneTrafostanice.forEach((elTemp) => {
          objectId === elTemp.id_ && (blnNePostoji = false);
        });
        blnNePostoji && nizWizardDodatneTrafostanice.push(el);
      }
      if (tip === "potrosaci") {
        nizWizardDodatniPotrosaci.forEach((elTemp) => {
          objectId === elTemp.id_ && (blnNePostoji = false);
        });
        blnNePostoji && nizWizardDodatniPotrosaci.push(el);
      }
      if (tip === "pod") {
        nizWizardDodatniPodovi.forEach((elTemp) => {
          objectId === elTemp.id_ && (blnNePostoji = false);
        });
        blnNePostoji && nizWizardDodatniPodovi.push(el);
      }
      if (tip === "prikljucno_mjesto") {
        nizWizardDodatnaPrikljucnaMjesta.forEach((elTemp) => {
          objectId === elTemp.id_ && (blnNePostoji = false);
        });
        blnNePostoji && nizWizardDodatnaPrikljucnaMjesta.push(el);
      }
    }
  });
  if (blnNadjen) {
    if (blnNePostoji) {
      poruka("Uspjeh", "Uspješno dodat objekat");
    } else {
      poruka("Upozorenje", "Pokušali ste da dodate objekat koji je već selektovan");
    }
  } else {
    poruka("Upozorenje", "Nije dodat objekat");
  }
}

function klikNaRastereZaWizardDodavanje(browserEvent) {
  showDiv("#odabirObjektaZaDodavanjeWizardDiv");
  nizDodatnihObjekataWizard.length = 0;
  nizDodatnihObjekataJsonWizard.length = 0;
  let trenutniDdl = "#ddlObjekatZaDodavanjeWizard";
  let coordinate = browserEvent.coordinate;
  let pixel = map.getPixelFromCoordinate(coordinate);
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
                    nizDodatnihObjekataWizard.push(el);
                    console.log("el", el);
                  });
                  new ol.format.GeoJSON().readFeatures(json).forEach(function (el) {
                    nizDodatnihObjekataJsonWizard.push(el);
                    console.log("elJSON", el);
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
    console.log("nizDodatnihObjekataJsonWizard", nizDodatnihObjekataJsonWizard);
    $(trenutniDdl).empty();
    nizDodatnihObjekataJsonWizard.forEach((el) => {
      console.log("el čitanje", el);
      //let newId = el.id_.split(".")[0] + "." + el.values_.originalId;
      let newId = el.id_;
      let newText = el.id_.split(".")[0] + "." + el.values_.name + "-" + el.values_.originalId;
      //let newText = el.id_.split(".")[0] + "." + el.values_.name;

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

function dodajObjekat() {}
