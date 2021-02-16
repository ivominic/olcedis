let prviKorakWizarda = "Odabir naponskog nivoa";
let drugiKorakWizarda = "Odabir napojne trafostanice";
let treciKorakWizarda = "Uparivanje trafostanica";
let cetvrtiKorakWizarda = "Uparivanje vodova";
let blnOnemogucitiWizard = false; //Promjenljiva koja pokazuje da li treba blokirati wizard zbog nepoklapanja podataka

document.querySelector("#wizard").addEventListener("click", prikazWizardForme);
document.querySelector("#btnWizardNext").addEventListener("click", wizardNext);
/**
 * Pokreće proces za wizard - prikazuje formu, ako je ozačen reon poligonom
 */
function prikazWizardForme() {
  if (poligoni.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati poligon prije pokretanja wizard-a.");
    return false;
  }
  map.removeInteraction(draw);
  map.removeInteraction(modify);

  document.querySelector("#wizardHeader").innerText = prviKorakWizarda;
  document.querySelector("#divWizardOdabirNaponskogNivoa").style.display = "block";
  document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = "";
  document.querySelector("#uparivanjeTxtSifraTS").textContent = "";
  document.querySelector("#uparivanjeTxtSifraTS").textContent = "";

  showDiv("#wizardDiv");
  //trafostaniceUpoligonu();
  //vodoviUpoligonu();
}

/**
 * Metoda koja izvršava jedan po jedan korak vizarda
 */
function wizardNext() {
  if (document.querySelector("#wizardHeader").innerText === prviKorakWizarda) {
    //Na klik se bira naponski nivo i filtriraju se trafostanice i vodovi selektovanog reona (zahvat iscrtanog poligona)
    odabraniNaponskiNivo = document.querySelector("#ddlWizardNaponskiNivo").value;
    //document.querySelector("#wizardHeader").innerHTML = drugiKorakWizarda;

    if (odabraniNaponskiNivo === "0.4") {
      potrosaciUpoligonu(odabraniNaponskiNivo);
      podUpoligonu(odabraniNaponskiNivo);
      prikljucnaMjestaUpoligonu(odabraniNaponskiNivo);
      nnTrafostaniceUPoligonu(odabraniNaponskiNivo);
      vodoviUpoligonu(odabraniNaponskiNivo);
      //povezivanjePotrosacaVodova(selektovaniPotrosaciFeatures, selektovaniVodoviFeatures);

      setTimeout(function () {
        //TODO: Provjeriti vezu od trafostanice. Ako ne postoji vod koji ide iz trafostanice, onda uraditi poziv funkcije ispod
        //Ako postoji vod, koristiti logiku iz napona 10 i 35, od trafostanice, ka dolje
        nnGeometrijaTrafostanica();
      }, 1000);
      //Ovo će trebati da se uradi u koraku wizarda nakon odabira napojne trafostanice i izvoda
    } else {
      vodoviUpoligonu(odabraniNaponskiNivo);
      trafostaniceUpoligonu(odabraniNaponskiNivo);
    }

    //stuboviUpoligonu(odabraniNaponskiNivo);

    /*if (selektovaneTrafostaniceFeatures.length === 0) {
      poruka("Upozorenje", "Nema trafostanica u odabranom zahvatu.");
      return false;
    }
    if (selektovaniVodoviFeatures.length === 0) {
      poruka("Upozorenje", "Nema vodova u odabranom zahvatu.");
      return false;
    }*/
    document.querySelector("#divWizardOdabirNaponskogNivoa").style.display = "none";
    //Provjeriti da li je moguće odabrati napojnu trafostanicu i izvod na osnovu selektovanih trafostanica
    //TODO: poziv metode za provjeru i uparivanje trafostanica
    if (sifraNapojneTrafostanice !== "" && nazivNapojneTrafostanice !== "") {
      document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = nazivNapojneTrafostanice;
      document.querySelector("#uparivanjeTxtSifraTS").textContent = sifraNapojneTrafostanice;
      //TODO: prikazati formu
    } else {
      //TODO: provjeriti da li se poklapa broj trafostanica
      //TODO: provjeriti konektivnost vodova
      //TODO: odabrati trafostanicu sa mape
    }
  } else if (document.querySelector("#wizardHeader").innerText === drugiKorakWizarda) {
    document.querySelector("#divWizardOdabirNaponskogNivoa").style.display = "none";
    //document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "block";
    trafostaniceIzBilingaZaUparivanje(nizSelektovanihTrafostanicaOriginalId, "", "", "");
  } else if (document.querySelector("#wizardHeader").innerText === treciKorakWizarda) {
    prikaziCetvrtuFormuWizarda();
  } else if (document.querySelector("#wizardHeader").innerText === cetvrtiKorakWizarda) {
    if (selektovaniPotrosaciFeatures.length > 0 && selektovaniVodoviFeatures.length > 0) {
      if (blnTopDown) {
      } else {
        povezivanjePotrosacaVodova(selektovaniPotrosaciFeatures, selektovaniVodoviFeatures);
      }
    } else {
      if (odabraniNaponskiNivo === 0.4 && selektovaniPotrosaciFeatures.length === 0) {
        poruka("Uspjeh", "U selektovanom zahvatu ne postoji nijedan potrošač.");
      }
    }
    //povezivanjePotrosacaVodova(selektovaniPotrosaciFeatures, selektovaniVodoviFeatures);

    //document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
    //document.querySelector("#divWizardUparivanjeVodova").style.display = "block";

    if (
      !blnOnemogucitiWizard &&
      (document.querySelector("#ddlPovezivanjeVodovaSelektovane").length > 1 || document.querySelector("#ddlPovezivanjeVodovaPronadjene").length !== 0)
    ) {
      //blnOnemogucitiWizard = true;
      //poruka("Upozorenje", "Nisu upareni svi vodovi");
      //return false;
    }

    if (blnOnemogucitiWizard) {
      prekidWizarda();
      alert("Potrebno je otkloniti uočene nedostatke da bi podaci mogli biti sačuvani.");
    } else {
      finalniKorakWizarda();
    }
  }
}

