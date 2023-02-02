function prikaziPoljaWmsOdbijeni(objekat) {
  document.querySelector("#naziv_napojne").value = objekat.properties.naziv_napojne;
  document.querySelector("#sifra_napojne").value = objekat.properties.sifra_napojne;
  document.querySelector("#izvod_napojne").value = objekat.properties.izvod_napojne;
  document.querySelector("#odbijeni_name").value = objekat.properties.name;
  document.querySelector("#odbijeni_datum_azuriranja").value = objekat.properties.datum_azuriranja;
  document.querySelector("#odbijeni_tip").value = objekat.properties.tip;
  document.querySelector("#odbijeni_korisnik").value = objekat.properties.korisnik;
  document.querySelector("#odbijeni_napon").value = objekat.properties.napon;
}
