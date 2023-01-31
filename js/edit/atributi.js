/**Metode za prikaz odgovarajućih polja atributDiv-a u zavisnosti od odabranog sloja podataka*/

function sakrijSvaPoljaAtributDiv() {
  document.querySelector("#divUnosNazivNapojne").style.display = "none";
  document.querySelector("#divUnosSifraNapojne").style.display = "none";
  document.querySelector("#divUnosIzvodNapojne").style.display = "none";
  document.querySelector("#divUnosGps").style.display = "none";
  document.querySelector("#divUnosFid1").style.display = "none";
  document.querySelector("#divUnosName").style.display = "none";
  document.querySelector("#divUnosBroj").style.display = "none";
  document.querySelector("#divUnosTip").style.display = "none";
  document.querySelector("#divUnosTipStub").style.display = "none";
  document.querySelector("#divUnosNamjena").style.display = "none";
  document.querySelector("#divUnosNamjenaStub04").style.display = "none";
  document.querySelector("#divUnosNamjenaStub10").style.display = "none";
  document.querySelector("#divUnosNamjenaStub35").style.display = "none";
  document.querySelector("#divUnosMaterijal").style.display = "none";
  document.querySelector("#divUnosMaterijalStub04").style.display = "none";
  document.querySelector("#divUnosMaterijalStub10").style.display = "none";
  document.querySelector("#divUnosMaterijalStub35").style.display = "none";
  document.querySelector("#divUnosVrstaDrvenogStuba04").style.display = "none";
  document.querySelector("#divUnosVrstaDrvenogStuba10").style.display = "none";
  document.querySelector("#divUnosVrstaDrvenogStuba35").style.display = "none";
  document.querySelector("#divUnosNadmorskaVisina").style.display = "none";
  document.querySelector("#divUnosVisina").style.display = "none";
  document.querySelector("#divUnosRasporedProvodnika").style.display = "none";
  document.querySelector("#divUnosIzolatorVrsta").style.display = "none";
  document.querySelector("#divUnosIzolatorVrstaStub04").style.display = "none";
  document.querySelector("#divUnosIzolatorVrstaStub10").style.display = "none";
  document.querySelector("#divUnosIzolatorVrstaStub35").style.display = "none";
  document.querySelector("#divUnosIzolatorFunkcija").style.display = "none";
  document.querySelector("#divUnosIzolatorFunkcijaStub04").style.display = "none";
  document.querySelector("#divUnosIzolatorFunkcijaStub10").style.display = "none";
  document.querySelector("#divUnosIzolatorFunkcijaStub35").style.display = "none";
  document.querySelector("#divUnosBrIzolFaza").style.display = "none";
  document.querySelector("#divUnosTipIzolatora").style.display = "none";
  document.querySelector("#divUnosTipIzolatoraStub04").style.display = "none";
  document.querySelector("#divUnosTipIzolatoraStub10").style.display = "none";
  document.querySelector("#divUnosTipIzolatoraStub35").style.display = "none";
  document.querySelector("#divUnosNosaciIzolatora").style.display = "none";
  document.querySelector("#divUnosNosaciIzolatoraStub04").style.display = "none";
  document.querySelector("#divUnosNosaciIzolatoraStub10").style.display = "none";
  document.querySelector("#divUnosNosaciIzolatoraStub35").style.display = "none";
  document.querySelector("#divUnosOdvodnikPrenapona").style.display = "none";
  document.querySelector("#divUnosOdvodnikPrenaponaStub04").style.display = "none";
  document.querySelector("#divUnosOdvodnikPrenaponaStub10").style.display = "none";
  document.querySelector("#divUnosOdvodnikPrenaponaStub35").style.display = "none";
  document.querySelector("#divUnosUzemljivac").style.display = "none";
  document.querySelector("#divUnosUzemljivacStub04").style.display = "none";
  document.querySelector("#divUnosUzemljivacStub10").style.display = "none";
  document.querySelector("#divUnosUzemljivacStub35").style.display = "none";
  document.querySelector("#divUnosOtporUzemljivaca").style.display = "none";
  document.querySelector("#divUnosOptika").style.display = "none";
  document.querySelector("#divUnosRasvjeta").style.display = "none";
  document.querySelector("#divUnosRasvjetaStub").style.display = "none";
  document.querySelector("#divUnosBrPmo").style.display = "none";
  document.querySelector("#divUnosBrNnv").style.display = "none";
  document.querySelector("#divUnosBrNnvKablovski").style.display = "none";
  document.querySelector("#divUnosBr10kVVodova").style.display = "none";
  document.querySelector("#divUnosBr10kVVodovaKablovski").style.display = "none";
  document.querySelector("#divUnosBr35kVVodova").style.display = "none";
  document.querySelector("#divUnosBr35kVVodovaKablovski").style.display = "none";
  document.querySelector("#divUnosPogSprem").style.display = "none";
  document.querySelector("#divUnosVlasnistvo").style.display = "none";
  document.querySelector("#divUnosOpstina").style.display = "none";
  document.querySelector("#divUnosNapon").style.display = "none";
  document.querySelector("#divUnosPrikljucakOtcjep").style.display = "none";
  document.querySelector("#divUnosPrikljucakOtcjepStub10").style.display = "none";
  document.querySelector("#divUnosPrikljucakOtcjepStub35").style.display = "none";
  document.querySelector("#divUnosOptikaStub04").style.display = "none";
  document.querySelector("#divUnosOptikaStub35").style.display = "none";
  document.querySelector("#divUnosNnVod").style.display = "none";
  document.querySelector("#divUnosNnVodStub").style.display = "none";
  document.querySelector("#divUnosNnVodStub10").style.display = "none";
  document.querySelector("#divUnosRastavljac").style.display = "none";
  document.querySelector("#divUnosRastavljacStub10").style.display = "none";
  document.querySelector("#divUnosRastavljacStub35").style.display = "none";
  document.querySelector("#divUnos10KvVod").style.display = "none";
  document.querySelector("#divUnosMaterijalStub04").style.display = "none";
  document.querySelector("#divUnosMaterijalStub10").style.display = "none";
  document.querySelector("#divUnosMaterijalStub35").style.display = "none";

  document.querySelector("#divUnosTipVod04").style.display = "none";
  document.querySelector("#divUnosTipVod10").style.display = "none";
  document.querySelector("#divUnosTipVod35").style.display = "none";
  document.querySelector("#divUnosNaziv").style.display = "none";
  document.querySelector("#divUnosBrFaza").style.display = "none";
  document.querySelector("#divUnosVrsta").style.display = "none";
  document.querySelector("#divUnosVrstaVod04").style.display = "none";
  document.querySelector("#divUnosVrstaVod10").style.display = "none";
  document.querySelector("#divUnosVrstaVod35").style.display = "none";
  document.querySelector("#divUnosPresjek").style.display = "none";
  document.querySelector("#divUnosPresjekVod04").style.display = "none";
  document.querySelector("#divUnosPresjekVod10").style.display = "none";
  document.querySelector("#divUnosPresjekVod35").style.display = "none";
  document.querySelector("#divUnosMaterijalVod04").style.display = "none";
  document.querySelector("#divUnosMaterijalVod10").style.display = "none";
  document.querySelector("#divUnosMaterijalVod35").style.display = "none";
  document.querySelector("#divUnosBrSpojnica").style.display = "none";
  document.querySelector("#divUnosGodIzgr").style.display = "none";
  document.querySelector("#divUnosRasvjetaVod").style.display = "none";
  document.querySelector("#divUnosUzePresjek").style.display = "none";
  document.querySelector("#divUnosUzePresjekVod35").style.display = "none";
  document.querySelector("#divUnosUze").style.display = "none";
  document.querySelector("#divUnosUzeVod10").style.display = "none";
  document.querySelector("#divUnosUzeVod35").style.display = "none";
  document.querySelector("#divUnosRacDuzina").style.display = "none";
  document.querySelector("#divUnosDuzina").style.display = "none";
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
  document.querySelector("#divUnosFunkcija").style.display = "none";
  document.querySelector("#divUnosIdBilling").style.display = "none";

  //Read only polja za trafostanice. Kasnije dodato.
  document.querySelector("#divUnosDdlTrafostanice").style.display = "none";
  document.querySelector("#divReadFid1").style.display = "none";
  document.querySelector("#divReadName").style.display = "none";
  document.querySelector("#divReadCelije10").style.display = "none";
  document.querySelector("#divReadIzvodCelija").style.display = "none";
  document.querySelector("#divReadFunkcija").style.display = "none";
  document.querySelector("#divReadBrNnIzvoda").style.display = "none";
  document.querySelector("#divReadGeohashId").style.display = "none";
  document.querySelector("#divReadGeohashIdNo").style.display = "none";
  document.querySelector("#divReadBrVodCelNiziNap").style.display = "none";
  document.querySelector("#divReadBrVodCelVisiNap").style.display = "none";
  document.querySelector("#divReadGodIzg").style.display = "none";
  document.querySelector("#divReadVlasnistvo").style.display = "none";
  document.querySelector("#divReadDatumAzuriranja").style.display = "none";
  document.querySelector("#divReadNadVis").style.display = "none";
  document.querySelector("#divReadGPS").style.display = "none";
  document.querySelector("#divReadPogSprem").style.display = "none";
  document.querySelector("#divReadNapon").style.display = "none";
  document.querySelector("#divReadPosjedujeSliku").style.display = "none";
  document.querySelector("#divReadOriginalId").style.display = "none";
  document.querySelector("#divReadKorisnik").style.display = "none";
  document.querySelector("#divReadVlasnik").style.display = "none";
  document.querySelector("#divReadKatastar").style.display = "none";
  document.querySelector("#divReadIdTrafostanice").style.display = "none";
  document.querySelector("#divReadOpstina").style.display = "none";
  document.querySelector("#divReadRegion").style.display = "none";
  document.querySelector("#divReadNazivNapojne").style.display = "none";
  document.querySelector("#divReadSifraNapojne").style.display = "none";
  document.querySelector("#divReadIzvodNapojne").style.display = "none";
  document.querySelector("#divReadPrenosOdnos").style.display = "none";
  document.querySelector("#divReadIdBilling").style.display = "none";
  document.querySelector("#divReadAdresa").style.display = "none";
  document.querySelector("#divReadTip").style.display = "none";
  document.querySelector("#divReadNaziv").style.display = "none";
  document.querySelector("#divReadInstSnagaT1").style.display = "none";
  document.querySelector("#divReadInstSnagaT2").style.display = "none";
  document.querySelector("#divReadInstSnagaT3").style.display = "none";
  document.querySelector("#divReadInstSnagaT4").style.display = "none";
  document.querySelector("#divReadProjekSnaga").style.display = "none";
  document.querySelector("#divReadTabela").style.display = "none";

  document.querySelector("#divUnosBrVodCelVisiNap").style.display = "none";
  document.querySelector("#divUnosBrVodCelNiziNap").style.display = "none";

  document.querySelector("#divUnosId").style.display = "none";
  document.querySelector("#divUnosIdPotrosac").style.display = "none";
  document.querySelector("#divUnosOsiguraci").style.display = "none";
  document.querySelector("#divUnosTipPM").style.display = "none";

  document.querySelector("#divUnosPrikKabal").style.display = "none";
  document.querySelector("#divUnosPod").style.display = "none";
  document.querySelector("#divUnosAdresaMm").style.display = "none";
  document.querySelector("#divUnosPrikMjesto").style.display = "none";
  document.querySelector("#divUnosNazivNnIzvod").style.display = "none";
  document.querySelector("#divUnosPretplatniBr").style.display = "none";
  document.querySelector("#divUnosBrBrojila").style.display = "none";

  document.querySelector("#divUnosMontaza").style.display = "none";
  document.querySelector("#divUnosVrata").style.display = "none";
  document.querySelector("#divUnosBrIzvoda").style.display = "none";
  document.querySelector("#divUnosBrPrikljucaka").style.display = "none";

  //Nelegalni potrošači
  document.querySelector("#divReadNpAdresa").style.display = "none";
  document.querySelector("#divReadNpBrojBrojila").style.display = "none";
  document.querySelector("#divReadNpBrojPlombe").style.display = "none";
  document.querySelector("#divReadNpBrojTelefona").style.display = "none";
  document.querySelector("#divReadNpBrojZapisnika").style.display = "none";
  document.querySelector("#divReadNpDatumKontrole").style.display = "none";
  document.querySelector("#divReadNpJMB").style.display = "none";
  document.querySelector("#divReadNpKontroluIzvrsio1").style.display = "none";
  document.querySelector("#divReadNpKontroluIzvrsio2").style.display = "none";
  document.querySelector("#divReadNpKontroluIzvrsio3").style.display = "none";
  document.querySelector("#divReadNpNazivPotrosaca").style.display = "none";
  document.querySelector("#divReadNpNazivTs").style.display = "none";
  document.querySelector("#divReadNpOpstina").style.display = "none";
  document.querySelector("#divReadNpPotrosacIskljucen").style.display = "none";
  document.querySelector("#divReadNpPretplatniBroj").style.display = "none";
  document.querySelector("#divReadNpProizvodjac").style.display = "none";
  document.querySelector("#divReadNpRegion").style.display = "none";
  document.querySelector("#divReadNpSifraTs").style.display = "none";
  document.querySelector("#divReadNpStanjeMt").style.display = "none";
  document.querySelector("#divReadNpStanjeVt").style.display = "none";
  document.querySelector("#divReadNpStatusPotrosaca").style.display = "none";
  document.querySelector("#divReadNpTipBrojila").style.display = "none";

  //Poslovni objekti
  document.querySelector("#divReadPoAdresa").style.display = "none";
  document.querySelector("#divReadPoBrojKatastarskeParcele").style.display = "none";
  document.querySelector("#divReadPoGodIzg").style.display = "none";
  document.querySelector("#divReadPoImeKatastarskeOpstine").style.display = "none";
  document.querySelector("#divReadPoKatastar").style.display = "none";
  document.querySelector("#divReadPoNadleznost").style.display = "none";
  document.querySelector("#divReadPoName").style.display = "none";
  document.querySelector("#divReadPoNapomena").style.display = "none";
  document.querySelector("#divReadPoObimPrava").style.display = "none";
  document.querySelector("#divReadPoObjekat").style.display = "none";
  document.querySelector("#divReadPoOpstina").style.display = "none";
  document.querySelector("#divReadPoPovrsina").style.display = "none";
  document.querySelector("#divReadPoRegion").style.display = "none";
  document.querySelector("#divReadPoVlasnistvo").style.display = "none";

  //Odbijene validacije
  document.querySelector("#divReadOdbijeniName").style.display = "none";
  document.querySelector("#divReadOdbijeniDatumAzuriranja").style.display = "none";
  document.querySelector("#divReadOdbijeniTip").style.display = "none";
  document.querySelector("#divReadOdbijeniKorisnik").style.display = "none";
}

