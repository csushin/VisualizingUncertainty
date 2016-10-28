function createTreeParam(){
	$('#modalParam').empty();
	var insetHeight = $('#modalParam').height()/3.0;
	var insetWidth = $('#modalParam').width()/3.0;
	$('#modalParam').className = "list-group";
	totalMetric.forEach(function(each, index){
		var div = document.createElement("div");
		div.style.width = $('#modalParam').width() + "px";
		div.style.height = insetHeight + "px";
		div.className = "list-group-item";
		div.id = each + "Div";

		var checkbox = document.createElement('input');
		checkbox.type = "checkbox";
		checkbox.checked = false;
		checkbox.id = each+"_CheckBox";
		var label = document.createElement('label')
		label.htmlFor = checkbox.id;
		label.appendChild(document.createTextNode(each));
        checkbox.onclick = function(){
		    // if(this.checked) {
		    createTreeVis(totalMetric);
		    // }
		};

		var radiobtn = document.createElement("input");
		radiobtn.type = "radio";
		radiobtn.name = "rdbtnforFuzzyThresholds";
		radiobtn.id = each+"_rdbtnforFuzzyThresholds";
		radiobtn.style.float = "right";
		radiobtn.onclick = function(){
			var modaltype = this.id.substring(0, this.id.indexOf("_"));
        	var subModalKeyword;
        	if(modaltype.indexOf("Model")>-1)
            	subModalKeyword = $("#timeSlider").val();
        	else
            	subModalKeyword = $("#modalSelector").val();
			FuzzyThresholdLoader = new FuzzyThresholdImgLoader(modaltype, subModalKeyword, modaltype, fuzzyThresholdValues, fuzzyThresholdTF, true);
			console.log(modalStat);
			FuzzyThresholdLoader.updateMinMax("Slider-range", modalStat[modaltype].min, modalStat[modaltype].max);
		}

		var dragSpan = document.createElement("span");
		dragSpan.className = "glyphicon glyphicon-move";
		dragSpan.setAttribute("aria-hidden", true);
		dragSpan.align = "right";

		var slider = document.createElement("input");
		slider.type = "range";
		slider.min = 0;
		slider.max = 20;
		slider.step = 1;
		slider.value = 10;
		slider.id = each +"_Slider";

		var span = document.createElement("span");
		span.textContent = slider.value;
		span.id = each+"_Span";
		slider.onchange = function(value){
			// span.textContent = Math.pow(2, this.value);
			// if(this.id.indexOf("Entropy")>-1 || this.id.indexOf("CV")>-1){
			// 	span.textContent = parseFloat(this.value).toFixed(2);
			// }
			span.textContent = parseFloat(this.value).toFixed(2);
			createTreeVis(totalMetric);
		};

		div.appendChild(checkbox);
		div.appendChild(label);
		div.appendChild(dragSpan);
		div.appendChild(radiobtn);
		div.appendChild(slider);
		div.appendChild(span);
		

		$('#modalParam').append(div);
	});
	createTreeVis(totalMetric);
	var sortableTreeParam = Sortable.create(document.getElementById("modalParam"), {
	  handle: '.glyphicon-move',
	  animation: 150,
	  dataIdAttr: function(){
	  	console.log(this);
	  	return "aa";
	  },
	  onEnd: function(){
    	console.log();
    	d3.selectAll(".list-group-item")[0].map(function(d, i){
			totalMetric[i] = d.id.replace("Div", "");
    	});
    	console.log("new total is : " + totalMetric);
    	createTreeVis(totalMetric);
	  }
	});
    
}

function createTreeVis(totalMetric){
	var children = $('#modalParam').children;
	var checkedMetrics = ["root"];
	var thresholds = ["root"];
	totalMetric.forEach(function(each, index){
		var checkbox = document.getElementById(each+"_CheckBox");
		if(checkbox.checked){
			checkedMetrics.push(each);
			var slider = document.getElementById(each+"_Slider");
			if(each.indexOf("Entropy")<0 && each.indexOf("CV")<0){
				var actualValue = slider.value;
				if(actualValue>=modalStat[each].max)
					actualValue = modalStat[each].max;
				if(actualValue<=modalStat[each].min)
					actualValue = modalStat[each].min;
				thresholds.push(parseFloat(actualValue).toFixed(2));
			}
			else{
				thresholds.push(parseFloat(slider.value).toFixed(2));
			}
		}
	})
	if(checkedMetrics.length == 0 || thresholds.length == 0)
		 alert("Please select at least one metric.");
	var treedata = constructData(checkedMetrics, thresholds);
	drawtreediagram(treedata, checkedMetrics, thresholds);
}

