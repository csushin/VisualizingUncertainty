var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var clientIDs =0;

app.get('/', function(req, res){
    res.sendFile("index.html", {"root": __dirname});
});

app.get('/overview', function(req, res){
    res.sendFile("index2.html", {"root": __dirname});
});

io.on('connection', function(socket){
    var clientNumber = socket.handshake.query.clientNumber;
    console.log(clientNumber);
    if(clientNumber==-1)
	clientNumber = clientIDs++;

    socket.join(clientNumber);
    socket.emit('serverMessage', {msg:'welcome', clientNumber:clientNumber});

    console.log("user "+clientNumber+" connected");

    socket.on('chat message', function(msg){
	console.log("msg: "+msg);
	io.emit('chat message', msg);
    });

    socket.on('fieldSelected', function(data){
	socket.broadcast.to(data.clientNumber).emit('chat message', 'Bob');
    });
});

http.listen(1338, function(){
    console.log('listening on *:1338');
});
