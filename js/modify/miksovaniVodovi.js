/** Metode za kreiranje voda koji čini jedan broj postojećih, a jedan broj stubova iz gpx fajla */

/** Dodavanje tačaka iz wms-a nizu gpx tačaka nizTacakaLinije. Ovaj niz sadrži koordinate tačaka oblika [x, y] */
function dodajWmsObjekte() {
  let napon = "10";
  console.log("AKo je čekirano da se pravi mješoviti vod");
  let params = wmsStubovi.getSource().getParams();
  let formiraniFilter = globalCqlZaNaponskiNivo(napon, "stub");
  if (params.CQL_FILTER && params.CQL_FILTER.length > 0) {
    formiraniFilter += " AND (" + params.CQL_FILTER + ")";
  }
  formiraniFilter = encodeURIComponent(formiraniFilter);
  console.log("FILTER ZA VOD!!!!!", formiraniFilter);
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernameS +
    "&outputformat=application/json&cql_filter=" +
    formiraniFilter +
    "&access_token=" +
    geoserverToken;

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      console.log("RESPONSE", response);
      let stuboviZaDodavanje = new ol.format.GeoJSON().readFeatures(response);
      let naziviVisestrukihStubova = provjeraVisestruktihStubova(stuboviZaDodavanje);
      if (naziviVisestrukihStubova) {
        console.log("Višestruki", naziviVisestrukihStubova);
        poruka(StatusPoruke.Greska, UnosPoruke.VodVisestrukiStubovi + naziviVisestrukihStubova);
      } else {
        let nizStubovaLinije = [];
        stuboviZaDodavanje.forEach((item) => {
          nizStubovaLinije.push(item.values_.geometry.flatCoordinates);
        });
        objedinjavanjeNizovaGpxWms(nizStubovaLinije);
        koordinateObjekataIzDdlova();
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
      poruka(StatusPoruke.Greska, UnosPoruke.ProblemCitanjeStubova);
    },
  });
}

/**
 * Metoda koja vraća parove naziva stubova koji se nalaze u istoj tački, ukoliko postoje.
 * Ako ne postoje višestruki stubovi, vrati prazan string.
 * @param {*} array - niz stubova koji vraća metoda dodajWmsObjekte (stuboviZaDodavanje)
 */
function provjeraVisestruktihStubova(array) {
  let retVal = "";
  if (array.length > 1) {
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = i + 1; j < array.length; j++) {
        if (
          provjeraPoklapanjaKoordinata(
            array[i].values_.geometry.flatCoordinates,
            array[j].values_.geometry.flatCoordinates
          )
        ) {
          console.log("Objekat za provjeru koordinata 1", array[i]);
          retVal += `(${array[i].values_.name}, ${array[j].values_.name})\n`;
        }
      }
    }
  }
  return retVal;
}

/**
 * Metoda koja vraća true ukoliko se koordinate dvije tačke poklapaju, inače false.
 * @param {*} koordinate1 - koordinate provog objekta, kao niz [x,y]
 * @param {*} koordinate2 - koordinate provog objekta, kao niz [x,y]
 */
function provjeraPoklapanjaKoordinata(koordinate1, koordinate2) {
  let retVal = false;
  if (koordinate1.length < 2 && koordinate2.length < 2) {
    throw new Error("Koordinate nisu u formi niza od dva elementa");
  } else {
    if (koordinate1[0] === koordinate2[0] && koordinate1[1] === koordinate2[1]) {
      retVal = true;
    }
  }
  return retVal;
}

/** Dodavanje tačaka iz wmsStubovi nizuTacakaLinije: dodajemo najbližu sljedeću tačku */
function objedinjavanjeNizovaGpxWms(wmsStubovi) {
  let brojWmsStubova = wmsStubovi.length;
  let mjera = {
    units: "kilometers",
  };

  for (i = 0; i < brojWmsStubova; i++) {
    if (nizTacakaLinije.length < 1) {
      nizTacakaLinije.push(wmsStubovi[i]);
      wmsStubovi.splice(i, 1);
    } else {
      let pocetnaTacka = turf.point(nizTacakaLinije[0]);
      let krajnjaTacka = turf.point(nizTacakaLinije[nizTacakaLinije.length - 1]);
      let nizIndex = 0,
        tempIndex = 0;
      let blnDodatiNaPocetakNiza = false;
      let minDistance = 0;
      wmsStubovi.forEach((item) => {
        if (
          (item[0] === pocetnaTacka[0] && item[1] === pocetnaTacka[0]) ||
          (item[0] === krajnjaTacka[0] && item[1] === krajnjaTacka[0])
        ) {
          alert("Poklapaju se koordinate postojećeg i snimljenog stuba.");
          return false;
        }
        let trenutnaTacka = turf.point([item[0], item[1]]);
        let trenutnaUdaljenost = turf.distance(pocetnaTacka, trenutnaTacka, mjera);
        let blnTrenutniPocetak = true;
        let udaljenostKranja = turf.distance(krajnjaTacka, trenutnaTacka, mjera);
        if (udaljenostKranja < trenutnaUdaljenost) {
          trenutnaUdaljenost = udaljenostKranja;
          blnTrenutniPocetak = false;
        }

        if (tempIndex === 0 || minDistance > trenutnaUdaljenost) {
          minDistance = trenutnaUdaljenost;
          blnDodatiNaPocetakNiza = blnTrenutniPocetak;
          nizIndex = tempIndex;
        }
        tempIndex++;
      });

      //Uklanjanje iz jednog i dodavanje drugom nizu
      if (blnDodatiNaPocetakNiza) {
        nizTacakaLinije.unshift(wmsStubovi[nizIndex]);
      } else {
        nizTacakaLinije.push(wmsStubovi[nizIndex]);
      }
      wmsStubovi.splice(nizIndex, 1);
    }
  }
}
