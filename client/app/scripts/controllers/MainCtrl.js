'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('MainCtrl', ['$localStorage', '$http', '$state', '$rootScope', '$scope', 'MetaService', '$uibModal', function($localStorage, $http, $state, $rootScope, $scope, MetaService, $uibModal) {
        $rootScope.metaservice = MetaService;
        $rootScope.metaservice.set("India Tours | India Tourism | Tours and Travels | Book Holiday Packages | India Tour Packages HomeTravel Guide| Travel deals India | Tours to India-from Indior Tours India's Great Travel specialists", "", "");

        const imagesMap = new Map();
        $scope.toursMap = new Map();
        $scope.recentTours = [];

        $scope.fromTo = $localStorage.currencypreference;

        $rootScope.$state = $state;
        $scope.rate = 7;
        $scope.max = 5;
        $scope.isReadonly = false; // This will be true for logged in users.

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [{
                stateOn: 'glyphicon-ok-sign',
                stateOff: 'glyphicon-ok-circle'
            },
            {
                stateOn: 'glyphicon-star',
                stateOff: 'glyphicon-star-empty'
            },
            {
                stateOn: 'glyphicon-heart',
                stateOff: 'glyphicon-ban-circle'
            },
            {
                stateOn: 'glyphicon-heart'
            },
            {
                stateOff: 'glyphicon-off'
            }
        ];

        $scope.getRandomIndex = function(length) {
            return Math.floor(Math.random() * length);
        }

        $scope.addToRecentItems = function(val) {
            // Parse the JSON stored in allEntriesP
            let existingEntries = $localStorage.recenttours;
            if (existingEntries == null) existingEntries = [];
            const recent = {
                tourid: val,
            };

            existingEntries.push(recent);
            const uniqueEntries = $scope.removeDuplicates(existingEntries);
            $localStorage.recenttours = uniqueEntries;
        }

        $scope.removeDuplicates = function(arr) {
            const uniqueArray = [];
            for (let i = 0; i < arr.length; i++) {
                if (uniqueArray.indexOf(arr[i]) === -1) {
                    uniqueArray.push(arr[i]);
                }
            }
            return uniqueArray;
        }

        $scope.allToursWithLocations = function() {
            $scope.loading = true;

            $http.get('/api/tours/alltourswithlocations')
                .then(
                    function(res) {
                        // success callback
                        $scope.allTours = JSON.parse(res.data);
                        const tourids = [];

                        $scope.allTours.forEach(function(tour) {
                            tourids.push(tour.id);
                            const tempLocations = [];
                            tour.siteLocation.forEach(function(location) {
                                tempLocations.push(location.city);
                            });
                            tour.locations = tempLocations;

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

                        $http.post('/api/image/all', {
                                tourids: tourids,
                                parentobjectname: 'tour'
                            })
                            .then(function(images) {
                                angular.forEach(tourids, function(tourid) {
                                    const tempImages = [];
                                    angular.forEach(images.data, function(image) {
                                        if (image.parentobjectname === 'tour' && image.parentobjectid === tourid) {
                                            tempImages.push(image);
                                        }
                                    });
                                    imagesMap.set(tourid, tempImages);
                                });

                                angular.forEach($scope.allTours, function(tour) {
                                    if (imagesMap.get(tour.id) && imagesMap.get(tour.id).length) {
                                        const randomIndex = Math.floor((Math.random() * imagesMap.get(tour.id).length) + 0);
                                        tour.image = imagesMap.get(tour.id)[randomIndex];
                                        $scope.toursMap.set(tour.id, tour);
                                    }
                                });
                                $scope.loading = false;

                                angular.forEach($localStorage.recenttours, function(tour) {
                                    $scope.recentTours.push($scope.toursMap.get(tour.tourid));
                                });
                                const uniqueEntries = $scope.removeDuplicates($scope.recentTours);
                                $scope.recentTours = [];
                                $scope.recentTours = uniqueEntries;
                            });
                    },
                    function(response) {
                        // failure call back
                    }
                );
        }
    }]);