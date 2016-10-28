// function plotPopPoints(data, curMap, curColorArr){




//     if(!data){
//         alert("No Such population data in the models!");
//     }
//     else{
//         // change curOverLay to popOverlay
//         if(popOverlay){
//             console.log("water over layer removed");
//             curMap.removeLayer(popOverlay);// in case of repeated layer, clear the canvas and layer
//         }
//         var colorMapper = createColorMapper(data, curColorArr, 'waterDemand');
//         var imgsrc = imageGenerator(data, curMap, colorMapper, 'waterDemand');
//         popOverlay = projectImg2Map(data, curMap, popOverlay, imgsrc);
//         popOverlay.bringToBack();
//         // waterOverlay = value[0];
//         //var colorMapper = value[1];

//         var infoStr = 'Water Demand Map';
//         if(legendArr.popLegend!=undefined)
//         {
//             // curMap.removeControl(infoArr.popInfo);
//             curMap.removeControl(legendArr.popLegend);  
//         }
//         // infoArr.popInfo = L.control();
//         legendArr.popLegend = L.control({position: 'bottomright'});      
//         mapLegendInfo(legendArr.popLegend, curMap, curColorArr, colorMapper, infoStr);
//     }
// }