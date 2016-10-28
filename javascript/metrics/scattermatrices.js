function getMultiScatterplotData(variable){
	var metrics = ["Mean", "Median", "Std", "IQR", "CV", "Entropy", "QuadraticScore"];
	$.ajax({
		url: httpDomain+ "waterDemo/services/getMultiScatterPlotData?callback=?",
		dataType: "jsonp",
		data:{
			metrics: metrics.join(","),
			unitSize: 200,
			dataType: variable
		},
		error: function(){
			console.log("error in getting map data");
		},
		success: function(data){
			drawScatterPlot(data, "scatterMatrixViewContainer",  metrics);
		}
	});
}

function drawScatterPlot(data, container, metrics){
	d3.select("#"+container+" svg").remove();
	var width = $("#"+container).width(),
	height = $("#"+container).height(),
    size = (width>height?height:width)/metrics.length + 80,
    padding = 40;

	var x = d3.scale.linear()
	    .range([padding / 2, size - padding / 2]);

	var y = d3.scale.linear()
	    .range([size - padding / 2, padding / 2]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	    .ticks(5);

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(5);

	var color = d3.scale.category10();

	// d3.csv("flowers.csv", function(error, data) {
	  // if (error) throw error;

	var domainByTrait = {};
	var	traits = metrics;
	var	n = traits.length;
	traits.forEach(function(trait) {
	    domainByTrait[trait] = d3.extent(data, function(d) { return d.values[traits.indexOf(trait)]; });
	});
	var amountMinma = d3.extent(data, function(d) { return d.amount;});

	  xAxis.tickSize(size * n);
	  yAxis.tickSize(-size * n);

	  // var brush = d3.svg.brush()
	  //     .x(x)
	  //     .y(y)
	  //     .on("brushstart", brushstart)
	  //     .on("brush", brushmove)
	  //     .on("brushend", brushend);

	  var svg = d3.select("#" + container).append("svg")
	      .attr("width", size * n + padding)
	      .attr("height", size * n + padding)
	    .append("g")
	      .attr("transform", "translate(" + padding + "," + padding / 2 + ")");

	  svg.selectAll(".x.scatterMatricesAxis")
	      .data(traits)
	    .enter().append("g")
	      .attr("class", "x scatterMatricesAxis")
	      .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
	      .each(function(d, i) { 
	      	x.domain(domainByTrait[d]); 
	      	d3.select(this)
	      	.call(xAxis)
	      	// .selectAll("text")
	      	// .style("text-anchor", "end")
        //     .attr("transform", function(d){
        //     	return "rotate(45)";
        //     });
	      });

	  svg.selectAll(".y.scatterMatricesAxis")
	      .data(traits)
	    .enter().append("g")
	      .attr("class", "y scatterMatricesAxis")
	      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
	      .each(function(d) { y.domain(domainByTrait[d]); d3.select(this).call(yAxis); });

	  var cell = svg.selectAll(".cell")
	      .data(cross(traits, traits))
	    .enter().append("g")
	      .attr("class", "cell")
	      .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
	      .each(plot);

	  // Titles for the diagonal.
	  cell.filter(function(d) { return d.i === d.j; }).append("text")
	      .attr("x", padding)
	      .attr("y", padding)
	      .attr("dy", ".71em")
	      .text(function(d) { return d.x; });

	  // cell.call(brush);

	  function plot(p) {
	    var cell = d3.select(this);

	    x.domain(domainByTrait[p.x]);
	    y.domain(domainByTrait[p.y]);

	    cell.append("rect")
	        .attr("class", "scatterMatricesFrame")
	        .attr("x", padding / 2)
	        .attr("y", padding / 2)
	        .attr("width", size - padding)
	        .attr("height", size - padding);

	    cell.selectAll("circle")
	        .data(data)
	      .enter().append("circle")
	      	.attr("class", "scatterMatricesCircle")
	        .attr("cx", function(d) { return x(d.values[metrics.indexOf(p.x)]); })
	        .attr("cy", function(d) { return y(d.values[metrics.indexOf(p.y)]); })
	        .attr("r", 1)
	        .style("fill", "black")
          	.style("opacity", function(d) {return 0.2+0.8*(Math.log(d.amount)-Math.log(amountMinma[0]))/(Math.log(amountMinma[1])-Math.log(amountMinma[0]));});
	  }

	  var brushCell;

	  // Clear the previously-active brush, if any.
	  function brushstart(p) {
	    if (brushCell !== this) {
	      d3.select(brushCell).call(brush.clear());
	      x.domain(domainByTrait[metrics.indexOf(p.x)]);
	      y.domain(domainByTrait[metrics.indexOf(p.y)]);
	      brushCell = this;
	    }
	  }

	  // Highlight the selected circles.
	  function brushmove(p) {
	    var e = brush.extent();
	    svg.selectAll("circle").classed("hidden", function(d) {
	      return e[0][0] > d.values[metrics.indexOf(p.x)] || d.values[metrics.indexOf(p.x)] > e[1][0]
	          || e[0][1] > d.values[metrics.indexOf(p.y)] || d.values[metrics.indexOf(p.y)] > e[1][1];
	    });
	  }

	  // If the brush is empty, select all circles.
	  function brushend() {
	    if (brush.empty()) svg.selectAll(".hidden").classed("hidden", false);
	  }

	  function cross(a, b) {
	    var c = [], n = a.length, m = b.length, i, j;
	    for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
	    return c;
	  }

	  d3.select(self.frameElement).style("height", size * n + padding + 20 + "px");
}


// function getMultiScatterplotData(xmetric, ymetric, dataType, unitSize, container){
// 	$.ajax({
// 		url: httpDomain+ "waterDemo/services/getMultiScatterplotData?callback=?",
// 		dataType: "jsonp",
// 		data:{
// 			xmetric: xmetric,
// 			ymetric: ymetric,
// 			dataType: dataType,
// 			unitSize: unitSize
// 		},
// 		error: function(){
// 			console.log("error in getting map data");
// 		},
// 		success: function(data){
// 			drawUnitScatterplot(container, data.histData, xmetric, ymetric);
// 		}
// 	});
// }

// function createMultipleScatterplot(data, container){
// 	var self = this;
// 	var width = $("#"+container).width(),
// 		height = $("#"+container).height(),
// 		margin = {top: 10, left: 10, bottom: 10, right: 10};//margin is used for the axis
// 	var metricList = data.metrics.split(',');
// 	var unitGrid = (width - margin.left - margin.right)/metricList.length;
// 	var container = "multiSPContainer";
// 	var dataType = $("#multiSPVariable").val();
// 	for(var i=0; i<metricList.length; i++){
// 		drawUnitYAxis();
// 		for(var j=0; j<metricList.length; j++){
// 			var subdiv = document.createElement("div")
// 			subdiv.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 nopadding";
// 			var unitGrid = $(subdiv).height()>$(subdiv).width()?$(subdiv).width():$(subdiv).height();
// 			subdiv.id = metricLi{st[i]+"_"+metricList[j]+"Scatterplot";
// 			getMultiScatterplotData(metricList[i], metricList[j], dataType, unitGrid, subdiv.id);
// 			$("#"+container).append(subdiv);
// 			if(i==metricList.length - 1){
// 				var textdiv = document.createElement("div");
// 				subdiv.className = "col-xs-4 col-sm-4 col-md-4 col-lg-4 nopadding";
				
// 				drawUnitXAxis(translate, data, unitGrid);
// 			}
// 		}
// 	}
	
// }

// function drawUnitScatterplot(container, data, xmetric, ymetric){
// 	d3.select("#"+container+" svg").remove();
// 	var divHeight = $("#"+container).height();
// 	var divWidth = $("#"+container).width();
//     var maxX = d3.max(data, function(d) { return d[0];});
//     var maxY = d3.max(data, function(d) { return d[1];});
//     var maxVal = d3.max(data, function(d){ return d[2];});
//     var minVal = d3.min(data, function(d) {return d[2];});
//     var x = d3.scale.linear().domain([0, maxX]).range([0, divWidth]);
//     var y = d3.scale.linear().domain([0, maxY]).range([divWidth, 0]);
//     var XdataMin = ensembleStat[xmetric].min;
//     var XdataMax = ensembleStat[xmetric].max;
//     var YdataMin = ensembleStat[ymetric].min;
//     var YdataMax = ensembleStat[ymetric].max;

//     var scatterplot = d3.select("#"+container).append("svg:svg")
//     .attr("width", divWidth)
//     .attr("height", divHeight)
//     .attr("class", "chart");

//     var pointview = scatterplot.append("g")
//     .attr("transform", "translate("+margin.left+","+margin.top+")")
//     .attr("width", divWidth)
//     .attr("height", divHeight)
//     .attr("class", "main");
//   	 var g = pointview.append("svg:g"); 
    
//     g.selectAll("multiSP-dots")
//       .data(data)
//       .enter().append("svg:circle")
//           .attr("cx", function (d,i) { return x(d[0]); } )
//           .attr("cy", function (d) { return y(d[1]); } )
//           .attr("r", 2)
//           .style("fill", "black")
//           .style("opacity", function(d) {return 0.2+0.8*(Math.log(d[2])-Math.log(minVal))/(Math.log(maxVal)-Math.log(minVal));});
          
// }

// function drawUnitYAxis(){

// }

// function drawUnitXAxis(){

// }