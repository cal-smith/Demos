var net = require('net');
var http = require('http');

var server = http.createServer();

server.on('request', function(req, res) {
	var test = "<h1>test</h1>";
	res.writeHead(200, {
		'Content-Length': test.length,
		'Content-Type': 'text/html'
	});
	/*
	text/plain
	text/html
	text/css
	application/javascript
	*/
	res.write(test);
});

server.listen(8000);
console.log("up!")