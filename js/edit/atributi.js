/**Metode za prikaz odgovarajućih polja atributDiv-a */
function sakrijSvaPoljaAtributDiv() {
  document.querySelector("#divUnosGps").style.display = "none";
  document.querySelector("#divUnosBroj").style.display = "none";
  document.querySelector("#divUnosSifra").style.display = "none";
  document.querySelector("#divUnosPripadnost").style.display = "none";
  document.querySelector("#divUnosTip").style.display = "none";
  document.querySelector("#divUnosNamjena").style.display = "none";
  document.querySelector("#divUnosMaterijal").style.display = "none";
  document.querySelector("#divUnosVrstaDrvenogStuba").style.display = "none";
  document.querySelector("#divUnosNadmorskaVisina").style.display = "none";
  document.querySelector("#divUnosVisina").style.display = "none";
  document.querySelector("#divUnosRasporedProvodnika").style.display = "none";
  document.querySelector("#divUnosIzolatorVrsta").style.display = "none";
  document.querySelector("#divUnosIzolatorFunkcija").style.display = "none";
  document.querySelector("#divUnosBrIzolFaza").style.display = "none";
  document.querySelector("#divUnosTipIzolatora").style.display = "none";
  document.querySelector("#divUnosNosaciIzolatora").style.display = "none";
  document.querySelector("#divUnosOdvodnikPrenapona").style.display = "none";
  document.querySelector("#divUnosUzemljivac").style.display = "none";
  document.querySelector("#divUnosOtporUzemljivaca").style.display = "none";
  document.querySelector("#divUnosOptika").style.display = "none";
  document.querySelector("#divUnosRasvjeta").style.display = "none";
  document.querySelector("#divUnosBrPmo").style.display = "none";
  document.querySelector("#divUnosBrNnv").style.display = "none";
  document.querySelector("#divUnosPogSprem").style.display = "none";
  document.querySelector("#divUnosVlasnistvo").style.display = "none";
  //document.querySelector("#divUnosOpstina").style.display = "none";
  document.querySelector("#divUnosNapon").style.display = "none";
  document.querySelector("#divUnosPrikljucakOtcjep").style.display = "none";
  document.querySelector("#divUnosNnVod").style.display = "none";
  document.querySelector("#divUnosRastavljac").style.display = "none";
  document.querySelector("#divUnos10KvVod").style.display = "none";

  document.querySelector("#divUnosDionica").style.display = "none";
  document.querySelector("#divUnosIdBr").style.display = "none";
  document.querySelector("#divUnosNaziv").style.display = "none";
  document.querySelector("#divUnosDionicaNn").style.display = "none";
  document.querySelector("#divUnosTs").style.display = "none";
  document.querySelector("#divUnosIzvodTs").style.display = "none";
  document.querySelector("#divUnosBrFaza").style.display = "none";
  document.querySelector("#divUnosVrsta").style.display = "none";
  document.querySelector("#divUnosPresjek").style.display = "none";
  document.querySelector("#divUnosBrSpojnica").style.display = "none";
  document.querySelector("#divUnosGodIzgr").style.display = "none";
  document.querySelector("#divUnosPocDion").style.display = "none";
  document.querySelector("#divUnosKrajDion").style.display = "none";
  document.querySelector("#divUnosUzePresjek").style.display = "none";
  document.querySelector("#divUnosUze").style.display = "none";
  document.querySelector("#divUnosZajednickaDion").style.display = "none";
  document.querySelector("#divUnosDionicaGPS").style.display = "none";
  document.querySelector("#divUnosRacDuzina").style.display = "none";
  document.querySelector("#divUnosDuzina").style.display = "none";
  document.querySelector("#divUnosBrojSpojnica").style.display = "none";
  document.querySelector("#divUnosSifraDionice").style.display = "none";

  document.querySelector("#divUnosBrNnIzvoda").style.display = "none";
  document.querySelector("#divUnosCelije10").style.display = "none";
  document.querySelector("#divUnosProjekSnaga").style.display = "none";
  document.querySelector("#divUnosInstSnaga1").style.display = "none";
  document.querySelector("#divUnosInstSnaga2").style.display = "none";
  document.querySelector("#divUnosInstSnaga3").style.display = "none";
  document.querySelector("#divUnosInstSnaga4").style.display = "none";
  document.querySelector("#divUnosPrenosOdnos").style.display = "none";
  document.querySelector("#divUnosIzvodCelija").style.display = "none";
  document.querySelector("#divUnosNapojnaTs").style.display = "none";
  document.querySelector("#divUnosFunkcija").style.display = "none";
  document.querySelector("#divUnosIdBilling").style.display = "none";

  document.querySelector("#divUnosBrVodCelVisiNap").style.display = "none";
  document.querySelector("#divUnosBrVodCelNiziNap").style.display = "none";

  document.querySelector("#divUnosSysId").style.display = "none";

  document.querySelector("#divUnosId").style.display = "none";
  document.querySelector("#divUnosOsiguraci").style.display = "none";
  document.querySelector("#divUnosBrPretplatnika").style.display = "none";
  document.querySelector("#divUnosTipPM").style.display = "none";

  document.querySelector("#divUnosMontaza").style.display = "none";
  document.querySelector("#divUnosVrata").style.display = "none";
  document.querySelector("#divUnosBrIzvoda").style.display = "none";
  document.querySelector("#divUnosBrPrikljucaka").style.display = "none";
}

