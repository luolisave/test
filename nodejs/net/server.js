var net = require('net'); // net: http://www.hacksparrow.com/tcp-socket-programming-in-node-js.html
var fs = require('fs');   // fs:  http://stackoverflow.com/questions/3459476/how-to-append-to-a-file-in-node

var HOST = '127.0.0.1';
var PORT = 10701; //107 looks like IoT

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
      var date = new Date();
      var dateStr = date.toISOString();
      var tmpMsg = "["+dateStr + "]" + data + "\r\n";

      console.log('DATA ' + sock.remoteAddress + ': ' + data);
      // Write the data back to the socket, the client will receive it as data from the server
      sock.write("["+dateStr + "]" + data);
      // append incomming data to log.txt file. (with time)
      fs.appendFile('log.txt', tmpMsg, function (err) {
        if(err){
          //put error handler here.
          console.log("file not logged, error: ", err);
        }else{

        }
      });

    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);
