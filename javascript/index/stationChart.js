function loadStationTimeSeries(fileType, markerGroup){
	shp('img/ShapeFiles/Discharge_Stations.zip').then(function(data){
		for(var i=0; i<data.features.length; i++){
			// console.log(data);
			var lat = data.features[i].geometry.coordinates[1];
			var lng = data.features[i].geometry.coordinates[0];
			var stationLatlng = [lat, lng];
			stationLatlngArr.push(stationLatlng);
			// create the chart for station data and return the html content of the chart
			var stationChartDivID;
			var stationID;
			var idIndex = 0;
			// from left to right, we label the station from 0~3
			if(parseInt(lng)==-7){
				idIndex = 0;
			}
			if(parseInt(lng)==-3){
				idIndex = 1;
			}
			if(parseInt(lng)==4){
				idIndex = 2;
			}
			if(parseInt(lng)==6){
				idIndex = 3;
			}
			stationDivIDArr[idIndex] = document.createElement("div");
			stationDivIDArr[idIndex].style.width = '450px';
			stationDivIDArr[idIndex].style.height = '200px';
			stationDivIDArr[idIndex].style.float = 'left';
			stationDivIDArr[idIndex].style.background = '#ffffff';
			stationDivIDArr[idIndex].style.opacity = 0.7;
			var id = "stationChart"+idIndex;
			stationDivIDArr[idIndex].setAttribute("id", id);

			stationChartDivID = stationDivIDArr[idIndex];
			stationID =  stationIDArr[idIndex];
			// var fileType = '_BiasCorr.csv'
			createStationChart(stationID, stationDivIDArr[idIndex], fileType, stationLatlng, markerGroup);
		};
	});
}

function createStationChart(stationID, stationChartDivID, fileType, latlng, markerGroup){
	var rawFileName = 'img/station/DischargeTimeSeries_Station' + stationID + fileType;
	var stationChart;
	var charthtml;
	var attributeArr = ['Obs', 'EC-EARTH-r3_HIRHAM', 'CNRM-CM5_CCLM', 'EC-EARTH-r12_CCLM', 'HadGEM2-ES_CCLM', 'MPI-ESM-LR_CCLM'];
	// new five arrays to store the csv data in column
	var csvData = [];
	attributeArr.forEach(function(element, index){
		// if(element == 'Month'){
		// 	csvData[index] = ['x'];
		// }
		// else
			csvData[index] = [element];
	});
	// var div = document.createElement("div");
	charthtml = d3.csv(rawFileName, function(data){
		data.forEach(function(element){
			attributeArr.forEach(function(attrElement, index){
				csvData[index].push(parseFloat(element[attrElement]));
			});
		});

		stationChart = c3.generate({
            bindto: stationChartDivID,
            data: {
                //x: 'x',
                columns: csvData
            },
            color: {
                // color pattern for each type/column of data
                pattern: ['rgb(99,99,99)', 'rgb(227,26,28)','rgb(31,120,180)', 'rgb(51,160,44)','rgb(106,61,154)','rgb(177,89,40)']
            },
            zoom: {
  				enabled: true
			},
            legend: {
                position: 'bottom'
            },
            tooltip: {
            	format:{
            		title: function(x){
            			return fullMonths[x];
            		}
            	},
        		grouped: false // Default true
    		},
    		axis:{
    			x:{
    				label: {
                		text: 'Station'+stationID,
                		position: 'outer-center'
    				},
    				type: 'category',
    				categories: shortMonths
    			},
    			y:{
    				label:{
    					text: 'Q: m3/s',
    					position: 'outer-middle'
    				}
    			}
    		},
    		size:{
    			width: 450,
    			height: 200
    		}
		}); 
		var m  = L.marker(latlng).bindPopup(stationChartDivID, {
				maxWidth: 400,
				closeButton: false
			});		
// var m  = L.marker(latlng).bindPopup('jsut for test', {
// 			});
		if(fileType.indexOf('Raw')>-1) 
			markerGroup.addLayer(m);	
		else
			markerGroup.addLayer(m);
	});
}

