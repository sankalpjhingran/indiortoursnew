'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:Aboutscope
 * @description
 * # Aboutscope
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('RegionAdminController', function($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
        $scope.regionMap = new Map();

        $scope.uploadFiles = function(tempLocation) {
            const files = $scope.regionData.images;
            const fd = new FormData();
            for (let i = 0; i < files.length; i++) {
                fd.append('file', files[i]);
            }
            fd.append('parentobjectid', tempLocation.id);
            fd.append('parentobjectname', 'region');

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
            var file = $scope.regionData.images[idx];
            if (file) {
                $scope.regionData.images.splice(idx, 1);
            }
        }

        $scope.deleteUploadedFile = function(idx) {
            var file = $scope.regionData.newImages[idx];
            if (file && file.id) {
                $http.delete('/api/image/', {
                    params: {
                        id: file.id
                    }
                }).then(function(response) {
                    if (response.status === 200) {
                        $scope.regionData.newImages.splice(idx, 1);
                    }
                });
            }
        }

        $scope.populateLocationInstance = function(regionId) {
            $scope.regionData = $scope.regionMap.get(regionId);
            $scope.regionData.newImages = [];
            var tourids = [];
            tourids.push(regionId);
            $http.post('/api/image/all', {
                    tourids: tourids,
                    parentobjectname: 'region'
                })
                .then(function(response) {
                    if (response.data.length) {
                        angular.forEach(response.data, function(image) {
                            $scope.regionData.newImages.push(image);
                        });
                    }
                });
            $scope.showForm();
        }

        $scope.saveNew = function() {
            $scope.createUpdateLocation();
            $scope.populateLocationInstance($scope.regionData.id);
        }

        // get all locations to be displayed on page load
        $scope.loadLocationData = function() {
            //Get all tours to be searched by typeahead

            $scope.loading = true;
            // Load all locations to be displayed
            $http.get('/api/region/all/')
                .then(
                    function(response) {
                        // success callback
                        $scope.allRegions = response.data;

                        $scope.regionMap = new Map();
                        //populate regionMap to be used in edit form
                        angular.forEach($scope.allRegions, function(region) {
                            $scope.regionMap.set(region.id, region);
                        });
                        $scope.loading = false;
                        return $scope.allRegions;
                    },
                    function(response) {
                        // failure call back
                    }
                );


            $http.get('/api/country/all/')
                .then(
                    function(response) {
                        // success callback
                        $scope.allCountries = response.data;

                        $scope.countryMap = new Map();
                        //populate regionMap to be used in edit form
                        angular.forEach($scope.allCountries, function(country) {
                            $scope.countryMap.set(country.id, country);
                        });
                        $scope.loading = false;
                        return $scope.allCountries;
                    },
                    function(response) {
                        // failure call back
                    }
                );
        }

        $scope.delLocation = function(locationid) {
            if (locationid && confirm("Are you sure you want to delete this region?")) {
                $http.delete('/api/region/', {
                        params: {
                            id: locationid
                        }
                    })
                    .then(
                        function(response) {
                            // success callback
                            $scope.loadLocationData();
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
                $scope.regionData = null;
            }
            $scope.modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'RegionAdminController',
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

        $scope.createUpdateLocation = function() {
            // Update the region if region id is there
            if ($scope.regionData && $scope.regionData.id && $scope.regionData.country) {
                //$scope.regionData.country_id = $scope.regionData.country.id;
                //$scope.regionData.country = $scope.regionData.country.name;
                $http.patch('/api/region/update/', $scope.regionData).then(function(res, err) {
                    if (res.status === 200) {
                        //Upload Images
                        $scope.uploadFiles($scope.regionData);

                        //if the request is scuessful, show all locations
                        $scope.modalInstance.close();
                        $scope.$parent.allRegions = $scope.$parent.loadLocationData();
                    }
                });
            } else {
                // create region only if tour id is there
                if ($scope.regionData && $scope.regionData.country) {
                    $scope.regionData.country_id = $scope.regionData.country.id;
                    $scope.regionData.country = $scope.regionData.country.name;

                    $http.post('/api/region/', $scope.regionData).then(function(res, err) {
                        if (res.status === 200) {
                            //Upload Images
                            $scope.uploadFiles(res.data);

                            //if the request is scuessful, show all locations
                            $scope.modalInstance.close();
                            $scope.$parent.allRegions = $scope.$parent.loadLocationData();
                        }
                    });
                } else {
                    console.log('Error: region Data is invalid');
                }
            }
        }

        var _selected;
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
            var out = [];
            if (angular.isArray(items)) {
                var keys = Object.keys(props);

                items.forEach(function(item) {
                    var itemMatches = false;

                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
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