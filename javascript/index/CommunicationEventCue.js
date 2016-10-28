var ComEventCue = {
	connection: false,
	smWindow:'',
	smWindowDomain:'https://fsdb1.dtn.asu.edu:8443/'
	// smWindowDomain:'http://localhost:8080/'
}


function communication(){
	console.log("Listening...");
	window.addEventListener('message',function(event){			
		if(!ComEventCue.connection){//test for the first connection			
			if(event.data === "FirstConnection"){
				ComEventCue.connection = true;
				ComEventCue.smWindow = event.source;
				ComEventCue.smWindow.postMessage("FirstConnectionReceive",ComEventCue.smWindowDomain);
				console.log("Water Server is ready to communicate.");
			}
		}
		else{//real communications
			// try{
				var data = JSON.parse(event.data);
				// receive information and synchornize maps of own side
				if(data.hasOwnProperty('source')){
					if(data.type == 'highlight' || data.type == 'removehighlight'){
						RcvSyncSelector(data);
					}
					if(data.type == 'maps'){
						RcvSyncMap(data);
					}

				}
			// }catch(e){
				// console.log('invalide json');
			// }
		}
	});
	
}

function SendSyncAddHighlightInfo(rect) {
    var data = {
        source: "waterWindow",
        type: "highlight",
        bounds: rect.getBounds(),
        zoom: popMap.getZoom()
    }

    ComEventCue.smWindow.postMessage(JSON.stringify(data), ComEventCue.smWindowDomain);
    //localStorage.setItem("highlight", JSON.stringify(data));
    //sendSyncHighlight(e);
}


function SendSyncReSizeHighlightInfo(rect) {
    var data = {
        source: "waterWindow",
        type: "rshighlight",
        bounds: rect.getBounds(),
        zoom: popMap.getZoom()
    }
    ComEventCue.smWindow.postMessage(JSON.stringify(data), ComEventCue.smWindowDomain);
    //localStorage.setItem("highlight", JSON.stringify(data));
    //sendSyncHighlight(e);
}

function SendSyncMapsInfo() {
    var data = {
        source: "waterWindow",
        type: "maps",
        center: popMap.getCenter(),
        zoom: popMap.getZoom()
    }
    ComEventCue.smWindow.postMessage(JSON.stringify(data), ComEventCue.smWindowDomain);
}

function SendSyncRemoveHighlightInfo() {
    var data = {
        source: "waterWindow",
        type: "removehighlight"
    }
    ComEventCue.smWindow.postMessage(JSON.stringify(data), ComEventCue.smWindowDomain);
}

function RcvSyncSelector(data){
	if(data.type == 'highlight'){
		var bounds = [data.bounds[0], data.bounds[2]];
	    var rect0 = new L.rectangle(bounds);
	    var rect1 = new L.rectangle(bounds);
	    var rect2 = new L.rectangle(bounds);
	    popEditableLayers.addLayer(rect0);
	    waterEditableLayers.addLayer(rect1);
	    scarcityEditableLayers.addLayer(rect2);
	}
	else{
		popEditableLayers.eachLayer(function(layer){
          popEditableLayers.removeLayer(layer);
	    });
		waterEditableLayers.eachLayer(function(layer){
          waterEditableLayers.removeLayer(layer);
	    });
	    scarcityEditableLayers.eachLayer(function(layer){
	       scarcityEditableLayers.removeLayer(layer);
	    });
	}

}

function RcvSyncMap(data){
	popMap.setView([data.center.lat, data.center.lng], data.zoom);
	waterMap.setView([data.center.lat, data.center.lng], data.zoom);
	scarcityMap.setView([data.center.lat, data.center.lng], data.zoom);
}