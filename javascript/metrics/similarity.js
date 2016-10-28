function listenSimilaritySelect(){
	$("#MaxMinSimilaritySelect").on("change", function(e){
		if(this.value.indexOf("ByThresholds")>-1){
			if(this.value.indexOf("Count")>-1 || this.value.indexOf("Index")>-1){
				
				if($("#SimilarityMeasuresSelect").val() == "L1Norm"){
					$('#SimilarityThdSlider').attr('min', 0);
					$('#SimilarityThdSlider').attr('max', 108);
					$('#SimilarityThdSlider').attr('step', 2);
				}
				else if($("#SimilarityMeasuresSelect").val() == "CosinePlusL1Norm"){
					$('#SimilarityThdSlider').attr('min', 0);
					$('#SimilarityThdSlider').attr('max', 2.0);
					$('#SimilarityThdSlider').attr('step', 0.1);
				}
			}
			$("#SimilarityThreshold").css("display", "block");
			$("#SimilarityColorMapping").css("display", "none");
			$("#SimilarityLegend").empty();
			var unitWidth = $("#SimilarityLegend").width()/modelSet.length;
			var arrays = d3.range(0,18);	
			var color = d3.scale.category20().domain(d3.range(0,18));
			for(var i=0; i<arrays.length; i++){
				var div = document.createElement("div");
				div.style.backgroundColor = color(i);
				div.style.width = unitWidth+"px";
				div.style.height = $("#SimilarityLegend").height()+"px";
				div.style.float = "left";
				var para = document.createElement("p");
				var node = document.createTextNode(arrays[i]);
				para.style.color ="#FFFFFF";
				para.appendChild(node);
				div.appendChild(para);
				$("#SimilarityLegend").append(div);
			}
		}
		else{
			$("#SimilarityThreshold").css("display", "none");
			$("#SimilarityColorMapping").css("display", "block");
		}
	});	
	
}

