function drawFuzzySlider(){
    var maxVal = 2.0;
    var minVal = 0.0;
    var defaultHandler = [ 0.8, 1.2, 1.6];
    var colors = fuzzyThresholdTF;
    updateColors(defaultHandler, maxVal, minVal);

	$("#Slider-range").slider({
        min: minVal,
        max: maxVal,
        step: 0.05,
        values: defaultHandler,
        slide: function( event, ui ) {
             updateColors(ui.values);
             $( "#SliderValues" ).val( "" + parseFloat(ui.values[ 0 ])
                                    + " - "
                                    + ui.values[ 1 ] 
                                    + " - "
                                    + parseFloat(ui.values[ 2 ]) );
         },
         stop: function(evt, ui){
            var fuzzyThresholdValues = [ui.values[ 0 ], ui.values[ 1 ] , ui.values[ 2 ]];
            console.log(fuzzyThresholdValues);
            if(FuzzyThresholdLoader.initialized == undefined){
                alert("Modal Parameters are not initlized!");
                return;
            }
            FuzzyThresholdLoader.thresholds = fuzzyThresholdValues;
            FuzzyThresholdLoader.tfFunction = colors;
            FuzzyThresholdLoader.draw();
         },
         change: function(evt, ui){
            updateColors(ui.values);
            $( "#SliderValues" ).val( "" + parseFloat(ui.values[ 0 ])
                                    + " - "
                                    + ui.values[ 1 ] 
                                    + " - "
                                    + parseFloat(ui.values[ 2 ]) );
         }
    });
       $( "#SliderValues" ).val( "" + $( "#Slider-range" ).slider( "values", 0 )
                                    + " - "
                                    + $( "#Slider-range" ).slider( "values", 1 )
                                    + " - "
                                    + $( "#Slider-range" ).slider( "values", 2 ) );;

     function updateColors(values, maxVal, minVal) {

        if($('#Slider-range').css('background-image')!="none"){
            maxVal = $("#Slider-range").slider("option", "max");
            minVal = $("#Slider-range").slider("option", "min")
        }
        var colorstops = colors[0] + ", "; // start left with the first color
            for (var i=0; i< values.length; i++) {
                colorstops += colors[i] + " " + (values[i]-minVal)/(maxVal - minVal)*100 + "%,";
                colorstops += colors[i+1] + " " + (values[i]-minVal)/(maxVal - minVal) + "%,";
            }
            // end with the last color to the right
            colorstops += colors[colors.length-1];
            
            /* Safari 5.1, Chrome 10+ */
            var css = '-webkit-linear-gradient(left,' + colorstops + ')';
            $('#Slider-range').css('background-image', css);
    }

    // Truncate a number to ind decimal places
    function truncNb(Nb, ind) {
      var _nb = Nb * (Math.pow(10,ind));
      _nb = Math.floor(_nb);
      _nb = _nb / (Math.pow(10,ind));
      return _nb;
    }

    // convert a big number to k,M,G
    function int2roundKMG(val) {
      var _str = "";
      if (val >= 1e9)        { _str = truncNb((val/1e9), 1) + ' G';
      } else if (val >= 1e6) { _str = truncNb((val/1e6), 1) + ' M';
      } else if (val >= 1e3) { _str = truncNb((val/1e3), 1) + ' K';
      } else { _str = parseInt(val);
      }
      return _str;
    }
}




