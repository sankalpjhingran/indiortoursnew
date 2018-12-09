'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TripsController', ['$http','$state', '$rootScope', '$scope', function ($http, $state, $rootScope, $scope) {
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

    $scope.allParentToursWithTours = function(){
      console.log('Calling allToursWithLocations on ng-change===> ' + JSON.stringify($scope.searchTour));
      $scope.loading = true;
      $http.get('/api/parenttours/allTripsByOrder')
       .then(
           function(res){
             // success callback
             $scope.allTours = res.data;
             var tourids = [];

             $scope.allTours.forEach(function(tour){
                tourids.push(tour.id);
             });

             console.log(tourids);
             $http.post('/api/image/all', {tourids: tourids, parentobjectname: 'parenttour'})
              .then(function(images){
                  angular.forEach(tourids, function(tourid){
                      var tempImages = [];
                      angular.forEach(images.data, function(image){
                        if(image.parentobjectname == 'parenttour' && image.parentobjectid == tourid){
                              tempImages.push(image);
                        }
                      });
                      imagesMap.set(tourid, tempImages);
                      angular.forEach($scope.allTours, function(tour){
                        tour.images = imagesMap.get(tour.id);
                      });
                  });
                  $scope.loading = false;
                  console.log(imagesMap);
              });
           },
           function(response){
             // failure call back
           }
        );
    }
  }]);
