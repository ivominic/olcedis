/** Metode koje se odnose na brisanje objekata sa mape */

/**Dodaje wms objekat u niz za brisanje */
function dodajObjekatZaBrisanje(objekat) {
  let temp_geohash = objekat.properties.geohash_id_no;
  let blnDodaoObjekat = false;
  nizWmsZaBrisanje.forEach((item) => {
    if (item[0] === temp_geohash) {
      item[1].push(objekat.id);
      blnDodaoObjekat = true;
    }
  });
  if (!blnDodaoObjekat) {
    nizWmsZaBrisanje.push([temp_geohash, [objekat.id]]);
  }
  brisanjeDodajObjekatVektorskomLejeru(objekat);
}

/** Poziv web servis za brisanje objekata. Poziva se na finalnoj potvrdi akcija (ikonica dvostruki štrik) */
function brisanjeWmsObjekata() {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/brisanje_objekta";
  $.ajax({
    url: urlServisa,
    data: {
      korisnik: globalUsername,
      objekti: JSON.stringify(nizWmsZaBrisanje),
    },
    type: "POST",
    success: function (data) {
      console.log("success brisanje objekata", data);
      nizWmsZaBrisanje.length = 0;
      unosBrojFunkcija++;
      if (unosPostojeObjekti) {
        if (unosBrojFunkcija === 3 && unosUspjeh) {
          poruka("Uspjeh", "Uspješno sačuvani podaci.");
        }
        if (unosBrojFunkcija === 3 && !unosUspjeh) {
          poruka("Greška", "Akcija nije izvršena");
        }
      }
    },
    error: function (x, y, z) {
      unosBrojFunkcija++;
      unosUspjeh = false;
      if (unosBrojFunkcija === 3 && unosPostojeObjekti) {
        poruka("Greška", "Akcija nije izvršena");
      }
      console.log("Greška brisanje objekata", JSON.parse(x.responseText).response);
    },
  });
}
