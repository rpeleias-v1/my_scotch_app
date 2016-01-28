var addCtrl = angular.module('addCtrl', ['geolocation', 'gservice'])
addCtrl.controller('addCtrl', function($scope, $http, geolocation, gservice) {

		$scope.formData = {};
		var coords = {};
		var lat = 0;
		var long = 0;

		$scope.formData.latitude = -23.5503787;
		$scope.formData.longitude = -46.6361425;

		$scope.createUser = function() {
			var userData = {
				username: $scope.formData.username,
				gender: $scope.formData.gender,
				age: $scope.formData.age,
				favlang: $scope.formData.favlang,
				location: [$scope.formData.longitude, $scope.formData.latitude],
				htmlverified: $scope.formData.htmlverified
			};

			console.log(userData);

			$http.post('/users', userData)
				.success(function(data) {					
					$scope.formData.username = "";
					$scope.formData.gender = "";
					$scope.formData.age = "";
					$scope.formData.favlang = "";

					gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
				})
				.error(function(data) {
					console.log('Error: ' + data);
				});
		};
	}
);