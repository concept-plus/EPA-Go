'use strict';

/**
 * @ngdoc function
 * @name epaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the epaApp
 */


angular.module('epaApp')

.controller('ResultsCtrl', ['$scope', '$rootScope', '$location', '$filter', 'apiQueryService', function($scope, $rootScope, $location, $filter, apiQueryService) {
    $scope.path = $location.path();
    $scope.currentAQI = [];
    $scope.currentAQI2 = [];
    $scope.currentAQISeries = [];

    $scope.uvForecastDateTime = [];
    $scope.uvForecastOrder = [];
    $scope.uvForecastValue = [];


    var today = $filter('date')(new Date, 'fullDate');
    console.log(today);
    var i = 0;

    var path = $location.path();
    var pathItems = path.split('/');
    var zipcode = decodeURIComponent(pathItems[pathItems.length - 1]);
    console.log('zipcode = ' + zipcode);

    apiQueryService.queryUV({
        zipcode: zipcode
    }).then(
        function(results) {
            console.log(results);

            for (i; i < results.length; i++) {
                var currentUVIndex = results[i];
                $scope.uvForecastDateTime[i] = currentUVIndex.DATE_TIME;
                $scope.uvForecastOrder[i] = currentUVIndex.ORDER;
                $scope.uvForecastValue[i] = currentUVIndex.UV_VALUE;
                //console.log(currentUVIndex.DATE_TIME);
            }
            console.log($scope.uvForecastDateTime);

        },
        function(error) {
            console.error(JSON.stringify(error));
        }
    );

    apiQueryService.queryAQI({
        zipcode: zipcode
    }).then(


        function(results) {
            console.log(results);

            for (i; i < results.length; i++) {
                var currentIndex = results[i];
                $scope.currentAQI[i] = [currentIndex.AQI];
                $scope.currentAQI2[i] = currentIndex.AQI;
                $scope.currentAQISeries[i] = currentIndex.ParameterName;
                $scope.currentAQICategoryName = currentIndex.Category.Name;
                $scope.currentAQICategoryNum = currentIndex.Category.Number;
            }
            console.log($scope.currentAQI);
            console.log($scope.currentAQISeries);


        },
        function(error) {
            console.error(JSON.stringify(error));
        }
    );


    var today = $filter('date')(new Date, 'longDate ');

    $scope.currentAQILabel = [today];


    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];






}]);