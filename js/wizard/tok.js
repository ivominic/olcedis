//Crtanje poligona
//Prikaz forme
//Odabir naponskog nivoa
//Filtriranje trafostanica
//Filtriranje vodova
//Određivanje napojne trafostanice
//Provjera broja trafostanica
//Provjera konektivnostsi vodova
//Uparivanje trafostanica
//Uparivanje vodova

document.querySelector("#wizard").addEventListener("click", prikazWizardForme);
/**
 * Pokreće proces za wizard - prikazuje formu, ako je ozačen reon poligonom
 */
function prikazWizardForme() {
  if (poligoni.length === 0) {
    poruka("Upozorenje", "Potrebno je nacrtati poligon prije pokretanja wizard-a.");
    return false;
  }
  //trafostaniceUpoligonu();
  //vodoviUpoligonu();
}
