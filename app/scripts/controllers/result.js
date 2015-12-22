'use strict';

/**
 * @ngdoc function
 * @name epaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the epaApp
 */
angular.module('epaApp')
    .controller('ResultsCtrl', [
        '$scope',
        '$rootScope',
        '$location',
        'apiQueryService',
        function($scope, $rootScope, $location, apiQueryService) {
            $scope.path = $location.path();

            var path = $location.path();
            var pathItems = path.split('/');
            var zipcode = decodeURIComponent(pathItems[pathItems.length - 1]);
            console.log('zipcode = ' + zipcode);

            apiQueryService.queryUV({ zipcode: zipcode }).then(
                function(results) {
                    console.log(results);
                },
                function(error) {
                    console.error(JSON.stringify(error));
                }
            );

            apiQueryService.queryAQI({ zipcode: zipcode }).then(
                function(results) {
                    console.log(results);
                },
                function(error) {
                    console.error(JSON.stringify(error));
                }
            );
        }




    ]);