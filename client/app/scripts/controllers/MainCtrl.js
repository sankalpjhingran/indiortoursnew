'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', ['$http','$state', '$rootScope', '$scope', 'localStorageService', 'Carousel', function ($http, $state, $rootScope, $scope, localStorageService, Carousel) {
    var imagesMap = new Map();
    $scope.toursMap = new Map();
    $scope.recentTours = [];

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

    $scope.addToRecentItems = function(val) {
      // Parse the JSON stored in allEntriesP
      var existingEntries = JSON.parse(localStorageService.get("recenttours"));
      if(existingEntries == null) existingEntries = [];
      var recent = {
          tourid: val,
      };

      existingEntries.push(recent);
      var uniqueEntries = $scope.removeDuplicates(existingEntries);
      localStorageService.set("recenttours", JSON.stringify(uniqueEntries));
    }

    $scope.removeDuplicates = function (arr){
      var uniqueArray=[];
      for(var i = 0;i < arr.length; i++){
          if(uniqueArray.indexOf(arr[i]) == -1){
              uniqueArray.push(arr[i]);
          }
      }
      return uniqueArray;
    }

    $scope.allToursWithLocations = function() {
      console.log('Calling allToursWithLocations on ng-change===> ' + JSON.stringify($scope.searchTour));
      $scope.loading = true;

      $http.get('/api/tours/alltourswithlocations', { params:$scope.searchTour } )
       .then(
           function(res){
             // success callback
             $scope.allTours = res.data;
             var tourids = [];

             $scope.allTours.forEach(function(tour){
                tourids.push(tour.id);
                var tempLocations = [];
                tour.siteLocation.forEach(function(location){
                    tempLocations.push(location.city);
                });
                tour.locations = tempLocations;
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
                      angular.forEach($scope.allTours, function(tour){
                        tour.images = imagesMap.get(tour.id);
                        $scope.toursMap.set(tour.id, tour);
                      });
                      console.log($scope.toursMap);
                  });
                  $scope.loading = false;

                  console.log($scope.toursMap);
                  angular.forEach(JSON.parse(localStorageService.get("recenttours")), function(tour){
                    console.log($scope.toursMap.get(tour.tourid));
                    $scope.recentTours.push($scope.toursMap.get(tour.tourid));
                  });
                  var uniqueEntries = $scope.removeDuplicates($scope.recentTours);
                  $scope.recentTours = [];
                  $scope.recentTours = uniqueEntries;
                  console.log($scope.recentTours);
              });
           },
           function(response){
             // failure call back
           }
        );
    }
  }]);
