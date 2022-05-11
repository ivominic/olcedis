/**Metode koje se odnose na multiselect kontrole */
let multikontrola;
/**Metodsa koja vraća niz selektovanih vrijednosti multiselect ddl-a*/
function nizSelektovanihVrijednostiMultiselecta(idPolja) {
  let nizVrijednosti = [];
  let collection = document.querySelectorAll("#" + idPolja + " option");
  collection.forEach(function (x) {
    if (x.selected) {
      nizVrijednosti.push(x.value);
    }
  });
  return nizVrijednosti;
}

/**Metoda koja vraća odabrane vrijednosti kao string odvojen zarezima*/
function vrijednostMultiselecta(idPolja) {
  return nizSelektovanihVrijednostiMultiselecta(idPolja).join(",");
}

popuniMultiDdl("#pretraga_layer_name");

function popuniMultiDdl(idDdl) {
  //document.querySelector(idDdl).innerHTML="";
  //$(idDdl).empty();
  let urlServisa =
    window.location.protocol +
    "//" +
    window.location.hostname +
    "/portal/services/_getTransmissionLines.php?naponski_nivo=10";
  let parametri = new FormData();
  let xhr = new XMLHttpRequest();
  xhr.open("GET", urlServisa, true);
  xhr.send(parametri);
  xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log("poziv za multiselect", xhr.responseText);
        let jsonResponse = JSON.parse(xhr.responseText);
        if (jsonResponse["success"] === true && jsonResponse["data"].length > 0) {
          jsonResponse["data"].forEach(function (response) {
            let option = document.createElement("option");
            option.text = response.naziv;
            option.value = response.idOperato;
            document.querySelector(idDdl).appendChild(option);
          });
          multikontrola = new vanillaSelectBox("#pretraga_layer_name", {
            placeHolder: "Odaberite",
            search: true,
            disableSelectAll: true,
            maxWidth: 200,
            maxHeight: 300,
            translations: {
              all: "Svi zapisi",
              items: "zapisa",
            },
          });
          multikontrola.enable();
        }
      } else {
        poruka("Greska", xhr.statusText);
      }
    }
  };
}

//let vrijednost = vrijednostMultiselecta("multiKorisnik").replace(/,/g, "','");

/**Multiselect **/

$(".multiple_select").mousedown(function (e) {
  //console.log("mouse down", e)
  if (e.target.tagName == "OPTION") {
    return; //don't close dropdown if i select option
  }
  $(this).toggleClass("multiple_select_active"); //close dropdown if click inside <select> box
});
$(".multiple_select").on("blur", function (e) {
  $(this).removeClass("multiple_select_active"); //close dropdown if click outside <select>
});
window.onmousedown = function (e) {
  let el = e.target;
  if (el.tagName.toLowerCase() == "option" && el.parentNode.hasAttribute("multiple")) {
    e.preventDefault();

    // toggle selection
    if (el.hasAttribute("selected")) el.removeAttribute("selected");
    else el.setAttribute("selected", "");
  }
};
