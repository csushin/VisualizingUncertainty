// create map
var map = L.map("map", {crs: L.CRS.EPSG4326}).setView([0,0], 4);
var mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
var mapOverlay;
L.tileLayer(
      'http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
      attribution: '&copy; ' + mapLink + ' Contributors',
      maxZoom: 8,
      tileSize: 256,
      noWrap: true
}).addTo(map); 
drawLegend("lengedBar");
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