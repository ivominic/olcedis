/**Metode za pretragu lejera */

document.querySelector("#ddlLejer").addEventListener("change", function () {
  sakrijSvaPoljaPretrage();
  if (this.value === Lejeri.Stubovi) {
    prikaziPretraguStubove();
  } else if (this.value === Lejeri.Vodovi) {
    prikaziPretraguVodove();
  } else if (this.value === Lejeri.Trafostanice) {
    prikaziPretraguTrafostanice();
  } else if (this.value === Lejeri.NKRO) {
    prikaziPretraguNkro();
  } else if (this.value === Lejeri.PrikljucnoMjesto) {
    prikaziPretraguPrikljucnoMjesto();
  } else if (this.value === Lejeri.Potrosac) {
    prikaziPretraguPotrosaci();
  } else if (this.value === Lejeri.POD) {
    prikaziPretraguPodovi();
  } else if (this.value === Lejeri.NelegalniPotrosac) {
    prikaziPretraguNelegalniPotrosaci();
  }
});

function sakrijSvaPoljaPretrage() {
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
  document.querySelector("#divPretragaIzvodTs").style.display = "none";
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
  document.querySelector("#divPretragaDionica").style.display = "none";

  document.querySelector("#divPretragaMontaza").style.display = "none";
  document.querySelector("#divPretragaVrata").style.display = "none";
  document.querySelector("#divPretragaBrIzvoda").style.display = "none";
  document.querySelector("#divPretragaBrPrikljucaka").style.display = "none";
}
sakrijSvaPoljaPretrage();

function prikaziPretraguStubove() {
  document.querySelector("#divPretragaGps").style.display = "flex";
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
  document.querySelector("#divPretragaOptika").style.display = "flex";
  document.querySelector("#divPretragaRasvjeta").style.display = "flex";
  document.querySelector("#divPretragaBrPmo").style.display = "flex";
  document.querySelector("#divPretragaBrNnv").style.display = "flex";
  document.querySelector("#divPretragaPogSprem").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaPrikljucakOtcjep").style.display = "flex";
  document.querySelector("#divPretragaNnVod").style.display = "flex";
  document.querySelector("#divPretragaRastavljac").style.display = "flex";
  document.querySelector("#divPretraga10KvVod").style.display = "flex";
}

function prikaziPretraguVodove() {
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaTip").style.display = "flex";
  document.querySelector("#divPretragaMaterijal").style.display = "flex";
  document.querySelector("#divPretragaRasvjeta").style.display = "flex";
  document.querySelector("#divPretragaPogSprem").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNaziv").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaIzvodTs").style.display = "flex";
  document.querySelector("#divPretragaBrFaza").style.display = "flex";
  document.querySelector("#divPretragaVrsta").style.display = "flex";
  document.querySelector("#divPretragaPresjek").style.display = "flex";
  document.querySelector("#divPretragaBrSpojnica").style.display = "flex";
  document.querySelector("#divPretragaGodIzgr").style.display = "flex";
  document.querySelector("#divPretragaUzePresjek").style.display = "flex";
  document.querySelector("#divPretragaUze").style.display = "flex";
}

function prikaziPretraguTrafostanice() {
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
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaIzvodTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaTip").style.display = "flex";
  document.querySelector("#divPretragaOsiguraci").style.display = "none";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
}

function prikaziPretraguNkro() {
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaIzvodTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaMontaza").style.display = "flex";
  document.querySelector("#divPretragaVrata").style.display = "flex";
  document.querySelector("#divPretragaBrIzvoda").style.display = "flex";
  document.querySelector("#divPretragaBrPrikljucaka").style.display = "flex";
}

function prikaziPretraguPotrosaci() {
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaIzvodTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
}

function prikaziPretraguPodovi() {
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaIzvodTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
}

function prikaziPretraguNelegalniPotrosaci() {
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaIzvodTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
}

