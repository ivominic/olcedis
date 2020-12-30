//Crtanje poligona
//Prikaz forme
//Odabir naponskog nivoa
//Filtriranje trafostanica
//Filtriranje vodova

//Određivanje napojne trafostanice

//Provjera broja trafostanica

//Provjera konektivnosti vodova *

//Uparivanje trafostanica
//Uparivanje vodova

let prviKorakWizarda = "Odabir naponskog nivoa";
let drugiKorakWizarda = "Odabir napojne trafostanice";
let treciKorakWizarda = "Uparivanje trafostanica";
let cetvrtiKorakWizarda = "Uparivanje vodova";

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
    trafostaniceUpoligonu(odabraniNaponskiNivo);
    vodoviUpoligonu(odabraniNaponskiNivo);
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
    document.querySelector("#divWizardUparivanjeTrafostanica").style.display = "none";
    document.querySelector("#divWizardUparivanjeVodova").style.display = "block";
  }
}

function prikaziCetvrtuFormuWizarda() {
  if (document.querySelector("#ddlPovezivanjeTSselektovane").length > 0 || document.querySelector("#ddlPovezivanjeTSpronadjene").length > 0) {
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
    console.log("selektovani vodovi prije poziva za uparivanje", selektovaniVodoviFeatures);
    povezivanjeVodova(featureNapojnaTrafostanica, selektovaniVodoviFeatures);
  }
}

/**
 * Metoda koja zatvara wizard formu i vrši prekid toka wizarda.
 */
function prekidWizarda() {
  closeDiv("#wizardDiv");
  document.querySelector("#uparivanjeTxtNazivTrafostanice").textContent = "";
  document.querySelector("#uparivanjeTxtSifraTS").textContent = "";
  document.querySelector("#wizardHeader").innerText = prviKorakWizarda;
}
