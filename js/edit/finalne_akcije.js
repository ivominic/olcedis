/**Metode koje vrše finalnu obradu podataka prije inserta u bazu */

/**Metoda koja svim tačkama dodjeljuje vrijednosti atributa za stubove */
function dodajPoljaGpxStubovi() {
  if (blnDodijeljenoGpxProperties) {
    return false;
  }
  blnDodijeljenoGpxProperties = true;
  gpxFeatures.forEach((el) => {
    let geom = wktGeometrije(el);
    console.log("geom", geom + " " + el.values_.name);
    el.set("wizard", 0);
    el.set("id", el.values_.name);
    el.set("akcija", "Unos");
    el.set("Geometry", geom);
    el.set("fid_1", document.querySelector("#fid_1").value);
    el.set("gps", document.querySelector("#gps").value);
    el.set("broj", document.querySelector("#broj").value);
    el.set("sifra", document.querySelector("#sifra").value);
    el.set("pripadnost", document.querySelector("#pripadnost").value);
    el.set("tip", document.querySelector("#tip").value);
    el.set("vrsta_namjena", document.querySelector("#vrsta_namjena").value);
    el.set("vrsta_materijal", document.querySelector("#vrsta_materijal").value);
    el.set("vrsta_drvenog", document.querySelector("#vrsta_drvenog").value);
    el.set("nad_visina", document.querySelector("#nad_visina").value);
    el.set("visina", document.querySelector("#visina").value);
    el.set("rasp_prov", document.querySelector("#rasp_prov").value);
    el.set("izolator_vrsta", document.querySelector("#izolator_vrsta").value);
    el.set("izolator_funkcija", document.querySelector("#izolator_funkcija").value);
    el.set("br_izol_faza", document.querySelector("#br_izol_faza").value);
    el.set("nosaci_izolatora", document.querySelector("#nosaci_izolatora").value);
    el.set("odvodnik_prenapona", document.querySelector("#odvodnik_prenapona").value);
    el.set("uzemljivac", document.querySelector("#uzemljivac").value);
    el.set("uzemljivac_otpor", document.querySelector("#uzemljivac_otpor").value);
    el.set("optika", document.querySelector("#optika").value);
    el.set("rasvjeta", document.querySelector("#rasvjeta").value);
    el.set("br_pmo", document.querySelector("#br_pmo").value);
    el.set("br_nnv", document.querySelector("#br_nnv").value);
    el.set("pog_sprem", document.querySelector("#pog_sprem").value);
    el.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
    el.set("opstina", document.querySelector("#opstina").value);
    el.set("napon", document.querySelector("#napon").value);
    el.set("prikljucak_otcjep", document.querySelector("#prikljucak_otcjep").value);
    el.set("nn_vod", document.querySelector("#nn_vod").value);
    el.set("rastavljac", document.querySelector("#rastavljac").value);
    el.set("10vod", document.querySelector("#vod_10").value);

    //Dodao za poziv Jovanovog servisa
    el.set("name", el.values_.name);
    el.set("fid", "test");
    el.set("layer_name", "test");
    el.set("broj_priklj_mjernih_ormara", 2);
    el.set("datum_azuriranja", "");

    el.set("layer_id", 0);
    el.set("geohash_id", "test");
    el.set("korisnik", "test");
    el.set("katastar", "");
    el.set("originalId", 0);
    el.set("posjeduje_sliku", "test");
    el.set("vlasnik", "test");
    el.set("geohash_id_no", "test");
    el.set("sifra_napojne", "test");
    el.set("izvod_napojne", "test");
    el.set("naziv_napojne", "test");
  });
  console.log("gpx features", gpxFeatures);
  alert("završeno");
}
