function dodajPoljaOdabranomGpxNKRO() {
  if (!selectGpxFeature.hasOwnProperty("lejer") || selectGpxFeature.get("lejer") === "nkro") {
    selectGpxFeature.set("wizard", 0);
    selectGpxFeature.set("lejer", "nkro");
    selectGpxFeature.set("gps", document.querySelector("#gps").value);
    selectGpxFeature.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
    selectGpxFeature.set("napon", document.querySelector("#napon").value);
    selectGpxFeature.set("ts", document.querySelector("#ts").value);
    selectGpxFeature.set("izvod_ts", document.querySelector("#izvod_ts").value);
    selectGpxFeature.set("id", document.querySelector("#id").value);
    selectGpxFeature.set("montaza", document.querySelector("#montaza").value);
    selectGpxFeature.set("vrata", document.querySelector("#vrata").value);
    selectGpxFeature.set("br_izvoda", document.querySelector("#br_izvoda").value);
    selectGpxFeature.set("br_prikljucaka", document.querySelector("#br_prikljucaka").value);
    selectGpxFeature.set("sys_id", document.querySelector("#sys_id").value);
    selectGpxFeature.set("sifra_napojne", sifraNapojneTrafostanice);
    selectGpxFeature.set("naziv_napojne", nazivNapojneTrafostanice);
    selectGpxFeature.set("izvod_napojne", izvodNapojneTrafostanice);
  } else {
    poruka("Upozorenje", "Odabrani objekat je već definisan kao drugi lejer");
  }
}

function prikaziPoljaOdabranogGpxNKRO() {
  document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  //document.querySelector("#vlasnistvo").value = selectGpxFeature.values_.vlasnistvo;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;
  document.querySelector("#ts").value = selectGpxFeature.values_.ts;
  document.querySelector("#izvod_ts").value = selectGpxFeature.values_.izvod_ts;
  document.querySelector("#id").value = selectGpxFeature.values_.id;
  document.querySelector("#montaza").value = selectGpxFeature.values_.montaza;
  document.querySelector("#vrata").value = selectGpxFeature.values_.vrata;
  document.querySelector("#br_izvoda").value = selectGpxFeature.values_.br_izvoda;
  document.querySelector("#br_prikljucaka").value = selectGpxFeature.values_.br_prikljucaka;
  document.querySelector("#sys_id").value = selectGpxFeature.values_.sys_id;

  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);
}
