/**Metode za specifičnost rada sa šiframa dionica. Lista se popunjava nakon odabira napojne TS,
 * ali treba priazati šifru dionice bilo kog voda i ne dozvoliti izmjenu ovog polja. Nakon nastavka unosa,
 * ponovo prikazati originalne šifre dionica. Ovo realizovano korišćenjem localStorage-a. */

localStorage.removeItem("sifraDionice");

/*localStorage.setItem("sifraDionice", data.dionice);
data.dionice.forEach((item) => {
  fillDdl("sifra_dionice", item.sifra_dionice, item.sifra_dionice);
});*/

/**Vraća originalne vrijednosti šifara dionica u ddl, za unos novog voda */
function ponovnoPunjenjeSifreDionice() {
  $("#sifra_dionice").empty();
  localStorage
    .getItem("sifraDionice")
    ?.split(",")
    .forEach((item) => {
      fillDdl("sifra_dionice", item, item);
    });
}

/**
 * Setuje jednu vrijednost u ddl, i to je vrijednost šifre dionice voda čiji se atributi prikazuju/mijenjaju
 * @param {*} value - vrijednost atributa sifra_dionice voda
 */
function setovanjeSifreDioniceIzAtributa(value) {
  console.log("Pozvano", value);
  $("#sifra_dionice").empty();
  fillDdl("sifra_dionice", value, value);
}
