/** Metode koje pozivaju Jovanove web servise */

/**
 * Metoda koja za predatu šifru i izvod napojne trafostanice vrati spisak šifara svih neuparenih trafostanica. Ovim podacima popuniti listu iz koje se bira trafostanica koja se unosi u gis, a svi podaci se već nalaze u TBP. Na ovaj način neće biti moguće unijeti trafostanice koje nemaju napojnu (110kV)
 * @param {*} sifraNapojne
 * @param {*} izvodNapojne
 */
function neupareneTrafostanice(sifraNapojne, izvodNapojne) {
  let urlServisa =
    wsServerOriginLocation +
    "/portal/api/neuparene_za_napojnu?sifra_napojne=" +
    sifraNapojne +
    "&izvod_napojne=" +
    izvodNapojne;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      if (data) {
        $("#ddlTrafostanice").empty();
        fillDdl("ddlTrafostanice", "", "Izaberite vrijednost");
        data.neuparene.forEach(function (vrijednost) {
          if (vrijednost.enabled) {
            fillDdl("ddlTrafostanice", vrijednost.sifra_biling, vrijednost.naziv_trafostanice);
          }
        });
        popuniPoljaTrafostaniceWS();
      }
    },
    error: function (x, y, z) {
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati geometriju trafostanice
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
async function geometrijaTrafostanice(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/portal/api/trafostanice_data?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  return $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
  });
}

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati geometriju trafostanice i zumira mapu na tu lokaciju
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function geometrijaTrafostaniceCentar(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/portal/api/trafostanice_data?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      if (data) {
        let wkt = data[0].the_geom;
        wkt = wkt.replace(")", "").replace("((", "(");
        let niz1 = wkt.split("(");
        let niz2 = niz1[1].split(",");
        let coord = niz2[0].split(" ");
        map.getView().setCenter(coord);
        map.getView().setZoom(20);
      }
    },
    error: function (x, y, z) {
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice popuni polja atributima trafostanice
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function popuniPoljaTrafostaniceWS() {
  let sifraTS = document.querySelector("#ddlTrafostanice").value;
  let retval = "";
  let urlServisa = wsServerOriginLocation + "/portal/api/trafostanice_data?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("detalji trafostanica, odgovor servisa", data);
      if (data) {
        popuniKontroleIzTrafostanice(data[0]);
      }
    },
    error: function (x, y, z) {
      console.log("greška popuniDdlAtributima", x.responseText);
      return retval;
    },
  });
}

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati naziv trafostanice i niz izvoda i popuni formu za odabir kod uvoza gpx fajla
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function pretragaTrafostanicaGpx(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/portal/api/trafostanice?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  $("#ddlIzvodNapojneTrafostanice").empty();
  fillDdl("ddlIzvodNapojneTrafostanice", "", "");
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      if (data && data.ts) {
        sifraNapojneTrafostanice = data.ts.sifra;
        nazivNapojneTrafostanice = data.ts.naziv;
        document.querySelector("#txtSifraNapojneTrafostanice").value = sifraNapojneTrafostanice;
        document.querySelector("#txtNazivNapojneTrafostanice").value = nazivNapojneTrafostanice;
        if (data.ts.prenosni_odnos) {
          filePowerLevel = globalNaponskiNivoPrenosOdnos(data.ts.prenosni_odnos);
          console.log("prenosni odnos: " + data.ts.prenosni_odnos, "filePowerLevel: " + filePowerLevel);
        }

        $("#ddlIzvodNapojneTrafostanice").empty();
        fillDdl("ddlIzvodNapojneTrafostanice", "", "");

        $("#izvod_id").empty();
        fillDdl("izvod_id", "", "");
        izvodFill(sifraTS);

        data.ts.izvodi.forEach(function (vrijednost) {
          fillDdl("ddlIzvodNapojneTrafostanice", vrijednost, vrijednost);
          // fillDdl("izvod_id", vrijednost, vrijednost);
        });
      } else {
        poruka(StatusPoruke.Upozorenje, GlobalPoruke.NemaPodatakaZaTS);
      }
    },
    error: function (x, y, z) {
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}

