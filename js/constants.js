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
  OdabratiGpxTacku: "Potrebno je odabrati tačku iz gpx fajla.",
  OdabratiKmlVod: "Potrebno je odabrati vod iz kml fajla.",
};

const GlobalPoruke = {
  NedostatakPrava: "Nemate pravo za izvršenje akcije nad odabranim objektom",
};
