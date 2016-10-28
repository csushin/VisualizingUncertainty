function initializeParamPanel(){

}

function drawLegend(divName){
	var colorTable = ["239,243,255", "198,219,239", "158,202,225", "107,174,214", "49,130,189", "8,81,156"];
	var legendLength = colorTable.length;
	document.getElementById(divName).style.padding = "0px 0px 0px 0px";
	for(var i=0; i<legendLength; i++){
		var div = document.createElement("div");
		div.style.width = 100/legendLength + "%";
		div.style.height = "40%";
		div.style.background = "rgb(" + colorTable[i] + ")";
		div.style.float = "left";
		div.innerHTML = "<h3>" + (0.2*i).toFixed(1) + "</h3>";
		div.style.textAlign = "center";
		div.style.verticalAlign = "middle";
		div.style.fontSize  = "small";
		div.style.color  = "black";
		document.getElementById(divName).appendChild(div);
	}
}

function confirmSelection(){
	var description = $("#ensbclstSlctDescription").text();
	var colorTable = ["239,243,255", "198,219,239", "158,202,225", "107,174,214", "49,130,189", "8,81,156"];
	if(description.indexOf("Pair")>-1){
		// query pairs of model data
		var modelName = [];
		description.split(" ").forEach(function(d, i){
			if(d.indexOf("M")>-1)
				modelName.push(modelSet[d.replace("M", "")]);
		});
		
		drawEnsembleClstMapByPairVal(modelName[0], modelName[1], colorTable);
	}
	if(description.indexOf("Line")>-1){
		// query data from one model
		var modelName = [];
		description.split(" ").forEach(function(d, i){
			if(d.indexOf("M")>-1)
				modelName.push(modelSet[d.replace("M", "")]);
		});
		drawEnsembleClstMapByLineVal(modelName[0], colorTable);
	}
	if(description.indexOf("Square")>-1){
		// query data in n by n matrix data
		var modelName = [];
		description.split(" ").forEach(function(d, i){
			if(d.indexOf("M")>-1)
				modelName.push(modelSet[d.replace("M", "")]);
		});
		drawEnsembleClstMapSqrVal(modelName, colorTable);
	}
}

function addMaploadingcover(){
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
	}).appendTo($("#EnsembleClstMap").css("position", "relative"));
}

function removeMaploadingcover(){
	d3.select("#coverEnsembleMap").remove();
}

