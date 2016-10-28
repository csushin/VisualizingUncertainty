function LoadParamsOptions(dataType){
	var data = [];
	if(dataType == 'oldData'){
		data['pop'] = [popSSPText , popEXPText];
		data['yeartype'] = ['Dry', 'Wet', climMeanText, 'By Year'];
		data['exp'] = [rcp45Text, rcp85Text, 'Historical'];
		data['gcm'] = oldGCM;
		data['rcm']= oldRCM;
		data['var'] = ['BW'];		
	}else{
		data['pop'] = [popSSPText , popEXPText];
		data['yeartype'] = [climMeanText, 'By Year'];
		data['exp'] = ['Historical'];
		data['gcm'] = newGCM;
		data['rcm'] = newRCM;
		data['var'] = ['BW'];
	}
	addContent(data, "POPCombo");
	addContent(data, "EXPCombo");
	addContent(data, "GCMCombo");
	addContent(data, "RCMCombo");
	addContent(data, "VARCombo");
	addContent(data, "YEARTYPECombo");

	// the starter of the year is 1960 and this is to prevent the case of Higher or lower emission mapped to year 1960
	if($('#EXPCombo').val()!='Historical')
		$('#EXPCombo').val('Historical');
}

function addContent(data, curComboName){
	var curID = document.getElementById(curComboName);
	// clear the previous context
	curID.options.length = 0;
	// remove the last string Combo
	var attributeName = curComboName.replace("Combo", "").toLowerCase();
	// length of possible valus for each parameters
	var length = data[attributeName].length;
	var curParamSet = [];
	curParamSet.push(attributeName);

	// access each memeber of the array and add them to the option box
	data[attributeName].forEach(function(entry){
		curParamSet.push(entry);
		var curOption = document.createElement("option");
		curOption.text = curOption.value = entry;
        curID.add(curOption, 0);
	});
	// set the default value of the option box
	curID.value = curID.options[0].value;
}
