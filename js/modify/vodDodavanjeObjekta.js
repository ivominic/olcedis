// Modul za dodavanje novog čvora postojećem vodu
//TODO: Upload fajla sa novim objektom, dodaju se atributi i prikazuje forma za odabir susjednih čvorova voda: #odabirCvorovaVodaDiv
//TODO: Odabir čvorova istog voda. Provjeriti da li je odabran bar jedan vod i još neki objekat. Ako je samo vod ili bez voda, prikazati poruku o grešci
//TODO: Ako je novi objekat stub, mijenja se geometrija. Ako je bilo koji drugi objekat, vod se dijeli i definiše se nadređemni i podređeni vod
//TODO: Ovo treba uraditi na serverskoj strani, da bi znali koji dio sadrži nadređeni, a koji podređeni objekat.

let nizPocetnihCvorovaVoda = [],
  nizKrajnjihCvorovaVoda = [];
let nizPocetnihVodova = [],
  nizKrajnjihVodova = [];

function potvrdaDodavanjaVodu() {
  let blnIstiVod = false;
  let vodId;
  nizPocetnihVodova.forEach((el1) => {
    nizKrajnjihVodova.forEach((el2) => {
      if (el1 === el2) {
        blnIstiVod = true;
        vodId = el1;
      }
    });
  });
  if (blnIstiVod) {
    alert("Vod " + vodId);
  } else {
    alert("Nisu elementi istog voda");
  }

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

                  $(selektovaniDdlZaPovezivanjeVoda).append(
                    $("<option>", {
                      value: newId,
                      text: newId,
                    })
                  );
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
