function listenTreeParamSwitcher(){
	$('#swictherSelector').on('change', function(e){
        if(document.querySelector('input[name="switchView"]:checked').value == 0){
            drawOverviewMaps();       
            drawOverviewHistograms(0);  
            var val = $('#swictherSelector').val();
            if(val.indexOf("Model")>-1){
                $("#timeSlider").css("display", "block");
                $("#ModalYearText").css("display", "block")
                $("#ModalYearText").css("display", "block");
                $("#modalSelector").css("display", "none");
            }           
            else{
                $("#ModalYearText").css("display", "none");
                $("#ModalYearText").css("display", "none")
                $("#timeSlider").css("display", "none");
                $("#modalSelector").css("display", "block");
            }  
            console.log( $("#overview_showtype"));
        }
        else{
            initializeScatterplot("scatterplotDiv");
            var val = $('#swictherSelector').val();
            if(val.indexOf("Modal")>-1){
                var year = $("#timeSlider").val();
                totalMetric = ["ModalMean", "ModalStd", "ModalEntropy", "ModalCV", "ModalIQR"];
                getStatInfo(totalMetric);
                createTreeParam();
                $("#timeSlider").css("display", "block");
                $("#ModalYearText").css("display", "block");
                $("#modalSelector").css("display", "none");
            }
            else{
                console.log("triggered");
                totalMetric = ["TimeMean", "TimeStd", "TimeEntropy", "TimeCV", "TimeIQR"];
                getStatInfo(totalMetric);
                createTreeParam();
                $("#ModalYearText").css("display", "none");
                $("#timeSlider").css("display", "none");
                $("#modalSelector").css("display", "block");
            }
            
        }
       
    });
}

function listenModalSelector(){
    $('#modalSelector').on('change', function(e){
        if(document.querySelector('input[name="switchView"]:checked').value == 0){
            drawOverviewMaps();
            drawOverviewHistograms(0);
        }
        else{
            initializeScatterplot("scatterplotDiv");
            getStatInfo(totalMetric);
            createTreeParam();            
        }

    });
}

function updateYearTextInput(value){
    $("#ModalYearText").html(value);
    if(document.querySelector('input[name="switchView"]:checked').value == 0){
        if(!overViewInitialized){
            drawOverviewMaps();       
            drawOverviewHistograms(0);
             
        }
    }
    else{
        initializeScatterplot("scatterplotDiv");
        getStatInfo(totalMetric);
        createTreeParam();
    }
}

function listenEnsembleMaps(){
    $("#EnsembleVariableDropdown").on("change", function(){
        drawEnsembleMaps();       
        drawEnsembleOverviewHist(0);  
    })
}
