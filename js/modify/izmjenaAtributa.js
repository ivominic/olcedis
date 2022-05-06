/** Pravi niz objekata kojima se mijenjaju atributi */

//selektovaniWmsObjekat

function dodajObjekatZaIzmjenu(objekat) {
  //let temp_geohash = objekat.properties.geohash_id_no;
  //TODO: Podesiti prije produkcije na id_no. Trenutno su null vrijednosti.
  console.log("OBJEKAT IZMIJENJEN", objekat);
  let temp_geohash = objekat.properties.geohash_id;
  let blnDodaoObjekat = false;
  nizWmsZaBrisanje.forEach((item) => {
    if (item[0] === temp_geohash) {
      item[1].push(objekat.id);
      blnDodaoObjekat = true;
    }
  });
  if (!blnDodaoObjekat) {
    nizWmsZaBrisanje.push([temp_geohash, objekat]);
  }
  console.log("NIZ ZA IZMJENU", nizWmsZaBrisanje);
}

function izmjenaAtributaWmsLejer(objekat) {
  console.log("WMS OBJEKAT ZA IZMJENU ATRIBUTA", objekat);
  if (objekat.ddlLejer === "stub35" || objekat.ddlLejer === "stub10" || objekat.ddlLejer === "stub04") {
    dodajObjekatZaIzmjenu(izmijeniAtributeWmsStuba(objekat));
  }
  if (objekat.ddlLejer === "vod35" || objekat.ddlLejer === "vod10" || objekat.ddlLejer === "vod04") {
    //dodajObjekatZaIzmjenu(izmijeniAtributeWmsStuba(objekat));
  }
  if (
    objekat.ddlLejer === "trafostanica110" ||
    objekat.ddlLejer === "trafostanica35" ||
    objekat.ddlLejer === "trafostanica10"
  ) {
    prikaziPoljaWmsTrafostanice(objekat);
  }
  if (objekat.ddlLejer === "nkro") {
    prikaziPoljaWmsNKRO(objekat);
  }
  if (objekat.ddlLejer === "prikljucno_mjesto") {
    prikaziPoljaWmsPM(objekat);
  }
  if (objekat.ddlLejer === "potrosac") {
    prikaziPoljaWmsPotrosac(objekat);
  }
  if (objekat.ddlLejer === "pod") {
    prikaziPoljaWmsPod(objekat);
  }
}
