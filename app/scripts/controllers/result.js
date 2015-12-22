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
        '$rootScope',
        function($rootScope) {
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        }
    ]);