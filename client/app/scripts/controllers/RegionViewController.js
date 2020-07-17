'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('RegionViewController', ['$localStorage', '$http','$state', '$rootScope', '$scope', '$stateParams', function ($localStorage, $http, $state, $rootScope, $scope, $stateParams) {
  $rootScope.$state = $state;

    var destinationId = $stateParams.countryid;
    var regionid = $stateParams.id;
    $scope.name = $stateParams.name;
    $scope.fromTo = $localStorage.currencypreference;
    //console.log($stateParams);

    $scope.destination = [];

    $scope.getRegionDetails = function() {
      $scope.loading = true;
        $http.get('/api/country/toursforregion', {
          params : {
            id : destinationId,
            regionid : regionid
          }
        })
         .then(
             function(res){
               // success callback
               $scope.popularItineraries = res.data[0];
               //console.log($scope.popularItineraries);
               var tourIds = [];

               angular.forEach($scope.popularItineraries, function(tour){
                    tourIds.push(tour.id);
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

               $http.post('/api/image/all/', {tourids:tourIds, parentobjectname: 'tour'})
                .then(function(images){
                    var imageTourMap = new Map();
                    angular.forEach(images.data, function(image){
                        var tempImages = [];
                        if(!imageTourMap.has(image.parentobjectid)) {
                           tempImages.push(image);
                        } else {
                          tempImages = imageTourMap.get(image.parentobjectid.toString());
                          tempImages.push(image);
                        }
                        imageTourMap.set(image.parentobjectid, tempImages);
                    })
                    angular.forEach($scope.popularItineraries, function(tour){
                      tour.images = [];
                      tour.images.push(imageTourMap.get((tour.id).toString()));
                    });

                    $scope.popularItineraries = _.chain($scope.popularItineraries)
                       .sortBy('price')
                       .partition('price')
                       .flatten()
                       .value();
                });

             },
             function(response){
               // failure call back
             }
        );


        $http.get('/api/region', {
          params : {
            regionid : regionid
          }
        })
         .then(
             function(res){
               //console.log(res);
               $scope.regionDetails = res.data[0];
               //console.log($scope.regionDetails);
               $scope.description = $scope.regionDetails.description;

               var locIds = [];
               angular.forEach($scope.regionDetails.Locations, function(location){
                  locIds.push(location.id);
               });

               $http.post('/api/image/all/', {tourids:locIds, parentobjectname: 'location'})
                .then(function(images){
                    var imageTourMap = new Map();
                    angular.forEach(images.data, function(image){
                        var tempImages = [];
                        if(!imageTourMap.has(image.parentobjectid)) {
                           tempImages.push(image);
                        } else {
                          tempImages = imageTourMap.get(image.parentobjectid.toString());
                          tempImages.push(image);
                        }
                        imageTourMap.set(image.parentobjectid, tempImages);
                    })
                    angular.forEach($scope.regionDetails.Locations, function(location){
                      location.images = [];
                      location.images.push(imageTourMap.get((location.id).toString()));
                    });
                    //console.log($scope.regionDetails.Locations);
                });

               $scope.loading = false;
             },
             function(response){
               // failure call back
             }
        );
    }
}]);
