var mongoose = require('mongoose');
var User = require('../models/model.js');

module.exports = function(app) {

	app.get('/users', function(req, res) {
		var query = User.find({});
		query.exec(function(err, users) {
			if (err) {
				res.send(err);
			}
			res.json(users);
		});
	});

	app.post('/users', function(req, res) {		
		var newUser = new User(req.body);
		console.log(newUser);

		newUser.save(function(err) {
			if (err) {
				res.send(err);
			}
			res.json(req.body);
		});
	});
}