function drawtreediagram(treeData, levels, thresholds){
	$('#treeVis').empty();
	console.log("level lengt is : " + levels.length);
	console.log("thresholds are : " + thresholds.length);
	var circleDelta = $('#treeVis').width()/levels.length*0.95;

	levels.forEach(function(element, index){
		var div = document.createElement("div");
		div.style.background = "#D3D3D3";
		div.innerHTML = element + "(" + thresholds[index] + ")";
		div.style.left = circleDelta*index;
		div.style.top = 0;
		div.style.width = $('#treeVis').width()/(levels.length)*0.985 + "px";
		div.style.float = "left";
		div.style.border = "thick solid #FFFFFF";
		div.id = "treeLegend";

		$('#treeVis').append(div);
	})


	// draw tree diagram
	var margin = {top: 0, right: 120, bottom: 20, left: 70},
	width = $('#treeVis').width() - margin.right - margin.left,
	height = $('#treeVis').height() - margin.top - margin.bottom;

	var i = 0,
	duration = 750,
	root;

	var tree = d3.layout.tree()
	.size([height, width]);

	var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("#treeVis").append("svg")
	.attr("position", "absolute")
	.attr("width", width + margin.right + margin.left)
	.attr("height", (height + margin.top + margin.bottom)*0.9)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	root = treeData[0];
	root.x0 = height / 2.0;
	root.y0 = 0;
	

	update(root);

	d3.select(self.frameElement).style("height", $('#treeVis').width() + "px");

	function update(source) {
	// Compute the new tree layout.
	  var nodes = tree.nodes(root).reverse(),
		  links = tree.links(nodes);
	// Normalize for fixed-depth.
  	  nodes.forEach(function(d) { d.y = d.depth * circleDelta; });
  	  // Update the nodes…
  	  var node = svg.selectAll("g.node")
	  	.data(nodes, function(d) { return d.id || (d.id = ++i); });
	  	// Enter any new nodes at the parent's previous position.
	  var nodeEnter = node.enter().append("g")
		  .attr("class", "node")
		  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
		  .on("click", click);

	  nodeEnter.append("circle")
		  .attr("r", 1e-6)
		  .style("fill", function(d) { console.log(d._children);return d._children ? "lightsteelblue" : "#fff"; })
		  .on("click", function(d){
		  	var tffunction = {};
		  	d3.select(this.parentNode.parentNode).selectAll("circle").each(function(d){
		  		var name = d.name.split("_")[1];
		  		if(d.name=="root")
		  			name = -1;
		  		tffunction[name] = d3.select(this).style("fill");
		  	});
		  	console.log(tffunction);
		  	uploadTransferFunction(tffunction, levels, thresholds);
		  });

	  nodeEnter.append("text")
		  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
		  .attr("dy", ".35em")
		  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
		  .text(function(d) { return d.text; })
		  .style("fill-opacity", 1e-6);

	  // Transition nodes to their new position.
	  var nodeUpdate = node.transition()
		  .duration(duration)
		  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

	  nodeUpdate.select("circle")
		  .attr("r", 10)
		  .style("stroke", "gray")
		  .style("stroke-width", 2)
		  .style("fill", function(d) { 
		  	if(d._children)
		  		return "lightsteelblue";
		  	else{
		  		if(d.id==12)
		  			return  "#a6cee3";
		  		else if(d.id==11)
		  			return "#1f78b4";
		  		else if(d.id==9)
		  			return "#b2df8a";
		  		else if(d.id==8)
		  			return "#33a02c";
		  		else if(d.id==5)
		  			return "#fb9a99";
		  		else if(d.id==4)
		  			return "#e31a1c";
		  		else if(d.id==2)
		  			return "#fdbf6f";
		  		else if(d.id==1)
		  			return "#ff7f00"
		  		else
		  			return "#fff";
		  	}
		  });

	  nodeUpdate.select("text")
		  .style("fill-opacity", 1);

	  // Transition exiting nodes to the parent's new position.
	  var nodeExit = node.exit().transition()
		  .duration(duration)
		  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
		  .remove();

	  nodeExit.select("circle")
		  .attr("r", 1e-6);

	  nodeExit.select("text")
		  .style("fill-opacity", 1e-6);

	  // Update the links…
	  var link = svg.selectAll("path.link")
		  .data(links, function(d) { return d.target.id; });

	  // Enter any new links at the parent's previous position.
	  link.enter().insert("path", "g")
		  .attr("class", "link")
		  .attr("d", function(d) {
			var o = {x: source.x0, y: source.y0};
			return diagonal({source: o, target: o});
		  });

	  // Transition links to their new position.
	  link.transition()
		  .duration(duration)
		  .attr("d", diagonal);

	  // Transition exiting nodes to the parent's new position.
	  link.exit().transition()
		  .duration(duration)
		  .attr("d", function(d) {
			var o = {x: source.x, y: source.y};
			return diagonal({source: o, target: o});
		  })
		  .remove();

	  // Stash the old positions for transition.
	  nodes.forEach(function(d) {
		d.x0 = d.x;
		d.y0 = d.y;
	  });

	}

		// Toggle children on click.
	function click(d) {
	  if (d.children) {
		d._children = d.children;
		d.children = null;
	  } else {
		d.children = d._children;
		d._children = null;
	  }
	  update(d);
	}
}

