///////////////////////////////////////////////////////////////
///////////////GLOBAL VARIABLES FOR MAP ELEMENTS///////////////
///////////////////////////////////////////////////////////////
// THIS PART IS REQUIRED BY PLOTXXXMAP.JS FUNCTION
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var imgDataFromCTX;
var imgdata;
var image = new Image();
//////////////////Initialize the window size and font size////////
var body = document.body;
var height = window.innerHeight;
var width = window.innerWidth;
body.style.height = (height-8) + "px";
body.style.width = (width-4) + "px";
if(width<1220)
 {
   var element = $('#interactionZone').children();
   element.each(function (i) {
     $(this).css('font-size','6pt');   
   });       
 }
 else{
   var element = $('#interactionZone').children();
   element.each(function (i) {
     $(this).css('font-size','11pt');   
   });     
 }

////////////////////Initialize maps///////////////////////////////////
// var editableLayers = new L.FeatureGroup();
var overlayNames;
var popOverlay, waterOverlay, scarcityOverlay, satelliteOverlay;
var centerLatlng = [15, 0];
var mapContainer = [];
var popMap = L.map('popMap', {crs: L.extend({}, L.CRS.EPSG3857, {wrapLat: null, wrapLng: null})}).setView(centerLatlng, 4);
// var popMap = L.map('popMap', {crs: L.CRS.EPSG4326}).setView(centerLatlng, 4);
// var waterMap = L.map('waterMap', {crs: L.CRS.EPSG4326}).setView(centerLatlng, 4);
var waterMap = L.map('waterMap', {crs: L.extend({}, L.CRS.EPSG3857, {wrapLat: null, wrapLng: null})}).setView(centerLatlng, 4);

// var scarcityMap = L.map('scarcityMap', {crs: L.CRS.EPSG4326}).setView(centerLatlng, 4);
var scarcityMap = L.map('scarcityMap', {crs: L.extend({}, L.CRS.EPSG3857, {wrapLat: null, wrapLng: null})}).setView(centerLatlng, 4);
var _fakeScarcityMap = L.map('fakeMap', {crs: L.extend({}, L.CRS.EPSG3857, {wrapLat: null, wrapLng: null})}).setView(centerLatlng, 4);
// var _fakeScarcityMap = L.map('fakeMap', {crs: L.CRS.EPSG3857}).setView(centerLatlng, 4);

var scaleFactor = 1;
// global variables for the map's info display and legend
var infoArr = [];
var legendArr = [];
var popInfo, popLegend;
var waterInfo, waterLegend;
var scarcityInfo, scarcityLegend;

///////////////////////initilize the side bar///////////////////////////
var popSidebar = L.control.sidebar('popSidebar', {
    position: 'left',
    autoPan: false
});
popMap.addControl(popSidebar);
var waterSidebar = L.control.sidebar('waterSidebar', {
    position: 'left',
    autoPan: false
});
waterMap.addControl(waterSidebar);
var scarcitySidebar = L.control.sidebar('scarcitySidebar', {
    position: 'left',
    autoPan: false
});
scarcityMap.addControl(scarcitySidebar);
///////////////////////////////////////////////////////////////
var colorContainer = [];

var rgbaWater = ['rgb(215,230,244)','rgb(175,209,231)','rgb(114,178,215)','rgb(61,141,195)','rgb(8,48,107)'],
    rgbaScarcity = ['rgb(255, 0, 0)', 'rgb(254, 178, 76)', 'rgb(173, 221, 142)', 'rgb(49, 163, 84)'];
    rgbaPop = ['rgb(254,237,222)','rgb(253,208,162)','rgb(253,174,107)','rgb(253,141,60)','rgb(230,85,13)','rgb(166,54,3)'];

var southWest = L.latLng(-179.5, -89.5),
    northEast = L.latLng(179.5, 89.5),
    bounds = L.latLngBounds(southWest, northEast);

///////////////////////FUNCTIONS//////////////////////////////
function createMap(curMap){
      mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
      L.tileLayer(
                  'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
                  // 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; ' + mapLink + ' Contributors',
                  maxZoom: 8,
                  noWrap: true,
                  tileSize: 256
      }).addTo(curMap);              
}

function createInfoLegend(info, infoStr, legend, colorArr, map){
  if(info!=undefined){
      map.removeControl(info);  
  }
  if(legend!=undefined){
      map.removeControl(legend);
  }
  info = L.control();
  legend = L.control({position: 'bottomright'});   
  info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

  info.update = function (props) {
        this._div.innerHTML = '<h5>' + infoStr + '</h5>';
  };
  info.addTo(map);

  mapLegendInfo(legend, map, colorArr, infoStr);     
}

//sychronize each map within zoom event or drag event
function createMapEventListener(){
  
      popMap.on('dragend | zoomend', function(e){
            var center = popMap.getCenter();
            var curZoomLevel = popMap.getZoom();
            waterMap.setView(center, curZoomLevel);
            scarcityMap.setView(center, curZoomLevel);
            // update map info to others
            if(ComEventCue.connection)
              SendSyncMapsInfo();
      });

      waterMap.on('dragend | zoomend', function(e){
            var center = waterMap.getCenter();
            var curZoomLevel = waterMap.getZoom();
            popMap.setView(center, curZoomLevel);
            scarcityMap.setView(center, curZoomLevel);
            // update map info to others
            if(ComEventCue.connection)
              SendSyncMapsInfo();
      });

      scarcityMap.on('dragend | zoomend', function(e){
            var center = scarcityMap.getCenter();
            var curZoomLevel = scarcityMap.getZoom();
            popMap.setView(center, curZoomLevel);
            waterMap.setView(center, curZoomLevel);

            // update map info to others
            if(ComEventCue.connection)
              SendSyncMapsInfo();
      });
    

      scarcityMap.on('click', function(e){
            var idx = keysPressed.indexOf(shiftCode);
            if(idx > -1){
              keysPressed = [];
              communicationGCAM();
            }
      });
      
}
