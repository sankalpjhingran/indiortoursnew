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
    $scope.loading = true;
    $http.get('/api/location/', {params: {id: destinationId}})
     .then(
         function(res){
           // success callback
           $scope.destination = res.data;
           console.log($scope.destination);

           angular.forEach($scope.destination.siteTour, function(tour){
                var tempLocations = [];
                tour.siteLocation.forEach(function(location){
                    tempLocations.push(location.city);
                });
                tour.locations = tempLocations;
                //tour.price = accounting.formatMoney(tour.price, { symbol: currency.name.newValue,  format: "%v %s" });
                //tour.offerprice = accounting.formatMoney(tour.offerprice, { symbol: currency.name.newValue,  format: "%v %s" });
           });

           var imageIds = [];
           imageIds.push(destinationId);
           $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: 'location'})
            .then(function(images){
                console.log(images);
                $scope.destination.images = images;
                $scope.loading = false;
            });
         },
         function(response){
           // failure call back
         }
      );
  }
}]);
