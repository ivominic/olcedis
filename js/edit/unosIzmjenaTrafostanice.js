document.querySelector("#ddlTrafostanice").addEventListener("change", popuniPoljaTrafostaniceWS);

function dodajPoljaOdabranojGpxTrafostanici() {
  selectGpxFeature.set("wizard", 0);
  selectGpxFeature.set("lejer", "trafostanice");
  selectGpxFeature.set("fid_1", document.querySelector("#read_fid_1").value);
  selectGpxFeature.set("name", document.querySelector("#read_name").value);
  selectGpxFeature.set("id_br", document.querySelector("#read_id_br").value);
  selectGpxFeature.set("celije_10", document.querySelector("#read_celije_10").value);
  selectGpxFeature.set("izvod_celija", document.querySelector("#read_izvod_celija").value);
  selectGpxFeature.set("funkcija", document.querySelector("#read_funkcija").value);
  selectGpxFeature.set("br_nn_izvoda", document.querySelector("#read_br_nn_izvoda").value);
  selectGpxFeature.set("geohash_id", document.querySelector("#read_geohash_id").value);
  selectGpxFeature.set("geohash_id_no", document.querySelector("#read_geohash_id_no").value);
  selectGpxFeature.set("br_vod_cel_nizi_nap", document.querySelector("#read_br_vod_cel_nizi_nap").value);
  selectGpxFeature.set("br_vod_cel_visi_nap", document.querySelector("#read_br_vod_cel_visi_nap").value);
  selectGpxFeature.set("layer_name", document.querySelector("#read_layer_name").value);
  selectGpxFeature.set("god_izg", document.querySelector("#read_god_izg").value);
  selectGpxFeature.set("vlasnistvo", document.querySelector("#read_vlasnistvo").value);
  selectGpxFeature.set("datum_azuriranja", document.querySelector("#read_datum_azuriranja").value);
  selectGpxFeature.set("layer_id", document.querySelector("#read_layer_id").value);
  selectGpxFeature.set("nad_vis", document.querySelector("#read_nad_vis").value);
  selectGpxFeature.set("gps", document.querySelector("#read_gps").value);
  selectGpxFeature.set("pog_sprem", document.querySelector("#read_pog_sprem").value);
  selectGpxFeature.set("napon", document.querySelector("#read_napon").value);
  selectGpxFeature.set("posjeduje_sliku", document.querySelector("#read_posjeduje_sliku").value);
  selectGpxFeature.set("originalId", document.querySelector("#read_originalId").value);
  selectGpxFeature.set("korisnik", document.querySelector("#read_korisnik").value);
  selectGpxFeature.set("vlasnik", document.querySelector("#read_vlasnik").value);
  selectGpxFeature.set("katastar", document.querySelector("#read_katastar").value);
  selectGpxFeature.set("id_trafostanice", document.querySelector("#read_id_trafostanice").value);
  selectGpxFeature.set("region", document.querySelector("#read_region").value);
  selectGpxFeature.set("naziv_napojne", document.querySelector("#read_naziv_napojne").value);
  selectGpxFeature.set("sifra_napojne", document.querySelector("#read_sifra_napojne").value);
  selectGpxFeature.set("izvod_napojne", document.querySelector("#read_izvod_napojne").value);
  selectGpxFeature.set("prenos_odnos", document.querySelector("#read_prenos_odnos").value);
  selectGpxFeature.set("id_billing", document.querySelector("#read_id_billing").value);
  selectGpxFeature.set("adresa", document.querySelector("#read_adresa").value);
  selectGpxFeature.set("tip", document.querySelector("#read_tip").value);
  selectGpxFeature.set("naziv", document.querySelector("#read_naziv").value);
  selectGpxFeature.set("inst_snaga_t1", document.querySelector("#read_inst_snaga_t1").value);
  selectGpxFeature.set("inst_snaga_t2", document.querySelector("#read_inst_snaga_t2").value);
  selectGpxFeature.set("inst_snaga_t3", document.querySelector("#read_inst_snaga_t3").value);
  selectGpxFeature.set("tabela", document.querySelector("#read_tabela").value);
  console.log("selectGpxFeature trafostanica", selectGpxFeature);
  poruka("Uspjeh", "Uspješno dodijeljene vrijednosti objektu");
}

