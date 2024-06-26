/** Modul koji sadrži sve poruke i konstante koje se koriste u projektu */

const wsServerOriginLocation = location.origin;
const domainUrl = location.origin;
const wmsUrl = domainUrl + "/geoserver/geonode/wms";
const wfsUrl = domainUrl + "/geoserver/geonode/wfs";
const imageUrl = domainUrl + "/slike/";
const point = "Point",
  lineString = "LineString",
  polygon = "Polygon";

  const workspace = "geonode:";

const NaponskiNivo = {
  String04kV: "0.4",
  String10kV: "10",
  String35kV: "35",
  String110kV: "110",
  Numeric04kV: 0.4,
  Numeric10kV: 10,
  Numeric35kV: 35,
  Numeric110kV: 110,
};

const Lejeri = {
  Stubovi: "stubovi",
  Vodovi: "vodovi",
  Trafostanice: "trafostanice",
  NKRO: "nkro",
  PrikljucnoMjesto: "prikljucno_mjesto",
  Potrosac: "view_potrosaci",
  POD: "view_pod",
  NelegalniPotrosac: "nelegalni_potrosac",
  PoslovniObjekat: "poslovni_objekti",
  Odbijeni: "view_odbijeni",
  Solari: "view_solari",
  Validacija: "validations",
  PrikljucnaKonzola: "prikljucna_konzola"
};

const Podsloj = {
  Stub04: "stub04",
  Stub10: "stub10",
  Stub35: "stub35",
  Vod04: "vod04",
  Vod10: "vod10",
  Vod35: "vod35",
  Nkro: "nkro",
  PrikljucnoMjesto: "prikljucno_mjesto",
  Potrosac: "potrosac",
  Pod: "pod",
  TS10: "trafostanica10",
  TS35: "trafostanica35",
  TS110: "trafostanica110",
  Rasklopiste10: "rasklopiste10",
  Rasklopiste35: "rasklopiste35",
  NelegalniPotrosac: "nelegalni_potrosac",
  PoslovniObjekat: "poslovni_objekti",
  Odbijeni: "view_odbijeni",
  Solari: "solari",
  Validacija: "validations",
  PrikljucnaKonzola: "prikljucna_konzola"
};

const StatusPoruke = {
  Uspjeh: "Uspjeh",
  Upozorenje: "Upozorenje",
  Greska: "Greška",
};

const WizardPoruke = {
  Uspjeh: "Uspješno izvršena akcija",
  NacrtatiPoligon: "Potrebno je nacrtati poligon prije pokretanja wizarda",
  NemaPotrosacaUZahvatu: "U selektovanom zahvatu ne postoji nijedan potrošač",
  PostojeNeupareniVodovi: "Postoje neupareni vodovi",
  OtklonitiNedostatke: "Potrebno je otkloniti uočene nedostatke kako bi podaci mogli biti sačuvani",
  NeupareneTrafostanice: "Nisu uparene sve trafostanice iz oba sistema",
  NijeOdabranaNapojnaTS: "Nije odabrana napojna trafostanica",
  UspjesnoUpareniVodovi: "Uspješno upareni svi vodovi.\n Prelazak na sljedeći korak wizard-a",
  NacrtatiObjekat: "Potrebno je nacrtati objekat.",
  IzmijenitiGeometriju: "Potrebno je izmijeniti geometriju odabranog objekta.",
  OdabratiObjekatIzmjenaAtributa: "Potrebno je odabrati objekat čije atribute mijenjate.",
  OdabratiObjekatIzmjenaGeometrije: "Nije odabran objekat čija geometrija se želi mijenjati.",
  NemaNkro: "Nema NKRO u odabranom zahvatu.",
  NemaPod: "Nema PODova u odabranom zahvatu.",
  NemaPM: "Nema priključnih mjesta u odabranom zahvatu.",
  NemaStub: "Nema stubova u odabranom zahvatu.",
  NemaTS: "Nema trafostanica u odabranom zahvatu.",
  NemaVod: "Nema vodova u odabranom zahvatu.",
  NepovezaniVodPotrosac: "Nijedan vod nije povezan sa selektovanim potrošačima",
  PostojiNepovezanVodPotrosac: "Postoje vodovi koji nisu povezani sa potrošačima.",
  NemaPodPotrosacPrikljucnoMjesto: "U zahvatu moraju postojati potrošači, PODovi i priključna mjesta.",
  OdabratiNapojnuTSIzvod: "Potrebno je odabrati napojnu trafostanicu i izvod",
  OdabratiTSObaSistema: "Potrebno je odabrati trafostanice iz oba sistema",
  OdabratiTSUparivanje: "Potrebno je odabrati trafostanicu za uparivanje",
  OdabratiPocetniStub: "Potrebno je odabrati početni stub.",
  OdabratiZavrsniStub: "Potrebno je odabrati završni stub.",
  PocetniStubVodaUvoz: "Odaberite početni stub voda koji želite da uvezete.",
  ZavrsniStubVodaUvoz: "Odaberite završni stub voda koji želite da uvezete.",
  PostojeneNepovezaniVodovi: "Vodovi nisu dobro iscrtani",
  OdabratiVodObaSistema: "Potrebno je odabrati vodove iz oba sistema",
  DodatObjekat: "Uspješno dodat objekat",
  NijeDodatObjekat: "Nije dodat objekat",
  VecDodatObjekat: "Pokušali ste da dodate objekat koji je već selektovan",
  OdabirNapojneTS: "Odaberite napojnu trafostanicu",
  ZavrsniStubVodaJe: "Završni stub voda je ",
  PocetniStubVodaJe: "Početni stub voda je ",
  NijePronadjenaTs: "Nije pronađena nijedna trafostanica u tehničkoj bazi podataka koja zadovoljava zadate uslove.",
};

