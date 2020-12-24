/**
 * Metode koje pozivaju Jovanove web servise
 */

//const wsServerOriginLocation = window.location.protocol + "//" + window.location.hostname;
const wsServerOriginLocation = "https://razvojgis.cedis.me";

let paroviTS = [];

//vodoviIzBilingaZaUparivanje([17991, 17992, 17993, 18003, 18004, 17996]);

//pretragaTrafostanica("150838"); //id_billing
/*trafostaniceIzBilingaZaUparivanje([
  17991,
  17992,
  17993,
  18003,
  18004,
  17996,
  17995,
  17994,
  17990,
  18005,
  18006,
  18002,
  18010,
  18009,
  18001,
  17999,
  18000,
  18007,
  17989,
  18008,
  17998,
]);

showDiv("#povezivanjeTSdiv");*/

/**
 * Metoda koja za predatu šifru iz bilinga trafostanice vrati naziv trafostanice i niz izvoda
 * @param {id_billing vrijednost iz GIS-a} sifraTS
 */
function pretragaTrafostanica(sifraTS) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/trafostanice?sifra=" + sifraTS;
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
        document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = data.ts.naziv;
        document.querySelector("#uparivanjeTxtSifraTS").textContent = data.ts.sifra;
        data.ts.izvodi.forEach(function (vrijednost) {
          console.log("vrijednost niza", vrijednost);
          $("#uparivanjeTxtNazivIzvodaTS").append(
            $("<option>", {
              value: vrijednost,
              text: vrijednost,
            })
          );
        });
        //Za vodove
        document.querySelector("#uparivanjeTxtNazivTrafostaniceVod").textContent = data.ts.naziv;
        document.querySelector("#uparivanjeTxtSifraTSVod").textContent = data.ts.sifra;
        data.ts.izvodi.forEach(function (vrijednost) {
          console.log("vrijednost niza", vrijednost);
          $("#uparivanjeTxtNazivIzvodaTSVod").append(
            $("<option>", {
              value: vrijednost,
              text: vrijednost,
            })
          );
        });
        trafostaniceIzBilingaZaUparivanje(nizSelektovanihOriginalId);
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
 *  kao i poruku o grešci ukoliko nisu selektovane sve trafostanice koje pripadaju tom izvodu
 * Niz treba prevesti u strinh oblika "[originalId1,originalId2,originalId3]" i tako ga predati pozivu servisa
 * @param {*} nizTS
 */
