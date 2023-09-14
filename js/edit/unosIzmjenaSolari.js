function dodajPoljaOdabranomGpxSolari() {
  let pretplatniBrojevi = document.querySelector("#pretplatni_br").value.replace(/ /g, "");
  if (pretplatniBrojevi == "") {
    poruka(StatusPoruke.Upozorenje, UnosPoruke.UnijetiBrojevePotrosaca);
    return false;
  }
  podaciZaSpisakSolari(pretplatniBrojevi);
}

//TODO: Ova funkcija se ne koristi
function duplirajSolari() {
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
function finalProvjeraDuplihSolari() {
  let retVal = "";
  for (let i = 1; i < solariArrayFinal.length; i++) {
    for (let j = 0; j < i; j++) {
      if (solariArrayFinal[i].pretplatni_br === solariArrayFinal[j].pretplatni_br) {
        retVal = solariArrayFinal[i].pretplatni_br;
      }
    }
  }
  return retVal;
}

function kreiranjePojedinacnihGpxSolari(nizPretplatnika) {
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
              console.log("elemenat koji ima lejer", noviEl, el.get("lejer"));
            }
            if (el?.ol_uid == selFeature.ol_uid) {
              //vectorSource.addFeature(el.clone());
              //TODO: Dodijeliti vrijednosti el feature-u iz jsonPretplatnik objekta
              noviEl.set("wizard", 0);
              noviEl.set("lejer", "solari");
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
        console.log(gpxFeatures)
      }
    }
  });
}

function prikaziPoljaOdabranogGpxSolari() {
  document.querySelector("#gps").value = selectGpxFeature.values_.gps ?? "";
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
  document.querySelector("#snaga_elektrane").value = selectGpxFeature.values_.snaga_elektrane;
  document.querySelector("#vlasnistvoSolari").value = selectGpxFeature.values_.vlasnistvo;
  document.querySelector("#legalan").value = selectGpxFeature.values_.legalan;
  document.querySelector("#pretplatni_br").value = selectGpxFeature.values_.pretplatni_br;
  document.querySelector("#br_brojila").value = selectGpxFeature.values_.br_brojila;
}

function prikaziPoljaWmsSolari(objekat) {
  document.querySelector("#gps").value = objekat.properties.gps ?? "";
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
  // document.querySelector("#naziv_nn_izvod").value = objekat.properties.naziv_nn_izvod;
  document.querySelector("#pretplatni_br").value = objekat.properties.pretplatni_br;
  document.querySelector("#br_brojila").value = objekat.properties.br_brojila;
  document.querySelector("#snaga_elektrane").value = objekat.properties.snaga_elektrane;
  document.querySelector("#vlasnistvoSolari").value = objekat.properties.vlasnistvo;
  document.querySelector("#legalan").value = objekat.properties.legalan;
}

function izmijeniAtributeWmsSolari(objekat) {
  podaciZaPretplatniBrojSolari(document.querySelector("#pretplatni_br").value, objekat);
  return objekat;
}

function parsiranjeProvjeraSolari(nizObjekataPotrosaca) {
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

//TODO: zamijeniti šifru napojne TS sa vrijednošću iz objekta koji se mijenja
/**
 * Metoda koja vrši ažuriranje pojedinačnog potrošača.
 * Vrši se provjera da li je objekat tipa potrošač i ne dozvoljava se ažuriranje
 * istim pretplatnim brojem kojim je ažuriran drugi potrošač.
 * @param {*} jsonPretplatnikArray
 * @param {*} objekat
 */
function azuriranjePojedinacnogSolari(jsonPretplatnikArray, objekat) {
  let porukaNepoklapanjeTs = "";
  jsonPretplatnik = jsonPretplatnikArray[0];
  let poklapanjeTs = true;
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
    title: "Da li želite da ažurirate objekat podacima sljedećeg solara?",
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
      objekat.properties.snaga_elektrane = document.querySelector("#snaga_elektrane").value;
      objekat.properties.vlasnistvo = document.querySelector("#vlasnistvoSolari").value;
      objekat.properties.legalan = document.querySelector("#legalan").value;

      if (provjeraPostojanjaZaAzuriranjeSolari(objekat)) {
        poruka(StatusPoruke.Greska, UnosPoruke.PostojiAzuriranPotrosac);
        return false;
      }
      solariArrayFinal.push(objekat);
      dodajObjekatZaIzmjenu(objekat);
      poruka(StatusPoruke.Uspjeh, UnosPoruke.Uspjeh);
    }
  });
}

/**
 * Metoda koja za zadati objekat, provjerava da li je potrošač. Ukoliko jeste, provjerava da li je taj potrošač već ažuriran.
 * Ukoliko jeste, uklanja prethodni zapis i dodaje novo ažuriranje.
 * Nakon toga vrši provjeru da li je već ažuriran neki drugi potrošač pretplatnim brojem kojim se pokušava trenutno ažuriranje.
 * U tom slučaju, funkcija vraća vrijednost true, što treba da onemogući trenutno ažuriranje.
 * @param {*} objekat - objekat koji se dodaje nizu za ažuriranje.
 * @returns - false ako je moguće nastaviti ažuriranje, true ako treba prekinuti proces.
 */
function provjeraPostojanjaZaAzuriranjeSolari(objekat) {
  let retVal = false;
  if (objekat.ddlLejer === Podsloj.Solari) {
    nizWmsZaIzmjenu = nizWmsZaIzmjenu.filter((item) => {
      return objekat.properties.fid_1 !== item.fid_1;
    });

    retVal = nizWmsZaIzmjenu.some(
      (item) => objekat.properties.fid_1 !== item.fid_1 && objekat.properties.pretplatni_br === item.pretplatni_br
    );
  }
  return retVal;
}

/**
 * Metoda koja se poziva prije dodavanja item-a u solariArrayFinal.
 * @param {*} objekat
 * @returns
 */
function provjeraPostojanjaZaAzuriranjeSaGeometrijomSolari(objekat) {
  let retVal = false;
  solariArrayFinal = solariArrayFinal.filter((item) => {
    return objekat.fid_1 !== item.fid_1 && objekat.fid_1 !== item.properties?.fid_1;
  });

  retVal = solariArrayFinal.some(
    (item) =>
      (objekat.fid_1 !== item.fid_1 && objekat.pretplatni_br === item.pretplatni_br) ||
      (objekat.fid_1 !== item.properties?.fid_1 && objekat.pretplatni_br === item.properties?.pretplatni_br)
  );

  return retVal;
}
