/**
 * Metode koje pozivaju Jovanove web servise
 */

/**
 * Metoda koja za predatu šifru i izvod napojne trafostanice vrati spisak šifara svih neuparenih trafostanica. Ovim podacima popuniti listu iz koje se bira trafostanica koja se unosi u gis, a svi podaci se već nalaze u TBP. Na ovaj način neće biti moguće unijeti trafostanice koje nemaju napojnu (110kV)
 * @param {*} sifraNapojne
 * @param {*} izvodNapojne
 */
function neupareneTrafostanice(sifraNapojne, izvodNapojne) {
  let urlServisa =
    wsServerOriginLocation +
    "/novi_portal/api/neuparene_za_napojnu?sifra_napojne=" +
    sifraNapojne +
    "&izvod_napojne=" +
    izvodNapojne;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      //console.log("šifre neuparenih trafostanica", data);
      if (data) {
        data.neuparene.forEach(function (vrijednost) {
          $("#ddlTrafostanice").append(
            $("<option>", {
              value: vrijednost.sifra_biling,
              text: vrijednost.naziv_trafostanice,
            })
          );
        });
      }
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}
//neupareneTrafostanice("EKLICE", "Vazdušni Kličevo");

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati geometriju trafostanice
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function geometrijaTrafostanice(sifraTS) {
  let retval = "";
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/trafostanice_data?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("detalji trafostanica, odgovor servisa", data);
      if (data) {
        //Popuniti polja - TESTIRATI
        retval = data.the_geom;
        return retval;
      }
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
      return retval;
    },
  });
}

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati geometriju trafostanice i zumira mapu na tu lokaciju
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function geometrijaTrafostaniceCentar(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/trafostanice_data?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("detalji trafostanica, odgovor servisa", data);
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
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati geometriju trafostanice
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function popuniPoljaTrafostaniceWS() {
  let sifraTS = document.querySelector("#ddlTrafostanice").value;
  let retval = "";
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/trafostanice_data?sifra=" + sifraTS;
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
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
      return retval;
    },
  });
}

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati sva polja
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function detaljiTrafostanica(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/trafostanice_data?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("detalji trafostanica, odgovor servisa", data);
      if (data) {
        //Popuniti polja - TESTIRATI
        //document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = data.ts.naziv;
        //document.querySelector("#uparivanjeTxtSifraTS").textContent = data.ts.sifra;
        document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = data.naziv;
        document.querySelector("#uparivanjeTxtSifraTS").textContent = data.sifra;
      }
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati naziv trafostanice i niz izvoda i popuni formu za odabir kod uvoza gpx fajla
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function pretragaTrafostanicaGpx(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/trafostanice?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  $("#ddlIzvodNapojneTrafostanice").empty();
  $("#ddlIzvodNapojneTrafostanice").append(
    $("<option>", {
      value: "",
      text: "",
    })
  );
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("pretraga trafostanica, odgovor servisa", data);
      if (data && data.ts) {
        sifraNapojneTrafostanice = data.ts.sifra;
        nazivNapojneTrafostanice = data.ts.naziv;
        document.querySelector("#txtSifraNapojneTrafostanice").value = sifraNapojneTrafostanice;
        document.querySelector("#txtNazivNapojneTrafostanice").value = nazivNapojneTrafostanice;
        if (data.ts.prenosni_odnos) {
          console.log("prenosni odnos", data.ts.prenosni_odnos);
          filePowerLevel = globalNaponskiNivoPrenosOdnos(data.ts.prenosni_odnos);
          console.log("filePowerLevel", filePowerLevel);
        }

        data.ts.izvodi.forEach(function (vrijednost) {
          console.log("vrijednost niza", vrijednost);
          $("#ddlIzvodNapojneTrafostanice").append(
            $("<option>", {
              value: vrijednost,
              text: vrijednost,
            })
          );
        });
      } else {
        poruka("Upozorenje", "Za odabranu trafostanicu nema podataka u tehničkoj bazi.");
      }
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati naziv trafostanice i niz izvoda
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function pretragaTrafostanica(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/trafostanice?sifra=" + sifraTS;
  urlServisa += "&t=" + Date.now();
  $("#ddlPovezivanjeTSpronađene").empty();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("pretraga trafostanica, odgovor servisa", data);
      if (data && data.ts) {
        console.log("response", data);
        console.log("naziv", data.ts.naziv); //Naziv trafostanice
        console.log("izvodi", data.ts.izvodi); //izvodi trafostanice - niz
        console.log("sifra", data.ts.sifra); //sifra trafostanice
        sifraNapojneTrafostanice = data.ts.sifra;
        nazivNapojneTrafostanice = data.ts.naziv;
        data.ts.izvodi.forEach(function (vrijednost) {
          izvodNapojneTrafostanice = vrijednost; //Dodao u poslednjim izmjenama
          console.log("vrijednost niza", vrijednost);
          $("#uparivanjeTxtNazivIzvodaTS").append(
            $("<option>", {
              value: vrijednost,
              text: vrijednost,
            })
          );
        });
        //Za vodove
        document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = data.ts.naziv;
        document.querySelector("#uparivanjeTxtSifraTS").textContent = data.ts.sifra;
        data.ts.izvodi.forEach(function (vrijednost) {
          console.log("vrijednost niza", vrijednost);
          $("#uparivanjeTxtNazivIzvodaTSVod").append(
            $("<option>", {
              value: vrijednost,
              text: vrijednost,
            })
          );
        });
        //trafostaniceIzBilingaZaUparivanje(nizSelektovanihOriginalId);
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
    poruka("Upozorenje", "Nije odabrana nijedna trafostanica");
    return false;
  }
  //TODO: Prazniti vrijednosti ovih komponenti prilikom svakog pokretanja wizarda
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
    wsServerOriginLocation + "/novi_portal/api/upari_trafostanice?trafostanice=" + stringNiz + dodatniParametriWS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      $("#ddlPovezivanjeTSpronadjene").empty();
      $("#uparivanjeTxtNazivIzvodaTS").empty();
      console.log("responseTSuparivanje", data);
      console.log("niz neuparenih TS", data.neuparene);
      console.log("niz uparenih TS", data.uparene);
      console.log("niz predlozenih TS za uparivanje", data.predlog);
      console.log("šifra napojne TS", data.sifra_napojne);
      console.log("naziv izvoda TS", data.naziv_izvoda);
      console.log("naziv napojne TS", data.naziv_napojne);
      console.log("geometrija napojne TS", data.geometrija_napojne);
      console.log("geohash napojne TS", data.geohash_napojne);
      //TODO: Ovdje dodati čitanje naponskog nivoa napojne trafostanice - ovo ne treba, pošto se sad to bira u prvom koraku
      //naponskiNivoNapojneTrafostanice = "";
      console.log("poruka", data.poruka);
      nazivNapojneTrafostanice = data.naziv_napojne;
      sifraNapojneTrafostanice = data.sifra_napojne;
      geometrijaNapojneTrafostanice = data.geometrija_napojne;
      geohashNapojneTrafostanice = data.geohash_napojne;
      document.querySelector("#uparivanjeTxtSifraTS").textContent = sifraNapojneTrafostanice;
      //document.querySelector("#uparivanjeTxtNazivIzvodaTS").textContent = data.naziv_izvoda;
      izvodNapojneTrafostanice = data.naziv_izvoda;
      document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = data.naziv_napojne;
      $("#uparivanjeTxtNazivIzvodaTS").append(
        $("<option>", {
          value: data.naziv_izvoda,
          text: data.naziv_izvoda,
        })
      );

      data.neuparene.forEach(function (vrijednost) {
        //console.log("trafostanice za uparivanje", vrijednost);
        //TODO: Ovim podacima napuniti listu trafostanica za uparivanje ili iz spiska uparenih brisati one koje se tamo nađu
      });
      data.uparene.forEach(function (vrijednost) {
        //console.log("uparene TS - brisati iz liste", vrijednost);
        for (let i = 0; i < document.querySelector("#ddlPovezivanjeTSselektovane").length; i++) {
          if (document.querySelector("#ddlPovezivanjeTSselektovane").options[i].value === vrijednost.toString()) {
            document.querySelector("#ddlPovezivanjeTSselektovane").remove(i);
          }
        }
      });
      data.predlog.forEach(function (vrijednost) {
        //console.log("predlog TS za uparivanje", vrijednost);
        //TODO: Ovim podacima napuniti listu trafostanica za uparivanje ili iz spiska uparenih brisati one koje se tamo nađu
        $("#ddlPovezivanjeTSpronadjene").append(
          $("<option>", {
            value: vrijednost.sifra_biling,
            text: vrijednost.sifra_biling + " - " + vrijednost.naziv_trafostanice,
          })
        );
      });
      if (izvodOdabraneNapojneTS && data.predlog.length === 0 && data.uparene.length === 0) {
        poruka(
          "Upozorenje",
          "Nije pronađena nijedna trafostanica u tehničkoj bazi podataka koja zadovoljava zadate uslove."
        );
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

      /*if (!data.naziv_izvoda) {
        //Ako nije predložen naziv izvoda, omogućiti odabir napojne trafostanice sa mape
        document.querySelector("#btnOdabirNapojneTS").style.display = "inline-block";
      }*/
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      if (x.responseJSON["error"] === "Selektovane trafostanice nisu uparene") {
        //document.querySelector("#btnOdabirNapojneTS").style.display = "inline-block";
        //Potrebno je ručno odabrati trafostanicu sa mape
        blnSelekcijaNapojneTS = true;
        document.querySelector("#wizardHeader").innerText = drugiKorakWizarda;
        document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "block";
        //wizardNext();
        poruka("Greska", x.responseJSON["error"] + "\n Odaberite napojnu trafostanicu i izvod!");
      } else {
        poruka("Greska", x.responseJSON["error"]);
      }

      //TODO: onemogućiti dalji nastavak rada na mapi - pošto se radi o nepoklapanju broja trafostanica ili nekoj sličnoj grešci
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
    wsServerOriginLocation + "/novi_portal/api/upari_trafostanice?trafostanice=" + stringNiz + dodatniParametriWS;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("geometrija napojne TS", data.geometrija_napojne);
      console.log("geohash napojne TS", data.geohash_napojne);
      geometrijaNapojneTrafostanice = data.geometrija_napojne;
      geohashNapojneTrafostanice = data.geohash_napojne;
      provjeriVodIzTrafostanice();
    },
    error: function (x, y, z) {
      poruka("Greska", x.responseJSON["error"]);
    },
  });
}

