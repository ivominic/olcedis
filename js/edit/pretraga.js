/**Metode za pretragu lejera */

let tempLejerZaFilter = null;

document.querySelector("#ddlLejer").addEventListener("change", function () {
  tempLejerZaFilter = null;
  clearFilterFields();
  sakrijSvaPoljaPretrage();
  if (this.value === Lejeri.Stubovi) {
    tempLejerZaFilter = wmsStubovi;
    prikaziPretraguStubove();
  } else if (this.value === Lejeri.Vodovi) {
    tempLejerZaFilter = wmsVodovi;
    prikaziPretraguVodove();
  } else if (this.value === Lejeri.Trafostanice) {
    tempLejerZaFilter = wmsTrafostanice;
    prikaziPretraguTrafostanice();
  } else if (this.value === Lejeri.NKRO) {
    tempLejerZaFilter = wmsNKRO;
    prikaziPretraguNkro();
  } else if (this.value === Lejeri.PrikljucnoMjesto) {
    tempLejerZaFilter = wmsPrikljucnoMjesto;
    prikaziPretraguPrikljucnoMjesto();
  } else if (this.value === Lejeri.Potrosac) {
    tempLejerZaFilter = wmsPotrosaci;
    prikaziPretraguPotrosaci();
  } else if (this.value === Lejeri.POD) {
    tempLejerZaFilter = wmsPOD;
    prikaziPretraguPodovi();
  } else if (this.value === Lejeri.NelegalniPotrosac) {
    tempLejerZaFilter = wmsNelegalniPotrosaci;
    prikaziPretraguNelegalniPotrosaci();
  }
});

function sakrijSvaPoljaPretrage() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "none";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "none";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "none";
  document.querySelector("#divPretragaGps").style.display = "none";
  document.querySelector("#divPretragaBroj").style.display = "none";
  document.querySelector("#divPretragaTip").style.display = "none";
  document.querySelector("#divPretragaNamjena").style.display = "none";
  document.querySelector("#divPretragaMaterijal").style.display = "none";
  document.querySelector("#divPretragaVrstaDrvenogStuba").style.display = "none";
  document.querySelector("#divPretragaNadmorskaVisina").style.display = "none";
  document.querySelector("#divPretragaVisina").style.display = "none";
  document.querySelector("#divPretragaRasporedProvodnika").style.display = "none";
  document.querySelector("#divPretragaIzolatorVrsta").style.display = "none";
  document.querySelector("#divPretragaIzolatorFunkcija").style.display = "none";
  document.querySelector("#divPretragaBrIzolFaza").style.display = "none";
  document.querySelector("#divPretragaTipIzolatora").style.display = "none";
  document.querySelector("#divPretragaOdvodnikPrenapona").style.display = "none";
  document.querySelector("#divPretragaUzemljivac").style.display = "none";
  document.querySelector("#divPretragaOtporUzemljivaca").style.display = "none";
  document.querySelector("#divPretragaOptika").style.display = "none";
  document.querySelector("#divPretragaRasvjeta").style.display = "none";
  document.querySelector("#divPretragaBrPmo").style.display = "none";
  document.querySelector("#divPretragaBrNnv").style.display = "none";
  document.querySelector("#divPretragaPogSprem").style.display = "none";
  document.querySelector("#divPretragaVlasnistvo").style.display = "none";
  document.querySelector("#divPretragaNapon").style.display = "none";
  document.querySelector("#divPretragaPrikljucakOtcjep").style.display = "none";
  document.querySelector("#divPretragaNnVod").style.display = "none";
  document.querySelector("#divPretragaRastavljac").style.display = "none";
  document.querySelector("#divPretraga10KvVod").style.display = "none";

  document.querySelector("#divPretragaNaziv").style.display = "none";
  document.querySelector("#divPretragaTs").style.display = "none";
  document.querySelector("#divPretragaBrFaza").style.display = "none";
  document.querySelector("#divPretragaVrsta").style.display = "none";
  document.querySelector("#divPretragaPresjek").style.display = "none";
  document.querySelector("#divPretragaBrSpojnica").style.display = "none";
  document.querySelector("#divPretragaGodIzgr").style.display = "none";
  document.querySelector("#divPretragaUzePresjek").style.display = "none";
  document.querySelector("#divPretragaUze").style.display = "none";

  document.querySelector("#divPretragaBrNnIzvoda").style.display = "none";
  document.querySelector("#divPretragaCelije10").style.display = "none";
  document.querySelector("#divPretragaProjekSnaga").style.display = "none";
  document.querySelector("#divPretragaInstSnaga1").style.display = "none";
  document.querySelector("#divPretragaInstSnaga2").style.display = "none";
  document.querySelector("#divPretragaInstSnaga3").style.display = "none";
  document.querySelector("#divPretragaInstSnaga4").style.display = "none";
  document.querySelector("#divPretragaPrenosOdnos").style.display = "none";
  document.querySelector("#divPretragaIzvodCelija").style.display = "none";
  document.querySelector("#divPretragaFunkcija").style.display = "none";
  document.querySelector("#divPretragaIdBilling").style.display = "none";

  document.querySelector("#divPretragaId").style.display = "none";
  document.querySelector("#divPretragaOsiguraci").style.display = "none";
  //document.querySelector("#divPretragaDionica").style.display = "none";

  document.querySelector("#divPretragaMontaza").style.display = "none";
  document.querySelector("#divPretragaVrata").style.display = "none";
  document.querySelector("#divPretragaBrIzvoda").style.display = "none";
  document.querySelector("#divPretragaBrPrikljucaka").style.display = "none";
}
sakrijSvaPoljaPretrage();

