function addPopMap(){
  if(gcamDemandSwitch){
    // blur the popmap
    // referred to: http://jordanhollinger.com/2014/01/29/css-gaussian-blur-behind-a-translucent-box/
  }
  else{
    var name = constructFileName();
    overlayNames = name;
    var loadingLayer = loadingImageLayer('img/ajax-loader.gif', popMap); 
    if(popOverlay){
        popMap.removeLayer(popOverlay);
    }
    popOverlay = L.tileLayer.wms('https://watersvr.dtn.asu.edu:8443/geoserver/niger_river/wms', {
                        layers: name.demandName,
                        format: 'image/png',
                        noWrap: true,
                        transparent: true
                  }).addTo(popMap);
    popMap.removeLayer(loadingLayer);
    // if(!workingMode){
    //     mapDoneCount++;
    //     if(mapDoneCount==3 && curSnapshot){
    //       mapDoneCount = 0;
    //       resetMaps(curSnapshot);
    //     }               
    // }    
  }
};

function projectComparisonMap(){
  if($("#EXPCombo").has("option").length<=0 || waterYVal == 0)
  {
      alert("No options in the combo box or values in the slider!")
  }
  else{
        var name = constructFileName();
        overlayNames = name;
        console.log('supply file name:' + name.supplyName);
        if(name.supplyName == null){
          alert("Error in constructing the fileName");
        }
        else{
          var loadingLayer = loadingImageLayer('img/ajax-loader.gif', waterMap);
          if(waterOverlay){
            waterMap.removeLayer(waterOverlay);
          }
          waterOverlay = L.tileLayer.wms('https://watersvr.dtn.asu.edu:8443/geoserver/niger_river/wms', {
          // waterOverlay = L.tileLayer.wms('http://watersvr.dtn.asu.edu:8080/geoserver/niger_river/wms', {
                  layers: name.supplyName,
                  format: 'image/png',
                  noWrap: true,
                  transparent: true,
                  styles: 'nr_runoff'
          }).addTo(waterMap);
          waterMap.removeLayer(loadingLayer);
          // reset map for parameters from the snapshots
          // if(!workingMode){
          //     mapDoneCount++;
          //     if(mapDoneCount==3 && curSnapshot){
          //       mapDoneCount = 0;
          //       resetMaps(curSnapshot);
          //     }               
          // }
        }     
  }
};

function addScarcityMap(){
  if($("#EXPCombo").has("option").length<=0 || waterYVal == 0)
  {
    alert("No options in the combo box or values in the slider!")
  }
  else{
      if(gcamDemandSwitch){
            calcGCAMDemand(gcamDemandData);
      }
      else{
            var name = constructFileName();
            overlayNames = name;
            var supplyFileName = name.supplyName;
            var demandFileName = name.demandName;
            // var supplyFileName = 'historical_CCCma-CanESM2_CCCma-CanRCM4_r2_BW_1951';
            // var demandFileName = 'density_OECD_SSP1_2010';
            if(supplyFileName==null || demandFileName==null){
              alert("Error in constructing the fileName");
            }
            else{
              var dataType = "high";
              var loadingLayer = loadingImageLayer('img/ajax-loader.gif', scarcityMap);
              var comboDivNameSet = ["POPCombo", "EXPCombo", "GCMCombo", "RCMCombo", "VARCombo", "YEARTYPECombo"];
              var sliderSet = ["popGrowthRateSlider", "timeZoneSlider"];
              var parentSet = ["configurationZone", "timeZone"];
              lockInputParameters(parentSet, comboDivNameSet, sliderSet);
              var coveragestoreName = demandFileName + '_' + supplyFileName;
              overlayNames.scarcityName = coveragestoreName;
              var start = new Date().getTime();
              console.log('starting...')
              $.ajax({
                url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/getScarcityPoints?callback=?',
                // url: 'http://localhost:8080/waterDemo/services/getScarcityPoints?callback=?',
                dataType: "jsonp",
                data: {message: "requestScarcity",
                      supplyfName: supplyFileName + '.tif',
                      supplySubDir: supplyFileName.split('_')[0],
                      demandfName: demandFileName + '.tif',
                      resolution: dataType},
                error: function(data){
                  alert("Error in trying to get the Scarcity data!");
                  unlockInputParameters(parentSet, comboDivNameSet, sliderSet);
                  console.log(data);
                },
                success: function(data){
                    var end0 = new Date().getTime();
                    console.log('milliseconds passed', end0 - start);
                    unlockInputParameters(parentSet, comboDivNameSet, sliderSet);
                    // if(dataType == "low"){
                    //     scarcityMap.removeLayer(loadingLayer);
                    //     plotScaricityPoints(data, scarcityMap, rgbaScarcity);
                    //     // reset map for parameters from the snapshots
                    //     if(!workingMode){
                    //       mapDoneCount++;
                    //       if(mapDoneCount==3 && curSnapshot){
                    //         mapDoneCount = 0;
                    //         console.log('reset plotting scarcity twice');
                    //         resetMaps(curSnapshot);
                    //       }               
                    //     }                   
                    // }
                    // else{
                      if(data.created){
                          var port = '8080';
                          var workspace = 'niger_river';
                          if(scarcityOverlay){
                              scarcityMap.removeLayer(scarcityOverlay);
                          }
                          var options = {
                              styles: 'nr_wscarcity_fm',
                              layers: coveragestoreName,
                              format: 'image/png',
                              noWrap: true,
                              transparent: true                        
                          };
                          scarcityOverlay = L.tileLayer.wms('https://watersvr.dtn.asu.edu:8443/geoserver/niger_river/wms', options);                 
                          scarcityOverlay.addTo(scarcityMap);
                          scarcityMap.removeLayer(loadingLayer);                  
                      }
                      else{
                        console.log('not created!');
                      }
                  
                    // }
           
              }  
            });
          }  
      }

  }
}