function prikaziAtributDivStubove(napon) {
  document.querySelector("#divUnosNazivNapojne").style.display = "flex";
  document.querySelector("#divUnosSifraNapojne").style.display = "flex";
  document.querySelector("#divUnosIzvodNapojne").style.display = "flex";
  document.querySelector("#divUnosName").style.display = "flex";
  if (napon === NaponskiNivo.String04kV) {
    document.querySelector("#divUnosRasvjetaStub").style.display = "flex";
    document.querySelector("#divUnosNamjenaStub04").style.display = "flex";
    document.querySelector("#divUnosVrstaDrvenogStuba04").style.display = "flex";
    document.querySelector("#divUnosIzolatorVrstaStub04").style.display = "flex";
    document.querySelector("#divUnosIzolatorFunkcijaStub04").style.display = "flex";
    document.querySelector("#divUnosTipIzolatoraStub04").style.display = "flex";
    document.querySelector("#divUnosNosaciIzolatoraStub04").style.display = "flex";
    document.querySelector("#divUnosOdvodnikPrenaponaStub04").style.display = "flex";
    document.querySelector("#divUnosUzemljivacStub04").style.display = "flex";
    document.querySelector("#divUnosOptikaStub04").style.display = "flex";
    document.querySelector("#divUnosBrPmo").style.display = "flex";
    document.querySelector("#divUnosBrNnv").style.display = "flex";
    document.querySelector("#divUnosBrNnvKablovski").style.display = "flex";
    document.querySelector("#divUnosMaterijalStub04").style.display = "flex";
  }
  if (napon === NaponskiNivo.String10kV) {
    document.querySelector("#divUnosNamjenaStub10").style.display = "flex";
    document.querySelector("#divUnosVrstaDrvenogStuba10").style.display = "flex";
    document.querySelector("#divUnosIzolatorVrstaStub10").style.display = "flex";
    document.querySelector("#divUnosIzolatorFunkcijaStub10").style.display = "flex";
    document.querySelector("#divUnosTipIzolatoraStub10").style.display = "flex";
    document.querySelector("#divUnosNosaciIzolatoraStub10").style.display = "flex";
    document.querySelector("#divUnosOdvodnikPrenaponaStub10").style.display = "flex";
    document.querySelector("#divUnosUzemljivacStub10").style.display = "flex";
    document.querySelector("#divUnosNnVodStub10").style.display = "flex";
    document.querySelector("#divUnosRastavljacStub10").style.display = "flex";
    document.querySelector("#divUnosBrNnv").style.display = "flex";
    document.querySelector("#divUnosBrNnvKablovski").style.display = "flex";
    document.querySelector("#divUnosBr10kVVodova").style.display = "flex";
    document.querySelector("#divUnosBr10kVVodovaKablovski").style.display = "flex";
    document.querySelector("#divUnosMaterijalStub10").style.display = "flex";
  }
  if (napon === NaponskiNivo.String35kV) {
    document.querySelector("#divUnosNamjenaStub35").style.display = "flex";
    document.querySelector("#divUnosVrstaDrvenogStuba35").style.display = "flex";
    document.querySelector("#divUnosIzolatorVrstaStub35").style.display = "flex";
    document.querySelector("#divUnosIzolatorFunkcijaStub35").style.display = "flex";
    document.querySelector("#divUnosTipIzolatoraStub35").style.display = "flex";
    document.querySelector("#divUnosNosaciIzolatoraStub35").style.display = "flex";
    document.querySelector("#divUnosOdvodnikPrenaponaStub35").style.display = "flex";
    document.querySelector("#divUnosUzemljivacStub35").style.display = "flex";
    document.querySelector("#divUnosOptikaStub35").style.display = "flex";
    document.querySelector("#divUnosRastavljacStub35").style.display = "flex";
    document.querySelector("#divUnos10KvVod").style.display = "flex";
    document.querySelector("#divUnosBr10kVVodova").style.display = "flex";
    document.querySelector("#divUnosBr10kVVodovaKablovski").style.display = "flex";
    document.querySelector("#divUnosBr35kVVodova").style.display = "flex";
    document.querySelector("#divUnosBr35kVVodovaKablovski").style.display = "flex";
    document.querySelector("#divUnosMaterijalStub35").style.display = "flex";
  }
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosBroj").style.display = "flex";
  document.querySelector("#divUnosNadmorskaVisina").style.display = "flex";
  document.querySelector("#divUnosVisina").style.display = "flex";
  document.querySelector("#divUnosBrIzolFaza").style.display = "flex";
  document.querySelector("#divUnosOtporUzemljivaca").style.display = "flex";
  document.querySelector("#divUnosPogSprem").style.display = "flex";
  document.querySelector("#divUnosTipStub").style.display = "flex";
  document.querySelector("#divUnosRasporedProvodnika").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
}

