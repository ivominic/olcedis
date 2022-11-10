function dodajPoljaOdabranomGpxPotrosac() {
  //TODO: prikazati confirm sa spiskom svih korisnika i nakon toga, ukoliko se potvrdi:
  //TODO: split polja pretplatni broj odvojen zarezima. Prethodno ukloniti sve spaceove
  //TODO: po splitovanom nizu prolazimo svaki zapis i kreiramo novi feature na istim koordinatama
  //TODO: brišemo tačku u kojoj je unijeta vrijednost svih pretplatnih brojeva
  let pretplatniBrojevi = document.querySelector("#pretplatni_br").value.replace(/ /g, "");
  if (pretplatniBrojevi == "") {
    poruka("Upozorenje", "Potrebno je unijeti pretplatne brojeve potrošača, odvojene zarezima.");
    return false;
  }
  if (selectGpxFeature.get("lejer") === undefined || selectGpxFeature.get("lejer") === "potrosac") {
    podaciZaSpisakPotrosaca(pretplatniBrojevi);
  } else {
    poruka(
      "Upozorenje",
      `Pokušavate da kreirate potrošače za selektovani objekat iz lejera ${selectGpxFeature.get("lejer")}.`
    );
  }
}

function dupliraj() {
  //Ovo razraditi za kreiranje pojedinačnih gpx potrošača
  vectorSource.getFeatures().forEach(function (el) {
    if (select.getFeatures().array_[0] !== undefined && el.ol_uid == select.getFeatures().array_[0].ol_uid) {
      select.getFeatures().clear(); //Da bi uklonili stil selektovane tačke
      vectorSource.addFeature(el.clone());
    }
  });
}

function kreiranjePojedinacnihGpxPotrosaca(nizPretplatnika) {
  if (select.getFeatures().array_[0] === undefined) {
    poruka("Upozorenje", "Potrebno je selektovati objekat iz gpx fajla.");
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
              noviEl.set("gps", document.querySelector("#gps").value); //šta sa ovim
              //noviEl.set("fid_1", jsonPretplatnik.fid_1);
              noviEl.set("napojna_ts", jsonPretplatnik.sifra_trafostanice); //ILI sifraNapojneTrafostanice
              noviEl.set("id", jsonPretplatnik.id);
              noviEl.set("naziv", jsonPretplatnik.naziv_potrosaca);
              noviEl.set("naziv_ts", jsonPretplatnik.naziv_trafostanice);
              noviEl.set("sifra_ts", jsonPretplatnik.sifra_trafostanice);
              noviEl.set("prik_kabal", jsonPretplatnik.provodnik_spolja + " " + jsonPretplatnik.presjek_spolja);
              noviEl.set("pod", jsonPretplatnik.pod_na_mm);
              noviEl.set("status", jsonPretplatnik.status);
              noviEl.set("adresa_mm", jsonPretplatnik.adresa_mjesta_mjerenja);
              noviEl.set("prik_mjesto", document.querySelector("#prik_mjesto").value);
              noviEl.set("naziv_nn_izvod", jsonPretplatnik.naziv_voda);
              noviEl.set("pretplatni_br", jsonPretplatnik.sifra);
              noviEl.set("br_brojila", jsonPretplatnik.broj_brojila);
              noviEl.set("sifra_napojne", sifraNapojneTrafostanice);
              noviEl.set("naziv_napojne", nazivNapojneTrafostanice);
              noviEl.set("izvod_napojne", izvodNapojneTrafostanice);
              noviEl.set("napon", document.querySelector("#napon").value);
              noviEl.set("korisnik", globalUsername);
              noviEl.set("vlasnik", "");
              if (boolAdd) {
                gpxFeatures.push(noviEl);
                vectorSource.addFeatures([noviEl]);
              }

              let ddlTemp = document.querySelector("#prik_mjesto").value;
              generisanjeGpxPodaIzGeometrije(
                nizKoordinataPrikljucnihMjesta[ddlTemp][0],
                nizKoordinataPrikljucnihMjesta[ddlTemp][1],
                jsonPretplatnik
              );
            }
          });
          poruka("Uspjeh", "Uspješno kreirani potrošači");
        });
        //izbrisiFeatureIzVektora(selFeature);
      }
    } else if (result.isDenied) {
      //Swal.fire("Odbijeno", "", "error");
    }
  });
}

