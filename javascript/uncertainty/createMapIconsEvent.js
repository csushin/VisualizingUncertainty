function createIcons(){
	L.easyButton('fa-square-o', 
	 			function() {
					var width = 100;
					var height = 100;
	 				if(toggleSelector == false){
	 					selectorList = createSelector(width, height, mapHandlerList);
	 					addSelectors(selectorList, mapHandlerList);
	 				}
	 				else
	 					removeSelectors(selectorList);
	 			},
	 			'Highlight',
	 			entropyMap.mapHandler);

	L.easyButton('fa-square-o', 
	 			function() {
					var width = 100;
					var height = 100;
	 				if(toggleSelector == false){
	 					selectorList = createSelector(width, height, mapHandlerList);
	 					addSelectors(selectorList, mapHandlerList);
	 				}
	 				else
	 					removeSelectors(selectorList);
	 			},
	 			'Highlight',
	 			agreementMap.mapHandler);	

	L.easyButton('fa-square-o', 
	 			function() {
					var width = 100;
					var height = 100;
	 				if(toggleSelector == false){
	 					selectorList = createSelector(width, height, mapHandlerList);
	 					addSelectors(selectorList, mapHandlerList);
	 				}
	 				else
	 					removeSelectors(selectorList);
	 			},
	 			'Highlight',
	 			meanvarianceMap.mapHandler);	
}

function createSelector(width, height, mapHandlerList){
	var selectorList = [];
	mapHandlerList.forEach(function(element, index, array){
		selectorList.push(L.areaSelect({
							width:width, 
							height:height, 
							keepAspectRatio:false
						}));	 
	})
	listenAreaSelecotr(selectorList, mapHandlerList);
	return selectorList;
}

function listenAreaSelecotr(selectorList, mapHandlerList){
	// console.log(selectorList);
	for(var j=0; j<selectorList.length; j++){
		selectorList[j].on('change', function(){
			// console.log('index ', j, selectorList);
			for(var i=0; i<selectorList.length; i++){
				if(i != j){
					// console.log('i ',i, selectorList);
					selectorList[i]._width = this._width;
					selectorList[i]._height = this._height;
					selectorList[i].addTo(mapHandlerList[i].mapHandler);			
				}
			}
		});
	}
}

function addSelectors(selectorList, mapHandlerList){
	selectorList.forEach(function(element, index, array){
		element.addTo(mapHandlerList[index].mapHandler);
	})
	toggleSelector = true;
};

function removeSelectors(selectorList){
	selectorList.forEach(function(element, index, array){
		element.remove();	
	})
	toggleSelector = false;
};