function prikaziPoljaOdabraneGpxTrafostanice() {
  //document.querySelector("#ddlTrafostanice").value = ;
  console.log("prikaziPoljaOdabraneGpxTrafostanice", selectGpxFeature);
  document.querySelector("#read_fid_1").value = selectGpxFeature.values_.fid_1;
  document.querySelector("#read_name").value = selectGpxFeature.values_.name;
  document.querySelector("#read_id_br").value = selectGpxFeature.values_.id_br;
  document.querySelector("#read_celije_10").value = selectGpxFeature.values_.celije_10;
  document.querySelector("#read_izvod_celija").value = selectGpxFeature.values_.izvod_celija;
  document.querySelector("#read_funkcija").value = selectGpxFeature.values_.funkcija;
  document.querySelector("#read_br_nn_izvoda").value = selectGpxFeature.values_.br_nn_izvoda;
  document.querySelector("#read_geohash_id").value = selectGpxFeature.values_.geohash_id;
  document.querySelector("#read_geohash_id_no").value = selectGpxFeature.values_.geohash_id_no;
  document.querySelector("#read_br_vod_cel_nizi_nap").value = selectGpxFeature.values_.br_vod_cel_nizi_nap;
  document.querySelector("#read_br_vod_cel_visi_nap").value = selectGpxFeature.values_.br_vod_cel_visi_nap;
  document.querySelector("#read_layer_name").value = selectGpxFeature.values_.layer_name;
  document.querySelector("#read_god_izg").value = selectGpxFeature.values_.god_izg;
  document.querySelector("#read_vlasnistvo").value = selectGpxFeature.values_.vlasnistvo;
  document.querySelector("#read_datum_azuriranja").value = selectGpxFeature.values_.datum_azuriranja;
  document.querySelector("#read_layer_id").value = selectGpxFeature.values_.layer_id;
  document.querySelector("#read_nad_vis").value = selectGpxFeature.values_.nad_vis;
  document.querySelector("#read_gps").value = selectGpxFeature.values_.gps;
  document.querySelector("#read_pog_sprem").value = selectGpxFeature.values_.pog_sprem;
  document.querySelector("#read_napon").value = selectGpxFeature.values_.napon;
  document.querySelector("#read_posjeduje_sliku").value = selectGpxFeature.values_.posjeduje_sliku;
  document.querySelector("#read_originalId").value = selectGpxFeature.values_.originalId;
  document.querySelector("#read_korisnik").value = selectGpxFeature.values_.korisnik;
  document.querySelector("#read_vlasnik").value = selectGpxFeature.values_.vlasnik;
  document.querySelector("#read_katastar").value = selectGpxFeature.values_.katastar;
  document.querySelector("#read_id_trafostanice").value = selectGpxFeature.values_.id_trafostanice;
  document.querySelector("#read_region").value = selectGpxFeature.values_.region;
  document.querySelector("#read_naziv_napojne").value = selectGpxFeature.values_.naziv_napojne;
  document.querySelector("#read_sifra_napojne").value = selectGpxFeature.values_.sifra_napojne;
  document.querySelector("#read_izvod_napojne").value = selectGpxFeature.values_.izvod_napojne;
  document.querySelector("#read_prenos_odnos").value = selectGpxFeature.values_.prenos_odnos;
  document.querySelector("#read_id_billing").value = selectGpxFeature.values_.id_billing;
  document.querySelector("#read_adresa").value = selectGpxFeature.values_.adresa;
  document.querySelector("#read_tip").value = selectGpxFeature.values_.tip;
  document.querySelector("#read_naziv").value = selectGpxFeature.values_.naziv;
  document.querySelector("#read_inst_snaga_t1").value = selectGpxFeature.values_.inst_snaga_t1;
  document.querySelector("#read_inst_snaga_t2").value = selectGpxFeature.values_.inst_snaga_t2;
  document.querySelector("#read_inst_snaga_t3").value = selectGpxFeature.values_.inst_snaga_t3;
  document.querySelector("#read_tabela").value = selectGpxFeature.values_.tabela;
}

function popuniKontroleIzTrafostanice(data) {
  //document.querySelector("#ddlTrafostanice").value = ;
  document.querySelector("#read_fid_1").value = data.fid_1;
  document.querySelector("#read_name").value = data.name;
  document.querySelector("#read_id_br").value = data.id_br;
  document.querySelector("#read_celije_10").value = data.celije_10;
  document.querySelector("#read_izvod_celija").value = data.izvod_celija;
  document.querySelector("#read_funkcija").value = data.funkcija;
  document.querySelector("#read_br_nn_izvoda").value = data.br_nn_izvoda;
  document.querySelector("#read_geohash_id").value = data.geohash_id;
  document.querySelector("#read_geohash_id_no").value = data.geohash_id_no;
  document.querySelector("#read_br_vod_cel_nizi_nap").value = data.br_vod_cel_nizi_nap;
  document.querySelector("#read_br_vod_cel_visi_nap").value = data.br_vod_cel_visi_nap;
  document.querySelector("#read_layer_name").value = data.layer_name;
  document.querySelector("#read_god_izg").value = data.god_izg;
  document.querySelector("#read_vlasnistvo").value = data.vlasnistvo;
  document.querySelector("#read_datum_azuriranja").value = data.datum_azuriranja;
  document.querySelector("#read_layer_id").value = data.layer_id;
  document.querySelector("#read_nad_vis").value = data.nad_vis;
  document.querySelector("#read_gps").value = data.gps;
  document.querySelector("#read_pog_sprem").value = data.pog_sprem;
  document.querySelector("#read_napon").value = data.napon;
  document.querySelector("#read_posjeduje_sliku").value = data.posjeduje_sliku;
  document.querySelector("#read_originalId").value = data.originalId;
  document.querySelector("#read_korisnik").value = data.korisnik;
  document.querySelector("#read_vlasnik").value = data.vlasnik;
  document.querySelector("#read_katastar").value = data.katastar;
  document.querySelector("#read_id_trafostanice").value = data.id_trafostanice;
  document.querySelector("#read_region").value = data.region;
  document.querySelector("#read_naziv_napojne").value = data.naziv_napojne;
  document.querySelector("#read_sifra_napojne").value = data.sifra_napojne;
  document.querySelector("#read_izvod_napojne").value = data.izvod_napojne;
  document.querySelector("#read_prenos_odnos").value = data.prenos_odnos;
  document.querySelector("#read_id_billing").value = data.id_billing;
  document.querySelector("#read_adresa").value = data.adresa;
  document.querySelector("#read_tip").value = data.tip;
  document.querySelector("#read_naziv").value = data.naziv;
  document.querySelector("#read_inst_snaga_t1").value = data.inst_snaga_t1;
  document.querySelector("#read_inst_snaga_t2").value = data.inst_snaga_t2;
  document.querySelector("#read_inst_snaga_t3").value = data.inst_snaga_t3;
  document.querySelector("#read_tabela").value = data.tabela;
}
