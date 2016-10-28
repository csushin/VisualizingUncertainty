function SnapshotManager(containerID, groupOptions){
    this.containerID = containerID;
    this.snapshots = [];
    this.groupOptions = groupOptions;

    this.groupBy;

    // Debugging
    /*
    this.groupOptions = [];
    this.groupOptions['year'] = ['ClimMean', 'Dry', 'Wet', '1960', '1965', '1970', '1975', '1980', '1985', '1990', '1995', '2000', '2005', '2010', '2015', '2020', '2025', '2030', '2035', '2040', '2045', '2050', '2055', '2060', '2065', '2070', '2075', '2080', '2085', '2090', '2095', '2100'];

    this.groupOptions['gModel'] = ['MPI-ESM-LR', 'HadGEM2-ES', 'EC-EARTH-r12', 'CNRM-CM5', 'EC-EARTH-r3'];
    this.groupOptions['rModel'] = ['CCLM', 'HIRHAM'];

    for(var i=0;i<15;i++){
	this.snapshots.push({
            ID: i,
            title: "Snapshot "+i,
            userName: "User 1",
            description: "Description of Snapshot "+i,
            date: new Date($.now()).toJSON(),
	    gModel: this.groupOptions['gModel'][i%3],
	    rModel: this.groupOptions['rModel'][i%2],
	    year: this.groupOptions['year'][3+i%4]
        });
    }
    */
}

SnapshotManager.prototype.setSnapshots = function(snapshots){
    this.snapshots = snapshots;
}

SnapshotManager.prototype.addSnapshot = function(snapshot){
    this.snapshots.push(snapshot);
}

SnapshotManager.prototype.showSnapshots = function(){
    $('#'+this.containerID).empty();

	
	
    var group = this.groupOptions[this.groupBy];

    for(var i=0;i<group.length;i++){
	var groupContainer = $('<div></div>');
	groupContainer.attr('class','groupContainer');
	groupContainer.attr('id',group[i]);
	groupContainer.append($('<h1></h1>').text(group[i]));
        $('#'+this.containerID).append(groupContainer);
    }

    for(var i=0;i<this.snapshots.length;i++){
        var tile = this.createSnapshotTile(this.snapshots[i]);

        tile.bind('click', function() {
	    window.dispatchEvent(
			new CustomEvent('SnapshotClicked', { 'detail':{'snapshotID': this.id} })
	    );
        });

        $('#'+this.snapshots[i][this.groupBy]).append(tile);
    }

    $('.groupContainer:not(:has(>table))').remove();
}

SnapshotManager.prototype.createSnapshotTile = function(snapshot){
  var table = $('<table></table>');
  table.attr('id',snapshot.ID);snapshot
  table.attr('class','snapshot');
  var row = $('<tr></tr>');  
  row.append($('<td></td>').attr('rowspan',3).append($('<h1></h1>').text(snapshot.ID)));  
  row.append($('<td></td>').text(snapshot.title).attr('colspan',2));
  table.append(row);

  row = $('<tr></tr>');
  row.append($('<td></td>').text('User:'));
  row.append($('<td></td>').text(snapshot.user));
  table.append(row);

  var d = new Date(snapshot.date);
  row = $('<tr></tr>');
  row.append($('<td></td>').text('Date:'));
  var shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  row.append($('<td></td>').text((shortMonths[d.getMonth()])+'-'+d.getDate()+'-'+d.getFullYear()+', '+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()));
  // row.append($('<td></td>').text(parseInt(1+2*Math.random())+'-'+parseInt(1+13*Math.random())+'-'+d.getFullYear()+', '+parseInt(8+8*Math.random())+":"+parseInt(10+50*Math.random())+":"+parseInt(10+50*Math.random())));
  table.append(row);

  return table;
} 
