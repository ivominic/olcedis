/** Metode koje se odnose na korake toka wizarda */

let prviKorakWizarda = "Odabir naponskog nivoa";
let drugiKorakWizarda = "Odabir napojne trafostanice";
let treciKorakWizarda = "Uparivanje trafostanica";
let cetvrtiKorakWizarda = "Uparivanje vodova";
let blnOnemogucitiWizard = false; //Promjenljiva koja pokazuje da li treba blokirati wizard zbog nepoklapanja podataka
let blnPrikazPorukeOPrekidu = true; //Promjenljiva dobija vrijednost false, nakon prikaza prve poruke o prekidu
let blnCevrtiKorakBilling = false;

document.querySelector("#wizard").addEventListener("click", prikazWizardForme);
document.querySelector("#btnWizardNext").addEventListener("click", wizardNext);

/**
 * Pokreće proces za wizard - prikazuje formu, ako je ozačen reon poligonom
 */
function prikazWizardForme() {
  if (poligoni.length === 0) {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.NacrtatiPoligon);
    return false;
  }
  map.removeInteraction(draw);
  map.removeInteraction(modify);

  closeAllDivs();
  document.querySelector("#wizardHeader").innerText = prviKorakWizarda;
  document.querySelector("#divWizardOdabirNaponskogNivoa").style.display = "block";
  document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = "";
  document.querySelector("#uparivanjeTxtSifraTS").textContent = "";
  document.querySelector("#uparivanjeTxtSifraTS").textContent = "";

  closeDiv("#odabirObjektaZaDodavanjeWizardDiv");

  showDiv("#wizardDiv");
}

/**
 * Metoda koja izvršava jedan po jedan korak wizard-a
 */
function wizardNext() {
  if (document.querySelector("#wizardHeader").innerText === prviKorakWizarda) {
    //Na klik se bira naponski nivo i filtriraju se trafostanice i vodovi selektovanog reona (zahvat iscrtanog poligona)
    odabraniNaponskiNivo = document.querySelector("#ddlWizardNaponskiNivo").value;

    if (odabraniNaponskiNivo === "0.4") {
      potrosaciUpoligonu(odabraniNaponskiNivo);
      podUpoligonu(odabraniNaponskiNivo);
      prikljucnaMjestaUpoligonu(odabraniNaponskiNivo);
      nnTrafostaniceUPoligonu(odabraniNaponskiNivo);
      vodoviUpoligonu(odabraniNaponskiNivo);
      stuboviUpoligonu(odabraniNaponskiNivo);

      //TODO: Provjeriti kako će funkcionisati poziv sa async/await
      setTimeout(function () {
        //TODO: Provjeriti vezu od trafostanice. Ako ne postoji vod koji ide iz trafostanice, onda uraditi poziv funkcije ispod
        nnGeometrijaTrafostanica();
      }, 1500);
      //Ovo će trebati da se uradi u koraku wizarda nakon odabira napojne trafostanice i izvoda
      console.log("NN PRVI KORAK");
    } else {
      vodoviUpoligonu(odabraniNaponskiNivo);
      trafostaniceUpoligonu(odabraniNaponskiNivo);
      stuboviUpoligonu(odabraniNaponskiNivo);
      console.log("NN PRVI KORAK ELSE");
    }

    document.querySelector("#divWizardOdabirNaponskogNivoa").style.display = "none";

    if (sifraNapojneTrafostanice !== "" && nazivNapojneTrafostanice !== "") {
      document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = nazivNapojneTrafostanice;
      document.querySelector("#uparivanjeTxtSifraTS").textContent = sifraNapojneTrafostanice;
      console.log("NN DRUGI KORAK");
    }
  } else if (document.querySelector("#wizardHeader").innerText === drugiKorakWizarda) {
    document.querySelector("#divWizardOdabirNaponskogNivoa").style.display = "none";
    console.log("NN TRECI KORAK");
    trafostaniceIzBilingaZaUparivanje(nizSelektovanihTrafostanicaOriginalId, "", "", "");
  } else if (document.querySelector("#wizardHeader").innerText === treciKorakWizarda) {
    console.log("NN CETVRTI KORAK");
    prikaziCetvrtuFormuWizarda();
  } else if (document.querySelector("#wizardHeader").innerText === cetvrtiKorakWizarda) {
    console.log("NN PETI KORAK");
    if (selektovaniPotrosaciFeatures.length > 0 && selektovaniVodoviFeatures.length > 0) {
      console.log("NN PETI KORAK 1");
      if (blnTopDown) {
        console.log("NN PETI KORAK 2");
      } else {
        console.log("NN PETI KORAK 3");
      }
    } else {
      console.log("NN PETI KORAK 4");
      if (odabraniNaponskiNivo === 0.4 && selektovaniPotrosaciFeatures.length === 0) {
        console.log("NN PETI KORAK 5");
        blnPrikazPorukeOPrekidu && poruka(StatusPoruke.Uspjeh, WizardPoruke.NemaPotrosacaUZahvatu);
        blnPrikazPorukeOPrekidu = false;
      }
    }

    if (
      !blnOnemogucitiWizard &&
      (document.querySelector("#ddlPovezivanjeVodovaSelektovane").length > 1 ||
        document.querySelector("#ddlPovezivanjeVodovaPronadjene").length !== 0)
    ) {
      console.log("NN PETI KORAK OSTALI NEUPARENI VODOVI");
      if (odabraniNaponskiNivo !== "0.4") {
        alert(WizardPoruke.PostojeNeupareniVodovi);
        return false;
      }
    }

    if (blnOnemogucitiWizard) {
      console.log("NN SESTI KORAK");
      prekidWizarda();
      blnPrikazPorukeOPrekidu && poruka(StatusPoruke.Upozorenje, WizardPoruke.OtklonitiNedostatke);
      blnPrikazPorukeOPrekidu = false;
    } else {
      console.log("NN SESTI KORAK ELSE");
      finalniKorakWizarda();
    }
  }
}

