document.querySelector("#ddlTrafostanice").addEventListener("change", popuniPoljaTrafostaniceWS);

function dodajPoljaOdabranojGpxTrafostanici() {
  selectGpxFeature.set("wizard", 0);
  selectGpxFeature.set("lejer", "trafostanice");
  selectGpxFeature.set("ddl_sloj_podataka", document.querySelector("#ddl_sloj_podataka").value);
  selectGpxFeature.set("fid_1", document.querySelector("#read_fid_1").value);
  selectGpxFeature.set("name", document.querySelector("#name").value);
  selectGpxFeature.set("celije_10", document.querySelector("#read_celije_10").value);
  selectGpxFeature.set("izvod_celija", document.querySelector("#read_izvod_celija").value);
  selectGpxFeature.set("funkcija", document.querySelector("#read_funkcija").value);
  selectGpxFeature.set("br_nn_izvoda", document.querySelector("#read_br_nn_izvoda").value);
  selectGpxFeature.set("geohash_id", document.querySelector("#read_geohash_id").value);
  selectGpxFeature.set("geohash_id_no", document.querySelector("#read_geohash_id_no").value);
  selectGpxFeature.set("br_vod_cel_nizi_nap", document.querySelector("#read_br_vod_cel_nizi_nap").value);
  selectGpxFeature.set("br_vod_cel_visi_nap", document.querySelector("#read_br_vod_cel_visi_nap").value);
  selectGpxFeature.set("god_izg", document.querySelector("#read_god_izg").value);
  selectGpxFeature.set("vlasnistvo", document.querySelector("#read_vlasnistvo").value);
  selectGpxFeature.set("datum_azuriranja", document.querySelector("#read_datum_azuriranja").value);
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
  selectGpxFeature.set("sifra_napojne", sifraNapojneTrafostanice);
  selectGpxFeature.set("naziv_napojne", nazivNapojneTrafostanice);
  selectGpxFeature.set("izvod_napojne", izvodNapojneTrafostanice);
  selectGpxFeature.set("prenos_odnos", document.querySelector("#read_prenos_odnos").value);
  selectGpxFeature.set("id_billing", document.querySelector("#read_id_billing").value);
  selectGpxFeature.set("id", document.querySelector("#ddlTrafostanice").value);
  selectGpxFeature.set("adresa", document.querySelector("#read_adresa").value);
  selectGpxFeature.set("tip", document.querySelector("#read_tip").value);
  selectGpxFeature.set("naziv", document.querySelector("#read_naziv").value);
  selectGpxFeature.set("ebs_sifra", document.querySelector("#ebs_sifra").value);
  selectGpxFeature.set("sifra_trafoa", document.querySelector("#sifra_trafoa").value);
  selectGpxFeature.set("inst_snaga_t1", document.querySelector("#read_inst_snaga_t1").value);
  selectGpxFeature.set("inst_snaga_t2", document.querySelector("#read_inst_snaga_t2").value);
  selectGpxFeature.set("inst_snaga_t3", document.querySelector("#read_inst_snaga_t3").value);
  selectGpxFeature.set("inst_snaga_t4", document.querySelector("#read_inst_snaga_t4").value);
  selectGpxFeature.set("tabela", document.querySelector("#read_tabela").value);
  selectGpxFeature.set("projek_snaga", document.querySelector("#read_projek_snaga").value);
  selectGpxFeature.set("korisnik", globalUsername);
  selectGpxFeature.set("vlasnik", "");
  if (!isEditable) {
    dodajSacuvaniKmlFeature(selectGpxFeature);
  }
  poruka(StatusPoruke.Uspjeh, UnosPoruke.Uspjeh);
}

