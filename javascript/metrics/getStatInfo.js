function getStatInfo(metrics){
	metrics.forEach(function(element){
		$.ajax({
			url: httpDomain + "waterDemo/services/getMetricStat?callback=?",
			dataType: "jsonp",
			data:{
				metric: element,
				year: $("#timeSlider").val(),
				modal: $("#modalSelector").val(),
				type: $("#swictherSelector").val(),
				dataType: globalDataType
			},
			error: function(){

			},
			success: function(data){
				// var slider = document.getElementById();
				var stat = {
					min: data.min,
					max: data.max
				}
				modalStat[data.metric] = stat;
				console.log(modalStat);
		        console.log($('#' + data.metric+"_Slider"));
		        $('#' + data.metric+"_Slider").attr("min", parseFloat(data.min));
		        $('#' + data.metric+"_Slider").attr("max", parseFloat(data.max));
		        $('#' + data.metric+"_Slider").attr("step", (parseFloat(data.max)-parseFloat(data.min))/100);
		        $('#' + data.metric+"_Slider").val(parseFloat(data.min));
		        document.getElementById(data.metric+"_Span").textContent = (data.min).toFixed(2);
			}
		});
	});
}