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
      $scope.bannerImages = [];
      var tourids = [];
      $http.post('/api/image/all', { tourids:tourids , parentobjectname: 'homepagebanner'})
       .then(function(response){
            if(response.data.length){
                console.log(response.data);
                angular.forEach(response.data, function(image){
                      console.log(image);
                      $scope.bannerImages.push(image);
                });
            }
       });
    }
    $scope.goToSearch = function() {
      if($scope.key) {
          $window.location.href = '/search?key=' + $scope.key;
      }
    }
  }]);
