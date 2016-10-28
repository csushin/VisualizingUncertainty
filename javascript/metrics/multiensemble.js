// var bivariateTF = ['rgb(77,0,75)','rgb(129,15,124)','rgb(136,65,157)','rgb(140,107,177)','rgb(140,150,198)','rgb(158,188,218)','rgb(191,211,230)','rgb(224,236,244)',
// 					'rgb(103,0,31)','rgb(152,0,67)','rgb(206,18,86)','rgb(231,41,138)','rgb(223,101,176)','rgb(201,148,199)','rgb(212,185,218)','rgb(231,225,239)',
// 					'rgb(102,37,6)','rgb(153,52,4)','rgb(204,76,2)','rgb(236,112,20)','rgb(254,153,41)','rgb(254,196,79)','rgb(254,227,145)','rgb(255,247,188)',
// 					'rgb(103,0,13)', 'rgb(165,15,21)','rgb(203,24,29)','rgb(239,59,44)','rgb(251,106,74)','rgb(252,146,114)','rgb(252,187,161)','rgb(254,224,210)'];
// var bivariateTF = ['rgb(252,251,253)','rgb(239,237,245)','rgb(218,218,235)','rgb(188,189,220)','rgb(158,154,200)','rgb(128,125,186)','rgb(106,81,163)','rgb(74,20,134)',
// 					'rgb(255,255,217)','rgb(237,248,177)','rgb(199,233,180)','rgb(127,205,187)','rgb(65,182,196)','rgb(29,145,192)','rgb(34,94,168)','rgb(12,44,132)',
// 					'rgb(255,255,229)','rgb(255,247,188)','rgb(254,227,145)','rgb(254,196,79)','rgb(254,153,41)','rgb(236,112,20)','rgb(204,76,2)','rgb(140,45,4)',
// 					'rgb(255,247,243)','rgb(253,224,221)','rgb(252,197,192)','rgb(250,159,181)','rgb(247,104,161)','rgb(221,52,151)','rgb(174,1,126)','rgb(122,1,119)'];
var bivariateTF = ['rgb(236,226,240)','rgb(208,209,230)','rgb(166,189,219)','rgb(103,169,207)','rgb(54,144,192)','rgb(2,129,138)','rgb(1,108,89)','rgb(1,70,54)',
					'rgb(236,226,240)','rgb(208,209,230)','rgb(166,189,219)','rgb(103,169,207)','rgb(54,144,192)','rgb(2,129,138)','rgb(1,108,89)','rgb(1,70,54)',
					'rgb(236,226,240)','rgb(208,209,230)','rgb(166,189,219)','rgb(103,169,207)','rgb(54,144,192)','rgb(2,129,138)','rgb(1,108,89)','rgb(1,70,54)',
					'rgb(236,226,240)','rgb(208,209,230)','rgb(166,189,219)','rgb(103,169,207)','rgb(54,144,192)','rgb(2,129,138)','rgb(1,108,89)','rgb(1,70,54)'];
