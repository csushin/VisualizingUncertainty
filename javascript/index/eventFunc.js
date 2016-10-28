function loadingImageLayer(filePath, map){
    var halflatDistance = (map.getBounds().getSouthWest().lat - map.getBounds().getNorthEast().lat)/16.0;
    var halflngDistance = (map.getBounds().getNorthEast().lng - map.getBounds().getSouthWest().lng)/16.0;
    var halfDistance = Math.min(halflatDistance, halflngDistance);
    var imageBounds = [[map.getCenter().lat-halfDistance,map.getCenter().lng-halfDistance], 
                        [map.getCenter().lat+halfDistance, map.getCenter().lng+halfDistance]];
    var loadingLayer = L.imageOverlay(filePath, imageBounds).addTo(map);
    return loadingLayer;
}

function addImgToMaps(){
  if(checkModelAccuracy()){
    projectComparisonMap();  
	  addPopMap();
	  addScarcityMap();  	
  }
}

function listenSlider(dataType){
    var endYear = 2100;
    if(dataType == 'newData'){
      endYear = 2000;      
    }
    grSlider = $('#popGrowthRateSlider').slider();
    grSlider.slider({
      value: 1,//initial value
      orientation: "horizontal",
      min: 1,
      max: 5,
      step: 1,
      animate: 'fast',
      stop: function( event, ui ) {
        if(workingMode){
            addImgToMaps();
        }
      },
      slide: function( event, ui ) {
        $("#popGrowthRateText").text('Growth Rate: ' + ui.value + '%');
        growthRate = ui.value;
      },
      change: function( event, ui ) {
        $("#popGrowthRateText").text('Growth Rate: ' + ui.value + '%');
        growthRate = ui.value;
      }
    });


    tSlider = $('#timeZoneSlider').slider();
    tSlider.slider({
      value: 1960,//initial value
      orientation: "horizontal",
      min: 1960,
      max: endYear,
      step: 5,
      stop: function( event, ui ) {
          if(workingMode){
            addImgToMaps();
          }
      },
      slide: function(event, ui) {
          var YEARTYPEcb = document.getElementById("YEARTYPECombo");  
          var curYEARTYPE = YEARTYPEcb.options[YEARTYPEcb.selectedIndex].value;
          if(curYEARTYPE == 'By Year') {
            // tSlider.slider('enable');
            $("#timeZoneText").text( 'Year: ' + ui.value);
          }
          else{
            // tSlider.slider('disable');
            $("#timeZoneText").text( 'Year: ' + ui.value + ' (Only Valid for Water Demand Data)');
          }
          waterYVal = ui.value;
      },
      change: function( event, ui ) {
          var YEARTYPEcb = document.getElementById("YEARTYPECombo");  
          var curYEARTYPE = YEARTYPEcb.options[YEARTYPEcb.selectedIndex].value;
          if(curYEARTYPE == 'By Year') {
            // tSlider.slider('enable');
             $("#timeZoneText").text( 'Year: ' + ui.value);
          }
          else{
            // tSlider.slider('disable');
            $("#timeZoneText").text( 'Year: ' + ui.value + ' (Only Valid for Water Demand Data)');
          }
          // $("#timeZoneText").text('Year: ' + ui.value);
          waterYVal = ui.value;
      }
    });
}