function prikaziCetvrtuFormuWizarda() {
  if (document.querySelector("#ddlPovezivanjeTSselektovane").length > 1 || document.querySelector("#ddlPovezivanjeTSpronadjene").length > 0) {
    poruka("Upozorenje", "Nisu uparene sve trafostanice iz oba sistema");
    return false;
  }
  document.querySelector("#divWizardOdabirNapojneTrafostanice").style.display = "none";
  document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "block";
  document.querySelector("#wizardHeader").innerText = cetvrtiKorakWizarda;
  if (geometrijaNapojneTrafostanice === "" && !featureNapojnaTrafostanica) {
    poruka("Upozorenje", "Nije odabrana napojna trafostanica");
    return false;
  } else {
    console.log("broj vodova", selektovaniVodoviFeatures.length);
    console.log("selektovani vodovi prije poziva za uparivanje", selektovaniVodoviFeatures);
    console.log("selektovana napojna trafostanica", featureNapojnaTrafostanica);
    povezivanjeVodova(featureNapojnaTrafostanica, selektovaniVodoviFeatures);

    //Dodavanje selektovanih vodova u listu za uparivanje
    let option = document.createElement("option");
    option.text = "Odaberite vod";
    option.value = "";
    document.querySelector("#ddlPovezivanjeVodovaSelektovane").appendChild(option);

    for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
      //console.log("vodovi originalId", selektovaniVodoviFeatures[i].values_.originalId);
      nizSelektovanihVodovaOriginalId.push(selektovaniVodoviFeatures[i].values_.originalId);

      //Dodavanje selektovanih vodova u listu za uparivanje
      option = document.createElement("option");
      option.text = selektovaniVodoviFeatures[i].values_.name + "-" + selektovaniVodoviFeatures[i].values_.originalId;
      option.value = selektovaniVodoviFeatures[i].values_.originalId;
      document.querySelector("#ddlPovezivanjeVodovaSelektovane").appendChild(option);
    }
    vodoviIzBilingaZaUparivanje(nizSelektovanihVodovaOriginalId);
  }
}