/* Filter wms-a po prostornim i atributskim podacima*/
function filtriranje() {
  let rasterLayer = podesiLejerZaPretragu();
  let prostorniFilter = kreiranjeCqlFilteraProstorno();
  let atributniFilter = kreiranjeCqlFilteraAtributi();
  if (prostorniFilter !== "" && atributniFilter !== "") {
    cqlFilter = "(" + prostorniFilter + ") AND " + atributniFilter;
  } else {
    cqlFilter = prostorniFilter + atributniFilter;
  }
  console.log("CQL FILTER", cqlFilter);
  if (cqlFilter === "") {
    return false;
  }

  if (rasterLayer) {
    let params = rasterLayer.getSource().getParams();
    params.CQL_FILTER = cqlFilter;
    rasterLayer.getSource().updateParams(params);
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

function podesiLejerZaPretragu() {
  let ddlValue = document.querySelector("#ddlLejer").value;

  if (ddlValue === "stubovi") {
    return wmsStubovi;
  }
  if (ddlValue === "vodovi") {
    return wmsVodovi;
  }
  if (ddlValue === "trafostanice") {
    return wmsTrafostanice;
  }
  if (ddlValue === "prikljucno_mjesto") {
    return wmsPrikljucnoMjesto;
  }
  if (ddlValue === "nkro") {
    return wmsNKRO;
  }
}

/** Filtriranje po atributima */
function kreiranjeCqlFilteraAtributi() {
  let retVal = "";

  document.querySelector("#pretraga_gps").value !== "" &&
    (retVal += "gps = '" + document.querySelector("#pretraga_gps").value + "' AND ");
  document.querySelector("#pretraga_broj").value !== "" &&
    (retVal += "broj = '" + document.querySelector("#pretraga_broj").value + "' AND ");
  document.querySelector("#pretraga_tip").value !== "" &&
    (retVal += "tip = '" + document.querySelector("#pretraga_tip").value + "' AND ");
  document.querySelector("#pretraga_vrsta_namjena").value !== "" &&
    (retVal += "vrsta_namjena = '" + document.querySelector("#pretraga_vrsta_namjena").value + "' AND ");
  document.querySelector("#pretraga_vrsta_materijal").value !== "" &&
    (retVal += "vrsta_materijal = '" + document.querySelector("#pretraga_vrsta_materijal").value + "' AND ");
  document.querySelector("#pretraga_vrsta_drvenog").value !== "" &&
    (retVal += "vrsta_drvenog = '" + document.querySelector("#pretraga_vrsta_drvenog").value + "' AND ");
  document.querySelector("#pretraga_nad_visina").value !== "" &&
    (retVal += "nad_visina = '" + document.querySelector("#pretraga_nad_visina").value + "' AND ");
  document.querySelector("#pretraga_visina").value !== "" &&
    (retVal += "visina = '" + document.querySelector("#pretraga_visina").value + "' AND ");
  document.querySelector("#pretraga_rasp_prov").value !== "" &&
    (retVal += "rasp_prov = '" + document.querySelector("#pretraga_rasp_prov").value + "' AND ");
  document.querySelector("#pretraga_izolator_vrsta").value !== "" &&
    (retVal += "izolator_vrsta = '" + document.querySelector("#pretraga_izolator_vrsta").value + "' AND ");
  document.querySelector("#pretraga_izolator_funkcija").value !== "" &&
    (retVal += "izolator_funkcija = '" + document.querySelector("#pretraga_izolator_funkcija").value + "' AND ");
  document.querySelector("#pretraga_br_izol_faza").value !== "" &&
    (retVal += "br_izol_faza = '" + document.querySelector("#pretraga_br_izol_faza").value + "' AND ");
  document.querySelector("#pretraga_odvodnik_prenapona").value !== "" &&
    (retVal += "odvodnik_prenapona = '" + document.querySelector("#pretraga_odvodnik_prenapona").value + "' AND ");
  document.querySelector("#pretraga_uzemljivac").value !== "" &&
    (retVal += "uzemljivac = '" + document.querySelector("#pretraga_uzemljivac").value + "' AND ");
  document.querySelector("#pretraga_uzemljivac_otpor").value !== "" &&
    (retVal += "uzemljivac_otpor = '" + document.querySelector("#pretraga_uzemljivac_otpor").value + "' AND ");
  document.querySelector("#pretraga_optika").value !== "" &&
    (retVal += "optika = '" + document.querySelector("#pretraga_optika").value + "' AND ");
  document.querySelector("#pretraga_rasvjeta").value !== "" &&
    (retVal += "rasvjeta = '" + document.querySelector("#pretraga_rasvjeta").value + "' AND ");
  document.querySelector("#pretraga_br_pmo").value !== "" &&
    (retVal += "br_pmo = '" + document.querySelector("#pretraga_br_pmo").value + "' AND ");
  document.querySelector("#pretraga_br_nnv").value !== "" &&
    (retVal += "br_nnv = '" + document.querySelector("#pretraga_br_nnv").value + "' AND ");
  document.querySelector("#pretraga_pog_sprem").value !== "" &&
    (retVal += "pog_sprem = '" + document.querySelector("#pretraga_pog_sprem").value + "' AND ");
  document.querySelector("#pretraga_vlasnistvo").value !== "" &&
    (retVal += "vlasnistvo = '" + document.querySelector("#pretraga_vlasnistvo").value + "' AND ");
  document.querySelector("#pretraga_napon").value !== "" &&
    (retVal += "napon = '" + document.querySelector("#pretraga_napon").value + "' AND ");
  document.querySelector("#pretraga_prikljucak_otcjep").value !== "" &&
    (retVal += "prikljucak_otcjep = '" + document.querySelector("#pretraga_prikljucak_otcjep").value + "' AND ");
  document.querySelector("#pretraga_nn_vod").value !== "" &&
    (retVal += "nn_vod = '" + document.querySelector("#pretraga_nn_vod").value + "' AND ");
  document.querySelector("#pretraga_rastavljac").value !== "" &&
    (retVal += "rastavljac = '" + document.querySelector("#pretraga_rastavljac").value + "' AND ");
  document.querySelector("#pretraga_10_vod").value !== "" &&
    (retVal += "10_vod = '" + document.querySelector("#pretraga_10_vod").value + "' AND ");

  retVal.length > 5 && (retVal = retVal.substring(0, retVal.length - 5));
  return retVal;
}
