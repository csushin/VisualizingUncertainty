function drawEnsembleOverviewHist(val){
  var cellType = "histogram";
  if(document.querySelector('input[name="switchView"]:checked').value == 0){
        var type = $('#swictherSelector').val();
        var key;
        if(type.indexOf("Model")>-1)
            key = $("#timeSlider").val();
        else
            key = $("#modalSelector").val();
        if(val!=0){
          console.log("clicking...");
           if(val.indexOf("Text")<=-1){
            var binSize = $("#"+ val+ "Others_binSize").val();
            indexHistData(val, "Ensemble", type, key, binSize)
          }
        }
        else{
            for(var i=0; i<metriclist.length; i++){
                if(cellType == "histogram"){
                    console.log("clicking...");
                    if(metriclist[i].indexOf("Text")<=-1){
                      var binSize = $("#Ensemble"+ metriclist[i] + "Others_binSize").val();
                      indexHistData(metriclist[i], "Ensemble", type, key, binSize);
                    }
                }
            }            
        }

    }  
}

function drawOverviewHistograms(val){
	var cellType = "histogram";
	if(document.querySelector('input[name="switchView"]:checked').value == 0){

        var type = $('#swictherSelector').val();
        var key;
        if(type.indexOf("Model")>-1)
            key = $("#timeSlider").val();
        else
            key = $("#modalSelector").val();
        if(val!=0){
            for(var j=0; j<datatype.length; j++){
                if(val.indexOf("Text")<=-1 && datatype[j].indexOf("Ensemble")<=-1 && datatype[j].indexOf("Others")<=-1){
                    if(cellType == "histogram"){
                        console.log("clicking...");
                        var binSize = $("#"+ val+ "Others_binSize").val();
                        indexHistData(val, datatype[j], type, key, binSize)
                    }
                }
            }
        }
        else{
            for(var i=0; i<metriclist.length; i++){
                for(var j=0; j<datatype.length; j++){
                    if(metriclist[i].indexOf("Text")<=-1 && datatype[j].indexOf("Ensemble")<=-1 && datatype[j].indexOf("Others")<=-1){
                        if(cellType == "histogram"){
                            console.log("clicking...");
                            var binSize = $("#"+ metriclist[i] + "Others_binSize").val();
                            indexHistData(metriclist[i], datatype[j], type, key, binSize)
                        }
                    }
                }
            }            
        }

    }
}

function indexHistData(metricType, dataType,type, key, binSize){
    var divname = metricType+dataType+"HistDiv_Histogram";
    $("<div id='overview_histogramCover'></div>").css({
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        /* black for browsers which cannot support rgba */
        backgroundColor: "#000",
        /* 70% opacity for supported browsers */
        backgroundColor: "rgba(0, 0, 0, 0.7)"
    }).appendTo($("#"+divname).css("position", "relative"));
	$.ajax({
		url: httpDomain + "waterDemo/services/getHistData?callback=?",
		dataType: "jsonp",
		data:{
			metricType: metricType,
			dataType: dataType,
			type: type,
			key: key,
			binSize: binSize,
      min: globalMeanMinMax[metricType][dataType][0],
      max: globalMeanMinMax[metricType][dataType][1],
      variable: $("#EnsembleVariableDropdown").val() 
		},
		error: function(){
			console.log("error in getting histogram data");
		},
		success: function(data){
			// console.log("data is: " + data);
            if(data.metric.indexOf("Area")>-1 && dataType != "Scarcity")
                binSize = 10;
            else if(data.metric.indexOf("Area")>-1 && dataType == "Scarcity")
                binSize = 4;
            drawCellHistogram(data.hist, data.metric, data.data, data.min, data.max, binSize)
		}
	});
}

function drawCellHistogram(histdata, metric, datatype, min, max, binSize){
	var divname = metric+datatype+"HistDiv_Histogram";
    d3.select("#overview_histogramCover").remove();
	d3.select("#"+divname + " svg").remove();
	var margin = {top: 10, right: 15, bottom: 10, left: 10},
		width = $("#"+divname).width(),
		height = $("#"+divname).height();
	var maxY = d3.max(histdata);
    var maxX = binSize;
    var x = d3.scale.linear().domain([0, maxX]).range([0, width*0.9]);
    var y = d3.scale.linear().domain([0, maxY]).range([height, 0]);

    var scatterplot = d3.select("#"+divname).append("svg:svg")
    .attr("width", width)
    .attr("height", height);

	var pointview = scatterplot.append("g")
	.attr("transform", "translate("+margin.left+","+margin.top+")")
    .attr("width", width)
    .attr("height", height);

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    pointview.append("g").attr("transform", "translate(0," + height*0.85 + ")")
    .attr("class", "smallHist axis date")
    .call(xAxis)
    .selectAll("text")
    .text(function(d, i){ 
    	var num =  min+i/binSize*(max-min);
    	if(num<binSize)
    		return num.toFixed(2);
    	if(num>binSize)
    		return int2roundKMG(num);
    });

        // draw x-histograms
    var xhist_yscale = d3.scale.linear().domain([0, d3.max(histdata)]).range([0, height*0.85]);
    var x_rects = pointview.selectAll("rect").data(histdata)
    x_rects.enter().append("rect")
    x_rects.attr({
      y: function(d,i) {
        return height*0.85 - xhist_yscale(d<1?0:d)-1;
      },
      x: function(d, i){
      	return x(i);
      },
      height: function(d, i){
      	return xhist_yscale(d<1?0:d);
      },
      width: x(2)-x(1),
      fill: "#66c2a5",
      stroke: "#ffffff"
    });	

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
      if (val >= 1e9)        { _str = truncNb((val/1e9), 1) + 'G';
      } else if (val >= 1e6) { _str = truncNb((val/1e6), 1) + 'M';
      } else if (val >= 1e3) { _str = truncNb((val/1e3), 1) + 'K';
      } else { _str = parseInt(val);
      }
      return _str;
    }
    // $("#"+divname).css("display", "block");
    // $("#"+metric+datatype+"HistDiv_Map").css("display", "none");
}