function prikaziPretraguStubove() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaNaziv").style.display = "flex";
  document.querySelector("#divPretragaBroj").style.display = "flex";
  document.querySelector("#divPretragaTip").style.display = "flex";
  document.querySelector("#divPretragaNamjena").style.display = "flex";
  document.querySelector("#divPretragaMaterijal").style.display = "flex";
  document.querySelector("#divPretragaVrstaDrvenogStuba").style.display = "flex";
  document.querySelector("#divPretragaNadmorskaVisina").style.display = "flex";
  document.querySelector("#divPretragaVisina").style.display = "flex";
  document.querySelector("#divPretragaRasporedProvodnika").style.display = "flex";
  document.querySelector("#divPretragaIzolatorVrsta").style.display = "flex";
  document.querySelector("#divPretragaIzolatorFunkcija").style.display = "flex";
  document.querySelector("#divPretragaBrIzolFaza").style.display = "flex";
  document.querySelector("#divPretragaTipIzolatora").style.display = "flex";
  document.querySelector("#divPretragaOdvodnikPrenapona").style.display = "flex";
  document.querySelector("#divPretragaUzemljivac").style.display = "flex";
  document.querySelector("#divPretragaOtporUzemljivaca").style.display = "flex";
  document.querySelector("#divPretragaPogSprem").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaOptika").style.display = "flex";
  document.querySelector("#divPretragaRasvjeta").style.display = "flex";
  document.querySelector("#divPretragaBrPmo").style.display = "flex";
  document.querySelector("#divPretragaBrNnv").style.display = "flex";
  document.querySelector("#divPretragaNnVod").style.display = "flex";
  document.querySelector("#divPretragaRastavljac").style.display = "flex";
  document.querySelector("#divPretraga10KvVod").style.display = "flex";
}

function prikaziPretraguVodove() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaTip").style.display = "flex";
  document.querySelector("#divPretragaMaterijal").style.display = "flex";
  document.querySelector("#divPretragaRasvjeta").style.display = "flex";
  document.querySelector("#divPretragaPogSprem").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNaziv").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaBrFaza").style.display = "flex";
  document.querySelector("#divPretragaVrsta").style.display = "flex";
  document.querySelector("#divPretragaPresjek").style.display = "flex";
  document.querySelector("#divPretragaBrSpojnica").style.display = "flex";
  document.querySelector("#divPretragaGodIzgr").style.display = "flex";
  document.querySelector("#divPretragaUzePresjek").style.display = "flex";
  document.querySelector("#divPretragaUze").style.display = "flex";
}

