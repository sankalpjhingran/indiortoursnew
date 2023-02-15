'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:Aboutscope
 * @description
 * # Aboutscope
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('HotelsAdminController', function($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
        $scope.hotelMap = new Map();

        $scope.uploadFiles = function(tempHotel) {
            const files = $scope.hotelData.images;
            let fd = new FormData();
            for (let i = 0; i < files.length; i++) {
                fd.append('file', files[i]);
            }
            fd.append('parentobjectid', tempHotel.id);
            fd.append('parentobjectname', 'hotel');

            $http.post('/api/image/', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).then(function(response) {
                $timeout(function() {
                    //file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                //file.progress = Math.min(100, parseInt(100.0 *
                //                        evt.loaded / evt.total));
            });
        }

        $scope.deleteFile = function(idx) {
            const file = $scope.hotelData.images[idx];
            if (file) {
                $scope.hotelData.images.splice(idx, 1);
            }
        }

        $scope.deleteUploadedFile = function(idx) {
            const file = $scope.hotelData.newImages[idx];
            if (file && file.id) {
                $http.delete('/api/image/', {
                    params: {
                        id: file.id
                    }
                }).then(function(response) {
                    if (response.status === 200) {
                        $scope.hotelData.newImages.splice(idx, 1);
                    }
                });
            }
        }

        $scope.populatehotelInstance = function(hotelId) {
            $scope.hotelData = $scope.hotelMap.get(hotelId);
            if ($scope.hotelData.location_id != '') {
                $scope.hotelData.location = $scope.allLocationsMap.get($scope.hotelData.location_id);
            }
            $scope.hotelData.newImages = [];
            const tourids = [];
            tourids.push(hotelId);
            $http.post('/api/image/all', {
                    tourids: tourids,
                    parentobjectname: 'hotel'
                })
                .then(function(response) {
                    if (response.data.length) {
                        angular.forEach(response.data, function(image) {
                            $scope.hotelData.newImages.push(image);
                        });
                    }
                });
            $scope.showForm();
        }

        // get all hotels to be displayed on page load
        $scope.loadhotelData = function() {
            //Get all tours to be searched by typeahead
            $scope.allLocations = undefined;
            $scope.allLocationsMap = new Map();
            $scope.loading = true;
            $http.get('/api/location/all/')
                .then(
                    function(response) {
                        // success callback
                        $scope.allLocations = response.data;
                        angular.forEach($scope.allLocations, function(loc) {
                            $scope.allLocationsMap.set(loc.id, loc);
                        });

                        // Load all hotels to be displayed
                        $http.get('/api/hotel/all/')
                            .then(
                                function(response) {
                                    // success callback
                                    $scope.allHotels = response.data;
                                    // populate hotelMap to be used in edit form
                                    angular.forEach($scope.allHotels, function(hotel) {
                                        $scope.hotelMap.set(hotel.id, hotel);
                                        if (hotel.location_id != '') {
                                            if ($scope.allLocationsMap.get(hotel.location_id) &&
                                                $scope.allLocationsMap.get(hotel.location_id).city.length) {
                                                hotel.hotelcity = $scope.allLocationsMap.get(hotel.location_id).city;
                                            }
                                        }
                                    });
                                    $scope.loading = false;
                                    return $scope.allHotels;
                                },
                                function(response) {
                                    // failure call back
                                }
                            );
                    },
                    function(response) {
                        // failure call back
                    }
                );
        }

        $scope.delhotel = function(hotelid) {
            if (hotelid && confirm("Are you sure you want to delete this hotel?")) {
                $http.delete('/api/hotel/', {
                        params: {
                            id: hotelid
                        }
                    })
                    .then(
                        function(response) {
                            // success callback
                            $scope.loadhotelData();
                        },
                        function(response) {
                            // failure call back
                        }
                    );
            }
        }

        $scope.showForm = function(isNew) {
            $scope.message = "Show Form Button Clicked";

            if (isNew) {
                $scope.hotelData = null;
            }

            $scope.modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'HotelsAdminController',
                scope: $scope,
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    userForm: function() {
                        return $scope.userForm;
                    }
                }
            });

            $scope.modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.cancel = function() {
            $scope.modalInstance.dismiss('cancel');
        };

        $scope.createUpdatehotel = function() {
            // Update the hotel if hotel id is there
            if ($scope.hotelData && $scope.hotelData.id && $scope.hotelData.location) {
                $scope.hotelData.location_id = $scope.hotelData.location.id;
                $scope.hotelData.location = $scope.hotelData.location.city;
                $http.patch('/api/hotel/update/', $scope.hotelData).then(function(res, err) {
                    if (res.status === 200) {

                        // After updating the hotel, pass the response to upload function
                        $scope.uploadFiles($scope.hotelData);
                        //if the request is scuessful, close the modal and show all hotels
                        $scope.modalInstance.close();
                        $scope.$parent.allhotels = $scope.$parent.loadhotelData();
                    }
                });
            } else {
                //create hotel only if tour id is there
                if ($scope.hotelData && $scope.hotelData.location) {
                    $scope.hotelData.location_id = $scope.hotelData.location.id;
                    $scope.hotelData.location = $scope.hotelData.location.city;
                    $http.post('/api/hotel/', $scope.hotelData).then(function(res, err) {
                        if (res.status === 200) {
                            // After creating the hotel, pass the response to upload function
                            $scope.uploadFiles(res.data);

                            //if the request is scuessful, show all hotels
                            $scope.modalInstance.close();
                            $scope.$parent.allhotels = $scope.$parent.loadhotelData();
                        }
                    });
                } else {
                    console.log('Error: hotel Data is invalid or Invalid tour id');
                }
            }
        }

        let _selected;
        $scope.ngModelOptionsSelected = function(value) {
            if (arguments.length) {
                _selected = value;
            } else {
                return _selected;
            }
        };

        $scope.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };
    });