function prikaziAtributDivStubove(napon) {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosBroj").style.display = "flex";
  document.querySelector("#divUnosSifra").style.display = "flex";
  document.querySelector("#divUnosPripadnost").style.display = "flex";
  document.querySelector("#divUnosTip").style.display = "flex";
  document.querySelector("#divUnosNamjena").style.display = "flex";
  document.querySelector("#divUnosMaterijal").style.display = "flex";
  document.querySelector("#divUnosVrstaDrvenogStuba").style.display = "flex";
  document.querySelector("#divUnosNadmorskaVisina").style.display = "flex";
  document.querySelector("#divUnosVisina").style.display = "flex";
  document.querySelector("#divUnosRasporedProvodnika").style.display = "flex";
  document.querySelector("#divUnosIzolatorVrsta").style.display = "flex";
  document.querySelector("#divUnosIzolatorFunkcija").style.display = "flex";
  document.querySelector("#divUnosBrIzolFaza").style.display = "flex";
  document.querySelector("#divUnosTipIzolatora").style.display = "flex";
  document.querySelector("#divUnosNosaciIzolatora").style.display = "flex";
  document.querySelector("#divUnosOdvodnikPrenapona").style.display = "flex";
  document.querySelector("#divUnosUzemljivac").style.display = "flex";
  document.querySelector("#divUnosOtporUzemljivaca").style.display = "flex";
  document.querySelector("#divUnosOptika").style.display = "flex";
  document.querySelector("#divUnosRasvjeta").style.display = "flex";
  document.querySelector("#divUnosBrPmo").style.display = "flex";
  document.querySelector("#divUnosBrNnv").style.display = "flex";
  document.querySelector("#divUnosPogSprem").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  //document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosPrikljucakOtcjep").style.display = "flex";
  document.querySelector("#divUnosNnVod").style.display = "flex";
  document.querySelector("#divUnosRastavljac").style.display = "flex";
  document.querySelector("#divUnos10KvVod").style.display = "flex";
  popuniListeZaStubove(napon);
}

