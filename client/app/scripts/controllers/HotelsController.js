'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('HotelsController', ['$http', '$state', '$rootScope', '$scope', function($http, $state, $rootScope, $scope) {

        const imagesMap = new Map();

        $scope.allDestinations = function() {
            $scope.loading = true;
            $http.get('/api/hotel/all')
                .then(
                    function(res) {
                        // success callback
                        $scope.allHotels = res.data;
                        const hotelids = [];

                        $scope.allHotels.forEach(function(hotel) {
                            hotelids.push(hotel.id);
                        });

                        $http.post('/api/image/all', {
                                tourids: hotelids,
                                parentobjectname: 'hotel'
                            })
                            .then(function(images) {
                                angular.forEach(hotelids, function(hotelid) {
                                    const tempImages = [];
                                    angular.forEach(images.data, function(image) {
                                        if (image.parentobjectname === 'hotel' && image.parentobjectid === hotelid) {
                                            tempImages.push(image);
                                        }
                                    });
                                    imagesMap.set(hotelid, tempImages);
                                    angular.forEach($scope.allHotels, function(hotel) {
                                        hotel.images = imagesMap.get(hotel.id);
                                    });
                                });


                                // Remove hotels without images
                                for (let i = 0; i < $scope.allHotels.length; i++) {
                                    if ($scope.allHotels[i].images === undefined) {
                                        arr.splice(i, 1);
                                    }
                                }
                                $scope.loading = false;
                            });
                    },
                    function(response) {
                        // failure call back
                    }
                );
        }
    }]);