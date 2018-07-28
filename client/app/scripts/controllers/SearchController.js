'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SubHeaderController
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SearchController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
    var searchKey = $stateParams.key;
    $scope.results = [];
    var imagesMap = new Map();
    
    $scope.searchTours = function() {
        $scope.loading = true;
        console.log('In searchTours function....');
        $http.get('/api/search/', {params: {key: searchKey}})
         .then(function(response){
              if(response.data.length){
                  var tourids = [];
                  angular.forEach(response.data, function(tour){
                      $scope.results.push(tour);
                      tourids.push(tour.id);
                  });

                  $http.post('/api/image/all', {tourids: tourids, parentobjectname: 'tour'})
                   .then(function(images){
                       angular.forEach(tourids, function(tourid){
                           var tempImages = [];
                           angular.forEach(images.data, function(image){
                             if(image.parentobjectname == 'tour' && image.parentobjectid == tourid){
                                   tempImages.push(image);
                             }
                           });
                           imagesMap.set(tourid, tempImages);
                           angular.forEach($scope.results, function(tour){
                             tour.images = imagesMap.get(tour.id);
                           });
                       });
                       $scope.loading = false;
                   });
              }
         });
    }
  }]);
