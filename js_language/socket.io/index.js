var socket = require('socket.io-client')('http://localhost:8080');


socket.on('connect', function(){
    console.log("connected");
});
socket.on('event', function(data){
    console.log("event data=", data);
});
socket.on('disconnect', function(){
    console.log("disconnect");
});


 console.log('current IP:PORT on: '+process.env.IP+':'+process.env.PORT+'');