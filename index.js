var express = require('express');
var screenshot = require('./nodeservice/capturescreenshot');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var snapshots = [];
var clientIDs = 0;

app.use(express.static(__dirname));

app.get('/', function(req, res){
    console.log("Water Vis Requested");
    res.sendFile("index.html", {"root": __dirname});
});

app.get('/capturescreenshot', screenshot.capture);

io.on('connection', function(socket){
    var clientNumber = socket.handshake.query.clientNumber;
    if(clientNumber==-1)
	clientNumber = clientIDs++;

    console.log("user "+clientNumber+" connected");

    socket.join(clientNumber);

    socket.emit('connectionEstablished', {snapshots:snapshots, clientNumber:clientNumber});

    socket.on('disconnect', function(){
	console.log('User Disconnected');
    });

    socket.on('snapshotSended', function(snapshot){
        // receiving snapshot parameters from the client side
	   console.log("Snapshot Recieved:");
	   snapshot.ID = snapshots.length;
	   snapshots.push(snapshot);
	   io.emit('newSnapshotCreated', snapshot);

    });

    // broadcast snapshot to all users
    socket.on('snapshotSelected', function(data){
        // sending snapshot parameters to selected client
	   console.log("Snapshot Selected by User "+data.clientNumber);
	   socket.broadcast.to(data.clientNumber).emit('showSnapshot', data.snapshotID);
    });
});

http.listen(8880, function(){
    console.log('listening on *:8880');
});

/*
// send to current request socket client
socket.emit('message', "this is a test");

// sending to all clients, include sender
io.sockets.emit('message', "this is a test");

// sending to all clients except sender
socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
io.sockets.in('game').emit('message', 'cool game');

// sending to individual socketid
io.to(socketid).emit('message', 'for your eyes only');
*/