function generisiGeohashId(lejer, wkt) {
  let retval = "";
  console.log("Geohash ID");
  console.log(lejer, wkt);
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/geohash_id";
  let podaciForme = new FormData();
  podaciForme.append("tip_objekta", lejer);
  podaciForme.append("geometry", wkt);
  let xhr = new XMLHttpRequest();
  xhr.open("POST", urlServisa, true);
  xhr.timeout = 10000000;
  xhr.ontimeout = function () {
    alert("Akcija je prekinuta jer je trajala predugo.");
  };
  xhr.send(podaciForme);
  //openModalSpinner();

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let jsonResponse = JSON.parse(xhr.responseText);
        console.log("response uspjeh", jsonResponse.geohash_id);
        console.log("response uspjeh geohash", jsonResponse["geohash_id"]);
        retval = jsonResponse["geohash_id"];
        //closeModalSpinner();
      } else {
        console.log(xhr.statusText);
        //closeModalSpinner();
      }
      return retval;
    }
  };
}

function procitajVlasnika(username) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/vlasnik";
  urlServisa += "?t=" + Date.now();
  let podaciForme = new FormData();
  podaciForme.append("user", username);
  let xhr = new XMLHttpRequest();
  xhr.open("GET", urlServisa, true);
  xhr.timeout = 10000000;
  xhr.ontimeout = function () {
    alert("Akcija je prekinuta jer je trajala predugo.");
  };
  xhr.send(podaciForme);
  //openModalSpinner();

  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        let jsonResponse = JSON.parse(xhr.responseText);
        console.log("response uspjeh", jsonResponse);
        //closeModalSpinner();
      } else {
        alert(xhr.statusText);
        //closeModalSpinner();
      }
    }
  };
}

