'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('RegionViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
  $rootScope.$state = $state;

    var destinationId = $stateParams.countryid;
    var regionid = $stateParams.id;
    $scope.name = $stateParams.name;
    console.log($stateParams);

    $scope.destination = [];

    $scope.getRegionDetails = function() {
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
               console.log($scope.popularItineraries);
               var tourIds = [];

               angular.forEach($scope.popularItineraries, function(tour){
                    tourIds.push(tour.id);
                    var tempLocations = [];
                    tour.siteLocation.forEach(function(location){
                        tempLocations.push(location.city);
                    });
                    tour.locations = tempLocations;
                    //tour.price = accounting.formatMoney(tour.price, { symbol: currency.name.newValue,  format: "%v %s" });
                    //tour.offerprice = accounting.formatMoney(tour.offerprice, { symbol: currency.name.newValue,  format: "%v %s" });
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
                    console.log($scope.popularItineraries);
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
               console.log(res);
               $scope.description = res.data.description;
             },
             function(response){
               // failure call back
             }
        );

    }
}]);
