$( document ).ready(function() {
////////////////////////////////////////////////////////////////////////////////////////////
    window.onresize = function(event) {
        var body = document.body;
        var height = window.innerHeight;
        var width = window.innerWidth;
        body.style.height = (height-8) + "px";
        body.style.width = (width-4) + "px";
        if(width<1200 || height<800)
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
        console.log('resizing');
    };
////////////////////////////////////////////////////////////////////////////////////////////


    
    qrCodeManager = new QRCodeManager('QRCode', 100, 100);
    qrCodeManager.updateQRCode("https://watersvr.dtn.asu.edu:8843");

    // create map
    createMap(popMap);
    createMap(waterMap);
    createMap(scarcityMap);
    createMapEventListener();
    
    createInfoLegend(popInfo, 'Population Map', popLegend, rgbaPop, popMap);
    createInfoLegend(waterInfo, 'Water Supply Map', waterLegend, rgbaWater, waterMap);
    createInfoLegend(scarcityInfo, 'Water Scarcity Map', scarcityLegend, rgbaScarcity, scarcityMap);

    loadStationTimeSeries('_Raw.csv', waterStationRawGrp);
    loadStationTimeSeries('_BiasCorr.csv', waterStationBiasGrp);
////////////////////////////////////////////////////////////////////////////////////////////
    var clientNumber = localStorage.getItem('WaterVisClientNumber');
    if(clientNumber===null)
          clientNumber=-1;

    socket = io({query:'clientNumber='+clientNumber});

    snapshotPool = [];

    socket.on('connectionEstablished', function(init){
      // snapshotPool = [];
      console.log(init);
      localStorage.setItem('WaterVisClientNumber', init.clientNumber);
      snapshotPool = init.snapshots;
    });

    socket.on('newSnapshotCreated', function(snapshot){
      // just update the local snapshotpool
      snapshotPool.push(snapshot);
    });

    socket.on('showSnapshot', function(snapshotID){
      workingMode = false;
      console.log('show snapshot: '+snapshotID);
      // clear records the # of map done
      mapDoneCount = 0;
      snapshotPool.forEach(function(entry, index){
        // find the snapshot with the specified ID
        if(entry.ID == snapshotID){
          // update the scenario
          curSnapshot = entry;
          if(!resetParams(entry, 'client')){
            var str='Failed to restore the scenario.'
            makeDialog(str);
          }
        }
      });
    });
////////////////////////////////////////////////////////////////////////////////////////////
    var defaultVal = $('input[name="switch"]:checked').val();
    listenSlider(defaultVal);
    listenComboBox();
    listenRadioButton();
    // // createConnection();
    LoadParamsOptions(defaultVal); 
    loadWaterLayers();
    createMapIcons();
    createInitialSidebar();
    // initialStatusCheck();
    addImgToMaps();
    console.log(waterYVal + " " + $('#EXPCombo').val());
////////////////////////////////////////////////////////////////////////////////////////////
    //here is the new code segment
    function storageHandler(event) {
        console.log("connected!");
           if(event.newValue){
            var newValue = JSON.parse(event.newValue);
            if(newValue.hasOwnProperty("html5storage"))
                console.log(newValue);
           }
    }; 
    
	 communication();
    
    //end of the new code segment
////////////////////////////////////////////////////////////////////////////////////////////  



    function getObject(url){
      var parser = document.createElement('a'),
            searchObject = {},
            queries, split, i;
      parser.href = url;
      var queries = parser.search.replace(/^\?/, '').split('&');
      for( i = 0; i < queries.length; i++ ) {
            split = queries[i].split('=');
            if(split[1].indexOf("+")){
              // notice here: we replace all "+" as space regardless of this "+" comes from the $.param() or itself, so use character carefully in parameters
                split[1] = replaceAll(split[1], "+", " ");
            }
            searchObject[split[0]] = split[1];
      }
      return searchObject;
    }
    var curUrl = window.location.href;
    console.log("curUrl is: " + curUrl);
    // var parameters = QueryStringToJSON(curUrl.split('?')[1]);
    if(curUrl.split("?")[1] != null){
      var objects = getObject(curUrl);
      console.log('parameters are : ', objects);
      resetParams(objects, 'node');
    }

});

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}



$(document).on("keyup keydown", function(e) {
switch(e.type) {
    case "keydown" :
        keysPressed.push(e.keyCode);
        break;
    case "keyup" :
        var idx = keysPressed.indexOf(e.keyCode);
        if (idx >= 0)
            keysPressed.splice(idx, 1);
        break;
}
});





