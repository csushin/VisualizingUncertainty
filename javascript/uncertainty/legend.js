function createMatrix(divName, rowNumber, colNumber, colorTable, xTexts, yTextxs, mapHandlerList, mapIndex){
	$('#'+divName).empty();
	// var mainContainer = document.getElementById("mainContainer");
	// var height = mainContainer.style.height.replace('px', '');
 //    var width = mainContainer.style.width.replace('px', '');
 //    var matrixLength = Math.min(height, width);
 //    console.log(height, width, matrixLength);
 	var legendZoneDiv = document.getElementById(divName);
 	// console.log('legend div name: ', divName);
 	var height = $('#'+divName).height();
 	// console.log('height: ', height);
 	var width = $('#'+divName).width();
 	// console.log('width: ', width);
 	var matrixLength = Math.min(height, width);
 	if(divName.indexOf('agree')>-1){
	 	var matrixWidth = matrixLength;
		var matrixHeight = matrixLength;		
 	}
 	else{
 	 	var matrixWidth = width;
		var matrixHeight = height;			
 	}

	var matrixDiv = d3.select('#'+divName);
	// append the whole big svg as the matrix
	var	matrixSvg = matrixDiv.append('svg')
					.attr('width', matrixWidth)
					.attr('height', matrixHeight)
					.on('mouseout', function(){
						// var styleName = 'nr_wuncertainty_agree';
						// changeStyle(styleName);
						// console.log('svg mouse out!');
					});

	var gridWidth = matrixWidth*0.8/colNumber;
	var gridHeight = matrixHeight*0.8/rowNumber;
	var data = [];
	for (var k = 0; k < rowNumber; k ++) {
    	data.push(d3.range(rowNumber*k, colNumber*(k+1)));
	}
	// console.log(data);

	
	// append the x axis for the matrix, and the location of each text is set by hand 

	var xTextSvg = matrixSvg.selectAll('#'+divName)
			.data(xTexts)
	    	.enter()
			.append('svg:g')
			.append('text')			
		    .text(function(d, i) {return xTexts[i];})
		    .attr('transform', function(d, i) {
		    	var xoffset = gridWidth*i+gridWidth*0.4;
		    	var yoffset = gridHeight*0.2;
				return 'translate(' + xoffset + ', ' + yoffset + ')';
			});;
		    
	var grp = matrixSvg.selectAll('#'+divName)
		.data(data)
	    .enter()
	    .append('svg:g')
	    .attr('id', function(d, i) {return 'rowMatrix'+i})
	    .attr('transform', function(d, i) {
	    	var yoffset = gridHeight*i+gridHeight*0.2;
	        return 'translate(0, ' + yoffset + ')';
	    })
	    .on('click', function(d, i){
        	// console.log('group data: ' + i);
        	
        	var styleName;
        	if(i == 0){
        		styleName = 'nr_wuncertainty_agree_AbsScar';
        	}
        	else if(i == 1){
        		styleName = 'nr_wuncertainty_agree_Scar';
        	}
        	else if(i == 2){
        		styleName = 'nr_wuncertainty_agree_Stress';
        	}
        	else{
        		styleName = 'nr_wuncertainty_agree_NoStress';
        	}
        	changeStyle(styleName, mapIndex);
        });

	grp.selectAll('rect')
	    .data(function(d) { return d; })
	    .enter()
	    .append('rect')
	    .attr('id', function(d, i) { return 'grid'+i; })
        .attr('x', function(d, i) { return (matrixHeight *0.8/rowNumber) * i; })
        .attr('width', gridWidth*0.95)
        .attr('height', gridHeight*0.95)
        .attr('fill', function(d, i) {
        	return colorTable[d];
        });

	var textYGrp = grp.append('text')
					 .attr('dx', '.01em')
					 .text(function(d, i) {return yTextxs[i];})
					 .attr('transform', function(d, i) {
					 	var yoffset = matrixHeight*0.1+i;
					 	var xoffset = gridWidth*colNumber;
					     return 'translate(' + xoffset + ', ' + yoffset +')';
					 });
}

