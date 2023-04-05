function dodajPoljaOdabranomGpxPotrosac() {
  //TODO: prikazati confirm sa spiskom svih korisnika i nakon toga, ukoliko se potvrdi:
  //TODO: split polja pretplatni broj odvojen zarezima. Prethodno ukloniti sve spaceove
  //TODO: po splitovanom nizu prolazimo svaki zapis i kreiramo novi feature na istim koordinatama
  //TODO: brišemo tačku u kojoj je unijeta vrijednost svih pretplatnih brojeva
  let pretplatniBrojevi = document.querySelector("#pretplatni_br").value.replace(/ /g, "");
  if (pretplatniBrojevi == "") {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.UnijetiBrojevePotrosaca);
    return false;
  }
  podaciZaSpisakPotrosaca(pretplatniBrojevi);
  /*if (selectGpxFeature.get("lejer") === undefined || selectGpxFeature.get("lejer") === "potrosac") {
    podaciZaSpisakPotrosaca(pretplatniBrojevi);
  } else {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.PokusajKreiranjaPotrosaca + selectGpxFeature.get("lejer"));
  }*/
}

//TODO: Ova funkcija se ne koristi
function duplirajPotrosace() {
  //Ovo razraditi za kreiranje pojedinačnih gpx potrošača
  vectorSource.getFeatures().forEach(function (el) {
    if (el.ol_uid == select.getFeatures()?.array_[0]?.ol_uid) {
      select.getFeatures().clear(); //Da bi uklonili stil selektovane tačke
      vectorSource.addFeature(el.clone());
    }
  });
}

/**
 * Metoda koja provjerava da li su uneseni dupli pretplatnici.
 * @returns
 */
function finalProvjeraDuplih() {
  let retVal = "";
  for (let i = 1; i < potrosaciArrayFinal.length; i++) {
    for (let j = 0; j < i; j++) {
      if (potrosaciArrayFinal[i].pretplatni_br === potrosaciArrayFinal[j].pretplatni_br) {
        retVal = potrosaciArrayFinal[i].pretplatni_br;
      }
    }
  }
  return retVal;
}