function loadHCTreeSimilarityMap(){
	var similarityColor = ['255', '0', '0'];
	$.ajax({
			url: httpDomain+ "waterDemo/services/HCTreeSimilarityMap?callback=?",
			dataType: "jsonp",
			data:{
				colorTable: similarityColor.join("&"),
				zoomLevel: "7",
				alpha: 200,
				dataType: $("#dataTypeSelect").val(),
				changingColor: 1//represent Red
			},
			error: function(){},
			success: function(data){
				var imgSrc = "data:image/png;base64," + data.imgStr;
				if(treeSimilarityOverlay != null)
					similarityMap.removeLayer(treeSimilarityOverlay);
				treeSimilarityOverlay = L.imageOverlay(imgSrc, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(similarityMap);
			}
	});
}

function loadHCTreeBalanceMap(){
	var balanceColor = ['rgb(255,255,217)','rgb(237,248,177)','rgb(199,233,180)','rgb(127,205,187)','rgb(65,182,196)','rgb(29,145,192)','rgb(34,94,168)','rgb(37,52,148)','rgb(8,29,88)']
	$.ajax({
			url: httpDomain+ "waterDemo/services/drawHCTreeBalanceMap?callback=?",
			dataType: "jsonp",
			data:{
				colorTable: balanceColor.join("&"),
				zoomLevel: "7",
				alpha: 200,
				dataType: $("#dataTypeSelect").val(),
			},
			error: function(){},
			success: function(data){
				var imgSrc = "data:image/png;base64," + data.imgStr;
				similarityMap.removeLayer(similarityMapOverlay);
				if(treeBalanceOverlay != null)
					similarityMap.removeLayer(treeBalanceOverlay);
				treeBalanceOverlay = L.imageOverlay(imgSrc, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(similarityMap);
				// add legend for balance map
				$("#SimilarityLegend").empty();
				var min = parseInt(data.min);
				var max = parseInt(data.max);
				// min = 2; max = 10;
				unitWidth = $("#SimilarityLegend").width()/(max - min + 1);
				unitWidth*=0.99;
				for(var i=0; i<max-min+1; i++){
					var div = document.createElement("div");
					div.style.backgroundColor = balanceColor[i];
					div.style.width = unitWidth+"px";
					div.style.height = $("#SimilarityLegend").height()+"px";
					div.style.float = "left";
					if(unitWidth<150){
						div.title = min+i;
					}
					else{
						var para = document.createElement("p");
						var node = document.createTextNode(min+i);
						para.style.color ="#fc4e2a";
						para.style.fontSize ="large";
						para.appendChild(node);
						div.appendChild(para);
					}
					$("#SimilarityLegend").append(div);
				}
				loadHCTreeSimilarityMap();
			}
	});	
}

function changeSimilarityThreshold(value){
	$('#SimilarityThdSliderLabel').text("Value: " + value);
}

function switch2SimilarityColor(value){
	$("#SimilarityLegend").empty();
	var color;
	var unitWidth;
	var arrays;
	if(value == "GCM"){
		unitWidth = $("#SimilarityLegend").width()/GCM.length;
		color = d3.scale.category10().domain(d3.range(0,10));
		arrays = GCM;
		similarityColorType = "GCM";
		d3.selectAll(".similarityCircle").style("fill", function(d){
			var num = d.name.replace("O", "").replace("(leaf)", "").replace(" ", "");
			var ind = arrays.indexOf(modelSet[num].split("_")[0])
			return color(ind<0?0:ind);
		});
	}
	else if(value == "RCM"){
		unitWidth = $("#SimilarityLegend").width()/RCM.length;
		color = d3.scale.category10().domain(d3.range(0,5));
		arrays = RCM;
		similarityColorType = "RCM";
		d3.selectAll(".similarityCircle").style("fill", function(d){
			var num = d.name.replace("O", "").replace("(leaf)", "").replace(" ", "");
			var ind = arrays.indexOf(modelSet[num].split("_")[1])
			return color(ind<0?0:ind);
		});
	}
	else if(value=="All"){
		unitWidth = $("#SimilarityLegend").width()/modelSet.length;
		color = d3.scale.category20().domain(d3.range(0,18));
		arrays = modelSet;
		similarityColorType = "All";
		d3.selectAll(".similarityCircle").style("fill", function(d){
			var num = d.name.replace("O", "").replace("(leaf)", "").replace(" ", "");
			return color(num);
		});
	}
	unitWidth*=0.99;
	// else{
	// 	unitWidth = $("#SimilarityLegend").width()/modelSet.length;
	// 	color = d3.scale.category20().domain(d3.range(0,18));
	// 	arrays = modelSet;
	// 	similarityColorType = "All";
	// 	d3.selectAll(".similarityCircle").style("fill", function(d){
	// 		var num = d.name.replace("O", "").replace("(leaf)", "").replace(" ", "");
	// 		return color(num);
	// 	});
	// }

	for(var i=0; i<arrays.length; i++){
		var div = document.createElement("div");
		div.style.backgroundColor = color(i);
		div.style.width = unitWidth+"px";
		div.style.height = $("#SimilarityLegend").height()+"px";
		div.style.float = "left";
		if(unitWidth<150){
			div.title = arrays[i];
		}
		else{
			var para = document.createElement("p");
			var node = document.createTextNode(arrays[i]);
			para.style.color ="#FFFFFF";
			para.appendChild(node);
			div.appendChild(para);
		}
		$("#SimilarityLegend").append(div);
	}
}


function updateSimilarityMap(){
	var value = document.querySelector('input[name="SimilarityLegend"]:checked').value;
	var color;
	var colorBy = $("#MaxMinSimilaritySelect").val().indexOf("ByThresholds")>-1?$("#MaxMinSimilaritySelect").val():value;
	var similarityDis = $("#MaxMinSimilaritySelect").val().indexOf("ByThresholds")>-1?"MaximumDis":$("#MaxMinSimilaritySelect").val().replace("Distance", "Dis");
	if(value == "GCM"){
		color = d3.scale.category10().domain(d3.range(0,10));
	}
	else if(value == "RCM"){
		color = d3.scale.category10().domain(d3.range(0,10));
	}
	else{
		color = d3.scale.category20().domain(d3.range(0,17));
	}
	if($("#MaxMinSimilaritySelect").val()=="ByThresholds"){
		color = d3.scale.category20().domain(d3.range(0,17));
	}
	var rgbColors = [];
	for(var i=0; i<color.range().length; i++){
		rgbColors[i] = hexToRgb(color.range()[i]);
	}
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
	}).appendTo($("#SimilarityMap").css("position", "relative"));
	$.ajax({
			url: httpDomain+ "waterDemo/services/getSimilarityMapData?callback=?",
			dataType: "jsonp",
			data:{
				color: rgbColors.join("&"),
				colorBy: colorBy,
				dataType: $("#dataTypeSelect").val(),
				zoomLevel: "7",
				alpha: 200,
				shapeOnly: $("#ShapeDescriptorSelect").val() == "Only Moments"?"true":"false",
				similarityType: $("#SimilarityMeasuresSelect").val(),
				similarityDis: similarityDis,
				threshold: Number($("#SimilarityThdSlider").val()).toFixed(1)
			},
			error: function(){},
			success: function(data){
				d3.select("#coverEnsembleMap").remove();
				var imgSrc = "data:image/png;base64," + data.imgStr;
				if(similarityMapOverlay)
					similarityMap.removeLayer(similarityMapOverlay);
				similarityMapOverlay = L.imageOverlay(imgSrc, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(similarityMap);
				loadHCTreeBalanceMap();
			}
	});	

}

function listenDblSimilarityMap(){
	similarityMap.on("dblclick", function(e){
		similarityMap.doubleClickZoom.disable(); 
		var lat = e.latlng.lat,
			lng = e.latlng.lng;
		if(similarityMarker == undefined){
            similarityMarker = L.marker([lat, lng]).addTo(similarityMap);
            similarityMap.setView([lat, lng]);
        }
        else{
            similarityMarker.setLatLng([lat, lng]);
            similarityMarker.addTo(similarityMap);
        }
		$.ajax({
			url: httpDomain+ "waterDemo/services/getHCTreeHierarchy?callback=?",
			dataType: "jsonp",
			data:{
				lat: lat,
				lng: lng,
				dataType: $("#dataTypeSelect").val()
			},
			error: function(){},
			success: function(data){
				console.log(data);
				var treeStructureData = composeTreeData(data);
				drawSimilarityHCTree("SimilarityTree", treeStructureData);
			}
		});
	});
}



function composeTreeData(data){
	// var list = [];
	// for(var i=0; i<data.length; i++){
	// 	for(var j=0; j<data[i].length; j++){
	// 		list.push(data[i][j]);
	// 	}
	// }
	return buildHierarchy(data);
}

function buildHierarchy(arry) {

    var roots = [], children = {};

    // find the top level nodes and hash the children based on parent
    for (var i = 0, len = arry.length; i < len; ++i) {
        var item = arry[i],
            p = item.parent,
            target = p=="root" ? roots : (children[p] || (children[p] = []));

        target.push(item);
    }

    // function to recursively build the tree
    var findChildren = function(parent) {
        if (children[parent.name]) {
            parent.children = children[parent.name];
            for (var i = 0, len = parent.children.length; i < len; ++i) {
                findChildren(parent.children[i]);
            }
        }
    };

    // enumerate through to handle the case where there are multiple roots
    for (var i = 0, len = roots.length; i < len; ++i) {
        findChildren(roots[i]);
    }

    return roots;
}

function drawSimilarityHCTree(divName, treeData){
	if(d3.selectAll(".similarityCircle").length<=0){
		root = treeData[0];
		update(root);
	}
	else{
		$("#"+divName).empty();
	 	var margin = {top: 40, right: 20, bottom: 20, left: 0},
		width = $("#"+divName).width() - margin.right - margin.left,
		height = $("#"+divName).height() - margin.top - margin.bottom;
		
		var i = 0, duration = 750;

		var tree = d3.layout.tree()
		.size([height, width]);

		var diagonal = d3.svg.diagonal()
		.projection(function(d) { return [d.x, d.y]; });

		var svg = d3.select("#"+divName).append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		root = treeData[0];
	    
		update(root);
	}
	

	function update(source) {

		// Compute the new tree layout.
		var nodes = tree.nodes(root).reverse(),
		  links = tree.links(nodes);

		// Normalize for fixed-depth.
		nodes.forEach(function(d) { d.y = d.depth * 70; });

		// Declare the nodes…
		var node = svg.selectAll("g.node")
		  .data(nodes, function(d) { return d.id || (d.id = ++i); });

		// Enter the nodes.
		var nodeEnter = node.enter().append("g")
		  .attr("class", "node")
		  .attr("transform", function(d) { 
			  return "translate(" + d.x + "," + d.y + ")"; });

		nodeEnter.append("circle")
		  .attr("r", 10)
		  .style("fill", function(d){
		  	if(d.name.indexOf("clstr")>-1){
		  		return "#d9d9d9";
		  	}
		  	else{
		  		var color, index;
		  		var modelIndex = d.name.replace("O", "").replace("(leaf)", "").replace(" ", "");
		  		if(similarityColorType=="GCM"){
		  			color = d3.scale.category10().domain(d3.range(0,10));
		  			index = GCM.indexOf(modelSet[modelIndex].split("_")[0]);
		  		}
		  		else if(similarityColorType=="RCM"){
		  			color = d3.scale.category10().domain(d3.range(0,5));
		  			index = RCM.indexOf(modelSet[modelIndex].split("_")[1]);
		  		}
		  		else{
		  			color = d3.scale.category20().domain(d3.range(0,18));
		  			index = modelIndex;
		  		}
		  		return color(index);
		  	}
		  })
		  .classed("similarityCircle", function(d){
		  	if(d.name.indexOf("clstr")>-1)
		  		return false;
		  	else
		  		return true;
		  })
		  .append("svg:title")
   		  .text(function(d) { 
   		  	if(d.name.indexOf("clstr")<0){
		  		var index = d.name.replace("O", "").replace("(leaf)", "").replace(" ", "");
		  		return modelSet[index]; 
		  	}
   		  });

		nodeEnter.append("text")
		  .attr("y", function(d) { 
			  return d.children || d._children ? -18 : 18; })
		  .attr("dy", ".35em")
		  .attr("text-anchor", "middle")
		  .text(function(d) { 
		  	if(d.name.indexOf("clstr")<0){
		  		var index = d.name.replace("O", "").replace("(leaf)", "").replace(" ", "");
		  		return "M" + index; 
		  	}
		  })
		  .style("fill-opacity", 1);

		// Declare the links…
		var link = svg.selectAll("path.link")
		  .data(links, function(d) { return d.target.id; });

		// Enter the links.
		link.enter().insert("path", "g")
		  .attr("class", "link")
		  .attr("d", diagonal);

	}
}