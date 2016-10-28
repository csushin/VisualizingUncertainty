var options = function (editableLayers){
    var options = {
      draw: {
          polyline: false,
          polygon: false,
          circle: false, // Turns off this drawing tool
          rectangle: {
              shapeOptions: {
                  clickable: true,
                  opacity: 0.5,
                  color: "#0033ff",
                  fillColor: "#0033ff",
                  fillOpacity: 0.2
              }
          },
          marker: false
      },
      edit: {
          featureGroup: editableLayers, //REQUIRED!!
          remove: true
      }
    };
    return options;
};
var popEditableLayers = new L.FeatureGroup();
var waterEditableLayers = new L.FeatureGroup();
var scarcityEditableLayers = new L.FeatureGroup();

popMap.addLayer(popEditableLayers);
var popDrawControl = new L.Control.Draw(options(popEditableLayers));
popMap.addControl(popDrawControl);

waterMap.addLayer(waterEditableLayers);
var waterDrawControl = new L.Control.Draw(options(waterEditableLayers));
waterMap.addControl(waterDrawControl);

scarcityMap.addLayer(scarcityEditableLayers);
var scarcityDrawControl = new L.Control.Draw(options(scarcityEditableLayers));
scarcityMap.addControl(scarcityDrawControl);


popMap.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }
    deleteAllLayers();
    console.log(layer._latlngs[0]);
    var bounds = [layer._latlngs[0], layer._latlngs[2]];
    var rect1 = new L.rectangle(bounds);
    var rect2 = new L.rectangle(bounds);
    popEditableLayers.addLayer(layer);
    waterEditableLayers.addLayer(rect1);
    scarcityEditableLayers.addLayer(rect2);
    console.log(layer.getBounds());
    console.log(layer.getBounds());
    if(ComEventCue.connection){
      SendSyncAddHighlightInfo(layer);
    }
});

popMap.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        var bounds = [layer._latlngs[0], layer._latlngs[2]];
        waterEditableLayers.eachLayer(function(layer){
          layer.setBounds(bounds);
        });
        scarcityEditableLayers.eachLayer(function(layer){
          layer.setBounds(bounds);
        });
        if(ComEventCue.connection){
          SendSyncReSizeHighlightInfo(layer);
        }
 
    });
});

popMap.on('draw:deleted', function (e) {
    var layers = e.layers;
    waterEditableLayers.eachLayer(function(layer){
          waterEditableLayers.removeLayer(layer);
    });
    scarcityEditableLayers.eachLayer(function(layer){
          scarcityEditableLayers.removeLayer(layer);
    });
    if(ComEventCue.connection){
        SendSyncRemoveHighlightInfo();
    }

});


waterMap.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }
    deleteAllLayers();
    var bounds = [layer._latlngs[0], layer._latlngs[2]];
    var rect1 = new L.rectangle(bounds);
    var rect2 = new L.rectangle(bounds);
    waterEditableLayers.addLayer(layer);
    popEditableLayers.addLayer(rect1);
    scarcityEditableLayers.addLayer(rect2);
    if(ComEventCue.connection){
      SendSyncAddHighlightInfo(layer);
    }
});

waterMap.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        var bounds = [layer._latlngs[0], layer._latlngs[2]];
        popEditableLayers.eachLayer(function(layer){
          layer.setBounds(bounds);
        });
        scarcityEditableLayers.eachLayer(function(layer){
          layer.setBounds(bounds);
        });
        if(ComEventCue.connection){
          SendSyncReSizeHighlightInfo(layer);
        }
    });
});

waterMap.on('draw:deleted', function (e) {
    var layers = e.layers;
    popEditableLayers.eachLayer(function(layer){
          popEditableLayers.removeLayer(layer);
    });
    scarcityEditableLayers.eachLayer(function(layer){
          scarcityEditableLayers.removeLayer(layer);
    });
    if(ComEventCue.connection){
        SendSyncRemoveHighlightInfo();
    }
});

scarcityMap.on('draw:created', function (e) {
    var type = e.layerType,
        layer = e.layer;

    if (type === 'marker') {
        layer.bindPopup('A popup!');
    }
    deleteAllLayers();
    var bounds = [layer._latlngs[0], layer._latlngs[2]];
    var rect1 = new L.rectangle(bounds);
    var rect2 = new L.rectangle(bounds);
    scarcityEditableLayers.addLayer(layer);
    popEditableLayers.addLayer(rect1);
    waterEditableLayers.addLayer(rect2);
    highlightFlag = true;
    highlightBoundingBox = bounds;
    if(ComEventCue.connection){
          SendSyncAddHighlightInfo(layer);
    }
    if(ComGCAM.connection && gcamDemandSwitch){
      addGCAMDemandParser(bounds);
    }
});

scarcityMap.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        var bounds = [layer._latlngs[0], layer._latlngs[2]];
        waterEditableLayers.eachLayer(function(layer){
          layer.setBounds(bounds);
        });
        popEditableLayers.eachLayer(function(layer){
          layer.setBounds(bounds);
        });
        highlightFlag = true;
        highlightBoundingBox = bounds;
        if(ComEventCue.connection){
          SendSyncReSizeHighlightInfo(layer);
        }
        if(ComGCAM.connection && gcamDemandSwitch){
          removeGCAMDemandParser(bounds);
          addGCAMDemandParser(bounds);
        }
    });

});

scarcityMap.on('draw:deleted', function (e) {
    var layers = e.layers;
    waterEditableLayers.eachLayer(function(layer){
          waterEditableLayers.removeLayer(layer);
    });
    popEditableLayers.eachLayer(function(layer){
          popEditableLayers.removeLayer(layer);
    });
    highlightFlag = false;
    highlightBoundingBox = null;
    if(ComEventCue.connection){
          SendSyncRemoveHighlightInfo();
    }
    if(ComGCAM.connection && gcamDemandSwitch){
      removeGCAMDemandParser(bounds);
    }    
});

function deleteAllLayers(){
  waterEditableLayers.eachLayer(function(layer){
          waterEditableLayers.removeLayer(layer);
    });
  popEditableLayers.eachLayer(function(layer){
          popEditableLayers.removeLayer(layer);
  });
  scarcityEditableLayers.eachLayer(function(layer){
      scarcityEditableLayers.removeLayer(layer);
  }); 
}

function createLayer(bounds){
  var rect1 = new L.rectangle(bounds);
  var rect2 = new L.rectangle(bounds);
  var rect3 = new L.rectangle(bounds);
  deleteAllLayers();  
  popEditableLayers.addLayer(rect1);
  waterEditableLayers.addLayer(rect2);
  scarcityEditableLayers.addLayer(rect3);
}