var services = angular.module('services', []);

/* @param options {object}
 *   options.zipcode (required) - 5-digit zipcode
 */
services.factory('apiQueryService', ['$http', '$q', function($http, $q) {
    'use strict';

    var BASE_URL = 'http://52.90.111.204:8181/relay';

    var factory = {

        queryAQICurrent: function(options) {

            var url = BASE_URL + '/aqi-current?zipcode=' + options.zipcode;

            console.log('querying: ' + url);

            // write to api-well
            // angular.element('#api-called').append('<p><a href="' + url + '" target="_blank">' + url + '</a></p>');

            var deferred = $q.defer();
            var httpPromise = $http.get(url);

            httpPromise.success(function(response) {
                // try {
                    deferred.resolve(response);
                // } catch(error) {
                //     deferred.reject('invalid response');
                // }
            });
            httpPromise.error(function(response, statusCode) {
                deferred.reject(response);
            });

            return deferred.promise;
        },

        queryAQIRange: function(options) {

            var url = BASE_URL + '/aqi-range?zipcode=' + options.zipcode;

            console.log('querying: ' + url);

            // write to api-well
            // angular.element('#api-called').append('<p><a href="' + url + '" target="_blank">' + url + '</a></p>');

            var deferred = $q.defer();
            var httpPromise = $http.get(url);

            httpPromise.success(function(response) {
                // try {
                    deferred.resolve(response);
                // } catch(error) {
                //     deferred.reject('invalid response');
                // }
            });
            httpPromise.error(function(response, statusCode) {
                deferred.reject(response);
            });

            return deferred.promise;
        },

        queryUV: function(options) {
            var url = BASE_URL + '/uv?zipcode=' + options.zipcode;

            console.log('querying: ' + url);

            // write to api-well
            // angular.element('#api-called').append('<p><a href="' + url + '" target="_blank">' + url + '</a></p>');

            var deferred = $q.defer();
            var httpPromise = $http.get(url);

            httpPromise.success(function(response) {
                if (typeof response === 'string') {
                    deferred.reject(response); // returned a 200 OK but it was an error message
                } else {
                    deferred.resolve(response);
                }
            });
            httpPromise.error(function(response, statusCode) {
                deferred.reject(response); //
            });

            return deferred.promise;
        }
    };
    return factory;
}]);
