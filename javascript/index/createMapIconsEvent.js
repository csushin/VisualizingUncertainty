function createMapIcons(){



	jQuery.get('img/popSourceIntro.txt', function(data) {
    	popSourceInfo = data;
	});

	jQuery.get('img/scarcitySourceIntro.txt', function(data) {
    	scarcitySourceInfo = data;
	});	

	jQuery.get('img/bwSourceIntro.txt', function(data) {
    	waterSourceInfo = data;
	});

	popHelp = L.easyButton('fa-database', 
	 			function() {
	 				// To get more information about bootstrapDialog, visit: http://nakupanda.github.io/bootstrap3-dialog/
	 				BootstrapDialog.show({
	 					title: 'Population Data Information',
            			message: popSourceInfo
        			});

	 			},
	 			'source pop data document',
	 			popMap);

	L.easyButton('fa-database', 
	 			function() {
	 				BootstrapDialog.show({
	 					title: 'Water Data Information',
            			message: waterSourceInfo
        			});	 				
	 			},
	 			'source water data document',
	 			waterMap);

	L.easyButton('fa-database', 
	 			function() {
	 				BootstrapDialog.show({
	 					title: 'Scarcity Data Information',
            			message: '<p>'+scarcitySourceInfo+'</p><table class="scarcityTable">\
						      				  <tr>\
						      				  	<th>Index(m<sup>3</sup> per capita per year)</th>\
						      				  	<th>Category/Condition</th>\
						      				  </tr>\
											  <tr>\
											    <td>>1,700</td>\
											    <td>No Stress</td>\
											  </tr>\
											  <tr>\
											    <td>1,000-1,700</td>\
											    <td>Stress</td>\
											  </tr>\
											  <tr>\
											    <td>500-1,000</td>\
											    <td>Scarcity</td>\
											  </tr>\
											  <tr>\
											    <td><500</td>\
											    <td>Absolute Scarcity</td>\
											  </tr>\
											</table>'
        			});
	 			},
	 			'Method of calculating scaricty',
	 			scarcityMap);	

	// L.easyButton('fa-square-o', 
	//  			function() {
	//  				console.log(toggleSelector);
	//  			// 	if(toggleSelector == false){
	// 				// 	createSelector();
	// 				// }
	// 				// else{
	// 				// 	popMask = null;
	// 				// }
	// 				var width = 100;
	// 				var height = 100;
	//  				if(toggleSelector == false){
	//  					// popDrawControl._toolbars[L.DrawToolbar.TYPE]._modes.rectangle.handler.enable();
	//  					/*createSelector(width, height);
	//  					addSelectors(popAreaSelector, popMap, waterAreaSelector, waterMap, scarcityAreaSelector, scarcityMap);*/

	// 					//send create falag bounds zoom
	// 					//var data = {
	// 					//	source: "waterWindow",
	// 					//	type: "highlight",
	// 					//	bounds: state_polygon,
	// 					//	zoom: state_zoom
	// 					//}
	// 					//Com.smWindow.postMessage(JSON.stringify(data), Com.smWindowDomain);
	//  				}
	//  				else{
	//  					/*removeSelectors(popAreaSelector, waterAreaSelector, scarcityAreaSelector);*/
	 					
	// 					//send remove flag
						
	// 				}
	//  			},
	//  			'Highlight',
	//  			popMap);

	// L.easyButton('fa-square-o', 
	//  			function() {
	// 				var width = 100;
	// 				var height = 100;
	//  				if(toggleSelector == false){
	//  					createSelector(width, height);
	//  					addSelectors(popAreaSelector, popMap, waterAreaSelector, waterMap, scarcityAreaSelector, scarcityMap);
	//  				}
	//  				else
	//  					removeSelectors(popAreaSelector, waterAreaSelector, scarcityAreaSelector);
	//  			},
	//  			'Highlight',
	//  			waterMap);	

	// L.easyButton('fa-square-o', 
	//  			function() {
	// 				var width = 100;
	// 				var height = 100;
	//  				if(toggleSelector == false){
	//  					createSelector(width, height);
	//  					addSelectors(popAreaSelector, popMap, waterAreaSelector, waterMap, scarcityAreaSelector, scarcityMap);
	//  				}
	//  				else
	//  					removeSelectors(popAreaSelector, waterAreaSelector, scarcityAreaSelector);
	//  			},
	//  			'Highlight',
	//  			scarcityMap);
    
    L.easyButton('fa-pencil-square-o', 
	 			function() {
	 				if(!popSidebar.isVisible())
	 					popSidebar.show();
	 				else
	 					popSidebar.hide();
	 			},
	 			'Comments',
	 			popMap);

    L.easyButton('fa-pencil-square-o', 
	 			function() {
	 				if(!waterSidebar.isVisible())
	 					waterSidebar.show();
	 				else
	 					waterSidebar.hide();
	 			},
	 			'Comments',
	 			waterMap);

    L.easyButton('fa-pencil-square-o', 
	 			function() {
	 				if(!scarcitySidebar.isVisible())
	 					scarcitySidebar.show();
	 				else
	 					scarcitySidebar.hide();	 				
	 			},
	 			'Comments',
	 			scarcityMap);

}

