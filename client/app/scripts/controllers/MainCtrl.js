'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', ['$http','$state', '$rootScope', '$scope', function ($http, $state, $rootScope, $scope) {
    $rootScope.$state = $state;
    $scope.rate = 7;
    $scope.max = 5;
    $scope.isReadonly = false; // This will be true for logged in users.

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

    $scope.ratingStates = [
      {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
      {stateOn: 'glyphicon-heart'},
      {stateOff: 'glyphicon-off'}
    ];

    var imagesMap = new Map();

    $scope.allToursWithLocations = function(){
      console.log('Calling allToursWithLocations on ng-change===> ' + JSON.stringify($scope.searchTour));
      $http.get('/api/tours/alltourswithlocations', { params:$scope.searchTour } )
       .then(
           function(res){
             // success callback
             $scope.allTours = res.data;
             var tourids = [];

             $scope.allTours.forEach(function(tour){
                tourids.push(tour.id);
             });

             console.log(tourids);
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
                      angular.forEach($scope.allTours, function(tour){
                        tour.images = imagesMap.get(tour.id);
                      });
                  });
                  console.log(imagesMap);
              });
           },
           function(response){
             // failure call back
           }
        );
    }

    $scope.searchAllToursWithLocations = function(){
      console.log('Calling allToursWithLocations on ng-change===> ' + JSON.stringify($scope.searchTour));
      $http.get('/api/tours/searchtourwithlocations', { params:$scope.searchTour } )
       .then(
           function(res){
             // success callback
             $scope.allTours = res.data;
             var tourids = [];
             $scope.allTours.forEach(function(tour){
                tourids.push({parentobjectname: 'tour', parentobjectid: tour.id});
             });
             $http.get('/api/image/all', tourids)
              .then(function(images){
                  angular.forEach(tourids, function(tourid){
                      var tempImages = [];
                      angular.forEach(images.data, function(image){
                        if(image.parentobjectname == tourid.parentobjectname && image.parentobjectid == tourid.parentobjectid){
                              tempImages.push(image);
                        }
                      });
                      imagesMap.set(tourid.parentobjectid, tempImages);
                      angular.forEach($scope.allTours, function(tour){
                        tour.images = imagesMap.get(tour.id);
                      });
                  });
                  console.log(imagesMap);
              });
           },
           function(response){
             // failure call back
           }
        );
    }
  }]);