function izvodFill(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/portal/api/izvodi_napojne_ts?sifra_napojne=" + sifraTS.toUpperCase();
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("evo ih izvodi:", data);
      if (data && data.izvodi) {
        $("#izvod_id").empty();
        fillDdl("izvod_id", "", "");
        data.izvodi.forEach(function (vrijednost) {
          fillDdl("izvod_id", vrijednost.id, vrijednost.naziv);
        });
      } else {
        poruka(StatusPoruke.Upozorenje, GlobalPoruke.NemaPodatakaZaTS);
      }
    },
    error: function (x, y, z) {
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati naziv trafostanice i niz izvoda
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function pretragaTrafostanica(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/portal/api/trafostanice?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  $("#ddlPovezivanjeTSpronađene").empty();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("pretraga trafostanica, odgovor servisa", data);
      if (data && data.ts) {
        sifraNapojneTrafostanice = data.ts.sifra;
        nazivNapojneTrafostanice = data.ts.naziv;
        data.ts.izvodi.forEach(function (vrijednost) {
          izvodNapojneTrafostanice = vrijednost;
          fillDdl("uparivanjeTxtNazivIzvodaTS", vrijednost, vrijednost);
        });
        //Za vodove
        document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = data.ts.naziv;
        document.querySelector("#uparivanjeTxtSifraTS").textContent = data.ts.sifra;
        data.ts.izvodi.forEach(function (vrijednost) {
          fillDdl("uparivanjeTxtNazivIzvodaTSVod", vrijednost, vrijednost);
        });
      }
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}

//U unos podataka/izmjenu da prikaže dostupne trafostance u polje atributa
/**
 * Za predati niz trafostanica (originalId) vrati napojnu trafostanicu, izvod, spisak uparenih i neuparenih,
 * kao i poruku o grešci ukoliko nisu selektovane sve trafostanice koje pripadaju tom izvodu.
 * Niz treba prevesti u string oblika "[originalId1,originalId2,originalId3]" i tako ga predati pozivu servisa
 * Sifra, naziv i izvod odabrane napojne trafostanice su popunjeni samo ako u prvom pozivu nisu nađene ove vrijednosti u bilignu.
 * Tada se napojna trafostanica bira sa mape i ove vrijednosti šalju ponovo na provjeru - isti poziv, ali popunjena ova tri parametra
 * @param {*} nizTS
 * @param {*} sifraOdabraneNapojneTS
 * @param {*} nazivOdabranaNapojneTS
 * @param {*} izvodOdabraneNapojneTS
 */
function trafostaniceIzBilingaZaUparivanje(
  nizTS,
  sifraOdabraneNapojneTS,
  nazivOdabranaNapojneTS,
  izvodOdabraneNapojneTS
) {
  //Niz id-jeva trafostanica
  let dodatniParametriWS = "";
  console.log("Poziva trafostanice za uparivanje ws", nizTS);
  if (nizTS.length === 0) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.NijeOdabranaTS);
    return false;
  }
  sifraOdabraneNapojneTS = document.querySelector("#uparivanjeTxtSifraTS").textContent;
  nazivOdabranaNapojneTS = document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent;
  izvodOdabraneNapojneTS = document.querySelector("#uparivanjeTxtNazivIzvodaTS").value;
  if (sifraOdabraneNapojneTS !== "" && nazivOdabranaNapojneTS !== "" && izvodOdabraneNapojneTS !== "") {
    dodatniParametriWS = "&sifra_napojne=" + sifraOdabraneNapojneTS;
    dodatniParametriWS += "&naziv_napojne=" + nazivOdabranaNapojneTS;
    dodatniParametriWS += "&izvod_napojne=" + izvodOdabraneNapojneTS;
  }
  let stringNiz = "[" + nizTS.join(",") + "]";
  let urlServisa =
    wsServerOriginLocation + "/portal/api/upari_trafostanice?trafostanice=" + stringNiz + dodatniParametriWS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      $("#ddlPovezivanjeTSpronadjene").empty();
      $("#uparivanjeTxtNazivIzvodaTS").empty();
      console.log("responseTSuparivanje", data);
      nazivNapojneTrafostanice = data.naziv_napojne;
      sifraNapojneTrafostanice = data.sifra_napojne;
      geometrijaNapojneTrafostanice = data.geometrija_napojne;
      geohashNapojneTrafostanice = data.geohash_napojne;
      document.querySelector("#uparivanjeTxtSifraTS").textContent = sifraNapojneTrafostanice;
      izvodNapojneTrafostanice = data.naziv_izvoda;

      document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = data.naziv_napojne;
      fillDdl("uparivanjeTxtNazivIzvodaTS", data.naziv_izvoda, data.naziv_izvoda);

      data.uparene.forEach(function (vrijednost) {
        for (let i = 0; i < document.querySelector("#ddlPovezivanjeTSselektovane").length; i++) {
          if (document.querySelector("#ddlPovezivanjeTSselektovane").options[i].value === vrijednost.toString()) {
            document.querySelector("#ddlPovezivanjeTSselektovane").remove(i);
          }
        }
      });
      data.predlog.forEach(function (vrijednost) {
        fillDdl(
          "ddlPovezivanjeTSpronadjene",
          vrijednost.sifra_biling,
          vrijednost.sifra_biling + " - " + vrijednost.naziv_trafostanice
        );
      });
      if (izvodOdabraneNapojneTS && data.predlog.length === 0 && data.uparene.length === 0) {
        poruka(StatusPoruke.Upozorenje, WizardPoruke.NijePronadjenaTs);
      }
      if (data.naziv_izvoda) {
        document.querySelector("#wizardHeader").innerText = treciKorakWizarda;
        document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "block";
        document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "block";
        blnSelekcijaNapojneTS = false;
      } else {
        document.querySelector("#wizardHeader").inneText = drugiKorakWizarda;
        document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
        document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "block";
        blnSelekcijaNapojneTS = true;
      }
    },
    error: function (x, y, z) {
      if (x.responseJSON["error"] === "Selektovane trafostanice nisu uparene") {
        blnSelekcijaNapojneTS = true;
        document.querySelector("#wizardHeader").innerText = drugiKorakWizarda;
        document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "block";
        poruka(StatusPoruke.Greska, x.responseJSON["error"] + GlobalPoruke.GreskaOdabirTsIzvod);
      } else {
        poruka(StatusPoruke.Greska, x.responseJSON["error"]);
      }
    },
  });
}

