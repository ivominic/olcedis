/**Dodaje wms objekat u niz za brisanje */
function dodajObjekatZaBrisanje(objekat) {
  //let temp_geohash = objekat.properties.geohash_id_no;
  //TODO: Podesiti prije produkcije na id_no. Trenutno su null vrijednosti.
  let temp_geohash = objekat.properties.geohash_id;
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
  console.log("NIZ ZA BRISANJE", nizWmsZaBrisanje);
}

function brisanjeWmsObjekata() {
  //TODO: CALL WEB SERVICE
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/object_control";
  $.ajax({
    url: urlServisa,
    data: {
      data: nizWmsZaBrisanje,
    },
    type: "POST",
    success: function (data) {
      console.log("success brisanje objekata", data);
      poruka("Uspjeh", data);
      nizWmsZaBrisanje.length = 0;
    },
    error: function (x, y, z) {
      poruka("Greška", JSON.parse(x.responseText).response);
    },
  });
}
