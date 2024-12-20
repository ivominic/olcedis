/** Metode i promjenljive koje odražavaju stanje aplikacije za unos/ažuriranje u svakom trenutku */

/**
 * Metoda koja vrši prikaz/skrivanje dugmadi za unos, dupliranje i brisanje
 * @param {*} blnValue - true ili false u zavisnosti da li treba da budu prikazana dugmad ili ne
 */
function prikazDugmadiZaUnosBrisanje(blnValue) {
  let display = blnValue ? "inline" : "none";
  document.querySelector("#btnIzbrisi").style.display = display;
  document.querySelector("#btnDupliraj").style.display = display;
  document.querySelector("#btnSacuvaj").style.display = display;
}

function skrivanjeUnosDupliranjeTS(blnValue) {
  let display = blnValue ? "none" : "inline";
  document.querySelector("#btnDupliraj").style.display = display;
  document.querySelector("#btnSacuvaj").style.display = display;
}

/**
 * Dodatna podešavanja na lejer change event
 * @param {*} lejer - vrijednost padajuće liste u kojoj se prikazuju lejeri
 */
function dodatnaPodesavanjaNaPromjenuLejera(lejer) {
  prikazDugmadiZaUnosBrisanje(lejer && lejer !== Podsloj.Pod && lejer !== Podsloj.NelegalniPotrosac);
  skrivanjeUnosDupliranjeTS(lejer && [Podsloj.TS10, Podsloj.TS35, Podsloj.TS110].includes(lejer) && blnIsChange);
  if (!lejer) {
    document.querySelector("#btnIzbrisi").style.display = "inline";
    document.querySelector("#btnDupliraj").style.display = "inline";
    document.querySelector("#btnSacuvaj").style.display = "none";
  }
  if (lejer === Podsloj.PoslovniObjekat || lejer === Podsloj.Odbijeni) {
    document.querySelector("#btnIzbrisi").style.display = "none";
    document.querySelector("#btnDupliraj").style.display = "none";
    document.querySelector("#btnSacuvaj").style.display = "none";
  }
  if (lejer === Podsloj.Pod) {
    document.querySelector("#btnIzbrisi").style.display = "none";
    document.querySelector("#btnDupliraj").style.display = "inline";
    document.querySelector("#btnSacuvaj").style.display = "none";
  }
  provjeraAtributi();
}

function provjeraAtributi(){
  console.log("Provjera atributi", nizSelektovanihObjekata);
  if(akcija !== "dodaj"){
    document.querySelector("#divUnosDdlTrafostanice").className = "flex-row-desno pb-8 trafostaniceTop trafostaniceLeft trafostaniceHide";
    if(nizSelektovanihObjekata.length === 0){
      document.querySelector("#btnIzbrisi").style.display = "none";
      document.querySelector("#btnDupliraj").style.display = "none";
      document.querySelector("#btnSacuvaj").style.display = "none";
      document.querySelector("#slika").style.display = "none";
      document.querySelector("#divOdabirSloja").style.display = "none";
    } else {
      document.querySelector("#slika").style.display = "inline-block";
      document.querySelector("#divOdabirSloja").style.display = "flex";
    } 
  } else {
    document.querySelector("#divUnosDdlTrafostanice").className = "flex-row-desno pb-8 trafostaniceTop trafostaniceLeft";
    document.querySelector("#atributeMessage").style.display = "none";
  }
}

let blnIsChange = false;
