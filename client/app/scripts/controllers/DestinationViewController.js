'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('DestinationViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
  $rootScope.$state = $state;

  var destinationId = $stateParams.id;
  $scope.name = $stateParams.name;

  $scope.destination = [];

  $scope.getContinentDetails = function() {
    $http.get('/api/continent/', {params: {id: destinationId}})
     .then(
         function(res){
           // success callback
           var destinations = res.data.Countries;
           var imageIds = [];
           angular.forEach(destinations, function(destination){
              imageIds.push(destination.id);
           })

           $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: 'country'})
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

                angular.forEach(destinations, function(destination){
                  destination.images = [];
                  destination.images.push(imageMapUnderscore.get(JSON.stringify(destination.id)));
                })
                $scope.countries = destinations;
            });
         },
         function(response){
           // failure call back
         }
      );
  }
}]);
