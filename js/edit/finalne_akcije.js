/**Metode koje vrše finalnu obradu podataka prije inserta u bazu */

function insertObjekataIzGpx() {
  let postojiNeobradjenaTacka = false;
  gpxFeatures.forEach((el) => {
    console.log("finalno lejer", el.get("lejer"));
    //if (el.hasOwnProperty("lejer") && el.get("lejer") === "stubovi") {
    if (el.get("lejer") === "stubovi") {
      //cudStub(el, "I", 0);
      console.log("stubovi", el);
      kreiraniStuboviFeatures.push(el);
    } else if (el.get("lejer") === "trafostanice") {
      console.log("trafostanice", el);
      kreiraneTrafostaniceFeatures.push(el);
    } else if (el.get("lejer") === "nkro") {
      kreiraniNkroFeatures.push(el);
      console.log("nkro", el);
    } else if (el.get("lejer") === "potrosaci") {
      console.log("potrosaci", el);
      kreiraniPotrosaciFeatures.push(el);
    } else if (el.get("lejer") === "pod") {
      console.log("pod", el);
      kreiraniPodoviFeatures.push(el);
    } else if (el.get("lejer") === "prikljucno_mjesto") {
      console.log("prikljucno_mjesto", el);
      kreiranaPrikljucnaMjestaFeatures.push(el);
    } else if (el.get("lejer") === undefined) {
      console.log("nedefinisani", el);
      postojiNeobradjenaTacka = true;
    } else if (el.get("lejer") === "vodovi") {
      //kreiraniVodoviFeatures// Ovo već popunjeno tokom procesa
      console.log("vodovi", el);
      kreiraniVodoviFeatures.push(el);
    }
  });

  //call web service
  //insertAllObjects(...)

  console.log("svi vodovi za kreiranje", kreiraniVodoviFeatures);

  if (postojiNeobradjenaTacka) {
    poruka("Upozorenje", "Nisu obradjeni svi objekti iz fajla za uvoz.");
    return false;
  } else {
    //TODO: Unijeti sve nizove u bazu (pozvati servis za svaki od nizova)
  }
}
