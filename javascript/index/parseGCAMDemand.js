function addGCAMDemandParser(bounds){
	if(bounds == null){
		alert("bounds from layer are not available!");
		return;
	}

	$.ajax({
		url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/addGCAMParser?callback=?',
		dataType: 'jsonp',
		data: {
			southwest: bounds[0].lat + ',' + bounds[1].lng,
			northeast: bounds[1].lat + ',' + bounds[1].lng,
			fileName: gcamDemandData.filename,
			year: gcamDemandData.year
		},
		error: function(){},
		success: function(data){
			console.log(data);
			var pieDiv = document.createElement("div");
			pieDiv.style.width = '300px';
			pieDiv.style.height = '300px';
			pieDiv.style.float = 'left';
			pieDiv.style.background = '#ffffff';
			pieDiv.style.opacity = 0.7;
			var c3data = constructData(data);
			demandChart = c3.generate({
				bindto: '#blurringlayer',
				data: {
                	columns: c3data,
                	type: 'pie',
                	onresized: function () { demandChart.flush();}
           	 	},
				legend: {
			      	position: 'right'
			    },
			    size:{
	    			width: $('#blurringlayer').width(),
	    			height: $('#blurringlayer').height()
    			},
			});
			document.getElementById('blurringlayer').style.display = 'block';
		}
	});
}

function removeGCAMDemandParser(){
	demandChart.hide();
}

function constructData(data){
	var result = [];
	for(var key in data){
		if(key!="total_demand"){
			var curResult = [key, data[key]];
			result.push(curResult);
		}
	}
	return result;
}