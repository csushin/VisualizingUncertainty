// var plotTimes = 0;
// function plotWaterPoints(data, curMap, curColorArr, curOverlay){
//     if(!data){
//         alert("No Such parameters in the models!");
//     }
//     else{
//         console.log(curOverlay);
//     	if(curOverlay){
//             console.log("water over layer removed");
//             curMap.removeLayer(curOverlay);// in case of repeated layer, clear the canvas and layer
//         }
//         var colorMapper = createColorMapper(data, curColorArr, 'waterSupply');
//         var imgsrc = imageGenerator(data, curMap, colorMapper, 'waterSupply');
//         curOverlay = projectImg2Map(data, curMap, curOverlay, imgsrc);
//         curOverlay.bringToBack();
//         plotTimes++;
//         // waterOverlay = value[0];
//         //var colorMapper = value[1];
//         if(plotTimes==1){// to control that the legend only created once
//         var infoStr = 'Water Supply Map';
//             if(legendArr.waterLegend!=undefined)
//             {
//                 // curMap.removeControl(infoArr.waterInfo);
//                 curMap.removeControl(legendArr.waterLegend);  
//             }
//             // infoArr.waterInfo = L.control();
//             legendArr.waterLegend = L.control({position: 'bottomright'});   
//             mapLegendInfo(legendArr.waterLegend, curMap, curColorArr, colorMapper, infoStr);            
//         }

//     }
// }