var singleColorTF = ['rgb(236,226,240)','rgb(208,209,230)','rgb(166,189,219)','rgb(103,169,207)','rgb(54,144,192)','rgb(2,129,138)','rgb(1,108,89)','rgb(1,70,54)'];


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////Ensemble Map Rendering//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ensemble map metrics changing listener
function listenMapParamSelector(){
	$('#MultiEnsembleSingleMap_paramDiv_XEnsembleSelector').on('change', function(e){
		// drawEnsembleMapLegend(bivariateTF, "EnsembleMapLegend", 4, 8);
		var metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_XEnsembleSelector').val();
		var metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_XModelSelector').val();
		var _metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_YEnsembleSelector').val();
		var _metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_YModelSelector').val();
		var dataType = $('#MultiEnsembleSingleMap_paramDiv_VariableSelector').val();
		var divName = "MultiEnsembleSingleMap_mapDiv_map1";
		if(marker!=undefined){
			ensembleStatMap.removeLayer(marker)
		}
		var uniformRange = false;
		if( (metricA.replace("Ensemble", "") == _metricB.replace("Time", "")) &&
			(metricB.replace("Time", "") == _metricA.replace("Ensemble", ""))){
			uniformRange = true;
			drawEnsembleMap(_metricA, _metricB, metricA, metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map2");
		}
		drawEnsembleMap(metricA, metricB, _metricA, _metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map1");
	});
	$('#MultiEnsembleSingleMap_paramDiv_XModelSelector').on('change', function(e){
		// drawEnsembleMapLegend(bivariateTF, "EnsembleMapLegend", 4, 8);
		var metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_XEnsembleSelector').val();
		var metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_XModelSelector').val();
		var _metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_YEnsembleSelector').val();
		var _metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_YModelSelector').val();
		var dataType = $('#MultiEnsembleSingleMap_paramDiv_VariableSelector').val();
		var divName = "MultiEnsembleSingleMap_mapDiv_map1";
		if(marker!=undefined){
			ensembleStatMap.removeLayer(marker);
		}
		var uniformRange = false;
		if( (metricA.replace("Ensemble", "") == _metricB.replace("Time", "")) &&
			(metricB.replace("Time", "") == _metricA.replace("Ensemble", ""))){
			uniformRange = true;
			drawEnsembleMap(_metricA, _metricB, metricA, metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map2");
		}
		drawEnsembleMap(metricA, metricB, _metricA, _metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map1");
	});
	$('#MultiEnsembleSingleMap_paramDiv_YEnsembleSelector').on('change', function(e){
		// drawEnsembleMapLegend(bivariateTF, "EnsembleMapLegend", 4, 8);
		var metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_YEnsembleSelector').val();
		var metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_YModelSelector').val();
		var _metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_XEnsembleSelector').val();
		var _metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_XModelSelector').val();
		var dataType = $('#MultiEnsembleSingleMap_paramDiv_VariableSelector').val();
		var divName = "MultiEnsembleSingleMap_mapDiv_map2";
		if(marker!=undefined){
			ensembleStatMap.removeLayer(marker);
		}
		var uniformRange = false;
		if( (metricA.replace("Ensemble", "") == _metricB.replace("Time", "")) &&
			(metricB.replace("Time", "") == _metricA.replace("Ensemble", ""))){
			uniformRange = true;
			drawEnsembleMap(_metricA, _metricB, metricA, metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map1");
		}
		drawEnsembleMap(metricA, metricB, _metricA, _metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map2");
	});
	$('#MultiEnsembleSingleMap_paramDiv_YModelSelector').on('change', function(e){
		// drawEnsembleMapLegend(bivariateTF, "EnsembleMapLegend", 4, 8);
		var metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_YEnsembleSelector').val();
		var metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_YModelSelector').val();
		var _metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_XEnsembleSelector').val();
		var _metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_XModelSelector').val();
		var dataType = $('#MultiEnsembleSingleMap_paramDiv_VariableSelector').val();
		var divName = "MultiEnsembleSingleMap_mapDiv_map2";
		if(marker!=undefined)
			ensembleStatMap.removeLayer(marker)
		var uniformRange = false;
		if( (metricA.replace("Ensemble", "") == _metricB.replace("Time", "")) &&
			(metricB.replace("Time", "") == _metricA.replace("Ensemble", ""))){
			uniformRange = true;
			drawEnsembleMap(_metricA, _metricB, metricA, metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map1");
		}
		drawEnsembleMap(metricA, metricB, _metricA, _metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map2");
	});
	$('#MultiEnsembleSingleMap_paramDiv_VariableSelector').on('change', function(e){
		// drawEnsembleMapLegend(bivariateTF, "EnsembleMapLegend", 4, 8);
		var metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_XEnsembleSelector').val();
		var metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_XModelSelector').val();
		var _metricA = "Ensemble" + $('#MultiEnsembleSingleMap_paramDiv_YEnsembleSelector').val();
		var _metricB = "Time" + $('#MultiEnsembleSingleMap_paramDiv_YModelSelector').val();
		var dataType = $('#MultiEnsembleSingleMap_paramDiv_VariableSelector').val();
		var uniformRange = false;
		if( (metricA.replace("Ensemble", "") == _metricB.replace("Time", "")) &&
			(metricB.replace("Time", "") == _metricA.replace("Ensemble", "")))
			uniformRange = true;
		drawEnsembleMap(metricA, metricB, _metricA, _metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map1");
		drawEnsembleMap(_metricA, _metricB, metricA, metricB, uniformRange, singleColorTF, dataType, "MultiEnsembleSingleMap_mapDiv_map2");
		getEnsembleScatterData();
		if(marker!=undefined)
			ensembleStatMap.removeLayer(marker)
		if(dataType.indexOf("Temperature")>-1){
			var defaultValue  = 0.05;
			$("#PCPRange").text("Range: " + defaultValue);
			$("#PCPRange").css({
		    	fontSize: 15
			});
			var slider = document.getElementById("PCPSlider");
			slider.min = 0;
			slider.max = 20;
			slider.step = 0.01;
			slider.value = defaultValue;
		}
		else if(dataType.indexOf("Precipitation")>-1){
			var defaultValue  = 10;
			$("#PCPRange").text("Range: " + defaultValue);
			$("#PCPRange").css({
		    	fontSize: 15
			});
			var slider = document.getElementById("PCPSlider");
			slider.min = 0;
			slider.max = 100;
			slider.step = 5;
			slider.value = defaultValue;
		}
		else if(dataType.indexOf("Runoff")>-1){
			var defaultValue  = 20;
			$("#PCPRange").text("Range: " + defaultValue);
			$("#PCPRange").css({
		    	fontSize: 15
			});
			var slider = document.getElementById("PCPSlider");
			slider.min = 0;
			slider.max = 1000;
			slider.step = 50;
			slider.value = defaultValue;
		}

	});
}

// Drawing legend for ensemble map
function drawEnsembleMapLegend(tffunction, map, scale, min, max, type, container){
	// d3.select("#"+divname+" svg").remove();
	// var divHeight = $("#"+divname).height();
	// var divWidth = $("#"+divname).width();
	// var legend = d3.select("#"+divname).append("svg:svg")
 //    .attr("width", divWidth)
 //    .attr("height", divHeight);
 //    var cellWidth = divWidth/colorSteps;
 //    var cellHeight = divHeight/colorSquares;
    
 //    legend.selectAll("rect")
 //    .data(tffunction)
 //    .enter()
 //    .append("svg:rect")
 //    .attr("x", function(d, i){
 //    	return cellWidth*(i%parseInt(colorSteps));
 //    })
 //    .attr("y", function(d, i){
 //    	return cellHeight*Math.floor(i/parseInt(colorSteps));
 //    })
 //    .attr("width", cellWidth)
 //    .attr("height", cellHeight)
 //    .style("fill", function(d, i){
 //    	return d;
 //    })
	if(container == "MultiEnsembleSingleMap_mapDiv_map2"){
		if(ensembleStatMapLegend2!=undefined)
			map.removeControl(ensembleStatMapLegend2);
    	ensembleStatMapLegend2 = L.control({position: 'bottomright'});
	}
    else{
    	if(ensembleStatMapLegend!=undefined)
			map.removeControl(ensembleStatMapLegend);
    	ensembleStatMapLegend = L.control({position: 'bottomright'});
    }
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info legend');
        this.update();
        return this._div;
    }
    legend.update = function (props){   
            var labels = [];
            var levels = d3.range(min, max, (max - min)/tffunction.length);
            if(type=='Precipitation'){
                // labels.push('Unit: mm')
            }
            if(type=='TemperatureMin'){
                // labels.push('Unit: F')
            }
            for (var i = 0; i < levels.length; i++) {
                var from = scale.indexOf("true")>-1?Math.exp(levels[i]):levels[i];
                var to = scale.indexOf("true")>-1?Math.exp(levels[i + 1]):levels[i + 1];
      //           if(to <=20 || i == levels.length-1){
 					// labels.push(
	     //                    '<i style="background:' + tffunction[i] + '"></i> ' +
	     //                    from.toFixed(3) + (to.toFixed(3) ? '&ndash;' + to.toFixed(3) : '+'));    
      //           }
      //           else if(to>20 && to <100 ){
 					// labels.push(
	     //                    '<i style="background:' + tffunction[i] + '"></i> ' +
	     //                    from + (to ? '&ndash;' + to : '+'));    
      //           }
      //           else{
	                labels.push(
	                        '<i style="background:' + tffunction[i] + '"></i> ' +
	                        int2roundKMG(from) + (int2roundKMG(to) ? '&ndash;' + int2roundKMG(to) : '+'));                	
                // }

            }
            this._div.innerHTML = labels.join('<br>');
    };        
    legend.addTo(map);
    if(container == "MultiEnsembleSingleMap_mapDiv_map2"){
    	ensembleStatMapLegend2 = legend;
	}
    else{
    	ensembleStatMapLegend = legend;
    }
}

// 1DMapping for Ensemble Map
function drawEnsembleMap(metricA, metricB, _metricA, _metricB, uniformRange, colorTable, dataType, divName){
	var alpha = 200;
	$("<div id='coverEnsembleMap'></div>").css({
	    position: "absolute",
	    width: "100%",
	    height: "100%",
	    top: 0,
	    left: 0,
	    /* black for browsers which cannot support rgba */
  		backgroundColor: "#000",
  		/* 70% opacity for supported browsers */
  		backgroundColor: "rgba(0, 0, 0, 0.6)"
	}).appendTo($("#"+divName).css("position", "relative"));
	var scale = "false";
	if(metricA.indexOf("Mean")>-1 && dataType.indexOf("Precipitation")>-1)
		scale = "true";
	if(dataType.indexOf("Precipitation")>-1 && metricA.indexOf("Std")>-1 && metricB.indexOf("Mean")>-1)
		scale = "true";
	if(dataType.indexOf("Precipitation")>-1 && metricA.indexOf("IQR")>-1 && metricB.indexOf("Mean")>-1)
		scale = "true";
	if(dataType.indexOf("Temperature")>-1 && metricA.indexOf("Mean")>-1 && metricB.indexOf("Std")>-1)
		scale = "true";
	$.ajax({
		url: httpDomain+ "waterDemo/services/getMapData2MultiEnsembleSingleTF?callback=?",
		dataType: "jsonp",
		data:{
			metricA: metricA,
			metricB: metricB,
			_metricA: _metricA,
			_metricB: _metricB,
			dataType: dataType,
			colorTable: colorTable.join("&"),
			zoomLevel: 7,
			uniformRange: uniformRange,
			alpha: alpha,
			scale: scale
		},
		error: function(){
			console.log("error in getting map data");
		},
		success: function(data){
			var imgSrc = "data:image/png;base64," + data.imgStr;
			d3.select("#coverEnsembleMap").remove();
			// if(scale.indexOf("true")>-1){
			// 	data.minmax[0] = Math.exp(data.minmax[0]);
			// 	data.minmax[1] = Math.exp(data.minmax[1]);
			// }
			if(divName == "MultiEnsembleSingleMap_mapDiv_map1"){
				if(ensembleStatMapOverlay)
	    			ensembleStatMap.removeLayer(ensembleStatMapOverlay);
				ensembleStatMapOverlay = L.imageOverlay(imgSrc, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(ensembleStatMap);
				drawEnsembleMapLegend(singleColorTF, ensembleStatMap, scale, data.minmax[0], data.minmax[1], dataType, divName);
			}
			else{
				if(ensembleStatMapOverlay2)
	    			ensembleStatMap2.removeLayer(ensembleStatMapOverlay2);
	    		ensembleStatMapOverlay2 = L.imageOverlay(imgSrc, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(ensembleStatMap2);
	    		drawEnsembleMapLegend(singleColorTF, ensembleStatMap2, scale, data.minmax[0], data.minmax[1], dataType, divName);
			}
	    	
		}
	})
}

//  // 2d mapping for ensemble map
function drawEnsembleMap2D(){
	var xmetricA = "Ensemble" + $("#MultiEnsembleSingleMap_paramDiv_XEnsembleSelector").val();
	var xmetricB = "Time" + $("#MultiEnsembleSingleMap_paramDiv_XModelSelector").val();
	var ymetricA = "Ensemble" + $("#MultiEnsembleSingleMap_paramDiv_YEnsembleSelector").val();
	var ymetricB = "Time" + $("#MultiEnsembleSingleMap_paramDiv_YModelSelector").val();
	var dataType = $("#MultiEnsembleSingleMap_paramDiv_VariableSelector").val();
	var divname = "MultiEnsembleSingleMap_mapDiv";
	var xthresholds = "0.1428,0.2857,0.375,0.4285,0.5714,0.7142,0.8571";
	var ythresholds = "0.25,0.5,0.75";
	$("<div id='coverEnsembleMap'></div>").css({
	    position: "absolute",
	    width: "100%",
	    height: "100%",
	    top: 0,
	    left: 0,
	    /* black for browsers which cannot support rgba */
  		backgroundColor: "#000",
  		 // 70% opacity for supported browsers 
  		backgroundColor: "rgba(0, 0, 0, 0.6)"
	}).appendTo($("#"+divname).css("position", "relative"));
	$.ajax({
		url: httpDomain + "waterDemo/services/getMapData2MultiEnsemble?callback=?",
		dataType: "jsonp",
		data:{
			xmetricA: xmetricA,
			xmetricB: xmetricB,
			ymetricA: ymetricA,
			ymetricB: ymetricB,
			colorTable: bivariateTF.join("&"),
			zoomLevel: 7,
			dataType: dataType,
			xthresholds: xthresholds,
			ythresholds: ythresholds
		},
		error: function(){},
		success: function(data){
			var imgSrc = "data:image/png;base64," + data.imgStr;
			d3.select("#coverEnsembleMap").remove();
	    	if(ensembleStatMapOverlay)
	    		ensembleStatMap.removeLayer(ensembleStatMapOverlay);
	    	ensembleStatMapOverlay = L.imageOverlay(imgSrc, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(ensembleStatMap);
		}
	});
}

// Draw Std to Std Map and it's 2d mapping
function drawEnsembleStdMap(dataType, xmetric, ymetricA, ymetricB){
	var xthresholds = "0.1428,0.2857,0.375,0.4285,0.5714,0.7142,0.8571";
	var ythresholds = "0.25,0.5,0.75";
	var divname = "MultiEnsembleSingleMap_mapDiv";
	$.ajax({
		url: httpDomain + "waterDemo/services/getMapData2MultiEnsembleStd?callback=?",
		dataType: "jsonp",
		data:{
			xmetric: "GlobalStd",
			ymetricA: "EnsembleMean",
			ymetricB: "TimeMean",
			colorTable: bivariateTF.join("&"),
			zoomLevel: 7,
			dataType: globalDataType,
			xthresholds: xthresholds,
			ythresholds: ythresholds
		},
		error: function(){},
		success: function(data){
			// console.log(data);
			var imgSrc = "data:image/png;base64," + data.imgStr;
			$("#"+divname).empty();
			var img = new Image(360, 264);
			img.src = imgSrc;
			img.style.margin = "0 auto";
			$(img).css("background-image", "url('" + imgSrc.replace(/(\r\n|\n|\r)/gm, "") + "')");
			$("#"+divname).append(img);
		}
	});
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////Scatter Plot Rendering//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Scatter plot parameter changing even listener
function listenScatterplotSelector(){
	$("#XMultiEnsembleSinglePlotParamSelector").on('change', function(e){
		if(marker!=undefined && document.querySelector('input[name="EnsembleOrModelScatterPlot"]:checked').value == 0){
			getModelSinglePlotData();
		}
		else{
			getEnsembleScatterData();
		}

	});
	$("#YMultiEnsembleSinglePlotParamSelector").on('change', function(e){
		if(marker!=undefined && document.querySelector('input[name="EnsembleOrModelScatterPlot"]:checked').value == 0){
			getModelSinglePlotData();
		}
		else{
			getEnsembleScatterData();
		}
	});
}

// Get Ensemble Scatter plot data
function getEnsembleScatterData(){
	var divname = "MultiEnsembleSinglePlot";
	$.ajax({
		url: httpDomain + "waterDemo/services/getEnsembleScatterplot?callback=?",
		dataType: "jsonp",
		data:{
			xmetric: $("#XMultiEnsembleSinglePlotParamSelector").val()=="QS"?"QuadraticScore":$("#XMultiEnsembleSinglePlotParamSelector").val(),
			ymetric: $("#YMultiEnsembleSinglePlotParamSelector").val()=="QS"?"QuadraticScore":$("#YMultiEnsembleSinglePlotParamSelector").val(),
			dataType: $('#MultiEnsembleSingleMap_paramDiv_VariableSelector').val()
		},
		error: function(){},
		success: function(data){
			drawEnsembleScatterplot(data, divname, $('#MultiEnsembleSingleMap_paramDiv_VariableSelector').val(), "ensemble");
		}
	});
}

function switch2EnsembleSP(val){
	if(val == 1){
		$("#MultiEnsembleSinglePlot").css("display", "block");
		$("#MultiModelsSinglePlot").css("display", "none");
		// drawEnsembleScatterPlot();
	}
	else{
		$("#MultiModelsSinglePlot").css("display", "block");
		$("#MultiEnsembleSinglePlot").css("display", "none");
		// getModelSinglePlotData();
	}
}



// Ensemble Scatter Plot (Changing colors by rcm/gcm)
function changeEnsembleSPColor(value){
	var color = d3.scale.category10();
	color.domain(d3.range(0, 10, 1));
	var container;
	if(document.querySelector('input[name="EnsembleOrModelScatterPlot"]:checked').value == 0)
		container = "MultiModelsSinglePlot";
	else
		container = "MultiEnsembleSinglePlot";
	d3.select("#" + container + " svg")
	.selectAll("circle")
	.style("fill", function(d, i){
		if(value == 0){
			var gcm = d.split(",")[2].split("_")[0];
			return color(GCM.indexOf(gcm));
		}
		else{
			var rcm = d.split(",")[2].split("_")[1];
			return color(RCM.indexOf(rcm));
		}
	});
	var text = d3.selectAll('text').filter(function(){
		if(d3.select(this).attr('id')!=null)
	  		return d3.select(this).attr('id').substr('Matrix_') !== -1;
	});
	text.style("fill", function(d){
		if(value == 0){
			var gcm = d.split("_")[0];
			return color(GCM.indexOf(gcm));
		}
		else{
			var rcm = d.split("_")[1];
			return color(RCM.indexOf(rcm));
		}		
	})
}

function getModelSinglePlotData(){
	$("#MultiModelsSinglePlot").css("display", "block");
	$("#MultiEnsembleSinglePlot").css("display", "none");
	$("input[name=EnsembleOrModelScatterPlot][value='0']").prop("checked",true);
	var container = "MultiModelsSinglePlot";
	var errorRange = 0;
	var lat = marker.getLatLng().lat;
	var lng = marker.getLatLng().lng;
	$("<div id='coverEnsembleMap'></div>").css({
	    position: "absolute",
	    width: "100%",
	    height: "100%",
	    top: 0,
	    left: 0,
	    /* black for browsers which cannot support rgba */
  		backgroundColor: "#000",
  		 // 70% opacity for supported browsers 
  		backgroundColor: "rgba(0, 0, 0, 0.6)"
	}).appendTo($("#"+container).css("position", "relative"));
	$.ajax({
		url: httpDomain + "waterDemo/services/getEnsembleHistByPoint?callback=?",
			dataType: "jsonp",
			data:{
				lat: lat,
				lng: lng,
				dataType: $("#MultiEnsembleSingleMap_paramDiv_VariableSelector").val(),
				xmetric: $("#XMultiEnsembleSinglePlotParamSelector").val()=="QS"?"QuadraticScore":$("#XMultiEnsembleSinglePlotParamSelector").val(),
				ymetric: $("#YMultiEnsembleSinglePlotParamSelector").val()=="QS"?"QuadraticScore":$("#YMultiEnsembleSinglePlotParamSelector").val(),
				errorRange: errorRange
			},
			error: function(){
				$("#"+container).empty();
				console.log("Error in getModelSinglePlot().");
			},
			success: function(data){
				var xMinmax = [9999999, 0];
				var yMinmax = [9999999, 0];
				var histData = [];
				$("#"+container).empty();
				for(var each in data.values){
					if(xMinmax[0] > data.values[each][0])
						xMinmax[0] = data.values[each][0];
					if(xMinmax[1] < data.values[each][0])
						xMinmax[1] = data.values[each][0];

					if(yMinmax[0] > data.values[each][1])
						yMinmax[0] = data.values[each][1];
					if(yMinmax[1] < data.values[each][1])
						yMinmax[1] = data.values[each][1];

					var temp = [];
					temp[0] = data.values[each][0];
					temp[1] = data.values[each][1];
					temp[2] = each;
					histData.push(temp.join(","));
				}
				if(data.ensembleX < xMinmax[0])
					xMinmax[0] = data.ensembleX;
				if(data.ensembleX > xMinmax[1])
					xMinmax[1] = data.ensembleX;
				if(data.ensembbleY < yMinmax[0])
					yMinmax[0] = data.ensembleY;
				if(data.ensembleY > yMinmax[1])
					yMinmax[1] = data.ensembleY;
				data["xMinmax"] = xMinmax;
				data["yMinmax"] = yMinmax;
				data["histData"] = histData;
				drawEnsembleScatterplot(data, container, $("#YMultiEnsembleSinglePlotParamSelector").val(), "model");
			}
	});
}


// Ensemble Scatter Plot (Rendering)
function drawEnsembleScatterplot(data, divname, type, plotType){
	d3.select("#"+divname+" svg").remove();
	var skewnessTypeX = false;
	var skewnessTypeY = false;
	if($("#XMultiEnsembleSinglePlotParamSelector").val().indexOf("Skewness")>-1)
		skewnessTypeX = true;
	if($("#YMultiEnsembleSinglePlotParamSelector").val().indexOf("Skewness")>-1)
		skewnessTypeY = true;
	var divHeight = $("#"+divname).height();
	var divWidth = $("#"+divname).width();

	var margin = {top: 30, right: 30, bottom: 80, left: 50}
      , width = divWidth - margin.left - margin.right
      , height = divHeight - margin.top - margin.bottom;
  //   if(type.indexOf("Runoff")>-1)
		// margin.left = 80;
    var maxX = data.xMinmax[1];
    var maxY = data.yMinmax[1];
    // var minX = data.xMinmax[0];
    var minX = 0;
    // var minY = data.yMinmax[0];
    var minY = 0;
    if(skewnessTypeX){
    	minX = -2;
    	maxX = 2;
    }
    var minY = 0;
    if(skewnessTypeY){
    	minY = -2;
    	maxY = 2;
    }
    if($("#MultiEnsembleSingleMap_paramDiv_VariableSelector").val().indexOf("Runoff")>-1){
    	minX = data.xMinmax[0];
    	minY = data.yMinmax[0];
    	maxX = data.xMinmax[1];
    	maxY = data.yMinmax[1];
    }
    var x = d3.scale.linear().domain([minX, maxX]).range([0, width]);
    var y = d3.scale.linear().domain([minY, maxY]).range([height, 0]);
    var scatterplot = d3.select("#"+divname).append("svg:svg")
    .attr("width", divWidth)
    .attr("height", divHeight)
    .attr("class", "chart");

    var pointview = scatterplot.append("g")
    .attr("transform", "translate("+margin.left+","+margin.top+")")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "main");

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    pointview.append("g").attr("transform", "translate(0," + height + ")")
    .attr("class", "main axis date")
    .call(xAxis)
    .selectAll("text")
    .text(function(d){ 
    	return d;
    	// if(!skewnessTypeX && $("#YMultiEnsembleSinglePlotParamSelector").val().indexOf("Kurtosis")<0){
    	// 	if(type.indexOf("Runoff")>-1)
    	// 		return int2roundKMG(minX + d/width*(maxX - minX));
    	// 	else
    	// 		return (minX + d/width*(maxX - minX)).toFixed(0);
    	// }
    	// else {
    	// 	if(type.indexOf("Runoff")>-1)
    	// 		return int2roundKMG(d);
    	// 	else
    	// 		return d;
    	// }
    });

    // draw the y axis
    var yAxis = d3.svg.axis()
	.scale(y)
	.orient('left');

    pointview.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis)
	.selectAll("text")
    .text(function(d){ 
    	return d;
    	// if(!skewnessTypeY  && $("#YMultiEnsembleSinglePlotParamSelector").val().indexOf("Kurtosis")<0)
    	// 	return (minY + d/height*(maxY - minY)).toFixed(0);
    	// else
    	// 	return d;
    });;

    var tip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-10, 0])
	  .html(function(d) {
	  	if(d.split(",")[2] == "ensemble"){
	  		return  "<p>Ensemble:</p>" + 
	  				"<p>"+ $("#XMultiEnsembleSinglePlotParamSelector").val() + ": " + d.split(",")[0] + "</p>" + 
      				"<p>"+ $("#YMultiEnsembleSinglePlotParamSelector").val() + ": " + d.split(",")[1] + "</p>";
	  	}
	  	else{
	    	return  "<p>GCM: "+ d.split(",")[2].split("_")[0] + "</p>" + 
	    		"<p>RCM: "+ d.split(",")[2].split("_")[1] + "</p>" +
      			"<p>"+ $("#XMultiEnsembleSinglePlotParamSelector").val() + ": " + d.split(",")[0] + "</p>" + 
      			"<p>"+ $("#YMultiEnsembleSinglePlotParamSelector").val() + ": " + d.split(",")[1] + "</p>";
	  	}
	});

	scatterplot.call(tip);

    var g = pointview.append("svg:g"); 
    
    g.selectAll("circle")
      .data(data.histData)
      .enter().append("svg:circle")
      .attr("cx", function (d,i) { 
        return x(parseFloat(d.split(",")[0])); 
      })
      .attr("cy", function (d,i) { 
        return y(parseFloat(d.split(",")[1])); 
      })
      .attr("r", 4)
      .style("fill", function(d){
      		var color = d3.scale.category10();
			color.domain(d3.range(0, 10, 1));
      	    if(document.querySelector('input[name="sameGCMRCM"]:checked').value == 0){
      	    	var gcm = d.split(",")[2].split("_")[0];
				return color(GCM.indexOf(gcm));
      	    }
  			else{
  				var rcm = d.split(",")[2].split("_")[1];
				return color(RCM.indexOf(rcm));
  			}
      })
      .on('mouseover', function(d){
      	tip.show(d);
      })
   	  .on('mouseout', tip.hide);

      if(plotType == "model"){
		    g.append("svg:polygon")
		    .attr("id", "ensembleStar")
		    .attr("visibility", "visible")
		    .attr("points", CalculateStarPoints(x(parseFloat(data.ensembleX)), y(parseFloat(data.ensembleY)), 5, 10, 5))
		    .style("stroke", "black")
		    .style("fill", "black"); 
		  var xAverage = 0, yAverage = 0;
		  for(var each in data.values){
		  	xAverage += data.values[each][0];
		  	yAverage += data.values[each][1];
		  }
		  xAverage = xAverage/18.0;
		  yAverage = yAverage/18.0;
		  g.append("svg:polygon")
		    .attr("id", "ensembleStarAverage")
		    .attr("visibility", "visible")
		    .attr("points", CalculateStarPoints(x(parseFloat(xAverage)), y(parseFloat(yAverage)), 5, 10, 5))
		    .style("stroke", "black")
		    .style("stroke-dasharray", "4,4")
		    .style("fill", "white"); 
      }

          
    // draw y=ax line
    var line = d3.svg.line()
    	.x(function(d) { return x(d[0]); })
    	.y(function(d) { return y(d[1]); })
    	.interpolate("linear");


    var twoEnds;// = [[minX,minY], [maxX, maxY]];
    if(skewnessTypeY)
    	twoEnds = [[minX, y(0)], [maxX, y(0)]];
    if(skewnessTypeX)
    	twoEnds = [[x(0), minY], [x(0), maxY]];


    var lineGraph = pointview.append("path")
    						.attr("d", line(twoEnds))
    						.attr("stroke", "black")
    						.attr("stroke-width", "black")
    						.attr("fill", "none");



    function CalculateStarPoints(centerX, centerY, arms, outerRadius, innerRadius)
	{
	   var results = "";

	   var angle = Math.PI / arms;

	   for (var i = 0; i < 2 * arms; i++)
	   {
	      // Use outer or inner radius depending on what iteration we are in.
	      var r = (i & 1) == 0 ? outerRadius : innerRadius;
	      
	      var currX = centerX + Math.cos(i * angle) * r;
	      var currY = centerY + Math.sin(i * angle) * r;

	      // Our first time we simply append the coordinates, subsequet times
	      // we append a ", " to distinguish each coordinate pair.
	      if (i == 0)
	      {
	         results = currX + "," + currY;
	      }
	      else
	      {
	         results += ", " + currX + "," + currY;
	      }
	   }

	   return results;
	}
}

// Truncate a number to ind decimal places
function truncNb(Nb, ind) {
  var _nb = Nb * (Math.pow(10,ind));
  _nb = Math.floor(_nb);
  _nb = _nb / (Math.pow(10,ind));
  return _nb;
}

// convert a big number to k,M,G
function int2roundKMG(val) {
  var _str = "";
  if (val >= 1e9)        { _str = truncNb((val/1e9), 1) + 'G';} 
  else if (val >= 1e6) { _str = truncNb((val/1e6), 1) + 'M';} 
  else if (val >= 1e3) { _str = truncNb((val/1e3), 1) + 'K';} 
  else if (val <=10) {_str = val.toFixed(3);}
  else { _str = parseInt(val);}
  return _str;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////Parallel Coordinate Rendering//////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Ensemble map clicking event and grab data at the selected point
function listenMapClick(){
	ensembleStatMap.on("dblclick", function(e){
		var lat = e.latlng.lat,
			lng = e.latlng.lng;
		if(marker == undefined){
			marker = L.marker([lat,lng]);
			marker.addTo(ensembleStatMap);
		}
		else{
			marker.setLatLng([lat,lng]).addTo(ensembleStatMap);
		}
		getModelSinglePlotData();
		getPCPData(lat, lng, $("#PCPSlider").val());
	});
}



// change the range of PCP 
function changePCPRange(range){
	$("#PCPRange").text("Range: " + range);
	$("#PCPRange").css({
    	fontSize: 15
	});
	getPCPData(marker.getLatLng().lat, marker.getLatLng().lng, range);
}

function getPCPData(lat, lng, errorRange){
	var metrics= "Median,Mean,Std,CV,IQR,Skewness";
	$("<div id='coverEnsembleMap'></div>").css({
	    position: "absolute",
	    width: "100%",
	    height: "100%",
	    top: 0,
	    left: 0,
	    /* black for browsers which cannot support rgba */
  		backgroundColor: "#000",
  		 // 70% opacity for supported browsers 
  		backgroundColor: "rgba(0, 0, 0, 0.6)"
	}).appendTo($("#EnsemblePCP").css("position", "relative"));
	$.ajax({
			url: httpDomain + "waterDemo/services/getOtherStatsForSameMean?callback=?",
			dataType: "jsonp",
			data:{
				lat: lat,
				lng: lng,
				dataType: $("#MultiEnsembleSingleMap_paramDiv_VariableSelector").val(),
				srcTypeA: "EnsembleMean",
				srcTypeB: "TimeMean",
				metricList: metrics,
				errorRange: errorRange
				// metricList: "Mean,Median,Skewness,CV,Std,IQR,Entropy,QuadraticScore"
			},
			error: function(){
			},
			success: function(data){
				marker.bindPopup("<p>Ensemble Mean at here is: "+data.selectedValue+"</p>");
				marker.openPopup();
				// console.log(data);
				if(data.selectedValue<=0){
					$("#EnsemblePCP").empty();
				}
				else if(data.distinctIndices.length == 0){
					alert("Only one point during this range for this point.");
					$("#EnsemblePCP").empty();
					d3.select("#MultiEnsembleMatrixMaps svg").remove();
				}
				else{
					var indexAmount = [];
					var metricListNew = metrics.split(",");
					var slicedData = [];
					for(var i=0; i<data.distinctStatsJS["Mean"].length; i++){
						// var temp = [];
						// for(var j=0; j<metricListNew.length; j++){
						// 	temp.push(data.values[metricListNew[j]][i]);
						// }
						// slicedData.push(temp);
						var temp = {}
						for(var j=0; j<metricListNew.length; j++){
							temp[metricListNew[j]] = data.distinctStatsJS[metricListNew[j]][i];
						}
						temp["index"] = data.distinctIndices[i];
						slicedData.push(temp);
						// var key = Object.keys(data.distinctStats)[i];
						indexAmount.push(data.distinctStats[i].amount);
					}
					changePCPTitile(errorRange, data.totalAmount);
					paralleCoordinate = drawEnsemblePCP(slicedData, "EnsemblePCP");
					getMatrixData(data.distinctIndices, indexAmount, slicedData, "TimeMean");
				}
			}
	});
}


function changePCPTitile(errorRange, amount){
	$("#PCPRange").text("Range: " + errorRange);
	$("#PCPRange").css({
    	fontSize: 15
	});
	$("#PCPAmount").text("Total number of the points in the range: " + amount);
	$("#PCPAmount").css({
    	fontSize: 15
	});
}

function drawEnsemblePCP(data, divname){
  	$("#" + divname).empty();
  	var MeanMax = d3.max(data, function(d){return d["Mean"];});
  	var MeanMin = d3.min(data, function(d){return d["Mean"];});
  	var step = (MeanMax - MeanMin )/4.0;
	// linear color scale
	var blue_to_brown = d3.scale.linear()
  	.domain(d3.range(MeanMin, MeanMax, step))
  	.range(['#a6611a','#dfc27d','#80cdc1','#018571'])
  	.interpolate(d3.interpolateLab);

	// interact with this variable from a javascript console
	var pc1;

	// load csv file and create the chart
  	pc1 = d3.parcoords()("#" + divname)
    .data(data)
    // .bundlingStrength(0.15) // set bundling strength
    // .smoothness(0.1)
	// .bundleDimension("Mean")
	.hideAxis(["index"])
    .composite("darker")
    .color(function(d) { 
    	return blue_to_brown(d["Mean"]); 
    })  // quantitative color scale
    .alpha(0.5)
    .rate(5)
    .render()
    .brushMode("1D-axes")  // enable brushing
    // .reorderable()
    .interactive();  // command line mode
    

  var explore_count = 0;
  var exploring = {};
  var explore_start = false;
  pc1.svg
    .selectAll(".dimension")
    .style("cursor", "pointer")
    .on("click", function(d) {
      exploring[d] = d in exploring ? false : true;
      event.preventDefault();
      if (exploring[d]) d3.timer(explore(d,explore_count));
    });

  function explore(dimension,count) {
    if (!explore_start) {
      explore_start = true;
      d3.timer(pc1.brush);
    }
    var speed = (Math.round(Math.random()) ? 1 : -1) * (Math.random()+0.5);
    return function(t) {
      if (!exploring[dimension]) return true;
      var domain = pc1.yscale[dimension].domain();
      var width = (domain[1] - domain[0])/4;

      var center = width*1.5*(1+Math.sin(speed*t/1200)) + domain[0];

      pc1.yscale[dimension].brush.extent([
        d3.max([center-width*0.01, domain[0]-width/400]),  
        d3.min([center+width*1.01, domain[1]+width/100])  
      ])(pc1.g()
          .filter(function(d) {
            return d == dimension;
          })
      );
    };
  };

  	var color_set = d3.scale.linear()
	.range(["#3182bd", "#f33"]);
  	//add hover event
	d3.select("#" + divname + " svg")
	.on("mousemove", function() {
	    var mousePosition = d3.mouse(this);			    
	    highlightLineOnClick(mousePosition, true); //true will also add tooltip
	})
	.on("mouseout", function(){
		cleanTooltip();
		pc1.unhighlight();
	});

	// update color and font weight of chart based on axis selection
	// modified from here: https://syntagmatic.github.io/parallel-coordinates/
	function update_colors(dimension) { 
		// change the fonts to bold
		pc1.svg.selectAll(".dimension")
			.style("font-weight", "normal")
			.filter(function(d) { return d == dimension; })
				.style("font-weight", "bold");

		// change color of lines
		// set domain of color scale
		var values = pc1.data().map(function(d){return parseFloat(d[dimension])}); 
		color_set.domain([d3.min(values), d3.max(values)]);
		
		// change colors for each line
		pc1.color(function(d){return color_set([d[dimension]])}).render();
	};		


	// Add highlight for every line on click
	function getCentroids(data){
		// this function returns centroid points for data. I had to change the source
		// for parallelcoordinates and make compute_centroids public.
		// I assume this should be already somewhere in graph and I don't need to recalculate it
		// but I couldn't find it so I just wrote this for now
		var margins = pc1.margin();
		var graphCentPts = [];
		
		data.forEach(function(d){
			
			var initCenPts = pc1.compute_centroids(d).filter(function(d, i){return i%2==0;});
			
			// move points based on margins
			var cenPts = initCenPts.map(function(d){
				return [d[0] + margins["left"], d[1]+ margins["top"]]; 
			});

			graphCentPts.push(cenPts);
		});

		return graphCentPts;
	}

	function getActiveData(){
		// I'm pretty sure this data is already somewhere in graph
		if (pc1.brushed()!=false) return pc1.brushed();
		return pc1.data();
	}

	function isOnLine(startPt, endPt, testPt, tol){
		// check if test point is close enough to a line
		// between startPt and endPt. close enough means smaller than tolerance
		var x0 = testPt[0];
		var	y0 = testPt[1];
		var x1 = startPt[0];
		var	y1 = startPt[1];
		var x2 = endPt[0];
		var	y2 = endPt[1];
		var Dx = x2 - x1;
		var Dy = y2 - y1;
		var delta = Math.abs(Dy*x0 - Dx*y0 - x1*y2+x2*y1)/Math.sqrt(Math.pow(Dx, 2) + Math.pow(Dy, 2)); 
		//console.log(delta);
		if (delta <= tol) return true;
		return false;
	}

	function findAxes(testPt, cenPts){
		// finds between which two axis the mouse is
		var x = testPt[0];
		var y = testPt[1];

		// make sure it is inside the range of x
		if (cenPts[0][0] > x) return false;
		if (cenPts[cenPts.length-1][0] < x) return false;

		// find between which segment the point is
		for (var i=0; i<cenPts.length; i++){
			if (cenPts[i][0] > x) return i;
		}
	}

	function cleanTooltip(){
		// removes any object under #tooltip is
		pc1.svg.selectAll("#tooltip")
	    	.remove();
	}

	function addTooltip(clicked, clickedCenPts){
		
		// sdd tooltip to multiple clicked lines
	    var clickedDataSet = [];
	    var margins = pc1.margin()

	    // get all the values into a single list
	    // I'm pretty sure there is a better way to write this is Javascript
	    for (var i=0; i<clicked.length; i++){
	    	for (var j=0; j<clickedCenPts[i].length; j++){
	    		var text = d3.values(clicked[i])[j];
	  			// not clean at all!
	  			var x = clickedCenPts[i][j][0] - margins.left;
	  			var y = clickedCenPts[i][j][1] - margins.top;
	  			clickedDataSet.push([x, y, text]);
			}
		};

		// add rectangles
		var fontSize = 14;
		var padding = 2;
		var rectHeight = fontSize + 2 * padding; //based on font size

		pc1.svg.selectAll("rect[id='tooltip']")
	        	.data(clickedDataSet).enter()
	        	.append("rect")
	        	.attr("x", function(d) { 
	        		return d[0] - d[2].toFixed(2).toString().length * 5;
	        	})
				.attr("y", function(d) { 
					return d[1] - rectHeight + 2 * padding; 
				})
				.attr("rx", "2")
				.attr("ry", "2")
				.attr("id", "tooltip")
				.attr("fill", "grey")
				.attr("opacity", 0.9)
				.attr("width", function(d){return d[2].toFixed(2).toString().length * 10;})
				.attr("height", rectHeight);

		// add text on top of rectangle
		pc1.svg.selectAll("text[id='tooltip']")
	    	.data(clickedDataSet).enter()
	    		.append("text")
				.attr("x", function(d) { return d[0];})
				.attr("y", function(d) { return d[1]; })
				.attr("id", "tooltip")
				.attr("fill", "white")
				.attr("text-anchor", "middle")
				.attr("font-size", fontSize)
	        	.text( function (d){ return d[2].toFixed(2);})    
	}

	function getClickedLines(mouseClick){
	    var clicked = [];
	    var clickedCenPts = [];

		// find which data is activated right now
		var activeData = getActiveData();

		// find centriod points
		var graphCentPts = getCentroids(activeData);

	    if (graphCentPts.length==0) return false;

		// find between which axes the point is
	    var axeNum = findAxes(mouseClick, graphCentPts[0]);
	    if (!axeNum) return false;
	    
	    graphCentPts.forEach(function(d, i){
		    if (isOnLine(d[axeNum-1], d[axeNum], mouseClick, 2)){
		    	clicked.push(activeData[i]);
		    	clickedCenPts.push(graphCentPts[i]); // for tooltip
		    }
		});
		
		return [clicked, clickedCenPts]
	}


	function highlightLineOnClick(mouseClick, drawTooltip){
		
		var clicked = [];
	    var clickedCenPts = [];
		
		clickedData = getClickedLines(mouseClick);

		if (clickedData && clickedData[0].length!=0){

			clicked = clickedData[0];
	    	clickedCenPts = clickedData[1];

		    // highlight clicked line
		    pc1.highlight(clicked);
			
			if (drawTooltip){
				// clean if anything is there
				cleanTooltip();
		    	// add tooltip
		    	addTooltip(clicked, clickedCenPts);
			}

		}
	
	}

	return pc1;
}

function getMatrixData(indices, amount, slicedData, sourceDim){
	// if(matrixPath != null){
	// 	ensembleStatMap2.removeLayer(matrixPath);
	// 	matrixPath = null;
	// 	matrixPathArrays = [];
	// }
	if(circles.length != 0){
		circles.forEach(function(d, i){
			ensembleStatMap2.removeLayer(d);
		})
		circles = [];
	}
	$("<div id='coverEnsembleMap'></div>").css({
	    position: "absolute",
	    width: "100%",
	    height: "100%",
	    top: 0,
	    left: 0,
	    /* black for browsers which cannot support rgba */
  		backgroundColor: "#000",
  		 // 70% opacity for supported browsers 
  		backgroundColor: "rgba(0, 0, 0, 0.6)"
	}).appendTo($("#MultiEnsembleMatrixMaps").css("position", "relative"));
	var requestedData = {
		indices: indices.join(","),
		sourceDim: sourceDim,
		dataType: $("#MultiEnsembleSingleMap_paramDiv_VariableSelector").val()
	}
	var request = $.ajax({
		url: httpDomain + "waterDemo/services/getMatrixData/",
		dataType: "json",
		type: "POST",
		data: JSON.stringify(requestedData),
		method: "POST"
	});
	request.done(function(data){
		d3.select("#coverEnsembleMap").remove();
		drawMatrix(data.data, indices, amount, slicedData, "MultiEnsembleMatrixMaps", ensembleStatMap2);
	})
}

function drawMatrix(data, distinctIndices, amount, pcData, container, map){
	d3.select("#"+container + " svg").remove();
	var histHeight = 50;
	var margin = { top: 30, right: 20, bottom: 50, left: histHeight+10 },
          width = $("#"+container).width() - margin.left - margin.right,
          height = $("#"+container).height() - margin.top - margin.bottom,
          gridWidth = width / modelSet.length,
          gridHeight = 0.99*height / distinctIndices.length,
          legendElementWidth = gridWidth*2,
          buckets = 9,
          colors = ['#d53e4f','#f46d43','#fdae61','#fee08b','#ffffbf','#e6f598','#abdda4','#66c2a5','#3288bd'], // alternatively colorbrewer.YlGnBu[9]
          days = distinctIndices,
          times = modelSet;

    var containerGridHeight = 0.99*($("#"+container).parent().height() - margin.top - margin.bottom) / distinctIndices.length;
    gridHeight = containerGridHeight;
    if(gridHeight <= 5){
    	while(gridHeight <= 5){
    		gridHeight = 0.99*height / distinctIndices.length;
    		height+=200;
    	}
    	$("#"+container).css("height", height+"px");
    	$("#"+container).parent().css("overflow", "auto");
    	$("#"+container).parent().css("overflow-x", "hidden");
    	gridHeight = 0.99*height / distinctIndices.length;
    }
    else{
    	height = $("#"+container).parent().height() - margin.top - margin.bottom;
    	$("#"+container).css("height", height+"px");
    	$("#"+container).parent().css("overflow", "hidden");
    	gridHeight = 0.99*height / distinctIndices.length;
    }

      var svg = d3.select("#" + container).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);
      var bodyG = svg
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // var dayLabels = svg.selectAll(".dayLabel")
      //     .data(days)
      //     .enter().append("text")
      //       .text(function (d) { return d; })
      //       .attr("x", 0)
      //       .attr("y", function (d, i) { return i * gridHeight; })
      //       .style("text-anchor", "end")
      //       .attr("transform", "translate(-6," + gridHeight / 1.5 + ")");

      var timeLabels = bodyG.selectAll(".timeLabel")
          .data(times)
          .enter().append("text")
            .text(function(d) { return modelSet.indexOf(d); })
            .attr("id", function(d) { return "MatrixModel_"+d;})
            .attr("x", function(d, i) { return i * gridWidth; })
            .attr("y", 0)
            .style("text-anchor", "middle")
            .attr("transform", "translate(" + gridWidth / 2 + ", -6)")
            .attr("class",  "timeLabel mono axis axis-worktime");

      var heatmapChart = function(data) {
          var colorScale = d3.scale.quantile()
              .domain([d3.min(data, function(d) {return d.z_score;}), d3.max(data, function (d) { return d.z_score; })])
              .range(colors);

          var cards = bodyG.selectAll(".hour")
              .data(data);

          cards.append("title");

          var tip = d3.tip()
			  .attr('class', 'd3-tip')
			  .offset([-10+gridHeight/2.0, 0])
			  .html(function(d) {
			    	return  "<p>GCM: "+ d.modelName.split("_")[0] + "</p>" + 
			    		"<p>RCM: "+ d.modelName.split("_")[1] + "</p>" +
		      			"<p>Z-Score: "+ d.z_score + "</p>";
			});

		  svg.call(tip);

          cards.enter().append("rect")
              .attr("x", function(d) { return modelSet.indexOf(d.modelName) * gridWidth; })
              .attr("y", function(d) { return distinctIndices.indexOf(d.sampleIndex) * gridHeight + gridHeight*0.01; })
              .attr("id", function(d) {return "rect_" + d.sampleIndex;})
              .attr("rx", 4)
              .attr("ry", 4)
              .attr("class", "hour bordered")
              .attr("width", gridWidth)
              .attr("height", gridHeight*0.8)
              .style("fill", colors[0])
              .on("mouseover", function(d) { 
              	tip.show(d);
              	if(gridHeight>5)
              		d3.selectAll("#rect_"+d.sampleIndex).style("stroke", "gray");
              	var LatLng = [d.location.lat, d.location.lng];
              	if(matrixMarker == undefined){
              		matrixMarker = L.marker(LatLng, {icon: redMarker}).addTo(map);
              		map.setView(LatLng);
              	}
              	else{
              		matrixMarker.setLatLng(LatLng);
              		matrixMarker.addTo(map);
              	}
              	if(circles.length == 0){
              		var circle = L.circle(LatLng, 4, {color: "red"}).addTo(map);
              		circle.bringToFront();
              		circles.push(circle);
              	}
              	else{
              		// circles.forEach(function(d, i){
              			// if(d.getLatLng().lat != LatLng[0] && d.getLatLng().lng != LatLng[1]){
              				var circle = L.circle(LatLng, 4, {color: "red"}).addTo(map);
              				circle.bringToFront();
              				circles.push(circle);
              			// }
              		// });
              	}
              	// if(matrixPath == null){
              	// 	matrixPath = L.polyline([LatLng], {color: 'red'}).addTo(map);
              	// }
              	// else{
              	// 	matrixPath.addLatLng(LatLng);
              	// 	matrixPath.bringToFront();
              	// 	matrixPath.redraw();
              	// }
              	var sampleIndex = d.sampleIndex;
              	paralleCoordinate.highlight(pcData.filter(function(d){
              		if(d.index == sampleIndex)	return d;
              	}));

              })
              .on("mouseout", function(d){
              	tip.hide();
              	if(gridHeight>5)
              		d3.selectAll("#rect_"+d.sampleIndex).style("stroke", "#E6E6E6");
              	paralleCoordinate.unhighlight();
              	// map.removeLayer(matrixMarker);
              });


          var amountTip = d3.tip()
			  .attr('class', 'd3-tip')
			  .offset([-10+gridHeight/2.0, 0])
			  .html(function(d) {
			    	return  "Amount: " + d;
			});

		  svg.call(amountTip);
          var histxscale = d3.scale.linear().domain([0, Math.log(d3.max(amount))]).range([0, histHeight]);
          var hists = svg.append("g").selectAll(".histrect")
              .data(amount)
              .enter()
              .append("rect")
              .attr("x", function(d, i){ return margin.left - histxscale(Math.log(d));})
              .attr("y", function(d, i){ return i * gridHeight + gridHeight*0.01; })
              .attr("width", function(d) { return histxscale(Math.log(d));})
              .attr("height", gridHeight*0.8)
              .attr("transform", "translate(0,"+ margin.top + ")")
              .style("fill", "#636363")
              .on("mouseover", function(d){
              	amountTip.show(d);
              })
              .on("mouseout", function(d){
              	amountTip.hide();
              });
 
          cards.transition().duration(1000)
              .style("fill", function(d) { return colorScale(d.z_score); });

          cards.select("title").text(function(d) { return d.z_score; });
          
          cards.exit().remove();

          var legend = bodyG.selectAll(".legend")
              .data([d3.min(data, function(d) {return d.z_score;})].concat(colorScale.quantiles()), function(d) { return d; });

          legend.enter().append("g")
              .attr("class", "legend");

          legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height+margin.bottom*0.6)
            .attr("width", legendElementWidth)
            .attr("height", 1.8*gridHeight)
            .style("fill", function(d, i) { return colors[i]; });

          legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return "≥ " + d.toFixed(2); })
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", height+margin.bottom*0.5);

          legend.exit().remove();
      };

      heatmapChart(data);
      
      // var datasetpicker = d3.select("#dataset-picker").selectAll(".dataset-button")
      //   .data(datasets);

      // datasetpicker.enter()
      //   .append("input")
      //   .attr("value", function(d){ return "Dataset " + d })
      //   .attr("type", "button")
      //   .attr("class", "dataset-button")
      //   .on("click", function(d) {
      //     heatmapChart(d);
      //   });
}


