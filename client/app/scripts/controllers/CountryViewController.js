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

    $scope.destination = [];

    $scope.getCountryDetails = function() {
      $http.get('/api/country/', {params: {id: destinationId}})
       .then(
           function(res){
             // success callback
             var locations = res.data.Locations;
             var locationids = [];

             locations.forEach(function(location) {
               locationids.push(location.id);
             })

             var imageMap = new Map();

             $http.post('/api/image/all/', {tourids:locationids, parentobjectname: 'location'})
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

                  angular.forEach(locations, function(location){
                    location.images = [];
                    location.images.push(imageMapUnderscore.get(JSON.stringify(location.id)));
                  })
                  $scope.destination = locations;
                  console.log(locations);
              });
           },
           function(response){
             // failure call back
           }
        );
    }
}]);
