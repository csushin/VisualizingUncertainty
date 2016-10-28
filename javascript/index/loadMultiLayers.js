function loadWaterLayers(){
	drawShapeFile('img/ShapeFiles/NRB_RiverNetwork_GRDC.zip', waterMap, waterShplayerGrp);
	drawShapeFile('img/ShapeFiles/NRB_Boundaries_GRDC.zip', waterMap, waterShplayerGrp);
	drawShapeFile('img/ShapeFiles/nr_adm0.zip', popMap, popShplayerGrp);
	drawShapeFile('img/ShapeFiles/NRB_RiverNetwork_GRDC.zip', scarcityMap, scarcityShpLayerGrp);

	satelliteOverlay = L.tileLayer.wms('https://watersvr.dtn.asu.edu:8443/geoserver/niger_river/wms', {
		layers: "GZF_test",
		format: 'image/png',
		transparent: true
	});
	console.log('adding satellite layer:　', satelliteOverlay, "Group: ", scarcityShpLayerGrp);
	scarcityShpLayerGrp.addLayer(satelliteOverlay);

	var baseLayer = {};
	var shpWaterOverlayMaps = {
	    "RiverNetwork": waterShplayerGrp.getLayers()[0],
	    "Boundaries": waterShplayerGrp.getLayers()[1],
	    "Stations-Raw": waterStationRawGrp,
	    "Stations-Bias": waterStationBiasGrp
	};
	var shpPopOverlayMaps = {
	    "Political Boundaries": popShplayerGrp.getLayers()[0],
	};
	var shpScarOverlayMaps = {
	    "RiverNetwork": scarcityShpLayerGrp.getLayers()[0],
	    "Satellite": scarcityShpLayerGrp.getLayers()[1]
	};

	waterCheckBox = L.control.layers(baseLayer,shpWaterOverlayMaps).addTo(waterMap).setPosition('bottomleft');

	popCheckBox = L.control.layers(baseLayer,shpPopOverlayMaps).addTo(popMap).setPosition('bottomleft');

	scarcityCheckBox = L.control.layers(baseLayer,shpScarOverlayMaps).addTo(scarcityMap).setPosition('bottomleft');
}



function setShpCheckBox(demandShp, supplyShpSB, supplyShpSR, supplyShpRN, supplyShpBD, scarcityShpRN, scarcityShpSt){
	if(demandShp){

	}
}