function createSelector(width, height){
	// // var locationfilter = new L.LocationFilter().addTo(popMap);
	// // popMask = new L.Draw.Mask(popMap).enable();
	// // popMap.on('draw:created', function(evt){
	// // 	var layer = evt.layer;
	// // 	popMap.addLayer(layer);
	// // 	layer.editing.enable();
	// // });
	// popAreaSelector = L.areaSelect({
	// 						width:width, 
	// 						height:height, 
	// 						keepAspectRatio:false
	// 					});	 
	// waterAreaSelector = L.areaSelect({
	// 						width:width, 
	// 						height:height, 
	// 						keepAspectRatio:false
	// 					});	 
	// scarcityAreaSelector = L.areaSelect({
	// 						width:width, 
	// 						height:height, 
	// 						keepAspectRatio:false
	// 					});	
	// listenAreaSelecotr();
	// // SendSyncHighlightInfo();

}

function listenAreaSelecotr(){
	// popAreaSelector.on('change', function(){
	// 	waterAreaSelector._width = popAreaSelector._width;
	// 	waterAreaSelector._height = popAreaSelector._height;
	// 	waterAreaSelector.addTo(waterMap);	 
	// 	scarcityAreaSelector._width = popAreaSelector._width;
	// 	scarcityAreaSelector._height = popAreaSelector._height;
	// 	scarcityAreaSelector.addTo(scarcityMap);	
	// 	console.log('selector:'  +toggleSelector);
	// 	console.log('connection: ' + Com.connection);
	// 	// sync with Yafeng's page
	// 	if(Com.connection && toggleSelector){
 //            SendSyncReSizeHighlightInfo(popAreaSelector); 
 //        	console.log('change!');
	// 	}
	// });

	// waterAreaSelector.on('change', function(){
	// 	popAreaSelector._width = waterAreaSelector._width;
	// 	popAreaSelector._height = waterAreaSelector._height;
	// 	popAreaSelector.addTo(popMap);	 
	// 	scarcityAreaSelector._width = waterAreaSelector._width;
	// 	scarcityAreaSelector._height = waterAreaSelector._height;
	// 	scarcityAreaSelector.addTo(scarcityMap);	
	// 	// sync with Yafeng's page
	// 	if(Com.connection&& toggleSelector)
 //            SendSyncReSizeHighlightInfo(popAreaSelector);  
	// });

	// scarcityAreaSelector.on('change', function(){
	// 	waterAreaSelector._width = scarcityAreaSelector._width;
	// 	waterAreaSelector._height = scarcityAreaSelector._height;
	// 	waterAreaSelector.addTo(waterMap);	 
	// 	popAreaSelector._width = scarcityAreaSelector._width;
	// 	popAreaSelector._height = scarcityAreaSelector._height;
	// 	popAreaSelector.addTo(popMap);	
	// 	// sync with Yafeng's page
	// 	if(Com.connection && toggleSelector)
 //            SendSyncReSizeHighlightInfo(popAreaSelector);  
	// });	
}

function addSelectors(popAreaSelector, popMap, waterAreaSelector, waterMap, scarcityAreaSelector, scarcityMap){
		// popAreaSelector.addTo(popMap);
		// waterAreaSelector.addTo(waterMap);
		// scarcityAreaSelector.addTo(scarcityMap);
		// // sync with Yafeng's page
		// if(Com.connection)
  //           SendSyncAddHighlightInfo(popAreaSelector); 
		// toggleSelector = true;
};

function removeSelectors(popAreaSelector, waterAreaSelector, scarcityAreaSelector){
		// popAreaSelector.remove();
		// waterAreaSelector.remove();
		// scarcityAreaSelector.remove();
		// // sync with Yafeng's page
		// if(Com.connection)
  //           SendSyncRemoveHighlightInfo(); 
		// toggleSelector = false;
};