// function constructData(levels, thresholds, index){
// 		var curLayer = [];
// 		if(index == 0){
// 			curLayer.push({
// 				"name": levels[index],
// 				"parent": "null",
// 				"text": level[index],
// 				"children": constructData(levels[index+1], thresholds[index+1], index+1)
// 			});
// 			return curLayer;
// 		}
// 		else {
// 			curLayer.push({

// 			});
// 		}	
// 	}
// }

function constructData(level, thresholds, index){
	var treeData = [
	  {
	    "name": level[0],
	    "parent": "null",
	    "text": level[0],
	    "children": [
	      {
	        "name": level[1] + "_0",
	        "parent": level[0],
	        "level": level[1],
	        "text": "< " + thresholds[1],
	        "children": [
	          {
	            "name": level[2] + "_00",
	            "parent": level[1] + "_0",
	            "level": level[2],
	            "text": "< " + thresholds[2],
	            "children": [
	            	{
	            		"name": level[3] + "_000",
	            		"parent": level[2] + "_00",
	            		"text": "< " + thresholds[3],
	            		"level": level[3]
	            	},
	            	{
	            		"name": level[3] + "_001",
	            		"parent": level[2] + "_00",
	            		"text": "> " + thresholds[3],
	            		"level": level[3]
	            	}
	            ]
	          },
	          {
	            "name": level[2] + "_01",
	            "parent": level[1] + "_0",
	            "level": level[2],
	            "text": "> " + thresholds[2],
	            "children": [
	            	{
	            		"name": level[3] + "_010",
	            		"parent": level[2] + "_01",
	            		"text": "< " + thresholds[3],
	            		"level": level[3]
	            	},
	            	{
	            		"name": level[3] + "_011",
	            		"parent": level[2] + "_01",
	            		"level": level[3],
	            		"text": "> " + thresholds[3],
	            	}
	            ]
	          }
	        ]
	      },
	      {
	        "name":  level[1] + "_1",
	        "parent": level[0],
	        "level": level[1],
	        "text": "> " + thresholds[1],
	        "children": [
	          {
	            "name": level[2] + "_10",
	            "parent": level[1] + "_1",
	            "text": "< " + thresholds[2],
	            "level": level[2],
	            "children": [
	            	{
	            		"name": level[3] + "_100",
	            		"parent": level[2] + "_10",
	            		"text": "< " + thresholds[3],
	            		"level": level[3]
	            	},
	            	{
	            		"name": level[3] + "_101",
	            		"parent": level[2] + "_10",
	            		"text": "> " + thresholds[3],
	            		"level": level[3]
	            	}
	            ]
	          },
	          {
	            "name": level[2] + "_11",
	            "parent": level[1] + "_1",
	            "text": "> " + thresholds[2],
	            "level": level[2],
	            "children": [
	            	{
	            		"name": level[3] + "_110",
	            		"parent": level[2] + "_11",
	            		"text": "< " + thresholds[3],
	            		"level": level[3]
	            	},
	            	{
	            		"name": level[3] + "_111",
	            		"parent": level[2] + "_11",
	            		"text": "> " + thresholds[3],
	            		"level": level[3]
	            	}
	            ]
	          }
	        ]
	      }
	    ]
	  }
	];
	return treeData;
}

// function upload transfer function table to the backend
function uploadTransferFunction(tffunction, levels, thresholds){
	var zoomLevel = map.getZoom();
	var mapPixelOrigin = map.getPixelOrigin().x + "," + map.getPixelOrigin().y;
	console.log("transfer function is : ", tffunction);
	console.log("levels is : ", levels);
	console.log("thresholds is : ", thresholds);
	$("#blurringlayer").css("display", "block");
	$.ajax({
		// url: "https://watersvr.dtn.asu.edu:8443/waterDemo/services/drawTreeVis?callback=?",
		url: httpDomain + "waterDemo/services/drawTreeVis?callback=?",
		dataType: "jsonp",
		data:{
	    	tfFunction: JSON.stringify(tffunction),
	    	levels: levels.join(","),
	    	thresholds: thresholds.join(","),
	    	mapPixelOrigin: mapPixelOrigin,
	    	zoomLevel: 7,
	    	treeKeyword: $('#swictherSelector').val().indexOf("Model")>-1?$("#timeSlider").val():$("#modalSelector").val(),
	    	dataType: globalDataType
	    },
	    error: function(){
	    },
	    success: function(data){
	    	console.log("Get image string!");
	    	var imgSrc = "data:image/png;base64," + data.imgStr;
	    	$("#blurringlayer").css("display", "none");
	    	if(overlay)
	    		map.removeLayer(overlay);
	    	overlay = L.imageOverlay(imgSrc, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(map);
	    	
	    }
	})
}