function kreiranjePojedinacnihGpxPotrosaca(nizPretplatnika) {
  if (select.getFeatures().array_[0] === undefined) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.OdabratiGpxTacku);
    return false;
  }
  let ispravno = true,
    poklapanjeTs = true;
  let porukaNepoklapanjeTs = "";

  let tekstHtml = "";
  nizPretplatnika.forEach((jsonPretplatnik) => {
    tekstHtml += "<li>" + jsonPretplatnik.sifra + " - " + jsonPretplatnik.naziv_potrosaca + "</li>";
    jsonPretplatnik.naziv_potrosaca === "Nema podatka" && (ispravno = false);
    if (sifraNapojneTrafostanice !== srediSifruTrafostanice(jsonPretplatnik.sifra_trafostanice)) {
      poklapanjeTs = false;
      porukaNepoklapanjeTs +=
        "<li>" +
        jsonPretplatnik.naziv_potrosaca +
        " - " +
        jsonPretplatnik.sifra +
        " - šifra TS: " +
        jsonPretplatnik.sifra_trafostanice +
        "</li>";
    }
  });
  tekstHtml = "<ul style='text-align:left'>" + tekstHtml + "</ul>";

  Swal.fire({
    title: "Da li želite da kreirate objekte za sljedeće korisnike?",
    //icon: "info",
    html: tekstHtml,
    showDenyButton: true,
    confirmButtonText: `Da`,
    denyButtonText: `Ne`,
  }).then((result) => {
    if (result.isConfirmed) {
      if (!poklapanjeTs) {
        Swal.fire(
          `Pretplatnici čija šifra trafostanice u bilingu ne odgovara odabranoj (${sifraNapojneTrafostanice}):`,
          porukaNepoklapanjeTs,
          "error"
        );
        return false;
      }
      if (!ispravno) {
        Swal.fire("Odbijeno", "Ispraviti pretplatne brojeve za koje nisu nađeni podaci u sistemu.", "error");
        return false;
      } else {
        let selFeature = select.getFeatures().array_[0];
        select.getFeatures().clear();

        nizPretplatnika.forEach((jsonPretplatnik) => {
          console.log("Pojedinačni niz pretplatnika", jsonPretplatnik);
          vectorSource.getFeatures().forEach(function (el) {
            let noviEl = el;
            let boolAdd = false;
            if (el.get("lejer")) {
              noviEl = el.clone();
              boolAdd = true;
              console.log("elemenat koji ima lejer", noviEl);
              console.log("elemenat lejer", el.get("lejer"));
            }
            if (el !== undefined && el.ol_uid == selFeature.ol_uid) {
              //vectorSource.addFeature(el.clone());
              //TODO: Dodijeliti vrijednosti el feature-u iz jsonPretplatnik objekta
              noviEl.set("wizard", 0);
              noviEl.set("lejer", "potrosac");
              noviEl.set("gps", document.querySelector("#gps").value);
              noviEl.set("name", document.querySelector("#name").value);
              noviEl.set("id", jsonPretplatnik.id);
              noviEl.set("naziv", jsonPretplatnik.naziv_potrosaca);
              noviEl.set("prik_kabal", jsonPretplatnik.provodnik_spolja + " " + jsonPretplatnik.presjek_spolja);
              noviEl.set("pod", jsonPretplatnik.pod_na_mm);
              noviEl.set("status", jsonPretplatnik.status);
              noviEl.set("adresa_mm", jsonPretplatnik.adresa_mjesta_mjerenja);
              noviEl.set("prik_mjesto", document.querySelector("#prik_mjesto").value);
              noviEl.set("pretplatni_br", jsonPretplatnik.sifra);
              noviEl.set("br_brojila", jsonPretplatnik.broj_brojila);
              noviEl.set("sifra_napojne", sifraNapojneTrafostanice);
              noviEl.set("naziv_napojne", nazivNapojneTrafostanice);
              noviEl.set("izvod_napojne", izvodNapojneTrafostanice);
              noviEl.set("napon", document.querySelector("#napon").value);
              noviEl.set("naziv_nn_izvod", document.querySelector("#naziv_nn_izvod").value);
              noviEl.set("korisnik", globalUsername);
              noviEl.set("vlasnik", "");
              if (boolAdd) {
                gpxFeatures.push(noviEl);
                vectorSource.addFeatures([noviEl]);
              }
              if (!isEditable) {
                dodajSacuvaniKmlFeature(noviEl);
              }

              //TODO: Ukloniti i metodu generisanjeGpxPodaIzGeometrije
              /*let ddlTemp = document.querySelector("#prik_mjesto").value;
              generisanjeGpxPodaIzGeometrije(
                nizKoordinataPrikljucnihMjesta[ddlTemp][0],
                nizKoordinataPrikljucnihMjesta[ddlTemp][1],
                jsonPretplatnik
              );*/
            }
          });
          selectGpxFeature = null;
          select.getFeatures().clear();
          poruka(StatusPoruke.Uspjeh, UnosPoruke.Uspjeh);
        });
      }
    }
  });
}