function prikaziPoljaOdabraneGpxTrafostanice() {
  console.log("prikaziPoljaOdabraneGpxTrafostanice", selectGpxFeature);
  document.querySelector("#read_fid_1").value = selectGpxFeature.values_.fid_1;
  document.querySelector("#name").value = selectGpxFeature.values_.name;
  document.querySelector("#read_celije_10").value = selectGpxFeature.values_.celije_10;
  document.querySelector("#read_name").value = selectGpxFeature.values_.name;
  document.querySelector("#read_izvod_celija").value = selectGpxFeature.values_.izvod_celija;
  document.querySelector("#read_funkcija").value = selectGpxFeature.values_.funkcija;
  document.querySelector("#read_br_nn_izvoda").value = selectGpxFeature.values_.br_nn_izvoda;
  document.querySelector("#read_geohash_id").value = selectGpxFeature.values_.geohash_id;
  document.querySelector("#read_geohash_id_no").value = selectGpxFeature.values_.geohash_id_no;
  document.querySelector("#read_br_vod_cel_nizi_nap").value = selectGpxFeature.values_.br_vod_cel_nizi_nap;
  document.querySelector("#read_br_vod_cel_visi_nap").value = selectGpxFeature.values_.br_vod_cel_visi_nap;
  document.querySelector("#read_god_izg").value = selectGpxFeature.values_.god_izg;
  document.querySelector("#read_vlasnistvo").value = selectGpxFeature.values_.vlasnistvo;
  document.querySelector("#read_datum_azuriranja").value = selectGpxFeature.values_.datum_azuriranja;
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
  document.querySelector("#ebs_sifra").value = selectGpxFeature.values_.ebs_sifra;
  document.querySelector("#sifra_trafoa").value = selectGpxFeature.values_.sifra_trafoa;
  document.querySelector("#read_inst_snaga_t1").value = selectGpxFeature.values_.inst_snaga_t1;
  document.querySelector("#read_inst_snaga_t2").value = selectGpxFeature.values_.inst_snaga_t2;
  document.querySelector("#read_inst_snaga_t3").value = selectGpxFeature.values_.inst_snaga_t3;
  document.querySelector("#read_inst_snaga_t4").value = selectGpxFeature.values_.inst_snaga_t4;
  document.querySelector("#read_tabela").value = selectGpxFeature.values_.tabela;
  document.querySelector("#projek_snaga").value = selectGpxFeature.values_.projek_snaga;
  document.querySelector("#ddlTrafostanice").value = selectGpxFeature.values_.id;
}

function popuniKontroleIzTrafostanice(data) {
  if (data) {
    document.querySelector("#read_fid_1").value = data.fid_1;
    document.querySelector("#read_name").value = data.name;
    document.querySelector("#read_celije_10").value = data.celije_10;
    document.querySelector("#read_izvod_celija").value = data.izvod_celija;
    document.querySelector("#read_funkcija").value = data.funkcija;
    document.querySelector("#read_br_nn_izvoda").value = data.br_nn_izvoda;
    document.querySelector("#read_geohash_id").value = data.geohash_id;
    document.querySelector("#read_geohash_id_no").value = data.geohash_id_no;
    document.querySelector("#read_br_vod_cel_nizi_nap").value = data.br_vod_cel_nizi_nap;
    document.querySelector("#read_br_vod_cel_visi_nap").value = data.br_vod_cel_visi_nap;
    document.querySelector("#read_god_izg").value = data.god_izg;
    document.querySelector("#read_vlasnistvo").value = data.vlasnistvo;
    document.querySelector("#read_datum_azuriranja").value = data.datum_azuriranja;
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
    document.querySelector("#read_inst_snaga_t4").value = data.inst_snaga_t4;
    document.querySelector("#read_tabela").value = data.tabela;
    document.querySelector("#name").value = data.name;
  }
}

