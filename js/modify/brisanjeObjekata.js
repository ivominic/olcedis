/** Metode koje se odnose na brisanje objekata sa mape */

/**
 * Dodaje wms objekat u niz za brisanje. Id za view_potrosaci formira u obliku "potrosaci.${originalId}"
 * @param {Objekat koji se dodaje u niz za uklanjanje} objekat
 */
function dodajObjekatZaBrisanje(objekat) {
  let temp_geohash = objekat.properties.geohash_id_no;
  let blnDodaoObjekat = false;
  let objekatId = objekat.id;
  if (objekatId.includes(Lejeri.Potrosac)) {
    objekatId = `potrosaci.${objekat.properties.originalId}`;
  }
  if (objekatId.includes("view_trafostanice")) {
    objekatId = `trafostanice.${objekat.properties?.originalId}`;
  }
  if (objekatId.includes(Lejeri.Solari)) {
    objekatId = `${Podsloj.Solari}.${objekat.properties?.originalId}`;
  }
  nizWmsZaBrisanje.forEach((item) => {
    if (item[0] === temp_geohash) {
      item[1].push(objekatId);
      blnDodaoObjekat = true;
    }
  });
  if (!blnDodaoObjekat) {
    nizWmsZaBrisanje.push([temp_geohash, [objekatId]]);
  }
  brisanjeDodajObjekatVektorskomLejeru(objekat);
  poruka(StatusPoruke.Uspjeh, UnosPoruke.OznacenZaBrisanje);
}

/** Poziv web servis za brisanje objekata. Poziva se na finalnoj potvrdi akcija (ikonica dvostruki štrik) */
async function brisanjeWmsObjekata() {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/brisanje_objekta";

  promiseArray.push(
    fetch(urlServisa, {
      method: "POST",
      body: JSON.stringify({
        korisnik: globalUsername,
        objekti: JSON.stringify(nizWmsZaBrisanje),
        group_id: globalTimestamp,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          finalImportMessage += "Brisanje objekata nije izvršeno.\n";
          unosUspjeh = false;
        }
        return res.text();
      })
      .then((res) => {
        console.log(res);
      })
      .catch(status, (err) => {
        finalImportMessage += "Brisanje objekata nije izvršeno.\n";
        return console.log(status, err);
      })
  );
}
