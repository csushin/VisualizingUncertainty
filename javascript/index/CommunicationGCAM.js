var ComGCAM = {
	connection: false,
	gcamWindow:'',
	gcamWindowDomain:'https://fsdb1.dtn.asu.edu:8443/gcamzheng/'
	// gcamWindowDomain:'http://localhost:8080/demo2/'
}

function initCommunication() {
    if (ComGCAM.connection) {
        
    } else {
    	ComGCAM.gcamWindow.postMessage("FirstConnection2GCAM", ComGCAM.gcamWindowDomain);
        console.log("Connecting...");
        setTimeout(initCommunication, 5000);
    }
}


function communicationGCAM(){
	ComGCAM.gcamWindow = window.open(ComGCAM.gcamWindowDomain);

	console.log("Listening GCAM...");
	window.addEventListener('message', function(event){	

		console.log(event.data);
		if(event.data == 'FirstConnection2GCAMReceive'){
			ComGCAM.connection = true;
		}
		else{
			var data = JSON.parse(event.data);
			if(data.hasOwnProperty('varname') && gcamDemandSwitch){
				if(data.filename.indexOf("T") > -1){
					data.filename = data.filename.replace("T", "F");
				}
				gcamDemandData = data;
				$('#gcamDemandType').text('Demand Type: ' + data.varname)
				$('#gcamDemandYear').text('Demand Year: ' + data.year)
			    $('#timeZoneSlider').slider("option", "value", data.year);
      			addImgToMaps();
			}
		}
	});

	initCommunication();
}


