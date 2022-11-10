/**Metode za pretragu lejera */

document.querySelector("#ddlLejer").addEventListener("change", function () {
  sakrijSvaPoljaPretrage();
  if (this.value === "stubovi") {
    prikaziPretraguStubove();
  } else if (this.value === "vodovi") {
    prikaziPretraguVodove();
  } else if (this.value === "trafostanice") {
    prikaziPretraguTrafostanice();
  } else if (this.value === "prikljucno_mjesto") {
    prikaziPretraguPrikljucnoMjesto();
  } else if (this.value === "nkro") {
    prikaziPretraguNkro();
  }
});

function sakrijSvaPoljaPretrage() {
  document.querySelector("#divPretragaGps").style.display = "none";
  document.querySelector("#divPretragaBroj").style.display = "none";
  document.querySelector("#divPretragaSifra").style.display = "none";
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
  document.querySelector("#divPretragaOpstina").style.display = "none";
  document.querySelector("#divPretragaNapon").style.display = "none";
  document.querySelector("#divPretragaPrikljucakOtcjep").style.display = "none";
  document.querySelector("#divPretragaNnVod").style.display = "none";
  document.querySelector("#divPretragaRastavljac").style.display = "none";
  document.querySelector("#divPretraga10KvVod").style.display = "none";

  document.querySelector("#divPretragaDionica").style.display = "none";
  document.querySelector("#divPretragaIdBr").style.display = "none";
  document.querySelector("#divPretragaNaziv").style.display = "none";
  document.querySelector("#divPretragaDionicaNn").style.display = "none";
  document.querySelector("#divPretragaTs").style.display = "none";
  document.querySelector("#divPretragaIzvodTs").style.display = "none";
  document.querySelector("#divPretragaBrFaza").style.display = "none";
  document.querySelector("#divPretragaVrsta").style.display = "none";
  document.querySelector("#divPretragaPresjek").style.display = "none";
  document.querySelector("#divPretragaBrSpojnica").style.display = "none";
  document.querySelector("#divPretragaGodIzgr").style.display = "none";
  document.querySelector("#divPretragaPocDion").style.display = "none";
  document.querySelector("#divPretragaKrajDion").style.display = "none";
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
  document.querySelector("#divPretragaNapojnaTs").style.display = "none";
  document.querySelector("#divPretragaFunkcija").style.display = "none";
  document.querySelector("#divPretragaIdBilling").style.display = "none";

  document.querySelector("#divPretragaId").style.display = "none";
  document.querySelector("#divPretragaOsiguraci").style.display = "none";
  document.querySelector("#divPretragaBrPretplatnika").style.display = "none";

  document.querySelector("#divPretragaMontaza").style.display = "none";
  document.querySelector("#divPretragaVrata").style.display = "none";
  document.querySelector("#divPretragaBrIzvoda").style.display = "none";
  document.querySelector("#divPretragaBrPrikljucaka").style.display = "none";
}

function prikaziPretraguStubove() {
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaBroj").style.display = "flex";
  document.querySelector("#divPretragaSifra").style.display = "flex";
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
  document.querySelector("#divPretragaOpstina").style.display = "flex";
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
  document.querySelector("#divPretragaOpstina").style.display = "flex";
  document.querySelector("#divPretragaDionica").style.display = "flex";
  document.querySelector("#divPretragaIdBr").style.display = "flex";
  document.querySelector("#divPretragaNaziv").style.display = "flex";
  document.querySelector("#divPretragaDionicaNn").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaIzvodTs").style.display = "flex";
  document.querySelector("#divPretragaBrFaza").style.display = "flex";
  document.querySelector("#divPretragaVrsta").style.display = "flex";
  document.querySelector("#divPretragaPresjek").style.display = "flex";
  document.querySelector("#divPretragaBrSpojnica").style.display = "flex";
  document.querySelector("#divPretragaGodIzgr").style.display = "flex";
  document.querySelector("#divPretragaPocDion").style.display = "flex";
  document.querySelector("#divPretragaKrajDion").style.display = "flex";
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
  document.querySelector("#divPretragaOpstina").style.display = "flex";
  document.querySelector("#divPretragaBrNnIzvoda").style.display = "flex";
  document.querySelector("#divPretragaCelije10").style.display = "flex";
  document.querySelector("#divPretragaProjekSnaga").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga1").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga2").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga3").style.display = "flex";
  document.querySelector("#divPretragaInstSnaga4").style.display = "flex";
  document.querySelector("#divPretragaPrenosOdnos").style.display = "flex";
  document.querySelector("#divPretragaIzvodCelija").style.display = "flex";
  document.querySelector("#divPretragaNapojnaTs").style.display = "flex";
  document.querySelector("#divPretragaFunkcija").style.display = "flex";
  document.querySelector("#divPretragaIdBilling").style.display = "flex";
}

function prikaziPretraguPrikljucnoMjesto() {
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaNapojnaTs").style.display = "flex";
  document.querySelector("#divPretragaIzvodTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaTip").style.display = "flex";
  document.querySelector("#divPretragaOsiguraci").style.display = "none";
  document.querySelector("#divPretragaBrPretplatnika").style.display = "none";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaOpstina").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
}

function prikaziPretraguNkro() {
  document.querySelector("#divPretragaGps").style.display = "flex";
  document.querySelector("#divPretragaTs").style.display = "flex";
  document.querySelector("#divPretragaIzvodTs").style.display = "flex";
  document.querySelector("#divPretragaId").style.display = "flex";
  document.querySelector("#divPretragaVlasnistvo").style.display = "flex";
  document.querySelector("#divPretragaOpstina").style.display = "flex";
  document.querySelector("#divPretragaNapon").style.display = "flex";
  document.querySelector("#divPretragaMontaza").style.display = "flex";
  document.querySelector("#divPretragaVrata").style.display = "flex";
  document.querySelector("#divPretragaBrIzvoda").style.display = "flex";
  document.querySelector("#divPretragaBrPrikljucaka").style.display = "flex";
}