function prikaziPretraguTrafostanice() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTip").style.display = "flex";
  document.querySelector("#divPretragaNaziv").style.display = "flex";
  document.querySelector("#divPretragaGodIzgr").style.display = "flex";
  document.querySelector("#divPretragaPogSprem").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaBrNnIzvoda").style.display = "flex";
  document.querySelector("#divPretragaCelije10").style.display = "flex";
  document.querySelector("#divPretragaProjekSnaga").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga1").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga2").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga3").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga4").style.display = "flex";
  document.querySelector("#divPretragaPrenosOdnos").style.display = "flex";
  document.querySelector("#divPretragaIzvodCelija").style.display = "flex";
  document.querySelector("#divPretragaFunkcija").style.display = "flex";
  document.querySelector("#divPretragaIdBilling").style.display = "flex";
}

function prikaziPretraguPrikljucnoMjesto() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaTip").style.display = "flex";
  document.querySelector("#divPretragaOsiguraci").style.display = "none";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
}

function prikaziPretraguNkro() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaMontaza").style.display = "flex";
  document.querySelector("#divPretragaVrata").style.display = "flex";
  document.querySelector("#divPretragaBrIzvoda").style.display = "flex";
  document.querySelector("#divPretragaBrPrikljucaka").style.display = "flex";
}

function prikaziPretraguPotrosaci() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
}

function prikaziPretraguPodovi() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
}

function prikaziPretraguNelegalniPotrosaci() {
  document.querySelector("#divPretragaNazivNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaSifraNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaIzvodNapojneTS").style.display = "flex";
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
}

/* Filter wms-a po prostornim i atributskim podacima*/
function filtriranje() {
  let prostorniFilter = kreiranjeCqlFilteraProstorno();
  let atributniFilter = kreiranjeCqlFilteraAtributi();
  if (prostorniFilter !== "" && atributniFilter !== "") {
    cqlFilter = "(" + prostorniFilter + ") AND " + atributniFilter;
  } else {
    cqlFilter = prostorniFilter + atributniFilter;
  }
  let naponNivo = document.querySelector("#ddl_pretraga_napon").value;
  if(naponNivo){
    if(cqlFilter === ""){
      cqlFilter += "napon ILIKE '%" + naponNivo + "%'";
    } else if(cqlFilter !== ""){
      cqlFilter += " AND napon ILIKE '%" + naponNivo + "%'";
    }
  }

  console.log("CQL FILTER", cqlFilter);
  if (cqlFilter === "") {
    ponistiFilter();
    return false;
  }

  if (tempLejerZaFilter) {
    map.getLayers().forEach(function (layer) {
      if (layer instanceof ol.layer.Image) {
        if (layer.get("visible")) {
          let params = layer.getSource().getParams();
          params.CQL_FILTER = "1=2";
          layer.getSource().updateParams(params);
        }
      }
    });
    
    let params = tempLejerZaFilter.getSource().getParams();
    params.CQL_FILTER = cqlFilter;
    tempLejerZaFilter.getSource().updateParams(params);
  } else {
    //Filtrirati sve lejere po prostornim uslovima, ako nije odabran nijedan lejer
    map.getLayers().forEach(function (layer) {
      if (layer instanceof ol.layer.Image) {
        console.log("Lejer", layer.values_.name);
        if (layer.get("visible")) {
          let params = layer.getSource().getParams();
          params.CQL_FILTER = cqlFilter;
          layer.getSource().updateParams(params);
        }
      }
    });
  }
}

document.querySelector("#btnFilter").addEventListener("click", filtriranje);

