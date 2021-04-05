function dodajPoljaOdabranomGpxPotrosac() {
  if (selectGpxFeature.get("lejer") === undefined || selectGpxFeature.get("lejer") === "potrosac") {
    selectGpxFeature.set("wizard", 0);
    selectGpxFeature.set("lejer", "potrosac");
    selectGpxFeature.set("gps", document.querySelector("#gps").value);
    selectGpxFeature.set("fid_1", document.querySelector("#fid_1").value);
    selectGpxFeature.set("izvod_ts", document.querySelector("#izvod_ts").value); //ILI izvodNapojneTrafostanice
    selectGpxFeature.set("napojna_ts", document.querySelector("#napojna_ts").value); //ILI sifraNapojneTrafostanice
    selectGpxFeature.set("id", document.querySelector("#id").value);
    selectGpxFeature.set("naziv_ts", document.querySelector("#naziv_ts").value);
    selectGpxFeature.set("sifra_ts", document.querySelector("#sifra_ts").value);
    selectGpxFeature.set("prik_kabal", document.querySelector("#prik_kabal").value);
    selectGpxFeature.set("pod", document.querySelector("#pod").value);
    selectGpxFeature.set("adresa_mm", document.querySelector("#adresa_mm").value);
    selectGpxFeature.set("prik_mjesto", document.querySelector("#prik_mjesto").value);
    selectGpxFeature.set("naziv_nn_izvod", document.querySelector("#naziv_nn_izvod").value);
    selectGpxFeature.set("pretplatni_br", document.querySelector("#pretplatni_br").value);
    selectGpxFeature.set("br_brojila", document.querySelector("#br_brojila").value);
    selectGpxFeature.set("sifra_napojne", sifraNapojneTrafostanice);
    selectGpxFeature.set("naziv_napojne", nazivNapojneTrafostanice);
    selectGpxFeature.set("izvod_napojne", izvodNapojneTrafostanice);
    poruka("Uspjeh", "Ažurirani podaci za odabranu gpx tačku");
  } else {
    poruka("Upozorenje", "Odabrani objekat je već definisan kao drugi tip objekta");
  }
}

function prikaziPoljaOdabranogGpxPotrosac() {
  document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  document.querySelector("#fid_1").value = selectGpxFeature.values_.fid_1;
  document.querySelector("#izvod_ts").value = selectGpxFeature.values_.izvod_ts;
  document.querySelector("#napojna_ts").value = selectGpxFeature.values_.napojna_ts;
  document.querySelector("#id").value = selectGpxFeature.values_.id;
  document.querySelector("#naziv_ts").value = selectGpxFeature.values_.naziv_ts;
  document.querySelector("#sifra_ts").value = selectGpxFeature.values_.sifra_ts;
  document.querySelector("#prik_kabal").value = selectGpxFeature.values_.prik_kabal;
  document.querySelector("#pod").value = selectGpxFeature.values_.pod;
  document.querySelector("#adresa_mm").value = selectGpxFeature.values_.adresa_mm;
  document.querySelector("#prik_mjesto").value = selectGpxFeature.values_.prik_mjesto;
  document.querySelector("#naziv_nn_izvod").value = selectGpxFeature.values_.naziv_nn_izvod;
  document.querySelector("#pretplatni_br").value = selectGpxFeature.values_.pretplatni_br;
  document.querySelector("#br_brojila").value = selectGpxFeature.values_.br_brojila;
}
