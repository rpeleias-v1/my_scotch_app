angular.module('meanMapApp', ['addCtrl' ,'queryCtrl', 'geolocation', 'gservice', 'ngRoute'])
	.config(function($routeProvider) {

		$routeProvider.when('/join', {
			controller: 'addCtrl',
			templateUrl: 'partials/addForm.html'
		});

		$routeProvider.when('/find', {
			controller: 'queryCtrl',
			templateUrl: 'partials/queryForm.html'
		});

		$routeProvider.otherwise({
			redirectTo: '/join'
		});
	});