function createMatrix(){
	// var matrixInitialData = [];
	imgSrcSet=[];
	$('#matrixContainer').html(null);
	var matrixWidth = $('#matrixContainer').width();
	var matrixHeight = $('#matrixContainer').height();
	var bgsrc = imageGenerator(null, null);

	var matrixDiv = d3.select('#matrixContainer');
	var	matrixSvg = matrixDiv.append('svg')
					.attr('width', matrixWidth)
					.attr('height', matrixHeight);

	// to minus 60 is for two lines of y text parts
	var gridWidth = matrixWidth/(YEAR.length+2);
	// to minus 30 is for the x text parts
	var gridHeight = matrixHeight/(exp.length*gcm_rcmCombination_fake.length+1);
	var gridMinUnit = Math.min(gridWidth, gridHeight);
	console.log(matrixWidth, matrixHeight, gridWidth, gridHeight);

	for(var y=0; y<exp.length*gcm_rcmCombination_fake.length; y++){
		var src = [];
		for(var x=0; x<YEAR.length; x++){//push each line's bg image
			src.push(bgsrc);
		}
		imgSrcSet.push(src);//finish the xth line
	}
	// matrixInitialData = imgSrc;
	// console.log(imgSrc);

	var xText = YEAR;

	var xTextSvg = matrixSvg.selectAll('#matrixContainer')
			.data(xText)
	    	.enter()
			.append('svg:g')
			.append('text')			
			.attr('x', gridMinUnit*2.0)	
			.attr('y', 0)		 
			.attr('dx', '0.5em')
			.attr('dy', '-0.5em')
		    .text(function(d, i) {return xText[i];})
		    .style('font-size', matrixWidth/150+'px')
		    .attr('transform', function(d, i) {
					return 'translate(' + gridMinUnit * (i) + ', ' + gridMinUnit + ')';
			});	

	var y1Text = exp;
	var textY1Grp = matrixSvg.selectAll('#matrixContainer')
			.data(y1Text)
			.enter()
			.append('svg:g')
			.append('text')
			.attr('x', gridMinUnit)
			.attr('y', gridMinUnit)
			.text(function(d, i) {return y1Text[i];})
			.style('font-size', matrixHeight/50+'px')
			.attr('transform', function(d, i) {
					return 'translate(' + gridMinUnit + ','  + gridMinUnit*i*5 +') rotate(90)';
			});

	var y2Text = [];
	for(var i=0; i<exp.length; i++){
		for(var j=0; j<gcm_rcmCombination_fake.length; j++){
			y2Text.push(gcm_rcmCombination_fake[j]);
		}
	};
	var textY2Grp = matrixSvg.selectAll('#matrixContainer')
			.data(y2Text)
			.enter()
			.append('svg:g')
			.append('text')
			.attr('x', gridMinUnit)
			.attr('y', gridMinUnit)
			.text(function(d, i) {return y2Text[i];})
			.style('font-size', matrixHeight/150+'px')
			.attr('transform', function(d, i) {
					return 'translate(' + gridMinUnit*2 + ','  + gridMinUnit*i +') rotate(90)';
			});


	var grp = matrixSvg.selectAll('#matrixContainer')
		.data(imgSrcSet)
	    .enter()
	    .append('svg:g')
	    .attr('x', gridMinUnit*2)
	    .attr('y', gridMinUnit)
	    .attr('id', function(d, i) {return 'rowMatrix'+i})
	    .attr('transform', function(d, i) {
	        return 'translate(' + 0 + ', ' +Math.floor(gridMinUnit * (i+1)) + ')';
	    });

	grp.selectAll('rect')
	    .data(function(d) { return d; })
	    .enter()
	    .append('svg:image')
	    	.attr('id', function(d, i) { return 'grid'+i; })
	        .attr('x', function(d, i) { return gridMinUnit*(i+2); })
	        .attr('width', gridMinUnit*0.9)
	        .attr('height', gridMinUnit*0.9)
	    	.attr('xlink:href', bgsrc);	
}

function updateMatrix(imgsrc, fName){

	if(!imgsrc || !fName){
		console.log("create!");
       	createMatrix();
    }
    else{
			var parsedName = fName.split("_");
		// for(var i=0; i<parsedName.length; i++){
			// get the gcm/rcm value in the parsedName
			var expVal = parsedName[0];
			var gcmrcmVal = parsedName[1] + '_' + parsedName[2];
			var varVal = parsedName[3];
			var yearVal = parsedName[4];
			
			var expIndex = exp.indexOf(expVal)
			var gcmrcmIndex = gcm_rcmCombination.indexOf(gcmrcmVal);
			var yearIndex = YEAR.indexOf(yearVal);
			// console.log(yearVal, yearIndex);

			if(expIndex!=-1 && gcmrcmIndex!=-1 && yearIndex!=-1){
				// bind the source link to the grid svg
	    		updateGrid(imgsrc, expIndex, gcmrcmIndex, yearIndex);				
			}
		// }
    }


}

function updateGrid(imgsrc, expIndex, gcmrcmIndex, yearIndex){
	var yIndex = expIndex*gcm_rcmCombination.length+gcmrcmIndex;
	var curGrid = d3.select('#rowMatrix'+yIndex).selectAll('#grid'+yearIndex).attr("style", "outline: thin solid gray;");
	// bind the image source link
	curGrid.attr('xlink:href', imgsrc)
	.on({
          "mouseover": function() { /* do stuff for future use*/ },
          "mouseout":  function() { /* do stuff for future use */ }, 
          "click":  function() {
          	// create the click event that would update the high resolutiion map for response
          	for(var i=0; i<YEAR.length; i++){
				for(var j=0; j<gcm_rcmCombination.length*exp.length; j++){
					var curGridEach = d3.select('#rowMatrix'+j).selectAll('#grid'+i);
					curGridEach.attr("style", "outline: thin solid gray;");
				}
			}
          	curGrid.attr("style", "outline: thin solid red;");
       	  }, 
        });;	
}