const UnosPoruke = {
  Uspjeh: "Uspješno izvršena akcija",
  PopunitiObaveznaPolja: "Potrebno je popuniti obavezna polja",
  NijeMoguceMijenjatiPod:
    "Nije moguće direktno mijenjati PODove. Izmjenom potrošača i priključnog mjesta, POD se automatski mijenja.",
  NijeMoguceUklanjatiPod: "Nije moguće direktno uklanjati PODove. Uklanjanjem potrošača, POD se automatski uklanja.",
  OdabratiGpxTacku: "Potrebno je odabrati tačku iz gpx fajla.",
  OdabratiKmlVod: "Potrebno je odabrati vod iz kml fajla.",
  OznacenZaBrisanje: "Objekat označen za brisanje.",
  SelektovatiObjekatZaBrisanje: "Potrebno je selektovati objekat koji želite da označite za brisanje.",
  DaLiObjekatBrisanje: "Da li ste sigurni da odabrani objekat želite da označite za brisanje?",
  PrekidTrajePredugo: "Akcija je prekinuta jer je trajala predugo.",
  VodVisestrukiStubovi:
    "Postoje višestruki stubovi u istoj tački, od kojih je pokušano kreiranje voda.\nTe stubove treba ukloniti, prije iscrtavanja voda. Parovi stubova u istoj tački:\n",
  ProblemCitanjeStubova: "Problem pri čitanju stubova obuhvaćenih iscrtanim poligonima",
  NijeIzvrsenUnos: "Nije izvršen unos podataka.",
  PomjerajNemaNapon: "Za odabrani objekat nije popunjen atribut napon, pa nije moguće odrediti dozvoljeni pomjeraj.",
  OdabranLejerBrisanje: "Odabran je objekat iz lejera objekata selektovanih za brisanje.",
  OdabranLejerAzuriranje: "Odabran je objekat iz lejera objekata selektovanih za ažuriranje.",
  NijeOdabranIzmjenaGeometrije: "Nije odabran objekat čija geometrija se želi mijenjati.",
  OdabratiZavrsniStub: "Potrebno je odabrati završni stub.",
  OdabratiPocetniStub: "Potrebno je odabrati početni stub.",
  OdabirPocetnogStubaUvoz: "Odaberite početni stub voda koji želite da uvezete.",
  OdabirZavrsnogStubaUvoz: "Odaberite završni stub voda koji želite da uvezete.",
  NisuObradjeniSviZaUvoz: "Nisu obradjeni svi objekti iz fajla za uvoz.",
  NemaObjekataZaObradu: "Ne postoje objekti koje je potrebno obraditi",
  NePripadaNivou: "Objekat ne pripada odabranom naponskom nivou",
  OdabratiIzvodTS: "Potrebno je odabrati izvod trafostanice",
  OdabratiPoveznicu: "Potrebno je odabrati objekat mreže na koji se vrši povezivanje",
  NedozvoljenoPomjeranjeKmlTacke: "Nije dozvoljeno pomjeranje kml tačke.",
  NedozvoljenaIzmjenaGeometrijeLinije: "Nije dozvoljeno mijenjati geometriju voda, osim u krajnjim tačkama.",
  NedozvoljenPomjerajTacka1: "Tačka ne može biti pomjerena više od ",
  NedozvoljenPomjerajTacka2: "m od snimljene pozicije.",
  OdabirTacakaZaVod: "Potrebno je selektovati tačke za kreiranje voda.",
  PocetnaTackaDioVoda: "Početna tačka ne može biti dio voda koji je potrebno kreirati.",
  KrajnjaTackaDioVoda: "Krajnja tačka ne može biti dio voda koji je potrebno kreirati.",
  NeMoguIstiRedniBrojeviTacaka: "Redni brojevi tačaka koje se povezuju na elemente mreže ne mogu biti isti.",
  TrebaMinIliMaxVrijednost: "Vrijednost treba da bude minimalna ili maksimalna vrijednost selektovanih tačaka.",
  NijeOdabranaTsSaSifrom: "Nije odabrana trafostanica koja ima šifru iz bilinga.",
  UnijetiBrojevePotrosaca: "Potrebno je unijeti pretplatne brojeve potrošača, odvojene zarezima.",
  PokusajKreiranjaPotrosaca: "Pokušavate da kreirate potrošače za selektovani objekat iz lejera ",
  PostojiPM: "Na ovoj lokaciji već postoji priključno mjesto sa istom vrijednošću id polja",
  NisuOdabraneTackeIzmedju: "Nisu odabrane tačke između kojih se unosi novi objekat.",
  NijeIstiVod: "Nisu elementi istog voda",
  OdabratiSaVoda: "Nije odabran objekat koji pripada nekom vodu",
  OdabratiTackuZaPomjeranje: "Nije odabrana tačka i objekat za pomjeranje.",
  OdabranIzvodTS: "Uspješno odabran izvod napojne trafostanice.",
  NemaSledecegObjekta: "Ne postoji sljedeći objekat.",
  NemaPrethodnogObjekta: "Ne postoji prethodni objekat.",
  UspjehAzurirani: "Ažurirani podaci za odabranu gpx tačku",
  IzmjenaNaValidaciju: "Objekat sa izmijenjenim atributima spreman za slanje na validaciju",
  PomjerenObjekat: "Uspješno povezana nova tačka i postojeći objekat",
  NijeProduzenKrakVoda: "Nije produžen krak voda.",
  TsNijeZaBrisanje: "Trafostanice naponskog nivoa 110/X kV i 35/X kV nije moguće brisati.",
  NeobradjenaGpxTacka: "Selektovan je objekat za koji podaci nisu sačuvani.",
  NePostojiFotografija: "Za odabrani objekat ne postoji fotografija u sistemu.",
  KmlDaLiPovezivati: "Da li je potrebno odabrani objekat usaglasiti sa postojećom mrežom?",
  KmlDaLiPovezivatiOpis:
    "Pod usaglašavanjem se podrazumijeva da vlasnik postojeće mreže istu prilagodi geodetskom snimku.",
  PostojiAzuriranPotrosac: "Već ste ažurirali drugog potrošača ovim pretplatnim brojem.",
};