function listenComboBox(){
    $('#EXPCombo').on('change', function(e){
        if(workingMode){
            addImgToMaps();
        }

    });

    $('#GCMCombo').on('change', function(e){
        if(workingMode){
            addImgToMaps();
        }           
    });

    $('#GCMCombo').on('mousedown', function(e){
        var rcm = $('#RCMCombo').val();
        var gcmHandler = document.getElementById('GCMCombo');
        // recover all text color
        for(var i=0; i<gcmHandler.options.length; i++){
            gcmHandler.options[i].style.backgroundColor = 'white';
            var gcm = gcmHandler.options[i].value;
            var curDataType = $('input[name="switch"]:checked').val();
            var curGCMRCM = null;
            if(curDataType == 'newData'){
                curGCMRCM = newGCMRCM;
            }
            else{
                curGCMRCM = oldGCMRCM;
            }
            if(curGCMRCM.indexOf(gcm+'_'+rcm)>-1){
                gcmHandler.options[i].style.backgroundColor = '#99d8c9';
            }
        }
    });

    $('#RCMCombo').on('change', function(e){
        if(workingMode){
            addImgToMaps();
        }            
    });

    $('#RCMCombo').on('mousedown', function(e){
        var gcm = $('#GCMCombo').val();
        var rcmHandler = document.getElementById('RCMCombo');
        // recover all text color
        for(var i=0; i<rcmHandler.options.length; i++){
            rcmHandler.options[i].style.backgroundColor = 'white';
            var rcm = rcmHandler.options[i].value;
            var curDataType = $('input[name="switch"]:checked').val();
            var curGCMRCM = null;
            if(curDataType == 'newData'){
                curGCMRCM = newGCMRCM;
            }
            else{
                curGCMRCM = oldGCMRCM;
            }
            if(curGCMRCM.indexOf(gcm+'_'+rcm)>-1){
                rcmHandler.options[i].style.backgroundColor = '#99d8c9';
            }
        }
    });

    $('#VARCombo').on('change', function(e){
        if(workingMode){
            addImgToMaps();
        }
    });
 
    $('#YEARTYPECombo').on('change', function(e){
        // addComparisonMap();
        var YEARTYPEcb = document.getElementById("YEARTYPECombo");  
        var curYEARTYPE = YEARTYPEcb.options[YEARTYPEcb.selectedIndex].value;
        console.log('year type changed!');
        if(curYEARTYPE == 'By Year') {
          // tSlider.slider('enable');
          if($("#timeZoneText").text().indexOf('Only Valid for Water Demand Data')>-1)
            $("#timeZoneText").text( $("#timeZoneText").text().replace(' (Only Valid for Water Demand Data)', ''));
        }
        else{
          // tSlider.slider('disable');
          if($("#timeZoneText").text().indexOf('Only Valid for Water Demand Data')<=-1)
            $("#timeZoneText").text( $("#timeZoneText").text() + ' (Only Valid for Water Demand Data)');
        }
        if(workingMode){
            console.log('preparing the overlay...');
            addImgToMaps();
        }
    });  

    $('#POPCombo').on('change', function(e){
      // addComparisonMap();
      // addPopMap();
        var POPcb = document.getElementById("POPCombo");  
        var curPOP = POPcb.options[POPcb.selectedIndex].value;
        if(curPOP == popEXPText) {
          grSlider.slider('enable');
        }
        else{
          grSlider.slider('disable');
        }
        if(workingMode){
            addImgToMaps();
        }
    });

}



function checkModelAccuracy(){
    var accurate = false;
    var gcmrcm = $('#GCMCombo')[0].value + '_' + $('#RCMCombo')[0].value;
    // check gcm&rcm parameters
	  if(oldGCMRCM.indexOf(gcmrcm)>-1 && $('input[name="switch"]:checked').val()=='oldData'){
        accurate = true;
    }
    else if(newGCMRCM.indexOf(gcmrcm)>-1 && $('input[name="switch"]:checked').val()=='newData'){
          accurate = true;
    }
    else{
        var str = 'The current combination of global climate model and regional climate model ' + gcmrcm + ' is not suppoted!';
        makeDialog(str);
        return false;        
    }
    // check exp parameters
    if($('#EXPCombo').val().indexOf('Historical') > -1 && waterYVal>2005){
      var str = "Emission type can only be Higher Emission or Lower Emission for selected years.";
      makeDialog(str);
      return false;        
    }
    else if($('#EXPCombo').val().indexOf('Historical') < 0 && waterYVal<=2005){
      var str = "Emission type can only be Historical for selected years." + waterYVal + " " + $('#EXPCombo').val();
      makeDialog(str);
      return false;        
    }
    else{
      accurate = true;
    }
    // var POPcb = document.getElementById("POPCombo");  
    var curPOP = $('#POPCombo').val();//POPcb.options[POPcb.selectedIndex].value;
    if(curPOP == popEXPText) {
      // console.log('trying to set false');
      $('#popGrowthRateSlider').slider( "option", "disabled", false );
      // console.log( $('#popGrowthRateSlider'));
    }
    else{
      // console.log('trying to set true');
      $('#popGrowthRateSlider').slider( "option", "disabled", true );
    }
    return accurate;
}

