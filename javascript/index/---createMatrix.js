//  as the global variable
var WaterSuccessCount = 0;// count the times of ajax when grabing a batch of water data
var ScarcitySuccessCount = 0;
var xmatrixIndex = 0;
var ymatrixIndex = 0;
// global variables for the set of image source link and full file name set
var multiScarcitySet = [];
var multiWaterSet = [];
var multiWaterfNameSet = [];
var multiScarfNameSet = [];
// collections of the possible models, which should be synchronized as the server side manually
var gcmNum = 5;
var rcmNum = 2;
var gcmParamsSet = ['MPI-ESM-LR', 'EC-EARTH-r3', 'HadGEM2-ES', 'EC-EARTH-r12', 'CNRM-CM5'];
var rcmParamsSet = ['CCLM', 'HIRHAM'];
var xText = ['MPI-ESM-LR', 'EC-EARTH-r3', 'HadGEM2-ES', 'EC-EARTH-r12', 'CNRM-CM5'];
var yText = ['CCLM-W', 'HIRHAM-W'];
// var yText = ['CCLM-W', 'CCLM-S', 'HIRHAM-W', 'HIRHAM-S'];
function createMatrix(){
	var matrixInitialData = [];
	var matrixWidth = $('#imgMatrix').width();
	var matrixHeight = $('#imgMatrix').height();
	var bgsrc = imageGenerator(null, null);
	console.log("matrix attribute: " + matrixWidth + " " + matrixHeight);

	var matrixDiv = d3.select('#imgMatrix');
	// append the whole big svg as the matrix
	var	matrixSvg = matrixDiv.append('svg')
					.attr('width', matrixWidth)
					.attr('height', matrixHeight);
	// var gridWUnit = document.getElementById("imgMatrix").offsetWidth/4;
	// var gridHUnit = document.getElementById("imgMatrix").offsetHeight/4;
	// var gridWidth = gridWUnit -50;
	// var gridHeight = gridHUnit-50;
	var gridWidth = 95;
	var gridHeight = 95;

	// var totalNumOfGrid = gcmNum*rcmNum;
	for(var k=0; k<rcmNum; k++){// 2 is to add both the scarcity and supply map 
		// take the # of gcmNum as 5 and rcmNum as 2
		var src = [bgsrc, bgsrc, bgsrc, bgsrc, bgsrc];// five elements are decided by the # of gcm variables
		matrixInitialData.push(src);
	}

	// append the x axis for the matrix, and the location of each text is set by hand 
	var xTextSvg = matrixSvg.selectAll('#imgMatrix')
			.data(xText)
	    	.enter()
			.append('svg:g')
			.append('text')			
			.attr('x', 30)		 
			.attr('dx', '2em')
		    .text(function(d, i) {return xText[i];})
		    .style('font-size', '12px')
		    .attr('transform', function(d, i) {
					     return 'translate(' + 100 * i + ', 30' +')';
					 });;
		    
	var grp = matrixSvg.selectAll('#imgMatrix')
		.data(matrixInitialData)
	    .enter()
	    .append('svg:g')
	    .attr('x', 40)
	    .attr('y', 40)
	    .attr('id', function(d, i) {return 'rowMatrix'+i})
	    .attr('transform', function(d, i) {
	        return 'translate(40, ' + Math.floor(100 * i + 40) + ')';
	    });

	var textYGrp = grp.append('text')
					 .attr('dx', '.01em')
					 .text(function(d, i) {return yText[i];})
					 .attr('transform', function(d, i) {
					     return 'translate(-20, ' + 10 +') rotate(90)';
					 });

	// For each group, create a set of rectangles and bind 
	// them to the inner array (the inner array is already
	// binded to the group)
	grp.selectAll('rect')
	    .data(function(d) { return d; })
	    .enter()
	    .append('svg:image')
	    	.attr('id', function(d, i) { return 'grid'+i; })
	        .attr('x', function(d, i) { return 100 * i; })
	        .attr('width', gridWidth)
	        .attr('height', gridHeight)
	    	.attr('xlink:href', bgsrc);	


}