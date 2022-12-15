/**Metode i promjenljive koje su vezane za konkretan lejer - trafostanice, kao i metode za obradu podataka trafostanica
 * kroz uvodne forme - odabir napojne trafostanice i slično*/

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
    let tempNazivTs = "";
    trafostaniceZaWS += selektovaneTrafostaniceFeatures[i].values_.originalId + ",";
    option = document.createElement("option");
    selektovaneTrafostaniceFeatures[i].values_.id_biling !== undefined &&
      (tempNazivTs = "-" + selektovaneTrafostaniceFeatures[i].values_.id_biling);
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

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaneTrafostaniceFeatures = new ol.format.GeoJSON().readFeatures(response);
      nizWizardDodatneTrafostanice.forEach((el) => {
        let blnNePostoji = true;
        selektovaneTrafostaniceFeatures.forEach((elOld) => {
          el.id_ === elOld.id_ && (blnNePostoji = false);
        });
        blnNePostoji && selektovaneTrafostaniceFeatures.push(el);
      });
      if (selektovaneTrafostaniceFeatures.length === 0) {
        poruka(StatusPoruke.Upozorenje, WizardPoruke.NemaTS);
        return false; //TODO: Ukloniti
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
 * Motoda koja bi trebala da vrati jednu trafostanicu. Poziva se samo za 0.4 naponski nivo i ne vrši dodatne provjere
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

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      selektovaneTrafostaniceFeatures = new ol.format.GeoJSON().readFeatures(response);
      nizWizardDodatneTrafostanice.forEach((el) => {
        let blnNePostoji = true;
        selektovaneTrafostaniceFeatures.forEach((elOld) => {
          el.id_ === elOld.id_ && (blnNePostoji = false);
        });
        blnNePostoji && selektovaneTrafostaniceFeatures.push(el);
      });
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/** Prikaz forme za uparivanje trafostanica */
function prikazUparivanje() {
  showDiv("#povezivanjeTSdiv");
}

/** Aktivacija opcije odabira napojne trafostanice sa mape. Opcija kad se klikne na dugme sa čiodom. */
function selektujNapojnuTS() {
  poruka(StatusPoruke.Uspjeh, WizardPoruke.OdabirNapojneTS);
  map.removeInteraction(draw);
  map.removeInteraction(modify);
  sifraNapojneTrafostanice = "";
  blnSelekcijaNapojneTS = true;
}

/**
 * Metoda koja povezuje trafostanice iz GIS-a i TBP-a. Vrši provjere da li su odabrane i jedna i druga trafostanica.
 * @returns
 */
function poveziTS() {
  if (
    !document.querySelector("#uparivanjeTxtNazivIzvodaTS").value ||
    !document.querySelector("#ddlPovezivanjeTSselektovane").value
  ) {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.OdabratiNapojnuTSIzvod);
    return false;
  }
  izvodNapojneTrafostanice = document.querySelector("#uparivanjeTxtNazivIzvodaTS").value;
  let odabranaTS = document.querySelector("#ddlPovezivanjeTSselektovane").value;
  let tsIzSistema = document.querySelector("#ddlPovezivanjeTSpronadjene").value;
  if (!odabranaTS || !tsIzSistema) {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.OdabratiTSObaSistema);
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
  //Kreiranje niza sa trafostanicama za koje je potrebno izvršiti izmjenu podataka
  for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
    if (odabranaTS === selektovaneTrafostaniceFeatures[i].values_.originalId.toString()) {
      selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
      selektovaneTrafostaniceFeatures[i].values_.id_billing = tsIzSistema;
      selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.naziv_napojne = nazivNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
    }
  }

  if (
    document.querySelector("#ddlPovezivanjeTSselektovane").length === 1 &&
    document.querySelector("#ddlPovezivanjeTSpronadjene").length === 0
  ) {
    blnZavrsenoUparivanjeTrafostanica = true;
    prikaziCetvrtuFormuWizarda();
  }
  //TODO: Dodati da se predaje i izvod trafostanice, prilikom slanja podataka ka web servisu
}

document.querySelector("#ddlPovezivanjeTSselektovane").addEventListener("change", function () {
  zumTsIzListe(this.value);
});

/**
 * Metoda koja zumira na trafostanicu prilikom selekcije iz liste za uparivanje- obrada eventa iz prethodne komande/linije.
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
    poruka(StatusPoruke.Upozorenje, WizardPoruke.OdabratiTSUparivanje);
  }
}
