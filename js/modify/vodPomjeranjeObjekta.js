/**
 * Modul za pomjeranje lokacije objekata iz sistema
 * Upload fajla sa novim lokacijama objekata, prikazuje forma za odabir objekta koji se pomjera: showDiv("#odabirObjektaZaPomjeranjeDiv");
 * Ovo treba uraditi na serverskoj strani, da bi znali koji dio sadrži nadređeni, a koji podređeni objekat.
 */

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
  console.log("Poziva ispravno");
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
                  if (!provjeraPravaUnosIzmjena(globalUsername, globalVlasnik, el.properties.vlasnik)) {
                    map.un("singleclick", klikNaRastereZaPomjeranjeObjekta);
                    return false;
                  }
                  if (el.id.split(".")[0] === "vodovi") {
                    nizPocetnihVodova.push(el.properties.originalId);
                  }
                  let newId = el.id.split(".")[0] + "." + el.properties.originalId;
                  let newText = el.id.split(".")[0] + "." + el.properties.name + "-" + el.properties.originalId;

                  if (el.id.split(".")[0] !== "vodovi") {
                    $("#ddlObjekatZaPomjeranje").append(
                      $("<option>", {
                        value: newId,
                        text: newText,
                      })
                    );
                  }
                });
                map.un("singleclick", klikNaRastereZaPomjeranjeObjekta);
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
    poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabratiTackuZaPomjeranje);
  } else {
    let novaGeometrija = wkt3Du2D(wktGeometrije(selectGpxFeature));
    console.log("potvrdaPomjeranjaObjekta", selectGpxFeature, novaGeometrija, postojeciObjekat);

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
    showTablePomjeranjeObjekta();
    poruka(StatusPoruke.Uspjeh, UnosPoruke.PomjerenObjekat);
  }
}

function showTablePomjeranjeObjekta(){
  let slanjeBody = document.querySelector("#slanjeBody");
  slanjeBody.innerHTML = "";
  if(nizWmsZaPomjeranje.length > 0){
    nizWmsZaPomjeranje.forEach(function (resp){
      slanjeBody.insertAdjacentHTML('beforeend', '<tr> <td>' + resp[0] + '</td><td><i class="fas fa-trash" onclick="removeElementPomjeranjeObjekta(\'' + resp[0] + '\')" style="cursor: pointer;"></i> </td></tr>');
    });
  } else {
    slanjeBody.insertAdjacentHTML('beforeend', '<tr><td colspan="2" style="text-align: center;">Nema zapisa za slanje</td></tr>');
  }
}

function removeElementPomjeranjeObjekta(elementId){
  nizWmsZaPomjeranje = nizWmsZaPomjeranje.filter(function(resp) {
    return resp[0].toString() !== elementId.toString();
  });
  console.log(nizWmsZaPomjeranje);
  showTablePomjeranjeObjekta();
}

//TODO: Poziv servisa za slanje niza parova za pomjeranje.

/** Poziv web servis za pomjeranje objekata na lokaciju gpx tačaka. Poziva se na finalnoj potvrdi akcija (ikonica dvostruki štrik) */
async function pomjeranjeObjekataVodaWS() {
  let urlServisa = wsServerOriginLocation + "/portal/api/pomjeranje_objekata";

  let jsonDataArray = [];
  nizWmsZaPomjeranje.forEach((el) => {
    jsonDataArray.push({ stariObjekat: el[0], novaGeometrija: el[1] });
  });

  console.log("Pomjeranje voda niz", jsonDataArray);

  promiseArray.push(
    fetch(urlServisa, {
      method: "POST",
      body: JSON.stringify({
        objects: jsonDataArray,
        korisnik: globalUsername,
        group_id: globalTimestamp,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          finalImportMessage += "Izmjena geometrije voda nije izvršena.\n";
          unosUspjeh = false;
        }
        return res.text();
      })
      .then((res) => {
        console.log(res);
      })
      .catch(status, (err) => {
        finalImportMessage += "Izmjena geometrije voda nije izvršena.\n";
        return console.log(status, err);
      })
  );
}