function prikaziAtributDivVodove(napon) {
  document.querySelector("#divUnosNazivNapojne").style.display = "flex";
  document.querySelector("#divUnosSifraNapojne").style.display = "flex";
  document.querySelector("#divUnosIzvodNapojne").style.display = "flex";
  document.querySelector("#divUnosName").style.display = "flex";
  if (napon === NaponskiNivo.String04kV) {
    document.querySelector("#divUnosRasvjetaVod").style.display = "flex";
    document.querySelector("#divUnosVrstaVod04").style.display = "flex";
    document.querySelector("#divUnosTipVod04").style.display = "flex";
    document.querySelector("#divUnosPresjekVod04").style.display = "flex";
    document.querySelector("#divUnosMaterijalVod04").style.display = "flex";
    //document.querySelector("#divUnosUze").style.display = "flex";
  }
  if (napon === NaponskiNivo.String10kV) {
    document.querySelector("#divUnosVrstaVod10").style.display = "flex";
    document.querySelector("#divUnosTipVod10").style.display = "flex";
    document.querySelector("#divUnosPresjekVod10").style.display = "flex";
    document.querySelector("#divUnosMaterijalVod10").style.display = "flex";
    document.querySelector("#divUnosUzeVod10").style.display = "flex";
    document.querySelector("#divUnosSifraDionice").style.display = "flex";
  }
  if (napon === NaponskiNivo.String35kV) {
    document.querySelector("#divUnosVrstaVod35").style.display = "flex";
    document.querySelector("#divUnosTipVod35").style.display = "flex";
    document.querySelector("#divUnosPresjekVod35").style.display = "flex";
    document.querySelector("#divUnosMaterijalVod35").style.display = "flex";
    document.querySelector("#divUnosUzePresjekVod35").style.display = "flex";
    document.querySelector("#divUnosUzeVod35").style.display = "flex";
    document.querySelector("#divUnosSifraDionice").style.display = "flex";
  }
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosPogSprem").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  document.querySelector("#divUnosBrFaza").style.display = "flex";
  document.querySelector("#divUnosBrSpojnica").style.display = "flex";
  document.querySelector("#divUnosGodIzgr").style.display = "flex";
  document.querySelector("#divUnosRacDuzina").style.display = "flex";
  document.querySelector("#divUnosDuzina").style.display = "flex";
}

