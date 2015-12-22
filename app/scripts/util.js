// angular.module('appServices', ['appUtilities']).factory('openFdaQueryService', ['$http', '$q', 'queryUtil', function($http, $q, util) {

angular.module('utilities', []).factory('queryUtil', ['$filter', function($filter) {
    'use strict';

    return {
        getToday: function() {
            return $filter('date')(new Date(), 'yyyyMMdd');
        },
        getTwoMonthsAgo: function() {
            var then = new Date();
            then.setMonth(then.getMonth() - 2);
            return $filter('date')(then, 'yyyyMMdd');
        },
        getOneYearAgo: function() {
            var then = new Date();
            then.setFullYear(then.getFullYear() - 1);
            return $filter('date')(then, 'yyyyMMdd');
        },
        removeDuplicateDrugs: function(drugs) {
            var uniqueDrugs = [];
            var drugHash = {};
            angular.forEach(drugs, function(drug) {
                if (!drugHash[drug.brand_name]) {
                    uniqueDrugs.push(drug);
                    drugHash[drug.brand_name] = true;
                }
            });
            return uniqueDrugs;
        },
        buildQueryString: function(queryParams) {
            var queryString = '';
            if (angular.isArray(queryParams) && queryParams.length > 0) {
                queryString += '?';

                var counter = 0;
                queryParams.forEach(function(param) {
                    queryString += (counter++ > 0 ? '&' : '') + param.name + '=' + param.value;
                });
            }
            return queryString;
        }
    };
}]);
