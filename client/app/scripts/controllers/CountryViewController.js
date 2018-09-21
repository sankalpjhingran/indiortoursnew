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
             $scope.destination = res.data;
             console.log($scope.destination);
             var imageIds = [];
             imageIds.push(destinationId);
             $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: 'country'})
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