/**
 * Metoda koja za podatke o napojnoj trafostanici vraća geometriju trafostanice. Ako postoji, provjerava se da li postoji konektivnost sa nekim vodom
 * Ako postoji, radi se top-down wizard, inače bottom-up
 * @param {*} sifraOdabraneNapojneTS
 * @param {*} nazivOdabranaNapojneTS
 * @param {*} izvodOdabraneNapojneTS
 */
function nnGeometrijaTrafostanica(sifraOdabraneNapojneTS, nazivOdabranaNapojneTS, izvodOdabraneNapojneTS) {
  //Niz id-jeva trafostanica
  let dodatniParametriWS = "";
  if (sifraOdabraneNapojneTS !== "" && nazivOdabranaNapojneTS !== "" && izvodOdabraneNapojneTS !== "") {
    dodatniParametriWS = "&sifra_napojne=" + sifraOdabraneNapojneTS;
    dodatniParametriWS += "&naziv_napojne=" + nazivOdabranaNapojneTS;
    dodatniParametriWS += "&izvod_napojne=" + izvodOdabraneNapojneTS;
  }
  let stringNiz = "[]";
  let urlServisa =
    wsServerOriginLocation + "/portal/api/upari_trafostanice?trafostanice=" + stringNiz + dodatniParametriWS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      geometrijaNapojneTrafostanice = data.geometrija_napojne;
      geohashNapojneTrafostanice = data.geohash_napojne;
      provjeriVodIzTrafostanice();
    },
    error: function (x, y, z) {
      poruka(StatusPoruke.Greska, x.responseJSON["error"]);
    },
  });
}

