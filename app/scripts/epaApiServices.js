var services = angular.module('openFdaServices', ['utilities']);

// options.category (required) - 'drug', 'device', or 'food'
// options.subcategory (required) - 'event', 'label', or 'enforcement'
// options.search (optiona) - openfda 'search' param, passed through
// options.page (optional) - page index
//
services.factory('openFdaQueryService', ['queryUtil', '$http', '$q', function(util, $http, $q) {
    'use strict';

    var OPEN_FDA_BASE_URL = 'https://api.fda.gov';

    var PAGE_SIZE = 100;

    var DEFAULT_OPTIONS = {
        search: null,
        page: 0
    };

    return {
        query: function(options) {

            options = angular.extend(DEFAULT_OPTIONS, options);

            var url = OPEN_FDA_BASE_URL + '/' + options.category + '/' + options.subcategory + '.json';

            var queryParams = [];
            if (options.search) {
                var search = options.search.replace(/\s+/g, '+'); // replace whitespace with '+' character according to openfda api
                queryParams.push({ name: 'search', value: search });
            }
            queryParams.push({ name: 'limit', value: PAGE_SIZE });
            if (options.page > 0) {
                var skip = PAGE_SIZE * options.page;
                queryParams.push({ name: 'skip', value: skip });
            }

            url += util.buildQueryString(queryParams);

            //console.log('querying: ' + url);

            // write to api-well
            angular.element('#api-called').append('<p><a href="' + url + '" target="_blank">' + url + '</a></p>');

            var deferred = $q.defer();
            var httpPromise = $http.get(url);

            httpPromise.success(function(data) {
                deferred.resolve(data);
            });
            httpPromise.error(function(response, statusCode) {
                if (statusCode === 404) {
                    // query succeeded, there just weren't any results
                    deferred.resolve({
                        meta: {
                            results: {
                                total: 0
                            }
                        },
                        results: []
                    });
                } else {
                    // actual error
                    deferred.reject(response);
                }
            });

            return deferred.promise;
        }
    };
}]);

services.factory('drugQueryService', ['openFdaQueryService', function(openFdaQueryService) {
    'use strict';

    return {
        findAdverseEventsByName: function(name, page) {
            return openFdaQueryService.query({
                category: 'drug',
                subcategory: 'event',
                search: 'patient.drug.openfda.brand_name:' + name,
                page: page
            });
        },
        findLabelingByName: function(name, page) {
            return openFdaQueryService.query({
                category: 'drug',
                subcategory: 'label',
                search: 'openfda.brand_name:' + name,
                page: page
            });
        },
        findEnforcementReportsByName: function(name, page) {
            return openFdaQueryService.query({
                category: 'drug',
                subcategory: 'enforcement',
                search: 'openfda.brand_name:' + name,
                page: page
            });
        },
        findEnforcementReportsByDate: function(startDate, endDate, page) {
            return openFdaQueryService.query({
                category: 'drug',
                subcategory: 'enforcement',
                search: 'recall_initiation_date:[' + startDate + '+TO+' + endDate + ']',
                page: page
            });
        }
    };
}]);

services.factory('deviceQueryService', ['openFdaQueryService', function(openFdaQueryService) {
    'use strict';

    return {
        // findAdverseEventsByName: function(name, page) {
        //     return openFdaQueryService.query({
        //         category: 'device',
        //         subcategory: 'event',
        //         search: 'openfda.substance_name:' + name,
        //         page: page
        //     });
        // },
        // findEnforcementReportsByName: function(name, page) {
        //     return openFdaQueryService.query({
        //         category: 'device',
        //         subcategory: 'enforcement',
        //         search: 'product_description:' + name,
        //         page: page
        //     });
        // },
        findEnforcementReportsByDate: function(startDate, endDate, page) {
            return openFdaQueryService.query({
                category: 'device',
                subcategory: 'enforcement',
                search: 'recall_initiation_date:[' + startDate + '+TO+' + endDate + ']',
                page: page
            });
        }
    };
}]);

services.factory('foodQueryService', ['openFdaQueryService', function(openFdaQueryService) {
    'use strict';

    return {
        // findEnforcementReportsByName: function(name, page) {
        //     return openFdaQueryService.query({
        //         category: 'food',
        //         subcategory: 'enforcement',
        //         search: 'product_description:' + name,
        //         page: page
        //     });
        // },
        findEnforcementReportsByDate: function(startDate, endDate, page) {
            return openFdaQueryService.query({
                category: 'food',
                subcategory: 'enforcement',
                search: 'recall_initiation_date:[' + startDate + '+TO+' + endDate + ']',
                page: page
            });
        }
    };
}]);