/**
 * Metoda koja predaje sve feature koji su izmijenjeni
 */
function konacniUpisIzmjena() {
  let format = new ol.format.WKT();
  for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
    if (selektovaneTrafostaniceFeatures[i].akcija && selektovaneTrafostaniceFeatures[i].akcija === "Izmjena") {
      cudTrafostanica(selektovaneTrafostaniceFeatures[i], "U");
      /*console.log("pozivati web servis za unos trafostanica", selektovaneTrafostaniceFeatures[i]);
      let wktGeom = format.writeGeometry(selektovaneTrafostaniceFeatures[i].getGeometry());
      console.log("pozivati web servis za unos trafostanica - geometrija u wkt", wktGeom);*/
    }
  }
  for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
    if (selektovaniVodoviFeatures[i].akcija && selektovaniVodoviFeatures[i].akcija === "Izmjena") {
      cudVod(selektovaniVodoviFeatures[i], "U");
    }
  }
  for (let i = 0; i < selektovaniPotrosaciFeatures.length; i++) {
    if (selektovaniPotrosaciFeatures[i].akcija && selektovaniPotrosaciFeatures[i].akcija === "Izmjena") {
      cudPotrosac(selektovaniPotrosaciFeatures[i], "U");
    }
  }
  for (let i = 0; i < selektovaniNKROFeatures.length; i++) {
    if (selektovaniNKROFeatures[i].akcija && selektovaniNKROFeatures[i].akcija === "Izmjena") {
      cudNKRO(selektovaniNKROFeatures[i], "U");
    }
  }
  for (let i = 0; i < selektovanaPrikljucnaMjestaFeatures.length; i++) {
    if (selektovanaPrikljucnaMjestaFeatures[i].akcija && selektovanaPrikljucnaMjestaFeatures[i].akcija === "Izmjena") {
      cudPrikljucnoMjesto(selektovanaPrikljucnaMjestaFeatures[i], "U");
    }
  }
  poruka("Uspjeh", "Uspješno kompletiran wizard");
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

function testUpisTrafostanice() {
  for (let i = 0; i < selektovaneTrafostaniceFeatures.length; i++) {
    if (selektovaneTrafostaniceFeatures[i].akcija && selektovaneTrafostaniceFeatures[i].akcija === "Izmjena") {
      cudTrafostanica(selektovaneTrafostaniceFeatures[i], "U");
    }
  }
}

function insertFinalniKorakNiskonaponskiObjekti() {
  for (let i = 0; i < selektovaniPotrosaciFeatures.length; i++) {
    if (selektovaniPotrosaciFeatures[i].akcija && selektovaniPotrosaciFeatures[i].akcija === "Izmjena") {
      cudPotrosac(selektovaniPotrosaciFeatures[i], "U");
    }
  }
  for (let i = 0; i < selektovanaPrikljucnaMjestaFeatures.length; i++) {
    if (selektovanaPrikljucnaMjestaFeatures[i].akcija && selektovanaPrikljucnaMjestaFeatures[i].akcija === "Izmjena") {
      cudPrikljucnoMjesto(selektovanaPrikljucnaMjestaFeatures[i], "U");
    }
  }
  for (let i = 0; i < selektovaniPODoviFeatures.length; i++) {
    if (selektovaniPODoviFeatures[i].akcija && selektovaniPODoviFeatures[i].akcija === "Izmjena") {
      cudPOD(selektovaniPODoviFeatures[i], "U");
    }
  }
  for (let i = 0; i < selektovaniVodoviFeatures.length; i++) {
    if (selektovaniVodoviFeatures[i].akcija && selektovaniVodoviFeatures[i].akcija === "Izmjena") {
      cudVod(selektovaniVodoviFeatures[i], "U");
    }
  }
}

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
