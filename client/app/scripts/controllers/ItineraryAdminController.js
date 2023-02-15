'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:Aboutscope
 * @description
 * # Aboutscope
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ItineraryAdminController', function($scope, $uibModal, $http, $location, $document, $log) {
        $scope.itineraryMap = new Map();
        $scope.itineraryData = [];

        $scope.addRow = function() {
            $scope.itnRows.push({
                day: '',
                description: ''
            });
        }

        $scope.populateitineraryInstance = function(tourId) {
            $scope.tour = $scope.allToursMap.get(tourId);
            $scope.itnRows = [];
            $scope.itnRows = $scope.tour.itinerary;
            $scope.showForm();
        }

        // get all itinerarys to be displayed on page load
        $scope.loaditineraryData = function() {
            //Get all tours to be searched by typeahead
            $scope.allTours = undefined;
            $scope.allToursMap = new Map();
            $scope.loading = true;

            $http.get('/api/tours/alltourswithitineries/')
                .then(
                    function(response) {
                        // success callback
                        $scope.allTours = response.data;
                        angular.forEach($scope.allTours, function(tour) {
                            $scope.allToursMap.set(tour.id, tour);
                        });
                        $scope.loading = false;
                    },
                    function(response) {
                        // failure call back
                    }
                );
        }

        $scope.delitinerary = function(itineraryid) {
            if (itineraryid && confirm("Are you sure you want to delete this itinerary?")) {
                $http.delete('/api/itinerary/', {
                        params: {
                            id: itineraryid
                        }
                    })
                    .then(
                        function(response) {
                            // success callback
                            $scope.loaditineraryData();
                        },
                        function(response) {
                            // failure call back
                        }
                    );
            }
        }

        $scope.saveAs = function() {
            //$scope.itineraryData.id = null;
            //$scope.cancel();
            //$scope.modalInstance.dismiss('cancel');
            angular.forEach($scope.itnRows, function(itnRow) {
                itnRow.id = null;
                itnRow.tour_id = null;
                itnRow.tour = null;
                itnRow.createdAt = null;
                itnRow.updatedAt = null;
                $scope.tour = null;
            })
        }

        $scope.showForm = function(isNew) {
            $scope.message = "Show Form Button Clicked";

            if (isNew) {
                $scope.itineraryData = null;
                $scope.tour = null;
                $scope.itnRows = [];
                $scope.itnRows.push({
                    day: '',
                    description: ''
                });
            }

            //open a new modal instance
            $scope.modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ItineraryAdminController',
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

        $scope.createUpdateitinerary = function() {
            const itnsToCreate = [];
            const itnsToUpdate = [];
            //This is the primary condition for create or update
            if ($scope.tour) {
                //Iterate over itnRows to check if they have an id or not
                angular.forEach($scope.itnRows, function(itn) {
                    itn.tour_id = $scope.tour.id;
                    if (itn.id) {
                        itnsToUpdate.push(itn);
                    } else {
                        itnsToCreate.push(itn);
                    }
                });

                if (itnsToCreate.length) {
                    //Create first
                    $http.post('/api/itinerary/bulkcreate/', itnsToCreate).then(function(res, err) {
                        if (res.status === 200) {
                            //if the request is scuessful, show all itinerarys
                            $scope.modalInstance.close();
                            $scope.$parent.loaditineraryData();
                        }
                    });
                }

                if (itnsToUpdate.length) {
                    $http.post('/api/itinerary/bulkupdate/', itnsToUpdate).then(function(res, err) {
                        if (res.status === 200) {
                            //if the request is scuessful, show all itinerarys
                            $scope.modalInstance.close();
                            $scope.$parent.loaditineraryData();
                        }
                    });
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
            getterSetter: true,
        };
    });