/** Provjerava ispunjenost uslova prije prikaza četvrte forme wizard-a. */
function prikaziCetvrtuFormuWizarda() {
  blnCevrtiKorakBilling = false;
  if (
    document.querySelector("#ddlPovezivanjeTSselektovane").length > 1 ||
    document.querySelector("#ddlPovezivanjeTSpronadjene").length > 0
  ) {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.NeupareneTrafostanice);
    return false;
  }
  document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "none";
  document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
  document.querySelector("#divWizardUparivanjeVodova").style.display = "block";
  document.querySelector("#wizardHeader").innerText = cetvrtiKorakWizarda;
  if (geometrijaNapojneTrafostanice === "" && !featureNapojnaTrafostanica) {
    poruka(StatusPoruke.Upozorenje, WizardPoruke.NijeOdabranaNapojnaTS);
    return false;
  } else {
    povezivanjeVodova(featureNapojnaTrafostanica, selektovaniVodoviFeatures);

    //Dodavanje selektovanih vodova u listu za uparivanje
    if(!blnCevrtiKorakBilling){
      let option = document.createElement("option");
      option.text = "Odaberite vod";
      option.value = "";
      document.querySelector("#ddlPovezivanjeVodovaSelektovane").appendChild(option);
      let nizSelektovanihVodovaOriginalId = [];
      for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
        nizSelektovanihVodovaOriginalId.push(selektovaniVodoviFeatures[i].values_.originalId);
        if (!selektovaniVodoviFeatures[i].values_.sifra_dionice) {
          //Ne prikazujemo vodove koji imaju popunjenu šifru dionice
          option = document.createElement("option");
          option.text = selektovaniVodoviFeatures[i].values_.name + "-" + selektovaniVodoviFeatures[i].values_.originalId;
          option.value = selektovaniVodoviFeatures[i].values_.originalId;
          document.querySelector("#ddlPovezivanjeVodovaSelektovane").appendChild(option);
        }
      }
      vodoviIzBilingaZaUparivanje(nizSelektovanihVodovaOriginalId);
    }
  }
}

/**
 * Metoda koja predaje sve feature koji su izmijenjeni
 */
