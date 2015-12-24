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


    var today = $filter('date')(new Date, 'fullDate');


    var path = $location.path();
    var pathItems = path.split('/');
    var zipcode = decodeURIComponent(pathItems[pathItems.length - 1]);
    console.log('zipcode = ' + zipcode);

    apiQueryService.queryUV({
        zipcode: zipcode
    }).then(
        function(results) {
            $rootScope.showLoading('#uvloading', true);

            for (var i = 0; i < results.length; i++) {
                var currentUVIndex = results[i],
                    color, uvdata;
                switch (true) {
                    case (currentUVIndex.UV_VALUE <= 2):
                        color = "#4eb400";
                        break;
                    case (currentUVIndex.UV_VALUE <= 5):
                        color = "#f7e400";
                        break;
                    case (currentUVIndex.UV_VALUE <= 7):
                        color = "#f85900";
                        break;
                    case (currentUVIndex.UV_VALUE <= 10):
                        color = "#d8001d";
                        break;
                    case (currentUVIndex.UV_VALUE >= 11):
                        color = "#998cff";
                        break;
                }

                uvdata = {
                    "label": moment(currentUVIndex.DATE_TIME, 'MMM-DD-YYYY HH a').format('h A'),
                    "value": currentUVIndex.UV_VALUE,
                    "color": color
                };

                $scope.uvDataSet.push(uvdata);

            }
            $scope.uvDataReady = true;
            $rootScope.showLoading('#uvloading', false);




        },
        function(error) {
            console.error(JSON.stringify(error));
        }
    );

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
        apiQueryService.queryAQICurrent({
            zipcode: zipcode
        }).then(


            function(results) {


                for (var i = 0; i < results.length; i++) {
                    var currentIndex = results[i],
                        aqiData;
                    $scope.currentAQI[i] = currentIndex.AQI;
                    $scope.currentAQISeries[i] = currentIndex.ParameterName;


                    aqiData = {
                        "label": moment(currentUVIndex.DATE_TIME, 'MMM-DD-YYYY HH a').format('h A'),
                        "value": currentUVIndex.UV_VALUE,
                        "color": color
                    };

                    $scope.aqiFullData.push(aqiData);
                }*/

    /*chart - data = "aqiFullData"
    chart - labels = "aqiFullLables"
    chart - series = "aqiFullSeries" >

        $scope.aqiFullData = [];
    $scope.aqiFullLables = [];
    $scope.aqiFullSeries = [];*/

    /*


                $scope.uvForecastValue = [
                    [],
                    [300, testnum, 100, 40, 120],
                    []
                ];
                $scope.uvForecastDateTime = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
                $scope.UVIndex = ["", "UVI", ""];
                console.log($scope.uvForecastDateTime);
                console.log($scope.uvForecastValue);
                console.log($scope.UVIndex);






            },
            function(error) {
                console.error(JSON.stringify(error));
            }
        );


    */







    $scope.currentAQILabel = [today];




    $scope.uviBCOptions = {
        chart: {
            type: 'discreteBarChart',
            height: 450,
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
                axisLabel: $filter('date')(new Date, 'fullDate'),
                orient: "bottom",
                height: 100
            },
            yAxis: {
                axisLabel: 'UV Index',
                axisLabelDistance: 50,

            },
            "noData": "You're data is loading",
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



    function i(n) {
        return o(n)
    }


    function e(e) {
        return i[((u.get(e) || ("range" === t.t ? u.set(e, n.push(e)) : 0 / 0)) - 1) % i.length]
    }




}]);