function prikazFotografija(lejer, id) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/slike?tip_objekta=" + lejer + "&id_objekta=" + id;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("response", data);
      for (let i = 0; i < data.length; i++) {
        slikeUrl[i] = data[i];
        console.log(i, slikeUrl[i]);
      }
      //akcija = "slika";
      document.querySelector("#modalFotografija").style.display = "block";
      prikaziSliku(0);
      document.querySelector("#naslovFotografija").innerHTML = opisSlike;

      document.querySelector("#zatvoriModalFotografija").onclick = function () {
        document.querySelector("#modalFotografija").style.display = "none";
      };
      //setujAktivnu("#slika"); //Da ne zatvara stranicu sa atributima
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}

/**
 * Metoda koja za predati nizVodova (original id-eva)
 * @param {} nizVodova
 */
function vodoviIzBilingaZaUparivanje(nizVodova) {
  //Niz id-jeva vodova
  let dodatniParametriWS = "";
  console.log("Poziva vodove za uparivanje ws", nizVodova);
  if (nizVodova.length === 0) {
    poruka("Upozorenje", "Nije odabran nijedan vod");
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
    poruka("Upozorenje", "Nije odabrana napojna trafostanica");
    return false;
  }
  let stringNiz = "[" + nizVodova.join(",") + "]";
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/upari_vodove?vodovi=" + stringNiz + dodatniParametriWS;
  urlServisa += "&t=" + Date.now();
  //$("#ddlPovezivanjeTSpronadjene").empty();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "POST",
    success: function (data) {
      $("#ddlPovezivanjeTSpronadjene").empty();
      console.log("responseVodovi", data);
      console.log("niz neuparenih vodova", data.neupareni);
      console.log("niz predlozenih vodova za uparivanje", data.predlog);
      console.log("poruka", data.poruka);

      data.neupareni.forEach(function (vrijednost) {
        console.log("vodovi za uparivanje", vrijednost);
        //TODO: Ovim podacima napuniti listu trafostanica za uparivanje ili iz spiska uparenih brisati one koje se tamo nađu
      });
      /*data.uparene.forEach(function (vrijednost) {
        console.log("uparene TS - brisati iz liste", vrijednost);
        for (let i = 0; i < document.querySelector("#ddlPovezivanjeTSselektovane").length; i++) {
          if (document.querySelector("#ddlPovezivanjeTSselektovane").options[i].value === vrijednost.toString()) {
            document.querySelector("#ddlPovezivanjeTSselektovane").remove(i);
          }
        }
      });*/
      data.predlog.forEach(function (vrijednost) {
        console.log("predlog vodova za uparivanje", vrijednost);
        //TODO: Ovim podacima napuniti listu trafostanica za uparivanje ili iz spiska uparenih brisati one koje se tamo nađu
        $("#ddlPovezivanjeVodovaPronadjene").append(
          $("<option>", {
            value: vrijednost.sifra_dionice,
            text: vrijednost.sifra_dionice + " - " + vrijednost.naziv_dionice,
          })
        );
      });

      /*if (!data.naziv_izvoda) {
        //Ako nije predložen naziv izvoda, omogućiti odabir napojne trafostanice sa mape
        document.querySelector("#btnOdabirNapojneTS").style.display = "inline-block";
      }*/
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      if (x.responseJSON["error"] === "Selektovane trafostanice nisu uparene") {
        document.querySelector("#btnOdabirNapojneTS").style.display = "inline-block";
      }
      poruka("Greska", x.responseJSON["error"]);
      //TODO: onemogućiti dalji nastavak rada na mapi - pošto se radi o nepoklapanju broja trafostanica ili nekoj sličnoj grešci
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
    poruka("Upozorenje", "Nije zadat nijedan pretplatni broj.");
    return false;
  }

  let urlServisa =
    wsServerOriginLocation + "/novi_portal/api/get_consumer_data?pretplatni_brojevi=" + nizPretplatnihBrojeva;
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
      poruka("Greska", x.responseJSON["error"]);
    },
  });
}