function konacniUpisIzmjena() {
  let format = new ol.format.WKT();
  let iterator = 0;
  vodoviArrayFinal.length = 0;
  stuboviArrayFinal.length = 0;
  trafostaniceArrayFinal.length = 0;
  podoviArrayFinal.length = 0;
  prikljucnaMjestaArrayFinal.length = 0;
  potrosaciArrayFinal.length = 0;
  nkroArrayFinal.length = 0;

  for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
    if (selektovaneTrafostaniceFeatures[i].akcija && selektovaneTrafostaniceFeatures[i].akcija === "Izmjena") {
      iterator++;
      trafostanicaArrayElement(selektovaneTrafostaniceFeatures[i], "U", 1, iterator);
    }
  }
  for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
    if (selektovaniVodoviFeatures[i].akcija && selektovaniVodoviFeatures[i].akcija === "Izmjena") {
      iterator++;
      vodArrayElement(selektovaniVodoviFeatures[i], "U", 1, iterator);
    }
  }
  for (let i = 0; i < selektovaniPotrosaciFeatures.length; i++) {
    if (selektovaniPotrosaciFeatures[i].akcija && selektovaniPotrosaciFeatures[i].akcija === "Izmjena") {
      iterator++;
      potrosacArrayElement(selektovaniPotrosaciFeatures[i], "U", 1, iterator);
    }
  }
  for (let i = 0; i < selektovaniPODoviFeatures.length; i++) {
    if (selektovaniPODoviFeatures[i].akcija && selektovaniPODoviFeatures[i].akcija === "Izmjena") {
      iterator++;
      podArrayElement(selektovaniPODoviFeatures[i], "U", 1, iterator);
    }
  }
  for (let i = 0; i < selektovaniNKROFeatures.length; i++) {
    if (selektovaniNKROFeatures[i].akcija && selektovaniNKROFeatures[i].akcija === "Izmjena") {
      iterator++;
      nkroArrayElement(selektovaniNKROFeatures[i], "U", 1, iterator);
    }
  }
  for (let i = 0; i < selektovanaPrikljucnaMjestaFeatures.length; i++) {
    if (selektovanaPrikljucnaMjestaFeatures[i].akcija && selektovanaPrikljucnaMjestaFeatures[i].akcija === "Izmjena") {
      iterator++;
      prikljucnoMjestoArrayElement(selektovanaPrikljucnaMjestaFeatures[i], "U", 1, iterator);
    }
  }
  for (let i = 0; i < selektovaniStuboviFeatures.length; i++) {
    console.log("stubovi", selektovaniStuboviFeatures[i]);
    iterator++;
    selektovaniStuboviFeatures[i].values_.sifra_napojne = sifraNapojneTrafostanice;
    selektovaniStuboviFeatures[i].values_.naziv_napojne = nazivNapojneTrafostanice;
    selektovaniStuboviFeatures[i].values_.izvod_napojne = izvodNapojneTrafostanice;
    stubArrayElement(selektovaniStuboviFeatures[i], "U", 1, iterator);
  }

  insertAllObjects(
    stuboviArrayFinal,
    vodoviArrayFinal,
    trafostaniceArrayFinal,
    podoviArrayFinal,
    prikljucnaMjestaArrayFinal,
    potrosaciArrayFinal,
    nkroArrayFinal
  );
}

/**
 * Metoda koja zatvara wizard formu i vrši prekid toka wizarda.
 */
function prekidWizarda() {
  blnOnemogucitiWizard = true;
  closeDiv("#wizardDiv");
  document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = "";
  document.querySelector("#uparivanjeTxtSifraTS").textContent = "";
  document.querySelector("#wizardHeader").innerText = prviKorakWizarda;
  restartParametaraWizard();
}

/**
 * Metoda koja kompletira wizard - poziva sve web servise za izmjenu podataka i zatvara formu
 */
function finalniKorakWizarda() {
  konacniUpisIzmjena();
  closeDiv("#wizardDiv");
  document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = "";
  document.querySelector("#uparivanjeTxtSifraTS").textContent = "";
  document.querySelector("#wizardHeader").innerText = prviKorakWizarda;
  restartParametaraWizard();
}

function insertFinalniKorakNiskonaponskiObjekti() {
  for (let i = 0; i < selektovaniPotrosaciFeatures.length; i++) {
    if (selektovaniPotrosaciFeatures[i].akcija && selektovaniPotrosaciFeatures[i].akcija === "Izmjena") {
      cudPotrosac(selektovaniPotrosaciFeatures[i], "U", 1);
    }
  }
  for (let i = 0; i < selektovanaPrikljucnaMjestaFeatures.length; i++) {
    if (selektovanaPrikljucnaMjestaFeatures[i].akcija && selektovanaPrikljucnaMjestaFeatures[i].akcija === "Izmjena") {
      cudPrikljucnoMjesto(selektovanaPrikljucnaMjestaFeatures[i], "U", 1);
    }
  }
  for (let i = 0; i < selektovaniPODoviFeatures.length; i++) {
    if (selektovaniPODoviFeatures[i].akcija && selektovaniPODoviFeatures[i].akcija === "Izmjena") {
      cudPOD(selektovaniPODoviFeatures[i], "U", 1);
    }
  }
  for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
    if (selektovaniVodoviFeatures[i].akcija && selektovaniVodoviFeatures[i].akcija === "Izmjena") {
      cudVod(selektovaniVodoviFeatures[i], "U", 1);
    }
  }
  //TODO: Dodati NKRO
}

