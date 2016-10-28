function plotScaricityPoints(data, curMap, curColorArr){
    if(!data){
        alert("No Such parameters in the models!");
    }
    else{
        if(scarcityOverlay){
            console.log("scacrcity overlayer removed");
            curMap.removeLayer(scarcityOverlay);// in case of repeated layer, clear the canvas and layer
        }
        var colorMapper = createColorMapper(data, curColorArr, 'scarcity');
        var imgsrc = imageGenerator(data, _fakeScarcityMap, colorMapper, 'scarcity');
        // console.log(imgsrc);
        scarcityOverlay = projectImg2Map(data, curMap, scarcityOverlay, imgsrc);
        // console.log(scarcityOverlay);
        scarcityOverlay.bringToBack();
        // var infoStr = 'Water Scarcity Map';
        // if(legendArr.scarcityLegend!=undefined)
        // {
            // curMap.removeControl(infoArr.scarcityInfo);
            // curMap.removeControl(legendArr.scarcityLegend);  
        // }
        // infoArr.scarcityInfo = L.control();
        // legendArr.scarcityLegend = L.control({position: 'bottomright'});   

        // mapLegendInfo(legendArr.scarcityLegend, curMap, curColorArr, colorMapper, infoStr);
    }
}