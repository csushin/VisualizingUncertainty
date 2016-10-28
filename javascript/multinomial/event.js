function baseYearSlider(value){
	console.log("base year value: " + value);
	// document.querySelector('#baseYearVal').value = value;
}

function prdYearSlider(value){
	console.log("prediction year value: " + value);
	// document.querySelector('#predictionYearVal').value = value;
}

function getEvidence(){
	var curIndex = 1;
	var yearChain = "1960,2000";
	var calcType = "evd";
    
	$.ajax({
		url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/calcEvidence?callback=?',
		// url: 'http://localhost:8080/waterDemo/services/calcEvidence?callback=?',
	    dataType: 'jsonp',
	    data: {
	      yearChain: yearChain,
	      yearIndex: curIndex
	    },
	    error: function(){
	      console.log('Error occurs in calculating evidence!');
	    },
	    success: function(data){
	      if(data){
	      	drawMNProbability(yearChain, "evd", curIndex);
	      }else{
	      	console.log("Error in saving the probability data.");	
	      }
	    }
	});
}

function submitBasePrdChange(){
	var baseDemandfName = "density_EXP_1pct_1960.tif";
	var prdDemandfName = "density_EXP_1pct_1965.tif";
	var curIndex = 1;
	var yearChain = "1960,1965";
	var calcType = "predJoint";
    
	$.ajax({
		url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/calcMultinomial?callback=?',
	    dataType: 'jsonp',
	    data: {
	      baseDemandfName : baseDemandfName,
	      prdDemandfName: prdDemandfName,
	      yearChain: yearChain,
	      yearIndex: curIndex,
	      calctype: calcType
	    },
	    error: function(){
	      console.log('Error occurs in calculating prior!');
	    },
	    success: function(data){
	      if(data){
	      	drawMNProbability(yearChain, calcType, curIndex);
	      }else{
	      	console.log("Error in saving the probability data.");	
	      }
	    }
	});
}

function drawMNProbability(yearChain, calctype, curYearIndex){
	var zoomLevel = map.getZoom();
	var mapPixelOrigin = map.getPixelOrigin().x + "," + map.getPixelOrigin().y;
	var binSize = 0.2;
	$.ajax({
		url: "https://watersvr.dtn.asu.edu:8443/waterDemo/services/drawMNProbability?callback=?",
		// url: "http://localhost:8080/waterDemo/services/drawMNProbability?callback=?",
	    dataType: "jsonp",
	    data:{
	    	yearChain: yearChain,
	    	yearIndex: curYearIndex,
	    	calctype: calctype,
	    	tfFunction: tfFunction,
	    	mapPixelOrigin: mapPixelOrigin,
	    	zoomLevel: zoomLevel,
	    	binSize: binSize
	    },
	    error: function(){
	    	console.log("Error in drawing MN probability");
	    },
	    success: function(data){
	    	var imgSrc = "data:image/png;base64," + data.imgStr;
	    	if(mapOverlay)
	    		map.removeLayer(mapOverlay);
	    	mapOverlay = L.imageOverlay(imgSrc, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(map);
	    }
	});
}

function drawLegend(divName){
	var legendLength = tfFunction.split("|").length;
	document.getElementById(divName).style.padding = "0px 0px 0px 0px";
	for(var i=0; i<legendLength; i++){
		var div = document.createElement("div");
		div.style.width = 100/legendLength + "%";
		div.style.height = "100%";
		div.style.background = "rgb(" + tfFunction.split("|")[i] + ")";
		div.style.float = "left";
		div.innerHTML = "<h3>" + (0.2*(i+1)).toFixed(1) + "</h3>";
		div.style.textAlign = "center";
		div.style.verticalAlign = "middle";
		div.style.fontSize  = "small";
		div.style.color  = "white";
		document.getElementById(divName).appendChild(div);
	}
}