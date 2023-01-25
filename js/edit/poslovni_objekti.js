function prikaziPoljaWmsPoslovniObjekat(objekat) {
  document.querySelector("#po_adresa").value = objekat.properties.adresa;
  document.querySelector("#po_broj_katastarske_parcele").value = objekat.properties.broj_katastarske_parcele;
  document.querySelector("#po_god_izg").value = objekat.properties.god_izg;
  document.querySelector("#po_ime_katastarske_opstine").value = objekat.properties.ime_katastarske_opstine;
  document.querySelector("#po_katastar").value = objekat.properties.katastar;
  document.querySelector("#po_nadleznost").value = objekat.properties.nadleznost;
  document.querySelector("#po_name").value = objekat.properties.name;
  document.querySelector("#po_napomena").value = objekat.properties.napomena;
  document.querySelector("#po_obim_prava").value = objekat.properties.obim_prava;
  document.querySelector("#po_objekat").value = objekat.properties.objekat;
  document.querySelector("#po_opstina").value = objekat.properties.opstina;
  document.querySelector("#po_povrsina").value = objekat.properties.povrsina;
  document.querySelector("#po_region").value = objekat.properties.region;
  document.querySelector("#po_vlasnistvo").value = objekat.properties.vlasnistvo;
}
