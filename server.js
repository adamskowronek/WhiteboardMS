var mysql = require('mysql');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.json());

var con = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'whiteboard'
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/index.html")
});

app.post('/save', function(request, response) {
	var image = request.body.image;
	var sql = "INSERT INTO whiteboards (whiteboard, participantId) VALUES ('"+image+"', '1')";
	con.query(sql, function (err, result) {
		if (err) throw err;
		console.log("Record inserted!");
	});
});

app.get('/load', function(request, response) {
	var sql = "SELECT * FROM whiteboards WHERE participantId = 1";
	con.query(sql, function (err, result, fields) {
		if (err) throw err;
		console.log("Fetching whiteboard: " + result[result.length-1].id);
		response.json({ image: result[result.length-1].whiteboard });
	});
});

http.listen(3000, function() {
	console.log("Server is running on port 3000...");
});
