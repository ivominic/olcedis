/** Pravi niz objekata kojima se mijenjaju atributi */

//selektovaniWmsObjekat

function dodajObjekatZaIzmjenu(objekat) {
  //let temp_geohash = objekat.properties.geohash_id_no;
  //TODO: Podesiti prije produkcije na id_no. Trenutno su null vrijednosti.
  console.log("OBJEKAT IZMIJENJEN", objekat);
  let temp_geohash = objekat.properties.geohash_id;
  let blnDodaoObjekat = false;
  nizWmsZaIzmjenu.forEach((item) => {
    if (item[0] === temp_geohash) {
      item[1].push(objekat.id);
      blnDodaoObjekat = true;
    }
  });
  if (!blnDodaoObjekat) {
    nizWmsZaIzmjenu.push([temp_geohash, objekat]);
  }
  console.log("NIZ ZA IZMJENU", nizWmsZaIzmjenu);
}

function izmjenaAtributaWmsLejer(objekat) {
  console.log("WMS OBJEKAT ZA IZMJENU ATRIBUTA", objekat);
  if (objekat.ddlLejer === "stub35" || objekat.ddlLejer === "stub10" || objekat.ddlLejer === "stub04") {
    dodajObjekatZaIzmjenu(izmijeniAtributeWmsStuba(objekat));
  }
  if (objekat.ddlLejer === "vod35" || objekat.ddlLejer === "vod10" || objekat.ddlLejer === "vod04") {
    dodajObjekatZaIzmjenu(izmijeniAtributeWmsVoda(objekat));
  }
  if (
    objekat.ddlLejer === "trafostanica110" ||
    objekat.ddlLejer === "trafostanica35" ||
    objekat.ddlLejer === "trafostanica10"
  ) {
    dodajObjekatZaIzmjenu(izmijeniAtributeWmsTrafostanice(objekat));
  }
  if (objekat.ddlLejer === "nkro") {
    dodajObjekatZaIzmjenu(izmijeniAtributeWmsNKRO(objekat));
  }
  if (objekat.ddlLejer === "prikljucno_mjesto") {
    dodajObjekatZaIzmjenu(izmijeniAtributeWmsPM(objekat));
  }
  if (objekat.ddlLejer === "potrosac") {
    dodajObjekatZaIzmjenu(izmijeniAtributeWmsPotrosac(objekat));
  }
  if (objekat.ddlLejer === "pod") {
    dodajObjekatZaIzmjenu(izmijeniAtributeWmsPod(objekat));
  }
}

function izmjenaAtributaSvihObjekata() {
  //TODO: CALL WEB SERVICE
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/object_control";
  $.ajax({
    url: urlServisa,
    data: {
      korisnik: globalUsername,
      objekti: nizWmsZaIzmjenu,
    },
    type: "POST",
    success: function (data) {
      console.log("success izmjena atributa objekata", data);
      poruka("Uspjeh", data);
      nizWmsZaIzmjenu.length = 0;
    },
    error: function (x, y, z) {
      poruka("Greška", JSON.parse(x.responseText).response);
    },
  });
}
