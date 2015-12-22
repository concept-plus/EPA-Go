'use strict';

/**
 * @ngdoc function
 * @name fdagoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fdagoApp
 */
angular.module('epaApp').controller('MainCtrl', ['$rootScope', '$scope', function($rootScope, $scope) {
    // reset sidemenu
    angular.element('body').attr('id', 'main-page');
    angular.element('#sidemenu-content').appendTo('#sidemenu');
    angular.element('#api-well').collapse('hide');
    this.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
    $scope.invalid = false;

    $scope.submitSearch = function(q) {
        if (q === undefined || q === '') {
            $scope.invalid = true;
            angular.element('#search-bx').focus();
        } else {
            $rootScope.invalid = false;
            $rootScope.submitSearch(q);
        }
    };


    $scope.$watch('zipSearchString', function(newValue, oldValue) {
        if (newValue !== oldValue && newValue !== null) {
            if (newValue.length === 5) {
                angular.element('#search-button').attr('disabled', false);
            } else {
                angular.element('#search-button').attr('disabled', true);
            }
        }
    });

    setTimeout(function() {
        angular.element('#search-box').focus();
    }, 0);
}]);