function calcGCAMDemand(data){
  var thisData = data;
  var name = constructFileName();
  overlayNames = name;
  var coverageName = thisData.filename + '_' + thisData.varname + '_' + thisData.year + '_' + name.supplyName;
  overlayNames.scarcityName = coverageName;
  $.ajax({
    url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/calcGCAMScarcity?callback=?',
    // url: 'http://localhost:8080/waterDemo/services/calcGCAMScarcity?callback=?',
    dataType: 'jsonp',
    data: {
      demandType : thisData.varname,
      supplyName: name.supplyName,
      year: thisData.year,
      demandName: thisData.filename
    },
    error: function(){
      console.log('Error occurs in calculating gcam demand!');
    },
    success: function(created){
      if(created){
        var loadingLayer = loadingImageLayer('img/ajax-loader.gif', scarcityMap); 
          if(scarcityOverlay){
              scarcityMap.removeLayer(scarcityOverlay);
          }
          scarcityOverlay = L.tileLayer.wms('https://watersvr.dtn.asu.edu:8443/geoserver/niger_river/wms', {
                              layers: coverageName,
                              format: 'image/png',
                              noWrap: true,
                              transparent: true,
                              styles: 'nr_wscarcity_fm' 
                        }).addTo(scarcityMap);
          scarcityMap.removeLayer(loadingLayer);
      }
      else{

      }
    }
  })
}



function constructFileName(){
  var name = {
    supplyName: null,
    demandName: null,
    scarcityName: null
  };

    if($("#EXPCombo").has("option").length<=0 || waterYVal == 0)
    {
      alert("No options in the combo box or values in the slider!");
      return;
    }
    else{
      var checkedVal = $('input[name="switch"]:checked').val();
      var curPOP = $('#POPCombo').val();
      var curEXP = $('#EXPCombo').val();
      var curGCM = $('#GCMCombo').val();
      var curRCM = $('#RCMCombo').val();
      var curVAR= $('#VARCombo').val();
      var curYEARTYPE = $('#YEARTYPECombo').val();
      var demandFileName = null;
      var supplyFileName = null;

      if(curPOP == popEXPText)
        demandFileName = "density_" + popEXPRealVal + "_" + growthRate + "pct_" + waterYVal;
      else
        demandFileName = "density_" + popSSPRealVal + "_" +  waterYVal;

      var curYearVal = null;

      if(checkedVal == 'newData'){
          curEXP = 'historical';
          if(curYEARTYPE == 'By Year')
              curYearVal = waterYVal;
          else
              curYearVal = climMeanRealVal;

          var curVersion = 'v1';
          var curGCMRCM = curGCM+'_'+curRCM;
          if(curGCMRCM == 'ICHEC-EC-EARTH_DMI-HIRHAM5'){
            curVersion = 'v2';
            supplyFileName = curEXP + "_" + curGCM + "_" + curRCM + "_"  + curVersion + "_" + curVAR + "_"+ curYearVal;
          }
          else if(curGCMRCM == 'CCCma-CanESM2_CCCma-CanRCM4'){
            curVersion = 'r2';
            supplyFileName = curEXP + "_" + curGCM + "_" + curRCM + "_"  + curVersion + "_" + curVAR + "_"+ curYearVal;
          }
          else{
            supplyFileName = curEXP + "_" + curGCM + "_" + curRCM + "_"  + curVersion + "_" + curVAR + "_"+ curYearVal;
          }    
      }
      else{
          if(curEXP == 'Historical')
              curEXP = 'historical';
          else if(curEXP == rcp45Text)
              curEXP = rcp45RealVal;
          else
              curEXP = rcp85RealVal;
        
          if(curYEARTYPE == 'By Year')
              curYearVal = waterYVal;
          else{
              if(curYEARTYPE == climMeanText)
                  curYearVal = climMeanRealVal;
              else
                  curYearVal = curYEARTYPE;
          }
          supplyFileName = curEXP + "_" + curGCM + "_" + curRCM +  "_" + curVAR + "_"+ curYearVal;
      }
    }

  name.demandName = demandFileName;
  name.supplyName = supplyFileName;

  return name;
}