/**
 * Metoda koja za username logovanog korisnika vrati username vlasnika podataka.
 * Poziva se nakon čitanja logovanog korisnika (metoda signedUser).
 * @param {Username korisnika aplikacije} username
 */
function procitajVlasnika(username) {
  let urlServisa = wsServerOriginLocation + "/portal/api/vlasnik";
  urlServisa += "?t=" + Date.now();
  urlServisa += "&user=" + username;
  globalVlasnik = "";

  fetch(urlServisa)
    .then(function (response) {
      return response.text();
    })
    .then(function (json) {
      let odgovor = JSON.parse(json);
      globalVlasnik = odgovor?.owner?.owner;
      radiusBezOgranicenja = odgovor?.radius;
    })
    .catch((error) => {
      console.log("Bez vlasnika", username, error);
    });
}

/**
 * Metoda za prikaz fotografije.
 * @param {Naziv lejera} lejer
 * @param {id objekta} id
 */
function prikazFotografija(lejer, id) {
  let urlServisa =
    wsServerOriginLocation +
    "/portal/api/slike?tip_objekta=" +
    lejer +
    "&id_objekta=" +
    id +
    "&access_token=" +
    geoserverToken;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        slikeUrl[i] = data[i];
      }
      //akcija = "slika";
      document.querySelector("#modalFotografija").style.display = "block";
      prikaziSliku(0);

      document.querySelector("#zatvoriModalFotografija").onclick = function () {
        document.querySelector("#modalFotografija").style.display = "none";
      };
    },
    error: function (x, y, z) {
      poruka(StatusPoruke.Upozorenje, UnosPoruke.NePostojiFotografija);
    },
  });
}

/**
 * Metoda koja za predati nizVodova (original id-eva) vraća odgovarajuće vodove iz TBP, kako bi vodovi iz GIS i TBP mogli da se upare.
 * @param {Niz koji sadrži id-eve vodova} nizVodova
 */
function vodoviIzBilingaZaUparivanje(nizVodova) {
  let dodatniParametriWS = "";
  if (nizVodova.length === 0) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.NijeOdabranVod);
    return false;
  }

  sifraOdabraneNapojneTS = document.querySelector("#uparivanjeTxtSifraTS").textContent;
  nazivOdabranaNapojneTS = document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent;
  izvodOdabraneNapojneTS = document.querySelector("#uparivanjeTxtNazivIzvodaTS").value;
  if (sifraOdabraneNapojneTS !== "" && nazivOdabranaNapojneTS !== "" && izvodOdabraneNapojneTS !== "") {
    dodatniParametriWS = "&sifra_napojne=" + sifraOdabraneNapojneTS;
    dodatniParametriWS += "&naziv_napojne=" + nazivOdabranaNapojneTS;
    dodatniParametriWS += "&izvod_napojne=" + izvodOdabraneNapojneTS;
  } else {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.NijeOdabranaNapojnaTS);
    return false;
  }
  let stringNiz = "[" + nizVodova.join(",") + "]";
  let urlServisa = wsServerOriginLocation + "/portal/api/upari_vodove?vodovi=" + stringNiz + dodatniParametriWS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "POST",
    success: function (data) {
      $("#ddlPovezivanjeTSpronadjene").empty();

      data.predlog.forEach(function (vrijednost) {
        fillDdl(
          "ddlPovezivanjeVodovaPronadjene",
          vrijednost.sifra_dionice,
          vrijednost.sifra_dionice + " - " + vrijednost.naziv_dionice
        );
      });
    },
    error: function (x, y, z) {
      if (x.responseJSON["error"] === "Selektovane trafostanice nisu uparene") {
        document.querySelector("#btnOdabirNapojneTS").style.display = "inline-block";
      }
      poruka(StatusPoruke.Greska, x.responseJSON["error"]);
    },
  });
}

