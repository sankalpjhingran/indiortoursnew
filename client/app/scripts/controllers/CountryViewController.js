'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CountryViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
  $rootScope.$state = $state;

    var destinationId = $stateParams.id;
    $scope.name = $stateParams.name;

    $scope.countryData = [];

    $scope.getCountryDetails = function() {
      $http.get('/api/country/', {params: {id: destinationId}})
       .then(
           function(res){
             // success callback
             console.log(res.data);
             var regions = res.data.Regions;
             var regionids = [];
             $scope.countryData = res.data;
             regions.forEach(function(region) {
               regionids.push(regions.id);
             })

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
                  $scope.countryData.locations = res.data.Locations;
                  console.log($scope.countryData.locations);
                  console.log($scope.countryData.regions);
              });
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
               $scope.popularItineraries = res.data[0];
               //console.log(res.data[0]);
             },
             function(response){
               // failure call back
             }
        );
    }
}]);
