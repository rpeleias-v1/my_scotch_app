angular.module('meanMapApp').factory('User', function($resource) {
	return $resource('/users/:id');
});