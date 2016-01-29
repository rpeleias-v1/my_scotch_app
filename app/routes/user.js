module.exports = function(app) {

	var controller = app.controllers.user;

	app.route('/users').get(controller.getUsers);

	app.route('/users').post(controller.registerUser);

	app.route('/query').post(controller.findUsers);		
}