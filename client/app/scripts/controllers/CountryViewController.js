'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CountryViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', '_', function ($http, $state, $rootScope, $scope, $stateParams, _) {
  $rootScope.$state = $state;

    var destinationId = $stateParams.id;
    $scope.name = $stateParams.name;

    $scope.loading = true;

    $scope.countryData = [];

    $scope.getCountryDetails = function() {
      $scope.loading = true;
      $http.get('/api/country/', {params: {id: destinationId}})
       .then(
           function(res){
             // success callback
             console.log(res.data);
             var regions = res.data.Regions;
             //var locations = res.data.Locations;

             var regionids = [];
             $scope.countryData = res.data;
             regions.forEach(function(region) {
               regionids.push(regions.id);
             })

             /*
             var locationIds = [];
             locations.forEach(function(loc) {
               locationIds.push(loc.id);
             })
             */

             var imageMap = new Map();

             $http.post('/api/image/all/', {tourids:regionids, parentobjectname: 'region'})
              .then(function(images){
                  var imageMapUnderscore = new Map();
                  angular.forEach(images.data, function(image){
                      var tempImages = [];
                      if(!imageMapUnderscore.has(image.parentobjectid)) {
                         tempImages.push(image);
                      } else {
                        tempImages = imageMapUnderscore.get(image.parentobjectid);
                        tempImages.push(image);
                      }
                      imageMapUnderscore.set(image.parentobjectid, tempImages);
                  })

                  angular.forEach(regions, function(region){
                    region.images = [];
                    region.images.push(imageMapUnderscore.get(JSON.stringify(region.id)));
                  })
                  $scope.countryData.regions = regions;
                  //$scope.countryData.locations = res.data.Locations;
                  //console.log($scope.countryData.locations);
                  console.log($scope.countryData.regions);
              });

              /*

               */
           },
           function(response){
             // failure call back
           }
        );

        $http.get('/api/country/tours', {
          params : {
            id : destinationId
          }
        })
         .then(
             function(res){
               // success callback
               $scope.popularItineraries = [];
               var toursIds = [];
               var apiRes = res.data[0];
               console.log(apiRes);

               var countryLocations = [];

               angular.forEach(apiRes, function(tour){
                  angular.forEach(tour.siteLocation, function(location){
                        location.TourLocation = null;
                        if(location.country_id == destinationId) {
                            countryLocations.push(location);
                        }
                  });
               });

               $scope.countrylocations = _.uniq(countryLocations, false, function(p){ return p.city; });

               console.log($scope.countrylocations);

               var locationIds = [];

               angular.forEach($scope.countrylocations, function(location) {
                  locationIds.push(location.id);
               });

               $http.post('/api/image/all/', {tourids:locationIds, parentobjectname: 'location'})
                .then(function(images){
                    var imageMapUnderscore = new Map();
                    angular.forEach(images.data, function(image){
                        var tempImages = [];
                        if(!imageMapUnderscore.has(image.parentobjectid)) {
                           tempImages.push(image);
                        } else {
                          tempImages = imageMapUnderscore.get(image.parentobjectid);
                          tempImages.push(image);
                        }
                        imageMapUnderscore.set(image.parentobjectid, tempImages);
                    })

                    angular.forEach($scope.countrylocations, function(loc){
                      loc.images = [];
                      loc.images.push(imageMapUnderscore.get(JSON.stringify(loc.id)));
                    })
                });

               angular.forEach(apiRes, function(tour){
                    if(tour.popularitinerary) {
                        $scope.popularItineraries.push(tour);
                        toursIds.push(tour.id);
                    }
               });


               
               $scope.popularItineraries.forEach(function(tour){
                  var tempLocations = [];
                  tour.siteLocation.forEach(function(location){
                      tempLocations.push(location.city);
                  });
                  tour.locations = tempLocations;
                  //tour.price = accounting.formatMoney(tour.price, { symbol: currency.name.newValue,  format: "%v %s" });
                  //tour.offerprice = accounting.formatMoney(tour.offerprice, { symbol: currency.name.newValue,  format: "%v %s" });
               });

               $http.post('/api/image/all/', {tourids:toursIds, parentobjectname: 'tour'})
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
                    console.log($scope.popularItineraries);
                    $scope.loading = false;
                });
             },
             function(response){
               // failure call back
             }

        );
    }
}]);
