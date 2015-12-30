'use strict';

/**
 * @ngdoc function
 * @name epaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the epaApp
 */


angular.module('epaApp')

.controller('ResultsCtrl', ['$scope', '$rootScope', '$location', '$filter', 'apiQueryService', '$interval', 'moment', function($scope, $rootScope, $location, $filter, apiQueryService, $interval, moment) {
    $scope.path = $location.path();
    $scope.currentAQI = [];
    $scope.currentAQI2 = [];
    $scope.currentAQISeries = [];
    $scope.uvForecastDateTime = [];
    $scope.uvForecastOrder = [];
    $scope.uvForecastValue = [];

    $scope.uvDataSet = [];
    $scope.uvDataReady = false;

    $scope.aqiFullData = [];
    $scope.aqiFullLables = [];
    $scope.aqiFullSeries = [];
    $scope.aqiParams = [];
    $scope.aqiDates = [];
    $scope.ozoneValues = [];
    $scope.pm25Values = [];
    $scope.pm10Values = [];

    $scope.exposureCategory = "";
    $scope.exposureContent = [];


    var path = $location.path();
    var pathItems = path.split('/');
    var zipcode = decodeURIComponent(pathItems[pathItems.length - 1]);
    $scope.zip = zipcode;
    console.log('zipcode = ' + zipcode);


    /*
    AQI
    */
    apiQueryService.queryAQICurrent({
        zipcode: zipcode
    }).then(


        function(results) {


            for (var i = 0; i < results.length; i++) {
                var currentIndex = results[i];
                $scope.currentAQI2[i] = currentIndex.AQI;
                $scope.currentAQISeries[i] = currentIndex.ParameterName;

            }

        },
        function(error) {
            console.error(JSON.stringify(error));
        }
    );
    /* 
    UV
    */
    apiQueryService.queryUV({
        zipcode: zipcode
    }).then(
        function(results) {
            $rootScope.showLoading('#uvloading', true);
            console.log(results);
            if (results.length === 0){
                alert('Please double check the Zip code enetered as no data was returned.');

            }

            for (var i = 0; i < results.length; i++) {
                var currentUVIndex = results[i],
                    color, uvdata;

                switch (true) {
                    case (currentUVIndex.UV_VALUE <= 2):
                        color = "#4eb400";
                        $scope.exposureCategory = "Low";
                        $scope.exposureContent = ['Wear sunglasses on bright days.',
                            'If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen.',
                            'Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure.'
                        ];
                        break;
                    case (currentUVIndex.UV_VALUE <= 5):
                        color = "#f7e400";
                        $scope.exposureCategory = "Moderate";
                        $scope.exposureContent = [
                            "Stay in shade near midday when the sun is strongest.",
                            "If outdoors, wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.",
                            "Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating.",
                            "Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure."
                        ];
                        break;
                    case (currentUVIndex.UV_VALUE <= 7):
                        color = "#f85900";
                        $scope.exposureCategory = "High";
                        $scope.exposureContent = ["Reduce time in the sun between 10 a.m. and 4 p.m.",
                            "If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.", "Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating.",
                            "Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure."
                        ];
                        break;
                    case (currentUVIndex.UV_VALUE <= 10):
                        color = "#d8001d";
                        $scope.exposureCategory = "Very High";
                        $scope.exposureContent = ["Minimize sun exposure between 10 a.m. and 4 p.m.", "If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.",
                            "Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating.",
                            "Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure."
                        ];
                        break;
                    case (currentUVIndex.UV_VALUE >= 11):
                        color = "#998cff";
                        $scope.exposureCategory = "Extreme";
                        $scope.exposureContent = ["Minimize sun exposure between 10 a.m. and 4 p.m.", "If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.",
                            "Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating.",
                            "Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure."
                        ];
                        break;
                }

                uvdata = {
                    "label": moment(currentUVIndex.DATE_TIME, 'MMM-DD-YYYY HH a').format('h A'),
                    "value": currentUVIndex.UV_VALUE,
                    "color": color
                };

                $scope.uvDataSet.push(uvdata);

                //Getting the current UV Index for the entered ZIP
                if (moment(currentUVIndex.DATE_TIME, 'MMM-DD-YYYY HH a').format('h A') === moment().format('h A')) {
                    $scope.currentUVI = currentUVIndex.UV_VALUE;

                    $scope.uvColor = {
                        'color': color,
                        'text-align': 'center'

                    };
                }

            }
            $scope.uvDataReady = true;
            $rootScope.showLoading('#uvloading', false);

        },
        function(error) {
            console.error(JSON.stringify(error));
        }
    );

    $scope.uviBCOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 300,
            margin: {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            x: function(d) {
                return d.label;
            },
            y: function(d) {
                return d.value;
            },
            showValues: false,
            transitionDuration: 500,
            xAxis: {
                rotateLabels: 90,
                axisLabel: $filter('date')(new Date(), 'fullDate'),
                orient: "bottom",
                height: 100
            },
            yAxis: {
                axisLabel: 'UV Index',
                axisLabelDistance: 50,

            },
            "noData": "Your data is loading...",
            "title": {
                "enable": true,
                "text": "UV Index",
                "className": "h4",
                "css": {
                    "width": "nullpx",
                    "textAlign": "center"
                }
            },
            "styles": {
                "classes": {
                    "with-3d-shadow": true,
                    "with-transitions": true,
                    "gallery": false
                },
                "css": {}
            }

        }
    };

    $scope.uviBCData = [{
        values: $scope.uvDataSet
    }];



}]);