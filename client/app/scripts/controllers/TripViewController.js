'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TripViewController', ['$localStorage', '$http','$state', '$rootScope', '$scope', '$stateParams', function ($localStorage, $http, $state, $rootScope, $scope, $stateParams) {
    $rootScope.$state = $state;

    var tourId = $stateParams.id;
    $scope.fromTo = $localStorage.currencypreference;
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

             console.log('$scope.allTours======> ', $scope.allTours);
             
             $scope.childTours.forEach(function(tour){
                tourids.push(tour.id);
                var tempLocations = [];
                tour.siteLocation.forEach(function(location){
                    tempLocations.push(location.city);
                });
                tour.locations = tempLocations;
                //Convert first if saved currency is not USD
                if($scope.fromTo.to == 'USD' && $scope.fromTo.from == 'USD') {
                  if(tour.price) {
                    $scope.tourWithAllRelated.price = accounting.formatMoney(tour.price, { symbol: $scope.fromTo.to,  format: "%v %s" });
                  }
                  if(tour.offerprice) {
                    tour.offerprice = accounting.formatMoney(tour.offerprice, { symbol: $scope.fromTo.to,  format: "%v %s" });
                  }
                } else {
                  if(tour.price) {
                    tour.price = accounting.unformat(tour.price);
                    tour.price = fx.convert(tour.price, {from: "USD", to: $scope.fromTo.from});
                    tour.price = accounting.formatMoney(fx.convert(tour.price, $scope.fromTo), { symbol: $scope.fromTo.to,  format: "%v %s" });
                  }

                  if(tour.offerprice) {
                    tour.offerprice = accounting.unformat(tour.offerprice);
                    tour.offerprice = fx.convert(tour.offerprice, {from: "USD", to: $scope.fromTo.from});
                    tour.offerprice = accounting.formatMoney(fx.convert(tour.offerprice, $scope.fromTo), { symbol: $scope.fromTo.to,  format: "%v %s" });
                  }
                }
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
                  });

                  angular.forEach($scope.childTours, function(tour){
                    tour.image = {};
                    tour.image = imagesMap.get(tour.id)[0];
                  });
                  
                  console.log('$scope.childTours===>', $scope.childTours);
                  $scope.loading = false;
              });
           },
           function(response){
             // failure call back
           }
        );
    }
  }]);
