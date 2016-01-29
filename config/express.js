var express = require('express');
var load = require('express-load');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var helmet = require('helmet');

module.exports = function() {
	var app = express();	
	var port = process.env.PORT || 3000;
	app.set('port', port);
	
	app.use(express.static('./public'));
	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(morgan('dev'));	
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(bodyParser.text());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

	app.use(methodOverride());

	//helmet middlewares configuration
	app.disable('x-powered-by');
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());

	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
}