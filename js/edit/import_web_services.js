/**
 * Web service calls that inserts prepared arrays of JSON objects into database
 */

/**
 * Method for insertion of object, per layer, after successful controll
 * @param {Array of prepared data for insertion} objects
 */
/*function objectsFinalInsert(objects, methodName) {
  console.log("Objekti za popunjene objekte finalni insert", objects);
  let retval = true;
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/" + methodName;
  $.ajax({
    url: urlServisa,
    data: { objekti: JSON.stringify(objects) },
    processData: false,
    contentType: "application/json",
    type: "POST",
    success: function (data) {
      console.log("success objectsFinalInsert " + methodName, data);
    },
    error: function (x, y, z) {
      retval = false;
      console.log("error objectsFinalInsert " + methodName, x.responseText);
    },
  });
  return retval;
}*/

//TODO: Kad Jovan ispravi servise za unos iz nizova, otkomentarisati gornju metodu, a ovu ukloniti
function objectsFinalInsert(objects, methodName) {
  let retval = true;
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/" + methodName;
  objects.forEach((item) => {
    console.log("itemi objects final insert", item);
    if (methodName === "stubovi_store") {
      cudStub(item, "I", "0");
    } else if (methodName === "vodovi_store") {
      cudVod(item, "I", "0");
    } else if (methodName === "trafostanice_store") {
      cudVod(item, "I", "0");
    } else if (methodName === "pod_store") {
      cudPOD(item, "I", "0");
    } else if (methodName === "prikljucno_mjesto_store") {
      cudPrikljucnoMjesto(item, "I", "0");
    } else if (methodName === "potrosaci_store") {
      cudPotrosac(item, "I", "0");
    } else if (methodName === "nkro_store") {
      cudNKRO(item, "I", "0");
    }

    /*$.ajax({
      url: urlServisa,
      data: item,
      type: "POST",
      processData: false,
      contentType: "application/json",
      success: function (data) {
        console.log("success objectsFinalInsert " + methodName, data);
      },
      error: function (x, y, z) {
        retval = false;
        console.log("error objectsFinalInsert " + methodName, x.responseText);
      },
    });*/
  });

  return retval;
}

/**
 * Method for inserting all drawn objects into database
 * @param {*} stubovi
 * @param {*} vodovi
 * @param {*} trafostanice
 * @param {*} podovi
 * @param {*} prikljucna_mjesta
 * @param {*} potrosaci
 * @param {*} nkro
 */
function insertAllObjects(stubovi, vodovi, trafostanice, podovi, prikljucna_mjesta, potrosaci, nkro) {
  let retval = true;
  let urlServisa = wsServerOriginLocation + "/novi_portal/api/object_control";
  console.log("stubovi insert all objects   ", JSON.stringify(stubovi));
  console.log("vodovi insert all objects   ", JSON.stringify(vodovi));
  console.log("trafostanice insert all objects   ", JSON.stringify(trafostanice));
  console.log("podovi insert all objects   ", JSON.stringify(podovi));
  console.log("prikljucna_mjesta insert all objects   ", JSON.stringify(prikljucna_mjesta));
  console.log("potrosaci insert all objects   ", JSON.stringify(potrosaci));
  console.log("nkro insert all objects   ", JSON.stringify(nkro));
  $.ajax({
    url: urlServisa,
    data: {
      temp_stubovi: JSON.stringify(stubovi),
      temp_vodovi: JSON.stringify(vodovi),
      temp_trafostanice: JSON.stringify(trafostanice),
      temp_pod: JSON.stringify(podovi),
      temp_prikljucno_mjesto: JSON.stringify(prikljucna_mjesta),
      temp_potrosac: JSON.stringify(potrosaci),
      temp_nkro: JSON.stringify(nkro),
    },
    type: "POST",
    success: function (data) {
      console.log("success insert all objects", data);
      //Web services for insertion of data
      /*objectsFinalInsert(stubovi, "stubovi_store");
      objectsFinalInsert(vodovi, "vodovi_store");
      objectsFinalInsert(trafostanice, "trafostanice_store");
      objectsFinalInsert(podovi, "pod_store");
      objectsFinalInsert(prikljucna_mjesta, "prikljucno_mjesto_store");
      objectsFinalInsert(potrosaci, "potrosaci_store");
      objectsFinalInsert(nkro, "nkro_store");*/
      poruka("Uspjeh", "Uspješno sačuvani podaci.");
    },
    error: function (x, y, z) {
      console.log("error insert all objects", x.responseText);
      poruka("Greška", "Akcija nije izvršena.");
    },
  });
}
