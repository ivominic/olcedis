//Vrati trafostanicu i izvode

function pretragaTrafostanica(sifraTS) {
  let urlServisa = window.location.protocol + "//" + window.location.hostname + "/novi_portal/api/trafostanice?objekat=" + sifraTS;
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("response", data)
      /*data.data.vrijednosti.forEach(function (response) {
        $(ddl).append($("<option>", {
          value: response,
          text: response
        }));
      });*/
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
    }
  });
}

//Poslati kao string sa uglastim zagradama
//U unos podataka/izmjenu da prikaže dostupne trafostance u polje atributa
function uparivanjeTrafostanica(nizTS) {//Niz id-jeva trafostanica
  let urlServisa = window.location.protocol + "//" + window.location.hostname + "/novi_portal/api/upari_trafostanice?trafostanice=" + nizTS;
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("response", data)
      /*data.data.vrijednosti.forEach(function (response) {
        $(ddl).append($("<option>", {
          value: response,
          text: response
        }));
      });*/
    },
    error: function (x, y, z) {
      //alert(x.responseText +"  " +x.status);
      console.log("greška popuniDdlAtributima", x.responseText);
    }
  });
}

function generisiGeohashId(lejer, wkt) { 
  let urlServisa = window.location.protocol + "//" + window.location.hostname + "/novi_portal/api/geohash_id";
  let podaciForme = new FormData();
  podaciForme.append("tip_objekta", lejer);
  podaciForme.append("geometry", wkt);
  let xhr = new XMLHttpRequest();
  xhr.open('POST', urlServisa, true);
  xhr.timeout = 10000000;
  xhr.ontimeout = function () { alert("Akcija je prekinuta jer je trajala predugo."); };
  xhr.send(podaciForme);
  //openModalSpinner();

  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if(this.status === 200){
        let jsonResponse = JSON.parse(xhr.responseText);      
        console.log("response uspjeh", jsonResponse);                         
        //closeModalSpinner();
      }else{
        alert(xhr.statusText);
        //closeModalSpinner();
      }
    }
  };
}

function procitajVlasnika(username) { 
  let urlServisa = window.location.protocol + "//" + window.location.hostname + "/novi_portal/api/vlasnik";
  let podaciForme = new FormData();
  podaciForme.append("user", username);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', urlServisa, true);
  xhr.timeout = 10000000;
  xhr.ontimeout = function () { alert("Akcija je prekinuta jer je trajala predugo."); };
  xhr.send(podaciForme);
  //openModalSpinner();

  xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
      if(this.status === 200){
        let jsonResponse = JSON.parse(xhr.responseText);      
        console.log("response uspjeh", jsonResponse);                         
        //closeModalSpinner();
      }else{
        alert(xhr.statusText);
        //closeModalSpinner();
      }
    }
  };
}

function prikazFotografija(lejer, id) { 
  let urlServisa = window.location.protocol + "//" + window.location.hostname + "/novi_portal/api/slike?tip_objekta=" + lejer + "&id_objekta=" + id;
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      console.log("response", data)      
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
    }
  });
}