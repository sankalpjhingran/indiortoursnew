'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SubHeaderController
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('TourHeaderController', ['$http', '$state', '$rootScope', '$scope', '$stateParams', '$document', '$sce', '_', function($http, $state, $rootScope, $scope, $stateParams, $document, $sce, _) {
        const touridsParam = [];
        touridsParam.push($stateParams.id);
        $scope.slides = [];
        const vm = this;
        vm.$inject = ['NgMap'];

        vm.cities = {
            chicago: {
                population: 2714856,
                position: [41.878113, -87.629798]
            },
            newyork: {
                population: 8405837,
                position: [40.714352, -74.005973]
            },
            losangeles: {
                population: 3857799,
                position: [34.052234, -118.243684]
            },
            vancouver: {
                population: 603502,
                position: [49.25, -123.1]
            },
        }

        vm.getRadius = function(num) {
            return Math.sqrt(num) * 100;
        }

        $scope.allImagesForTour = function() {
            const tourids = touridsParam;
            $http.post('/api/image/all', {
                    tourids: tourids,
                    parentobjectname: 'tourbanner'
                })
                .then(function(response) {
                    if (response.data.length) {
                        $scope.myInterval = 5000;
                        $scope.noWrapSlides = false;
                        $scope.active = 0;
                        var slides = $scope.slides = [];
                        var currIndex = 0;

                        $scope.addSlide = function() {
                            //var newWidth = 1920 + slides.length + 1; + 450 // get images of 1920/450 size
                            angular.forEach(response.data, function(image) {
                                slides.push({
                                    image: '/images/' + image.filename,
                                    text: image.description,
                                    id: currIndex++
                                });
                            });
                        };

                        $scope.randomize = function() {
                            var indexes = generateIndexesArray();
                            assignNewIndexesToSlides(indexes);
                        };

                        for (var i = 0; i < response.data.length; i++) {
                            $scope.addSlide();
                        }

                        // Randomize logic below

                        function assignNewIndexesToSlides(indexes) {
                            for (var i = 0, l = slides.length; i < l; i++) {
                                slides[i].id = indexes.pop();
                            }
                        }

                        function generateIndexesArray() {
                            var indexes = [];
                            for (var i = 0; i < currIndex; ++i) {
                                indexes[i] = i;
                            }
                            return shuffle(indexes);
                        }

                        // http://stackoverflow.com/questions/962802#962890
                        function shuffle(array) {
                            var tmp, current, top = array.length;
                            if (top) {
                                while (--top) {
                                    current = Math.floor(Math.random() * (top + 1));
                                    tmp = array[current];
                                    array[current] = array[top];
                                    array[top] = tmp;
                                }
                            }
                            return array;
                        }
                    }
                });
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        }
    }]);