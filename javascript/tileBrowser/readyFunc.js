$( document ).ready(function() {

    socket = io();

    snapshotPool = [];

    socket.on('connectionEstablished', function(init){
      // snapshotPool = [];  
      snapshotPool = init.snapshots;
    });

    socket.on('newSnapshotCreated', function(snapshot){
      // snapshotPool = [];
      snapshotPool.push(snapshot);
    });

    initSnapShot();

});

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
  firstRow.append($('<td></td>').attr('rowspan',3).append( $('<img />',{src: snapshot.icon, alt:'MyAlt'})));
  firstRow.append($('<td></td>').text(snapshot.title));
  table.append(firstRow);
  table.append($('<tr><td></td></tr>').text(snapshot.paramInfo+"/n"+snapshot.mapInfo));
  var d = new Date(snapshot.date);
  table.append($('<tr><td></td></tr>').text(d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()));

  return table;
}