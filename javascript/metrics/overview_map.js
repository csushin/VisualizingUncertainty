function drawEnsembleMaps(){
	var cellType = "map";
	var zoomLevel = "4";
	var colorTable = ['rgb(236,226,240)','rgb(208,209,230)','rgb(166,189,219)','rgb(103,169,207)','rgb(54,144,192)','rgb(2,129,138)','rgb(1,108,89)','rgb(1,70,54)'];
	if(document.querySelector('input[name="switchView"]:checked').value == 0){
        var type = $('#swictherSelector').val();
        var key;
        if(type.indexOf("Model")>-1)
            key = $("#timeSlider").val();
        else
            key = $("#modalSelector").val();
        for(var i=0; i<metriclist.length; i++){
        	if(metriclist[i] == "Area"){
        		var divname = metriclist[i] + datatype[j] + "HistDiv_Map";
                $("#"+divname).css("display", "none");
				$("#"+divname.replace("Map", "Histogram")).css("display", "block");    
            }
            else{
            	if(metriclist[i].indexOf("Text")<=-1){
	        		indexMapData(metriclist[i], "Ensemble", type, key, zoomLevel, colorTable);
            	}
            }
        }
    }
}

function drawOverviewMaps(){
	var cellType = "map";
	var zoomLevel = "4";
	var colorTable = ['rgb(236,226,240)','rgb(208,209,230)','rgb(166,189,219)','rgb(103,169,207)','rgb(54,144,192)','rgb(2,129,138)','rgb(1,108,89)','rgb(1,70,54)'];
	if(document.querySelector('input[name="switchView"]:checked').value == 0){
        var type = $('#swictherSelector').val();
        var key;
        if(type.indexOf("Model")>-1)
            key = $("#timeSlider").val();
        else
            key = $("#modalSelector").val();
        for(var i=0; i<metriclist.length; i++){
        	for(var j=0; j<datatype.length; j++){
        		if(metriclist[i] == "Area"){
        			var divname = metriclist[i] + datatype[j] + "HistDiv_Map";
                   	$("#"+divname).css("display", "none");
					$("#"+divname.replace("Map", "Histogram")).css("display", "block");    
                }
                else{
	        		if(metriclist[i].indexOf("Text")<=-1 && metriclist[i].indexOf("Ensemble")<=-1 && datatype[j].indexOf("Others")<=-1){
	        			if(cellType == "map"){
	        				indexMapData(metriclist[i], datatype[j], type, key, zoomLevel, colorTable);
	        			}
	        		}
                }

        	}
        }
    }
}

function indexMapData(metric, datatype, modaltype, key, zoomLevel, colorTable){
	var divname = metric+datatype+"HistDiv_Map";
	// add a transparent cover on a div
	$("<div></div>").css({
	    position: "absolute",
	    width: "100%",
	    height: "100%",
	    top: 0,
	    left: 0,
	    /* black for browsers which cannot support rgba */
  		backgroundColor: "#000",
  		/* 70% opacity for supported browsers */
  		backgroundColor: "rgba(0, 0, 0, 0.6)"
	}).appendTo($("#"+divname).css("position", "relative"));
	$.ajax({
		url: httpDomain + "waterDemo/services/getMapData?callback=?",
		dataType: "jsonp",
		data:{
			metricType: metric,
			dataType: datatype,
			modalType: modaltype,
			key: key,
			zoomLevel: zoomLevel,
			colorTable: colorTable.join("&"),
			min: globalMeanMinMax[metric][datatype][0],
      		max: globalMeanMinMax[metric][datatype][1],
			variable: $("#EnsembleVariableDropdown").val() 
		},
		error: function(){
			console.log("error in getting histogram data");
		},
		success: function(data){
			imgSet[key];
			var divname = metric+datatype+"HistDiv_Map";
			var imgSrc = "data:image/png;base64," + data.imgStr;
			$("#"+divname).empty();
			var imgHeight = 0.9*$("#"+divname).height();
			var imgWidth = 3600*imgHeight/2640;
			var img = new Image(imgWidth, imgHeight);
			img.src = imgSrc;
			var hWide = imgWidth/8; //half the image's width
  			var hTall = imgHeight/8; //half the image's height, etc.
			// $(img).css("background-image", "url('" + imgSrc.replace(/(\r\n|\n|\r)/gm, "") + "')");
			$("#"+divname).append(img);
			$("#"+divname + " img").css("margin-left", hWide);
			$("#"+divname + " img").css("margin-top", hTall);
			// $("#"+divname).css("display", "block");
			// $("#"+metric+datatype+"HistDiv_Histogram").css("display", "none");
			// console.log(metric+datatype+" Finished!");

		}
	})
}