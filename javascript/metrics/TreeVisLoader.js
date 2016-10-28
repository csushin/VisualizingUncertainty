function TreeVisLoader(visDiv, paramDiv, childParamDiv, timeParamDiv, modalSelector, switcherSelector, totalMetric, treeTypeKeyword){
	this.visDiv = visDiv;
	this.paramDiv = paramDiv;
	this.childParamDiv = childParamDiv;
	this.timeParamDiv = timeParamDiv;
	this.modalSelector = modalSelector;
	this.switcherSelector = switcherSelector;
	this.totalMetric = totalMetric;
	this.treeTypeKeyword = treeTypeKeyword;
	this.mdalStat = [];
}	


TreeVisLoader.prototype.getStatInfo = function(metrics){
	metrics.forEach(function(element){
		$.ajax({
			url: "http://10.218.107.109:8080/waterDemo/services/getMetricStat?callback=?",
			dataType: "jsonp",
			data:{
				metric: element,
				year: $("#"+this.timeParamDiv).val(),
				modal: $("#"+this.modalSelector).val(),
				type: $("#"+this.switcherSelector).val()
			},
			error: function(){

			},
			success: function(data){
				console.log(data);
				var slider = document.getElementById(data.metric+"_Slider");
				var stat = {
					min: data.min,
					max: data.max
				}
				this.modalStat[data.metric] = stat;
				console.log(modalStat);
				slider.min = 0;//Math.floor(data.min);
				slider.max = 20;//Math.floor(data.max);
				slider.step = 1;//(Math.floor(data.max) - Math.floor(data.min))/100;
				slider.value = 10;//(Math.floor(data.max) - Math.floor(data.min))/2;
				if(data.metric.indexOf("Entropy")>-1 || data.metric.indexOf("CV")>-1){
					slider.min = data.min;
					slider.max = data.max;
					slider.step = (data.max - data.min)/20;
					slider.value = (data.max - data.min)/2;
				}
			}
		});
	});
}

TreeVisLoader.prototype.createTreeParamController = function(){
	$('#'+this.paramDiv).empty();
	var insetHeight = $('#'+this.paramDiv).height()/3.0;
	var insetWidth = $('#'+this.paramDiv).width()/3.0;
	$('#'+this.paramDiv).className = "list-group";
	this.totalMetric.forEach(function(each, index){
		var div = document.createElement("div");
		div.style.width = $('#'+this.paramDiv).width() + "px";
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
		    this.createTreeVis(this.totalMetric);
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
        	if(modaltype.indexOf("Modal")>-1)
            	subModalKeyword = $("#"+this.timeParamDiv).val();
        	else
            	subModalKeyword = $("#"+this.modalSelector).val();
			FuzzyThresholdLoader = new FuzzyThresholdImgLoader(modaltype, subModalKeyword, modaltype, fuzzyThresholdValues, fuzzyThresholdTF, true);
			console.log(FuzzyThresholdLoader);
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
			span.textContent = Math.pow(2, this.value);
			if(this.id.indexOf("Entropy")>-1 || this.id.indexOf("CV")>-1){
				span.textContent = parseFloat(this.value).toFixed(2);
			}
			this.createTreeVis(this.totalMetric);
		};

		div.appendChild(checkbox);
		div.appendChild(label);
		div.appendChild(dragSpan);
		div.appendChild(radiobtn);
		div.appendChild(slider);
		div.appendChild(span);
		

		$('#'+this.paramDiv).append(div);
	});
	this.createTreeVis(this.totalMetric);
	var sortableTreeParam = Sortable.create(document.getElementById(this.paramDiv), {
	  handle: '.glyphicon-move',
	  animation: 150,
	  dataIdAttr: function(){
	  	console.log(this);
	  	return "aa";
	  },
	  onEnd: function(){
	  	var order = this.toArray();
    	console.log($(this) , (order));
	  }
	});	
}

TreeVisLoader.prototype.initialize = function (totalMetric){
	// create metrics arary
	var children = $("#"+this.paramDiv).children;
	var checkedMetrics = ["root"];
	var thresholds = ["root"];
	totalMetric.forEach(function(each, index){
		var checkbox = document.getElementById(each+"_CheckBox");
		if(checkbox.checked){
			checkedMetrics.push(each);
			var slider = document.getElementById(each+"_Slider");
			if(each.indexOf("Entropy")<0 && each.indexOf("CV")<0){
				var actualValue = Math.pow(2, slider.value);
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
	var treedata = this.constructData(checkedMetrics, thresholds);
	this.drawtreediagram(treedata, checkedMetrics, thresholds);
}

TreeVisLoader.prototype.draw = function (treeData, levels, thresholds){
	$('#'+this.visDiv).empty();
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

		$('#'+this.visDiv).append(div);
	})


	// draw tree diagram
	var margin = {top: 0, right: 120, bottom: 20, left: 70},
	width = $('#'+this.visDiv).width() - margin.right - margin.left,
	height = $('#'+this.visDiv).height() - margin.top - margin.bottom;

	var i = 0,
	duration = 750,
	root;

	var tree = d3.layout.tree()
	.size([height, width]);

	var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select('#'+this.visDiv).append("svg")
	.attr("position", "absolute")
	.attr("width", width + margin.right + margin.left)
	.attr("height", (height + margin.top + margin.bottom)*0.9)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	root = treeData[0];
	root.x0 = height / 2.0;
	root.y0 = 0;
	

	update(root);

	d3.select(self.frameElement).style("height", $('#'+this.visDiv).width() + "px");

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

TreeVisLoader.prototype.listener = function(){
	$('#'+this.switcherSelector).on('change', function(e){
        var val = $('#swictherSelector').val();
        if(val.indexOf("Modal")>-1){
        	var year = $("#timeSlider").val();
            treeTypeKeyword = year;
            totalMetric = ["ModalMean", "ModalStd", "ModalEntropy", "ModalCV"];
            getStatInfo(totalMetric);
            createTreeParam();
        	$("#"+this.timeParamDiv).css("display", "block");
        	$("#ModalYearText").css("display", "block");
            $("#modalSelector").css("display", "none");
        }
        else{
        	console.log("triggered");
            treeTypeKeyword = $("#modalSelector").val();
            totalMetric = ["TimeMean", "TimeStd", "TimeEntropy", "TimeCV"];
            getStatInfo(totalMetric);
            createTreeParam();
            $("#ModalYearText").css("display", "none");
        	$("#timeSlider").css("display", "none");
            $("#modalSelector").css("display", "block");
        }
    });

    $('#modalSelector').on('change', function(e){
        treeTypeKeyword = $('#modalSelector').val();
        getStatInfo(totalMetric);
        createTreeParam();
    });
}

	function updateYearTextInput(value){
		$("#ModalYearText").html(value);
	}
}

TreeVisLoader.prototype.constructData = function (level, thresholds, index){
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