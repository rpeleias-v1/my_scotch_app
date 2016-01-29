module.exports = function(app) {

	var controller = {};
	var User = app.models.user;

	controller.getUsers = function(req, res) {
		User.find().exec()
		.then(
			function(users) {
				res.json(users);
			}, 
			function(err) {
				res.send(err);
			}
		);
	});

	controller.registerUser = function(req, res) {	
		User.create(req.body)	
		.then(
			function(user) {
				res.status(201).json(user);
			},
			function(err) {
				console.log(err);
				res.send(err);
			}
		);		
	});

	controller.findUsers = function(req, res) {
		var lat = req.body.latitude;
		var long = req.body.longitude;
		var distance = req.body.distance;
		var male = req.body.male;
		var female = req.body.female;
		var other = req.body.other;
		var minAge = req.body.minAge;
		var maxAge = req.body.maxAge;
		var favLang = req.body.favlang;
		var reqVerified = req.body.reqVerified;

		var query = User.find({});

		if (distance) {
			query = query.where('location').near({center: {type: 'Point', coordinates: [long, lat]},
				maxDistance: distance * 1609.34, spherical: true});
		}

		if (male || female || other) {
			query.or([{ 'gender': male}, { 'gender': female}, {'gender': other}]);
		}
		if (minAge) {
			query = query.where('age').gte(minAge);
		}

		if (maxAge) {
			query = query.where('age').lte(maxAge);
		}

		if (favLang) {
			query = query.where('favlang').lte(favLang);
		}

		if (reqVerified) {
			query = query.where('htmlverifiedage').equals('No, thanks!');
		}

		query.exec()
		.then(
			function(users) {			
				res.json(users);
			}, 
			function(err) {
				res.send(err);
			}
		);
	});

	return controller;

}