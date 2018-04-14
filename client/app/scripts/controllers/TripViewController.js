'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TripViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
    $rootScope.$state = $state;
    var tourId = $stateParams.id;

    var imagesMap = new Map();

    $scope.allParentToursWithTours = function(){
      $scope.loading = true;
      $http.get('/api/parenttours/viewtrip', {params: {id: tourId}})
       .then(
           function(res){
             // success callback
             $scope.allTours = res.data;
             $scope.childTours = $scope.allTours.childTours;
             var tourids = [];

             $scope.allTours.childTours.forEach(function(tour){
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
                      angular.forEach($scope.allTours.childTours, function(tour){
                        tour.images = imagesMap.get(tour.id);
                      });
                  });
                  $scope.loading = false;
              });
           },
           function(response){
             // failure call back
           }
        );
    }
  }]);
