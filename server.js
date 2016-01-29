var http = require('http');
var app = require('./config/express')();
var database = require('./config/database')("mongodb://localhost/MeanMapApp");

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express Server listening on port ' + app.get('port'));
});