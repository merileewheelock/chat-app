// We need the http and fs modiles to make the app work
var http = require("http");
var fs = require("fs");

var server = http.createServer((req, res)=>{
	console.log("Someone connected via HTTP!");
})

// console.log("The node file is working.");

server.listen(8080);
console.log("Listening on port 8080!");