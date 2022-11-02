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
  Numeric04kV: 0.4,
  Numeric10kV: 10,
  Numeric35kV: 35,
};

const StatusPoruke = {
  Uspjeh: "Uspjeh",
  Upozorenje: "Upozorenje",
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
};

const GlobalPoruke = {
  NedostatakPrava: "Nemate pravo za izvršenje akcije nad odabranim objektom",
};
