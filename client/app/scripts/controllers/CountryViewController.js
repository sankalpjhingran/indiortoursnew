'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('CountryViewController', ['$http', '$state', '$rootScope', '$scope', '$stateParams', '_', 'currencyFact', '$localStorage', function($http, $state, $rootScope, $scope, $stateParams, _, currencyFact, $localStorage) {
        $rootScope.$state = $state;
        var destinationId = $stateParams.id;
        $scope.name = $stateParams.name;

        $scope.fromTo = $localStorage.currencypreference;
        $scope.loading = true;

        $scope.countryData = [];

        $scope.getCountryDetails = function() {
            $scope.loading = true;
            $http.get('/api/country/', {
                    params: {
                        id: destinationId
                    }
                })
                .then(
                    function(res) {
                        // success callback
                        var regions = res.data.Regions;
                        //var locations = res.data.Locations;

                        var regionids = [];
                        $scope.countryData = res.data;
                        regions.forEach(function(region) {
                            regionids.push(region.id.toString());
                        })

                        var imageMap = new Map();
                        $http.post('/api/image/all/', {
                                tourids: regionids,
                                parentobjectname: 'region'
                            })
                            .then(function(images) {
                                var imageMapUnderscore = new Map();
                                angular.forEach(images.data, function(image) {
                                    var tempImages = [];
                                    if (!imageMapUnderscore.has(image.parentobjectid)) {
                                        tempImages.push(image);
                                    } else {
                                        tempImages = imageMapUnderscore.get(image.parentobjectid.toString());
                                        tempImages.push(image);
                                    }
                                    imageMapUnderscore.set(image.parentobjectid.toString(), tempImages);
                                })

                                angular.forEach(regions, function(region) {
                                    region.images = [];
                                    region.images = imageMapUnderscore.get(JSON.stringify(region.id));
                                })
                                $scope.countryData.regions = regions;
                            });

                        /*

                         */
                    },
                    function(response) {
                        // failure call back
                    }
                );

            $http.get('/api/country/tours', {
                    params: {
                        id: destinationId
                    }
                })
                .then(
                    function(res) {
                        // success callback
                        $scope.popularItineraries = [];
                        var toursIds = [];
                        var apiRes = res.data[0];

                        var countryLocations = [];

                        angular.forEach(apiRes, function(tour) {
                            angular.forEach(tour.siteLocation, function(location) {
                                location.TourLocation = null;
                                if (location.country_id === destinationId) {
                                    countryLocations.push(location);
                                }
                            });
                        });

                        $scope.countrylocations = _.uniq(countryLocations, false, function(p) {
                            return p.city;
                        });
                        var locationIds = [];

                        angular.forEach($scope.countrylocations, function(location) {
                            locationIds.push(location.id);
                        });

                        $http.post('/api/image/all/', {
                                tourids: locationIds,
                                parentobjectname: 'location'
                            })
                            .then(function(images) {
                                var imageMapUnderscore = new Map();
                                angular.forEach(images.data, function(image) {
                                    var tempImages = [];
                                    if (!imageMapUnderscore.has(image.parentobjectid)) {
                                        tempImages.push(image);
                                    } else {
                                        tempImages = imageMapUnderscore.get(image.parentobjectid);
                                        tempImages.push(image);
                                    }
                                    imageMapUnderscore.set(image.parentobjectid, tempImages);
                                })

                                angular.forEach($scope.countrylocations, function(loc) {
                                    loc.images = [];
                                    loc.images = imageMapUnderscore.get(JSON.stringify(loc.id));
                                })
                            });

                        angular.forEach(apiRes, function(tour) {
                            if (tour.popularitinerary) {
                                $scope.popularItineraries.push(tour);
                                toursIds.push(tour.id);
                            }
                        });


                        $scope.popularItineraries.forEach(function(tour) {
                            var tempLocations = [];
                            tour.siteLocation.forEach(function(location) {
                                tempLocations.push(location.city);
                            });
                            tour.locations = tempLocations;
                            //tour.price = accounting.formatMoney(tour.price, { symbol: currency.name.newValue,  format: "%v %s" });
                            //tour.offerprice = accounting.formatMoney(tour.offerprice, { symbol: currency.name.newValue,  format: "%v %s" });

                            //Convert first if saved currency is not USD
                            if ($scope.fromTo.to === 'USD' && $scope.fromTo.from === 'USD') {
                                if (tour.price) {
                                    tour.price = accounting.formatMoney(tour.price, {
                                        symbol: $scope.fromTo.to,
                                        format: "%v %s"
                                    });
                                }

                                if (tour.offerprice) {
                                    tour.offerprice = accounting.formatMoney(tour.offerprice, {
                                        symbol: $scope.fromTo.to,
                                        format: "%v %s"
                                    });
                                }
                            } else {
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
                            }
                        });

                        $http.post('/api/image/all/', {
                                tourids: toursIds,
                                parentobjectname: 'tour'
                            })
                            .then(function(images) {
                                var imageTourMap = new Map();
                                angular.forEach(images.data, function(image) {
                                    var tempImages = [];
                                    if (!imageTourMap.has(image.parentobjectid)) {
                                        tempImages.push(image);
                                    } else {
                                        tempImages = imageTourMap.get(image.parentobjectid.toString());
                                        tempImages.push(image);
                                    }
                                    imageTourMap.set(image.parentobjectid, tempImages);
                                })

                                angular.forEach($scope.popularItineraries, function(tour) {
                                    tour.image = {};
                                    if (imageTourMap.get(tour.id.toString()) && imageTourMap.get(tour.id.toString()).length) {
                                        var randomIndex = Math.floor((Math.random() * imageTourMap.get(tour.id.toString()).length) + 0);
                                        tour.image = imageTourMap.get(tour.id.toString())[randomIndex];
                                    }
                                });

                                $scope.popularItineraries = _.chain($scope.popularItineraries)
                                    .sortBy('price')
                                    .partition('price')
                                    .flatten()
                                    .value();
                                $scope.loading = false;
                            });
                    },
                    function(response) {
                        // failure call back
                    }

                );
        }
    }]);