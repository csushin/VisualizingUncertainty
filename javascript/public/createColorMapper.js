function createColorMapper(data, curColorArr, colorType){
	var maxTypeVal = parseFloat(data.statistics[1]);//to make a better visualziation effect, log the value
    var minTypeVal = parseFloat(data.statistics[0]);
    var colorMapper = d3.scale.quantize().range(curColorArr);
    // console.log(colorMapper);
 //    // if(minTypeVal<=Math.exp(-9))  minTypeVal = 0;
 //    // console.log(minTypeVal, maxTypeVal);
    colorMapper.domain([minTypeVal, maxTypeVal]);// define the range of the color
    // if(colorType == 'waterDemand'{
    // 	colorMapper = function(t){
    // 		if(t<500)
    // 			return
    // 	}
    // })
    // console.log(colorMapper);
    return colorMapper;
}