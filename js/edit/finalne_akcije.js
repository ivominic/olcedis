/**Metode koje vrše finalnu obradu podataka prije inserta u bazu */

function insertStubovaIzGpx() {
  gpxFeatures.forEach((el) => {
    if (el.hasOwnProperty("lejer") && el.get("lejer") === "stubovi") {
      cudStub(el, "I", 0);
    }
  });
}
