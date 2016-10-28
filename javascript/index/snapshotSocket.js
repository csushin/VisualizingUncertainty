function openSnapPoolDiv(){
  window.open("snapshotBrowser.html");
}

function resetParams(snapshot, resetSide){
	// lock the geoserver request when setting the parameters
	workingMode = false;

	// configure map
	popMap.setView([snapshot.centerLat, snapshot.centerLng], snapshot.zoomLevel);
	scarcityMap.setView([snapshot.centerLat, snapshot.centerLng], snapshot.zoomLevel);
	waterMap.setView([snapshot.centerLat, snapshot.centerLng], snapshot.zoomLevel);


    // configure supply parameters
    if($('input[type=radio][name="switch"]:checked').val().indexOf(snapshot.checkedSupply) < 0){
    	$('input[type=radio][name="switch"]').not(':checked').prop("checked", true);
    	changeData(snapshot.checkedSupply);
    }
    waterYVal = snapshot.tSliderVal;
    tSlider.slider("option", "value", waterYVal);
    $("#EXPCombo").val(snapshot.EXP).change();
    $("#GCMCombo").val(snapshot.GCM).change();
    $("#RCMCombo").val(snapshot.RCM).change();
    // $("#VARCombo").val(snapshot.VAR).change();
    $("#YEARTYPECombo").val(snapshot.YEAR).change();
 
 	// configure demand parameters
    if($('input[type=radio][name="demandSwitch"]:checked').val().indexOf(snapshot.checkedDemand) < 0){
    	$('input[type=radio][name="demandSwitch"]').not(':checked').prop("checked", true);
    	changeDemandData(snapshot.checkedDemand);
    }

	if($('input[name="demandSwitch"]:checked').val().indexOf("gcamData")>-1){
		gcamData.varname = snapshot.VARNAME;
		gcamData.filename = snapshot.FILENAME;
		gcamData.year = snapshot.YEARGCAM;
	    if(resetSide.indexOf('client')>-1){
			if(!ComGCAM.connection){
	    		gcamData.varname = 'unknown';
		    	gcamData.filename = 'unknown';
		    	gcamData.year = 'unknown';
				var str = "Requires the connection between african scarcity project and gcam project.";
				makeDialog(str);
				growthRate = snapshot.grSliderVal;
		    	grSlider.slider("option", "value", growthRate);
		    	$("#POPCombo").val(snapshot.POP).change();
				return false;
			}
	    }
	}
	else{
		growthRate = snapshot.grSliderVal;
		grSlider.slider("option", "value", growthRate);
		$("#POPCombo").val(snapshot.POP).change();
	}
	
    
    
    // draw the highlight area
    var bounds = [[snapshot.hltbboxSWLat, snapshot.hltbboxSWLng],[snapshot.hltbboxNELat, snapshot.hltbboxNELng]];
    if(snapshot.highlightFlag)
    	createLayer(bounds);


    // show shapefiles of all maps

    // due to it's async, so we should set the value first and then display the value

    // grSlider.val(snapshot.paramInfo.grSliderVal);
    // tSlider.val(snapshot.paramInfo.grSltSlideriderVal);
    // $('#popGrowthRateSlider').slider('refresh');
    // $('#timeZoneSlider').slider('refresh');
    // grSlider.setValue(snapshot.paramInfo.grSliderVal, true);
    // tSlider.setValue(snapshot.paramInfo.tSliderVal, true);
    addImgToMaps();
    // after the image is drawn, returning to the working mode
    workingMode = true;
    return true;
}

// function resetMaps(snapshot){
    
//     scarcityMap.setView(snapshot.mapInfo.scarcity.centerView, snapshot.mapInfo.scarcity.zoomLevel);
//     waterMap.setView(snapshot.mapInfo.supply.centerView, snapshot.mapInfo.supply.zoomLevel);
// }


function saveParameters(){
	if(checkModelAccuracy()){
		  if(!userName){
		      BootstrapDialog.show({
		          title: 'Save and share your scenario parameters.',
		          message: '<span class="help-block">User Name</span>'+
		                    '<input id="name" name="name" type="text" placeholder="Your name..." class="form-control input-md"> ' +
		                    '<span class="help-block">Short scenario title</span> '+
		                    '<input id="title" name="title" type="text" placeholder="Title..." class="form-control input-md"> ',
		          buttons: [{
		              id: 'btn-ok',   
		              icon: 'glyphicon glyphicon-check',       
		              label: 'Save',
		              cssClass: 'btn-primary', 
		              autospin: false,
		              action: function(dialogRef){    
		                var nameVal = document.getElementById('name').value;
		                var titleVal = document.getElementById('title').value;
		                console.log(nameVal);
		                if(nameVal){
		                  userName = nameVal;
		                  title = titleVal;
		                  sendParams();
		                  dialogRef.close();
		                }
		                else{
		                  alert('At least input something please!');
		                }
		              }
		          }]
		      });
		  }
		  else{
		      BootstrapDialog.show({
		          title: 'Save and share your scenario parameters.',
		          message: '<span class="help-block">Short scenario title</span> '+
		                    '<input id="title" name="title" type="text" placeholder="Title..." class="form-control input-md"> ',
		          buttons: [{
		              id: 'btn-ok',   
		              icon: 'glyphicon glyphicon-check',       
		              label: 'Save',
		              autospin: false,
		              action: function(dialogRef){    
		                var titleVal = document.getElementById('title').value;
		                if(titleVal){
		                  title = titleVal;
		                  dialogRef.close();
		                  sendParams();
		                }
		                else{
		                  alert('At least input something please!');
		                }
		              }
		          }]
		      });    
		  }				
	}
}

