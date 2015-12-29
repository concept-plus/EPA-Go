'use strict';

/**
 * @ngdoc overview
 * @name epaApp
 * @description
 * # epaApp
 *
 * Main module of the application.
 */
angular
  .module('epaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js',
    'nvd3',
    'angularMoment',
    'services'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/results/:zip', {
        templateUrl: 'views/results.html',
        controller: 'ResultsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('RootCtrl', function($rootScope, $location){
    angular.element('#api-button a').click(function(e) {
      e.preventDefault();
    });
    $rootScope.submitSearch = function(q){
      if (q === undefined || q === '') {
        $rootScope.invalid = true;
      } else {
        //angular.element('.navmenu').offcanvas('hide');
        $rootScope.invalid = false;
        //$rootScope.category = 'drug';
        $location.path('/results/' + encodeURIComponent(q));
      }
    };
    $rootScope.showLoading = function(id, bool){
      if (bool) {
        angular.element(id).show();
      } else {
        angular.element(id).hide();
      }
    };

    $rootScope.resetSidemenu = function(){
      // Make sure the left nav menus are closed.
      if (angular.element('.canvas-slid').length > 0) {
        angular.element('.navmenu').offcanvas('hide');
      }
    };

    $rootScope.getRecall = function(type){
      angular.element('api-called').empty();
      $rootScope.category = type;
      $location.path('/results/' + type);
      $rootScope.resetSidemenu();
    };

    $rootScope.toggleAPI = function(){
      angular.element('#api-well').collapse('toggle');
    };

    $rootScope.toggleHelp = function(){
      angular.element('#helpModal').modal('show');
    };
  });