/**
 * Metoda koja za predati niz pretplatnih brojeva vrati sve podatke o korisnicima
 * @param {} nizPretplatnihBrojeva
 */
function podaciZaSpisakPotrosaca(nizPretplatnihBrojeva) {
  //Niz id-jeva vodova
  if (nizPretplatnihBrojeva.length === 0) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.NijeZadatPretplatniBroj);
    return false;
  }

  let urlServisa =
    wsServerOriginLocation + "/portal/api/get_consumer_data?pretplatni_brojevi=" + nizPretplatnihBrojeva;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "POST",
    success: function (data) {
      kreiranjePojedinacnihGpxPotrosaca(data);
    },
    error: function (x, y, z) {
      console.log("Greska", x.responseJSON["error"]);
      poruka(StatusPoruke.Greska, x.responseJSON["error"]);
    },
  });
}

/**
 * Metoda koja za predati niz pretplatnih brojeva vrati sve podatke o korisnicima
 * @param {} nizPretplatnihBrojeva
 */
function podaciZaSpisakSolari(nizPretplatnihBrojeva) {
  //Niz id-jeva vodova
  if (nizPretplatnihBrojeva.length === 0) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.NijeZadatPretplatniBroj);
    return false;
  }

  let urlServisa =
    wsServerOriginLocation + "/portal/api/get_consumer_data?pretplatni_brojevi=" + nizPretplatnihBrojeva;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "POST",
    success: function (data) {
      kreiranjePojedinacnihGpxSolari(data);
    },
    error: function (x, y, z) {
      console.log("Greska", x.responseJSON["error"]);
      poruka(StatusPoruke.Greska, x.responseJSON["error"]);
    },
  });
}

/**
 * Metoda koja za jedan pretplatni broj vrši ažuriranje pretplatnika
 * @param {} noviPretplatniBroj
 */
function podaciZaPretplatniBroj(noviPretplatniBroj, objekat) {
  if (!noviPretplatniBroj) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.NijeZadatPretplatniBroj);
    return false;
  }

  let urlServisa =
    wsServerOriginLocation + "/portal/api/get_consumer_data?pretplatni_brojevi=" + noviPretplatniBroj;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "POST",
    success: function (data) {
      azuriranjePojedinacnogPotrosaca(data, objekat);
    },
    error: function (x, y, z) {
      console.log("Greska", x.responseJSON["error"]);
      poruka(StatusPoruke.Greska, x.responseJSON["error"]);
    },
  });
}

function podaciZaPretplatniBrojSolari(noviPretplatniBroj, objekat) {
  if (!noviPretplatniBroj) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.NijeZadatPretplatniBroj);
    return false;
  }

  let urlServisa =
    wsServerOriginLocation + "/portal/api/get_consumer_data?pretplatni_brojevi=" + noviPretplatniBroj;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "POST",
    success: function (data) {
      azuriranjePojedinacnogSolari(data, objekat);
    },
    error: function (x, y, z) {
      console.log("Greska", x.responseJSON["error"]);
      poruka(StatusPoruke.Greska, x.responseJSON["error"]);
    },
  });
}

/**
 * Metoda koja setuje vrijednost geoserverToken promjenljive, koja se koristi za pozive drugih web servisa.
 */