function sendParams(){
	  var date = new Date($.now());
	  var curSnapshot = {
	  	  webWidth: window.innerWidth,
	  	  webHeight: window.innerHeight,
	  	  centerLat: popMap.getCenter().lat, 
	  	  centerLng: popMap.getCenter().lng,
	  	  zoomLevel: popMap.getZoom(),
	  	  highlightFlag: highlightFlag,
	  	  hltbboxSWLat: highlightFlag!=true?0:highlightBoundingBox[0].lat,
	  	  hltbboxSWLng: highlightFlag!=true?0:highlightBoundingBox[0].lng,
	  	  hltbboxNELat: highlightFlag!=true?0:highlightBoundingBox[1].lat,
	  	  hltbboxNELng: highlightFlag!=true?0:highlightBoundingBox[1].lng,
	      title: title,
	      user: userName,
	      description: description,
	      icon: '',
	      date: date,
	      demandShp: false,
	      supplyShpSB: null,
	      supplyShpSR: null,
	      supplyShpRN: null,
	      supplyShpBD: null,
	      scarcityShpRN: null,
	      scarcityShpSt: null,
	      checkedSupply: $('input[name="switch"]:checked').val(),
	  	  checkedDemand: $('input[name="demandSwitch"]:checked').val(),
	      EXP: $("#EXPCombo").val(),
	      GCM: $("#GCMCombo").val(),
	      RCM: $("#RCMCombo").val(),
	      VAR: $("#VARCombo").val(),
	      POP: $("#POPCombo").val(),
	      VARNAME: gcamDemandData.varname,
	      YEARGCAM: gcamDemandData.year,
	      FILENAME: gcamDemandData.filename,
	      YEAR: $("#YEARTYPECombo").val(),
	      grSliderVal: growthRate,
	      tSliderVal: waterYVal
	  };

	  socket.emit('snapshotSended', curSnapshot);		
	  captureScreenshot(curSnapshot);
}


function captureScreenshot(snapshot){
	$.ajax({
		url: "https://watersvr.dtn.asu.edu:8843/captureScreenshot",
		dataType: "jsonp",
		data:snapshot,
		error: function(jqXHR, textStatus, errorThrown) {
            console.log('error : ' + textStatus + " " + errorThrown);
        },
        success: function(data){
        	console.log(data);
        }
	});
}


function initSnapShot(){
    var img = new Image();
    img.src = "spacetime_states.png";
    img.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);


        icon = canvas.toDataURL("image/png");
        $('#container').hide();
        var snapshots = {
            ID: -1,
            title: "Snapshot 0",
            icon: icon,
            description: "Description of Snapshot 0",
            date: new Date($.now()).toJSON()
        };
        $('#selection').append(createTile(snapshots));
    };

    $('#selection').bind('click', function() {
        if(snapshotPool.length>1){
            showSnapShots();                   
        }
    });

    $('#blackOverlay').bind('click', function(){
        $('#container').hide();
        $('#blackOverlay').hide();
    });
}


function showSnapShots(){
    $('#container').empty();

    for(var i=0;i<snapshotPool.length;i++){
          var tile = createTile(snapshotPool[i]);

          tile.bind('click', function() {
              console.log("user selected "+this.id);
              $('#selection').empty();
              $('#selection').append(createTile(snapshotPool[this.id]));
              $('#container').hide();
              $('#blackOverlay').hide();
          });
          $('#container').append(tile);
    }
    $('#container').show();
    $('#blackOverlay').show();
}

                  
function createTile(snapshot){
    var table = $('<table></table>');
    table.attr('id',snapshot.ID);
    var firstRow = $('<tr></tr>');
    firstRow.append($('<td></td>').attr('rowspan',3).append( $('<img />',{src: snapshot.icon, alt:'ICON'})));
    firstRow.append($('<td></td>').text(snapshot.title));
    table.append(firstRow);
    table.append($('<tr><td></td></tr>').text(snapshot.description));
    var d = new Date(snapshot.date);
    table.append($('<tr><td></td></tr>').text(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()));

  	return table;
}


function createInitialSidebar(){
    //$('#popSidebar').width(200);
    var width = $('#popSidebar').width();
    var height = $('#popSidebar').height();
    popChatManager  = new ChatManager('popSidebar', width, height);
    waterChatManager = new ChatManager('waterSidebar', width, height);
    scarcityChatManager = new ChatManager('scarcitySidebar', width, height);

    var history=[];
    // for(var i=0;i<5;i++){
    //     history.push({time:i, text:"Test "+i});
    //     }
    popChatManager.showHistory(history);
    waterChatManager.showHistory(history);
    scarcityChatManager.showHistory(history);
}