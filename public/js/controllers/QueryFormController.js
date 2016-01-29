angular.module('meanMapApp').controller('QueryFormController', function($scope, $log, UserSearch, $rootScope, geolocation, gservice) {
    $scope.formData = {};
    var queryBody = {};

    geolocation.getLocation().then(function(data) {
        coords = {lat:data.coords.latitude, long:data.coords.longitude};
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);
    });

    $rootScope.$on('clicked', function() {
        $scope.$apply(function() {
            $scope.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
        });
    });

    $scope.queryUsers = function() {

        queryBody = {
            longitude: parseFloat($scope.formData.longitude),
            latitude: parseFloat($scope.formData.latitude),
            distance: parseFloat($scope.formData.distance),
            male: $scope.formData.male,
            female: $scope.formData.female,
            other: $scope.formData.other,
            minAge: $scope.formData.minAge,
            maxAge: $scope.formData.maxAge,
            favlang: $scope.formData.favlang,
            reqVerified: $scope.formData.reqVerified
        };

        UserSearch.query({params: queryBody}, function(queryResults) {
                gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

                $scope.queryCount = queryResults.length;
            }
            ,function(err) {
                console.log('Error: ' + err);
            }
        );
    }
});