function tokenGeoserver() {
  let urlServisa = wsServerOriginLocation + "/portal/api/geonode_login";
  $.ajax({
    url: urlServisa,
    data: "",
    type: "POST",
    success: function (data) {
      geoserverToken = data;
    },
    error: function (x, y, z) {
      console.log("greška token za Geoserver", x.responseText);
    },
  });
}
tokenGeoserver();

/**
 * Metoda koja vraća username logovanog korisnika
 */
function readSignedUser() {
  let urlServisa = wsServerOriginLocation + "/portal/api/get_remote_user";
  urlServisa += "?t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      globalUsername = data.response;
      document.querySelector("#userName").textContent = globalUsername;
      //Lejer se filtrira tek nakon čitanja usera
      if (typeof wmsOdbijeni !== "undefined") {
        let params = wmsOdbijeni.getSource().getParams();
        params.CQL_FILTER = "korisnik = '" + globalUsername + "'";
        wmsOdbijeni.getSource().updateParams(params);
      }

      if(typeof wmsValidations !== "undefined"){
        let params = wmsValidations.getSource().getParams();
        params.CQL_FILTER = "korisnik = '" + globalUsername + "'";
        wmsValidations.getSource().updateParams(params);
      }
      procitajVlasnika(globalUsername);
    },
    error: function (x, y, z) {
      console.log("greška readSignedUser", x.responseText);
      return "";
    },
  });
}
readSignedUser();

/**
 * Metoda koja vraća dozvoljeni pomjeraj za gpx ili kml, u metrima
 */
function readRadius() {
  let urlServisa = wsServerOriginLocation + "/portal/api/get_radius";
  if (isEditable) {
    urlServisa += "?tip_fajla=gpx";
  } else {
    urlServisa += "?tip_fajla=kml";
  }
  urlServisa += "&napon=" + filePowerLevel;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      let tempRadius = parseFloat(data.response.radius);
      dozvoljeniPomjeraj = tempRadius / 1000; //Distance in kilometers
      kmlRadius = tempRadius;
      return tempRadius;
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška readRadius", x.responseText);
      dozvoljeniPomjeraj = 0;
      kmlRadius = 0;
      return 0;
    },
  });
}

/**
 * Metoda koja popunjava listu slojeva u zavisnosti od odabranog naponskog nivoa.
 * @param {*} powerLevel
 */
async function availableLayersPerPowerLevel(powerLevel) {
  $("#ddl_sloj_podataka").empty();
  let urlServisa = wsServerOriginLocation + "/portal/api/slojevi?nivo=" + powerLevel;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "POST",
    success: function (data) {
      fillDdl("ddl_sloj_podataka", "", "Izaberite vrijednost");
      data.slojevi.forEach((item) => {
        fillDdl("ddl_sloj_podataka", item.slug, item.naziv);
      });
    },
    error: function (x, y, z) {
      console.log("Greska", x.responseJSON["error"]);
      poruka(StatusPoruke.Greska, x.responseJSON["error"]);
    },
  });
}

/**
 * Metoda koja za odabranu napojnu trafostanicu i izvod popunjava listu šiframa dionica vodova iz odabrnog izvoda,
 *  za potrebe uparivanja podataka iz dva sistema.
 * @param {*} nazivTs
 * @param {*} sifraTs
 * @param {*} izvodTs
 */
function sifreDionicaVodova(nazivTs, sifraTs, izvodTs) {
  $("#sifra_dionice").empty();
  let urlServisa = wsServerOriginLocation + "/portal/api/dionice?naziv_napojne_ts=" + nazivTs;
  urlServisa += "&sifra_napojne_ts=" + sifraTs + "&izvod_napojne_ts=" + izvodTs;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      fillDdl("sifra_dionice", "", "Izaberite vrijednost");
      let array = [];
      data.dionice.forEach((item) => {
        fillDdl("sifra_dionice", item.sifra_dionice, item.sifra_dionice);
        array.push(item.sifra_dionice);
      });
      localStorage.setItem("sifraDionice", array);
    },
    error: function (x, y, z) {
      console.log("Greska", x.responseJSON["error"]);
      poruka(StatusPoruke.Greska, x.responseJSON["error"]);
    },
  });
}

