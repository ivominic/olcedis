<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Geoportal - CEDIS</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta content="CEDIS, GIS" name="description" />
    <meta content="CEDIS" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="../../administracija/olcedis/img/favicon.ico" />
    <link href="../../administracija/olcedis/libs/animate.css/animate.min.css" rel="stylesheet" type="text/css" />
    <link href="../../administracija/olcedis/libs/animate.css/animate.compat.css" rel="stylesheet" type="text/css" />
    <link href="../../administracija/olcedis/libs/ion-rangeslider/css/ion.rangeSlider.min.css" rel="stylesheet" type="text/css" />
    <link href="../../administracija/olcedis/libs/flatpickr/flatpickr.min.css" rel="stylesheet" type="text/css" />
    <link href="../../administracija/olcedis/libs/selectize/css/selectize.bootstrap3.css" rel="stylesheet" type="text/css" />
    <link href="../../administracija/olcedis/css/config/default/app.min.css" rel="stylesheet" type="text/css" id="app-style" />
    <link href="../../administracija/olcedis/css/main.css" rel="stylesheet" type="text/css" />
    <link href="../../administracija/olcedis/css/icons.min.css" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@300;400&display=swap" rel="stylesheet" />
    <script src="https://kit.fontawesome.com/324033e9e1.js" crossorigin="anonymous"></script>
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,requestAnimationFrame,Element.prototype.classList,URL"></script>
    <link rel="stylesheet" href="../../administracija/olcedis/css/util.css" />
    <link rel="stylesheet" href="../../administracija/olcedis/css/stil2New.css" />
    <link rel="stylesheet" href="../../administracija/olcedis/css/slika.css" />
    <link rel="stylesheet" href="../../administracija/olcedis/css/ol.css" />
    <link rel="stylesheet" href="../../administracija/olcedis/css/sweetalert2.min.css" />
    <!-- <link rel="stylesheet" href="css/ol-ext.css" />
    <link rel="stylesheet" href="css/style.css" /> -->

    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>
    <script src="../../administracija/olcedis/js/plugin/ol.js"></script>
    <script src="https://unpkg.com/elm-pep@1.0.6/dist/elm-pep.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/3.18.3/minified.js"></script>
  </head>
  <!-- body start -->
  <body
    class="loading"
    data-layout-mode="default"
    data-layout-color="light"
    data-layout-width="fluid"
    data-topbar-color="dark"
    data-menu-position="fixed"
    data-leftbar-color="light"
    data-leftbar-size="condensed"
    data-sidebar-user="false"
  >
    <!-- Begin page -->
    <div id="wrapper">
      <!-- Topbar Start -->
      <div class="navbar-custom" id="topNav">
        <div class="container-fluid">
          <ul class="list-unstyled topnav-menu float-end mb-0">
            <li class="dropdown d-none d-lg-inline-block" data-bs-toggle="tooltip"
            data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Full screen">
              <a class="nav-link dropdown-toggle arrow-none waves-effect waves-light" data-toggle="fullscreen" href="#">
                <i class="fe-maximize noti-icon"></i>
              </a>
            </li>

            <li class="notification-list">
              <a
                class="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light"
                href="#"
              >
                <img src="../../administracija/olcedis/img/users/user-3.png" alt="user-image" class="rounded-circle" />
                <span class="pro-user-name ms-1">
                  <span id="userName"></span>
                </span>
              </a>
            </li>
          </ul>

          <ul class="list-unstyled topnav-menu topnav-menu-left m-0">
            <li>
              <button class="button-menu-mobile waves-effect waves-light">
                <i class="fe-menu"></i>
              </button>
            </li>

            <li id="handButton" class="activeLi">
              <button class="button-menu-mobile waves-effect waves-light" id="pan">
                <i class="far fa-hand-paper" style="transform: translateY(0px); color: white"></i>
              </button>
            </li>

            <li id="layerMenu" style="margin-left: 2px">
              <button class="button-menu-mobile waves-effect waves-light" onclick="showModalLeft()" data-bs-toggle="tooltip"
               data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Lejeri">
                <i data-feather="layers" style="transform: translateY(-3px); color: white"></i>
              </button>
            </li>

            <li id="dodajMenu" style="margin-left: 2px">
              <button class="button-menu-mobile waves-effect waves-light" id="dodaj" data-bs-toggle="tooltip"
              data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Novi">
                <i data-feather="plus-square" style="transform: translateY(-3px); color: white"></i>
              </button>
            </li>

            <li id="potvrdaMenu" style="margin-left: 2px">
              <button class="button-menu-mobile waves-effect waves-light" id="potvrda" data-bs-toggle="tooltip"
              data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Pošalji na validaciju">
                <i data-feather="check-square" style="transform: translateY(-3px); color: white"></i>
              </button>
            </li>

            <li>
              <!-- Mobile menu toggle (Horizontal Layout)-->
              <a class="navbar-toggle nav-link" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                <div class="lines">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </a>
              <!-- End mobile menu toggle-->
            </li>
          </ul>
          <div class="clearfix"></div>
        </div>
      </div>
      <!-- end Topbar -->

      <!-- ========== Left Sidebar Start ========== -->
      <div class="left-side-menu">
        <div class="h-100" data-simplebar>
          <!--- Sidemenu -->
          <div id="sidebar-menu">
            <ul id="side-menu">
              <li id="attributeButtonli">
                <a id="atributi">
                  <i data-feather="info"></i>
                  <span> Atributi </span>
                </a>
              </li>
              <li id="pregledButtonli">
                <a id="pregled">
                  <i class="mdi mdi-information-variant"></i>
                  <span> Pregled </span>
                </a>
              </li>
              <li id="drawButtonli">
                <a id="drawButton">
                  <i class="fas fa-pen"></i>
                  <span> Poligon/Linija/Tačka </span>
                </a>
              </li>

              <li id="brisanjeDiv">
                <a id="brisanje" style="width: calc(190px + 120px);">
                  <i class="mdi mdi-eraser" style="scale: 1.4;"></i>
                  <span> Brisanje-Poligon/Linija/Tacka </span>
                </a>
              </li>

              <li>
                <a id="brisanjeViseObjekata" style="width: calc(190px + 120px);">
                  <i data-feather="trash" style="width: 16px;"></i>
                  <span>  Masovno brisanje objekata </span>
                </a>
              </li>

              <li id="izmjenaVodaDiv">
                <a href="#" data-bs-toggle="collapse" class="izmjenaVodaFirst">
                  <i data-feather="edit" class="editIcon"></i>
                  <span> Izmjena Voda </span>
                  <span class="menu-arrow"></span>
                </a>
                <div class="collapse" id="sidebarCrm1">
                  <ul class="nav-second-level" style="width: 440px;">
                    <li>
                      <a href="#" id="vodDodvanjeObjektaBtn" style="width: 100%;"
                        ><i class="fas fa-directions icons-xs"></i>
                        <span style="display: inline-block; margin-left: 1px"> Umetanje tačkastih objekata između susjednih tačaka dionice </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" id="vodPomjeranjeObjektaBtn" style="width: 100%;"
                        ><i class="fas fa-directions icons-xs"></i>
                        <span style="display: inline-block; margin-left: 1px"> Izmještanje tačkastog objekta dionice </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" id="vodProduzenjeKrakaBtn" style="width: 100%;"
                        ><i class="fas fa-directions icons-xs"></i>
                        <span style="display: inline-block; margin-left: 1px"> Pomjeranje kraka dionice </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <a href="#" data-bs-toggle="collapse" id="snapDiv">
                  <i data-feather="link"></i>
                  <span> Snap </span>
                  <span class="menu-arrow"></span>
                </a>
                <div class="collapse" id="sidebarCrm2">
                  <ul class="nav-second-level2">

                    <li>
                      <a href="#sidebarMultilevel2" data-bs-toggle="collapse" class="dropdown-item" id="stuboviMain">
                        <i class="mdi mdi-layers-outline"></i> Stubovi <span class="menu-arrow"></span>
                      </a>
                      <div class="collapse" id="sidebarMultilevel2">
                          <ul class="nav-second-level">
                            <li>
                              <a href="#" id="snapStub35" class="dropdown-item">
                                <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                                <span style="display: inline-block; margin-left: 1px"> Stub 35kV </span>
                              </a>
                            </li>
                            <li>
                              <a href="#" id="snapStub10Kv" class="dropdown-item">
                                <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                                <span style="display: inline-block; margin-left: 1px"> Stub 10kV </span>
                              </a>
                            </li>
                            <li>
                              <a href="#" id="snapStub04Kv" class="dropdown-item"
                                > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                                <span style="display: inline-block; margin-left: 1px"> Stub 04kV</span>
                              </a>
                            </li>
                          </ul>
                      </div>
                  </li>

                  <li>
                    <a href="#sidebarMultilevel3" data-bs-toggle="collapse" class="dropdown-item" id="trafostaniceMain">
                      <i class="mdi mdi-layers-outline"></i> Trafostanice <span class="menu-arrow"></span>
                    </a>
                    <div class="collapse" id="sidebarMultilevel3">
                        <ul class="nav-second-level">
                          <li>
                            <a href="#" id="snapTrafostanica110" class="dropdown-item"
                              > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                              <span style="display: inline-block; margin-left: 1px"> Trafostanica 110kV</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" id="snapTrafostanica35" class="dropdown-item"
                              > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                              <span style="display: inline-block; margin-left: 1px"> Trafostanica 35kV</span>
                            </a>
                          </li>
                          <li>
                            <a href="#" id="snapTrafostanica10Kv" class="dropdown-item"
                              > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                              <span style="display: inline-block; margin-left: 1px"> Trafostanica 10kV</span>
                            </a>
                          </li>
                        </ul>
                    </div>
                </li>

                    <li>
                      <a href="#" id="snapVod35" class="dropdown-item"
                        > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                        <span style="display: inline-block; margin-left: 1px"> Vod 35kV</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" id="snapVod10Kv" class="dropdown-item"
                        > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                        <span style="display: inline-block; margin-left: 1px"> Vod 10kV</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" id="snapVod04Kv" class="dropdown-item"
                        > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                        <span style="display: inline-block; margin-left: 1px"> Vod 04kV</span>
                      </a>
                    </li>
                    
                    <li>
                      <a href="#" id="snapNKRO" class="dropdown-item"
                        > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                        <span style="display: inline-block; margin-left: 1px"> NKRO</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" id="snapPrikljucnoMjesto" class="dropdown-item"
                        > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                        <span style="display: inline-block; margin-left: 1px"> Priključno mjesto</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" id="snapPotrosac" class="dropdown-item"
                        > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                        <span style="display: inline-block; margin-left: 1px"> Potrošač</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" id="snapPOD" class="dropdown-item"
                        > <i class="mdi mdi-checkbox-blank-circle-outline icons-xs" style="width: 18px;"></i>
                        <span style="display: inline-block; margin-left: 1px"> POD</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>

              <li id="pretragaMenu">
                <a href="#" data-bs-toggle="collapse" id="pretraga">
                  <i data-feather="search"></i>
                  <span> Filtriranje </span>
                </a>
              </li>

              <li>
                <a href="#" data-bs-toggle="collapse">
                  <i data-feather="download"></i>
                  <span> Preuzimanje sa mape</span>
                  <span class="menu-arrow"></span>
                </a>
                <div class="collapse" id="sidebarCrm3">
                  <ul class="nav-second-level">
                    <li>
                      <a href="#" id="shp"
                        ><i class="mdi mdi-checkbox-blank-circle-outline icons-xs"></i>
                        <span style="display: inline-block; margin-left: 1px"> SHP </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" id="kml"
                        ><i class="mdi mdi-checkbox-blank-circle-outline icons-xs"></i>
                        <span style="display: inline-block; margin-left: 1px"> KML </span>
                      </a>
                    </li>
                    <li>
                      <a href="#" id="excel"
                        ><i class="mdi mdi-checkbox-blank-circle-outline icons-xs"></i>
                        <span style="display: inline-block; margin-left: 1px"> EXCEL </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <!-- End Sidebar -->
          <div class="clearfix"></div>
        </div>
        <!-- Sidebar -left -->
      </div>
      <!-- Left Sidebar End -->

      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="content-page">
        <div class="content">
          <!-- Start Content-->
          <div class="container-fluid">
            <div class="modal-left" id="modal-left">
              <div class="row">
                <div class="col-lg-12">
                  <h2 class="titleDraw">Lejeri</h2>
                  <i class="fas fa-times closeMenu" onclick="closeModalLeft()"></i>
                </div>
                <div class="col-lg-12" style="padding: 14px 32px 0px 32px;">

                  <input type="text" id="range_15" value="100" min="0" max="100" />
                  <div class="row mt-2">
                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_stubovi" checked />
                        <label class="form-check-label" for="lejer_stubovi">Stubovi</label>
                        <i class="mdi mdi-map-legend" style="float: right;scale: 1.7;" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda" onclick="setupImageLegend('stubovi')"></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_vodovi" checked />
                        <label class="form-check-label" for="lejer_vodovi">Vodovi</label>
                        <i class="mdi mdi-map-legend" style="float: right;scale: 1.7;" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda" onclick="setupImageLegend('vodovi')"></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_trafostanice" checked />
                        <label class="form-check-label" for="lejer_trafostanice">Trafostanice</label>
                        <i
                          class="mdi mdi-map-legend"
                          style="float: right;scale: 1.7;"
                          onclick="setupImageLegend('view_trafostanice')"
                          data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda"
                        ></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="lejer_trafostanice_poligoni"
                          checked
                        />
                        <label class="form-check-label" for="lejer_trafostanice_poligoni"
                          >Trafostanice poligoni</label
                        >
                        <i
                          class="mdi mdi-map-legend"
                          style="float: right;scale: 1.7;"
                          onclick="setupImageLegend('trafostanice_poligoni')"
                          data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda"
                        ></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_prikljucno_mjesto" checked />
                        <label class="form-check-label" for="lejer_prikljucno_mjesto">Priključno mjesto</label>
                        <i
                          class="mdi mdi-map-legend"
                          style="float: right;scale: 1.7;"
                          onclick="setupImageLegend('prikljucno_mjesto')"
                          data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda"
                        ></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_nkro" checked />
                        <label class="form-check-label" for="lejer_nkro">NKRO</label>
                        <i class="mdi mdi-map-legend" style="float: right;scale: 1.7;" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda" onclick="setupImageLegend('nkro')"></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_potrosac" checked />
                        <label class="form-check-label" for="lejer_potrosac">Potrošač</label>
                        <i
                          class="mdi mdi-map-legend"
                          style="float: right;scale: 1.7;"
                          data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda"
                          onclick="setupImageLegend('view_potrosaci')"
                        ></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_nelegalni_potrosac" />
                        <label class="form-check-label" for="lejer_nelegalni_potrosac"
                          >Nelegalni potrošač</label
                        >
                        <i
                          class="mdi mdi-map-legend"
                          style="float: right;scale: 1.7;"
                          data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda"
                          onclick="setupImageLegend('nelegalni_potrosac')"
                        ></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_pod" checked />
                        <label class="form-check-label" for="lejer_pod">POD</label>
                        <i class="mdi mdi-map-legend" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda" style="float: right;scale: 1.7;" onclick="setupImageLegend('view_pod')"></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_prikljucna_konzola" checked />
                        <label class="form-check-label" for="lejer_prikljucna_konzola">Prikljucna konzola</label>
                        <i class="mdi mdi-map-legend" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda" style="float: right;scale: 1.7;" onclick="setupImageLegend('prikljucna_konzola')"></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_validations" />
                        <label class="form-check-label" for="lejer_validations">Validacija</label>
                        <i
                          class="mdi mdi-map-legend"
                          data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda"
                          style="float: right;scale: 1.7;"
                          onclick="setupImageLegend('validations')"
                        ></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_poslovni_objekat" />
                        <label class="form-check-label" for="lejer_poslovni_objekat">Poslovni objekat</label>
                        <i
                          class="mdi mdi-map-legend"
                          data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda"
                          style="float: right;scale: 1.7;"
                          onclick="setupImageLegend('poslovni_objekti')"
                        ></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_odbijeni" />
                        <label class="form-check-label" for="lejer_odbijeni">Odbijene validacije</label>
                        <i
                          class="mdi mdi-map-legend"
                          data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda"
                          style="float: right;scale: 1.7;"
                          onclick="setupImageLegend('view_odbijeni')"
                        ></i>
                      </div>
                    </div>

                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="lejer_solari" checked/>
                        <label class="form-check-label" for="solari">Solari</label>
                        <i
                          class="mdi mdi-map-legend"
                          data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Legenda"
                          style="float: right;scale: 1.7;"
                          onclick="setupImageLegend('view_solari')"
                        ></i>
                      </div>
                    </div>
                  <hr style="margin-bottom: 10px;">
                    <div class="col-lg-12 mb-2">
                      <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" id="checkAllLayers" />
                        <label class="form-check-label" for="checkAllLayers">Uključi sve</label>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-center" id="modal-center">
              <div class="row">
                <div class="col-lg-12">
                  <h2 class="titleDraw">Legenda</h2>
                  <i class="fas fa-times closeMenu" onclick="closeLegendModal()"></i>
                </div>
                <div class="col-lg-12" style="background-color: #f2f2f2">
                  <img src="" style="padding: 10px" id="legenda" />
                </div>
              </div>
            </div>

            <div id="map" class="map"></div>
            <div class="razmjera" id="razmjera"></div>
            <div class="koordinate" id="koordinate"></div>
            <a id="image-download" download="map.png" crossorigin="anonymous"></a>

            <div class="scale" id="scale-line"></div>
          </div>

          <div id="lejeriDiv" class="lejeri-stil">
            <div class="text-layer" style="display: none">
              <i data-feather="layers" style="width: 1rem"></i><span> Layers</span>
            </div>
          </div>
          <div
            id="chooseLayerContainer"
            class="choose-layer-stil fadeIn animated"
            style="display: none"
            onmouseleave="closeMenuForLayers()"
          >
            <div class="row text-center">
              <div class="col-4 activeMap" id="osmMapDiv">
                <img src="../../administracija/olcedis/img/osm.png" class="img-fluid" />
                <span class="layerSelectionText">OSM</span>
              </div>

              <div class="col-4" id="sateliteMapDiv">
                <img src="../../administracija/olcedis/img/satelite_item.png" class="img-fluid" />
                <span class="layerSelectionText">Satelit</span>
              </div>

              <div class="col-4" id="topoMapDiv">
                <img src="../../administracija/olcedis/img/topo.png" class="img-fluid" />
                <span class="layerSelectionText">Ortofoto</span>
              </div>

              <div class="col-4" id="bezPodlogeDiv" style="margin-top: 13px;cursor: pointer;">
                <img src="../../administracija/olcedis/img/without_map.png" class="img-fluid" />
                <span class="layerSelectionText">Bez podloge</span>
              </div>
            </div>
          </div>

          <div id="alatiDiv" class="alati-stil">
            <a href="#" id="undo" data-bs-toggle="tooltip"
            data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Undo"><i class="fas fa-undo" aria-hidden="true"></i></a>
            <a href="#" id="redo" data-bs-toggle="tooltip"
            data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Redo"><i class="fas fa-redo" aria-hidden="true"></i></a>
            <a href="#" id="pocetniPrikazMape" data-bs-toggle="tooltip"
            data-bs-trigger="hover" data-bs-placement="bottom" data-bs-original-title="Početni prikaz"><i class="fas fa-fast-backward" aria-hidden="true"></i></a>
          </div>
        </div>

        <!-- Footer Start -->
        <!-- <footer class="footer">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-6">
                <script>
                  document.write(new Date().getFullYear());
                </script>
                &copy; Copyright <a href="">Winsoft d.o.o</a>
              </div>
              <div class="col-md-6">
                <div class="text-md-end footer-links d-none d-sm-block">
                  <a href="javascript:void(0);">O nama</a>
                  <a href="javascript:void(0);">Pomoć</a>
                  <a href="javascript:void(0);">Kontaktirajte nas</a>
                </div>
              </div>
            </div>
          </div>
        </footer> -->
        <!-- end Footer -->
      </div>

      <!-- ============================================================== -->
      <!-- End Page content -->
      <!-- ============================================================== -->
    </div>
    <!-- END wrapper -->

    <!-- Right Sidebar Drawing -->
    <!-- Right Sidebar Attribute -->
    <div class="right-bar" id="right-bar-modal-attribute" style="width: 650px;">
      <div data-simplebar class="h-100">
        <div class="row">
          <div class="col-lg-12">
            <h2 class="titleDraw">Pregled</h2>
            <i class="fas fa-times closeMenu" onclick="closeModal()"></i>
          </div>

          <div class="col-lg-12">
            <div class="accordion custom-accordion" id="atributesAccordion">
            </div>
          </div>
        </div>
      </div>

      <!-- end slimscroll-menu-->
    </div>
    <!-- /Right-bar Attribute -->

    <!-- Right Sidebar Draw -->
    <div class="right-bar" id="right-bar-modal">
      <div data-simplebar class="h-100">
        <div class="row">
          <div class="col-lg-12">
            <h2 class="titleDraw">Crtanje</h2>
            <i class="fas fa-times closeMenu" onclick="closeModal()"></i>
          </div>

          <div class="col-lg-12">
            <div style="display: none" id="crtanje"></div>
            <div class="accordion custom-accordion" id="custom-accordion-one">
              <div class="card mb-0 cardClass">
                <div class="card-header" id="headingNine">
                  <h5 class="m-0 position-relative">
                    <a
                      class="custom-accordion-title text-reset collapsed d-block"
                      data-bs-toggle="collapse"
                      href="#collapseNine"
                      aria-expanded="false"
                      aria-controls="collapseNine"
                      id="marker"
                    >
                      <i class="far fa-dot-circle" style="width: 33px"></i>
                      <span>Tačka</span><i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>

                <div
                  id="collapseNine"
                  class="collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-6">
                        <p style="margin-left: 37px">VELIČINA</p>
                      </div>
                      <div class="col-6" id="pointDiv">
                        <p class="velicinaPara" onclick="pointDraw(8)" id="point8">8px</p>
                        <p class="velicinaPara" onclick="pointDraw(12)" id="point12">12px</p>
                        <p class="velicinaPara" onclick="pointDraw(24)" id="point24">24px</p>
                        <p class="velicinaPara" onclick="pointDraw(32)" id="point32">32px</p>
                      </div>

                      <div class="col-6 pt-2">
                        <p style="margin-left: 39px">BOJA</p>
                      </div>
                      <div class="col-6 pt-2">
                        <div
                          class="colorSpan"
                          style="background-color: #40f200"
                          onclick="pointColor('green')"
                          id="pointGreen"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #00d9ff"
                          onclick="pointColor('blue')"
                          id="pointBlue"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #ffff00"
                          onclick="pointColor('yellow')"
                          id="pointYellow"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #ffa621"
                          onclick="pointColor('orange')"
                          id="pointOrange"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #d70000"
                          onclick="pointColor('red')"
                          id="pointRed"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-0 cardClass">
                <div class="card-header">
                  <h5 class="m-0 position-relative">
                    <a
                      class="custom-accordion-title text-reset collapsed d-block"
                      data-bs-toggle="collapse"
                      href="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                      id="linija"
                    >
                      <i class="fas fa-slash" style="width: 33px"></i>
                      <span>Linija</span><i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>
                <div
                  id="collapseFive"
                  class="collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-6">
                        <p style="margin-left: 37px">VELIČINA</p>
                      </div>
                      <div class="col-6">
                        <p class="velicinaPara" onclick="lineDraw(1)" id="line1">1px</p>
                        <p class="velicinaPara" onclick="lineDraw(2)" id="line2">2px</p>
                        <p class="velicinaPara" onclick="lineDraw(3)" id="line3">3px</p>
                        <p class="velicinaPara" onclick="lineDraw(4)" id="line4">4px</p>
                      </div>

                      <div class="col-6 pt-2">
                        <p style="margin-left: 39px">BOJA</p>
                      </div>
                      <div class="col-6 pt-2">
                        <div
                          class="colorSpan"
                          style="background-color: #40f200"
                          id="lineGreen"
                          onclick="pointColor('green')"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #00d9ff"
                          id="lineBlue"
                          onclick="pointColor('blue')"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #ffff00"
                          id="lineYellow"
                          onclick="pointColor('yellow')"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #ffa621"
                          id="lineOrange"
                          onclick="pointColor('orange')"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #d70000"
                          id="lineRed"
                          onclick="pointColor('red')"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card mb-0 cardClass">
                <div class="card-header" id="headingSix">
                  <h5 class="m-0 position-relative">
                    <a
                      class="custom-accordion-title text-reset collapsed d-block"
                      data-bs-toggle="collapse"
                      href="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                      id="poligon"
                    >
                      <i class="fas fa-draw-polygon" style="font-size: 20px; width: 33px"></i>
                      <span>Poligon</span><i class="mdi mdi-chevron-down accordion-arrow"></i>
                    </a>
                  </h5>
                </div>
                <div
                  id="collapseSix"
                  class="collapse"
                  aria-labelledby="headingSix"
                  data-bs-parent="#custom-accordion-one"
                >
                  <div class="card-body">
                    <div class="row">
                      <div class="col-6">
                        <p style="margin-left: 37px">VELIČINA</p>
                      </div>
                      <div class="col-6">
                        <p class="velicinaPara" id="polygon1" onclick="lineDraw(1)">1px</p>
                        <p class="velicinaPara" id="polygon2" onclick="lineDraw(2)">2px</p>
                        <p class="velicinaPara" id="polygon3" onclick="lineDraw(3)">3px</p>
                        <p class="velicinaPara" id="polygon4" onclick="lineDraw(4)">4px</p>
                      </div>

                      <div class="col-6 pt-2">
                        <p style="margin-left: 39px">BOJA</p>
                      </div>
                      <div class="col-6 pt-2">
                        <div
                          class="colorSpan"
                          style="background-color: #40f200"
                          id="polygonGreen"
                          onclick="pointColor('green')"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #00d9ff"
                          id="polygonBlue"
                          onclick="pointColor('blue')"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #ffff00"
                          id="polygonYellow"
                          onclick="pointColor('yellow')"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #ffa621"
                          id="polygonOrange"
                          onclick="pointColor('orange')"
                        ></div>
                        <div
                          class="colorSpan"
                          style="background-color: #d70000"
                          id="polygonRed"
                          onclick="pointColor('red')"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12" style="padding: 10px 32px">
                  <button
                    type="button"
                    class="btn btn-danger waves-effect waves-light"
                    style="width: 100%; text-align: left"
                    id="btnDownloadMapData"
                  >
                    <span class="btn-label" style="padding: 0.6rem 0.9rem !important"><i class="fas fa-cloud-download-alt"></i></span
                    >Preuzimanje iscrtanih podataka
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- end slimscroll-menu-->
    </div>
    <!-- /Right-bar -->

    <div class="right-bar" id="right-bar-modal-2">
      <div data-simplebar class="h-100">
        <div class="row">
          <div class="col-lg-12">
            <h2 class="titleDraw">Podaci o požaru</h2>
            <i class="fas fa-times closeMenu" onclick="closeModal()"></i>
          </div>

          <div class="col-lg-12" style="padding: 60px">
            <div class="options" style="text-align: center">
              <div id="select"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- end slimscroll-menu-->
    </div>

    <div id="odabirPoveznicaDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Povezivanje</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeDiv('#odabirPoveznicaDiv')">&times;</a>
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2 povezivanjevodovadiv">
          <div class="flex-row pb-8">
            <label for="ddlPocetnaTackaVodovi">Početna tačka:</label>
            <select class="select-css selectStart" id="ddlPocetnaTackaVodovi"></select>
            <input type="text" id="txtPocetnaTackaVodovi" class="inputStartHidden" style="display: none" />

            <a class="tooltip markerButton" data-tool="Odaberite na mapi" id="tool4">
              <button class="dugmeodabirmapa" id="btnPocetnaTackaPoveznica">
                <i class="fas fa-map-marker-alt"></i>
              </button>
            </a>
          </div>
          <div class="flex-row pb-8">
            <label for="ddlKrajnjaTackaVodovi" style="padding-right: 7px" class="labelapoveznicakrajnja"
              >Krajnja tačka:
            </label>
            <select class="select-css selectStart" id="ddlKrajnjaTackaVodovi"></select>
            <input type="text" id="txtKrajnjaTackaVodovi" class="inputStartHidden" style="display: none" />
            <a class="tooltip markerButton" data-tool="Odaberite na mapi" id="tool5">
              <button class="dugmeodabirmapa" id="btnKrajnjaTackaPoveznica">
                <i class="fas fa-map-marker-alt"></i>
              </button>
            </a>
          </div>
          <div class="flex-row pb-16">
            <div>
              <label class="container">
                Unos rednog broja tačke za povezivanje
                <input type="checkbox" id="chkShowGpsFields" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="flex-row pb-16">
            <div>
              <label class="container">
                Uključivanje postojećih objekata
                <input type="checkbox" id="chkMjesovitiVod" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
          <div class="flex-row pb-16">
            <div>
              <label class="container">
                Crtanje preko postojećih vodova
                <input type="checkbox" id="chkSpajanjePostojecihVodova" />
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex-end items-padd-sm">
        <button type="button" class="btn btn-success mr-8" id="btnPotvrdiPoveznica">
          <i class="fas fa-check-circle"></i> Potvrdi
        </button>
      </div>
    </div>

    <div id="odabirCvorovaVodaDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Odabir susjednih objekata voda</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeAllDivs('#odabirCvorovaVodaDiv')">&times;</a>
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2 povezivanjevodovadiv heightNew">
          <div class="row mb-3 mt-1">
            <div class="col-lg-4">
              <label for="ddlPocetniCvorVodovi">Početna tačka:</label>
            </div>
            <div class="col-lg-5">
              <select class="select-css selectStart" id="ddlPocetniCvorVodovi"></select>
            </div>
            <div class="col-lg-2">
              <button class="dugmeodabirmapa" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-original-title="Odabir na mapi" 
              id="btnPocetniCvorVoda" style="padding: 5px 12px;transform: translateY(-6px);">
                <i class="fas fa-map-marker-alt"></i>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4">
              <label for="ddlKrajnjiCvorVodovi" style="padding-right: 7px" class="labelapoveznicakrajnja"
              >Krajnja tačka:
            </label>
            </div>
            <div class="col-lg-5">
              <select class="select-css selectStart" id="ddlKrajnjiCvorVodovi"></select>
            </div>
            <div class="col-lg-2">
                <button class="dugmeodabirmapa" id="btnKrajnjiCvorVoda" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-original-title="Odabir na mapi"  
                style="padding: 5px 12px;transform: translateY(-6px);">
                  <i class="fas fa-map-marker-alt"></i>
                </button>
            </div>
          </div>    
        </div>
      </div>
      <div class="d-flex-end items-padd-sm">
        <button type="button" class="btn btn-success mr-8" id="btnPotvrdiDodavanjeVodu">
          <i class="fas fa-check-circle"></i> Potvrdi
        </button>
      </div>
    </div>

    <div id="odabirObjektaZaPomjeranjeDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Odabir objekta čiju lokaciju mijenjamo</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeAllDivs('#odabirObjektaZaPomjeranjeDiv')">&times;</a>
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2 povezivanjevodovadiv heightNew">
          <div class="row mb-3 mt-1">
            <div class="col-lg-2">
              <label for="ddlPocetniCvorVodovi">Objekat:</label>
            </div>
            <div class="col-lg-7">
              <select class="select-css selectStart" id="ddlObjekatZaPomjeranje" style="width: 100%;"></select>
            </div>
            <div class="col-lg-2">
              <button class="dugmeodabirmapa" id="btnObjekatZaPomjeranje" data-bs-toggle="tooltip" data-bs-trigger="hover" style="padding: 5px 12px;transform: translateY(-6px);"
               data-bs-original-title="Odabir na mapi"> <i class="fas fa-map-marker-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex-end items-padd-sm">
        <button type="button" class="btn btn-success mr-8" id="btnPotvrdiPomjeranjeObjekta">
          <i class="fas fa-check-circle"></i> Potvrdi
        </button>
      </div>
    </div>

    <div id="odabirBliskogObjektaKmlDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Povezivanje</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeDiv('#odabirBliskogObjektaKmlDiv')">&times;</a>
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2 povezivanjevodovadiv">
          <div class="flex-row pb-8">
            <label for="ddlObjekatZaPovezivanje">Povezati na:</label>
            <select class="select-css" id="ddlObjekatZaPovezivanje"></select>
          </div>
        </div>
      </div>
      <div class="d-flex-end items-padd-sm">
        <button type="button" class="btn btn-success mr-8" id="btnPotvrdiKmlPoveznicu">
          <i class="fas fa-check-circle"></i> Potvrdi
        </button>
      </div>
    </div>

    <div id="potvrdaProduzenjaKrakaDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Produženje kraka voda</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeDiv('#potvrdaProduzenjaKrakaDiv')">&times;</a>
      </div>
      <div class="d-flex-end items-padd-sm">
        <button type="button" class="btn btn-success mr-8" id="btnPotvrdiProduzenjeKraka">
          <i class="fas fa-check-circle"></i> Potvrdi
        </button>
      </div>
    </div>

    <!-- /Right-bar -->
    <div id="odabirNapojneTrafostaniceDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Odabir napojne trafostanice</h1>
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2 povezivanjevodovadiv">
          <div class="flex-row-desno pb-8" id="divUnosPoveznice">
            <label class="container">
              Bez povezivanja sa ostatkom mreže
              <input type="checkbox" id="chkUnosPocetnePoveznice" />
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="flex-row-desno pb-8">
            <a class="tooltip" data-tool="Odaberite na mapi" id="tool77">
              <button class="dugmeodabirmapa" id="btnMapaOdabirPoveznice">
                <i class="fas fa-map-marker-alt"></i>
              </button>
            </a>
            <select id="ddlPocetnaPoveznica" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8">
            <label for="txtSifraNapojneTrafostanice">Šifra napojne TS: <b class="fontB">*</b></label>
            <input type="text" class="select-css" id="txtSifraNapojneTrafostanice" />
          </div>
          <div class="flex-row-desno pb-8">
            <label for="txtNazivNapojneTrafostanice">Naziv napojne TS:</label>
            <input type="text" class="select-css disabledInput" id="txtNazivNapojneTrafostanice" readonly />
          </div>
          <div class="flex-row-desno pb-8">
            <label for="ddlIzvodNapojneTrafostanice" style="padding-right: 7px" class="labelapoveznicakrajnja"
              >Izvodi: <b class="fontB">*</b></label
            >
            <select class="select-css" id="ddlIzvodNapojneTrafostanice"></select>
          </div>
        </div>
      </div>
      <div class="d-flex-end items-padd-sm">
        <a class="tooltip" data-tool="Odaberite trafostanicu sa mape" id="toolMapaTrafostanica">
          <button class="dugmeodabirmapa" id="btnOdabirNapojneTrafostanice">
            <i class="fas fa-map-marker-alt"></i>
          </button>
        </a>
        <button type="button" class="btn btn-success mr-8" id="btnPotvrdiNapojnuTrafostanicu">
          <i class="fas fa-check-circle"></i> Potvrdi
        </button>
      </div>
    </div>

    <div id="atributiDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Atributi</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeDiv('#atributiDiv')">&times;</a>
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2">
          <div
            class="flex-row pb-8"
            style="float: left; justify-content: flex-start; padding: 0 0 15px 0; display: none"
            id="divPrethodniObjekat"
          >
            <button type="button" class="btn btn-outline-secondary mr-8" id="btnPrethodniObjekat">
              <i class="fas fa-arrow-left"></i> Prethodni objekat
            </button>
          </div>
          <div
            class="flex-row pb-8"
            style="justify-content: flex-end; padding: 0 0 15px 0; display: none"
            id="divSljedeciObjekat"
          >
            <button type="button" class="btn btn-outline-secondary" id="btnSljedeciObjekat">
              Sljedeći objekat <i class="fas fa-arrow-right"></i>
            </button>
          </div>

          <p class="text-center" id="atributeMessage">Odaberite objekat čije atribute želite da vidite</p>
          <div class="flex-row-desno pb-8" id="divOdabirSloja">
            <label for="ddl_sloj_podataka">Tip objekta:</label>
            <select id="ddl_sloj_podataka" class="select-css">
              <option value="">Izaberite vrijednost</option>
              <option value="stub04">Stub 0.4KV</option>
              <option value="stub10">Stub 10KV</option>
              <option value="stub35">Stub 35KV</option>
              <option value="vod04">Vod 0.4KV</option>
              <option value="vod10">Vod 10KV</option>
              <option value="vod35">Vod 35KV</option>
              <option value="trafostanica10">Trafostanica 10/0.4</option>
              <option value="trafostanica35">Trafostanica 35/x</option>
              <option value="trafostanica110">Trafostanica 110/x</option>
              <option value="nkro">NKRO</option>
              <option value="prikljucno_mjesto">Priključno mjesto</option>
              <option value="potrosac">Potrošač</option>
              <option value="solari">Solari</option>
              <option value="prikljucna_konzola">Priključna konzola</option>
              <option value="pod">Pod</option>
              <option value="nelegalni_potrosac" disabled>Nelegalni potrošač</option>
              <option value="poslovni_objekti" disabled>Poslovni objekat</option>
              <option value="view_odbijeni" disabled>Odbijene validacije</option>
            </select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNazivNapojne">
            <label for="naziv_napojne">Naziv napojne TS: <b class="fontB">*</b></label>
            <input type="text" id="naziv_napojne" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosSifraNapojne">
            <label for="sifra_napojne">Šifra napojne TS: <b class="fontB">*</b></label>
            <input type="text" id="sifra_napojne" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzvodNapojne">
            <label for="izvod_napojne">Ime izvoda u TS: <b class="fontB">*</b></label>
            <input type="text" id="izvod_napojne" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosGps">
            <label for="gps">Redni broj u GPS:</label>
            <input type="text" id="gps" readonly disabled style="color: brown" class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosFid1">
            <label for="fid_1">Fid_1: </label>
            <input type="text" id="fid_1" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosName">
            <label for="name">Naziv: <b class="fontB">*</b></label>
            <input type="text" id="name" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBroj">
            <label for="broj">Broj stuba:</label>
            <input type="text" id="broj" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTip">
            <label for="tip">Tip:</label>
            <select id="tip" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTipStub">
            <label for="tip_stub">Tip stuba: <b class="fontB">*</b></label>
            <select id="tip_stub" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTipVod04">
            <label for="tip_vod_04">Tip voda: <b class="fontB">*</b></label>
            <select id="tip_vod_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTipVod10">
            <label for="tip_vod_10">Tip voda: <b class="fontB">*</b></label>
            <select id="tip_vod_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTipVod35">
            <label for="tip_vod_35">Tip voda: <b class="fontB">*</b></label>
            <select id="tip_vod_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNamjena">
            <label for="vrsta_namjena">Namjena:</label>
            <select id="vrsta_namjena" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNamjenaStub04">
            <label for="vrsta_namjena_stub_04">Namjena: <b class="fontB">*</b></label>
            <select id="vrsta_namjena_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNamjenaStub10">
            <label for="vrsta_namjena_stub_10">Namjena: <b class="fontB">*</b></label>
            <select id="vrsta_namjena_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNamjenaStub35">
            <label for="vrsta_namjena_stub_35">Namjena: <b class="fontB">*</b></label>
            <select id="vrsta_namjena_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosMaterijal">
            <label for="vrsta_materijal">Materijal: <b class="fontB">*</b></label>
            <select id="vrsta_materijal" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosMaterijalVod04">
            <label for="vrsta_materijal_vod_04">Materijal: <b class="fontB">*</b></label>
            <select id="vrsta_materijal_vod_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosMaterijalVod10">
            <label for="vrsta_materijal_vod_10">Materijal: <b class="fontB">*</b></label>
            <select id="vrsta_materijal_vod_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosMaterijalVod35">
            <label for="vrsta_materijal_vod_35">Materijal: <b class="fontB">*</b></label>
            <select id="vrsta_materijal_vod_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosMaterijalStub04">
            <label for="vrsta_materijal_stub_04">Materijal: <b class="fontB">*</b></label>
            <select id="vrsta_materijal_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosMaterijalStub10">
            <label for="vrsta_materijal_stub_10">Materijal: <b class="fontB">*</b></label>
            <select id="vrsta_materijal_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosMaterijalStub35">
            <label for="vrsta_materijal_stub_35">Materijal: <b class="fontB">*</b></label>
            <select id="vrsta_materijal_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVrstaDrvenogStuba04">
            <label for="vrsta_drvenog_stub_04">Vrsta drvenog stuba:</label>
            <select id="vrsta_drvenog_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVrstaDrvenogStuba10">
            <label for="vrsta_drvenog_stub_10">Vrsta drvenog stuba:</label>
            <select id="vrsta_drvenog_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divMost">
            <label>Most:</label>
            <select id="most" class="select-css">
              <option>Izaberite vrijednost</option>
              <option value="Da">Da</option>
              <option value="Ne">Ne</option>
            </select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVrstaDrvenogStuba35">
            <label for="vrsta_drvenog_stub_35">Vrsta drvenog stuba:</label>
            <select id="vrsta_drvenog_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNadmorskaVisina">
            <label for="nad_visina">Nadmorska visina (m):</label>
            <input type="number" id="nad_visina" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVisina">
            <label for="visina">Visina (m):</label>
            <input type="number" id="visina" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosRasporedProvodnika">
            <label for="rasp_prov">Raspored provodnika: <b class="fontB">*</b></label>
            <input type="text" id="rasp_prov" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzolatorVrsta">
            <label for="izolator_vrsta">Vrsta izolatora:</label>
            <select id="izolator_vrsta" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzolatorVrstaStub04">
            <label for="izolator_vrsta_stub_04">Vrsta izolatora:</label>
            <select id="izolator_vrsta_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzolatorVrstaStub10">
            <label for="izolator_vrsta_stub_10">Vrsta izolatora:</label>
            <select id="izolator_vrsta_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzolatorVrstaStub35">
            <label for="izolator_vrsta_stub_35">Vrsta izolatora:</label>
            <select id="izolator_vrsta_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzolatorFunkcija">
            <label for="izolator_funkcija">Vrsta izolatora po funkciji:</label>
            <select id="izolator_funkcija" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzolatorFunkcijaStub04">
            <label for="izolator_funkcija_stub_04">Vrsta izolatora po funkciji:</label>
            <select id="izolator_funkcija_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzolatorFunkcijaStub10">
            <label for="izolator_funkcija_stub_10">Vrsta izolatora po funkciji:</label>
            <select id="izolator_funkcija_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzolatorFunkcijaStub35">
            <label for="izolator_funkcija_stub_35">Vrsta izolatora po funkciji:</label>
            <select id="izolator_funkcija_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrIzolFaza">
            <label for="br_izol_faza">Broj izolatora po fazi:</label>
            <input type="text" id="br_izol_faza" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTipIzolatora">
            <label for="tip_izolatora">Tip izolatora:</label>
            <select id="tip_izolatora" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTipIzolatoraStub04">
            <label for="tip_izolatora_stub_04">Tip izolatora:</label>
            <select id="tip_izolatora_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTipIzolatoraStub10">
            <label for="tip_izolatora_stub_10">Tip izolatora:</label>
            <select id="tip_izolatora_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTipIzolatoraStub35">
            <label for="tip_izolatora_stub_35">Tip izolatora:</label>
            <select id="tip_izolatora_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNosaciIzolatora">
            <label for="nosaci_izolatora">Nosači izolatora:</label>
            <select id="nosaci_izolatora" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNosaciIzolatoraStub04">
            <label for="nosaci_izolatora_stub_04">Nosači izolatora:</label>
            <select id="nosaci_izolatora_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNosaciIzolatoraStub10">
            <label for="nosaci_izolatora_stub_10">Nosači izolatora:</label>
            <select id="nosaci_izolatora_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNosaciIzolatoraStub35">
            <label for="nosaci_izolatora_stub_35">Nosači izolatora:</label>
            <select id="nosaci_izolatora_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosOdvodnikPrenapona">
            <label for="odvodnik_prenapona">Tip odvodnika prenapona:</label>
            <select id="odvodnik_prenapona" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosOdvodnikPrenaponaStub04">
            <label for="odvodnik_prenapona_stub_04">Tip odvodnika prenapona:</label>
            <select id="odvodnik_prenapona_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosOdvodnikPrenaponaStub10">
            <label for="odvodnik_prenapona_stub_10">Tip odvodnika prenapona:</label>
            <select id="odvodnik_prenapona_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosOdvodnikPrenaponaStub35">
            <label for="odvodnik_prenapona_stub_35">Tip odvodnika prenapona:</label>
            <select id="odvodnik_prenapona_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosUzemljivac">
            <label for="uzemljivac">Uzemljivač:</label>
            <select id="uzemljivac" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosUzemljivacStub04">
            <label for="uzemljivac_stub_04">Uzemljivač: <b class="fontB">*</b></label>
            <select id="uzemljivac_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosUzemljivacStub10">
            <label for="uzemljivac_stub_10">Uzemljivač: <b class="fontB">*</b></label>
            <select id="uzemljivac_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosUzemljivacStub35">
            <label for="uzemljivac_stub_35">Uzemljivač: <b class="fontB">*</b></label>
            <select id="uzemljivac_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosOtporUzemljivaca">
            <label for="uzemljivac_otpor">Otpor uzemljivača:</label>
            <input type="text" id="uzemljivac_otpor" />
          </div>
          <div class="flex-row-desno pb-8" id="divUzemljivacPrikljucnaKonzola">
            <label for="uzemljivac_otpor">Uzemljivač:</label>
            <select id="uzemljivac_prikljucna_konzola" class="select-css">
            </select>
          </div>

          <div class="flex-row-desno pb-8" id="divPogSpremPrikljucnaKonzola">
            <label>Pog spremnost:</label>
            <select id="pog_sprem_prikljucna_konzola" class="select-css">
            </select>
          </div>

          <div class="flex-row-desno pb-8" id="divIzvodi">
            <label>Izvod:</label>
            <select id="izvod_id" class="select-css">
            </select>
          </div>
          
          <div class="flex-row-desno pb-8" id="divUnosOptika">
            <label for="optika">Optika:</label>
            <select id="optika" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosOptikaStub04">
            <label for="optika_stub_04">Optika: <b class="fontB">*</b></label>
            <select id="optika_stub_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosOptikaStub35">
            <label for="optika_stub_35">Optika: <b class="fontB">*</b></label>
            <select id="optika_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosRasvjeta">
            <label for="rasvjeta">Javna rasvjeta:</label>
            <select id="rasvjeta" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosRasvjetaStub">
            <label for="rasvjeta_stub">Javna rasvjeta: <b class="fontB">*</b></label>
            <select id="rasvjeta_stub" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosRasvjetaVod">
            <label for="rasvjeta_vod">Javna rasvjeta:</label>
            <select id="rasvjeta_vod" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrPmo">
            <label for="br_pmo">Broj mjernih ormara: <b class="fontB">*</b></label>
            <input type="text" id="br_pmo" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrNnv">
            <label for="br_nnv">Broj NN nadz. vodova: <b class="fontB">*</b></label>
            <input type="text" id="br_nnv" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrNnvKablovski">
            <label for="br_nnv_kablovski">Broj NN kabl. vodova: <b class="fontB">*</b></label>
            <input type="text" id="br_nnv_kablovski" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBr10kVVodova">
            <label for="br_10kv_vodova">Broj 10kV nadz. vodova: <b class="fontB">*</b></label>
            <input type="text" id="br_10kv_vodova" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBr10kVVodovaKablovski">
            <label for="br_10kv_vodova_kablovski">Broj 10kV kabl. vodova: <b class="fontB">*</b></label>
            <input type="text" id="br_10kv_vodova_kablovski" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBr35kVVodova">
            <label for="br_35kv_vodova">Broj 35kV nadz. vodova: <b class="fontB">*</b></label>
            <input type="text" id="br_35kv_vodova" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBr35kVVodovaKablovski">
            <label for="br_35kv_vodova_kablovski">Broj 35kV kabl. vodova: <b class="fontB">*</b></label>
            <input type="text" id="br_35kv_vodova_kablovski" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPogSprem">
            <label for="pog_sprem">Pogonska spremnost: <b class="fontB">*</b></label>
            <select id="pog_sprem" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVlasnistvo">
            <label for="vlasnistvo">Vlasnistvo: <b class="fontB">*</b></label>
            <select id="vlasnistvo" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosOpstina">
            <label for="opstina">Opština:</label>
            <select id="opstina" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPotrosacIme">
            <label for="potrosac_ime">Potrošač: </label>
            <input type="text" id="potrosac_ime" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPrikKabal">
            <label for="prik_kabal">Priključni kabal: </label>
            <input type="text" id="prik_kabal" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPod">
            <label for="pod">POD: </label>
            <input type="text" id="pod" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosAdresaMm">
            <label for="adresa_mm">Adresa mm: </label>
            <input type="text" id="adresa_mm" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPrikMjesto">
            <label for="prik_mjesto">Priključno mjesto: <b class="fontB">*</b></label>
            <a class="tooltip" data-tool="Odaberite na mapi" id="tool7">
              <button class="dugmeodabirmapa" id="btnMapaPrikljucnoMjesto">
                <i class="fas fa-map-marker-alt"></i>
              </button>
            </a>
            <select id="prik_mjesto" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNazivNnIzvod">
            <label for="naziv_nn_izvod">Naziv nn izvod: <b class="fontB">*</b></label>
            <input type="text" id="naziv_nn_izvod" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPretplatniBr">
            <label for="pretplatni_br">Pretplatni broj: <b class="fontB">*</b></label>
            <input type="text" id="pretplatni_br" />
          </div>
          <div class="flex-row-desno pb-8" id="divSnagaElektrane">
            <label for="snaga_elektrane">Snaga elektrane: <b class="fontB">*</b></label>
            <input type="text" id="snaga_elektrane"/>
          </div>
          <div class="flex-row-desno pb-8" id="divVlasnistvo">
            <label for="vlasnistvoSolari">Vlasništvo: <b class="fontB">*</b></label>
            <select id="vlasnistvoSolari" class="select-css">
              <option value="">Izaberite vrijednost</option>
              <option value="Projekat EPCG (Solar gradnja)">Projekat EPCG (Solar gradnja)</option>
              <option value="Individualni vlasnik">Individualni vlasnik</option>
            </select>
          </div>
          <div class="flex-row-desno pb-8" id="divLegalan">
            <label for="legalan">Legalan: <b class="fontB">*</b></label>
            <select id="legalan" class="select-css">
              <option value="">Izaberite vrijednost</option>
              <option value="Da">Da</option>
              <option value="Ne">Ne</option>
            </select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrBrojila">
            <label for="br_brojila">Broj brojila: </label>
            <input type="text" id="br_brojila" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNapon">
            <label for="napon">Napon: <b class="fontB">*</b></label>
            <input type="text" id="napon" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPrikljucakOtcjep">
            <label for="prikljucak_otcjep">10kV kabal(prikljucak/otcjep):</label>
            <select id="prikljucak_otcjep" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPrikljucakOtcjepStub10">
            <label for="prikljucak_otcjep_stub_10">10kV kabal(prikljucak/otcjep):</label>
            <select id="prikljucak_otcjep_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPrikljucakOtcjepStub35">
            <label for="prikljucak_otcjep_stub_35">10kV kabal(prikljucak/otcjep):</label>
            <select id="prikljucak_otcjep_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNnVod">
            <label for="nn_vod">NN vod :</label>
            <select id="nn_vod" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNnVodStub10">
            <label for="nn_vod_stub_10">NN vod : <b class="fontB">*</b></label>
            <select id="nn_vod_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNnVodStub">
            <label for="nn_vod_stub">NN vod:</label>
            <select id="nn_vod_stub" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosRastavljac">
            <label for="rastavljac">Rastavljač:</label>
            <select id="rastavljac" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosRastavljacStub10">
            <label for="rastavljac_stub_10">Rastavljač:</label>
            <select id="rastavljac_stub_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosRastavljacStub35">
            <label for="rastavljac_stub_35">Rastavljač:</label>
            <select id="rastavljac_stub_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNazivRastavljaca">
            <label for="naziv_rastavljaca">Naziv rastavljača:</label>
            <input type="text" id="naziv_rastavljaca" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnos10KvVod">
            <label for="vod_10">10 kV vod:</label>
            <select id="vod_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosNaziv">
            <label for="naziv">Naziv: <b class="fontB">*</b></label>
            <input type="text" id="naziv" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrFaza">
            <label for="br_faza">Broj faza: <b class="fontB">*</b></label>
            <select id="br_faza" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVrsta">
            <label for="vrsta">Vrsta:</label>
            <select id="vrsta" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVrstaVod04">
            <label for="vrsta_vod_04">Vrsta: <b class="fontB">*</b></label>
            <select id="vrsta_vod_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVrstaVod10">
            <label for="vrsta_vod_10">Vrsta: <b class="fontB">*</b></label>
            <select id="vrsta_vod_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVrstaVod35">
            <label for="vrsta_vod_35">Vrsta: <b class="fontB">*</b></label>
            <select id="vrsta_vod_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPresjek">
            <label for="presjek">Presjek voda (mm2):</label>
            <select id="presjek" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPresjekVod04">
            <label for="presjek_vod_04">Presjek voda (mm2): <b class="fontB">*</b></label>
            <select id="presjek_vod_04" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPresjekVod10">
            <label for="presjek_vod_10">Presjek voda (mm2): <b class="fontB">*</b></label>
            <select id="presjek_vod_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPresjekVod35">
            <label for="presjek_vod_35">Presjek voda (mm2): <b class="fontB">*</b></label>
            <select id="presjek_vod_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrSpojnica">
            <label for="br_spojnica">Broj spojnica: <b class="fontB">*</b></label>
            <input type="text" id="br_spojnica" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosGodIzgr">
            <label for="god_izgr">Godina izgradnje:</label>
            <input type="text" id="god_izgr" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosUzePresjek">
            <label for="uze_presjek">Zaštitno uže presjek mm2:</label>
            <select id="uze_presjek" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosUzePresjekVod35">
            <label for="uze_presjek_vod_35">Zaštitno uže presjek mm2: <b class="fontB">*</b></label>
            <select id="uze_presjek_vod_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosUze">
            <label for="uze">Zaštitno uže materijal: <b class="fontB">*</b></label>
            <select id="uze" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosUzeVod10">
            <label for="uze_vod_10">Zaštitno uže materijal: <b class="fontB">*</b></label>
            <select id="uze_vod_10" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosUzeVod35">
            <label for="uze_vod_35">Zaštitno uže materijal: <b class="fontB">*</b></label>
            <select id="uze_vod_35" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrNnIzvoda">
            <label for="br_nn_izvoda">Broj NN izvoda:</label>
            <input type="text" id="br_nn_izvoda" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosCelije10">
            <label for="celije_10">Broj 10 kV ćelija:</label>
            <input type="text" id="celije_10" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosProjekSnaga">
            <label for="projek_snaga">Projektovana snaga:</label>
            <input type="text" id="projek_snaga" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosInstSnaga1">
            <label for="inst_snaga_t1">Snaga T1 (kVA):</label>
            <select id="inst_snaga_t1" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosInstSnaga2">
            <label for="inst_snaga_t2">Snaga T2 (kVA):</label>
            <select id="inst_snaga_t2" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosInstSnaga3">
            <label for="inst_snaga_t3">Snaga T3 (kVA):</label>
            <select id="inst_snaga_t3" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosInstSnaga4">
            <label for="inst_snaga_t4">Snaga T4 (kVA):</label>
            <select id="inst_snaga_t4" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosPrenosOdnos">
            <label for="prenos_odnos">Prenosni odnos:</label>
            <select id="prenos_odnos" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIzvodCelija">
            <label for="izvod_celija">Izvod u napojnoj TS:</label>
            <input type="text" id="izvod_celija" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosFunkcija">
            <label for="funkcija">Funkcija objekta:</label>
            <select id="funkcija" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIdBilling">
            <label for="id_billing">Identifikacioni broj (Biling):</label>
            <input type="text" id="id_billing" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosId">
            <label for="id">Id: <b class="fontB">*</b></label>
            <input type="text" id="id" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosIdPotrosac">
            <label for="id_potrosac">Id: <b class="fontB"></b></label>
            <input type="text" id="id_potrosac" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosOsiguraci">
            <label for="osiguraci">Osigurači: <b class="fontB">*</b></label>
            <select id="osiguraci" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosTipPM">
            <label for="tip_pm">Tip priključnog mjesta:</label>
            <input type="text" id="tip_pm" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosMontaza">
            <label for="montaza">Montaža: <b class="fontB">*</b></label>
            <select id="montaza" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosVrata">
            <label for="vrata">Vrata: <b class="fontB">*</b></label>
            <select id="vrata" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrIzvoda">
            <label for="br_izvoda">Broj izvoda:</label>
            <input type="text" id="br_izvoda" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrPrikljucaka">
            <label for="br_prikljucaka">Broj priključaka:</label>
            <input type="text" id="br_prikljucaka" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosRacDuzina">
            <label for="rac_duzina">Računska dužina: </label>
            <input type="text" id="rac_duzina" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosDuzina">
            <label for="duzina">Dužina:</label>
            <input type="text" id="duzina" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosSifraDionice">
            <label for="sifra_dionice">Šifra dionice: <b class="fontB">*</b></label>
            <select id="sifra_dionice" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrVodCelVisiNap">
            <label for="br_vod_cel_visi_nap">Br vod cel visi nap:</label>
            <input type="text" id="br_vod_cel_visi_nap" />
          </div>
          <div class="flex-row-desno pb-8" id="divUnosBrVodCelNiziNap">
            <label for="br_vod_cel_nizi_nap">Br vod cel niži nap:</label>
            <input type="text" id="br_vod_cel_nizi_nap" />
          </div>

          <div class="flex-row-desno pb-8" id="divUnosDdlTrafostanice">
            <label for="ddlTrafostanice">Trafostanica iz TBP: <b class="fontB">*</b></label>
            <select id="ddlTrafostanice" class="select-css"></select>
          </div>
          <div class="flex-row-desno pb-8" id="divReadFid1">
            <label for="read_fid_1">Fid_1:</label>
            <input type="text" id="read_fid_1" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadName">
            <label for="read_name">Name:</label>
            <input type="text" id="read_name" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNaziv">
            <label for="read_naziv">Naziv:</label>
            <input type="text" id="read_naziv" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadCelije10">
            <label for="read_celije_10">Ćelije:</label>
            <input type="text" id="read_celije_10" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadIzvodCelija">
            <label for="read_izvod_celija">Izvod ćelija:</label>
            <input type="text" id="read_izvod_celija" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadFunkcija">
            <label for="read_funkcija">Funkcija:</label>
            <input type="text" id="read_funkcija" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadBrNnIzvoda">
            <label for="read_br_nn_izvoda">Broj nn izvoda:</label>
            <input type="text" id="read_br_nn_izvoda" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadGeohashId">
            <label for="read_geohash_id">Geohash id:</label>
            <input type="text" id="read_geohash_id" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadGeohashIdNo">
            <label for="read_geohash_id_no">Geohash id no:</label>
            <input type="text" id="read_geohash_id_no" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadBrVodCelNiziNap">
            <label for="read_br_vod_cel_nizi_nap">Br vod cel nizi nap:</label>
            <input type="text" id="read_br_vod_cel_nizi_nap" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadBrVodCelVisiNap">
            <label for="read_br_vod_cel_visi_nap">Br vod cel viši nap:</label>
            <input type="text" id="read_br_vod_cel_visi_nap" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadGodIzg">
            <label for="read_god_izg">Godina izgradnje:</label>
            <input type="text" id="read_god_izg" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadVlasnistvo">
            <label for="read_vlasnistvo">Vlasništvo:</label>
            <input type="text" id="read_vlasnistvo" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadDatumAzuriranja">
            <label for="read_datum_azuriranja">Datum ažuriranja:</label>
            <input type="text" id="read_datum_azuriranja" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNadVis">
            <label for="read_nad_vis">Nadmorska visina:</label>
            <input type="text" id="read_nad_vis" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadGPS">
            <label for="read_gps">GPS:</label>
            <input type="text" id="read_gps" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPogSprem">
            <label for="read_pog_sprem">Pog sprem:</label>
            <input type="text" id="read_pog_sprem" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNapon">
            <label for="read_napon">Napon:</label>
            <input type="text" id="read_napon" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPosjedujeSliku">
            <label for="read_posjeduje_sliku">Posjeduje sliku:</label>
            <input type="text" id="read_posjeduje_sliku" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadOriginalId">
            <label for="read_originalId">Original id:</label>
            <input type="text" id="read_originalId" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadKorisnik">
            <label for="read_korisnik">Korisnik:</label>
            <input type="text" id="read_korisnik" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadVlasnik">
            <label for="read_vlasnik">Vlasnik:</label>
            <input type="text" id="read_vlasnik" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadKatastar">
            <label for="read_katastar">Katastar:</label>
            <input type="text" id="read_katastar" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadIdTrafostanice">
            <label for="read_id_trafostanice">Id trafostanice:</label>
            <input type="text" id="read_id_trafostanice" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadOpstina">
            <label for="read_opstina">Opština:</label>
            <input type="text" id="read_opstina" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadRegion">
            <label for="read_region">Region:</label>
            <input type="text" id="read_region" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNazivNapojne">
            <label for="read_naziv_napojne">Naziv napojne:</label>
            <input type="text" id="read_naziv_napojne" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadSifraNapojne">
            <label for="read_sifra_napojne">Šifra napojne:</label>
            <input type="text" id="read_sifra_napojne" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadIzvodNapojne">
            <label for="read_izvod_napojne">Izvod napojne:</label>
            <input type="text" id="read_izvod_napojne" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPrenosOdnos">
            <label for="read_prenos_odnos">Prenos odnos:</label>
            <input type="text" id="read_prenos_odnos" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadIdBilling">
            <label for="read_id_billing">Id biling:</label>
            <input type="text" id="read_id_billing" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadProjekSnaga">
            <label for="read_projek_snaga">Projektovana snaga:</label>
            <input type="text" id="read_projek_snaga" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadAdresa">
            <label for="read_adresa">Adresa:</label>
            <input type="text" id="read_adresa" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadTip">
            <label for="read_tip">Tip:</label>
            <input type="text" id="read_tip" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadInstSnagaT1">
            <label for="read_inst_snaga_t1">Inst snaga t1:</label>
            <input type="text" id="read_inst_snaga_t1" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadInstSnagaT2">
            <label for="read_inst_snaga_t2">Inst snaga t2:</label>
            <input type="text" id="read_inst_snaga_t2" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadInstSnagaT3">
            <label for="read_inst_snaga_t3">Inst snaga t3:</label>
            <input type="text" id="read_inst_snaga_t3" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadInstSnagaT4">
            <label for="read_inst_snaga_t4">Inst snaga t4:</label>
            <input type="text" id="read_inst_snaga_t4" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadTabela">
            <label for="read_tabela">Tabela:</label>
            <input type="text" id="read_tabela" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpAdresa">
            <label for="np_adresa">Adresa:</label>
            <input type="text" id="np_adresa" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpBrojBrojila">
            <label for="np_broj_brojila">Broj brojila:</label>
            <input type="text" id="np_broj_brojila" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpBrojPlombe">
            <label for="np_broj_plombe">Broj plombe:</label>
            <input type="text" id="np_broj_plombe" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpBrojTelefona">
            <label for="np_broj_telefona">Broj telefona:</label>
            <input type="text" id="np_broj_telefona" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpBrojZapisnika">
            <label for="np_broj_zapisnika">Broj zapisnika:</label>
            <input type="text" id="np_broj_zapisnika" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpDatumKontrole">
            <label for="np_datum_kontrole">Datum kontrole:</label>
            <input type="text" id="np_datum_kontrole" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpJMB">
            <label for="np_jmb">JMBG:</label>
            <input type="text" id="np_jmb" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpKontroluIzvrsio1">
            <label for="np_kontrolu_izvrsio_1">Kontrolisao:</label>
            <input type="text" id="np_kontrolu_izvrsio_1" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpKontroluIzvrsio2">
            <label for="np_kontrolu_izvrsio_2">Kontrolisao:</label>
            <input type="text" id="np_kontrolu_izvrsio_2" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpKontroluIzvrsio3">
            <label for="np_kontrolu_izvrsio_3">Kontrolisao:</label>
            <input type="text" id="np_kontrolu_izvrsio_3" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpNazivPotrosaca">
            <label for="np_naziv_potrosaca">Naziv potrošača:</label>
            <input type="text" id="np_naziv_potrosaca" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpNazivTs">
            <label for="np_naziv_ts">Naziv TS:</label>
            <input type="text" id="np_naziv_ts" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpOpstina">
            <label for="np_opstina">Opština:</label>
            <input type="text" id="np_opstina" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpPotrosacIskljucen">
            <label for="np_potrosac_iskljucen">Isključen:</label>
            <input type="text" id="np_potrosac_iskljucen" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpPretplatniBroj">
            <label for="np_pretplatni_broj">Pretplatni broj:</label>
            <input type="text" id="np_pretplatni_broj" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpProizvodjac">
            <label for="np_proizvodjac">Proizvođač:</label>
            <input type="text" id="np_proizvodjac" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpRegion">
            <label for="np_region">Region:</label>
            <input type="text" id="np_region" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpSifraTs">
            <label for="np_sifra_ts">Šifra TS:</label>
            <input type="text" id="np_sifra_ts" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpStanjeMt">
            <label for="np_stanje_mt">Stanje MT:</label>
            <input type="text" id="np_stanje_mt" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpStanjeVt">
            <label for="np_stanje_vt">Stanje VT:</label>
            <input type="text" id="np_stanje_vt" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpStatusPotrosaca">
            <label for="np_status_potrosaca">Status potrošača:</label>
            <input type="text" id="np_status_potrosaca" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadNpTipBrojila">
            <label for="np_tip_brojila">Tip brojila:</label>
            <input type="text" id="np_tip_brojila" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoAdresa">
            <label for="po_adresa">Adresa:</label>
            <input type="text" id="po_adresa" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoBrojKatastarskeParcele">
            <label for="po_broj_katastarske_parcele">Katastarska parcela:</label>
            <input type="text" id="po_broj_katastarske_parcele" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoGodIzg">
            <label for="po_god_izg">Godina izgradnje:</label>
            <input type="text" id="po_god_izg" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoImeKatastarskeOpstine">
            <label for="po_ime_katastarske_opstine">Katastarska opština:</label>
            <input type="text" id="po_ime_katastarske_opstine" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoKatastar">
            <label for="po_katastar">Katastar:</label>
            <input type="text" id="po_katastar" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoNadleznost">
            <label for="po_nadleznost">Nadležnost:</label>
            <input type="text" id="po_nadleznost" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoName">
            <label for="po_name">Naziv:</label>
            <input type="text" id="po_name" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoNapomena">
            <label for="po_napomena">Napomena:</label>
            <input type="text" id="po_napomena" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoObimPrava">
            <label for="po_obim_prava">Obim prava:</label>
            <input type="text" id="po_obim_prava" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoObjekat">
            <label for="po_objekat">Objekat:</label>
            <input type="text" id="po_objekat" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoOpstina">
            <label for="po_opstina">Opština:</label>
            <input type="text" id="po_opstina" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoPovrsina">
            <label for="po_povrsina">Površina:</label>
            <input type="text" id="po_povrsina" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoRegion">
            <label for="po_region">Region:</label>
            <input type="text" id="po_region" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadPoVlasnistvo">
            <label for="po_vlasnistvo">Vlasništvo:</label>
            <input type="text" id="po_vlasnistvo" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadOdbijeniName">
            <label for="odbijeni_name">Naziv:</label>
            <input type="text" id="odbijeni_name" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadOdbijeniDatumAzuriranja">
            <label for="odbijeni_datum_azuriranja">Datum ažuriranja:</label>
            <input type="text" id="odbijeni_datum_azuriranja" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadOdbijeniTip">
            <label for="odbijeni_tip">Tip objekta:</label>
            <input type="text" id="odbijeni_tip" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadOdbijeniKorisnik">
            <label for="odbijeni_korisnik">Korisnik:</label>
            <input type="text" id="odbijeni_korisnik" readonly class="disabledInput" />
          </div>
          <div class="flex-row-desno pb-8" id="divReadOdbijeniNapon">
            <label for="odbijeni_napon">Napon:</label>
            <input type="text" id="odbijeni_napon" readonly class="disabledInput" />
          </div>
        </div>
      </div>
      <div class="items-padd">
        <!--<input type="file" class="w-100" accept="image/*" capture="environment" id="dodavanjeSlike" />-->
      </div>
      <div class="d-flex-between items-padd-sm">
        <div>
          <button type="button" class="btn btn-danger" id="btnIzbrisi" title="Brisanje">
            <i class="fas fa-trash"></i> Izbriši
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            id="btnDupliraj"
            title="Nakon dupliranja kliknite opet na dupliranu tacku"
          >
            <i class="far fa-copy"></i> Dupliraj
          </button>
          <div id="photoMenu" style="display: inline-flex;">
            <button id="slika" class="btn btn-secondary" title="Prikaz fotografije">
              <i data-feather="camera" style="width: 18px;height: 20px;"></i>
            </button>
          </div>
        </div>
        <button type="button" class="btn btn-success mr-8" id="btnSacuvaj" title="Čuvanje podataka">
          <i class="fas fa-check-circle"></i> Sačuvaj
        </button>
      </div>
    </div>

    <div id="pretragaDiv" class="sidenav">
      <div class="titleAndClose">
        <h1>Filtriranje</h1>
        <a href="javascript:void(0)" class="closebtn" onclick="closeDiv('#pretragaDiv')">&times;</a>
      </div>
      <div class="items-padd">
        <div class="flex-row mb-16 pb-16 border-bottom">
          <div>
            <div class="form-check form-switch inlineCheck">
              <input type="checkbox" class="form-check-input" id="pretragaTacke" />
            </div>
            Udaljenost od tačke (m)
            <!-- <input type="checkbox" id="pretragaTacke" />
              <span class="checkmark"></span> -->
          </div>
          <div>
            <input type="number" id="pretragaTackeUdaljenost" style="background-color: white;border: 1px solid #c1c1c1;color: #909090;"/>
          </div>
        </div>
        <div class="mb-16 pb-16 border-bottom">
          <div class="form-check form-switch inlineCheck">
            <input type="checkbox" class="form-check-input" id="pretragaLinije" />
          </div>
          Linija presijeca
        </div>
        <div class="flex-row mb-16 pb-16 border-bottom">
          <div>
            <div class="form-check form-switch inlineCheck">
              <input type="checkbox" class="form-check-input" id="pretragaPoligonObuhvata" />
            </div>
            Poligon obuhvata
          </div>
          <div>
            <div class="form-check form-switch inlineCheck">
              <input type="checkbox" class="form-check-input" id="pretragaPoligonPresijeca" />
            </div>
            Poligon presijeca
          </div>
        </div>
      </div>
      <div class="items-padd">
        <div class="pr-8 sadrzaj-scroll style-2">
        <div class="flex-row rowEnd pb-8">
            <label for="ddl_pretraga_napon">Napon:</label>
            <select id="ddl_pretraga_napon" class="select-css inputClass">
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
        <button type="button" class="btn btn-danger waves-effect mr-8" id="btnPonistiFilter">
          <i class="icon-close" style="transform: translateY(1px);"></i> Poništi filter
        </button>
        <button type="button" class="btn btn-success" id="btnFilter">
          <i class="fas fa-search"></i> Filtriranje
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

    <div class="navIncident" id="navDelete">
      <div id="barStatistic" class="progress mb-1" style="height: 7px;background-color:white;">
        <div class="bar progress-bar progress-bar-striped progress-bar-animated bg-danger" style="width: 33.3333%;" id="progressBarStatistic"></div>
      </div>
      <ul class="nav nav-pills bg-light nav-justified mb-2">
        <li class="nav-item">
          <a href="#account-2" onclick="statisticMap()" data-bs-toggle="tab" data-toggle="tab" class="nav-link rounded-0 pt-2 pb-2 active">
            <i class="mdi mdi-pencil-box-outline me-1"></i>
            <span class="d-none d-sm-inline">Nacrtajte oblast</span>
          </a>
        </li>
        <li class="nav-item">
          <a href="#selectTable" data-bs-toggle="tab" data-toggle="tab" class="nav-link rounded-0 pt-2 pb-2" id="inputStatisticLi" onclick="statisticData()">
            <i class="mdi mdi-form-select me-1"></i>
            <span class="d-none d-sm-inline">Izaberite lejer</span>
          </a>
        </li>
        <div style="display: block;">
          <button class="btn btn-danger" onclick="closeStatisticReport()" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-trigger="hover" title="" data-bs-original-title="Ugasite brisanje" style="height: 100%"><i class="fas fa-times"></i></button>
        </div>
      </ul>
  
      <div class="tab-content" id="tab-content-statistic">
        <div class="tab-pane" id="selectTable">
          <div class="row">
            <h4 class="mb-3">Izaberite lejer</h4>
            <div class="col-lg-12">
              <select class="form-select" id="brisanjeLejer">
                <option value="stubovi">Stubovi</option>
                <option value="vodovi">Vodovi</option>
                <option value="view_trafostanice">Trafostanice</option>
                <option value="trafostanice_poligoni">Trafostanice poligoni</option>
                <option value="prikljucno_mjesto">Priključno mjesto</option>
                <option value="nkro">NKRO</option>
                <option value="view_potrosaci">Potrošač</option>
                <option value="nelegalni_potrosac">Nelegalni potrošač</option>
                <option value="view_pod">POD</option>
                <option value="solari">Solari</option>
                <option value="validations">Validacija</option>
                <option value="poslovni_objekti">Poslovni objekat</option>
                <option value="view_odbijeni">Odbijene validacije</option>
              </select>
            </div>
            <ul class="list-inline wizard mb-0 mt-3">
              <li class="list-inline-item float-end" id="nextStatistic">
                <a href="javascript: void(0);" class="btn btn-info">Dalje</a>
              </li>
            </ul>
          </div>
        </div>
  
        <div class="tab-pane" id="statisticResult">
          <ul class="nav nav-tabs nav-bordered" id="statisticsUl">
          </ul>
          <div class="tab-content" style="display: block" id="statisticsContent">
          </div>
        </div>
      </div>
    </div>

    <div id="fadeSpinner"></div>
    <div id="modalSpinner">
    </div>

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>
    <!-- Vendor js -->
    <script src="../../administracija/olcedis/js/vendor.min.js"></script>
    <script src="../../administracija/olcedis/libs/flatpickr/flatpickr.min.js"></script>
    <script src="../../administracija/olcedis/libs/selectize/js/standalone/selectize.min.js"></script>
    <script src="../../administracija/olcedis/libs/ion-rangeslider/js/ion.rangeSlider.min.js"></script>
    <script src="../../administracija/olcedis/js/pages/range-sliders.init.js"></script>
    <script src="../../administracija/olcedis/js/modules/map-utils.js"></script>
    <script src="../../administracija/olcedis/js/app.min.js"></script>
    <!-- <script src="js/lib/ol.js"></script>
    <script src="js/lib/ol-ext.js"></script> -->
    <script src="../../administracija/olcedis/js/lib/sweetalert2.all.min.js"></script>
    <!-- <script src="js/map.js"></script> -->
    <script src="../../administracija/olcedis/js/modules/layers-switch.js"></script>

    <script type="text/javascript">
      const citajSlikeUrl = "urlZaCitanjeFotografija",
        izbrisiZapisUrl = "urlZaBrisanjeZapisa",
        sacuvajZapisUrl = "urlZaCuvanjeZapisa",
        naslovnaStranaUrl = "urlZaCuvanjeZapisa";
    </script>

    <script src="../../administracija/olcedis/js/common/constants.js"></script>
    <script src="../../administracija/olcedis/js/common/globalNew.js"></script>
    <script src="../../administracija/olcedis/js/edit/globalState.js"></script>
    <script src="../../administracija/olcedis/js/edit/obavezna_polja.js"></script>
    <script src="../../administracija/olcedis/js/edit/selekcijaMapa.js"></script>
    <script src="../../administracija/olcedis/js/plugin/turf.min.js"></script>
    <script src="../../administracija/olcedis/js/plugin/sweetalert2.all.min.js"></script>
    <script src="../../administracija/olcedis/js/edit/editUtilNew.js"></script>
    <script src="../../administracija/olcedis/js/edit/edit.js"></script>
    <script src="../../administracija/olcedis/js/edit/snap.js"></script>
    <script src="../../administracija/olcedis/js/edit/uvoz_kml.js"></script>
    <script src="../../administracija/olcedis/js/modify/vodDodavanjeObjekta.js"></script>
    <script src="../../administracija/olcedis/js/modify/vodPomjeranjeObjekta.js"></script>
    <script src="../../administracija/olcedis/js/modify/vodProduzenjeKraka.js"></script>
    <script src="../../administracija/olcedis/js/modify/prikazAtributa.js"></script>
    <script src="../../administracija/olcedis/js/modify/brisanjeObjekata.js"></script>
    <script src="../../administracija/olcedis/js/modify/izmjenaAtributa.js"></script>
    <script src="../../administracija/olcedis/js/modify/miksovaniVodovi.js"></script>
    <script src="../../administracija/olcedis/js/modify/vektorBrisanjeIzmjena.js"></script>
    <script src="../../administracija/olcedis/js/edit/lejeri.js"></script>
    <script src="../../administracija/olcedis/js/common/webServisi.js"></script>
    <script src="../../administracija/olcedis/js/common/webServisiUnosIzmjena.js"></script>
    <script src="../../administracija/olcedis/js/edit/pretraga.js"></script>
    <script src="../../administracija/olcedis/js/edit/atributi.js"></script>
    <script src="../../administracija/olcedis/js/edit/finalne_akcije.js"></script>
    <script src="../../administracija/olcedis/js/edit/final_data_preparation.js"></script>
    <script src="../../administracija/olcedis/js/edit/final_data_preparation_properties.js"></script>
    <script src="../../administracija/olcedis/js/edit/unosIzmjenaNkro.js"></script>
    <script src="../../administracija/olcedis/js/edit/unosIzmjenaPod.js"></script>
    <script src="../../administracija/olcedis/js/edit/unosIzmjenaPotrosac.js"></script>
    <script src="../../administracija/olcedis/js/edit/unosIzmjenaSolari.js"></script>
    <script src="../../administracija/olcedis/js/edit/unosIzmjenaPrikljucnoMjesto.js"></script>
    <script src="../../administracija/olcedis/js/edit/unosIzmjenaPrikljucnaKonzola.js"></script>
    <script src="../../administracija/olcedis/js/edit/unosIzmjenaStubovi.js"></script>
    <script src="../../administracija/olcedis/js/edit/unosIzmjenaTrafostanice.js"></script>
    <script src="../../administracija/olcedis/js/edit/unosIzmjenaVodovi.js"></script>
    <script src="../../administracija/olcedis/js/edit/sifra_dionice.js"></script>
    <script src="../../administracija/olcedis/js/edit/nelegalni_potrosac.js"></script>
    <script src="../../administracija/olcedis/js/edit/poslovni_objekti.js"></script>
    <script src="../../administracija/olcedis/js/edit/odbijeni_validacija.js"></script>
    <script src="../../administracija/olcedis/js/edit/interakcijaNew.js"></script>
    <!-- <script src="js/modules/map-drawings.js"></script>
    <script src="js/modules/map-measure.js"></script> -->
    <script src="../../administracija/olcedis/js/initialize.js"></script>
    <script src="../../administracija/olcedis/js/modules/map-tools.js"></script>
  </body>
</html>
