'use strict';

/**
 * @ngdoc function
 * @name epaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the epaApp
 */


angular.module('epaApp')

.controller('ResultsCtrl', ['$scope', '$rootScope', '$location', '$filter', 'apiQueryService', '$interval', function($scope, $rootScope, $location, $filter, apiQueryService, $interval) {
    $scope.path = $location.path();
    $scope.currentAQI = [];
    $scope.currentAQI2 = [];
    $scope.currentAQISeries = [];
    $scope.uvForecastDateTime = [];
    $scope.uvForecastOrder = [];
    $scope.uvForecastValue = [];

    $scope.uvDataSet = [];


    var today = $filter('date')(new Date, 'fullDate');
    console.log(today);


    var path = $location.path();
    var pathItems = path.split('/');
    var zipcode = decodeURIComponent(pathItems[pathItems.length - 1]);
    console.log('zipcode = ' + zipcode);

    apiQueryService.queryUV({
        zipcode: zipcode
    }).then(
        function(results) {

            //console.log(results);

            for (var i = 0; i < results.length; i++) {
                var currentUVIndex = results[i];
                //$scope.uvForecastDateTime[i] = currentUVIndex.DATE_TIME;
                $scope.uvForecastOrder[i] = currentUVIndex.ORDER;
                //$scope.uvForecastValue[i] = [300, 500, 100, 40, 120];//currentUVIndex.UV_VALUE;
                //console.log(currentUVIndex.DATE_TIME);
                console.log($filter('date')(currentUVIndex.DATE_TIME, 'fullDate'));
                //console.log($filter('date')(today, 'H'));
                //var time = $filter('date')(new Date, 'H');
                //console.log(new Date(currentUVIndex.DATE_TIME));


                var color;
                switch (true) {
                    case (currentUVIndex.UV_VALUE<=2):
                        color = "#4eb400";
                        break;
                    case (currentUVIndex.UV_VALUE<=5):
                        color = "#f7e400";
                        break;
                    case (currentUVIndex.UV_VALUE<=7):
                        color = "#f85900";
                        break;
                    case (currentUVIndex.UV_VALUE<=10):
                        color = "#d8001d";
                        break;
                    case (currentUVIndex.UV_VALUE>=11):
                        color = "#998cff";
                        break;
                }

                var uvdata = {
                    "label": currentUVIndex.DATE_TIME,
                    "value": currentUVIndex.UV_VALUE,
                    "color": color
                };

                $scope.uvDataSet.push(uvdata);

            }


            var testnum = 350;

            // used to update the UI
            function updateTestNum() {
                testnum = Math.floor((Math.random() * 100) + 1);
                //element.text(dateFilter(new Date(), format));
            }

            $interval(updateTestNum, 100);


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

    apiQueryService.queryAQI({
        zipcode: zipcode
    }).then(


        function(results) {

            //            console.log('aqi',results);

            for (var i = 0; i < results.length; i++) {
                var currentIndex = results[i];
                //$scope.currentAQI[i] = [currentIndex.AQI];
                $scope.currentAQI2[i] = currentIndex.AQI;
                $scope.currentAQISeries[i] = currentIndex.ParameterName;
                //$scope.currentAQICategoryName = currentIndex.Category.Name;
                //$scope.currentAQICategoryNum = currentIndex.Category.Number;
                //              console.log(currentIndex.AQI);


            }
            //        console.log('currentaqi', $scope.currentAQI2);
            //console.log($scope.currentAQISeries);


        },
        function(error) {
            console.error(JSON.stringify(error));
        }
    );


    var today = $filter('date')(new Date, 'longDate ');

    $scope.currentAQILabel = [today];


    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    $scope.data = [300, 500, 100, 40, 120];


    //$scope.currentAQISeries = ["Download Sales", "In-Store Sales", "Mail-Order Sales", "Tele Sales", "Corporate Sales"];
    //$scope.currentAQI = [300, 500, 100, 40, 120];




    $scope.options = {
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
            showValues: true,
            valueFormat: function(d) {
                return d3.format(',.0f')(d);
            },
            transitionDuration: 500,
            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: 30
            }
        }
    };

    $scope.d3data = [{
        key: "Cumulative Return",
        values: $scope.uvDataSet
    }];








}]);