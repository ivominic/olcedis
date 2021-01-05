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

document.querySelector("#selekecijaTrafostanicaPoligon").addEventListener("click", trafostaniceUpoligonu);
document.querySelector("#uparivanjeTrafostanica").addEventListener("click", prikazUparivanje);
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
  for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
    console.log("feature trafotanica i", selektovaneTrafostaniceFeatures[i]);
    trafostaniceZaWS += selektovaneTrafostaniceFeatures[i].values_.originalId + ",";
    let option = document.createElement("option");
    option.text = selektovaneTrafostaniceFeatures[i].values_.naziv + "-" + selektovaneTrafostaniceFeatures[i].values_.id_biling;
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
    wfsUrl + "?version=1.0.0&request=GetFeature&typeName=" + fulllayernameTS + "&outputformat=application/json&cql_filter=" + globalCqlZaNaponskiNivo(napon, "trafostanice");
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
  if (!document.querySelector("#uparivanjeTxtNazivIzvodaTS").value) {
    alert("Potrebno je odabrati napojnu trafostanicu i izvod");
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
      /*console.log("konkretna trafostanica prije izmjena", selektovaneTrafostaniceFeatures[i]);
      nizTrafostanicaZaWebServis.push(selektovaneTrafostaniceFeatures[i]);
      nizTrafostanicaZaWebServis[nizTrafostanicaZaWebServis.length - 1].akcija = "Izmjena";
      nizTrafostanicaZaWebServis[nizTrafostanicaZaWebServis.length - 1].values_.id_billing = tsIzSistema;
      nizTrafostanicaZaWebServis[nizTrafostanicaZaWebServis.length - 1].values_.sifra_napojne = sifraNapojneTrafostanice;
      nizTrafostanicaZaWebServis[nizTrafostanicaZaWebServis.length - 1].values_.napojna_ts = nazivNapojneTrafostanice;
      nizTrafostanicaZaWebServis[nizTrafostanicaZaWebServis.length - 1].values_.izvod_napojne = izvodNapojneTrafostanice;*/
      selektovaneTrafostaniceFeatures[i].akcija = "Izmjena";
      selektovaneTrafostaniceFeatures[i].values_.id_billing = tsIzSistema;
      selektovaneTrafostaniceFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.napojna_ts = nazivNapojneTrafostanice;
      selektovaneTrafostaniceFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
    }
  }
  //Štampanje trafostanica sa izmijenjenim podacima
  console.log("originalne trafostanice", selektovaneTrafostaniceFeatures);
  console.log("trafostanice za izmjenu originalId-a", nizTrafostanicaZaWebServis);

  console.log("povezane trafostanice", paroviTS);
  if (document.querySelector("#ddlPovezivanjeTSselektovane").length === 0 && document.querySelector("#ddlPovezivanjeTSpronadjene").length === 0) {
    alert("Uspješno uparene sve trafostanice: \n" + paroviTS.join(",") + "\n Prelazak na sljedeći korak wizard-a");
    console.log("Uspješno uparene sve trafostanice:", paroviTS);
    //TODO: Prelazak na sljedeći korak
    blnZavrsenoUparivanjeTrafostanica = true;
    //document.querySelector("#wizardHeader").inneText = cetvrtiKorakWizarda;
    //document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
    //document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "block";
    prikaziCetvrtuFormuWizarda();
  }
  //TODO: Dodati da se predaje i izvod trafostanice, prilikom slanja podataka ka web servisu
}

document.querySelector("#ddlPovezivanjeTSselektovane").addEventListener("change", function () {
  console.log("odabrana trafostanica", this.value);
  for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
    console.log("originalId", selektovaneTrafostaniceFeatures[i].values_.originalId);
    if (this.value === selektovaneTrafostaniceFeatures[i].values_.originalId.toString()) {
      console.log("feature id", selektovaneTrafostaniceFeatures[i].id_);
      //let featureZaTransofrmaciju = Object.assign({}, selektovaneTrafostaniceFeatures[i]);
      let featureZaTransofrmaciju = selektovaneTrafostaniceFeatures[i].clone();
      map.getView().fit(featureZaTransofrmaciju.getGeometry(), { maxZoom: 20 });
    }
  }
});
