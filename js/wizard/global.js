//Modul koji sadrži sve promjenljive koje se koriste na globalnom nivou u aplikaciji / wizardu kao i opšte metode
const dozvoljeniPomjeraj = 0.01; //0.01km - deset metara je dozvoljeo pomjeriti tačke iz gpx fajlova prije uvoza u bazu
let sifraNapojneTrafostanice = "",
  naponskiNivoNapojneTrafostanice = "";
let nizKml = []; //podaci koji će biti prevučeni na mapu iz kml/gpx fajla
let blnSelekcijaNapojneTS = false; // Kada je true, klik na mapu treba da nađe napojnu trafostanicu
let featureNapojnaTrafostanica; //Ovaj objekat koristiti kao feature iz koje će se pratiti konektivnost

/**
 * Metoda koja za naponski nivo trafostanice vraća odgovarajući nivo naponskog voda
 * @param {*} nivo
 */
function globalNaponskiNivo(nivo) {
  let retVal = "";
  switch (nivo) {
    case ("10/0,4", "10/0,69", "6/0,4", "35/0.4"):
      retVal = "0.4";
      break;
    case ("10/10", "35/10", "35/6", "110/10"):
      retVal = "10";
      break;
    case ("110/35", "35/35"):
      retVal = "35";
      break;
    default:
      retVal = nivo;
  }
  return retVal;
}

//x/y uzimam sve koje počinju sa y