function prikaziAtributDivTrafostanice(napon) {
  document.querySelector("#divUnosNazivNapojne").style.display = "flex";
  document.querySelector("#divUnosSifraNapojne").style.display = "flex";
  document.querySelector("#divUnosIzvodNapojne").style.display = "flex";
  document.querySelector("#divUnosDdlTrafostanice").style.display = "flex";
  document.querySelector("#divUnosName").style.display = "flex";
  if (napon === "10") {
    //10/04
    document.querySelector("#divReadCelije10").style.display = "flex";
    document.querySelector("#divReadIzvodCelija").style.display = "flex";
    document.querySelector("#divReadBrNnIzvoda").style.display = "flex";
  }
  if (napon === "35") {
    //35/x
  }
  if (napon === "110") {
    //110/x
  }

  //Read only polja za trafostanice. Kasnije dodato.
  document.querySelector("#divUnosGps").style.display = "flex";

  document.querySelector("#divReadName").style.display = "flex";
  document.querySelector("#divReadFunkcija").style.display = "flex";
  document.querySelector("#divReadGeohashId").style.display = "flex";
  document.querySelector("#divReadGeohashIdNo").style.display = "flex";
  document.querySelector("#divReadGodIzg").style.display = "flex";
  document.querySelector("#divReadVlasnistvo").style.display = "flex";
  document.querySelector("#divReadDatumAzuriranja").style.display = "flex";
  document.querySelector("#divReadGPS").style.display = "flex";
  document.querySelector("#divReadPogSprem").style.display = "flex";
  document.querySelector("#divReadNapon").style.display = "flex";
  document.querySelector("#divReadPosjedujeSliku").style.display = "flex";
  document.querySelector("#divReadOriginalId").style.display = "flex";
  document.querySelector("#divReadKorisnik").style.display = "flex";
  document.querySelector("#divReadVlasnik").style.display = "flex";
  document.querySelector("#divReadKatastar").style.display = "flex";
  document.querySelector("#divReadIdTrafostanice").style.display = "flex";
  document.querySelector("#divReadRegion").style.display = "flex";
  document.querySelector("#divReadNazivNapojne").style.display = "flex";
  document.querySelector("#divReadSifraNapojne").style.display = "flex";
  document.querySelector("#divReadIzvodNapojne").style.display = "flex";
  document.querySelector("#divReadPrenosOdnos").style.display = "flex";
  document.querySelector("#divReadIdBilling").style.display = "flex";
  document.querySelector("#divReadAdresa").style.display = "flex";
  document.querySelector("#divReadTip").style.display = "flex";
  document.querySelector("#divReadNaziv").style.display = "flex";
  document.querySelector("#divReadInstSnagaT1").style.display = "flex";
  document.querySelector("#divReadInstSnagaT2").style.display = "flex";
  document.querySelector("#divReadInstSnagaT3").style.display = "flex";
  document.querySelector("#divReadInstSnagaT4").style.display = "flex";
  document.querySelector("#divReadProjekSnaga").style.display = "flex";
}

