///////////////////////////////////////////////////////////////
///////////////GLOBAL VARIABLES FOR MAP ELEMENTS///////////////
///////////////////////////////////////////////////////////////
// THIS PART IS REQUIRED BY PLOTXXXMAP.JS FUNCTION
var canvas = document.createElement("canvas");
var ctx = canvas.getContext('2d');
var imgDataFromCTX;
var imgdata;
var image = new Image();

// set iniitial width and height
var body = document.body;
body.style.height = (window.innerHeight-20) + "px";
body.style.width = (window.innerWidth-20) + "px";

var centerLatlng = [15, 0];

var uncertaintyType = {
          agreeType: 'agree', 
          entropyType: 'entropy', 
          meanDevType: 'variance'
        };
var styleNameSet = {
          agreementStyle: 'nr_wuncertainty_agree', 
          entropyStyle: 'nr_wuncertainty_entropy', 
          meanDevStyle: 'nr_wuncertainty_variance'
        };
var agreementMap = new MapManager('agreementMap', 0, centerLatlng, 4, 'Agreement Map', null, null, 1, uncertaintyType.agreeType, styleNameSet.agreementStyle);
var entropyMap = new MapManager('entropyMap', 1, centerLatlng, 4, 'Entropy Map', entropyColorTable, xvariancelegendText, 2, uncertaintyType.entropyType, styleNameSet.entropyStyle);
var meanvarianceMap = new MapManager('meanvarianceMap', 2, centerLatlng, 4, 'Variance Map', varianceColorTable, xVariancelegendText, 3, uncertaintyType.meanDevType, styleNameSet.meanDevStyle);
var mapHandlerList = [agreementMap, entropyMap, meanvarianceMap];
agreementMap.createMap();
entropyMap.createMap();
meanvarianceMap.createMap();

mapHandlerList[0].mapHandler.on('drag | zoomend', function(e){
          var center = this.getCenter();
            var zoom = this.getZoom();
            mapHandlerList[1].mapHandler.setView(center, zoom);
            mapHandlerList[2].mapHandler.setView(center, zoom);

});
mapHandlerList[1].mapHandler.on('drag | zoomend', function(e){
          var center = this.getCenter();
            var zoom = this.getZoom();
            mapHandlerList[0].mapHandler.setView(center, zoom);
            mapHandlerList[2].mapHandler.setView(center, zoom);

});
mapHandlerList[2].mapHandler.on('drag | zoomend', function(e){
          var center = this.getCenter();
            var zoom = this.getZoom();
            mapHandlerList[1].mapHandler.setView(center, zoom);
            mapHandlerList[0].mapHandler.setView(center, zoom);
});