function changeData(value){
  // reload the selection boxes and the time slider due to different parameters of the new data
    LoadParamsOptions(value);
    listenSlider(value);
    if(workingMode){
      // redraw the scarcity from initial parameters
        addImgToMaps();
    }
}

function listenRadioButton(){
   $('input[type=radio][name=switch]').change(function() {
        console.log(this.value);
        changeData(this.value);
  });
   $('input[type=radio][name=demandSwitch]').change(function() {
        changeDemandData(this.value);
  });   
}

function changeDemandData(value){
    if(value == "gcamData"){
      gcamDemandSwitch = true;
      popMap.dragging.disable();
      popMap.doubleClickZoom.disable();
      popMap.scrollWheelZoom.disable();
      $('#timeZoneSlider').slider( "option", "disabled", true );
      document.getElementById('blurringlayer').style.display = 'block';
      $('#populationDemand').hide();
      $('#gcamDemand').show();
      // var containerElement = document.getElementById('popMap');
      // var overlayEle = document.getElementById('blurringlayer');
      // overlayEle.style.display = 'inline-block';
      // containerElement.setAttribute('class', 'blur');
    }
    else{
      gcamDemandSwitch = false;
      popMap.dragging.enable();
      popMap.doubleClickZoom.enable();
      popMap.scrollWheelZoom.enable();
      $('#timeZoneSlider').slider( "option", "disabled", false );
      document.getElementById('blurringlayer').style.display = 'none';
      $('#populationDemand').show();
      $('#gcamDemand').hide();
      // var containerElement = document.getElementById('popMap');
      // var overlayEle = document.getElementById('blurringlayer');
      // overlayEle.style.display = 'none';
      // containerElement.setAttribute('class', 'normalPop');
    }
}

function makeDialog(str){
    BootstrapDialog.show({
        title: 'Information',
        message: '<i>' + str + '</i>',
        buttons: [{
            id: 'btn-ok',   
            icon: 'glyphicon glyphicon-check',       
            label: 'Close',
            cssClass: 'btn-primary', 
            autospin: false,
            action: function(dialogRef){    
                dialogRef.close();
            }
        }]
    });  
}

function requestScarcityMap(){
 
}

function drawPolygon(){
  ///////////////////////////////////////////////////////////////
  var drawItems = new L.FeatureGroup();
  // drawItems.options.invert = true;
  popMap.addLayer(drawItems);
  popMap.addControl(new L.Control.Draw({
    edit: {featureGroup: drawItems}
  }));
  popMap.on('draw:created', function(event) {
        var layer = event.layer;
        drawItems.addLayer(layer);
        console.log(drawItems);
        console.log(layer);
  });
}


function lockInputParameters(parent, selections, sliders){
  for(var i=0; i<selections.length; i++){
    document.getElementById(selections[i]).disabled = true;
  }
  for(var i=0; i<sliders.length; i++){
    $( '#'+sliders[i] ).slider( "option", "disabled", true );
  }
  for(var i=0; i<parent.length; i++){
    document.getElementById(parent[i]).title = "Please Wait. Your request is being processed.";
  }
}

function unlockInputParameters(parent, selections, sliders){
  for(var i=0; i<selections.length; i++){
    document.getElementById(selections[i]).disabled = false;
  }
  for(var i=0; i<sliders.length; i++){
    $( '#'+sliders[i] ).slider( "option", "disabled", false );
  }
  for(var i=0; i<parent.length; i++){
    document.getElementById(parent[i]).title = "Your request is finished.";
  } 
}
