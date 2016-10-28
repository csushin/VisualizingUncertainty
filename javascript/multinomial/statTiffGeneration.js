function requestUncertainties(){
  var baseDemandfName = "density_EXP_1pct_1960.tif";
  var uncertaintyType = 'agree,variance,entropy,mean';
  var emission  = "historical";
  var scenario = "ClimMean";
  var dataType = "new";
  var year = "1960";
  var dx = 100;
  var dy = 100;
  $.ajax({
      // url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/genUncertaintyTiff?callback=?',
    	url: 'http://localhost:8080/waterDemo/services/genUncertaintyTiff?callback=?',
    	dataType: "jsonp",
      	data: {
            demandfName: baseDemandfName,
            emissionType: emission,
            scenarioType: scenario,
            uncertaintyType: uncertaintyType,
            oldData: dataType
            },
    	error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.responseText);
            alert(thrownError);
          },
    	success: function(data){
    		if(data!=null){
    			// data are generated
                  var treedata = [];
                  var filenames = data.filenames;
                  var treedata_array = [];
                  var ajaxcalls = [];
                  for(var i=0; i<uncertaintyType.split(",").length; i++){
                        var type = uncertaintyType.split(",")[i];
                        var filename = filenames[type];
                        ajaxcalls[i] = getStatData(dx, dy, type, dataType, filename, treedata_array);      
                  }
                  $.when(ajaxcalls[0], ajaxcalls[1], ajaxcalls[2], ajaxcalls[3]).done(function(a1, a2, a3, a4){
                        console.log(treedata_array);
                  });
    		}
    		else{
                  console.log("Cannot create the stat data");
    		}
    	 }
    	});		
}

function getStatData(dx, dy, type, dataType, filename, treedata_array){
      return $.ajax({
            // url: 'https://watersvr.dtn.asu.edu:8443/waterDemo/services/MergeGridStat?callback=?',
            url: 'http://localhost:8080/waterDemo/services/MergeGridStat?callback=?',
            dataType: "jsonp",
            data:{
                  dx: dx,
                  dy: dy,
                  type: type,
                  oldData: dataType,
                  filename: filename
            },
            error: function(){},
            success: function(data){
                  treedata_array[type] = {
                        data: data.statData,
                        max: data.max,
                        min: data.min
                  };
            }
      });
}


