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
		)
	};

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
		)		
	};

	controller.findUsers = function(req, res) {
		var queryParams = JSON.parse(req.query.params);		
		var lat = queryParams.latitude;
		var long = queryParams.longitude;
		var distance = queryParams.distance;
		var male = queryParams.male;
		var female = queryParams.female;
		var other = queryParams.other;
		var minAge = queryParams.minAge;
		var maxAge = queryParams.maxAge;
		var favLang = queryParams.favlang;
		var reqVerified = queryParams.reqVerified;
		
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
				res.send(users);
			}, 
			function(err) {
				res.send(err);
			}
		)
	};

	return controller;

}