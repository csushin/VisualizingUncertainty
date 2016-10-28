function sendOriginsRequest(){
	var scenario = $('#scenarioSelect').val();
	var emission = $('#emissionSelect').val();
	var pop = $('#popSelect').val();
	pop = popRealVals[popOptions.indexOf(pop)];
	scenario = scenarioRealVals[scenarioOptions.indexOf(scenario)];
	emission = emissionRealVals[emissionOptions.indexOf(emission)];
	if(pop==null || scenario == null || emission == null){
		console.log('initializing select box error!');
	}
	else{

		var demandFileName;
		if(pop==popRealVals[0])
			demandFileName = 'density_' + pop + '_' + growthRate + 'pct_' + yearVal + '.tif';
		else
			demandFileName = 'density_' + pop + '_'  + yearVal + '.tif';
		for(var i=0; i<xText.length; i++){
			var supplyname = emission + '_' + xText[i] + '_BW_' + scenario + '.tif';
			// console.log(supplyname);
			$.ajax({
		      url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/getScarcityPoints?callback=?',
		      dataType: "jsonp",
		      data: {message: "requestScarcity",
		            supplyfName: supplyname,
		            supplySubDir: emission,
		            demandfName: demandFileName,
		            resolution: "low"},
		      error: function(){
		        alert("Error in trying to get the Scarcity data!");
		      },
		      success: function(data){
		        var imgsrc = fastGenerator(data, false, 'scarcity');        
		        var splitedName = data.supplyName.split('_');
		        // console.log(splitedName[1]+'_'+splitedName[2]);
		        updateOrigins(splitedName[1]+'_'+splitedName[2], imgsrc);
		      }
	    	});  
		}
	}
}

function updateOrigins(ModelName, imgsrc){
	var imgID = xText.indexOf(ModelName);
	var textGrid = d3.select('#text_'+ModelName)
	var imgGrid = d3.select('#image_'+ModelName);
	imgGrid.attr('xlink:href', imgsrc);
	// bind the image source link
	textGrid.on({
		 "mouseover": function() { 
          		if(!document.body.style.height.replace('px', '') < 360 || 
          			!document.body.style.width.replace('px', '') < 720)
				{   
					var shorcutDivWidth = $('#scarcityShortcuts').width();
				    var shortcutDivHeight = $('#scarcityShortcuts').height();
	          		document.getElementById('ModelShortcuts'+imgID).style.zIndex  = '100';
 		          	d3.select('#text_'+ModelName)
		          		.attr('fill', 'red');
		          	$('#ModelShortcuts'+imgID).css('width', '720px');
		          	$('#ModelShortcuts'+imgID).css('height', '360px');

		          	d3.select('#image_'+ModelName)
		          		.transition()
		          		.duration(1000)
		          		.attr('height', 360)
		          		.attr('width', 720); 
	          	}
          },
          "mouseout":  function() { 
          		if(!document.body.style.height.replace('px', '') < 360 || 
          			!document.body.style.width.replace('px', '') < 720)
				{ 
					var shortcutDivWidth = $('#scarcityShortcuts').width();
	          		var shortcutDivHeight = $('#scarcityShortcuts').height()/5.0;
	          		document.getElementById('ModelShortcuts'+imgID).style.zIndex  = '0';
	          		d3.select('#text_'+ModelName)
		          		.attr('fill', 'black');
		          	$('#ModelShortcuts'+imgID).animate({
	          			height: shortcutDivHeight, 
	          			width: shortcutDivWidth
	          		}, {
          				duration: 500,
          				queue: false
          			});

		          	d3.select('#image_'+ModelName)
		          		.transition()
		          		.duration(500)
		          		.attr('height', shortcutDivHeight*0.9)
		          		.attr('width', shortcutDivWidth);
	          	}
          },
          "click":  function() {  /*do stuff here*/ } 
	});
}

function createShortcuts(){
	$('#scarcityShortcuts').empty();
	d3.select('#scarcityShortcuts')
	.selectAll('div')
	.data(d3.range(0, 5))
	.enter()
	.append('div')
	.attr('id', function(d, i){
		return 'ModelShortcuts' + d;
	})
	.attr('class', function(d){
		return 'modelShortcut';
	})
	.style('left', function(d){
		return $('#mapZone').width()*0.98 + 'px';
	})
	.style('top', function(d){
		return d*$('#scarcityShortcuts').height()/5.0 + 'px';
	})
	.style('width', function(d){
		return $('#scarcityShortcuts').width() + 'px';
	})
	.style('height', function(d){
		return $('#scarcityShortcuts').height()/5.0 + 'px';
	})
	// .style('border', '1px solid blue');

	var bgsrc = fastGenerator(null, null);
	for(var i=0; i<5; i++){
		createEachShortcut('ModelShortcuts'+i, bgsrc, xText[i]);
	}
}

function createEachShortcut(divName, defaultSrc, text){
	var textdata = [text];
	var divHeight = $('#'+divName).height();
	var divWidth = $('#'+divName).width();
	var imgHeight = divHeight*0.9;
	var imgWidth = divWidth;
	var textHeight = divHeight - imgHeight;
	var textWidth = divWidth;

	var svgContainer = d3.select('#'+divName).append("svg")
                                     .attr("width", '100%')
                                     .attr("height", '100%');

	var imgSvg = svgContainer.selectAll('#'+divName)
							.data([0])
							.enter()
							.append('svg:image')
							.attr('id', 'image_'+text)
							.attr('xlink:href', defaultSrc)
							.attr('width', imgWidth)
							.attr('height', imgHeight)
							.style('border', '1px solid red');

	var textSvg = svgContainer.selectAll('#'+divName)
			.data(textdata)
	    	.enter()
			.append('text')			
		    .text(function(d, i) {return textdata[i];})
		    .style('font-size', '1.0em')
		    .attr('id', function(d){
		    	return "text_"+textdata;
		    })
		    .attr('transform', function(d, i) {
		    	var xoffset = textWidth*0.25;
		    	var yoffset = divHeight*0.95;
				return 'translate(' + xoffset + ', ' + yoffset + ') ';
			});	
}