function prikaziPoljaWmsTrafostanice(objekat) {
  $("#ddlTrafostanice").empty();
  fillDdl("ddlTrafostanice", objekat.properties.id_billing, objekat.properties.naziv);
  document.querySelector("#read_fid_1").value = objekat.properties.fid_1;
  document.querySelector("#read_name").value = objekat.properties.name;
  document.querySelector("#read_celije_10").value = objekat.properties.celije_10;
  document.querySelector("#read_izvod_celija").value = objekat.properties.izvod_celija;
  document.querySelector("#read_funkcija").value = objekat.properties.funkcija;
  document.querySelector("#read_br_nn_izvoda").value = objekat.properties.br_nn_izvoda;
  document.querySelector("#read_geohash_id").value = objekat.properties.geohash_id;
  document.querySelector("#read_geohash_id_no").value = objekat.properties.geohash_id_no;
  document.querySelector("#read_br_vod_cel_nizi_nap").value = objekat.properties.br_vod_cel_nizi_nap;
  document.querySelector("#read_br_vod_cel_visi_nap").value = objekat.properties.br_vod_cel_visi_nap;
  document.querySelector("#read_god_izg").value = objekat.properties.god_izg;
  document.querySelector("#read_vlasnistvo").value = objekat.properties.vlasnistvo;
  document.querySelector("#read_datum_azuriranja").value = objekat.properties.datum_azuriranja;
  document.querySelector("#read_nad_vis").value = objekat.properties.nad_vis;
  document.querySelector("#read_gps").value = objekat.properties.gps;
  document.querySelector("#read_pog_sprem").value = objekat.properties.pog_sprem;
  document.querySelector("#read_napon").value = objekat.properties.napon;
  document.querySelector("#read_posjeduje_sliku").value = objekat.properties.posjeduje_sliku;
  document.querySelector("#read_originalId").value = objekat.properties.originalId;
  document.querySelector("#read_korisnik").value = objekat.properties.korisnik;
  document.querySelector("#read_vlasnik").value = objekat.properties.vlasnik;
  document.querySelector("#read_katastar").value = objekat.properties.katastar;
  document.querySelector("#read_id_trafostanice").value = objekat.properties.id_trafostanice;
  document.querySelector("#read_region").value = objekat.properties.region;
  document.querySelector("#read_naziv_napojne").value = objekat.properties.naziv_napojne;
  document.querySelector("#read_sifra_napojne").value = objekat.properties.sifra_napojne;
  document.querySelector("#read_izvod_napojne").value = objekat.properties.izvod_napojne;
  document.querySelector("#read_prenos_odnos").value = objekat.properties.prenos_odnos;
  document.querySelector("#read_id_billing").value = objekat.properties.id_billing;
  document.querySelector("#read_adresa").value = objekat.properties.adresa;
  document.querySelector("#read_tip").value = objekat.properties.tip;
  document.querySelector("#read_naziv").value = objekat.properties.naziv;
  document.querySelector("#ebs_sifra").value = objekat.properties.ebs_sifra;
  document.querySelector("#sifra_trafoa").value = objekat.properties.sifra_trafoa;
  document.querySelector("#read_inst_snaga_t1").value = objekat.properties.inst_snaga_t1;
  document.querySelector("#read_inst_snaga_t2").value = objekat.properties.inst_snaga_t2;
  document.querySelector("#read_inst_snaga_t3").value = objekat.properties.inst_snaga_t3;
  document.querySelector("#read_inst_snaga_t4").value = objekat.properties.inst_snaga_t4;
  document.querySelector("#read_tabela").value = objekat.properties.tabela;
  document.querySelector("#projek_snaga").value = objekat.properties.projek_snaga;
  document.querySelector("#name").value = objekat.properties.name;
  showTrafostaniceTBPNaziv(objekat.properties.id_billing);
}

function izmijeniAtributeWmsTrafostanice(objekat) {
  objekat.properties.name = document.querySelector("#read_name").value;
  objekat.properties.celije_10 = document.querySelector("#read_celije_10").value;
  objekat.properties.izvod_celija = document.querySelector("#read_izvod_celija").value;
  objekat.properties.funkcija = document.querySelector("#read_funkcija").value;
  objekat.properties.br_nn_izvoda = document.querySelector("#read_br_nn_izvoda").value;
  objekat.properties.geohash_id = document.querySelector("#read_geohash_id").value;
  objekat.properties.geohash_id_no = document.querySelector("#read_geohash_id_no").value;
  objekat.properties.br_vod_cel_nizi_nap = document.querySelector("#read_br_vod_cel_nizi_nap").value;
  objekat.properties.br_vod_cel_visi_nap = document.querySelector("#read_br_vod_cel_visi_nap").value;
  objekat.properties.god_izg = document.querySelector("#read_god_izg").value;
  objekat.properties.vlasnistvo = document.querySelector("#read_vlasnistvo").value;
  objekat.properties.datum_azuriranja = document.querySelector("#read_datum_azuriranja").value;
  objekat.properties.nad_vis = document.querySelector("#read_nad_vis").value;
  objekat.properties.gps = document.querySelector("#read_gps").value;
  objekat.properties.pog_sprem = document.querySelector("#read_pog_sprem").value;
  objekat.properties.napon = document.querySelector("#read_napon").value;
  objekat.properties.posjeduje_sliku = document.querySelector("#read_posjeduje_sliku").value;
  objekat.properties.originalId = document.querySelector("#read_originalId").value;
  objekat.properties.korisnik = document.querySelector("#read_korisnik").value;
  objekat.properties.vlasnik = document.querySelector("#read_vlasnik").value;
  objekat.properties.katastar = document.querySelector("#read_katastar").value;
  objekat.properties.id_trafostanice = document.querySelector("#read_id_trafostanice").value;
  objekat.properties.region = document.querySelector("#read_region").value;
  objekat.properties.naziv_napojne = document.querySelector("#read_naziv_napojne").value;
  objekat.properties.sifra_napojne = document.querySelector("#read_sifra_napojne").value;
  objekat.properties.izvod_napojne = document.querySelector("#read_izvod_napojne").value;
  objekat.properties.prenos_odnos = document.querySelector("#read_prenos_odnos").value;
  objekat.properties.id_billing = document.querySelector("#read_id_billing").value;
  objekat.properties.adresa = document.querySelector("#read_adresa").value;
  objekat.properties.tip = document.querySelector("#read_tip").value;
  objekat.properties.naziv = document.querySelector("#read_naziv").value;
  objekat.properties.ebs_sifra = document.querySelector("#ebs_sifra").value;
  objekat.properties.sifra_trafoa = document.querySelector("#sifra_trafoa").value;
  objekat.properties.inst_snaga_t1 = document.querySelector("#read_inst_snaga_t1").value;
  objekat.properties.inst_snaga_t2 = document.querySelector("#read_inst_snaga_t2").value;
  objekat.properties.inst_snaga_t3 = document.querySelector("#read_inst_snaga_t3").value;
  objekat.properties.inst_snaga_t4 = document.querySelector("#read_inst_snaga_t4").value;
  objekat.properties.tabela = document.querySelector("#read_tabela").value;
  objekat.properties.projek_snaga = document.querySelector("#projek_snaga").value;

  return objekat;
}