function prikaziAtributDivPrikljucnoMjesto() {
  document.querySelector("#divUnosNazivNapojne").style.display = "flex";
  document.querySelector("#divUnosSifraNapojne").style.display = "flex";
  document.querySelector("#divUnosIzvodNapojne").style.display = "flex";
  document.querySelector("#divUnosName").style.display = "flex";
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosId").style.display = "flex";
  document.querySelector("#divUnosOsiguraci").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosTipPM").style.display = "flex";
}

function prikaziAtributDivNkro() {
  document.querySelector("#divUnosNazivNapojne").style.display = "flex";
  document.querySelector("#divUnosSifraNapojne").style.display = "flex";
  document.querySelector("#divUnosIzvodNapojne").style.display = "flex";
  document.querySelector("#divUnosName").style.display = "flex";
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosId").style.display = "flex";
  document.querySelector("#divUnosVlasnistvo").style.display = "flex";
  document.querySelector("#divUnosNapon").style.display = "flex";
  document.querySelector("#divUnosMontaza").style.display = "flex";
  document.querySelector("#divUnosMaterijal").style.display = "flex";
  document.querySelector("#divUnosVrata").style.display = "flex";
  document.querySelector("#divUnosBrIzvoda").style.display = "flex";
  document.querySelector("#divUnosBrPrikljucaka").style.display = "flex";
  document.querySelector("#divUnosPogSprem").style.display = "flex";
}

