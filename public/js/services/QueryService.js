angular.module('meanMapApp').factory('UserSearch', function($resource) {
	return $resource('/query/:id');
});