function prikaziPoljaOdabranogGpxPotrosac() {
  if (selectGpxFeature.values_.gps !== undefined) {
    document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  document.querySelector("#name").value = selectGpxFeature.values_.name;
  document.querySelector("#id").value = selectGpxFeature.values_.id;
  document.querySelector("#naziv_napojne").value = selectGpxFeature.values_.naziv_napojne;
  document.querySelector("#sifra_napojne").value = selectGpxFeature.values_.sifra_napojne;
  document.querySelector("#izvod_napojne").value = selectGpxFeature.values_.izvod_napojne;
  document.querySelector("#potrosac_ime").value = selectGpxFeature.values_.naziv;
  document.querySelector("#prik_kabal").value = selectGpxFeature.values_.prik_kabal;
  document.querySelector("#naziv_nn_izvod").value = selectGpxFeature.values_.naziv_nn_izvod;
  document.querySelector("#pod").value = selectGpxFeature.values_.pod;
  document.querySelector("#adresa_mm").value = selectGpxFeature.values_.adresa_mm;
  if (selectGpxFeature.values_.prik_mjesto) {
    $("#prik_mjesto").empty();
    $("#prik_mjesto").append(
      $("<option>", {
        value: selectGpxFeature.values_.prik_mjesto,
        text: "prikljucno mjesto:" + selectGpxFeature.values_.prik_mjesto,
      })
    );
  }
  //document.querySelector("#prik_mjesto").value = selectGpxFeature.values_.prik_mjesto;
  document.querySelector("#pretplatni_br").value = selectGpxFeature.values_.pretplatni_br;
  document.querySelector("#br_brojila").value = selectGpxFeature.values_.br_brojila;
}

function prikaziPoljaWmsPotrosac(objekat) {
  if (objekat.properties.gps !== undefined) {
    document.querySelector("#gps").value = objekat.properties.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  document.querySelector("#name").value = objekat.properties.name;
  document.querySelector("#id").value = objekat.properties.id;
  document.querySelector("#naziv_napojne").value = objekat.properties.naziv_napojne;
  document.querySelector("#sifra_napojne").value = objekat.properties.sifra_napojne;
  document.querySelector("#izvod_napojne").value = objekat.properties.izvod_napojne;
  document.querySelector("#potrosac_ime").value = objekat.properties.naziv;
  document.querySelector("#prik_kabal").value = objekat.properties.prik_kabal;
  document.querySelector("#pod").value = objekat.properties.pod;
  document.querySelector("#adresa_mm").value = objekat.properties.adresa_mm;
  if (objekat.properties.prik_mjesto) {
    $("#prik_mjesto").empty();
    $("#prik_mjesto").append(
      $("<option>", {
        value: objekat.properties.prik_mjesto,
        text: "prikljucno mjesto:" + objekat.properties.prik_mjesto,
      })
    );
  }
  //document.querySelector("#prik_mjesto").value = objekat.properties.prik_mjesto;
  document.querySelector("#naziv_nn_izvod").value = objekat.properties.naziv_nn_izvod;
  document.querySelector("#pretplatni_br").value = objekat.properties.pretplatni_br;
  document.querySelector("#br_brojila").value = objekat.properties.br_brojila;
}

function izmijeniAtributeWmsPotrosac(objekat) {
  podaciZaPretplatniBroj(document.querySelector("#pretplatni_br").value, objekat);
  /*objekat.properties.name = document.querySelector("#name").value;
  objekat.properties.id = document.querySelector("#id").value;
  objekat.properties.naziv_napojne = document.querySelector("#naziv_napojne").value;
  objekat.properties.sifra_napojne = document.querySelector("#sifra_napojne").value;
  objekat.properties.izvod_napojne = document.querySelector("#izvod_napojne").value;
  objekat.properties.prik_kabal = document.querySelector("#prik_kabal").value;
  objekat.properties.pod = document.querySelector("#pod").value;
  objekat.properties.adresa_mm = document.querySelector("#adresa_mm").value;
  objekat.properties.prik_mjesto = document.querySelector("#prik_mjesto").value;
  objekat.properties.pretplatni_br = document.querySelector("#pretplatni_br").value;
  objekat.properties.br_brojila = document.querySelector("#br_brojila").value;*/

  return objekat;
}

function parsiranjeProvjeraPotrosaca(nizObjekataPotrosaca) {
  let tekstHtml = "";
  nizObjekataPotrosaca.forEach((el) => (tekstHtml += "<li>" + el.naziv + "</li>"));
  Swal.fire({
    title: "Da li želite da kreirate objekte za sljedeće korisnike?",
    icon: "info",
    html: tekstHtml,
    showDenyButton: true,
    confirmButtonText: `Da`,
    denyButtonText: `Ne`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Potvrđeno!", "", "success");
    } else if (result.isDenied) {
      Swal.fire("Odbijeno", "", "error");
    }
  });
}

function izbrisiFeatureIzVektora(elBrisanje) {
  if (elBrisanje === undefined) {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.SelektovatiObjekatZaBrisanje);
    return false;
  }
  let nizZaBrisanje = vectorSource.getFeatures();
  //console.log("selektovani objekat", select.getFeatures().array_[0]);
  vectorSource.getFeatures().forEach(function (el, index, nizZaBrisanje) {
    //TODO: Uslov zamijeniti sa !!elBrisanje && el.ol_uid...
    if (elBrisanje !== undefined && elBrisanje !== null && el.ol_uid == elBrisanje.ol_uid) {
      nizZaBrisanje.splice(index, 1);
      select.getFeatures().array_.splice(0, 1);
      elBrisanje = null;
      vectorSource.clear();
      vectorSource.addFeatures(nizZaBrisanje);
    }
  });
}