let nizPoljaZaPretragu = [
  { id: "pretraga_naziv_napojne_ts", field: "naziv_napojne", numeric: false, ddl: false },
  { id: "pretraga_sifra_napojne_ts", field: "sifra_napojne", numeric: false, ddl: false },
  { id: "pretraga_izvod_napojne_ts", field: "izvod_napojne", numeric: false, ddl: false },
  { id: "pretraga_gps", field: "gps", numeric: false, ddl: false },
  { id: "pretraga_broj", field: "broj", numeric: false, ddl: false },
  { id: "pretraga_tip", field: "tip", numeric: false, ddl: false },
  { id: "pretraga_vrsta_namjena", field: "vrsta_namjena", numeric: false, ddl: false },
  { id: "pretraga_vrsta_materijal", field: "vrsta_materijal", numeric: false, ddl: false },
  { id: "pretraga_vrsta_drvenog", field: "vrsta_drvenog", numeric: false, ddl: false },
  { id: "pretraga_nad_visina", field: "nad_visina", numeric: false, ddl: false },
  { id: "pretraga_visina", field: "visina", numeric: false, ddl: false },
  { id: "pretraga_rasp_prov", field: "rasp_prov", numeric: false, ddl: false },
  { id: "pretraga_izolator_vrsta", field: "izolator_vrsta", numeric: false, ddl: false },
  { id: "pretraga_izolator_funkcija", field: "izolator_funkcija", numeric: false, ddl: false },
  { id: "pretraga_br_izol_faza", field: "br_izol_faza", numeric: false, ddl: false },
  { id: "pretraga_tip_nosac_izol", field: "tip_nosac_izol", numeric: false, ddl: false },
  { id: "pretraga_odvodnik_prenapona", field: "odvodnik_prenapona", numeric: false, ddl: false },
  { id: "pretraga_uzemljivac", field: "uzemljivac", numeric: false, ddl: false },
  { id: "pretraga_uzemljivac_otpor", field: "uzemljivac_otpor", numeric: false, ddl: false },
  { id: "pretraga_optika", field: "optika", numeric: false, ddl: false },
  { id: "pretraga_rasvjeta", field: "rasvjeta", numeric: false, ddl: false },
  { id: "pretraga_br_pmo", field: "br_pmo", numeric: false, ddl: false },
  { id: "pretraga_br_nnv", field: "br_nnv", numeric: false, ddl: false },
  { id: "pretraga_pog_sprem", field: "pog_sprem", numeric: false, ddl: false },
  { id: "pretraga_vlasnistvo", field: "vlasnistvo", numeric: false, ddl: false },
  { id: "pretraga_napon", field: "napon", numeric: false, ddl: false },
  { id: "pretraga_prikljucak_otcjep", field: "prikljucak_otcjep", numeric: false, ddl: false },
  { id: "pretraga_nn_vod", field: "nn_vod", numeric: false, ddl: false },
  { id: "pretraga_rastavljac", field: "rastavljac", numeric: false, ddl: false },
  { id: "pretraga_10_vod", field: "10_vod", numeric: false, ddl: false },
  { id: "pretraga_naziv", field: "naziv", numeric: false, ddl: false },
  { id: "pretraga_ts", field: "ts", numeric: false, ddl: false },
  { id: "pretraga_br_faza", field: "br_faza", numeric: false, ddl: false },
  { id: "pretraga_vrsta", field: "vrsta", numeric: false, ddl: false },
  { id: "pretraga_presjek", field: "presjek", numeric: false, ddl: false },
  { id: "pretraga_br_spojnica", field: "br_spojnica", numeric: false, ddl: false },
  { id: "pretraga_god_izg", field: "god_izg", numeric: false, ddl: false },
  { id: "pretraga_uze_presjek", field: "uze_presjek", numeric: false, ddl: false },
  { id: "pretraga_uze", field: "uze", numeric: false, ddl: false },
  { id: "pretraga_br_nn_izvoda", field: "br_nn_izvoda", numeric: false, ddl: false },
  { id: "pretraga_celije_10", field: "celije_10", numeric: false, ddl: false },
  { id: "pretraga_projek_snaga", field: "projek_snaga", numeric: false, ddl: false },
  { id: "pretraga_inst_snaga_t1", field: "inst_snaga_t1", numeric: false, ddl: false },
  { id: "pretraga_inst_snaga_t2", field: "inst_snaga_t2", numeric: false, ddl: false },
  { id: "pretraga_inst_snaga_t3", field: "inst_snaga_t3", numeric: false, ddl: false },
  { id: "pretraga_inst_snaga_t4", field: "inst_snaga_t4", numeric: false, ddl: false },
  { id: "pretraga_prenos_odnos", field: "prenos_odnos", numeric: false, ddl: false },
  { id: "pretraga_izvod_celija", field: "izvod_celija", numeric: false, ddl: false },
  { id: "pretraga_funkcija", field: "funkcija", numeric: false, ddl: false },
  { id: "pretraga_id_billing", field: "id_billing", numeric: false, ddl: false },
  { id: "pretraga_id", field: "id", numeric: false, ddl: false },
  { id: "pretraga_osiguraci", field: "osiguraci", numeric: false, ddl: false },
  { id: "pretraga_montaza", field: "montaza", numeric: false, ddl: false },
  { id: "pretraga_vrata", field: "vrata", numeric: false, ddl: false },
  { id: "pretraga_br_izvoda", field: "br_izvoda", numeric: false, ddl: false },
  { id: "pretraga_br_prikljucaka", field: "br_prikljucaka", numeric: false, ddl: false },
];

