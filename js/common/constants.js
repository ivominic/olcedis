/** Modul koji sadrži sve poruke i konstante koje se koriste u projektu */

const wsServerOriginLocation = "https://razvojgis.cedis.me";
const domainUrl = "https://razvojgis.cedis.me";
const wmsUrl = domainUrl + "/geoserver/geonode/wms";
const wfsUrl = domainUrl + "/geoserver/geonode/wfs";
const imageUrl = domainUrl + "/slike/";
const point = "Point",
  lineString = "LineString",
  polygon = "Polygon";

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
