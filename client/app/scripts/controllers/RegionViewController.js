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

    $scope.getCountryDetails = function() {
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
               console.log(res.data[0]);
             },
             function(response){
               // failure call back
             }
        );
    }
}]);
