function addSelectOptions(){
}

function listenSelect(mapHandlerList){
  // console.log('before pop', mapHandlerList);
  addContent(popOptions, "popSelect");

	$('#popSelect').on('change', {mapHandlers: mapHandlerList}, function(event){
		    var POPcb = document.getElementById("popSelect");  
        var curPOP = POPcb.options[POPcb.selectedIndex].value;
        if(curPOP != 'Shared Social Path') {
          growthSlider.slider('enable');
          growthRate = growthSlider.slider( "value" );
          $("#popGrwothText").text('Growth Rate: ' + growthRate + '%');
          sendOriginsRequest();
          requestUncertainties(event.data.mapHandlers);
        }
        else{
          growthSlider.slider('disable');
          growthRate = null;
          $("#popGrwothText").text('Growth Rate: ' + growthRate);
          sendOriginsRequest();
          requestUncertainties(event.data.mapHandlers);
        }
	});

  addContent(scenarioOptions, "scenarioSelect");
  

	$('#scenarioSelect').on('change', {mapHandlers: mapHandlerList}, function(event){
      sendOriginsRequest();
		 requestUncertainties(event.data.mapHandlers);
	});

  addContent(emissionOptions, "emissionSelect");

	$('#emissionSelect').on('change', {mapHandlers: mapHandlerList}, function(event){
    sendOriginsRequest();
 		requestUncertainties(event.data.mapHandlers);
	});

}

function addContent(data, curComboName){
	var curID = document.getElementById(curComboName);
	// clear the previous context
	curID.options.length = 0;

	// access each memeber of the array and add them to the option box
	data.forEach(function(entry){
		var curOption = document.createElement("option");
		curOption.text = curOption.value = entry;
        curID.add(curOption, 0);
	});

	// set the default value of the option box
	$('#'+curComboName).val(curID.options[0].value).change();
}

function addSlider(mapHandlerList){
    growthSlider = $('#popGrwothSlider').slider();
    growthSlider.slider({
      value: 1,//initial value
      orientation: "horizontal",
      min: 1,
      max: 5,
      step: 1,
      animate: 'fast',
      stop: function( event, ui ) {
        // if(workingMode){
          // console.log('add growth rate slider stop event: ' , mapHandlerList);
            sendOriginsRequest();
            requestUncertainties(mapHandlerList);
        // }
      },
      slide: function( event, ui ) {
        $("#popGrwothText").text('Growth Rate: ' + ui.value + '%');
        growthRate = ui.value;
      },
      change: function( event, ui ) {
        $("#popGrwothText").text('Growth Rate: ' + ui.value + '%');
        growthRate = ui.value;
      }
    });

    yearSlider = $('#popYearSlider').slider();
    yearSlider.slider({
      value: 2010,//initial value
      orientation: "horizontal",
      min: 2010,
      max: 2100,
      step: 5,
      stop: function( event, ui ) {
        // console.log('add year slider stop event: ' , mapHandlerList);
          yearVal = ui.value;
          sendOriginsRequest();
          requestUncertainties(mapHandlerList);
      },
      slide: function(event, ui) {
          $("#popTimeText").text('Year: ' + ui.value);
          yearVal = ui.value;
      },
      change: function( event, ui ) {
          $("#popTimeText").text('Year: ' + ui.value);
          yearVal = ui.value;
      }
    });
}


// function requestUncertainties(mapHandlerList){
//   sendUncertainRequest(mapHandlerList);
//   // mapHandlerList.forEach(function(element, index, array){
//   // 	if(index == 1){
//   // 	  	sendUncertainRequest(element.renderingType, element.mapHandler, element.mapOverlayObj, function(output){
//   // 	        element.mapOverlayObj.overlay = output;
//   // 	      });		
//   // 	}
//   // })
// }

function loadingImageLayer(filePath, map){
    var halflatDistance = (map.getBounds().getSouthWest().lat - map.getBounds().getNorthEast().lat)/16.0;
    var halflngDistance = (map.getBounds().getNorthEast().lng - map.getBounds().getSouthWest().lng)/16.0;
    var halfDistance = Math.min(halflatDistance, halflngDistance);
    var imageBounds = [[map.getCenter().lat - halfDistance,map.getCenter().lng - halfDistance], 
                        [map.getCenter().lat + halfDistance, map.getCenter().lng + halfDistance]];
    var loadingLayer = L.imageOverlay(filePath, imageBounds).addTo(map);
    return loadingLayer;
}

