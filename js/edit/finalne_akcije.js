/**Metode koje vrše finalnu obradu podataka prije inserta u bazu */

function insertObjekataIzGpx() {
  let postojiNeobradjenaTacka = false;
  gpxFeatures.forEach((el) => {
    //if (el.hasOwnProperty("lejer") && el.get("lejer") === "stubovi") {
    if (el.get("lejer") === "stubovi") {
      //cudStub(el, "I", 0);
      kreiraniStuboviFeatures.push(el);
    } else if (el.get("lejer") === "trafostanice") {
      kreiraneTrafostaniceFeatures.push(el);
    } else if (el.get("lejer") === "nkro") {
      kreiraniNkroFeatures.push(el);
    } else if (el.get("lejer") === "potrosaci") {
      kreiraniPotrosaciFeatures.push(el);
    } else if (el.get("lejer") === "pod") {
      kreiraniPodoviFeatures.push(el);
    } else if (el.get("lejer") === "prikljucno_mjesto") {
      kreiranaPrikljucnaMjestaFeatures.push(el);
    } else if (el.get("lejer") === undefined) {
      postojiNeobradjenaTacka = true;
    }
    //kreiraniVodoviFeatures// Ovo već popunjeno tokom procesa
  });

  if (postojiNeobradjenaTacka) {
    poruka("Upozorenje", "Nisu obradjene sve tačke iz gpx fajla");
    return false;
  }
}
