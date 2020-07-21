'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SubHeaderController
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SubHeaderController', ['$http','$state', '$rootScope', '$scope', '$window', function ($http, $state, $rootScope, $scope, $window) {
    $scope.allImagesForBanner = function(){
      console.log('Calling subheader controller=====>');
      $scope.slides = [];
      var tourids = [];
      $http.post('/api/image/all', { tourids:tourids , parentobjectname: 'homepagebanner'})
       .then(function(response){
            console.log(response);
            if(response.data.length){
                var index = 0;
                angular.forEach(response.data, function(image){
                      $scope.slides.push({
                        image: '/images/' + image.filename + '.webp',
                        text: image.description,
                        id: index++
                      });
                });
                $scope.myInterval = 5000;
                $scope.noWrapSlides = false;
                $scope.active = 0;
            }
       });
    }
  }]);