//TODO: zamijeniti šifru napojne TS sa vrijednošću iz objekta koji se mijenja
function azuriranjePojedinacnogPotrosaca(jsonPretplatnikArray, objekat) {
  jsonPretplatnik = jsonPretplatnikArray[0];
  let poklapanjeTs = true;
  console.log("ŠIFRA NAPOJNE", jsonPretplatnik);
  console.log(sifraNapojneTrafostanice, objekat.properties.sifra_napojne);
  let tekstHtml = "";
  tekstHtml += "<li>" + jsonPretplatnik.sifra + " - " + jsonPretplatnik.naziv_potrosaca + "</li>";
  jsonPretplatnik.naziv_potrosaca === "Nema podatka" && (ispravno = false);
  if (document.querySelector("#sifra_napojne").value !== jsonPretplatnik.sifra_trafostanice) {
    poklapanjeTs = false;
    porukaNepoklapanjeTs +=
      "<li>" +
      jsonPretplatnik.naziv_potrosaca +
      " - " +
      jsonPretplatnik.sifra +
      " - šifra TS: " +
      jsonPretplatnik.sifra_trafostanice +
      "</li>";
  }
  tekstHtml = "<ul style='text-align:left'>" + tekstHtml + "</ul>";

  Swal.fire({
    title: "Da li želite da ažurirate objekat podacima sljedećeg potrošača?",
    //icon: "info",
    html: tekstHtml,
    showDenyButton: true,
    confirmButtonText: `Da`,
    denyButtonText: `Ne`,
  }).then((result) => {
    if (result.isConfirmed) {
      if (!poklapanjeTs) {
        Swal.fire(
          `Pretplatnikova šifra trafostanice u bilingu ne odgovara odabranoj TS (${sifraNapojneTrafostanice}):`,
          porukaNepoklapanjeTs,
          "error"
        );
        return false;
      }
      objekat.properties.name = document.querySelector("#name").value;
      objekat.properties.prik_mjesto = document.querySelector("#prik_mjesto").value;

      objekat.properties.id = jsonPretplatnik.id;
      objekat.properties.naziv = jsonPretplatnik.naziv_potrosaca;
      objekat.properties.prik_kabal = jsonPretplatnik.provodnik_spolja + " " + jsonPretplatnik.presjek_spolja;
      objekat.properties.pod = jsonPretplatnik.pod_na_mm;
      objekat.properties.status = jsonPretplatnik.status;
      objekat.properties.adresa_mm = jsonPretplatnik.adresa_mjesta_mjerenja;
      objekat.properties.pretplatni_br = jsonPretplatnik.sifra;
      objekat.properties.br_brojila = jsonPretplatnik.broj_brojila;
      objekat.properties.korisnik = globalUsername;
      dodajObjekatZaIzmjenu(objekat);
      poruka(StatusPoruke.Uspjeh, UnosPoruke.Uspjeh);
    }
  });
}