function tokenGeoserver() {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/geonode_login";
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
 * Metoda koja za predati username (logovanog korisnika) vrati true ili false u zavisnosti da li ima pravo pristupa
 * @param {} username
 */
function pravaPristupaStranici(username) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/pravo_pristupa_unos?username=" + username;
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      return data.pristup;
    },
    error: function (x, y, z) {
      console.log("greška provjeraPristupaStranici", x.responseText);
      return false;
    },
  });
}

function kmlConnectionLog(objects) {
  let retval = true;
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/objekti_za_azuriranje";
  $.ajax({
    url: urlServisa,
    data: { objekti: JSON.stringify(objects) },
    type: "POST",
    success: function (data) {
      console.log("success", data);
    },
    error: function (x, y, z) {
      console.log("error kml connection log", x.responseText);
    },
  });
}

/**
 * Method for inserting all drawn objects into database
 * @param {*} stubovi
 * @param {*} vodovi
 * @param {*} trafostanice
 * @param {*} podovi
 * @param {*} prikljucna_mjesta
 * @param {*} potrosaci
 * @param {*} nkro
 */
function insertAllObjects(stubovi, vodovi, trafostanice, podovi, prikljucna_mjesta, potrosaci, nkro) {
  let retval = true;
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/object_control";
  console.log("stubovi insert all objects   ", JSON.stringify(stubovi));
  console.log("vodovi insert all objects   ", JSON.stringify(vodovi));
  console.log("trafostanice insert all objects   ", JSON.stringify(trafostanice));
  console.log("podovi insert all objects   ", JSON.stringify(podovi));
  console.log("prikljucna_mjesta insert all objects   ", JSON.stringify(prikljucna_mjesta));
  console.log("potrosaci insert all objects   ", JSON.stringify(potrosaci));
  console.log("nkro insert all objects   ", JSON.stringify(nkro));
  $.ajax({
    url: urlServisa,
    data: {
      temp_stubovi: JSON.stringify(stubovi),
      temp_vodovi: JSON.stringify(vodovi),
      temp_trafostanice: JSON.stringify(trafostanice),
      temp_pod: JSON.stringify(podovi),
      temp_prikljucno_mjesto: JSON.stringify(prikljucna_mjesta),
      temp_potrosac: JSON.stringify(potrosaci),
      temp_nkro: JSON.stringify(nkro),
    },
    type: "POST",
    success: function (data) {
      console.log("success insert all objects", data);
      //Web services for insertion of data
      objectsFinalInsert(stubovi, "stubovi_store");
      objectsFinalInsert(vodovi, "vodovi_store");
      objectsFinalInsert(trafostanice, "trafostanice_store");
      objectsFinalInsert(podovi, "pod_store");
      objectsFinalInsert(prikljucna_mjesta, "prikljucno_mjesto_store");
      objectsFinalInsert(potrosaci, "potrosaci_store");
      objectsFinalInsert(nkro, "nkro_store");
    },
    error: function (x, y, z) {
      console.log("error insert all objects", x.responseText);
    },
  });
}

/**
 * Method that returns username of logged user
 */
function readSignedUser() {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/get_remote_user";
  urlServisa += "?t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      //console.log("username web servis", data.response);
      return data.response;
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška readSignedUser", x.responseText);
      return "";
    },
  });
}

/**
 * Method that returns allowed radius in meters to move gpx points, or distance from kml point.
 */
function readRadius() {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/get_radius?tip_fajla=gpx&napon=0.4";
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
      console.log("greška readSignedUser", x.responseText);
      return 0;
    },
  });
}
