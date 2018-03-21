'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('DestinationsController', ['$http','$state', '$rootScope', '$scope', function ($http, $state, $rootScope, $scope) {

    var imagesMap = new Map();

    $scope.allDestinations = function(){
      $http.get('/api/location/all')
       .then(
           function(res){
             // success callback
             $scope.allLocations = res.data;
             var locationids = [];

             $scope.allLocations.forEach(function(location){
                locationids.push(location.id);
             });

             console.log(locationids);
             $http.post('/api/image/all', {tourids: locationids, parentobjectname: 'location'})
              .then(function(images){
                  angular.forEach(locationids, function(locationid){
                      var tempImages = [];
                      angular.forEach(images.data, function(image){
                        if(image.parentobjectname == 'location' && image.parentobjectid == locationid){
                              tempImages.push(image);
                        }
                      });
                      imagesMap.set(locationid, tempImages);
                      angular.forEach($scope.allLocations, function(location){
                        location.images = imagesMap.get(location.id);
                      });
                  });
                  console.log(imagesMap);
              });
           },
           function(response){
             // failure call back
           }
        );
    }
}]);
