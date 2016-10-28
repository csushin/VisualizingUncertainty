function generateImgSrc(){
	for(var k=0; k<exp.length; k++){
		for(var j=0; j<gcm_rcmCombination.length; j++){
			for(var i=0; i<YEAR.length; i++){//push each line's bg image
				if((YEAR[i]>2005 && exp[k] == 'historical') || (YEAR[i]<=2005 && exp[k] != 'historical')){
					console.log('illegal');
				}
				else{
					console.log(fileName);
					var fileName = exp[k]+'_'+gcm_rcmCombination[j] + '_' + varType[0] + '_' + YEAR[i];
					getLowResWater(fileName);
				}
			}
		}		
	}
}


// fNmame here is without .tif
function getLowResWater(fName){
    fullName = fName + '.tif';
    $.ajax({
      url: 'http://10.211.22.64:8080/geotiffDemo/services/getWaterPoints?callback=?',
      dataType: "jsonp",
      data: {message: "requestWater", 
            supplyfName: fullName,
            resolution: "low"},
      error: function(){
        alert("Error in trying to get the Water data!");
      },
      success: function(data){
        //save data
        var colorMapper = createColorMapper(data, rgbaWater);
        var src = fastGenerator(data, colorMapper, 'waterSupply');  
        updateMatrix(src, fName);
      }
    });   
};