/**
 * Metoda koja vrši reset svih vrijednosti i polja, po završetku wizard-a
 */
function restartParametaraWizard() {
  nazivNapojneTrafostanice = "";
  sifraNapojneTrafostanice = "";
  geometrijaNapojneTrafostanice = "";
  geohashNapojneTrafostanice = "";
  izvodNapojneTrafostanice = "";
  odabraniNaponskiNivo = "";

  document.querySelector("#wizardHeader").innerText = prviKorakWizarda;
  document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = "";
  document.querySelector("#uparivanjeTxtSifraTS").textContent = "";
  document.querySelector("#uparivanjeTxtSifraTS").textContent = "";
  document.querySelector("#divWizardOdabirNaponskogNivoa").style.display = "block";
  document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "none";
  document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
  document.querySelector("#divWizardUparivanjeVodova").style.display = "none";

  selektovanaPrikljucnaMjestaFeatures.length = 0;
  selektovaneTrafostaniceFeatures.length = 0;
  selektovaniNKROFeatures.length = 0;
  selektovaniPODoviFeatures.length = 0;
  selektovaniPotrosaciFeatures.length = 0;
  selektovaniStuboviFeatures.length = 0;

  $("#ddlPovezivanjeTSpronadjene").empty();
  $("#ddlPovezivanjeTSselektovane").empty();
  $("#ddlPovezivanjeVodovaPronadjene").empty();
  $("#ddlPovezivanjeVodovaSelektovane").empty();
}

if(document.querySelector("#tableButton")){
  document.querySelector("#tableButton").addEventListener("click", function (){
    showDiv("#tabelarniPrikazWizardDiv");
  });
}
function prikazZaWizardTabela(){
  featureSnapOverlay.getSource().clear(); 
  featureSnapOverlay.getSource().addFeatures(selektovaneTrafostaniceFeatures);
  featureSnapOverlay.getSource().addFeatures(selektovaniVodoviFeatures);
  featureSnapOverlay.getSource().addFeatures(selektovaniStuboviFeatures);

  let slanjeBody = document.querySelector("#slanjeBody");
  if(slanjeBody){
    slanjeBody.innerHTML = "";
    if(selektovaneTrafostaniceFeatures.length > 0 && selektovaniVodoviFeatures.length > 0 && selektovaniStuboviFeatures.length > 0){
      selektovaneTrafostaniceFeatures.forEach(function (resp){
        slanjeBody.insertAdjacentHTML('beforeend', '<tr> <td>' + resp.id_ + '</td><td><i class="fas fa-trash" onclick="removeElementPomjeranjeObjekta(\'' + resp.id_ + '\')" style="cursor: pointer;"></i> </td></tr>');
      });

      selektovaniVodoviFeatures.forEach(function (resp){
        slanjeBody.insertAdjacentHTML('beforeend', '<tr> <td>' + resp.id_ + '</td><td><i class="fas fa-trash" onclick="removeElementPomjeranjeObjekta(\'' + resp.id_ + '\')" style="cursor: pointer;"></i> </td></tr>');
      });

      selektovaniStuboviFeatures.forEach(function (resp){
        slanjeBody.insertAdjacentHTML('beforeend', '<tr> <td>' + resp.id_ + '</td><td><i class="fas fa-trash" onclick="removeElementPomjeranjeObjekta(\'' + resp.id_ + '\')" style="cursor: pointer;"></i> </td></tr>');
      });

    } else {
      slanjeBody.insertAdjacentHTML('beforeend', '<tr><td colspan="2" style="text-align: center;">Nema zapisa za slanje</td></tr>');
    }
  }
}

function removeElementPomjeranjeObjekta(elementId){
  console.log(elementId);
  if(elementId.includes("trafostanice")) {
    selektovaneTrafostaniceFeatures = selektovaneTrafostaniceFeatures.filter(function(resp) {
      return resp.id_.toString() !== elementId.toString();
    });
  } else if(elementId.includes("vodovi")){
    selektovaniVodoviFeatures = selektovaniVodoviFeatures.filter(function(resp) {
      return resp.id_.toString() !== elementId.toString();
    });
  } else if(elementId.includes("stubovi")){
    selektovaniStuboviFeatures = selektovaniStuboviFeatures.filter(function(resp) {
      return resp.id_.toString() !== elementId.toString();
    });
  }
  prikazZaWizardTabela();
}