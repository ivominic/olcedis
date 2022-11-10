function dodajPoljaOdabranomGpxPM() {
  //if (selectGpxFeature.get("lejer") === undefined || selectGpxFeature.get("lejer") === "prikljucno_mjesto") {
  selectGpxFeature.set("wizard", 0);
  selectGpxFeature.set("lejer", "prikljucno_mjesto");
  selectGpxFeature.set("gps", document.querySelector("#gps").value);
  selectGpxFeature.set("fid_1", document.querySelector("#fid_1").value);
  selectGpxFeature.set("vlasnistvo", document.querySelector("#vlasnistvo").value);
  selectGpxFeature.set("napon", document.querySelector("#napon").value);
  selectGpxFeature.set("id", document.querySelector("#id").value);
  selectGpxFeature.set("osiguraci", document.querySelector("#osiguraci").value);
  selectGpxFeature.set("tip_pm", document.querySelector("#tip_pm").value);
  selectGpxFeature.set("tip", document.querySelector("#tip_pm").value);
  selectGpxFeature.set("br_pretplatnika", document.querySelector("#br_pretplatnika").value);
  selectGpxFeature.set("ts", sifraNapojneTrafostanice);
  selectGpxFeature.set("sifra_napojne", sifraNapojneTrafostanice);
  selectGpxFeature.set("naziv_napojne", nazivNapojneTrafostanice);
  selectGpxFeature.set("izvod_napojne", izvodNapojneTrafostanice);
  selectGpxFeature.set("korisnik", globalUsername);
  selectGpxFeature.set("vlasnik", "");
  poruka("Uspjeh", "Ažurirani podaci za odabranu gpx tačku");
  /*} else {
    poruka("Upozorenje", "Odabrani objekat je već definisan kao drugi tip objekta");
  }*/
}

function prikaziPoljaOdabranogGpxPM() {
  if (selectGpxFeature.values_.gps !== undefined) {
    document.querySelector("#gps").value = selectGpxFeature.values_.gps;
  } else {
    document.querySelector("#gps").value = "";
  }
  //document.querySelector("#fid_1").value = selectGpxFeature.values_.fid_1;
  document.querySelector("#vlasnistvo").value = selectGpxFeature.values_.vlasnistvo;
  document.querySelector("#napon").value = selectGpxFeature.values_.napon;
  document.querySelector("#id").value = selectGpxFeature.values_.id;
  document.querySelector("#osiguraci").value = selectGpxFeature.values_.osiguraci;
  document.querySelector("#tip_pm").value = selectGpxFeature.values_.tip_pm;
  document.querySelector("#br_pretplatnika").value = selectGpxFeature.values_.br_pretplatnika;

  setujDdlVrijednost("#vlasnistvo", selectGpxFeature.values_.vlasnistvo);
}

function prikaziPoljaWmsPM(objekat) {
  if (objekat.properties.gps !== undefined) {
    document.querySelector("#gps").value = objekat.properties.gps;
  } else {
    document.querySelector("#gps").value = "";
  }

  document.querySelector("#vlasnistvo").value = objekat.properties.vlasnistvo;
  document.querySelector("#napon").value = objekat.properties.napon;
  document.querySelector("#id").value = objekat.properties.id;
  document.querySelector("#osiguraci").value = objekat.properties.osiguraci;
  document.querySelector("#tip_pm").value = objekat.properties.tip_pm;
  document.querySelector("#br_pretplatnika").value = objekat.properties.br_pretplatnika;

  setujDdlVrijednost("#vlasnistvo", objekat.properties.vlasnistvo);
}

function izmijeniAtributeWmsPM(objekat) {
  objekat.properties.napon = document.querySelector("#napon").value;
  objekat.properties.id = document.querySelector("#id").value;
  objekat.properties.osiguraci = document.querySelector("#osiguraci").value;
  objekat.properties.tip_pm = document.querySelector("#tip_pm").value;
  objekat.properties.br_pretplatnika = document.querySelector("#br_pretplatnika").value;

  return objekat;
}

/**Metoda koja za odabranu gpx tačku i zadati id provjerava postojanje priključnog mjesta, u bazi, sa istim id-em u radijusu od 5 metara */
function provjeraWfsPrikljucnaMjesta(feature, id) {
  let position = feature.values_.geometry.flatCoordinates;
  let cqlupit = "id=" + id + " AND DWITHIN(Geometry,POINT(" + position[1] + " " + position[0] + "),5,meters)";

  $.ajax({
    method: "POST",
    url: wfsUrl,
    data: {
      access_token: geoserverToken,
      service: "WFS",
      request: "GetFeature",
      typename: "geonode:prikljucno_mjesto",
      outputFormat: "application/json",
      //srsname: "EPSG:4326",
      srsname: "EPSG:3857",
      CQL_FILTER: cqlupit,
    },
    success: function (response) {
      console.log("RESPONSE CQL", response);
      let features = new ol.format.GeoJSON().readFeatures(response);
      if (features.length > 0) {
        poruka("Upozorenje", "Na ovoj lokaciji već postoji priključno mjesto sa istom vrijednošću id polja");
      } else {
        //TODO: provjeriti gpx tačke i izvršiti dupliranje. Vidjeti šta sa vrijednošću id polja
        if (provjeraGpxPrikljucnaMjesta(feature, id)) {
          vectorSource.addFeature(feature);
        } else {
          poruka("Upozorenje", "Na ovoj lokaciji već postoji priključno mjesto sa istom vrijednošću id polja");
        }
      }
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

/**Metoda koja provjerava da li u gpx-u, na istoj lokaciji postoji tačka koja je priključno mjesto sa istim id-em */
function provjeraGpxPrikljucnaMjesta(feature, id) {
  let retVal = true;
  vectorSource.getFeatures().forEach(function (el) {
    if (
      el.values_.geometry.flatCoordinates[0] === feature.values_.geometry.flatCoordinates[0] &&
      el.values_.geometry.flatCoordinates[1] === feature.values_.geometry.flatCoordinates[1] &&
      el.values_.id === id &&
      el.values_.lejer === "prikljucno_mjesto"
    ) {
      retVal = false;
    }
  });
  return retVal;
}
