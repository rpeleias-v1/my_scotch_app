angular.module('meanMapApp', ['ngResource', 'geolocation', 'gservice', 'ngRoute'])
	.config(function($routeProvider) {

		$routeProvider.when('/join', {
			controller: 'AddFormController',
			templateUrl: 'partials/addForm.html'
		});

		$routeProvider.when('/find', {
			controller: 'QueryFormController',
			templateUrl: 'partials/queryForm.html'
		});

		$routeProvider.otherwise({
			redirectTo: '/join'
		});
	});