/**
 * Metoda za unos svih tipova objekata u bazu. Predaju se nizovi objekata, razvrstani prema slojevima/tipovima podataka.
 * @param {*} stubovi
 * @param {*} vodovi
 * @param {*} trafostanice
 * @param {*} podovi
 * @param {*} prikljucna_mjesta
 * @param {*} potrosaci
 * @param {*} nkro
 */
async function insertAllObjects(stubovi, vodovi, trafostanice, podovi, prikljucna_mjesta, potrosaci, nkro) {
  if (
    !(
      stubovi.length +
      vodovi.length +
      trafostanice.length +
      podovi.length +
      prikljucna_mjesta.length +
      potrosaci.length +
      nkro.length
    )
  ) {
    poruka(StatusPoruke.Upozorenje, GlobalPoruke.NemaIzmjena);
    return false;
  }
  openModalSpinner();
  let urlServisa = wsServerOriginLocation + "/portal/api/object_control";
  console.log("stubovi insert all objects   ", JSON.stringify(stubovi));
  $.ajax({
    url: urlServisa,
    data: {
      temp_stubovi: JSON.stringify(stubovi),
      temp_vodovi: JSON.stringify(vodovi),
      temp_trafostanice: JSON.stringify(trafostanice),
      temp_pod: JSON.stringify([]), //zamijenjen niz podovi praznim nizom
      temp_prikljucno_mjesto: JSON.stringify(prikljucna_mjesta),
      temp_potrosaci: JSON.stringify(potrosaci),
      temp_nkro: JSON.stringify(nkro),
      temp_solari: JSON.stringify([]),
      temp_prikljucna_konzola: JSON.stringify([]),
      wizard: 1,
      group_id: globalTimestamp,
    },
    timeout: 7200000,
    type: "POST",
    success: function (data) {
      closeModalSpinner();
      poruka(StatusPoruke.Uspjeh, data);
    },
    error: function (x, y, z) {
      closeModalSpinner();
      poruka(StatusPoruke.Greska, JSON.parse(x.responseText).response);
    },
  });
}

/**
 * Web servis koji se poziva na finalnu potvrdu akcije i koji šalje sve obrađene podatke sa klijentske strane ka bazi.
 * @param {*} objekti_za_azuriranje
 * @param {*} object_control
 * @param {*} brisanje_objekta
 * @param {*} pomjeranje_objekta
 */
async function serviceWrap(objekti_za_azuriranje, object_control, brisanje_objekta, pomjeranje_objekta, pocetna_tacka) {
  let urlServisa = wsServerOriginLocation + "/portal/api/service_wrap";
  console.log("WRAP   ", object_control);
  $.ajax({
    url: urlServisa,
    data: {
      objekti_za_azuriranje: objekti_za_azuriranje,
      object_control: object_control,
      brisanje_objekta: brisanje_objekta,
      pomjeranje_objekta: pomjeranje_objekta,
      pocetna_tacka: pocetna_tacka,
    },
    type: "POST",
    timeout: 7200000,
    success: function (data) {
      Swal.fire({
        icon: "success",
        title: data.response.replace(/"/g, ""),
        showConfirmButton: true,
      }).then((result) => {
        resetovanjeNakonUspjeha();
      });
      // resetovanjeNakonUspjeha();
      // poruka(StatusPoruke.Uspjeh, data.response.replace(/"/g, ""));
    },
    error: function (x, y, z) {
      resetovanjeNizovaNakonGreske();
      poruka(StatusPoruke.Greska, x.responseText.replace(/"/g, ""));
      console.log("error WRAP", x);
    },
  });
}
