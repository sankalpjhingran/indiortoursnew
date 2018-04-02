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
  console.log('destinationId===>', destinationId);
  $scope.destination = [];

  $scope.getDestinationDetails = function(){
    $http.get('/api/location/', {params: {id: destinationId}})
     .then(
         function(res){
           // success callback
           $scope.destination = res.data;
           var imageIds = [];
           imageIds.push(destinationId);
           $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: 'location'})
            .then(function(images){
                $scope.destination.images = images;
            });
         },
         function(response){
           // failure call back
         }
      );
  }
}]);
