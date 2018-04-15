'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('HotelViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
  $rootScope.$state = $state;

  var hotelId = $stateParams.id;
  $scope.hotel = [];

  $scope.getDestinationDetails = function(){
    $http.get('/api/hotel/', {params: {id: hotelId}})
     .then(
         function(res){
           // success callback
           $scope.hotel = res.data;
           var imageIds = [];
           imageIds.push(hotelId);
           $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: 'hotel'})
            .then(function(images){
                $scope.hotel.images = images;
            });
         },
         function(response){
           // failure call back
         }
      );
  }
}]);
