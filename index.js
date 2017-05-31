// We need the http and fs modiles to make the app work
var http = require("http");
var fs = require("fs"); // file system

// Include socket.io, which was installed by npm. It is NOT part of core.
var socketio = require("socket.io");

var server = http.createServer((req, res)=>{
	console.log("Someone connected via HTTP!");
	if(req.url == '/'){
		fs.readFile('index.html', 'utf-8', (error,data)=>{
			// console.log(error);
			// console.log(data);
			if(error){
				res.writeHead(500, {'content-type':'text/html'});
				res.end('Internal Server Error');
			}else{
				res.writeHead(200,{'content-type':'text/html'});
				// The broswer sees what the below line of code has written inside of it
				res.end(data); // index.html is inside the variable data
			}
		});
	}else if(req.url == '/styles.css'){
		fs.readFile('styles.css', 'utf-8', (error,data)=>{
			if(error){
				res.writeHead(500, {'content-type':'text/css'});
				res.end('Internal Server Error');
			}else{
				res.writeHead(200,{'content-type':'text/css'});
				res.end(data);
			}
		});
	}
});

// Sockets use TCP/UDP. We need to start with HTTP.

// sockets.io:
// .on = you got a message
// .emit = you want to send a message

var io = socketio.listen(server);

// Handle socket connections..
io.sockets.on('connect',(socket)=>{
	console.log("Someone connected via socket!");
	// console.log(socket);

	socket.on('nameToServer',(name)=>{
		console.log(name + " just joined.");
		io.sockets.emit('newUser',name);
		// namesArray = [];
		// namesArray.push(name);
		// console.log(namesArray);
	});
	socket.on('sendMessage', ()=>{
		console.log("Someone clicked send");
	});
	// One person submits to the server, then the server sends to everybody
	socket.on('messageToServer',(messageObj)=>{
		var date = new Date();
		var currentTime = date.toLocaleTimeString();
		io.sockets.emit('messageToClient', `${messageObj.name} (${currentTime}): ` + messageObj.newMessage);
	});
});

// console.log("The node file is working.");

server.listen(8080);
console.log("Listening on port 8080!");