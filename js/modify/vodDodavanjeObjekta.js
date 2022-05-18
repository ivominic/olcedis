/**
 * Modul za dodavanje novog čvora postojećem vodu
 * Upload fajla sa novim objektom, dodaju se atributi i prikazuje forma za odabir susjednih čvorova voda: #odabirCvorovaVodaDiv
 * Odabir čvorova istog voda. Provjeriti da li je odabran bar jedan vod i još neki objekat.
 * Ako je odabran samo vod ili više objekata bez voda, prikazati poruku o grešci, jer je potrebno da budu odabrani vod i stub koji pripada tom vodu.
 * Ako je novi objekat stub, mijenja se geometrija. Ako je bilo koji drugi objekat, vod se dijeli i definiše se nadređemni i podređeni vod.
 * Ova provjera je relizovana na serverskoj strani, da bi znali koji dio sadrži nadređeni, a koji podređeni objekat.
 */

let nizPocetnihCvorovaVoda = [],
  nizKrajnjihCvorovaVoda = [];
let nizPocetnihVodova = [],
  nizKrajnjihVodova = [];

/**
 * Metoda koja se poziva na potvrdu sa mini forme za umetanje novih tačaka u vod. Vrši provjeru da li postoje krajnje tačke
 * i provjeru da li je u oba slučaja odabran i isti vod. Ukoliko su zadovoljeni uslovi, poziva se funkcija finalnaObradaGpxTacakaZaAzuriranjeVoda
 * @returns null
 */
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
    poruka("Upozorenje", "Nisu odabrane tačke između kojih se unosi novi objekat.");
    return false;
  }
  if (!blnIstiVod) {
    poruka("Upozorenje", "Nisu elementi istog voda");
    return false;
  }

  finalnaObradaGpxTacakaZaAzuriranjeVoda(`vodovi.${vodId}`, prviObjekat, drugiObjekat);
}

/**
 * Metoda koja se poziva kod klika na dugme za odabir prve tačke sa mape
 */
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

/**
 * Metoda koja se poziva kod klika na dugme za odabir druge tačke sa mape
 */
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

/**
 * Metoda koja aktivira odabir objekata sa mape i prikaz selektovanih objekata u listi za odabir čvorova voda između kojih se unose nove tačke
 * Prolazi kroz sve vidljive lejere i inkrementira brojač, kako bi u callback-u znali kada su obrađeni svi očekivani odgovori.
 * Za svaki odabir sa mape se vrši provjera da li je bar jedan odabrani objekat vod - jer je to obavezan uslov i popunjava odgovarajuću listu
 * objektima koji su selektovani sa mape (klikom koji ova metoda obrađuje).
 * @param {klik na neku lokaciju na mapi} browserEvent
 */
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
                  //console.log("el", el);
                });
              }

              if (brojLejera === 0) {
                let blnNijeSelektovanVod = true;

                tempNiz.forEach((el) => {
                  //console.log("el čitanje", el);
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

/**
 * Metoda koja prolazi kroz sve elemente gpx fajla i u zavinosti od lejera priprema svaki objekat pojedinačno za unos u bazu.
 * Ukoliko neka tačka uvezenog gpx fajla nije obrađena (nisu popunjeni podaci) prikazuje se poruka o grešci.
 * U finalnom koraku se poziva servis za unos u bazu.
 * @param {id voda čija geometrija se mijenja dodavanjem novih tačaka} vodId
 * @param {tačka / čvor voda} prvaTacka
 * @param {tačka / čvor voda} drugaTacka
 * @returns
 */
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

//TODO: Pozvati servis koji će Jovan napraviti - ili će kroz neki od postojećih servisa biti realizovano.
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
