var hostIP = 'http://129.219.220.51:8443/';
var mapDoneCount = 0;

function createConnection(){
    $.ajax({
      // url: 'http://10.211.16.164:1337/'
      url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/newConnection?callback=?',
      //type: "post",
      dataType: "jsonp",
      data: {message:"newConnection"},
      error: function(){
        // alert("Fail to connect database!");
      },
      success: function(data){
        console.log("database connected");

      }
    });  
}

// don't use it any more
function loadParams(){
    $.ajax({
      url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/LoadTiffParams?callback=?',
      //type: "post",
      dataType: "jsonp",
      data: {message:"loadFiles"},
      error: function(){
        alert("Loading Parameters for the Files Error!");
      },
      success: function(data){
        
      }
    });
};

// don't use it any more
function loadTimeseries(){
    $.ajax({
      url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/LoadTimeseries?callback=?',
      //type: "post",
      dataType: "jsonp",
      data: {message:"loadTimeseries"},
      error: function(){
        alert("Loading Timeseries Error!");
      },
      success: function(data){
        createTimeseries(data);
      }
    });  
}


function addPopMap(){
    var POPcb = document.getElementById("POPCombo");
    if($("#EXPCombo").has("option").length<=0 || waterYVal == 0)
    {
      alert("No options in the combo box or values in the slider!");
      return;
    }
    else{
      var demandFileName = null;
      var curPOP = POPcb.options[POPcb.selectedIndex].value;

      if(curPOP == popEXPText){
        demandFileName = "density_" + popEXPRealVal + "_" + growthRate + "pct_" + waterYVal;
      }
      else{
        demandFileName = "density_" + popSSPRealVal + "_" +  waterYVal;
      }
    }
    var loadingLayer = loadingImageLayer('img/ajax-loader.gif', popMap); 
    if(popOverlay){
        popMap.removeLayer(popOverlay);
    }
    popOverlay = L.tileLayer.wms('https://watersvr.dtn.asu.edu:8443/geoserver/niger_river/wms', {
    // popOverlay = L.tileLayer.wms('http://watersvr.dtn.asu.edu:8080/geoserver/niger_river/wms', {
                        layers: demandFileName,
                        format: 'image/png',
                        crs: L.CRS.EPSG4326,
                        transparent: true
                  }).addTo(popMap);
    popMap.removeLayer(loadingLayer);
    if(!workingMode){
        mapDoneCount++;
        if(mapDoneCount==3 && curSnapshot){
        	mapDoneCount = 0;
          resetMaps(curSnapshot);
        }              	
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
              $.ajax({
                    url: 'http://watersvr.dtn.asu.edu:8443/geoserver/rest/workspaces/niger_river/coveragestores?configure=all',
                    dataType: "json",
                    data: {},
                    error: function(){
                      alert("Here is the notification for error in trying using geoserver for scarcity data!");
                    },
                    success: function(data){
                      console.log(data);
                      console.log('send to geoserver success!');
                    }
              }); 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
};

function projectComparisonMap(){
  var EXPcb = document.getElementById("EXPCombo");
  var GCMcb = document.getElementById("GCMCombo");
  var RCMcb = document.getElementById("RCMCombo");
  var VARcb = document.getElementById("VARCombo");
  var YEARTYPEcb = document.getElementById("YEARTYPECombo");
  // var YEARtxt = document.getElementById("timeZoneText");

  if($("#EXPCombo").has("option").length<=0 || waterYVal == 0)
  {
      alert("No options in the combo box or values in the slider!")
  }
  else{
      var supplyFileName = null;
      var curEXP = EXPcb.options[EXPcb.selectedIndex].value;
      var curGCM = GCMcb.options[GCMcb.selectedIndex].value;
      var curRCM = RCMcb.options[RCMcb.selectedIndex].value;
      var curVAR= VARcb.options[VARcb.selectedIndex].value;
      var curYEARTYPE = YEARTYPEcb.options[YEARTYPEcb.selectedIndex].value;
      var curYearVal = null;
      if(curYEARTYPE == 'By Year') {
        curYearVal = waterYVal;
        if(curYearVal<=2005)
          curEXP='historical';
      }
      else{
        if(curYEARTYPE==climMeanText)
          curYearVal = climMeanRealVal;
        else
          curYearVal = curYEARTYPE;
      }
      if(curEXP==rcp45Text)
        curEXP=rcp45RealVal;
      if(curEXP==rcp85Text)
        curEXP=rcp85RealVal;
      
      supplyFileName = curEXP + "_" + curGCM + "_" + curRCM + "_" + curVAR + "_" + curYearVal;
      console.log('supply file name:' + supplyFileName);
      if(!supplyFileName){
        alert("Error in constructing the fileName");
      }
      else{
        var loadingLayer = loadingImageLayer('img/ajax-loader.gif', waterMap);
        if(waterOverlay){
          waterMap.removeLayer(waterOverlay);
        }
        waterOverlay = L.tileLayer.wms('https://watersvr.dtn.asu.edu:8443/geoserver/niger_river/wms', {
        // waterOverlay = L.tileLayer.wms('http://watersvr.dtn.asu.edu:8080/geoserver/niger_river/wms', {
                layers: supplyFileName,
                format: 'image/png',
                crs: L.CRS.EPSG4326,
                transparent: true
        }).addTo(waterMap);
        waterMap.removeLayer(loadingLayer);
        if(!workingMode){
            mapDoneCount++;
            if(mapDoneCount==3 && curSnapshot){
            	mapDoneCount = 0;
              resetMaps(curSnapshot);
            }              	
        }
    }
  }
};

function addScarcityMap(){
    
  var POPcb = document.getElementById("POPCombo");
  var EXPcb = document.getElementById("EXPCombo");
  var GCMcb = document.getElementById("GCMCombo");
  var RCMcb = document.getElementById("RCMCombo");
  var VARcb = document.getElementById("VARCombo");
  var YEARTYPEcb = document.getElementById("YEARTYPECombo");
  // var YEARtxt = document.getElementById("timeZoneText");

  if($("#EXPCombo").has("option").length<=0 || waterYVal == 0)
    {
      alert("No options in the combo box or values in the slider!")
    }
    else{
      var supplyFileName = null;
      var demandFileName = null;
      var curPOP = POPcb.options[POPcb.selectedIndex].value;
      var curEXP = EXPcb.options[EXPcb.selectedIndex].value;
      var curGCM = GCMcb.options[GCMcb.selectedIndex].value;
      var curRCM = RCMCombo.options[RCMCombo.selectedIndex].value;
      var curVAR= VARCombo.options[VARCombo.selectedIndex].value;
      var curYEARTYPE = YEARTYPEcb.options[YEARTYPEcb.selectedIndex].value;
      var curYearVal = null;
      var curGrowthVal = null;
      
      if(curYEARTYPE == 'By Year') {
        curYearVal = waterYVal;
        if(curYearVal <= 2005)
          curEXP = 'historical';
      }
      else{
        if(curYEARTYPE==climMeanText)
          curYearVal = climMeanRealVal;
        else
          curYearVal = curYEARTYPE;
      }
      if(curEXP == rcp45Text)
        curEXP = rcp45RealVal;
      if(curEXP == rcp85Text)
        curEXP = rcp85RealVal;

      supplyFileName = curEXP + "/" + curEXP + "_" + curGCM + "_" + curRCM + "_" + curVAR + "_" + curYearVal + ".tif";
      if(curPOP == popEXPText){
        curPOP = popEXPRealVal;
        demandFileName = "density_" + curPOP + "_" + growthRate + "pct_" + waterYVal + '.tif';
      }
      else{
        curPOP = popSSPRealVal;
        demandFileName = "density_" + curPOP + "_" +  waterYVal + '.tif';
      }
      console.log('demand file name: ' + demandFileName);
      console.log('supply file name:' + supplyFileName);
      if(!supplyFileName && !demandFileName)
      {
        alert("Error in constructing the fileName");
      }
      else{
        var dataType = "low";
        var loadingLayer = loadingImageLayer('img/ajax-loader.gif', scarcityMap);
        $.ajax({
          url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/getScarcityPoints?callback=?',
          // url: 'http://watersvr.dtn.asu.edu:8080/waterDemo/services/getScarcityPoints?callback=?',
          dataType: "jsonp",
          data: {message: "requestScarcity",
                supplyfName: supplyFileName,
                supplySubDir: curEXP,
                demandfName: demandFileName,
                resolution: "low"},
          error: function(){
            alert("Error in trying to get the Scarcity data!");
          },
          success: function(data){
              scarcityMap.removeLayer(loadingLayer);
              if(scarcityMap.getZoom()!=4){
              	  // console.log('get zoome level');
                  scarcityMap.setZoom(4);
                  scarcityMap.on('zoomend', function bob(){
                    plotScaricityPoints(data, scarcityMap, rgbaScarcity);
                    scarcityMap.off('zoomend', bob);
                  });               
              }
              else{
              	// console.log('directly draw data');
                plotScaricityPoints(data, scarcityMap, rgbaScarcity);
              }
              if(!workingMode){
	              mapDoneCount++;
	              if(mapDoneCount==3 && curSnapshot){
	              	mapDoneCount = 0;
	                resetMaps(curSnapshot);
	              }              	
              }




            }
     
        });  
      }
    }  
}

// don't use it anymore
function addComparisonMap(yearVal){
    var POPcb = document.getElementById("POPCombo");
    var EXPcb = document.getElementById("EXPCombo");
    var VARcb = document.getElementById("VARCombo");
    var YEARTYPEcb = document.getElementById("YEARTYPECombo");  

   if($("#EXPCombo").has("option").length<=0 || waterYVal == 0){
      alert("No options in the combo box!")
    }
    else{
      var supplyFileName = null;
      var demandFileName = null;      
      var curYEARTYPE = YEARTYPEcb.options[YEARTYPEcb.selectedIndex].value;
      var curPOP = POPcb.options[POPcb.selectedIndex].value;
      var curEXP = EXPcb.options[EXPcb.selectedIndex].value;
      var curVAR= VARCombo.options[VARCombo.selectedIndex].value;
      var curYearVal = null;
      var curGrowthVal = null;
      if(curYEARTYPE == 'By Year') {
        curYearVal = waterYVal;
        if(curYearVal<=2005)
          curEXP='historical';
      }
      else{
        if(curYEARTYPE==climMeanText)
          curYearVal = 'ClimMean';
        else
          curYearVal = curYEARTYPE;
      }
      if(curEXP==rcp45Text)
        curEXP='rcp45';
      if(curEXP==rcp85Text)
        curEXP='rcp85';
      // may exist multiple water supply data
      supplyFileName = curEXP + "/" + curEXP + "_" + curVAR + "_" + curYearVal + ".tif";
      // under the single one specified population demand
      if(curPOP == 'Exponential Growth'){
        curPOP = 'EXP'
        demandFileName = "popden_pred/720x360/density_" + curPOP + "_" + growthRate + "pct_" + waterYVal;
      }
      else{
        curPOP = 'OECD_SSP1'
        demandFileName = "popden_pred/720x360/density_" + curPOP + "_" +  waterYVal;
      }
      console.log(supplyFileName);

      $.ajax({
        url: hostIP+'waterDemo/services/getGcmRcmName?callback=?',
        dataType: "jsonp",
        data: {message: "searchGcmRcm",
               EXP: curEXP,
               VAR: curVAR,
               YEARTYPE: curYearVal,
               POP: curPOP,
               gRate: growthRate,
               yearVal: waterYVal
             },
        error: function(){
          alert("Error in trying to search the files!");
        },
        success: function(data){
          if(!data){
             alert("No such combination of parameters!");
          }
          else{

             var curData = [];
             // console.log('work!' + data.fNames);

             for(var i=0; i<data.sfNames.length; i++){
               var cursfName =  curEXP +  "/" + curEXP +  "_" + data.sfNames[i][1] + "_" + data.sfNames[i][2] + "_" + curVAR + "_" + curYearVal;
               console.log(cursfName);
               getMultiWater(cursfName, data.sfNames.length);
               // currently, we do not want to be involved in the calculation of scarcity
               // var curdfName = "\\\\" + curEXP +  "\\\\" + curEXP +  "_" + data.fNames[i][1] + "_" + data.fNames[i][2] + "_" + curVAR + "_" + curYearVal;
               // getMultiScarcity(curdfName, demandFileName, data.dfNames.length);
             }              
            // curData = addNewElem2Matrix(data, rgbaWater);
             return curData;            
          }
        }
      });         
    }    
};

// fNmame here is without .tif
function getMultiWater(fName, length){
    fullName = fName + '.tif';
    $.ajax({
      url: hostIP+'waterDemo/services/getWaterPoints?callback=?',
      dataType: "jsonp",
      data: {message: "requestWater", 
            supplyfName: fullName,
            resolution: "low"},
      error: function(){
        alert("Error in trying to get the Water data!");
      },
      success: function(data){
        WaterSuccessCount++;
        //save data
        var colorMapper = createColorMapper(data, rgbaWater);
        var imgsrc = fastGenerator(data, colorMapper, 'waterSupply');        
        multiWaterSet.push(imgsrc);
        multiWaterfNameSet.push(fName);
        //draw data
        // if(WaterSuccessCount == length && ScarcitySuccessCount == length){
        //   // actually, the data here only represent the data in the last ajax
        //   addNewElem2Matrix(multiWaterSet, multiWaterfNameSet, 'water');
        //   addNewElem2Matrix(multiScarcitySet, multiScarfNameSet, 'scarcity');
        // }
        if(WaterSuccessCount == length){
          // actually, the data here only represent the data in the last ajax
          addNewElem2Matrix(multiWaterSet, multiWaterfNameSet, 'water');
          // addNewElem2Matrix(multiScarcitySet, multiScarfNameSet, 'scarcity');
        }

      }
    });   
};

// fNmame here is without .tif
function getMultiScarcity(fName, dfName, length){
    fullName = fName + '.tif';
    // draw the scarcity data
    $.ajax({
      url: hostIP+'waterDemo/services/getScarcityPoints?callback=?',
      dataType: "jsonp",
      data: {message: "requestScarcity",
            supplyfName: fullName,
            demandfName: dfName,
            resolution: "low"},
      error: function(){
        alert("Error in trying to get the Scarcity data!");
      },
      success: function(data){
        ScarcitySuccessCount++;
        var colorMapper = createColorMapper(data, rgbaScarcity);
        var imgsrc = imageGenerator(data, colorMapper);        
        multiScarcitySet.push(imgsrc);
        multiScarfNameSet.push(fName);
        if(WaterSuccessCount == length && ScarcitySuccessCount == length){
          // actually, the data here only represent the data in the last ajax
          addNewElem2Matrix(multiWaterSet, multiWaterfNameSet, 'water');
          addNewElem2Matrix(multiScarcitySet, multiScarfNameSet, 'scarcity');
        }
      }
    });   
};

function loadingImageLayer(filePath, map){
    var halflatDistance = (map.getBounds().getSouthWest().lat - map.getBounds().getNorthEast().lat)/16.0;
    var halflngDistance = (map.getBounds().getNorthEast().lng - map.getBounds().getSouthWest().lng)/16.0;
    var halfDistance = Math.min(halflatDistance, halflngDistance);
    var imageBounds = [[map.getCenter().lat-halfDistance,map.getCenter().lng-halfDistance], 
                        [map.getCenter().lat+halfDistance, map.getCenter().lng+halfDistance]];
    var loadingLayer = L.imageOverlay(filePath, imageBounds).addTo(map);
    return loadingLayer;
}



function saveParameters(){
  if(!userName){
      BootstrapDialog.show({
          title: 'Before your first saving, please input your user name.',
          message: '<span class="help-block">Here goes your name</span>'+
                    '<input id="name" name="name" type="text" placeholder="Your name..." class="form-control input-md"> ' +
                    '<span class="help-block">You may also describe your scenario in short here</span> '+
                    '<input id="describe" name="describe" type="text" placeholder="Your descriptions..." class="form-control input-md"> ',
          buttons: [{
              id: 'btn-ok',   
              icon: 'glyphicon glyphicon-check',       
              label: 'Save',
              cssClass: 'btn-primary', 
              autospin: false,
              action: function(dialogRef){    
                var nameVal = document.getElementById('name').value;
                var descriptionVal = document.getElementById('describe').value;
                console.log(nameVal);
                if(nameVal){
                  userName = nameVal;
                  description = descriptionVal;
                  sendParams();
                  dialogRef.close();
                }
                else{
                  alert('At least input something please!');
                }
              }
          }]
      });
  }
  else{
      BootstrapDialog.show({
          title: 'Description for the scenario.',
          message: '<span class="help-block">You may also describe your scenario in short here</span> '+
                    '<input id="describe" name="describe" type="text" placeholder="Your descriptions..." class="form-control input-md"> ',
          buttons: [{
                label: 'Skip',
                cssClass: 'btn-primary', 
                action: function(dialogItself){
                    descriptionVal = 'None';
                    dialogItself.close();
                    sendParams();
                }
              },
              {
              id: 'btn-ok',   
              icon: 'glyphicon glyphicon-check',       
              label: 'Save',
              autospin: false,
              action: function(dialogRef){    
                var descriptionVal = document.getElementById('describe').value;
                if(descriptionVal){
                  description = descriptionVal;
                  dialogRef.close();
                  sendParams();
                }
                else{
                  alert('At least input something please!');
                }
              }
          }]
      });    
  }
}

function sendParams(){
  var date = new Date($.now());
  var demandmap = {
      centerView: popMap.getCenter(),
      zoomLevel: popMap.getZoom()
  };
  var supplymap = {
      centerView: waterMap.getCenter(),
      zoomLevel: waterMap.getZoom()
  };
  var scarcitymap = {
      centerView: scarcityMap.getCenter(),
      zoomLevel: scarcityMap.getZoom()
  };
  var mapInfo = {
      demand: demandmap,
      supply: supplymap,
      scarcity: scarcitymap
  };

  var POPcb = document.getElementById("POPCombo");
  var EXPcb = document.getElementById("EXPCombo");
  var GCMcb = document.getElementById("GCMCombo");
  var RCMcb = document.getElementById("RCMCombo");
  var VARcb = document.getElementById("VARCombo");
  var YEARTYPEcb = document.getElementById("YEARTYPECombo");

  var paramInfo = {
      EXP: EXPcb.options[EXPcb.selectedIndex].value,
      GCM: GCMcb.options[GCMcb.selectedIndex].value,
      RCM: RCMCombo.options[RCMCombo.selectedIndex].value,
      VAR: VARCombo.options[VARCombo.selectedIndex].value,
      POP: POPcb.options[POPcb.selectedIndex].value,
      YEAR: YEARTYPEcb.options[YEARTYPEcb.selectedIndex].value,
      grSliderVal: growthRate,
      tSliderVal: waterYVal
  }
  console.log(userName);
  
  var curSnapshot = {
      title: userName,
      description: description,
      icon: '',
      date: date,
      mapInfo: mapInfo,
      paramInfo: paramInfo
  };

  socket.emit('snapshotSended', curSnapshot);
}


function addImgToMaps(){
  projectComparisonMap();  
  addPopMap();
  addScarcityMap();
}

function openSnapPoolDiv(){
  window.open("snapshotBrowser.html");
}