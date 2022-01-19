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
