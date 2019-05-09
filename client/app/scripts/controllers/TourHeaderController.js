'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SubHeaderController
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TourHeaderController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
    var tourids = $stateParams.id;

    $scope.allImagesForTour = function(){
      console.log('Calling subheader controller=====>');
      $scope.bannerImages = [];
      var tourids = [];
      $http.post('/api/image/all', { tourids:tourids , parentobjectname: 'tour'})
       .then(function(response){
            if(response.data.length){
                console.log('Res======>');
                console.log(response.data);
                angular.forEach(response.data, function(image){
                      console.log(image);
                      $scope.bannerImages.push(image);
                });
            }
       });
    }
  }]);