function trafostaniceIzBilingaZaUparivanje(nizTS) {
  //Niz id-jeva trafostanica
  let dodatniParametriWS = "";
  console.log("Poziva trafostanice za uparivanje ws", nizTS);
  if (nizTS.length === 0) {
    poruka("Upozorenje", "Nije odabrana nijedna trafostanica");
    return false;
  }
  if (document.querySelector("#btnOdabirNapojneTS").value) {
    dodatniParametriWS = "&sifra_napojne" + document.querySelector("#uparivanjeTxtSifraTS").textContent;
    dodatniParametriWS = "&naziv_napojne" + document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent;
    dodatniParametriWS = "&izvod_napojne" + document.querySelector("#btnOdabirNapojneTS").value;
  }
  let stringNiz = "[" + nizTS.join(",") + "]";
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/upari_trafostanice?trafostanice=" + stringNiz + dodatniParametriWS;
  $("#ddlPovezivanjeTSpronadjene").empty();
  $.ajax({
    url: urlServisa,
    headers: { Authorization: "ApiKey fkjasgjgSJAGFAPSSAPG123" },
    data: "",
    type: "GET",
    success: function (data) {
      console.log("responseTSuparivanje", data);
      console.log("niz neuparenih TS", data.neuparene);
      console.log("niz uparenih TS", data.uparene);
      console.log("niz predlozenih TS za uparivanje", data.predlog);
      console.log("šifra napojne TS", data.sifra_napojne);
      console.log("naziv izvoda TS", data.naziv_izvoda);
      console.log("naziv napojne TS", data.naziv_napojne);
      //TODO: Ovdje dodati čitanje naponskog nivoa napojne trafostanice
      //naponskiNivoNapojneTrafostanice = "";
      console.log("poruka", data.poruka);
      document.querySelector("#uparivanjeTxtSifraTS").textContent = data.sifra_napojne;
      //document.querySelector("#uparivanjeTxtNazivIzvodaTS").textContent = data.naziv_izvoda;
      document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = data.naziv_napojne;
      $("#uparivanjeTxtNazivIzvodaTS").append(
        $("<option>", {
          value: data.naziv_izvoda,
          text: data.naziv_izvoda,
        })
      );

      data.neuparene.forEach(function (vrijednost) {
        console.log("trafostanice za uparivanje", vrijednost);
        //TODO: Ovim podacima napuniti listu trafostanica za uparivanje ili iz spiska uparenih brisati one koje se tamo nađu
      });
      data.uparene.forEach(function (vrijednost) {
        console.log("uparene TS - brisati iz liste", vrijednost);
        for (let i = 0; i < document.querySelector("#ddlPovezivanjeTSselektovane").length; i++) {
          if (document.querySelector("#ddlPovezivanjeTSselektovane").options[i].value === vrijednost.toString()) {
            document.querySelector("#ddlPovezivanjeTSselektovane").remove(i);
          }
        }
      });
      data.predlog.forEach(function (vrijednost) {
        console.log("predlog TS za uparivanje", vrijednost);
        //TODO: Ovim podacima napuniti listu trafostanica za uparivanje ili iz spiska uparenih brisati one koje se tamo nađu
        $("#ddlPovezivanjeTSpronadjene").append(
          $("<option>", {
            value: vrijednost.sifra_biling,
            text: vrijednost.sifra_biling + " - " + vrijednost.naziv_trafostanice,
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

function generisiGeohashId(lejer, wkt) {
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
        console.log("response uspjeh", jsonResponse);
        //closeModalSpinner();
      } else {
        alert(xhr.statusText);
        //closeModalSpinner();
      }
    }
  };
}

function procitajVlasnika(username) {
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/vlasnik";
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

function vodoviIzBilingaZaUparivanje(nizVodova) {
  //Niz id-jeva trafostanica
  let dodatniParametriWS = "";
  console.log("Poziva trafostanice za uparivanje ws", nizVodova);
  if (nizVodova.length === 0) {
    poruka("Upozorenje", "Nije odabrana nijedan vod");
    return false;
  }
  if (document.querySelector("#btnOdabirNapojneTS").value) {
    dodatniParametriWS = "&sifra_napojne" + document.querySelector("#uparivanjeTxtSifraTS").textContent;
    dodatniParametriWS = "&naziv_napojne" + document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent;
    dodatniParametriWS = "&izvod_napojne" + document.querySelector("#btnOdabirNapojneTS").value;
  } else {
    poruka("Upozorenje", "Nije odabrana napojna trafostanica");
    return false;
  }
  let stringNiz = "[" + nizVodova.join(",") + "]";
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/upari_vodove?vodovi=" + stringNiz + dodatniParametriWS;
  $("#ddlPovezivanjeTSpronadjene").empty();
  $.ajax({
    url: urlServisa,
    headers: { Authorization: "ApiKey fkjasgjgSJAGFAPSSAPG123" },
    data: "",
    type: "POST",
    success: function (data) {
      console.log("responseTSuparivanje", data);
      console.log("niz neuparenih TS", data.neuparene);
      console.log("niz uparenih TS", data.uparene);
      console.log("niz predlozenih TS za uparivanje", data.predlog);
      console.log("šifra napojne TS", data.sifra_napojne);
      console.log("naziv izvoda TS", data.naziv_izvoda);
      console.log("naziv napojne TS", data.naziv_napojne);
      console.log("poruka", data.poruka);
      document.querySelector("#uparivanjeTxtSifraTS").textContent = data.sifra_napojne;
      //document.querySelector("#uparivanjeTxtNazivIzvodaTS").textContent = data.naziv_izvoda;
      document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = data.naziv_napojne;
      $("#uparivanjeTxtNazivIzvodaTS").append(
        $("<option>", {
          value: data.naziv_izvoda,
          text: data.naziv_izvoda,
        })
      );

      data.neuparene.forEach(function (vrijednost) {
        console.log("trafostanice za uparivanje", vrijednost);
        //TODO: Ovim podacima napuniti listu trafostanica za uparivanje ili iz spiska uparenih brisati one koje se tamo nađu
      });
      data.uparene.forEach(function (vrijednost) {
        console.log("uparene TS - brisati iz liste", vrijednost);
        for (let i = 0; i < document.querySelector("#ddlPovezivanjeTSselektovane").length; i++) {
          if (document.querySelector("#ddlPovezivanjeTSselektovane").options[i].value === vrijednost.toString()) {
            document.querySelector("#ddlPovezivanjeTSselektovane").remove(i);
          }
        }
      });
      data.predlog.forEach(function (vrijednost) {
        console.log("predlog TS za uparivanje", vrijednost);
        //TODO: Ovim podacima napuniti listu trafostanica za uparivanje ili iz spiska uparenih brisati one koje se tamo nađu
        $("#ddlPovezivanjeTSpronadjene").append(
          $("<option>", {
            value: vrijednost.sifra_biling,
            text: vrijednost.sifra_biling + " - " + vrijednost.naziv_trafostanice,
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
