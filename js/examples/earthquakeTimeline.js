let globalTimeline = false;
let play = true;
function showTimeline() {
//  var layer = new ol.layer.Tile({ name: "OSM", source: new ol.source.OSM() });
globalTimeline = !globalTimeline;
// Style function
var cache = {};
function style(select) {
  return function (f) {
    var style = cache[f.get("mag") + "-" + select];
    if (!style) {
      var img = new ol.style.Circle({
        radius: (f.get("mag") * f.get("mag")) / 2,
        fill: new ol.style.Fill({
          color: select ? "rgba(255,0,0,.5)" : "rgba(255,128,0,.3)",
        }),
      });
      var img2 = new ol.style.Circle({
        radius: (f.get("mag") * f.get("mag")) / 4,
        fill: new ol.style.Fill({
          color: select ? "rgba(255,0,0,.5)" : "rgba(255,128,0,.3)",
        }),
      });
      style = cache[f.get("mag") + "-" + select] = [new ol.style.Style({ image: img }), new ol.style.Style({ image: img2 })];
    }
    return style;
  };
}

// Earthquake layer
var vectorSource = new ol.source.Vector({
  url: "../assets/data/zemljotresi.json",
  projection: "EPSG:3857",
  format: new ol.format.GeoJSON(),
});

var vector = new ol.layer.Vector({
  name: "Earthquake",
  source: vectorSource,
  style: style(),
});


// Create Timeline control
let tline = new ol.control.Timeline({
  className: "ol-pointer",
  graduation: "month", // 'month'
  minDate: new Date("2014/06/01"),
  maxDate: new Date("2016/02/01"),
  getHTML: function (f) {
    return 2015;
  },
  getFeatureDate: function (f) {
    return f.date;
  },
  endFeatureDate: function (f) {
    return f.endDate;
  },
});
// Set the date when ready
setTimeout(function () {
  tline.setDate("2015");
});
tline.addButton({
  className: "go",
  handleClick: function () {
    go();
  },
});

// Show features on scroll
tline.on("scroll", function (e) {
  var d = tline.roundDate(e.date, "month");
  $(".dateStart").text(d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }));
  // Filter features visibility
  vectorSource.getFeatures().forEach(function (f) {
    var dt = f.get("time") - e.date;
    if (Math.abs(dt) > 1000 * 3600 * 12) {
      f.setStyle([]);
    } else {
      f.setStyle();
    }
  });
});

var select = new ol.interaction.Select({ hitTolerance: 5, style: style(true) });
map.addInteraction(select);
select.on("select", function (e) {
  var f = e.selected[0];
  if (f) {
    // Show info
    document.querySelector("#right-bar-modal-2").style.right = "0";
    var info = $("#select").html("");
    $("<h4>")
      .text("Datum i vrijeme požara: ")
      .appendTo(info);
    $("<h5>")
      .text(new Date(f.get("time")).toLocaleString())
      .appendTo(info);
    $("<br>")
    .appendTo(info);
    $("<h4>")
      .text("Jačina požara: ")
      .appendTo(info);
    $("<h5>")
      .text(f.get("mag") + " požarnih jedinica")
      .appendTo(info);
      $("<br>")
      .appendTo(info);
    $("<h4>")
      .text("Lokacija požara: ")
      .appendTo(info);
    $("<h5>")
      .text(f.get("place"))
      .appendTo(info);
  } else {
    $("#select").html("");
  }
});

// Run on the timeline
var running = false;
var start = new Date("2015");
var end = new Date("2016");
function go(next) {
  var date = tline.getDate();
  if (running) clearTimeout(running);
  if (!next) {
    // stop
    if (date > start && date < end && running) {
      running = false;
      tline.element.classList.remove("running");
      return;
    }
    if (date > end) {
      date = start;
    }
  }
  if (date > end) {
    tline.element.classList.remove("running");
    return;
  }
  if (date < start) {
    date = start;
  }
  // 1 day
  date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
  tline.setDate(date, { anim: false });
  // next
  tline.element.classList.add("running");
  running = setTimeout(function () {
    go(true);
  }, 100);
}

if (globalTimeline) {
  map.addLayer(vector);
map.addControl(tline);
document.getElementsByClassName("ol-zoom ol-unselectable ol-control")[0].style.top = "2.5em";

} 
else
 { 
  document.getElementsByClassName("ol-zoom ol-unselectable ol-control")[0].style.top = ".5em";
 let prviTimeline = document.getElementsByClassName("ol-scroll ol-scrolldiv");

 for (i = 0; i < prviTimeline.length; i++) {
  document.getElementsByClassName("ol-scroll ol-scrolldiv")[i].style.display = "none";
  document.getElementsByClassName("ol-pointer ol-timeline ol-unselectable ol-control ol-hasbutton")[i].style.display = "none";
 }

 map.getLayers().forEach(function(vector) {

  if(vector.get("name") === 'Earthquake'){
    vector.set("visible", false);
  }

});
}

let prviTimeline = document.getElementsByClassName("ol-scroll ol-scrolldiv");

for (i = 0; i < prviTimeline.length; i++) {
  playButton = document.getElementsByClassName("go")[i];
 }

playButton.onclick = changeButton;

function changeButton() {
  play=!play;
  if (play === true) {
playButton.style.borderColor = "transparent transparent transparent #8d8d8e" ;
  } else {
    playButton.style.borderColor = "#8d8d8e" ;
  }
}

};


