function MapManager(containerID, id, center, zoomLevel, infoStr, colorArr, legendText, mapId, renderingType, styleName){
    this.containerID = containerID;
    this.id = id;
    this.center = center;
    this.zoomLevel = zoomLevel;
    this.infoStr = infoStr;
    this.colorArr = colorArr;
    this.legendText = legendText;
    this.infoHandler;
    this.legendHandler;
    this.mapHandler;
    this.selectorSwitch = false;
    this.selector;
    this.mapId = mapId;
    this.mapOverlayObj = {
        style: styleName,
        overlay: null
    };
    this.renderingType = renderingType;
    this.imgSrc;
};

MapManager.prototype.createMap = function(){
    this.mapHandler = L.map(this.containerID, {crs: L.CRS.EPSG4326}).setView(this.center, this.zoomLevel);
    var mapLink = '<a href="https://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer(
                  'http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
                  attribution: '&copy; ' + mapLink + ' Contributors',
                  maxZoom: 8,
                  tileSize: 256,
                  noWrap: true
    }).addTo(this.mapHandler); 
    this.createLegend();             
};


MapManager.prototype.createLegend = function(){
    var infoStr = this.infoStr;
    var legendText = this.legendText;
    var colorArr = this.colorArr;
    if(this.infoHandler!=undefined){
        this.mapHandler.removeControl(this.infoHandler);  
    }
    this.infoHandler = L.control();
    this.infoHandler.onAdd = function (map) {
          this._div = L.DomUtil.create('div', 'info');
          this.update();
          return this._div;
      };
    this.infoHandler.update = function (props) {

          this._div.innerHTML = '<h5>' + infoStr + '</h5>';
    };
    this.infoHandler.addTo(this.mapHandler);
    
    // if(infoStr != 'Agreement Map'){
    // // if(infoStr == 'Entropy Map'){
    //     if(this.legend!=undefined){
    //       this.mapHandler.removeControl(this.legendHandler);
    //     }
    //     this.legendHandler = L.control({position: 'bottomright'});   
    //     this.legendHandler.onAdd = function (map) {
    //       this._div = L.DomUtil.create('div', 'info legend');
    //       this.update();
    //       return this._div;
    //     }
    //     this.legendHandler.update = function (props){   
    //         var labels = [];
    //         for (var i = 0; i < legendText.length; i++) {
    //             var from = legendText[i];
    //             var to = legendText[i + 1];
    //              labels.push(
    //                       '<i style="background:' + colorArr[i] + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
    //             // if(to)  
    //             //   labels.push('<i style="background:' + colorArr[i] + '"></i> ' + from +  '&ndash;' + to);
    //         }
    //         this._div.innerHTML = labels.join('<br>');
    //     };        
    //     this.legendHandler.addTo(this.mapHandler); 
    // }   
};

// MapManager.prototype.createIcons = function(selectorWidth, selectorHeight, selectorList, mapHandlerList){
//       var mapHandler = this.mapHandler;
//       var mapId = this.mapId;
//       L.easyButton('fa-square-o', 
//         function() {
//           var width = selectorWidth;
//           var height = selectorHeight;
//           var selectorSwitch = mapHandlerList[this.options.id-1].selectorSwitch;
//           if(selectorSwitch == false){
//             mapHandlerList.forEach(function(element, index, array){
//                 var selector =  L.areaSelect({
//                                   width:width, 
//                                   height:height, 
//                                   keepAspectRatio:false
//                                 });  
//                 selectorList.push(selector);
//             });
//             console.log('selector', selectorList);
//             selectorList.forEach(function(element, index, array){
//                 console.log(mapHandlerList, index);
//                 element.addTo(mapHandlerList[index].mapHandler);
//                 mapHandlerList[index].selectorSwitch = true;
//             });
//           }
//           else{
//             console.log('trying to remove');
//             selectorList.forEach(function(element, index, array){
//                 element.remove();
//                 mapHandlerList[index].selectorSwitch = false;
//             });
//             selectorList = [];
//           }
//         },
//       'Highlight',
//       mapHandler,
//       mapId);    
// };


// MapManager.prototype.listenAreaSelecotr = function(selectorLists){
//   selectorLists.forEach(function(each, index, array){
//       each.on('change', function(){
//         for(var i=0; i<selectorLists.length; i++){
//           if(i!=index){
//             selectorLists[i]._width = each._width;
//             selectorLists[i]._height = each._heigh;
//             selectorLists[i].addTo(this.mapHandlerList[i]);
//           }
//         }
//         disagreeAreaSelector._width = agreeAreaSelector._width;
//         disagreeAreaSelector._height = agreeAreaSelector._height;
//         disagreeAreaSelector.addTo(disagreementMap);   
//       });
//   });
//   agreeAreaSelector.on('change', function(){
//     disagreeAreaSelector._width = agreeAreaSelector._width;
//     disagreeAreaSelector._height = agreeAreaSelector._height;
//     disagreeAreaSelector.addTo(disagreementMap);   
//   });

//   disagreeAreaSelector.on('change', function(){
//     agreeAreaSelector._width = disagreeAreaSelector._width;
//     agreeAreaSelector._height = disagreeAreaSelector._height;
//     agreeAreaSelector.addTo(agreementMap);   
//   });
// }