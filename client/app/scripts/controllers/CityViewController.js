'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CityViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
  $rootScope.$state = $state;

  var destinationId = $stateParams.id;
  $scope.name = $stateParams.name;

  $scope.destination = [];

  $scope.getCityDetails = function() {
    $http.get('/api/location/adminalllocations/', {params: {id: destinationId}})
     .then(
         function(res){
           // success callback
           $scope.destination = res.data;
           console.log($scope.destination);
           var imageIds = [];
           imageIds.push(destinationId);
           $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: 'location'})
            .then(function(images){
                console.log(images);
                $scope.destination.images = images;
            });
         },
         function(response){
           // failure call back
         }
      );
  }
}]);
