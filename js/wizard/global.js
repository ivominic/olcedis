//Modul koji sadrži sve promjenljive koje se koriste na globalnom nivou u aplikaciji / wizardu
const dozvoljeniPomjeraj = 0.01; //0.01km - deset metara je dozvoljeo pomjeriti tačke iz gpx fajlova prije uvoza u bazu
let sifraNapojneTrafostanice = "",
  naponskiNivoNapojneTrafostanice = "";
let nizKml = []; //podaci koji će biti prevučeni na mapu iz kml/gpx fajla
let blnSelekcijaNapojneTS = false; // Kada je true, klik na mapu treba da nađe napojnu trafostanicu
let featureNapojnaTrafostanica; //Ovaj objekat koristiti kao feature iz koje će se pratiti konektivnost
