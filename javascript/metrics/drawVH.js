$("#addTFScatterPlot").on("click", function(e){
	var metricType = $("#TFMetricType").val();
	var dataType = $("#TFVariable").val();
	var scale = $("#TFScale").val();
	var dataKeyword = $("#TFKeywordSelect").val();
	addScatterPlot(metricType, dataType, scale, dataKeyword);
});

$("#clearAllScatterPlot").on("click", function(e){
	$("#TFScatterplotChildContainer").empty();
});

function addScatterPlot(metricType, dataType, scale, dataKeyword){
	var width = $("#TFScatterplotChildContainer").width(),
		height = $("#TFScatterplotChildContainer").height(),
		xpadding = $("#TFScatterplotChildContainer").width()/50,
		ypadding = $("#TFScatterplotChildContainer").height()/50;
	var div = document.createElement("div");
	var unitWidth = width/4.0*0.95;//>400?width/4.0:400;
	// var unitHeight = height/4.0>400?height/4.0:400;
	div.style.width = unitWidth + "px";
	div.style.height = unitWidth + "px";
	div.style.border = "1px dotted";
	div.style.float = "left";
	div.id = metricType + "_" + dataType + "_" + scale + "_" + dataKeyword;
	
	$("#TFScatterplotChildContainer").append(div);
	
	getVHHistogramData(div.id, metricType, dataType, scale, dataKeyword)
}

function getVHHistogramData(container, metricType, dataType, scale, dataKeyword){
	scale = scale.indexOf("Log")>-1?"true":"false";
	$.ajax({
		url: httpDomain+ "waterDemo/services/getVHData?callback=?",
		dataType: "jsonp",
		data:{
			dataLevel: metricType,
			dataNameKeyword: dataKeyword,
			dataType: dataType,
			scale: scale,
			derivative: "first"
		},
		error: function(){
			console.log("error in getting map data");
		},
		success: function(data){
			drawVHHistogram(data, container);
			var title = document.createElement("p");
			var textNode = document.createTextNode(metricType + "_" + dataType + "_" + scale + "_" + dataKeyword);
			title.appendChild(textNode);
			$("#"+container).append(title);
		}
	});
}

function drawVHHistogram(data, container){
	d3.select("#"+container+" svg").remove();

	var width = $("#"+container).width(),
	height = $("#"+container).height(),
	margin = {
		top: 50, right: 10, bottom: 30, left: 30
	};
	var xminmax = d3.extent(data, function(d) { return d.x; });
	var yminmax = d3.extent(data, function(d) { return d.y; });
	var amountminmax = d3.extent(data, function(d) { return d.amount; });

	var x = d3.scale.linear().domain([xminmax[0], xminmax[1]]).range([0, width-margin.left-margin.right]);
	var y = d3.scale.linear().domain([yminmax[0], yminmax[1]]).range([height-margin.top-margin.bottom, 0]);

	var svg = d3.select("#"+container).append("svg:svg")
	.attr("width", width)
	.attr("height", height);

	var g = svg.append("g")
	.attr("transform", "translate("+margin.left+","+margin.top+")")
    .attr("width", width-margin.left-margin.right)
    .attr("height", height-margin.top-margin.bottom);


 //    var tip = d3.tip()
	//   .attr('class', 'd3-tip')
	//   .offset([-10, 0])
	//   .html(function(d) {
	//   		return  "<p>Value:</p>" + d.x + 
	//   				"<p>Gradient: "+ d.y + 
 //      				"<p>Amount: " + d.amount;
	// });

	// var brush = d3.svg.polybrush()
 //    .x(d3.scale.linear().range([0, width]))
 //    .y(d3.scale.linear().range([0, height]))
 //    .on("brushstart", function() {
 //      svg.selectAll(".selected").classed("selected", false);
 //    })
 //    .on("brush", function() {
 //      // set the 'selected' class for the circle
 //      svg.selectAll(".dots").classed("selected", function(d) {
 //        //get the associated circle
 //        // var id = d3.select(this).attr("id");
 //        // var i = id.substr(id.indexOf("-")+1, id.length);
 //        // var vornoi = d3.select("#path-"+i);
 //        // // set the 'selected' class for the path
 //        // if (brush.isWithinExtent(d[0], d[1])) {
 //        //   vornoi.classed("selected", true);
 //        //   return true;
 //        // } else {
 //        //   vornoi.classed("selected", false);
 //        //   return false;
 //        // }
 //      });
 //    });


	// svg.call(tip);

    dotg = g.append("svg:g")
    .selectAll(".dots")
      .data(data)
      .enter().append("svg:circle")
          .attr("cx", function (d) { return x(d.x); } )
          .attr("cy", function (d) { return y(d.y); } )
          .attr("r", 2)
          .style("fill", function(d) { if(d.amount <=1 ) return "white"; else return "black";})
          .style("opacity", function(d) {return 0.1+0.9*(Math.log(d.amount)-Math.log(amountminmax[0]))/(Math.log(amountminmax[1])-Math.log(amountminmax[0]));})
          // .on("mouseover", function(d){
          // 	tip.show(d);
          // })
          // .on("mouseout", tip.hide);

    // svg.append("svg:g")
    // .attr("class", "brush")
    // .call(brush);

	
}