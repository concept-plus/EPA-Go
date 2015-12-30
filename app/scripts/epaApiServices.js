var services = angular.module('services', []);

/* @param options {object}
 *   options.zipcode (required) - 5-digit zipcode
 */
services.factory('apiQueryService', ['$http', '$q', function($http, $q) {
    'use strict';

    var BASE_URL = 'http://52.90.111.204:8181/relay';

    function query(url) {
        console.log('querying: ' + url);

        // write to api-well
        angular.element('#api-called').append('<p><a href="' + url + '" target="_blank">' + url + '</a></p>');

        // query back-end service
        var deferred = $q.defer();
        var httpPromise = $http.get(url);

        httpPromise.success(function(response) {
            deferred.resolve(response);
        });
        httpPromise.error(function(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    var factory = {

        queryAQICurrent: function(options) {
            var url = BASE_URL + '/aqi-current?zipcode=' + options.zipcode;
            return query(url);
        },

        queryAQIRange: function(options) {
            var url = BASE_URL + '/aqi-range?zipcode=' + options.zipcode;
            return query(url);
        },

        queryUV: function(options) {
            var url = BASE_URL + '/uv?zipcode=' + options.zipcode;
            return query(url);
        }
    };
    return factory;
}]);
