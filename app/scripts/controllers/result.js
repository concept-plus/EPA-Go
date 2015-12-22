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
        '$scope', '$rootScope', '$location',
        function($scope, $rootScope, $location) {
            $scope.path = $location.path();

        }
    ]);