function prikaziPoljaOdabranogGpxPotrosac() {
  if (selectGpxFeature.values_.gps !== undefined) {
    document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  //document.querySelector("#fid_1").value = selectGpxFeature.values_.fid_1;
  document.querySelector("#napojna_ts").value = selectGpxFeature.values_.napojna_ts;
  document.querySelector("#id").value = selectGpxFeature.values_.id;
  document.querySelector("#naziv_ts").value = selectGpxFeature.values_.naziv_ts;
  document.querySelector("#sifra_ts").value = selectGpxFeature.values_.sifra_ts;
  document.querySelector("#prik_kabal").value = selectGpxFeature.values_.prik_kabal;
  document.querySelector("#pod").value = selectGpxFeature.values_.pod;
  document.querySelector("#adresa_mm").value = selectGpxFeature.values_.adresa_mm;
  document.querySelector("#prik_mjesto").value = selectGpxFeature.values_.prik_mjesto;
  document.querySelector("#naziv_nn_izvod").value = selectGpxFeature.values_.naziv_nn_izvod;
  document.querySelector("#pretplatni_br").value = selectGpxFeature.values_.pretplatni_br;
  document.querySelector("#br_brojila").value = selectGpxFeature.values_.br_brojila;
}

function prikaziPoljaWmsPotrosac(objekat) {
  if (objekat.properties.gps !== undefined) {
    document.querySelector("#gps").value = objekat.properties.gps;
  } else {
    document.querySelector("#gps").value = "";
  }

  document.querySelector("#napojna_ts").value = objekat.properties.napojna_ts;
  document.querySelector("#id").value = objekat.properties.id;
  document.querySelector("#naziv_ts").value = objekat.properties.naziv_ts;
  document.querySelector("#sifra_ts").value = objekat.properties.sifra_ts;
  document.querySelector("#prik_kabal").value = objekat.properties.prik_kabal;
  document.querySelector("#pod").value = objekat.properties.pod;
  document.querySelector("#adresa_mm").value = objekat.properties.adresa_mm;
  document.querySelector("#prik_mjesto").value = objekat.properties.prik_mjesto;
  document.querySelector("#naziv_nn_izvod").value = objekat.properties.naziv_nn_izvod;
  document.querySelector("#pretplatni_br").value = objekat.properties.pretplatni_br;
  document.querySelector("#br_brojila").value = objekat.properties.br_brojila;
}

function izmijeniAtributeWmsPotrosac(objekat) {
  objekat.properties.napojna_ts = document.querySelector("#napojna_ts").value;
  objekat.properties.id = document.querySelector("#id").value;
  objekat.properties.naziv_ts = document.querySelector("#naziv_ts").value;
  objekat.properties.sifra_ts = document.querySelector("#sifra_ts").value;
  objekat.properties.prik_kabal = document.querySelector("#prik_kabal").value;
  objekat.properties.pod = document.querySelector("#pod").value;
  objekat.properties.adresa_mm = document.querySelector("#adresa_mm").value;
  objekat.properties.prik_mjesto = document.querySelector("#prik_mjesto").value;
  objekat.properties.naziv_nn_izvod = document.querySelector("#naziv_nn_izvod").value;
  objekat.properties.pretplatni_br = document.querySelector("#pretplatni_br").value;
  objekat.properties.br_brojila = document.querySelector("#br_brojila").value;

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
    poruka("Upozorenje", "Potrebno je selektovati objekat za uklanjanje.");
    return false;
  }
  let nizZaBrisanje = vectorSource.getFeatures();
  //console.log("selektovani objekat", select.getFeatures().array_[0]);
  vectorSource.getFeatures().forEach(function (el, index, nizZaBrisanje) {
    if (elBrisanje !== undefined && elBrisanje !== null && el.ol_uid == elBrisanje.ol_uid) {
      nizZaBrisanje.splice(index, 1);
      select.getFeatures().array_.splice(0, 1);
      elBrisanje = null;
      vectorSource.clear();
      vectorSource.addFeatures(nizZaBrisanje);
    }
  });
}
