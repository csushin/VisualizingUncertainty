// create map
var map = L.map("map", {crs: L.CRS.EPSG4326}).setView([0,0], 4);
var mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
var mapOverlay;
L.tileLayer(
      'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 8,
      tileSize: 256,
      noWrap: true
}).addTo(map); 
// L.esri.basemapLayer(
//       'Topographic', {
//       // attribution: '&copy; ' + mapLink + ' Contributors',
//       // maxZoom: 8,
//       // tileSize: 256,
//       // noWrap: true
// }).addTo(map); 
// create info pop
var infoStr = "Uncertainty Map";
var infoHandler = L.control();
infoHandler.onAdd = function (map) {
      this._div = L.DomUtil.create('div', 'info');
      this.update();
      return this._div;
};
infoHandler.update = function (props) {
      this._div.innerHTML = '<h5>' + infoStr + '</h5>';
};
infoHandler.addTo(map);

// function MapObject (container){
//       this.map = L.map(container, {crs: L.CRS.EPSG4326}).setView([0,0], 4);
//       this.overlay = undefined;
//       this.legend = undefined;

//       var mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
//       L.tileLayer(
//             'http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
//             attribution: '&copy; ' + mapLink + ' Contributors',
//             maxZoom: 8,
//             tileSize: 256,
//             noWrap: true
//       }).addTo(this.map); 
// }

// var ensembleStatMap = new MapObject("MultiEnsembleSingleMap_mapDiv_map1");
// var ensembleStatMap2 = new MapObject("MultiEnsembleSingleMap_mapDiv_map2");

// create map
var ensembleStatMap = L.map("MultiEnsembleSingleMap_mapDiv_map1", {crs: L.CRS.EPSG4326}).setView([0,0], 4);
var mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
var ensembleStatMapOverlay;
var ensembleStatMapLegend;
L.tileLayer(
      'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 8,
      tileSize: 256,
      noWrap: true
}).addTo(ensembleStatMap); 
// create info pop

var ensembleStatMap2 = L.map("MultiEnsembleSingleMap_mapDiv_map2", {crs: L.CRS.EPSG4326}).setView([0,0], 4);
var mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
var ensembleStatMapOverlay2;
var ensembleStatMapLegend2;
L.tileLayer(
      'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 8,
      tileSize: 256,
      noWrap: true
}).addTo(ensembleStatMap2); 

ensembleStatMap.on('dragend | zoomend', function(e){
      var center = ensembleStatMap.getCenter();
      var curZoomLevel = ensembleStatMap.getZoom();
      ensembleStatMap2.setView(center, curZoomLevel);
});

ensembleStatMap2.on('dragend | zoomend', function(e){
      var center = ensembleStatMap2.getCenter();
      var curZoomLevel = ensembleStatMap2.getZoom();
      ensembleStatMap.setView(center, curZoomLevel);
});

var similarityMap = L.map("SimilarityMap", {crs: L.CRS.EPSG4326}).setView([0,0], 4);
L.tileLayer(
      'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 9,
      tileSize: 256,
      noWrap: true
}).addTo(similarityMap); 
var similarityMapOverlay;

function createensembleClstMap(){
      ensembleClstMap  = L.map("EnsembleClstMap", {crs: L.CRS.EPSG4326}).setView([0,0], 4);
      L.tileLayer(
            'http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; ' + mapLink + ' Contributors',
            maxZoom: 8,
            tileSize: 256,
            noWrap: true
      }).addTo(ensembleClstMap); 
}
var ensembleClstMapOverlay;   

