function obaveznaPolja(sloj) {
  //Iz ddl_sloj_podataka ddl liste
  let popunjen = true;
  let message = "";
  if (sloj === "stub04") {
    if (document.querySelector("#fid_1").value === "") {
      popunjen = false;
      //poruka("Upozorenje", "Nije popunjeno obavezno polje Fid");
      //TODO: Staviti crveni border koji nestaje nakon 5 sekundi
    }
  }

  return popunjen;
}
