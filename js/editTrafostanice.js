/**Inicijalna deklaracija promjenljivih koje su vezane za konkretan lejer */
//let layernameTS = "trafostanice", fulllayernameTS = "winsoft:trafostanice", layertitleTS = "trafostanice";
let layernameTS = "trafostanice",
  fulllayernameTS = "geonode:trafostanice",
  layertitleTS = "trafostanice";
let tipGeometrijeTS = point;
let opisSlikeTS = "";
let sifraNapojneTrafostanice = "";
let blnSelekcijaNapojneTS = false;
let selektovaneTSfeatures;

let wmsTrafostanice = new ol.layer.Image({
  title: layertitleTS,
  name: layernameTS,
  source: new ol.source.ImageWMS({
    url: wmsUrl,
    params: {
      LAYERS: fulllayernameTS,
    },
    ratio: 1,
    serverType: "geoserver",
  }),
});

map.addLayer(wmsTrafostanice);
//console.log("dodao lejer na mapu");

document.querySelector("#selekecijaTrafostanicaPoligon").addEventListener("click", trafostaniceUpoligonu);
document.querySelector("#uparivanjeTrafostanica").addEventListener("click", prikazUparivanje);
document.querySelector("#selekcijaNapojneTrafostanice").addEventListener("click", selektujNapojnuTS);
document.querySelector("#btnPoveziTS").addEventListener("click", poveziTS);

function trafostaniceUpoligonu() {
  if (poligoni.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati poligon");
    return false;
  }
  let cqlText = "";

  poligoni.forEach((item) => {
    if (cqlText === "") {
      //cqlText = "INTERSECTS(geom," + item + ") ";
      cqlText = "INTERSECTS(Geometry," + item + ") ";
    } else {
      //cqlText += " OR INTERSECTS(geom," + item + ") ";
      cqlText += " OR INTERSECTS(Geometry," + item + ") ";
    }
  });

  console.log("trafo poligon", cqlText);
  let urlZaFilter = wfsUrl + "?version=1.0.0&request=GetFeature&typeName=" + fulllayernameTS + "&outputformat=application/json&cql_filter=" + cqlText;
  console.log("url filter", urlZaFilter);

  let trafostaniceZaWS = "";
  $("#ddlPovezivanjeTSselektovane").empty();

  $.ajax({
    method: "POST",
    url: urlZaFilter,
    data: {},
    success: function (response) {
      console.log("response", response);
      let features = new ol.format.GeoJSON().readFeatures(response);
      selektovaneTSfeatures = new ol.format.GeoJSON().readFeatures(response);
      console.log("fičeri", features);
      //vektorSource.clear();
      //vektorSource.addFeatures(features);
      //console.log("broj featurea", features.length);
      if (features.length) {
        for (let i = 0; i < features.length; i++) {
          console.log("feature i", features[i].values_);
          console.log("feature i tip", features[i].values_.tip);
          console.log("feature id", features[i].id_);
          trafostaniceZaWS += features[i].id_ + ",";
          let option = document.createElement("option");
          option.text = features[i].values_.naziv + "-" + features[i].values_.id_biling;
          option.value = features[i].values_.originalId;
          document.querySelector("#ddlPovezivanjeTSselektovane").appendChild(option);
        }
        trafostaniceZaWS = trafostaniceZaWS.substring(0, trafostaniceZaWS.length - 1);
        trafostaniceZaWS = "[" + trafostaniceZaWS + "]";

        //vectorIzvjestaj.setSource(new ol.source.Vector({features: features}));
        //console.log(vectorIzvjestaj.getSource().getExtent());
        //map.getView().fit(vectorIzvjestaj.getSource().getExtent(), {"maxZoom":17});
        /*let boundingExtent = ol.extent.boundingExtent(vektorSource.getExtent());
            boundingExtent = ol.proj.transformExtent(boundingExtent, ol.proj.get("EPSG:4326"), ol.proj.get("EPSG:3857"));
            console.log("extentovi", boundingExtent);*/
      } else {
        poruka("Uspjeh", "Nema zapisa za prikaz.");
      }

      //console.log("size", map.getSize());
      //console.log("jedan value", features[0].values_);
      //console.log("više valua", features.values_);
      //map.getView().fit(boundingExtent, map.getSize());
    },
    fail: function (jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    },
  });
}

function prikazUparivanje() {
  if (sifraNapojneTrafostanice === "") {
    poruka("Upozorenje", "Potrebno je odabrati napojnu trafostanicu");
    return false;
  }
  showDiv("#povezivanjeTSdiv");
}

function selektujNapojnuTS() {
  sifraNapojneTrafostanice = "";
  blnSelekcijaNapojneTS = true;
}

function poveziTS() {
  let odabranaTS = document.querySelector("#ddlPovezivanjeTSselektovane").value;
  let tsIzSistema = document.querySelector("#ddlPovezivanjeTSpronadjene").value;
  if (!odabranaTS || !tsIzSistema) {
    alert("Potrebno je odabrati trafostanice iz oba sistema");
    return false;
  }
  for (let i = 0; i < document.querySelector("#ddlPovezivanjeTSselektovane").length; i++) {
    if (document.querySelector("#ddlPovezivanjeTSselektovane").options[i].value === odabranaTS) {
      document.querySelector("#ddlPovezivanjeTSselektovane").remove(i);
    }
  }
  for (let i = 0; i < document.querySelector("#ddlPovezivanjeTSpronadjene").length; i++) {
    if (document.querySelector("#ddlPovezivanjeTSpronadjene").options[i].value === tsIzSistema) {
      document.querySelector("#ddlPovezivanjeTSpronadjene").remove(i);
    }
  }
  paroviTS.push({ gis: odabranaTS, tbp: tsIzSistema });
  console.log("povezane trafostanice", paroviTS);
  if (document.querySelector("#ddlPovezivanjeTSselektovane").length === 0 && document.querySelector("#ddlPovezivanjeTSpronadjene").length === 0) {
    alert("Uspješno uparene sve trafostanice: \n" + paroviTS.join(",") + "\n Prelazak na sljedeći korak wizard-a");
    console.log("Uspješno uparene sve trafostanice:", paroviTS);
  }
}

document.querySelector("#ddlPovezivanjeTSselektovane").addEventListener("change", function () {
  console.log("odabrana trafostanica", this.value);
  for (let i = 0; i < selektovaneTSfeatures.length; i++) {
    console.log("originalId", selektovaneTSfeatures[i].values_.originalId);
    if (this.value === selektovaneTSfeatures[i].values_.originalId.toString()) {
      console.log("feature id", selektovaneTSfeatures[i].id_);
      //let featureZaTransofrmaciju = Object.assign({}, selektovaneTSfeatures[i]);
      let featureZaTransofrmaciju = selektovaneTSfeatures[i].clone();
      map.getView().fit(featureZaTransofrmaciju.getGeometry().transform("EPSG:4326", "EPSG:3857"), { maxZoom: 20 });
    }
  }
});
