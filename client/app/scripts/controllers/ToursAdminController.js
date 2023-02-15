'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:Aboutscope
 * @description
 * # Aboutscope
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ToursAdminController', function($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout, $stateParams, $rootScope, $state) {
        $scope.toursMap = new Map();
        $rootScope.$state = $state;
        $scope.sortType = 'name'; // set the default sort type
        $scope.sortReverse = false; // set the default sort order

        $scope.sort = function(keyname) {
            $scope.sortType = keyname; //set the sortKey to the param passed
            $scope.sortReverse = !$scope.sortReverse; //if true make it false and vice versa
        }

        $scope.populatetoursInstance = function(toursId) {
            $scope.tourData = $scope.toursMap.get(toursId);
            $scope.tourData.locations = $scope.tourData.siteLocation;
            $scope.tourData.hotels = $scope.tourData.accomodationHotel;
            $scope.tourData.notes = $scope.tourData.tourNote;
            $scope.tourData.tags = $scope.tourData.tourTags;

            $scope.tourData.newImages = [];
            const tourids = [];
            tourids.push(toursId);
            $http.post('/api/image/all', {
                    tourids: tourids,
                    parentobjectname: 'tour'
                })
                .then(function(response) {
                    if (response.data.length) {
                        angular.forEach(response.data, function(image) {
                            $scope.tourData.newImages.push(image);
                        });
                    }
                });
            $scope.showForm();
        }

        $scope.deleteFile = function(idx) {
            const file = $scope.tourData.images[idx];
            if (file) {
                $scope.tourData.images.splice(idx, 1);
            }
        }

        $scope.deleteUploadedFile = function(idx) {
            var file = $scope.tourData.newImages[idx];
            if (file && file.id) {
                $http.delete('/api/image/', {
                    params: {
                        id: file.id
                    }
                }).then(function(response) {
                    if (response.status === 200) {
                        $scope.tourData.newImages.splice(idx, 1);
                    }
                });
            }
        }

        //Upload images
        $scope.uploadFiles = function(tempTour) {
            var files = $scope.tourData.images;
            var fd = new FormData();
            for (var i = 0; i < files.length; i++) {
                fd.append('file', files[i]);
            }
            fd.append('parentobjectid', tempTour.id);
            fd.append('parentobjectname', 'tour');

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

        // get all tourss to be displayed on page load
        $scope.loadtoursData = function() {
            $scope.allTours = undefined;
            $scope.allToursMap = new Map();

            //Get all locations and hotels to be searched by typeahead
            $scope.allLocation = undefined;
            $scope.allHotels = undefined;
            $scope.allNotes = undefined;

            $scope.loading = true;

            $http.get('/api/location/all/')
                .then(function(locations) {
                    $scope.allLocation = locations.data;
                });

            /*
            $http.get('/api/hotel/all/')
              .then(function(hotels){
                $scope.allHotels = hotels.data;
              });
            */

            $http.get('/api/tournotes/all/')
                .then(function(notes) {
                    //console.log(notes);
                    $scope.allNotes = notes.data;
                });
            //console.log($scope.allNotes);

            $http.get('/api/tags/all/')
                .then(function(tags) {
                    //console.log(tags);
                    $scope.allTags = tags.data;
                });

            $scope.funcAsyncHotels = function(query) {
                let reqStr;
                $http.get('/api/hotel/all/').then(
                    function(hotels) {
                        $scope.allHotels = hotels.data;
                    },
                    function() {
                        console.log('ERROR!!!');
                    }
                );
            }

            //Load all tourss to be displayed
            $http.get('/api/tours/alltourswithlocationsandhotels/')
                .then(
                    function(responseTours) {
                        $scope.allTours = responseTours.data;
                        // populate toursMap to be used in edit form
                        angular.forEach($scope.allTours, function(tours) {
                            $scope.toursMap.set(tours.id, tours);
                        });
                        $scope.loading = false;
                    },
                    function(response) {
                        // failure call back
                    }
                );
        }

        $scope.deltours = function(toursid) {
            if (toursid && confirm("Are you sure you want to delete this tour?")) {
                $http.delete('/api/tours/', {
                        params: {
                            id: toursid
                        }
                    })
                    .then(
                        function(response) {
                            // success callback
                            $scope.loadtoursData();
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
                $scope.tourData = null;
            }

            $scope.modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ToursAdminController',
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

        $scope.createUpdatetours = function() {
            // Update the tours if tours id is there
            if ($scope.tourData && $scope.tourData.id) {
                $http.patch('/api/tours/update/', $scope.tourData).then(function(res, err) {
                    if (res.status === 200) {
                        if($scope.tourData.images) {
                          $scope.uploadFiles($scope.tourData);
                        }

                        //if the request is successful, show all tours
                        $scope.modalInstance.close();
                        $scope.$parent.allTours = $scope.$parent.loadtoursData();
                    }
                });
            } else {
                // create tours only if tour id is there
                if ($scope.tourData) {
                    $http.post('/api/tours/', $scope.tourData).then(function(res, err) {
                        if (res.status === 200) {
                            // upload image files
                            if(res.data.images) {
                              $scope.uploadFiles(res.data);
                            }

                            //if the request is scuessful, show all tourss
                            $scope.modalInstance.close();
                            $scope.$parent.allTours = $scope.$parent.loadtoursData();
                        }
                    })
                } else {
                    console.log('Error: tours Data is invalid or Invalid tour id');
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