function drawEnsembleClstMapByPairVal(modelA, modelB, colorTable){
	addMaploadingcover();
	$.ajax({
		url: httpDomain + "waterDemo/services/getEnsClstByPairVal?callback=?",
			dataType: "jsonp",
			data:{
				dataType: $("#ensbclstDataSelection").val(),
				zoomLevel: 7,
				alpha: 200,
				modelA: modelA,
				modelB: modelB,
				colorTable: colorTable.join("&")
				},
			error: function(){
			},
			success: function(data){
				removeMaploadingcover();
				if(ensembleClstMapOverlay)
	    			ensembleClstMap.removeLayer(ensembleClstMapOverlay);
				ensembleClstMapOverlay = L.imageOverlay("data:image/png;base64," + data.imgStr, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(ensembleClstMap);
			}
	})
}


function drawEnsembleClstMapByLineVal(model, colorTable){
	addMaploadingcover();
	$.ajax({
		url: httpDomain + "waterDemo/services//getEnsClstByLineVal?callback=?",
			dataType: "jsonp",
			data:{
				dataType: $("#ensbclstDataSelection").val(),
				zoomLevel: 7,
				alpha: 200,
				model: model,
				colorTable: colorTable.join("&"),
				minmaxType:  $("#ensbclstDataRank").val()
				},
			error: function(){
			},
			success: function(data){
				removeMaploadingcover();
				if(ensembleClstMapOverlay)
	    			ensembleClstMap.removeLayer(ensembleClstMapOverlay);
				ensembleClstMapOverlay = L.imageOverlay("data:image/png;base64," + data.imgStr, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(ensembleClstMap);
			}
	})
}

function drawEnsembleClstMapSqrVal(modelSet, colorTable){
	addMaploadingcover();
	$.ajax({
		url: httpDomain + "waterDemo/services//getEnsClstBySqrVal?callback=?",
			dataType: "jsonp",
			data:{
				dataType: $("#ensbclstDataSelection").val(),
				zoomLevel: 7,
				alpha: 200,
				modelSet: modelSet.join("&"),
				colorTable: colorTable.join("&"),
				minmaxType: $("#ensbclstDataRank").val()
				},
			error: function(){
			},
			success: function(data){
				removeMaploadingcover();
				if(ensembleClstMapOverlay)
	    			ensembleClstMap.removeLayer(ensembleClstMapOverlay);
				ensembleClstMapOverlay = L.imageOverlay("data:image/png;base64," + data.imgStr, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(ensembleClstMap);
			}
	})
}

function initializeEnsembleMat(divname, modelName){
	var _this = $("#"+divname);
	var height = _this.height();
	var width = _this.width();
	var matrixLength = Math.min(height, width);
	var matDivHandler = d3.select("#"+divname);
	width = matrixLength;
	height = matrixLength;
	var gridWidth = width/(modelName.length+1)
		gridHeight = height/(modelName.length+1);

	var matsvg = matDivHandler.append("svg")
		.attr('width', width)
		.attr('height', height);
	var fakedataRect = [];
	var fakedataCircle = [];
	for (var k = 0; k < modelName.length; k ++) {
    	fakedataRect.push(d3.range(0, k));
    	fakedataCircle.push(d3.range(k+1, modelName.length));
	}

	var textTip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([-10, 0])
	  .html(function(d) {
      		return "<p>"+ modelName[d] + "</p>";
	});

	matsvg.call(textTip);

	var xTextSvg = matsvg.selectAll("#"+divname)
		.data(modelName)
		.enter()
		.append("svg:g")
		.append("text")
		.text(function(d, i) { return "M"+i;})
		.attr("id", function(d,i) { return "xText_"+i;})
		.attr("transform", function(d, i){
			var xoffset = gridWidth*i+gridWidth*1.1;
			var yoffset = gridWidth/2.0;
			return "translate(" + xoffset + ", " + yoffset + ")";
		})
		.on("mouseover", function(d, index){
			textTip.show(index);
		})
		.on("mouseout", textTip.hide);

	var yTextSvg = matsvg.selectAll("#"+divname)
		.data(modelName)
		.enter()
		.append("svg:g")
		.append("text")
		.text(function(d, i) { return "M"+i;})
		.attr("id", function(d,i) { return "yText_"+i;})
		.attr("transform", function(d, i){
			var xoffset = 0;
			var yoffset = gridWidth*i+gridWidth*1.5;
			return "translate(" + xoffset + ", " + yoffset + ")";
		})
		.on("mouseover", function(d, index){
			textTip.show(index);
		})
		.on("mouseout", textTip.hide)
		.on("click", function(){
			// clear all pair selection
			if(d3.selectAll(".enpair")[0].length>=1)
        		d3.selectAll(".enpair")[0].every(function(d){
        			d3.select(d).classed("enpair", false);
        			d3.select(d).style("stroke", "none");
        		});
			d3.select(this.parentElement).style("stroke", "red");
			d3.select(this.parentElement).classed("singleModel", true);
			// if there is multiple selection over the lines
			if(d3.selectAll(".singleModel")[0].length>=2){
				var str = "";
				d3.selectAll(".singleModel")[0].forEach(function(e, i){ str+=" " + e.childNodes[0].innerHTML;})
				document.getElementById('ensbclstSlctDescription').innerHTML = "Square selection:" + str + "<br/>";
			}
			// if there is only single selection
			else if(d3.selectAll(".singleModel")[0].length==1){
				var str = "";
				d3.selectAll(".singleModel")[0].forEach(function(e, i){ str+=" " + e.childNodes[0].innerHTML;})
				document.getElementById('ensbclstSlctDescription').innerHTML = "Line selection:" + str + "<br/>";
			}
			// if there is no selection, then clear the description
			else{
				document.getElementById('ensbclstSlctDescription').innerHTML = "<br/>";
			}
		})
		.on("dblclick", function(){
			d3.select(this.parentElement).style("stroke", "none");
			d3.select(this.parentElement).classed("singleModel", false);
			if(d3.selectAll(".singleModel")[0].length>=2){
				var str = "";
				d3.selectAll(".singleModel")[0].forEach(function(e, i){ str+=" " + e.childNodes[0].innerHTML;})
				document.getElementById('ensbclstSlctDescription').innerHTML = "Square selection:" + str + "<br/>";
			}
			else if(d3.selectAll(".singleModel")[0].length==1){
				var str = "";
				d3.selectAll(".singleModel")[0].forEach(function(e, i){ str+=" " + e.childNodes[0].innerHTML;})
				document.getElementById('ensbclstSlctDescription').innerHTML = "Line selection:" + str + "<br/>";
			}
			else{
				document.getElementById('ensbclstSlctDescription').innerHTML = "<br/>";
			}
		});

	var grprect = matsvg.selectAll('#'+divname)
		.data(fakedataRect)
	    .enter()
	    .append('svg:g')
	    .attr('id', function(d, i) {return 'rectrow_'+i})
	    .attr('transform', function(d, i) {
	    	var xoffset = gridWidth*0.5;
	    	var yoffset = gridWidth + gridHeight*i;
	        return "translate(" + xoffset + ", " + yoffset + ")";
	    });

	var grpcircle = matsvg.selectAll('#'+divname)
		.data(fakedataCircle)
	    .enter()
	    .append('svg:g')
	    .attr('id', function(d, i) {return 'circlerow_'+i;})
	    .attr('transform', function(d, i) {
	    	var xoffset = gridWidth*0.5 + gridWidth*i;
	    	var yoffset = gridHeight*i;
	        return "translate(" + xoffset + ", " + yoffset + ")";
	    });

	var initialColor = d3.scale.category20();
	var modelTip = d3.tip()
	  .attr('class', 'd3-tip')
	  .offset([5, 0])
	  .html(function(d) {
      		return "<p>M"+d[0] + " & M" + d[1] + "</p>";
	});

	matsvg.call(modelTip);
	grprect.selectAll('rect')
	    .data(function(d) { return d; })
	    .enter()
	    .append('rect')
	    .attr('id', function(d, i) { return 'rect_'+d; })
        .attr('x', function(d, i) { return gridWidth/2.0+gridWidth*i;})
        .attr('width', gridWidth*0.95)
        .attr('height', gridHeight*0.95)
        .attr('fill', function(d, i) {
        	return  initialColor(i);
        })
        .on("mouseover", function(d, i){
        	var x = this.id.split("_")[1];
        	var y = this.parentElement.id.split("_")[1];
        	modelTip.show([x, y]);
        })
        .on("mouseout", modelTip.hide)
        .on("click", function(d ,i){
        	// if there is already pair selection, then clear them
        	if(d3.selectAll(".enpair")[0].length>=1)
        		d3.selectAll(".enpair")[0].every(function(d){
        			d3.select(d).classed("enpair", false);
        			d3.select(d).style("stroke", "none");
        		});
        	if(d3.selectAll(".singleModel")[0].length>=1){
        		d3.selectAll(".singleModel")[0].forEach(function(d){
        			d3.select(d).classed("singleModel", false);
        			d3.select(d).style("stroke", "none");
        		});
        	}
        	var x = this.id.split("_")[1];
        	var y = this.parentElement.id.split("_")[1];
        	document.getElementById('ensbclstSlctDescription').innerHTML = "Pair selection: M" + x + " M" + y + "<br/>";
        	// highlight the curretn selected pair
        	d3.select(this).style("stroke", "red");
        	d3.select(this).style("stroke-width", "3");
        	d3.select(this).classed("enpair", true)
        })
        .on("dblclick", function(d, i){
        	d3.select(this).style("stroke", "none");
        	d3.select(this).classed("enpair", false)
        });

    grpcircle.selectAll('circle')
	    .data(function(d) { return d;})
	    .enter()
	    .append('circle')
	    .attr('id', function(d, i) { return 'circle_'+d; })
        .attr('cx', function(d, i) { return gridWidth*2.0 + gridWidth*i;})
        .attr('cy', function(d, i) { return gridHeight + gridHeight*(Math.floor(i/modelName.length)) + gridHeight/2.0;})
        .attr('r', Math.min(gridWidth, gridHeight)/2.0*0.95)
        .attr('fill', function(d, i) {
        	return  initialColor(i);
        })
        .on("mouseover", function(d, i){
        	var x = this.id.split("_")[1];
        	var y = this.parentElement.id.split("_")[1];
        	modelTip.show([x, y]);
        })
        .on("mouseout", modelTip.hide)
        .on("click", function(d ,i){
        	d3.select(this).style("stroke", "red");
        	d3.select(this).style("stroke-width", "3");
        	d3.select(this).classed("enpair", true);
        })
        .on("dblclick", function(d, i){
        	d3.select(this).style("stroke", "none");
        	d3.select(this).classed("enpair", false)
        });
}

function updateEnsembleMat(){

}

function drawEnsembleColorBars(){

}

function createParamControls(){

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