function prikaziAtributDivPotrosac() {
  document.querySelector("#divUnosNazivNapojne").style.display = "flex";
  document.querySelector("#divUnosSifraNapojne").style.display = "flex";
  document.querySelector("#divUnosIzvodNapojne").style.display = "flex";
  document.querySelector("#divUnosName").style.display = "flex";
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosPrikKabal").style.display = "flex";
  document.querySelector("#divUnosPod").style.display = "flex";
  document.querySelector("#divUnosAdresaMm").style.display = "flex";
  document.querySelector("#divUnosPrikMjesto").style.display = "flex";
  document.querySelector("#divUnosNazivNnIzvod").style.display = "flex";
  document.querySelector("#divUnosPretplatniBr").style.display = "flex";
  document.querySelector("#divUnosBrBrojila").style.display = "flex";
  document.querySelector("#divUnosNaziv").style.display = "none";
}

function prikaziAtributDivPod() {
  document.querySelector("#divUnosNazivNapojne").style.display = "flex";
  document.querySelector("#divUnosSifraNapojne").style.display = "flex";
  document.querySelector("#divUnosIzvodNapojne").style.display = "flex";
  document.querySelector("#divUnosName").style.display = "flex";
  document.querySelector("#divUnosGps").style.display = "flex";
  document.querySelector("#divUnosPrikKabal").style.display = "flex";
  document.querySelector("#divUnosPod").style.display = "flex";
  document.querySelector("#divUnosAdresaMm").style.display = "flex";
  //document.querySelector("#divUnosPrikMjesto").style.display = "flex";
  document.querySelector("#divUnosNazivNnIzvod").style.display = "flex";
  document.querySelector("#divUnosPretplatniBr").style.display = "flex";
  document.querySelector("#divUnosBrBrojila").style.display = "flex";
}

