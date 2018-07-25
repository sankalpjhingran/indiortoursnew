'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', ['$http','$state', '$rootScope', '$scope', 'localStorageService', 'Carousel', 'currency', function ($http, $state, $rootScope, $scope, localStorageService, Carousel, currency) {

    $http.get('/api/conversionrates')
     .then(function(res){
       if ( typeof fx !== "undefined" && fx.rates ) {
           fx.rates = res.data.rates;
           fx.base = res.data.base;
       } else {
           var fxSetup = {
               rates : res.data.rates,
               base : res.data.base
           }
       }
    });

    //$scope.currency = currency.name.newValue;

    $scope.$on('currency.name', function(event, args) {
      $scope.currency = currency.name.newValue;
      var fromTo = {
        from: currency.name.oldValue,
        to: currency.name.newValue
      }
      angular.forEach($scope.allTours, function(tour){
          if(tour.price != null) {
              tour.price = accounting.unformat(tour.price);
              tour.price = accounting.formatMoney(fx.convert(tour.price, fromTo), { symbol: currency.name.newValue,  format: "%v %s" });
          }
          if(tour.offerprice != null) {
              tour.offerprice = accounting.unformat(tour.offerprice);
              tour.offerprice = accounting.formatMoney(fx.convert(tour.offerprice, fromTo), { symbol: currency.name.newValue,  format: "%v %s" });
          }
      });
    });

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
      $scope.loading = true;

      $http.get('/api/tours/alltourswithlocations')
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
                tour.price = accounting.formatMoney(tour.price, { symbol: currency.name.newValue,  format: "%v %s" });
                tour.offerprice = accounting.formatMoney(tour.offerprice, { symbol: currency.name.newValue,  format: "%v %s" });
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
