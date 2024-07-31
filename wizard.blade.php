<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <meta http-equiv="expires" content="timestamp" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Wizard</title>
    <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@300;400&display=swap" rel="stylesheet" />
    <!-- Add icon library -->
    <script src="https://kit.fontawesome.com/324033e9e1.js" crossorigin="anonymous"></script>
    <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,requestAnimationFrame,Element.prototype.classList,URL"></script>
    <link rel="stylesheet" href="../../novi_portal/olcedis/css/util.css" />
    <link rel="stylesheet" href="../../novi_portal/olcedis/css/stil2.css" />
    <link rel="stylesheet" href="../../novi_portal/olcedis/css/slika.css" />
    <link rel="stylesheet" href="../../novi_portal/olcedis/css/ol.css" />
    <link rel="stylesheet" href="../../novi_portal/olcedis/css/sweetalert2.min.css" />

    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>

    <script src="../../novi_portal/olcedis/js/ol.js"></script>
  </head>

  <body>
    <div class="pocetni-div">
      <div class="topnav" id="topNav">
        <span>
          <a href="#" id="logo"
            ><img src="../../administracija/olcedis/img/logo.png" alt="Theme-logo" style="max-width: 100px"
          /></a>
        </span>
        <div class="dropdownDiv">
          <a href="#" class="active tooltip" id="pan" data-tool="Pan"><i class="far fa-hand-paper"></i></a>

          <a id="pregledButtonli" href="#" class="tooltip" data-tool="Pregled atributa">
              <i class="fas fa-info"></i>
            </a>
      
          <div class="dropdown" id="crtanje">
            <button class="dropbtn">
              <i class="fas fa-pencil-alt"></i>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="#" id="marker">Tačka</a>
              <a href="#" id="linija">Linija</a>
              <a href="#" id="poligon">Poligon</a>
            </div>
          </div>
          <a href="#" id="brisanje" class="tooltip" data-tool="Uklanjanje"
            ><i class="fas fa-eraser" aria-hidden="true"></i
          ></a>
          <a href="#" id="pojedinacniSelect" class="tooltip" data-tool="Pojedinačni odabir"
            ><i class="fas fa-map-pin" aria-hidden="true"></i
          ></a>
          <a href="#" id="wizard" class="tooltip" data-tool="Wizard">W</a>
          <a href="#" id="download" class="tooltip" data-tool="Preuzimanje maske"
            ><i class="fa fa-download" aria-hidden="true"></i
          ></a>
          <a href="#" id="pretraga" class="tooltip" data-tool="Pretraga"
            ><i class="fa fa-search" aria-hidden="true"></i
          ></a>
          <div class="dropdown">
            <button class="dropbtn">
              <i class="fab fa-buffer"></i>
              <i class="fa fa-caret-down"></i>
            </button>
            <div class="dropdown-content">
              <a href="#" class="akcija"
                ><input type="radio" name="layer1" class="radioClass" id="podloga_osm" checked="true" /> Open Street Map
              </a>
              <a href="#" class="akcija"
                ><input type="radio" name="layer1" class="radioClass" id="podloga_satelit" /> Satelit</a
              >
              <a href="#" class="akcija"
                ><input type="radio" name="layer1" class="radioClass" id="podloga_ortofoto" /> Ortofoto</a
              >
              <a href="#" class="akcija"
                ><input type="radio" name="layer1" class="radioClass" id="podloga_bez" /> Bez podloge</a
              >
              <a href="#" class="akcija"
                ><input type="checkbox" name="" class="radioClass" id="lejer_stubovi" checked="true" /> Stubovi</a
              >
              <a href="#" class="akcija"
                ><input type="checkbox" name="" class="radioClass" id="lejer_vodovi" checked="true" /> Vodovi</a
              >
              <a href="#" class="akcija"
                ><input type="checkbox" name="" class="radioClass" id="lejer_trafostanice" checked="true" />
                Trafostanice</a
              >
              <a href="#" class="akcija"
                ><input type="checkbox" name="" class="radioClass" id="lejer_trafostanice_poligoni" checked="true" />
                Trafostanice poligoni</a
              >
              <a href="#" class="akcija"
                ><input type="checkbox" name="" class="radioClass" id="lejer_prikljucno_mjesto" checked="true" />
                Prikljucno mjesto</a
              >
              <a href="#" class="akcija"
                ><input type="checkbox" name="" class="radioClass" id="lejer_nkro" checked="true" /> NKRO</a
              >
              <a href="#" class="akcija"
                ><input type="checkbox" name="" class="radioClass" id="lejer_potrosac" checked="true" /> Potrošač</a
              >
              <a href="#" class="akcija"
                ><input type="checkbox" name="" class="radioClass" id="lejer_pod" checked="true" />POD</a
              >
              <a href="#" class="akcija"
                ><input
                  type="checkbox"
                  name=""
                  class="radioClass"
                  id="lejer_nelegalni_potrosac"
                  checked="true"
                />Nelegalni potrošač</a
              >
              <a href="#" class="akcija"
                ><input type="checkbox" name="" class="radioClass" id="lejer_validations" />Validacija</a
              >
            </div>
          </div>
          <a href="#" id="restart" class="tooltip" data-tool="Restart"
            ><i class="fa fa-repeat" aria-hidden="true"></i
          ></a>
          <a href="naslovnaStranaUrl" id="home" class="tooltip" data-tool="Početna"><i class="fas fa-home"></i></a>
          <a id="userUrl" class="akcija" style="padding: 3px 16px">
            <i class="fas fa-user" style="font-size: 20px"> </i>
            <span style="display: block; font-size: 11px" id="userName"></span
          ></a>
          <a href="javascript:void(0);" class="icon" onclick="zatvoriHamburger()">&#9776;</a>
        </div>
      </div>
    </div>

    <div id="map" class="map"></div>

    <div id="atributiDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Atributi</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeDiv('#atributiDiv')">&times;</a>
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2">
          <div class="flex-row pb-8">
            <label for="gps">Redni broj u GPS:</label>
            <input type="text" id="gps" readonly disabled />
          </div>
          <div class="flex-row pb-8">
            <label for="broj">Broj stuba:</label>
            <input type="text" id="broj" />
          </div>
          <div class="flex-row pb-8">
            <label for="sifra">Šifra:</label>
            <input type="text" id="sifra" />
          </div>
          <div class="flex-row pb-8">
            <label for="tip">Tip stuba:</label>
            <select id="tip" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="vrsta_namjena">Vrsta stuba po namjeni:</label>
            <select id="vrsta_namjena" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="vrsta_materijal">Vrsta stuba po materijalu:</label>
            <select id="vrsta_materijal" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="vrsta_drvenog">Vrsta drvenog stuba:</label>
            <select id="vrsta_drvenog" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="nad_visina">Nadmorska visina (m):</label>
            <input type="number" id="nad_visina" />
          </div>
          <div class="flex-row pb-8">
            <label for="visina">Visina stuba(m):</label>
            <input type="number" id="visina" />
          </div>
          <div class="flex-row pb-8">
            <label for="rasp_prov">Raspored provodnika:</label>
            <input type="text" id="rasp_prov" />
          </div>
          <div class="flex-row pb-8">
            <label for="izolator_vrsta">Vrsta izolatora:</label>
            <select id="izolator_vrsta" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="izolator_funkcija">Vrsta izolatora po funkciji:</label>
            <select id="izolator_funkcija" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="br_izol_faza">Broj izolatora po fazi:</label>
            <input type="text" id="br_izol_faza" />
          </div>
          <div class="flex-row pb-8">
            <label for="tip_nosac_izol">Tip izolatora:</label>
            <select id="tip_nosac_izol" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="odvodnik_prenapona">Tip odvodnika prenapona:</label>
            <select id="odvodnik_prenapona" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="uzemljivac">Uzemljivač:</label>
            <select id="uzemljivac" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="uzemljivac_otpor">Otpor uzemljivača:</label>
            <input type="text" id="uzemljivac_otpor" />
          </div>
          <div class="flex-row pb-8">
            <label for="optika">Optika:</label>
            <select id="optika" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="rasvjeta">Lampa javne rasvjete:</label>
            <select id="rasvjeta" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="br_pom">Broj mjernih ormara:</label>
            <input type="text" id="br_pmo" />
          </div>
          <div class="flex-row pb-8">
            <label for="br_nnv">Broj NN vodova:</label>
            <input type="text" id="br_nnv" />
          </div>
          <div class="flex-row pb-8">
            <label for="pog_sprem">Pogonska spremnost:</label>
            <input type="text" id="pog_sprem" />
          </div>
          <div class="flex-row pb-8">
            <label for="vlasnistvo">Vlasnistvo:</label>
            <select id="vlasnistvo" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="opstina">Opština:</label>
            <input type="text" id="opstina" readonly disabled />
          </div>
          <div class="flex-row pb-8">
            <label for="napon">Napon:</label>
            <input type="text" id="napon" readonly disabled />
          </div>
          <div class="flex-row pb-8">
            <label for="prikljucak_otcjep">10kV kabal(prikljucak/otcjep):</label>
            <select id="prikljucak_otcjep" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="nn_vod">NN vod :</label>
            <select id="nn_vod" class="select-css"></select>
          </div>
          <div class="flex-row pb-8">
            <label for="rastavljac">Rastavljač:</label>
            <select id="rastavljac" class="select-css"></select>
          </div>
          <div class="flex-row">
            <label for="10_vod">10 kV vod:</label>
            <select id="10_vod" class="select-css"></select>
          </div>
        </div>
      </div>
      <div class="items-padd">
        <input type="file" class="w-100" accept="image/*" capture="environment" id="dodavanjeSlike" />
      </div>
      <div class="d-flex-end items-padd-sm">
        <button type="button" class="btn mr-8" id="btnSacuvaj"><i class="fas fa-check-circle"></i> Sačuvaj</button>
        <button type="button" class="btn" id="btnIzbrisi"><i class="fas fa-trash"></i> Izbriši</button>
      </div>
    </div>

    <div id="pretragaDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Pretraga</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeDiv('#pretragaDiv')">&times;</a>
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2">
          <div class="flex-row pb-8">
            <label for="ddl_pretraga_napon">Napon:</label>
            <select id="ddl_pretraga_napon" class="select-css">
              <option value=""></option>
              <option value="35">35kV</option>
              <option value="10">10kV</option>
              <option value="0.4">0.4kV</option>
            </select>
          </div>

          <div class="flex-row rowEnd pb-8">
            <label for="ddlLejer">Lejer:</label>
            <select id="ddlLejer" class="select-css inputClass">
              <option value="">Izaberite sloj podataka</option>
              <option value="stubovi">Stubovi</option>
              <option value="vodovi">Vodovi</option>
              <option value="trafostanice">Trafostanice</option>
              <option value="nkro">NKRO</option>
              <option value="prikljucno_mjesto">Priključno mjesto</option>
              <option value="view_potrosaci">Potrošači</option>
              <option value="view_solari">Solari</option>
              <option value="pod">POD</option>
              <option value="nelegalni_potrosac">Nelegalni potrošači</option>
            </select>
          </div>

          <div class="flex-row rowEnd pb-8" id="divPretragaNazivNapojneTS">
            <label for="pretraga_naziv_napojne_ts">Naziv napojne TS:</label>
            <input type="text" id="pretraga_naziv_napojne_ts" class="inputClass" />
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaSifraNapojneTS">
            <label for="pretraga_sifra_napojne_ts">Šifra napojne TS:</label>
            <input type="text" id="pretraga_sifra_napojne_ts" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaIzvodNapojneTS">
            <label for="pretraga_izvod_napojne_ts">Ime izvoda u TS:</label>
            <input type="text" id="pretraga_izvod_napojne_ts" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaGps">
            <label for="pretraga_gps">GPS:</label>
            <input type="text" id="pretraga_gps" class="inputClass" />
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaBroj">
            <label for="pretraga_broj">Broj:</label>
            <input type="text" id="pretraga_broj" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaTip">
            <label for="pretraga_tip">Tip:</label>
            <select id="pretraga_tip" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaNamjena">
            <label for="pretraga_vrsta_namjena">Namjena:</label>
            <select id="pretraga_vrsta_namjena" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaMaterijal">
            <label for="pretraga_vrsta_materijal">Materijal:</label>
            <select id="pretraga_vrsta_materijal" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaVrstaDrvenogStuba">
            <label for="pretraga_vrsta_drvenog">Vrsta drvenog stuba:</label>
            <select id="pretraga_vrsta_drvenog" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaNadmorskaVisina">
            <label for="pretraga_nad_visina">Nadmorska visina (m):</label>
            <input type="number" id="pretraga_nad_visina" class="inputClass" />
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaVisina">
            <label for="pretraga_visina">Visina (m):</label>
            <input type="number" id="pretraga_visina" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaRasporedProvodnika">
            <label for="pretraga_rasp_prov">Raspored provodnika:</label>
            <input type="text" id="pretraga_rasp_prov" class="inputClass" />
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaIzolatorVrsta">
            <label for="pretraga_izolator_vrsta">Vrsta izolatora:</label>
            <select id="pretraga_izolator_vrsta" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaIzolatorFunkcija">
            <label for="pretraga_izolator_funkcija">Vrsta izolatora po funkciji:</label>
            <select id="pretraga_izolator_funkcija" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaBrIzolFaza">
            <label for="pretraga_br_izol_faza">Broj izolatora po fazi:</label>
            <input type="text" id="pretraga_br_izol_faza" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaTipIzolatora">
            <label for="pretraga_tip_nosac_izol">Tip izolatora:</label>
            <select id="pretraga_tip_nosac_izol" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaOdvodnikPrenapona">
            <label for="pretraga_odvodnik_prenapona">Tip odvodnika prenapona:</label>
            <select id="pretraga_odvodnik_prenapona" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaUzemljivac">
            <label for="pretraga_uzemljivac">Uzemljivač:</label>
            <select id="pretraga_uzemljivac" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaOtporUzemljivaca">
            <label for="pretraga_uzemljivac_otpor">Otpor uzemljivača:</label>
            <input type="text" id="pretraga_uzemljivac_otpor" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaOptika">
            <label for="pretraga_optika">Optika:</label>
            <select id="pretraga_optika" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaRasvjeta">
            <label for="pretraga_rasvjeta">Javna rasvjeta:</label>
            <select id="pretraga_rasvjeta" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaBrPmo">
            <label for="pretraga_br_pmo">Broj mjernih ormara:</label>
            <input type="text" id="pretraga_br_pmo" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaBrNnv">
            <label for="pretraga_br_nnv">Broj NN vodova:</label>
            <input type="text" id="pretraga_br_nnv" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaPogSprem">
            <label for="pretraga_pog_sprem">Pogonska spremnost:</label>
            <input type="text" id="pretraga_pog_sprem" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaVlasnistvo">
            <label for="pretraga_vlasnistvo">Vlasnistvo:</label>
            <select id="pretraga_vlasnistvo" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaNapon">
            <label for="pretraga_napon">Napon:</label>
            <input type="text" id="pretraga_napon" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaPrikljucakOtcjep">
            <label for="pretraga_prikljucak_otcjep">10kV kabal(prikljucak/otcjep):</label>
            <select id="pretraga_prikljucak_otcjep" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaNnVod">
            <label for="pretraga_nn_vod">NN vod :</label>
            <select id="pretraga_nn_vod" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaRastavljac">
            <label for="pretraga_rastavljac">Rastavljač:</label>
            <select id="pretraga_rastavljac" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretraga10KvVod">
            <label for="pretraga_10_vod">10 kV vod:</label>
            <select id="pretraga_10_vod" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaNaziv">
            <label for="pretraga_naziv">Naziv:</label>
            <input type="text" id="pretraga_naziv" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaTs">
            <label for="pretraga_ts">Vod se napaja iz TS:</label>
            <input type="text" id="pretraga_ts" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaBrFaza">
            <label for="pretraga_br_faza">Broj faza:</label>
            <select id="pretraga_br_faza" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaVrsta">
            <label for="pretraga_vrsta">Vrsta:</label>
            <select id="pretraga_vrsta" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaPresjek">
            <label for="pretraga_presjek">Presjek voda (mm2):</label>
            <select id="pretraga_presjek" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaBrSpojnica">
            <label for="pretraga_br_spojnica">Broj spojnica:</label>
            <input type="text" id="pretraga_br_spojnica" class="inputClass" />
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaGodIzgr">
            <label for="pretraga_god_izg">Godina izgradnje:</label>
            <input type="text" id="pretraga_god_izg" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaUzePresjek">
            <label for="pretraga_uze_presjek">Zaštitno uže presjek mm2:</label>
            <select id="pretraga_uze_presjek" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaUze">
            <label for="pretraga_uze">Zaštitno uže materijal:</label>
            <select id="pretraga_uze" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaBrNnIzvoda">
            <label for="pretraga_br_nn_izvoda">Broj NN izvoda:</label>
            <input type="text" id="pretraga_br_nn_izvoda" class="inputClass" />
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaCelije10">
            <label for="pretraga_celije_10">Broj 10 kV ćelija:</label>
            <input type="text" id="pretraga_celije_10" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaProjekSnaga">
            <label for="pretraga_projek_snaga">Projektovana snaga:</label>
            <input type="text" id="pretraga_projek_snaga" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaInstSnaga1">
            <label for="pretraga_inst_snaga_t1">Snaga T1 (kVA):</label>
            <select id="pretraga_inst_snaga_t1" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaInstSnaga2">
            <label for="pretraga_inst_snaga_t2">Snaga T2 (kVA):</label>
            <select id="pretraga_inst_snaga_t2" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaInstSnaga3">
            <label for="pretraga_inst_snaga_t3">Snaga T3 (kVA):</label>
            <select id="pretraga_inst_snaga_t3" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaInstSnaga4">
            <label for="pretraga_inst_snaga_t4">Snaga T4 (kVA):</label>
            <select id="pretraga_inst_snaga_t4" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaPrenosOdnos">
            <label for="pretraga_prenos_odnos">Prenosni odnos:</label>
            <select id="pretraga_prenos_odnos" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaIzvodCelija">
            <label for="pretraga_izvod_celija">Izvod u napojnoj TS:</label>
            <input type="text" id="pretraga_izvod_celija" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaFunkcija">
            <label for="pretraga_funkcija">Funkcija objekta:</label>
            <select id="pretraga_funkcija" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaIdBilling">
            <label for="pretraga_id_billing">Identifikacioni broj (Biling):</label>
            <input type="text" id="pretraga_id_billing" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaId">
            <label for="pretraga_id">Id:</label>
            <input type="text" id="pretraga_id" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaOsiguraci">
            <label for="pretraga_osiguraci">Osigurači:</label>
            <select id="pretraga_osiguraci" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaMontaza">
            <label for="pretraga_montaza">Montaža:</label>
            <select id="pretraga_montaza" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaVrata">
            <label for="pretraga_vrata">Vrata:</label>
            <select id="pretraga_vrata" class="select-css inputClass"></select>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaBrIzvoda">
            <label for="pretraga_br_izvoda">Broj izvoda:</label>
            <input type="text" id="pretraga_br_izvoda" class="inputClass"/>
          </div>
          <div class="flex-row rowEnd pb-8" id="divPretragaBrPrikljucaka">
            <label for="pretraga_br_prikljucaka">Broj priključaka:</label>
            <input type="text" id="pretraga_br_prikljucaka" class="inputClass"/>
          </div>
        </div>
      </div>
      <div class="d-flex-end items-padd-sm">
        <button type="button" class="btn" id="btnFilter"><i class="fas fa-search"></i> Filtriranje</button>
      </div>
    </div>

    <div id="odabirObjektaZaDodavanjeWizardDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Odabir objekta za dodavanje</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeDiv('#odabirObjektaZaDodavanjeWizardDiv')"
          >&times;</a
        >
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2 povezivanjevodovadiv">
          <div class="flex-row pb-8">
            <label for="ddlObjekatZaDodavanje">Objekat:</label>
            <select class="select-css selectStart" id="ddlObjekatZaDodavanjeWizard"></select>
            <a class="tooltip markerButton" data-tool="Odaberite na mapi" id="tool411">
              <button class="dugmeodabirmapa" id="btnObjekatZaDodavanjeWizard">
                <i class="fas fa-map-marker-alt"></i>
              </button>
            </a>
          </div>
        </div>
      </div>
      <div class="d-flex-end items-padd-sm">
        <button type="button" class="btn mr-8" id="btnPotvrdiObjekatZaDodavanjeWizard">
          <i class="fas fa-check-circle"></i> Potvrdi
        </button>
      </div>
    </div>

    <!-- Modalna fotografija -->
    <div id="modalFotografija" class="modal">
      <span id="zatvoriModalFotografija" class="close">&times;</span>
      <img class="modal-content" id="imgModal" alt="Nema fotografije" />
      <div id="naslovFotografija"></div>
      <a class="prev" onclick="prikaziSliku(-1)">&#10094;</a>
      <a class="next" onclick="prikaziSliku(1)">&#10095;</a>
    </div>
    <!-- Toast -->
    <div id="toast"></div>
    <!-- Modal confirm-->
    <div id="modalConfirm" class="modal">
      <span onclick="confirmOdustani" class="close" title="Close Modal">&times;</span>
      <div class="confirm-modal-content confirm-container">
        <h2 id="modalConfirmHeader"></h2>
        <h4 id="modalConfirmText"></h4>

        <div class="confirm-clearfix">
          <button type="button" class="confirmbtn confirm-cancelbtn" id="confirmOdustani">Odustani</button>
          <button type="button" class="confirmbtn confirm-deletebtn" id="confirmPotvrdi">Potvrdi</button>
        </div>
      </div>
    </div>
    <!-- Modal spinner za ajax request-->
    <div id="fadeSpinner"></div>
    <div id="modalSpinner">
      <img src="../../novi_portal/olcedis/img/loading.gif" alt="Loading..." />
    </div>
    <div class="razmjera" id="razmjera"></div>
    <div class="koordinate" id="koordinate"></div>

    <div id="wizardDiv" class="sidenav">
      <div class="titleAndClose">
        <h1 id="wizardHeader">Uparivanje trafostanica</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeDiv('#wizardDiv')">&times;</a>
      </div>
      <div class="items-padd" id="divWizardOdabirNaponskogNivoa" style="display: none">
        <div class="flex-row pb-8">
          <label for="ddlWizardNaponskiNivo">Odabir naponskog nivoa:</label>
          <select id="ddlWizardNaponskiNivo" class="select-css">
            <option value="35">35kV</option>
            <option value="10">10kV</option>
            <option value="0.4">0.4kV</option>
          </select>
        </div>
      </div>
      <div class="items-padd" id="divWizardOdabirNapojneTrafostanice" style="display: none">
        <div class="items-padd">
          <div class="flex-row pb-8">
            <label for="uparivanjeTxtSifraTS">Šifra napojne trafostanice:</label>
            <span id="uparivanjeTxtSifraTS"></span>
          </div>
          <div class="flex-row pb-8">
            <label for="uparivanjeTxtNazivTrafostanice">Naziv napojne trafostanice:</label>
            <span id="uparivanjeTxtNazivTrafostanice"></span>
          </div>
          <div class="flex-row pb-8">
            <label for="uparivanjeTxtNazivIzvodaTS">Naziv izvoda napojne ts:</label>
            <select id="uparivanjeTxtNazivIzvodaTS" class="select-css"></select>
          </div>
        </div>
      </div>
      <div class="items-padd" id="divWizardUparivanjeTrafostanica" style="display: none">
        <div class="flex-row pb-8">
          <label for="ddlPovezivanjeTSselektovane">Selektovane trafostanice:</label>
          <select id="ddlPovezivanjeTSselektovane" class="select-css"></select>
        </div>
        <div class="flex-row pb-8">
          <label for="ddlPovezivanjeTSpronadjene">Neuparene trafostanice iz TB:</label>
          <select id="ddlPovezivanjeTSpronadjene" class="select-css"></select>
        </div>
        <div class="items-padd-sm d-flex-end">
          <button type="button" class="btn" id="btnPoveziTS">Uparivanje</button>
          <button type="button" class="btn" id="btnOdabirNapojneTS">Napojna TS</button>
        </div>
      </div>
      <div class="items-padd" id="divWizardUparivanjeVodova" style="display: none">
        <div class="flex-row pb-8">
          <label for="ddlPovezivanjeVodovaSelektovane">Selektovani vodovi:</label>
          <select id="ddlPovezivanjeVodovaSelektovane" class="select-css"></select>
        </div>
        <div class="flex-row pb-8">
          <label for="ddlPovezivanjeVodovaPronadjene">Neupareni vodovi iz TB:</label>
          <select id="ddlPovezivanjeVodovaPronadjene" class="select-css"></select>
        </div>
        <div class="items-padd-sm d-flex-end">
          <button type="button" class="btn" id="btnPoveziVodove">Uparivanje</button>
        </div>
      </div>
      <div class="items-padd-sm d-flex-end">
        <button type="button" class="btn" id="btnWizardNext">Dalje</button>
      </div>
    </div>

    <div class="right-bar" id="right-bar-modal-attribute" style="width: 650px;display: none">
      <div data-simplebar class="h-100">
        <div class="row" style="padding: 0px !important;">
          <div class="col-lg-12">
            <h2 class="titleDraw">Pregled</h2>
            <i class="fas fa-times closeMenu" onclick="closeAtributes()"></i>
          </div>

          <div class="col-lg-12">
            <div class="accordion custom-accordion" id="atributesAccordion" style="overflow: auto;width: 100%;height: 85vh;">
              
            </div>
          </div>
        </div>
      </div>

      <!-- end slimscroll-menu-->
    </div>


    <script type="text/javascript">
      const citajSlikeUrl = "urlZaCitanjeFotografija",
        izbrisiZapisUrl = "urlZaBrisanjeZapisa",
        sacuvajZapisUrl = "urlZaCuvanjeZapisa",
        naslovnaStranaUrl = "urlZaCuvanjeZapisa";
    </script>

    <script src="../../novi_portal/olcedis/js/common/constants.js"></script>
    <script src="../../novi_portal/olcedis/js/common/global.js"></script>
    <script src="../../novi_portal/olcedis/js/plugin/turf.min.js"></script>
    <script src="../../novi_portal/olcedis/js/plugin/ol.js"></script>
    <script src="../../novi_portal/olcedis/js/plugin/sweetalert2.all.min.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/editUtil.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/edit.js"></script>
    <!--<script src="js/snap.js"></script>-->
    <script src="../../novi_portal/olcedis/js/wizard/kreiranjeVoda.js"></script>
    <script src="../../novi_portal/olcedis/js/common/webServisi.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/editTrafostanice.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/editStubovi.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/editVodovi.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/editPotrosaci.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/editNKRO.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/editPrikljucnoMjesto.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/editPOD.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/tok.js"></script>
    <script src="../../novi_portal/olcedis/js/common/webServisiUnosIzmjena.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/niskonaponski.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/polygonMask.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/wizard_preparation.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/pojedinacniSelect.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/poligonSelect.js"></script>
    <script src="../../novi_portal/olcedis/js/wizard/atributi.js"></script>

  </body>
</html>