/** Filtriranje po atributima */
function kreiranjeCqlFilteraAtributi() {
  let retVal = "";

  nizPoljaZaPretragu.forEach((el) => {
    let tempValue = document.querySelector("#" + el.id).value;
    tempValue !== "" && (retVal += `${el.field} = '${tempValue}' AND `);
  });

  retVal.length > 5 && (retVal = retVal.substring(0, retVal.length - 5));
  return retVal;
}

/**
 * Metoda koja prazni sva polja koja se koriste za filtriranje. Pokreće se na promjenu lejera koji se filtrira.
 */
function clearFilterFields() {
  nizPoljaZaPretragu.forEach((el) => {
    let tempField = document.querySelector("#" + el.id);
    tempField.value !== "" && (tempField.value = "");
  });
}

/**
 * Metoda koja poništava filter uslove za sve vidljive lejere. Ujedno prazni vrijednosti polja za pretragu.
 */
function ponistiFilter() {
  map.getLayers().forEach(function (layer) {
    if (layer instanceof ol.layer.Image) {
      console.log("Lejer", layer.values_.name);
      if (layer.get("visible")) {
        let params = layer.getSource().getParams();
        params.CQL_FILTER = "INCLUDE";
        layer.getSource().updateParams(params);
      }
    }
  });
}

function ponistiFilterMain() {
  tempLejerZaFilter = null;
  clearFilterFields();
  map.getLayers().forEach(function (layer) {
    if (layer instanceof ol.layer.Image) {
      console.log("Lejer", layer.values_.name);
      if (layer.get("visible")) {
        let params = layer.getSource().getParams();
        params.CQL_FILTER = "INCLUDE";
        layer.getSource().updateParams(params);
      }
    }
  });
  document.querySelector("#ddlLejer").value = "";
  document.querySelector("#ddl_pretraga_napon").value = "";
  document.querySelector("#pretragaTackeUdaljenost").value = "";
  document.querySelector("#pretragaTacke").checked = false;
  document.querySelector("#pretragaLinije").checked = false;
  document.querySelector("#pretragaPoligonObuhvata").checked = false;
  document.querySelector("#pretragaPoligonPresijeca").checked = false;
  sakrijSvaPoljaPretrage();
}

document.querySelector("#btnPonistiFilter").addEventListener("click", ponistiFilterMain);
