// Modul za dodavanje novog čvora postojećem vodu
// Upload fajla sa novim objektom, dodaju se atributi i prikazuje forma za odabir susjednih čvorova voda: #odabirCvorovaVodaDiv
// Odabir čvorova istog voda. Provjeriti da li je odabran bar jedan vod i još neki objekat. Ako je samo vod ili bez voda, prikazati poruku o grešci
// Ako je novi objekat stub, mijenja se geometrija. Ako je bilo koji drugi objekat, vod se dijeli i definiše se nadređemni i podređeni vod
// Ovo treba uraditi na serverskoj strani, da bi znali koji dio sadrži nadređeni, a koji podređeni objekat.

let nizPocetnihCvorovaVoda = [],
  nizKrajnjihCvorovaVoda = [];
let nizPocetnihVodova = [],
  nizKrajnjihVodova = [];

function potvrdaDodavanjaVodu() {
  let blnIstiVod = false;
  let vodId;
  let prviObjekat = document.querySelector("#ddlPocetniCvorVodovi").value;
  let drugiObjekat = document.querySelector("#ddlKrajnjiCvorVodovi").value;
  nizPocetnihVodova.forEach((el1) => {
    nizKrajnjihVodova.forEach((el2) => {
      if (el1 === el2) {
        blnIstiVod = true;
        vodId = el1;
      }
    });
  });
  if (!prviObjekat || !drugiObjekat) {
    alert("Nisu odabrane tačke između kojih se unosi novi objekat.");
  }
  if (!blnIstiVod) {
    alert("Nisu elementi istog voda");
    return false;
  }

  console.log("Vod", vodId);
  console.log("Prvi objekat", prviObjekat);
  console.log("Drugi objekat", drugiObjekat);

  finalnaObradaGpxTacakaZaAzuriranjeVoda(`vodovi.${vodId}`, prviObjekat, drugiObjekat);

  alert("Potvrda dodavanja vodu.");
}

function odabirPocetnogCvoraVoda() {
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  selektovaniDdlZaPovezivanjeVoda = "#ddlPocetniCvorVodovi";
  nizPocetnihCvorovaVoda.length = 0;
  nizPocetnihVodova.length = 0;
  $(selektovaniDdlZaPovezivanjeVoda).empty();
  map.on("singleclick", klikNaRastereZaCvorVoda);
}

function odabirKrajnjegCvoraVoda() {
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  odabirSaMape = true;
  selektovaniDdlZaPovezivanjeVoda = "#ddlKrajnjiCvorVodovi";
  nizKrajnjihCvorovaVoda.length = 0;
  nizKrajnjihVodova.length = 0;
  $(selektovaniDdlZaPovezivanjeVoda).empty();
  map.on("singleclick", klikNaRastereZaCvorVoda);
}

//showDiv("#odabirCvorovaVodaDiv");

function klikNaRastereZaCvorVoda(browserEvent) {
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
                let blnNijeSelektovanVod = true;

                /*if (selektovaniDdlZaPovezivanjeVoda === "#ddlPocetniCvorVodovi") {
                  nizPocetnihCvorovaVoda = tempNiz.slice();
                }
                if (selektovaniDdlZaPovezivanjeVoda === "#ddlKrajnjiCvorVodovi") {
                  nizKrajnjihCvorovaVoda = tempNiz.slice();
                }*/
                tempNiz.forEach((el) => {
                  console.log("el čitanje", el);
                  if (el.id.split(".")[0] === "vodovi") {
                    blnNijeSelektovanVod = false;
                    if (selektovaniDdlZaPovezivanjeVoda === "#ddlPocetniCvorVodovi") {
                      nizPocetnihVodova.push(el.properties.originalId);
                    }
                    if (selektovaniDdlZaPovezivanjeVoda === "#ddlKrajnjiCvorVodovi") {
                      nizKrajnjihVodova.push(el.properties.originalId);
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
                if (blnNijeSelektovanVod) {
                  poruka("Upozorenje", "Nije odabran objekat koji pripada nekom vodu");
                  $(selektovaniDdlZaPovezivanjeVoda).empty();
                }
                map.un("singleclick", klikNaRastereZaCvorVoda);
                selektovaniDdlZaPovezivanjeVoda = "";
              }
            });
        }
      }
    }
  });
}

function finalnaObradaGpxTacakaZaAzuriranjeVoda(vodId, prvaTacka, drugaTacka) {
  let postojiNeobradjenaTacka = false;
  let iterator = 0;
  let nizObjekataZaDodavanjeVodu = [];
  stuboviArrayFinal.length = 0;
  trafostaniceArrayFinal.length = 0;
  podoviArrayFinal.length = 0;
  prikljucnaMjestaArrayFinal.length = 0;
  potrosaciArrayFinal.length = 0;
  nkroArrayFinal.length = 0;
  gpxFeatures.forEach((el) => {
    iterator++;
    console.log("finalno lejer", el.get("lejer"));
    if (el.get("lejer") === "stubovi") {
      nizObjekataZaDodavanjeVodu.push(stubArrayElement(el, "I", 0, iterator));
    } else if (el.get("lejer") === "trafostanice") {
      nizObjekataZaDodavanjeVodu.push(trafostanicaArrayElement(el, "I", 0, iterator));
    } else if (el.get("lejer") === "nkro") {
      nizObjekataZaDodavanjeVodu.push(nkroArrayElement(el, "I", 0, iterator));
    } else if (el.get("lejer") === "potrosac") {
      nizObjekataZaDodavanjeVodu.push(potrosacArrayElement(el, "I", 0, iterator));
    } else if (el.get("lejer") === "pod") {
      nizObjekataZaDodavanjeVodu.push(podArrayElement(el, "I", 0, iterator));
    } else if (el.get("lejer") === "prikljucno_mjesto") {
      nizObjekataZaDodavanjeVodu.push(prikljucnoMjestoArrayElement(el, "I", 0, iterator));
    } else if (el.get("lejer") === undefined) {
      postojiNeobradjenaTacka = true;
    }
  });

  if (postojiNeobradjenaTacka) {
    poruka("Upozorenje", "Nisu obradjeni svi objekti iz fajla za uvoz.");
    return false;
  } else {
    azuriranjeWebService(vodId, prvaTacka, drugaTacka, nizObjekataZaDodavanjeVodu);
  }
}

//TODO: Pozvati servis koji će Jovan napraviti
function azuriranjeWebService(vodId, prvaTacka, drugaTacka, nizObjekataZaDodavanjeVodu) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/dodavanje_objekta_vodu";
  $.ajax({
    url: urlServisa,
    data: {
      stari_objekti: JSON.stringify([vodId, prvaTacka, drugaTacka]),
      novi_objekti: JSON.stringify(nizObjekataZaDodavanjeVodu),
    },
    type: "POST",
    success: function (data) {
      console.log("success ažuriranje", data);
      poruka("Uspjeh", data);
      availableLayersPerPowerLevel("");
      vectorSource.clear();
      vektorKreiraniVodovi.getSource().clear();
      gpxFeatures.length = 0;
    },
    error: function (x, y, z) {
      console.log("Greška", x.responseText);
      poruka("Greška", "Nije izvršen unos podataka.");
    },
  });
}
