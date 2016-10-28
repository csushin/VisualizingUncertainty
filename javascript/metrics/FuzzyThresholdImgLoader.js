function FuzzyThresholdImgLoader(modaltype, keywords, metricstype, thresholds, tffunction, initialized){
    this.modaltype = modaltype;
    this.metricstype = metricstype;
    this.keywords = keywords;
    this.thresholds = thresholds;
    this.tfFunction = tffunction;
    this.initialized = initialized;
    // this.mapPixelOrigin = mapPixelOrigin;
}

FuzzyThresholdImgLoader.prototype.draw = function(){
	$("#blurringlayer").css("display", "block");
    $.ajax({
    	url: httpDomain + "waterDemo/services/drawFuzzyThresholdMap?callback=?",
    	dataType: "jsonp",
    	data:{
    		modaltype: this.modaltype,
    		keywords: this.keywords,
    		metricstype: this.metricstype,
    		thresholds: this.thresholds.join("&"),
    		tfFunction: this.tfFunction.join("&"),
    		zoomLevel: 7,
    		dataType: globalDataType
    	},
    	error: function(){

    	},
    	success: function(data){
    		var imgSrc = "data:image/png;base64," + data.imgStr;
    		$("#blurringlayer").css("display", "none");
	    	if(overlay)
	    		map.removeLayer(overlay);
	    	overlay = L.imageOverlay(imgSrc, L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17))).addTo(map);
	    	console.log("fuzzy thresholds finished");
    	}
    })
}

FuzzyThresholdImgLoader.prototype.updateMinMax = function(controllerName, min, max){
	var maxFixed = max;
	var minFixed = min;
	console.log(maxFixed, minFixed);
	$("#"+controllerName).slider("option", "min", minFixed);
	$("#"+controllerName).slider("option", "max", maxFixed);
	var delta = maxFixed - minFixed;
	$("#"+controllerName).slider("option", "values", [minFixed+delta*0.3, minFixed+delta*0.5, minFixed+delta*0.7]);
	// $("#"+controllerName).slider("option", "step", maxFixed>10?2048:0.1);
	$("#"+controllerName).slider("option", "step", delta/20);

}