function isprazniVrijednostiPoljaTrafostanice() {
  document.querySelector("#read_fid_1").value = "";
  document.querySelector("#read_name").value = "";
  document.querySelector("#read_celije_10").value = "";
  document.querySelector("#read_izvod_celija").value = "";
  document.querySelector("#read_funkcija").value = "";
  document.querySelector("#read_br_nn_izvoda").value = "";
  document.querySelector("#read_geohash_id").value = "";
  document.querySelector("#read_geohash_id_no").value = "";
  document.querySelector("#read_br_vod_cel_nizi_nap").value = "";
  document.querySelector("#read_br_vod_cel_visi_nap").value = "";
  document.querySelector("#read_god_izg").value = "";
  document.querySelector("#read_vlasnistvo").value = "";
  document.querySelector("#read_datum_azuriranja").value = "";
  document.querySelector("#read_nad_vis").value = "";
  document.querySelector("#read_gps").value = "";
  document.querySelector("#read_pog_sprem").value = "";
  document.querySelector("#read_napon").value = "";
  document.querySelector("#read_posjeduje_sliku").value = "";
  document.querySelector("#read_originalId").value = "";
  document.querySelector("#read_korisnik").value = "";
  document.querySelector("#read_vlasnik").value = "";
  document.querySelector("#read_katastar").value = "";
  document.querySelector("#read_id_trafostanice").value = "";
  document.querySelector("#read_region").value = "";
  document.querySelector("#read_naziv_napojne").value = "";
  document.querySelector("#read_sifra_napojne").value = "";
  document.querySelector("#read_izvod_napojne").value = "";
  document.querySelector("#read_prenos_odnos").value = "";
  document.querySelector("#read_id_billing").value = "";
  document.querySelector("#read_adresa").value = "";
  document.querySelector("#read_tip").value = "";
  document.querySelector("#read_naziv").value = "";
  document.querySelector("#ebs_sifra").value = "";
  document.querySelector("#sifra_trafoa").value = "";
  document.querySelector("#read_inst_snaga_t1").value = "";
  document.querySelector("#read_inst_snaga_t2").value = "";
  document.querySelector("#read_inst_snaga_t3").value = "";
  document.querySelector("#read_inst_snaga_t4").value = "";
  document.querySelector("#read_tabela").value = "";
  document.querySelector("#projek_snaga").value = "";
}

function showTrafostaniceTBPNaziv(sifra){
  let urlServisa = wsServerOriginLocation + "/portal/api/trafostanice?sifra=" + sifra;
  urlServisa += "&t=" + Date.now();
  $.ajax({
    url: urlServisa,
    data: "",
    type: "GET",
    success: function (data) {
      if (data && data.ts) {
        document.querySelector("#read_naziv").value = data.ts.naziv;
      }
    },
    error: function (x, y, z) {
      console.log("greška popuniDdlAtributima", x.responseText);
    },
  });
}