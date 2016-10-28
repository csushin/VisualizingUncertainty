$( document ).ready(function() {
////////////////////////////////////////////////////////////////////////////////////////////
    window.onresize = function(event) {
        var body = document.body;
		    body.style.height = window.innerHeight + "px";
		    body.style.width = window.innerWidth+ "px";
        // if(body.style.width<1200 || body.style.height<800)
        // {
        //   var element = $('#interactionZone').children();
        //   element.each(function (i) {
        //     $(this).css('font-size','6pt');   
        //   });       
        // }
        // else{
        //   var element = $('#interactionZone').children();
        //   element.each(function (i) {
        //     $(this).css('font-size','11pt');   
        //   });     
        // }
        createMatrix('agreeLegend', 4, 4, agreeColorTable, xagreelegendText, yagreelegendText);
        sendOriginsRequest();
        createShortcuts();
    };
////////////////////////////////////////////////////////////////////////////////////////////
   addSlider(mapHandlerList);
   listenSelect(mapHandlerList);
   addSelectOptions();
   createShortcuts();
   // sychronizeMap(mapHandlerList);

   
   createMatrix('agreeLegend', 4, 4, agreeColorTable, xagreelegendText, yagreelegendText, mapHandlerList, 0);
   createSelector(100, 100, mapHandlerList);
   createIcons();
   
});