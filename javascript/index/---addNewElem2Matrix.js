function addNewElem2Matrix(srcSet, nameSet, type){
    if(!srcSet){
        alert("No Such parameters in the models!");
    }
    else{
		var parsedName = parseGcmRcm(nameSet);
		for(var i=0; i<parsedName.length; i++){
			// get the gcm/rcm value in the parsedName
			var gcm = parsedName[i][1];
			var rcm = parsedName[i][2];
			var gcmIndex = xText.indexOf(gcm);
			// xText/yText here represents the collections of the possible models in the client side
			// for simplification, water grid use -W, and scarcity grid use -S
			if(type == 'water')	rcmIndex = yText.indexOf(rcm+'-W');
			else rcmIndex = yText.indexOf(rcm+'-S');
			// if we do have correct value of each gcm and rcm
			// if(matrixInit == 0){
			// 	var curGridEach = d3.select('#rowMatrix'+0).selectAll('#grid'+0);
			// 	curGridEach.attr("style", "outline: thin solid red;");		
			// 	matrixInit = 1;		
			// }

			if(gcmIndex!=-1 && rcmIndex!=-1){
				// bind the source link to the grid svg
	    		var imgsrc = srcSet[i];
	    		updateMatrix(imgsrc, gcmIndex, rcmIndex);				
			}
		}
		if(type == 'water')	{
			multiWaterSet = [];
			multiWaterfNameSet = [];
			WaterSuccessCount = 0;
		}
		else{
			multiScarcitySet = [];
			multiScarfNameSet = [];
			ScarcitySuccessCount = 0;
		} 
    }
}

function updateMatrix(imageSrc, gcmIndex, rcmIndex){
	// pick out the grid of the matrix by the name and the rule of the name could be known from the process of creating the matrix

	var curGrid = d3.select('#rowMatrix'+rcmIndex).selectAll('#grid'+gcmIndex);
	// bind the image source link
	curGrid.attr('xlink:href', imageSrc)
	.on({
          "mouseover": function() { /* do stuff for future use*/ },
          "mouseout":  function() { /* do stuff for future use */ }, 
          "click":  function() {
          	// create the click event that would update the high resolutiion map for response
          	for(var i=0; i<xText.length; i++){
				for(var j=0; j<yText.length; j++){
					var curGridEach = d3.select('#rowMatrix'+j).selectAll('#grid'+i);
					curGridEach.attr("style", "outline: thin solid white;");
				}
			}
          	curGrid.attr("style", "outline: thin solid red;");
          	var gcm = xText[gcmIndex];
          	var _rcm = yText[rcmIndex].split('-');
          	var __rcm = _rcm[0];
          	var rcm = __rcm;
          	// console.log("gcm " + gcm + ' rcm ' + rcm);
          	$('#GCMCombo').val(gcm);
          	$('#RCMCombo').val(rcm);
          	projectComparisonMap();
      	  }, 
        });;
}


function parseGcmRcm(fName){
	var parsedName = [];
	for(var i=0; i<fName.length; i++){
		var entry = fName[i].split('_');
		parsedName.push(entry);
	}
  	return parsedName;
}