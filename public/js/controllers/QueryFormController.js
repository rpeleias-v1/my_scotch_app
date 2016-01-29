angular.module('meanMapApp').controller('QueryFormController', function($scope, $log, UserSearch, $rootScope, geolocation, gservice) {
    $scope.formData = {};

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
        UserSearch.query({params: $scope.formData}, 
            function(queryResults) {
                gservice.refresh($scope.formData.latitude, $scope.formData.longitude, queryResults);
                $scope.queryCount = queryResults.length;
            }
            ,function(err) {
                console.log('Error: ' + err);
            }
        );
    }
});
