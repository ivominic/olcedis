/** Metode koje se tiču nelegalnih potrošača */

function prikaziPoljaWmsNelegalniPotrosac(objekat) {
  document.querySelector("#np_adresa").value = objekat.properties.adresa;
  document.querySelector("#np_broj_brojila").value = objekat.properties.broj_brojila;
  document.querySelector("#np_broj_plombe").value = objekat.properties.broj_plombe;
  document.querySelector("#np_broj_telefona").value = objekat.properties.broj_telefona;
  document.querySelector("#np_broj_zapisnika").value = objekat.properties.broj_zapisnika;
  document.querySelector("#np_datum_kontrole").value = objekat.properties.datum_kontrole;
  document.querySelector("#np_jmb").value = objekat.properties.jmb;
  document.querySelector("#np_kontrolu_izvrsio_1").value = objekat.properties.kontrolu_izvrsio_1;
  document.querySelector("#np_kontrolu_izvrsio_2").value = objekat.properties.kontrolu_izvrsio_2;
  document.querySelector("#np_kontrolu_izvrsio_3").value = objekat.properties.kontrolu_izvrsio_3;
  document.querySelector("#np_naziv_potrosaca").value = objekat.properties.naziv_potrosaca;
  document.querySelector("#np_naziv_ts").value = objekat.properties.naziv_ts;
  document.querySelector("#np_opstina").value = objekat.properties.opstina;
  document.querySelector("#np_potrosac_iskljucen").value = objekat.properties.potrosac_iskljucen;
  document.querySelector("#np_pretplatni_broj").value = objekat.properties.pretplatni_broj;
  document.querySelector("#np_proizvodjac").value = objekat.properties.proizvodjac;
  document.querySelector("#np_region").value = objekat.properties.region;
  document.querySelector("#np_sifra_ts").value = objekat.properties.sifra_ts;
  document.querySelector("#np_stanje_mt").value = objekat.properties.stanje_mt;
  document.querySelector("#np_stanje_vt").value = objekat.properties.stanje_vt;
  document.querySelector("#np_status_potrosaca").value = objekat.properties.status_potrosaca;
  document.querySelector("#np_tip_brojila").value = objekat.properties.tip_brojila;
}
