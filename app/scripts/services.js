var queryServices = angular.module('services', ['utilities', 'openFdaServices']);

queryServices.factory('fdaGoQueryService', ['queryUtil', '$q', 'drugQueryService', 'deviceQueryService', 'foodQueryService',
    function(util, $q, drugQueryService, deviceQueryService, foodQueryService) {
        'use strict';

        return {
            findDrugEvents: function(name, page) {
                return drugQueryService.findAdverseEventsByName(name, page);
            },
            findDrugLabeling: function(name, page) {
                return drugQueryService.findLabelingByName(name, page);
            },
            findDrugRecalls: function(name, page) {
                return drugQueryService.findEnforcementReportsByName(name, page);
            },
            getRecentDrugRecalls: function(page) {
                return drugQueryService.findEnforcementReportsByDate(util.getOneYearAgo(), util.getToday(), page);
            },
            getRecentDeviceRecalls: function(page) {
                return deviceQueryService.findEnforcementReportsByDate(util.getOneYearAgo(), util.getToday(), page);
            },
            getRecentFoodRecalls: function(page) {
                return foodQueryService.findEnforcementReportsByDate(util.getOneYearAgo(), util.getToday(), page);
            }
        };
    }]);