const GlobalPoruke = {
  NedostatakPrava: "Nemate pravo za izvršenje akcije nad odabranim objektom",
  UdaljenostZaPretragu:
    "Potrebno je unijeti udaljenost od iscrtanih tačaka na kojoj će se prikazivati objekti iz sloja koji se pretražuje.",
  TackaZaPretragu: "Potrebno je nacrtati bar jednu tačku za pretragu objekata po udaljenosti.",
  LinijaZaPretragu: "Potrebno je nacrtati bar jednu liniju za pretragu objekata koje linija presijeca.",
  PoligonZaPretragu: "Potrebno je nacrtati bar jedan poligon za pretragu objekata koje poligon presijeca ili obuhvata.",
  GreskaOdabirTsIzvod: "\n Odaberite napojnu trafostanicu i izvod!",
  NemaPodatakaZaTS: "Za odabranu trafostanicu nema podataka u tehničkoj bazi.",
  NijeOdabranaTS: "Nije odabrana nijedna trafostanica",
  NijeOdabranVod: "Nije odabran nijedan vod",
  NijeOdabranaNapojnaTS: "Nije odabrana napojna trafostanica",
  NijeZadatPretplatniBroj: "Nije zadat nijedan pretplatni broj.",
  NemaIzmjena: "Nema izmijenjenih objekata.",
};
