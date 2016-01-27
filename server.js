var express = require('express');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

//connect to mongoose
mongoose.connect("mongodb://localhost/MeanMapApp");

//Logging and parsing
app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

//routes
require('./app/routes/routes.js')(app);

app.listen(port);
console.log('App listening on port ' + 3000);