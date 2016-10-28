// function setAllHistogramDisplay(){
// 	for(var i=0; i<metriclist.length; i++){
// 		for(var j=0; j<datatype.length; j++){
// 			if(i!=0){
// 				if(datatype[j].indexOf("Analysis")>-1 || datatype[j].indexOf("Others")>-1 ){
// 				}
// 				else{
// 					var type = -1;
// 					var mapdiv = metriclist[i] + datatype[j] + "HistDiv" + "_" + resulttype[0];
// 					var histdiv = metriclist[i] + datatype[j] + "HistDiv" + "_" + resulttype[1];
// 					// if only map is checked 
// 					if($("#showMapChecked").is(':checked') && !$("#showHistChecked").is(':checked')){
// 						$("#"+mapdiv).css("display", "block");
// 						$("#"+histdiv).css("display", "none");
// 					}
// 					// if nothing is checked
// 					else if(!$("#showHistChecked").is(':checked') && !$("#showMapChecked").is(':checked')){
// 						$("#"+histdiv).css("display", "none");
// 						$("#"+mapdiv).css("display", "none");
// 					}
// 					// otherwise
// 					else{
// 						$("#"+histdiv).css("display", "block");
// 						$("#"+mapdiv).css("display", "none");
// 					}
// 				}
// 			}
// 		}
// 	}
// }

function createElementsForOverview(){
	$("#HistDiv").empty();
	// $("#HistDiv").css("height", "1300px");
	for(var i=0; i<metriclist.length; i++){
		var div = document.createElement("div");
		div.className = "row";
		div.id=metriclist[i]+"HistDiv";
		div.style.height = "200px";
		if(i==0)
			div.style.height="5%";
		div.style.border = "1px dotted";
		div.style.marginLeft  = "0.5%";
		div.style.marginRight  = "0.5%";
		$("#HistDiv").append(div);
		for(var j=0; j<datatype.length; j++){
			var subdiv = document.createElement("div");
			subdiv.className = "col-xs-2 col-sm-2 col-md-2 col-lg-2 nopadding";
			if(datatype[j].indexOf("Ensemble")>-1){
				subdiv.className = "col-xs-2 col-sm-2 col-md-2 col-lg-2 nopadding";
			}
			if(datatype[j].indexOf("Others")>-1)
				subdiv.className = "col-xs-1 col-sm-1 col-md-1 col-lg-1 nopadding";
			subdiv.id = metriclist[i] + datatype[j] + "HistDiv";
			subdiv.style.height = "100%";
			subdiv.style.border = "1px dotted";
			if(i!=0){
				if(datatype[j].indexOf("Others")>-1){
						var binSizeText = document.createElement('input');
						binSizeText.type = "text";
						binSizeText.placeholder = "10";
						binSizeText.defaultValue = "10";
						binSizeText.id = metriclist[i] + datatype[j] + "_binSize";
						binSizeText.style.width = "30%";
						var binSizeLabel = document.createElement("label");
						binSizeLabel.htmlFor = binSizeText.id;
						binSizeLabel.appendChild(document.createTextNode("Bin Size:"));
						var othersButton = document.createElement("button");
						othersButton.innerHTML  = "Submit";
						othersButton.className = "btn btn-default";
						othersButton.style.width = "100%";
						othersButton.id = metriclist[i] + "_btn";
						othersButton.onclick = function(){
							drawEnsembleOverviewHist(this.id.replace("_btn", ""));
							drawOverviewHistograms(this.id.replace("_btn", ""));
						};
						$(subdiv).append("<p style='font-size: large; text-align:left'>"+metriclist[i]+"</p>");
						$(subdiv).append(binSizeLabel);
						$(subdiv).append(binSizeText);
						$(subdiv).append(othersButton);
				}
				else{
					for(var k=0; k<resulttype.length; k++){
						var subsubdiv = document.createElement("div");
						subsubdiv.id = subdiv.id + "_" + resulttype[k];
						subsubdiv.style.height = "100%";
						subsubdiv.style.width = "100%";
						subsubdiv.style.display = "none";
						if(resulttype[k].indexOf("Map")>-1)
							subsubdiv.style.display = "block";
						$(subdiv).append(subsubdiv);
					}
					subdiv.onclick = function(){
						var divnamebasis = this.id;
						if($("#"+divnamebasis+"_Histogram").css("display") == "block"){
							$("#"+divnamebasis+"_Histogram").css("display", "none");
							$("#"+divnamebasis+"_Map").css("display", "block");
						}
						else{
							$("#"+divnamebasis+"_Histogram").css("display", "block");
							$("#"+divnamebasis+"_Map").css("display", "none");
						}
					}
				}
			}
			else{
				subdiv.innerHTML = "<p style='font-size: x-large; text-align:center'>" + datatype[j] + "</p>";
				if(datatype[j].indexOf("Ensemble")>-1){
					subdiv.innerHTML = "<p style='font-size: large; text-align:center'>" + datatype[j] + "<select  type='select' id='EnsembleVariableDropdown'>" + 
						"<option>Precipitation</option>"+
						"<option>TemperatureMin</option>"+
						"<option>Scarcity</option>"+
						"<option>Runoff</option>"+
						"</select></p>";
				}
			}
			$(div).append(subdiv);
		}

	}

}