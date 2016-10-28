function drawscatterplot(divname, data, xHistData, yHistData){
	d3.select("#"+divname+" svg").remove();
  d3.select("#scatterCover").remove();
	// $("#"+divname).empty();
	var divHeight = $("#"+divname).height();
	var divWidth = $("#"+divname).width();
	var margin = {top: 10, right: 15, bottom: 100, left: 80}
      , width = divWidth - margin.left - margin.right
      , height = divHeight - margin.top - margin.bottom;
    var maxX = d3.max(data, function(d) { return d[0];});
    var maxY = d3.max(data, function(d) { return d[1];});
    var maxVal = d3.max(data, function(d){ return d[2];});
    var minVal = d3.min(data, function(d) {return d[2];});
    var x = d3.scale.linear().domain([0, maxX]).range([0, width]);
    var y = d3.scale.linear().domain([0, maxY]).range([height, 0]);
    var XdataMin = modalStat[$('#swictherSelector').val()+$("#scatterplotX").val()].min;
    var XdataMax = modalStat[$('#swictherSelector').val()+$("#scatterplotX").val()].max;
    var YdataMin = modalStat[$('#swictherSelector').val()+$("#scatterplotY").val()].min;
    var YdataMax = modalStat[$('#swictherSelector').val()+$("#scatterplotY").val()].max;

    var scatterplot = d3.select("#"+divname).append("svg:svg")
    .attr("width", divWidth)
    .attr("height", divHeight)
    .attr("class", "chart");

    var pointview = scatterplot.append("g")
    .attr("transform", "translate("+margin.left+","+margin.top+")")
    .attr("width", divWidth)
    .attr("height", divHeight)
    .attr("class", "main");

    var xAxis = d3.svg.axis().scale(x).orient("bottom");

    pointview.append("g").attr("transform", "translate(0," + height + ")")
    .attr("class", "main axis date")
    .call(xAxis)
    .selectAll("text")
    .text(function(d){ 
    	return (XdataMin + d/width*(XdataMax - XdataMin)).toFixed(2);
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
    	// if($("#scatterplotY").val().indexOf("Entropy")>-1 || $("#scatterplotY").val().indexOf("CV")>-1)
    		return (YdataMin + d/height*(YdataMax - YdataMin)).toFixed(2);
    	// else
    		// return (YdataMin + d/height*(YdataMax - YdataMin)).toFixed(0);
    });;

    var g = pointview.append("svg:g"); 
    
    g.selectAll("scatter-dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d,i) { return x(d[0]); } )
          .attr("cy", function (d) { return y(d[1]); } )
          .attr("r", 2)
          .style("fill", "black")
          .style("opacity", function(d) {return 0.2+0.8*(Math.log(d[2])-Math.log(minVal))/(Math.log(maxVal)-Math.log(minVal));});
          
    // draw y=ax line
    var line = d3.svg.line()
    	.x(function(d) { return x(d[0]); })
    	.y(function(d) { return y(d[1]); })
    	.interpolate("linear");

    var twoEnds = [[0,0], [maxX, maxY]]

    var lineGraph = pointview.append("path")
    						.attr("d", line(twoEnds))
    						.attr("stroke", "black")
    						.attr("stroke-width", "black")
    						.attr("fill", "none");
    // draw x-histograms
    var xhist_yscale = d3.scale.linear().domain([0, Math.log(d3.max(xHistData, function(d){ return d;}))]).range([0, margin.bottom/2.0]);
    var x_rects = pointview.selectAll("rect.xHist").data(xHistData)
    x_rects.enter().append("rect")
    x_rects.attr({
      y: function(d,i) {
        return y(0)+20;
      },
      x: function(d, i){
      	return x(i);
      },
      height: function(d, i){
      	return xhist_yscale(d<1?0:Math.log(d));
      },
      width: x(2)-x(1),
      fill: "#66c2a5"
    });	
   
    // draw y-histograms
    var yHist_xscale = d3.scale.linear().domain([0, Math.log(d3.max(yHistData, function(d){ return d;}))]).range([0, margin.left/2.0]);
    var y_rects = pointview.selectAll("rect.yHist").data(yHistData)
    y_rects.enter().append("rect")
    y_rects.attr({
      y: function(d,i) {
       	return y(i);
      },
      x: function(d, i){
      	return x(0)-yHist_xscale(d<1?0:Math.log(d))-50;
      },
      height: y(1)-y(2),
      width: function(d, i){
      	return yHist_xscale(d<1?0:Math.log(d));
      },
      fill: "#8da0cb"
    });	
}

function listenScatterplotSelectBox(){
	$('#scatterplotX').on('change', function(e){
		initializeScatterplot("scatterplotDiv");
	});
	$('#scatterplotY').on('change', function(e){
		initializeScatterplot("scatterplotDiv");
	});
}

function initializeScatterplot(divname){
	var divHeight = $("#"+divname).height();
	var divWidth = $("#"+divname).width();
	var margin = {top: 20, right: 15, bottom: 80, left: 80}
      , width = divWidth - margin.left - margin.right
      , height = divHeight - margin.top - margin.bottom;
  $("<div id='scatterCover'></div>").css({
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
		url: httpDomain + "waterDemo/services/CorrelateStats?callback=?",
		dataType: "jsonp",
		data:{
			width: width,
			height: height,
			metricX: $('#swictherSelector').val()+$("#scatterplotX").val(),
			metricY: $('#swictherSelector').val()+$("#scatterplotY").val(),
			type: $('#swictherSelector').val(),
			year: $("#timeSlider").val(),
			modal: $("#modalSelector").val(),
			dataType: globalDataType
		},
		error: function(){
      d3.select("#scatterCover").remove();
    },
		success: function(data){
			// console.log(data);
			var points = [];
			data.pointset.forEach(function(val, index){
				if(val>0){
					var y = index/parseInt(width);
					var x = index%parseInt(width);
					points.push([x, y, val]);
				}
			});
			drawscatterplot(divname, points, data.xHistogram, data.yHistogram);
		}
	})
}