function drawShapeFile(shapePath, map, shpLayerGrp){
//shape file
	//clear
	
//	function getColor(d) {
//		return d > 1000 ? '#800026' :
//		       d > 500  ? '#BD0026' :
//		       d > 200  ? '#E31A1C' :
//		       d > 100  ? '#FC4E2A' :
//		       d > 50   ? '#FD8D3C' :
//		       d > 20   ? '#FEB24C' :
//		       d > 10   ? '#FED976' :
//		                  '#FFEDA0';
//	}
	
	
	function style(feature) {
		return {
			weight: 1,
			opacity: 1,
			color: 'blue',
			dashArray: '3',
			//fill: false
			fillOpacity: 0.0
			//fillColor: getColor(feature.properties.density)
		};
	}



	function highlightRegion(e)
	{
		var layer = e.target;

		layer.setStyle({
			weight: 3,
			color: '#666',
			dashArray: '',
			//fill: false
			fillOpacity: 0.0
		});

		// console.log(layer);

		if (!L.Browser.ie && !L.Browser.opera) {
			// layer.bringToFront();
		}

	}

	function resetHighlight(e) {
		geo.resetStyle(e.target);
	}

	function popUp(f,l){
		var out = [];
		if (f.properties){
			for(var key in f.properties){
				out.push(key+": "+f.properties[key]);
			}
			// l.bindPopup(out.join("<br />"));
			// the binded data should html and L.DomUtil.get can return the html of div
			// l.bindPopup(L.DomUtil.get('timeSeries').innerHTML);
			// console.log(L.DomUtil.get('timeSeries').innerHTML);
		}
		l.on({
			mouseover: highlightRegion,
			mouseout: resetHighlight
		});
	}

	var geo = L.geoJson({features:[]},{
		style:style,
		onEachFeature: popUp
	});

	shpLayerGrp.addLayer(geo);

	// console.log(geo);
	var base = shapePath;
	shp(base).then(function(data){
		geo.addData(data);
	});
	 // if(geo){
	 //     	console.log('geo', geo);
  //    	// geo.bringToFront();
  //    }
}