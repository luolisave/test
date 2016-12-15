/**
* @Author: Li Luo
* @Date:   2016-12-14T14:54:52-05:00
* @Last modified by:   Li Luo
* @Last modified time: 2016-12-15T10:22:23-05:00
*/



var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//app.get('/', function (req, res) {
//    res.sendFile(__dirname + '/index.html');
//});

app.use(express.static(__dirname + '/public_html'));

var histories = [];
io.on('connection', function (socket) {
    socket.on('load history', function (msg) {
        // http://michaelheap.com/sending-messages-to-certain-clients-with-socket-io/
        io.sockets.connected[socket.id].emit("load history", histories);
        console.log("socket.id = ", socket.id);
    })
    socket.on('chat message', function (msg) {
        histories.push(msg);
        io.emit('chat message', msg);
    });

    socket.on('cmd', function (msg) {
        if (msg == 'clear') {
            histories = [];
            console.log('Server side history cleared.');
        }
    });
});

//*
http.listen(2016, function () {
    console.log('listening on *:2015');
});
//*/

/*
 //process.env.IP,
 //process.env.PORT
 http.listen(9090,  function(){
 console.log('listening on '+process.env.IP+':'+process.env.PORT+'');
 });
 //*/
