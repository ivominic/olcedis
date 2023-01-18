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
}

let blnIsChange = false;