function prikaziAtributDivVodove(napon) {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosTip").style.display = "flex";
  document.querySelector("#divUnosMaterijal").style.display = "flex";
  document.querySelector("#divUnosRasvjeta").style.display = "flex";
  document.querySelector("#divUnosPogSprem").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  //document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosDionica").style.display = "flex";
  document.querySelector("#divUnosIdBr").style.display = "flex";
  document.querySelector("#divUnosNaziv").style.display = "flex";
  document.querySelector("#divUnosDionicaNn").style.display = "flex";
  document.querySelector("#divUnosTs").style.display = "flex";
  document.querySelector("#divUnosIzvodTs").style.display = "flex";
  document.querySelector("#divUnosBrFaza").style.display = "flex";
  document.querySelector("#divUnosVrsta").style.display = "flex";
  document.querySelector("#divUnosPresjek").style.display = "flex";
  document.querySelector("#divUnosBrSpojnica").style.display = "flex";
  document.querySelector("#divUnosGodIzgr").style.display = "flex";
  document.querySelector("#divUnosPocDion").style.display = "flex";
  document.querySelector("#divUnosKrajDion").style.display = "flex";
  document.querySelector("#divUnosUzePresjek").style.display = "flex";
  document.querySelector("#divUnosUze").style.display = "flex";
  document.querySelector("#divUnosZajednickaDion").style.display = "flex";
  document.querySelector("#divUnosDionicaGPS").style.display = "flex";
  document.querySelector("#divUnosRacDuzina").style.display = "flex";
  document.querySelector("#divUnosDuzina").style.display = "flex";
  document.querySelector("#divUnosBrojSpojnica").style.display = "flex";
  document.querySelector("#divUnosSifraDionice").style.display = "flex";
  popuniListeZaVodove(napon);
}

function prikaziAtributDivTrafostanice(napon) {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosTip").style.display = "flex";
  document.querySelector("#divUnosNaziv").style.display = "flex";
  document.querySelector("#divUnosGodIzgr").style.display = "flex";
  document.querySelector("#divUnosPogSprem").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  //document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosBrNnIzvoda").style.display = "flex";
  document.querySelector("#divUnosCelije10").style.display = "flex";
  document.querySelector("#divUnosProjekSnaga").style.display = "flex";
  document.querySelector("#divUnosInstSnaga1").style.display = "flex";
  document.querySelector("#divUnosInstSnaga2").style.display = "flex";
  document.querySelector("#divUnosInstSnaga3").style.display = "flex";
  document.querySelector("#divUnosInstSnaga4").style.display = "flex";
  document.querySelector("#divUnosPrenosOdnos").style.display = "flex";
  document.querySelector("#divUnosIzvodCelija").style.display = "flex";
  document.querySelector("#divUnosNapojnaTs").style.display = "flex";
  document.querySelector("#divUnosFunkcija").style.display = "flex";
  document.querySelector("#divUnosIdBilling").style.display = "flex";
  document.querySelector("#divUnosNadmorskaVisina").style.display = "flex";
  document.querySelector("#divUnosBrVodCelVisiNap").style.display = "flex";
  document.querySelector("#divUnosBrVodCelNiziNap").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosIdBr").style.display = "flex";
  popuniListeZaTrafostanice(napon);
}

function prikaziAtributDivPrikljucnoMjesto() {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosNapojnaTs").style.display = "flex";
  document.querySelector("#divUnosIzvodTs").style.display = "flex";
  document.querySelector("#divUnosId").style.display = "flex";
  //document.querySelector("#divUnosTip").style.display = "flex";
  document.querySelector("#divUnosOsiguraci").style.display = "flex";
  document.querySelector("#divUnosBrPretplatnika").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  //document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosSysId").style.display = "flex";
  document.querySelector("#divUnosTipPM").style.display = "flex";
  popuniListeZaPrikljucnaMjesta();
}

function prikaziAtributDivNkro() {
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosTs").style.display = "flex";
  document.querySelector("#divUnosIzvodTs").style.display = "flex";
  document.querySelector("#divUnosId").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  //document.querySelector("#divUnosOpstina").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosMontaza").style.display = "flex";
  document.querySelector("#divUnosVrata").style.display = "flex";
  document.querySelector("#divUnosBrIzvoda").style.display = "flex";
  document.querySelector("#divUnosBrPrikljucaka").style.display = "flex";
  document.querySelector("#divUnosSysId").style.display = "flex";
  popuniListeZaNkro();
}