function prikaziAtributDivNelegalniPotrosac() {
  document.querySelector("#divReadNpAdresa").style.display = "flex";
  document.querySelector("#divReadNpBrojBrojila").style.display = "flex";
  document.querySelector("#divReadNpBrojPlombe").style.display = "flex";
  document.querySelector("#divReadNpBrojTelefona").style.display = "flex";
  document.querySelector("#divReadNpBrojZapisnika").style.display = "flex";
  document.querySelector("#divReadNpDatumKontrole").style.display = "flex";
  document.querySelector("#divReadNpJMB").style.display = "flex";
  document.querySelector("#divReadNpKontroluIzvrsio1").style.display = "flex";
  document.querySelector("#divReadNpKontroluIzvrsio2").style.display = "flex";
  document.querySelector("#divReadNpKontroluIzvrsio3").style.display = "flex";
  document.querySelector("#divReadNpNazivPotrosaca").style.display = "flex";
  document.querySelector("#divReadNpNazivTs").style.display = "flex";
  document.querySelector("#divReadNpOpstina").style.display = "flex";
  document.querySelector("#divReadNpPotrosacIskljucen").style.display = "flex";
  document.querySelector("#divReadNpPretplatniBroj").style.display = "flex";
  document.querySelector("#divReadNpProizvodjac").style.display = "flex";
  document.querySelector("#divReadNpRegion").style.display = "flex";
  document.querySelector("#divReadNpSifraTs").style.display = "flex";
  document.querySelector("#divReadNpStanjeMt").style.display = "flex";
  document.querySelector("#divReadNpStanjeVt").style.display = "flex";
  document.querySelector("#divReadNpStatusPotrosaca").style.display = "flex";
  document.querySelector("#divReadNpTipBrojila").style.display = "flex";
}

