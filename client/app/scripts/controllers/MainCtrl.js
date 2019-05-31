'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MainCtrl', ['$http','$state', '$rootScope', '$scope', 'localStorageService', 'Carousel', 'currencyFact', '$uibModal', function ($http, $state, $rootScope, $scope, localStorageService, Carousel, currencyFact, $uibModal) {

    var imagesMap = new Map();
    $scope.toursMap = new Map();
    $scope.recentTours = [];

    $scope.currencyFromFact = { name : {oldValue : 'USD', newValue : 'USD'}};

    $scope.$on('currency', function(event, data) {
      $scope.currencyFromFact = currencyFact;
    });

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
             $scope.currency = {
               newValue : 'USD',
               oldValue : 'USD'
             }

             // success callback
             $scope.allTours = JSON.parse(res.data);
             var tourids = [];

             $scope.allTours.forEach(function(tour){
                tourids.push(tour.id);
                var tempLocations = [];
                tour.siteLocation.forEach(function(location){
                    tempLocations.push(location.city);
                });
                tour.locations = tempLocations;
                tour.price = accounting.formatMoney(tour.price, { symbol: $scope.currency.newValue,  format: "%v %s" });
                tour.offerprice = accounting.formatMoney(tour.offerprice, { symbol: $scope.currency.newValue,  format: "%v %s" });
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
                        if(imagesMap.get(tour.id) && imagesMap.get(tour.id).length) {
                          //var randomImage = Math.floor(Math.random() * imagesMap.get(tour.id).length);
                          tour.images = imagesMap.get(tour.id); //[randomImage];
                          $scope.toursMap.set(tour.id, tour);
                        }
                      });
                  });
                  $scope.loading = false;

                  angular.forEach(JSON.parse(localStorageService.get("recenttours")), function(tour){
                    $scope.recentTours.push($scope.toursMap.get(tour.tourid));
                  });
                  var uniqueEntries = $scope.removeDuplicates($scope.recentTours);
                  $scope.recentTours = [];
                  $scope.recentTours = uniqueEntries;

              });
           },
           function(response){
             // failure call back
           }
        );
    }

    $scope.showEnquiryForm = function(tourId, tourname, price, days){
        console.log(tourId);
        console.log(tourname);
        console.log(price);
        console.log(days);
        $scope.showForm(tourId, tourname, price, days);
    }


    $scope.showForm = function (tourId, tourName, price, days) {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);
        $scope.enquiryTourId = tourId;
        $scope.tourName = tourName;
        $scope.tourPrice = price;
        $scope.tourDays = days;

        console.log($scope.enquiryTourId);
        console.log($scope.tourName);
        console.log($scope.tourPrice);
        console.log($scope.tourDays);

        $scope.modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ContactusController',
            scope: $scope,
            backdrop: 'static',
            size: 'md',
        });

        $scope.modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.cancel = function () {
        $scope.modalInstance.dismiss('cancel');
    };

    var _selected;
    $scope.ngModelOptionsSelected = function(value) {
      if (arguments.length) {
        _selected = value;
      } else {
        return _selected;
      }
    };

    $scope.modelOptions = {
      debounce: {
        default: 500,
        blur: 250
      },
      getterSetter: true
    };
  }]);
