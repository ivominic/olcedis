function dodajPoljaOdabranomGpxPod() {
  if (selectGpxFeature.get("lejer") === undefined || selectGpxFeature.get("lejer") === "pod") {
    /*selectGpxFeature.set("wizard", 0);
    selectGpxFeature.set("lejer", "prikljucno_mjesto");
    selectGpxFeature.set("gps", document.querySelector("#gps").value);
    selectGpxFeature.set("fid_1", document.querySelector("#fid_1").value);
    selectGpxFeature.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
    selectGpxFeature.set("napon", document.querySelector("#napon").value);
    selectGpxFeature.set("izvod_ts", document.querySelector("#izvod_ts").value); //ILI izvodNapojneTrafostanice
    selectGpxFeature.set("napojna_ts", document.querySelector("#napojna_ts").value); //ILI sifraNapojneTrafostanice
    selectGpxFeature.set("id", document.querySelector("#id").value);
    selectGpxFeature.set("osiguraci", document.querySelector("#osiguraci").value);
    selectGpxFeature.set("tip_pm", document.querySelector("#tip_pm").value);
    selectGpxFeature.set("br_pretplatnika", document.querySelector("#br_pretplatnika").value);
    selectGpxFeature.set("sys_id", document.querySelector("#sys_id").value);
    selectGpxFeature.set("sifra_napojne", sifraNapojneTrafostanice);
    selectGpxFeature.set("naziv_napojne", nazivNapojneTrafostanice);
    selectGpxFeature.set("izvod_napojne", izvodNapojneTrafostanice);*/
    alert("Treba napraviti");
  } else {
    poruka("Upozorenje", "Odabrani objekat je već definisan kao drugi lejer");
  }
}

function prikaziPoljaOdabranogGpxPod() {
  /*document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  document.querySelector("#fid_1").value = selectGpxFeature.values_.fid_1;
  //document.querySelector("#vlasnistvo").value = selectGpxFeature.values_.vlasnistvo;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;
  document.querySelector("#izvod_ts").value = selectGpxFeature.values_.izvod_ts;
  document.querySelector("#napojna_ts").value = selectGpxFeature.values_.napojna_ts;
  document.querySelector("#id").value = selectGpxFeature.values_.id;
  document.querySelector("#osiguraci").value = selectGpxFeature.values_.osiguraci;
  document.querySelector("#tip_pm").value = selectGpxFeature.values_.tip_pm;
  document.querySelector("#br_pretplatnika").value = selectGpxFeature.values_.br_pretplatnika;
  document.querySelector("#sys_id").value = selectGpxFeature.values_.sys_id;

  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);*/
  alert("Prikaz nije napravljen");
}
