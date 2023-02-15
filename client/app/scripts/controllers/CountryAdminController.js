'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:Aboutscope
 * @description
 * # Aboutscope
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('CountryAdminController', function($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
        $scope.locationMap = new Map();

        $scope.uploadFiles = function(tempLocation) {
            const files = $scope.countryData.images;
            let fd = new FormData();
            for (let i = 0; i < files.length; i++) {
                fd.append('file', files[i]);
            }
            fd.append('parentobjectid', tempLocation.id);
            fd.append('parentobjectname', 'country');

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
            const file = $scope.countryData.images[idx];
            if (file) {
                $scope.countryData.images.splice(idx, 1);
            }
        }

        $scope.deleteUploadedFile = function(idx) {
            const file = $scope.countryData.newImages[idx];
            if (file && file.id) {
                $http.delete('/api/image/', {
                    params: {
                        id: file.id
                    }
                }).then(function(response) {
                    if (response.status === 200) {
                        $scope.countryData.newImages.splice(idx, 1);
                    }
                });
            }
        }

        $scope.populateCountryInstance = function(locationId) {
            $scope.countryData = $scope.locationMap.get(locationId);
            $scope.countryData.newImages = [];
            let tourids = [];
            tourids.push(locationId);
            $http.post('/api/image/all', {
                    tourids: tourids,
                    parentobjectname: 'country'
                })
                .then(function(response) {
                    if (response.data.length) {
                        angular.forEach(response.data, function(image) {
                            $scope.countryData.newImages.push(image);
                        });
                    }
                });
            $scope.showForm();
        }

        $scope.saveNew = function() {
            $scope.createUpdateLocation();
            $scope.populateLocationInstance($scope.countryData.id);
        }

        // get all locations to be displayed on page load
        $scope.loadcountryData = function() {
            //Get all tours to be searched by typeahead

            $scope.loading = true;
            // Load all locations to be displayed
            $http.get('/api/country/all/')
                .then(
                    function(response) {
                        // success callback
                        $scope.allLocations = response.data;

                        $scope.locationMap = new Map();
                        //populate locationMap to be used in edit form
                        angular.forEach($scope.allLocations, function(location) {
                            $scope.locationMap.set(location.id, location);
                        });
                        $scope.loading = false;
                        return $scope.allLocations;
                    },
                    function(response) {
                        // failure call back
                    }
                );

            $http.get('/api/continent/all/')
                .then(
                    function(response) {
                        // success callback
                        $scope.allContinents = response.data;

                        $scope.continentsMap = new Map();
                        //populate locationMap to be used in edit form
                        angular.forEach($scope.allContinents, function(continent) {
                            $scope.continentsMap.set(continent.id, continent);
                        });
                        $scope.loading = false;
                        return $scope.allContinents;
                    },
                    function(response) {
                        // failure call back
                    }
                );
        }

        $scope.delCountry = function(locationid) {
            if (locationid && confirm("Are you sure you want to delete this location?")) {
                $http.delete('/api/country/', {
                        params: {
                            id: locationid
                        }
                    })
                    .then(
                        function(response) {
                            // success callback
                            $scope.loadcountryData();
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
                $scope.countryData = null;
            }
            $scope.modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'CountryAdminController',
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

        $scope.createUpdateCountry = function() {
            // Update the location if location id is there
            if ($scope.countryData && $scope.countryData.id && $scope.countryData.continent) {
                //$scope.countryData.continent_id = $scope.countryData.continent.id;
                $scope.countryData.continent = $scope.countryData.continent.name;
                $http.patch('/api/country/update/', $scope.countryData).then(function(res, err) {
                    if (res.status === 200) {
                        //Upload Images
                        $scope.uploadFiles($scope.countryData);

                        //if the request is scuessful, show all locations
                        $scope.modalInstance.close();
                        $scope.$parent.allLocations = $scope.$parent.loadcountryData();
                    }
                });
            } else {
                // create location only if tour id is there
                if ($scope.countryData && $scope.countryData.continent) {

                    $scope.countryData.continent_id = $scope.countryData.continent.id;
                    $scope.countryData.continent = $scope.countryData.continent.name;

                    $http.post('/api/country/', $scope.countryData).then(function(res, err) {
                        if (res.status === 200) {
                            //Upload Images
                            $scope.uploadFiles(res.data);

                            //if the request is scuessful, show all locations
                            $scope.modalInstance.close();
                            $scope.$parent.allLocations = $scope.$parent.loadcountryData();
                        }
                    });
                } else {
                    console.log('Error: Location Data is invalid');
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
    })

    .filter('propsFilter', function() {
        return function(items, props) {
            let out = [];
            if (angular.isArray(items)) {
                let keys = Object.keys(props);

                items.forEach(function(item) {
                    let itemMatches = false;

                    for (let i = 0; i < keys.length; i++) {
                        let prop = keys[i];
                        let text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }
            return out;
        };
    });