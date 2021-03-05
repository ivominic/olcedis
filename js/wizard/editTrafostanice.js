/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
//let layernameTS = "trafostanice", fulllayernameTS = "winsoft:trafostanice", layertitleTS = "trafostanice";
let layernameTS = "trafostanice",
  fulllayernameTS = "geonode:trafostanice",
  layertitleTS = "trafostanice";
let tipGeometrijeTS = point;
let opisSlikeTS = "";

let nizSelektovanihOriginalId = [];

let wmsTrafostanice = new ol.layer.Image({
  title: layertitleTS,
  name: layernameTS,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameTS,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

map.addLayer(wmsTrafostanice);
//console.log("dodao lejer na mapu");

//document.querySelector("#selekecijaTrafostanicaPoligon").addEventListener("click", trafostaniceUpoligonu);
//document.querySelector("#uparivanjeTrafostanica").addEventListener("click", prikazUparivanje);
//document.querySelector("#selekcijaNapojneTrafostanice").addEventListener("click", selektujNapojnuTS);
document.querySelector("#btnPoveziTS").addEventListener("click", poveziTS);
document.querySelector("#btnOdabirNapojneTS").addEventListener("click", selektujNapojnuTS);
document.querySelector("#btnOdabirNapojneTS").style.display = "none";

/**
 * Metoda koja vrši provjeru da li su sve selektovane trafostanice sa istog izvoda
 */
function provjeriTrafostanice() {
  nizSelektovanihTrafostanicaOriginalId.length = 0;
  let trafostaniceZaWS = "";
  $("#ddlPovezivanjeTSselektovane").empty();
  let option = document.createElement("option");
  option.text = "Odaberite trafostanicu";
  option.value = "";
  document.querySelector("#ddlPovezivanjeTSselektovane").appendChild(option);
  for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
    //console.log("feature trafotanica i", selektovaneTrafostaniceFeatures[i]);
    let tempNazivTs = "";
    trafostaniceZaWS += selektovaneTrafostaniceFeatures[i].values_.originalId + ",";
    option = document.createElement("option");
    selektovaneTrafostaniceFeatures[i].values_.id_biling !== undefined && (tempNazivTs = "-" + selektovaneTrafostaniceFeatures[i].values_.id_biling);
    option.text = selektovaneTrafostaniceFeatures[i].values_.naziv + tempNazivTs;
    option.value = selektovaneTrafostaniceFeatures[i].values_.originalId;
    document.querySelector("#ddlPovezivanjeTSselektovane").appendChild(option);
    nizSelektovanihTrafostanicaOriginalId.push(selektovaneTrafostaniceFeatures[i].values_.originalId);
  }
  trafostaniceZaWS = trafostaniceZaWS.substring(0, trafostaniceZaWS.length - 1);
  trafostaniceZaWS = "[" + trafostaniceZaWS + "]";

  trafostaniceIzBilingaZaUparivanje(nizSelektovanihTrafostanicaOriginalId, "", "", "");
}

/**
 * Metoda koja za odabrani naponski nivo vraća sve trafostanice tog nivoa
 * @param {} napon
 */
function trafostaniceUpoligonu(napon) {
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernameTS +
    "&outputformat=application/json&cql_filter=" +
    globalCqlZaNaponskiNivo(napon, "trafostanice") +
    "&access_token=" +
    geoserverToken;
  console.log("url filter", urlZaFilter);

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaneTrafostaniceFeatures = new ol.format.GeoJSON().readFeatures(response);
      if (selektovaneTrafostaniceFeatures.length === 0) {
        poruka("Upozorenje", "Nema trafostanica u odabranom zahvatu.");
        return false;
      } else {
        if (selektovaniVodoviFeatures.length > 0) {
          provjeriTrafostanice();
        }
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/**
 * Motoda koja bi trebala da vrati jednu trafostanicu. Poziva se samo za 0.4 naponski nivo i ne vrši provjere
 * @param {*} napon
 */
function nnTrafostaniceUPoligonu(napon) {
  let urlZaFilter =
    wfsUrl +
    "?version=1.0.0&request=GetFeature&typeName=" +
    fulllayernameTS +
    "&outputformat=application/json&cql_filter=" +
    globalCqlZaNaponskiNivo(napon, "trafostanice") +
    "&access_token=" +
    geoserverToken;
  console.log("url filter", urlZaFilter);

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaneTrafostaniceFeatures = new ol.format.GeoJSON().readFeatures(response);
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

function prikazUparivanje() {
  /*if (sifraNapojneTrafostanice === "") {
    poruka("Upozorenje", "Potrebno je odabrati napojnu trafostanicu");
    return false;
  }*/
  showDiv("#povezivanjeTSdiv");
}

function selektujNapojnuTS() {
  poruka("Uspjeh", "Odaberite napojnu trafostanicu");
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  sifraNapojneTrafostanice = "";
  blnSelekcijaNapojneTS = true;
}

function poveziTS() {
  if (!document.querySelector("#uparivanjeTxtNazivIzvodaTS").value || !document.querySelector("#ddlPovezivanjeTSselektovane").value) {
    poruka("Upozorenje", "Potrebno je odabrati napojnu trafostanicu i izvod");
    return false;
  }
  izvodNapojneTrafostanice = document.querySelector("#uparivanjeTxtNazivIzvodaTS").value;
  let odabranaTS = document.querySelector("#ddlPovezivanjeTSselektovane").value;
  let tsIzSistema = document.querySelector("#ddlPovezivanjeTSpronadjene").value;
  if (!odabranaTS || !tsIzSistema) {
    alert("Potrebno je odabrati trafostanice iz oba sistema");
    return false;
  }
  for (let i = 0; i < document.querySelector("#ddlPovezivanjeTSselektovane").length; i++) {
    if (document.querySelector("#ddlPovezivanjeTSselektovane").options[i].value === odabranaTS) {
      document.querySelector("#ddlPovezivanjeTSselektovane").remove(i);
    }
  }
  for (let i = 0; i < document.querySelector("#ddlPovezivanjeTSpronadjene").length; i++) {
    if (document.querySelector("#ddlPovezivanjeTSpronadjene").options[i].value === tsIzSistema) {
      document.querySelector("#ddlPovezivanjeTSpronadjene").remove(i);
    }
  }
  paroviTS.push({ gis: odabranaTS, tbp: tsIzSistema });
  //Kreiranje niza sa trafostanicama za koje je potrebno izvršiti izmjenu podataka
  for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
    if (odabranaTS === selektovaneTrafostaniceFeatures[i].values_.originalId.toString()) {
      selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
      selektovaneTrafostaniceFeatures[i].values_.id_billing = tsIzSistema;
      selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.napojna_ts = nazivNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
    }
  }

  console.log("povezane trafostanice", paroviTS);
  if (document.querySelector("#ddlPovezivanjeTSselektovane").length === 1 && document.querySelector("#ddlPovezivanjeTSpronadjene").length === 0) {
    console.log("Uspješno uparene sve trafostanice:", paroviTS);
    blnZavrsenoUparivanjeTrafostanica = true;
    prikaziCetvrtuFormuWizarda();
  }
  //TODO: Dodati da se predaje i izvod trafostanice, prilikom slanja podataka ka web servisu
}

document.querySelector("#ddlPovezivanjeTSselektovane").addEventListener("change", function () {
  zumTsIzListe(this.value);
});

/**
 * Metoda koja zumira na trafostanicu prilikom selekcije iz liste
 * @param {} value
 */
function zumTsIzListe(value) {
  if (value) {
    for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
      if (value === selektovaneTrafostaniceFeatures[i].values_.originalId.toString()) {
        let featureZaTransofrmaciju = selektovaneTrafostaniceFeatures[i].clone();
        map.getView().fit(featureZaTransofrmaciju.getGeometry(), { maxZoom: 20 });
      }
    }
  } else {
    poruka("Upozorenje", "Potrebno je odabrati trafostanicu za uparivanje");
  }
}
