$(document).ready(function(){
	window.onresize = function(event){
		if(ensembleTab){
			
		}
		else{
			var modalType =  $("#swictherSelector").val();
			var totalMetric = [modalType+"Mean", modalType+"Std", modalType+"Entropy", modalType+"CV", modalType+"IQR", modalType+"Skewness", modalType+"Kurtosis"];
			if(document.querySelector('input[name="switchView"]:checked').value == 0){
	            createElementsForOverview();
	            if($("#showHistChecked").is(':checked'))
	            	drawOverviewHistograms(0);
	            if($("#showMapChecked").is(':checked'))
	        		drawOverviewMaps();
	        }
	        else{
				createTreeParam();
				createTreeVis(totalMetric);
				initializeScatterplot("scatterplotDiv");        	
	        }			
		}
	}
	var modalType =  $("#swictherSelector").val();
	totalMetric = [modalType+"Mean", modalType+"Std", modalType+"Entropy", modalType+"CV", modalType+"IQR", modalType+"QuadraticScore", modalType+"Median", modalType+"Skewness", modalType+"Kurtosis"];
	createTreeParam();
	getStatInfo(totalMetric)
	initializeScatterplot("scatterplotDiv");
	drawFuzzySlider();
	listenTreeParamSwitcher();
	listenModalSelector();
	listenScatterplotSelectBox();
	createElementsForOverview();
	overViewInitialized = true;
	$("#head").text(function(){
        if(globalDataType == "pr_HIST")
        	return "Precipitation";
        if(globalDataType == "tasmin_HIST")
        	return "TemperatureMin";
    });
	listenMapParamSelector();
	listenEnsembleMaps();
	listenScatterplotSelector();
	listenMapClick();
	listenSimilaritySelect();
	listenDblSimilarityMap();
    $('#MultiEnsembleTab a').click(function (e) {
  		e.preventDefault();
  		console.log("clicked!");
  		ensembleTab = true;
  		singleTab = false;
  		getEnsembleScatterData();
  		
	});
	$('#MultiEnsembleTab a').click(function (e) {
  		e.preventDefault();
  		console.log("clicked!");
  		ensembleTab = true;
  		singleTab = false;
  		getEnsembleScatterData();
  		
	});
	$('#ScatterMatrixTab a').click(function (e) {
  		// e.preventDefault();
  		console.log("clicked!");
  		getMultiScatterplotData($("#ScatterMatrixVariable").val());
	});
	$('#TransferFunctionTab a').click(function (e) {
  		// e.preventDefault();
  		// console.log("clicked!");
  		// getVHHistogramData();
	});
	$("#EnsembleClusteringTab a").click(function(e){
		setTimeout(continueExecution, 500); //wait ten seconds before continuing
		function continueExecution() {
			createensembleClstMap();
			initializeEnsembleMat("EnsembleClstMat", modelSet);
			drawLegend("EnsembleClstLegend");
		}
	});
	$("#addTFScatterPlot").on("click", function(e){
		var metricType = $("#TFMetricType").val();
		var dataType = $("#TFVariable").val();
		var scale = $("#TFScale").val();
		var dataKeyword = $("#TFKeywordSelect").val();
		addScatterPlot(metricType, dataType, scale, dataKeyword);
	});

	$("#clearAllScatterPlot").on("click", function(e){
		$("#TFScatterplotContainer").empty();
	});

	$("#ScatterMatrixVariable").on("change", function(e){
		$("#scatterMatrixViewContainer").empty();
		getMultiScatterplotData($("#ScatterMatrixVariable").val());
	})

});

function changeView(value){
	if(value == 0){
		$("#overview_showtype").css("display", "block");
		$("#detailView").css("display", "none")
		$("#overview").css("display", "block");
        drawOverviewMaps();       
        drawOverviewHistograms(0);
		$("#head").text("Overview");        
	}
	else{
		$("#overview_showtype").css("display", "none");
		$("#detailView").css("display", "block")
		$("#overview").css("display", "none");
		$("#head").text(function(){
        	if(globalDataType == "pr_HIST")
        		return "Precipitation";
        	if(globalDataType == "tasmin_HIST")
        		return "TemperatureMin";
        });
        initializeScatterplot("scatterplotDiv");
        getStatInfo(totalMetric);
        createTreeParam(); 
	}
}


