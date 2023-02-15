'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('CityViewController', ['$localStorage', '$http', '$state', '$rootScope', '$scope', '$stateParams', 'currencyFact', function($localStorage, $http, $state, $rootScope, $scope, $stateParams, currencyFact) {
        $rootScope.$state = $state;

        var destinationId = $stateParams.id;
        $scope.name = $stateParams.name;

        $scope.destination = [];
        $scope.fromTo = $localStorage.currencypreference;

        $scope.getCityDetails = function() {
            //$scope.loading = true;
            $http.get('/api/location/', {
                    params: {
                        id: destinationId[0]
                    }
                })
                .then(
                    function(res) {
                        // success callback
                        $scope.destination = res.data;
                        angular.forEach($scope.destination.siteTour, function(tour) {
                            var tempLocations = [];
                            tour.siteLocation.forEach(function(location) {
                                tempLocations.push(location.city);
                            });
                            tour.locations = tempLocations;

                            if (tour.price) {
                                tour.price = accounting.unformat(tour.price);
                                tour.price = fx.convert(tour.price, {
                                    from: "USD",
                                    to: $scope.fromTo.from
                                });
                                tour.price = accounting.formatMoney(fx.convert(tour.price, $scope.fromTo), {
                                    symbol: $scope.fromTo.to,
                                    format: "%v %s"
                                });
                            }

                            if (tour.offerprice) {
                                tour.offerprice = accounting.unformat(tour.offerprice);
                                tour.offerprice = fx.convert(tour.offerprice, {
                                    from: "USD",
                                    to: $scope.fromTo.from
                                });
                                tour.offerprice = accounting.formatMoney(fx.convert(tour.offerprice, $scope.fromTo), {
                                    symbol: $scope.fromTo.to,
                                    format: "%v %s"
                                });
                            }
                        });

                        var imageIds = [];
                        imageIds.push(destinationId);
                        $http.post('/api/image/all/', {
                                tourids: imageIds,
                                parentobjectname: 'location'
                            })
                            .then(function(images) {
                                $scope.destination.images = images;
                                //$scope.loading = false;
                            });
                    },
                    function(response) {
                        // failure call back
                    }
                );
        }
    }]);