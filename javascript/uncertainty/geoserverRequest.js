function requestUncertainties(mapHandlerList){
	var pop = $('#popSelect').val();
	var scenario = $('#scenarioSelect').val();
	var emission = $('#emissionSelect').val();
	if(pop==null || scenario == null || emission == null){
		console.log(pop, scenario, emission);
		console.log('initializing select box error!');
	}
	else{
		pop = popRealVals[popOptions.indexOf(pop)];
		scenario = scenarioRealVals[scenarioOptions.indexOf(scenario)];
		emission = emissionRealVals[emissionOptions.indexOf(emission)];
		var dataType = "old";
		var demandFileName;
		if(pop==popRealVals[0])
			demandFileName = 'density_' + pop + '_' + growthRate + 'pct_' + yearVal + '.tif';
			// demandFileName = 'density_' + pop + '_' + growthRate + 'pct_' + '1965' + '.tif';
		else
			demandFileName = 'density_' + pop + '_'  + yearVal + '.tif';
			// demandFileName = 'density_' + pop + '_'  + '1965' + '.tif';
		demandFileName = 'density_EXP_1pct_2000.tif';
		var loadingLayer = [];
		var mapPixelOrigin = "";
		var zoomLevel;
		mapHandlerList.forEach(function(ele, index){
			loadingLayer.push(loadingImageLayer('img/ajax-loader.gif', ele.mapHandler));
			mapPixelOrigin = ele.mapHandler.getPixelOrigin().x + "," + ele.mapHandler.getPixelOrigin().y;
			zoomLevel = ele.mapHandler.getZoom();
		});
		var uncertaintyType = 'agree,entropy,variance';
		$.ajax({
			// url: 'http://localhost:8080/waterDemo/services/genUncertaintyTile?callback=?',
			url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/genUncertaintyTile?callback=?',
			dataType: "jsonp",
          	data: {
                demandfName: demandFileName,
                emissionType: 'historical',
                scenarioType: '2000',
                uncertaintyType: uncertaintyType,
                mapPixelOrigin: mapPixelOrigin,
                oldData: dataType,
                zoomLevel: 7
                },
			 error: function (xhr, ajaxOptions, thrownError) {
		        alert(xhr.responseText);
		        alert(thrownError);
		      },
			success: function(data){
				if(data){
					console.log(data);
					for(var i=0; i<data.imgStr.length; i++){
						var imageBounds = imgBounds(dataType); 
						var imgSrc = "data:image/png;base64," + data.imgStr[i];
						var ele = mapHandlerList[i];
						if(ele.mapOverlayObj.overlay)
							ele.mapHandler.removeLayer(ele.mapOverlayObj.overlay);
						ele.mapOverlayObj.overlay = L.imageOverlay(imgSrc, imageBounds).addTo(ele.mapHandler);
						ele.mapHandler.removeLayer(loadingLayer[i]);
					}
					

					// mapHandlerList.forEach(function(ele, index){
					// 	ele.mapHandler.removeLayer(loadingLayer[index]);
					// 	var port = '8080';
     //              		var workspace = 'niger_river';
     //              		var coveragestoreName = demandFileName.replace('.tif', '') + '_' + emission + '_' + scenario + '_' + ele.renderingType;
     //              		// requestCoverage(coveragestoreName, ele.mapHandler, ele.mapOverlayObj.overlay, ele.mapOverlayObj.style);
     //              		if(ele.mapOverlayObj.overlay)
					// 	{
					// 		ele.mapHandler.removeLayer(ele.mapOverlayObj.overlay);
					// 	}
					// 	ele.mapOverlayObj.overlay = L.tileLayer.wms('https://watersvr.dtn.asu.edu:8443/geoserver/niger_river/wms', {
					// 		                	layers: coveragestoreName,
					// 		                	styles: ele.mapOverlayObj.style,
					// 		                	format: 'image/png',
					// 		                	crs: L.CRS.EPSG4326,
					// 		                	transparent: true,
					// 		                	noWrap: true
					// 		    }).addTo(ele.mapHandler);
					// });
				}
				else{
					console.log('Error in creating uncertainty geotiff image');
					mapHandlerList.forEach(function(ele, index){
						ele.mapHandler.removeLayer(loadingLayer[index]);
					});
				}
		       	
			}
		});		
	}

}

function imgBounds(oldData){
	if(oldData=='old'){
		return L.latLngBounds(L.latLng(0, -30), L.latLng(30, 30)); 
	}
	else{
		return L.latLngBounds(L.latLng(3, -13), L.latLng(25, 17)); 
	}
}


function changeStyle(styleName, mapIndex){
	var pop = $('#popSelect').val();
	var scenario = $('#scenarioSelect').val();
	var emission = $('#emissionSelect').val();
	pop = popRealVals[popOptions.indexOf(pop)];
	scenario = scenarioRealVals[scenarioOptions.indexOf(scenario)];
	emission = emissionRealVals[emissionOptions.indexOf(emission)];
	if(pop==popRealVals[0])
			demandFileName = 'density_' + pop + '_' + growthRate + 'pct_' + yearVal + '.tif';
	else
			demandFileName = 'density_' + pop + '_'  + yearVal + '.tif';
	var port = '8080';
    var workspace = 'niger_river';
    var coverageName = demandFileName.replace('.tif', '') + '_' + emission + '_' + scenario + '_' + mapHandlerList[mapIndex].renderingType;
 	if(mapHandlerList[mapIndex].mapOverlayObj.overlay){
	    mapHandlerList[mapIndex].mapHandler.removeLayer(mapHandlerList[mapIndex].mapOverlayObj.overlay);
	}
	 // mapHandlerList[mapIndex].mapOverlayObj.style = styleName;
    mapHandlerList[mapIndex].mapOverlayObj.overlay = L.tileLayer.wms('https://watersvr.dtn.asu.edu:8443/geoserver/niger_river/wms', {
        layers: coverageName,
        styles: styleName,
        format: 'image/png',
        crs: L.CRS.EPSG4326,
        transparent: true
    }).addTo(mapHandlerList[mapIndex].mapHandler);
}



