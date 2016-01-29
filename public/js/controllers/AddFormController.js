angular.module('meanMapApp').controller('AddFormController', function($scope, User, $rootScope, geolocation, gservice) {

		$scope.formData = {};
		var coords = {};
		var lat = 0;
		var long = 0;

		$scope.formData.latitude = -23.5503787;
		$scope.formData.longitude = -46.6361425;

		//get user's lat and long equal to the HTML5 coordinates
		geolocation.getLocation().then(function(data) {
			//set the latitude and longitude equal to the HTML5 coordinates
			coords = {lat:data.coords.latitude, long:data.coords.longitude};
			$scope.formData.longitude = parseFloat(coords.long).toFixed(3);
			$scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
			$scope.formData.htmlverified = "No, thanks!";
			gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
		});

		$rootScope.$on("clicked", function() {
			$scope.$apply(function() {
				$scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
				$scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
				$scope.formData.htmlverified = "No, thanks!";
			});
		});

		$scope.createUser = function() {	

			$scope.userData = new User();		

			populateUserData();		
						
			$scope.userData.$save()
				.then(function() {
					$scope.formData.username = "";
					$scope.formData.gender = "";
					$scope.formData.age = "";
					$scope.formData.favlang = "";

					gservice.refresh($scope.formData.latitude, $scope.formData.longitude);
				})
				.catch(function(err) {
					console.log('Error: ' + err);
				}
			);
		};

		populateUserData = function() {
			$scope.userData.username = $scope.formData.username;
			$scope.userData.gender = $scope.formData.gender;
			$scope.userData.age = $scope.formData.age;
			$scope.userData.favlang = $scope.formData.favlang;
			$scope.userData.location = [$scope.formData.longitude, $scope.formData.latitude];
			$scope.userData.htmlverified = $scope.formData.htmlverified;	
		}
	}
);