function prikaziAtributDivPoslovniObjekti() {
  document.querySelector("#divReadPoAdresa").style.display = "flex";
  document.querySelector("#divReadPoBrojKatastarskeParcele").style.display = "flex";
  document.querySelector("#divReadPoGodIzg").style.display = "flex";
  document.querySelector("#divReadPoImeKatastarskeOpstine").style.display = "flex";
  document.querySelector("#divReadPoKatastar").style.display = "flex";
  document.querySelector("#divReadPoNadleznost").style.display = "flex";
  document.querySelector("#divReadPoName").style.display = "flex";
  document.querySelector("#divReadPoNapomena").style.display = "flex";
  document.querySelector("#divReadPoObimPrava").style.display = "flex";
  document.querySelector("#divReadPoObjekat").style.display = "flex";
  document.querySelector("#divReadPoOpstina").style.display = "flex";
  document.querySelector("#divReadPoPovrsina").style.display = "flex";
  document.querySelector("#divReadPoRegion").style.display = "flex";
  document.querySelector("#divReadPoVlasnistvo").style.display = "flex";
}

function prikaziAtributDivOdbijeni() {
  document.querySelector("#divUnosNazivNapojne").style.display = "flex";
  document.querySelector("#divUnosSifraNapojne").style.display = "flex";
  document.querySelector("#divUnosIzvodNapojne").style.display = "flex";
  document.querySelector("#divReadOdbijeniName").style.display = "flex";
  document.querySelector("#divReadOdbijeniDatumAzuriranja").style.display = "flex";
  document.querySelector("#divReadOdbijeniTip").style.display = "flex";
  document.querySelector("#divReadOdbijeniKorisnik").style.display = "flex";
}

function ddlLejerChange() {
  borderClear();
  sakrijSvaPoljaAtributDiv();
  let value = document.querySelector("#ddl_sloj_podataka").value;
  value && prikazPanelaAtributa(value);
  dodatnaPodesavanjaNaPromjenuLejera(value);
  enableDisableFields(value);
}

ddlLejerChange(); //Inicijalno prikazivanje

function enableDisableFields(value) {
  if ([Podsloj.TS10, Podsloj.TS35, Podsloj.TS110, Podsloj.Pod].includes(value)) {
    document.querySelector("#name").classList.add("disabledInput");
    document.querySelector("#pretplatni_br").classList.add("disabledInput");
    document.querySelector("#prik_mjesto").classList.add("disabledInput");
  } else {
    document.querySelector("#name").classList.remove("disabledInput");
    document.querySelector("#pretplatni_br").classList.remove("disabledInput");
    document.querySelector("#prik_mjesto").classList.remove("disabledInput");
  }

  if ([Podsloj.Vod04, Podsloj.Vod10, Podsloj.Vod35].includes(value) && blnIsChange) {
    document.querySelector("#sifra_dionice").classList.add("disabledInput");
    document.querySelector("#divUnosSifraDionice").getElementsByClassName("fontB")[0].innerHTML = "";
  } else {
    document.querySelector("#sifra_dionice").classList.remove("disabledInput");
    document.querySelector("#divUnosSifraDionice").getElementsByClassName("fontB")[0].innerHTML = "*";
  }
}
