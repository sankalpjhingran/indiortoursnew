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
  $scope.type = $stateParams.type;
  $scope.name = $stateParams.name;

  $scope.destination = [];

  switch($scope.type) {
    case 'location':
        console.log('destination is location, id: ' + destinationId);
        $http.get('/api/location/', {params: {id: destinationId}})
         .then(
             function(res){
               // success callback
               $scope.destination = res.data;
               var imageIds = [];
               imageIds.push(destinationId);
               $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: $scope.type})
                .then(function(images){
                    $scope.destination.images = images;
                });
             },
             function(response){
               // failure call back
             }
          );
        break;
    case 'country':
        console.log('destination is country, id: ' + destinationId);
        $http.get('/api/country/', {params: {id: destinationId}})
         .then(
             function(res){
               // success callback
               $scope.destination = res.data;
               var imageIds = [];
               imageIds.push(destinationId);
               $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: $scope.type})
                .then(function(images){
                    $scope.destination.images = images;
                });
             },
             function(response){
               // failure call back
             }
          );
        break;
    case 'continent':
        console.log('destination is continent, id: ' + destinationId);
        $http.get('/api/continent/', {params: {id: destinationId}})
         .then(
             function(res){
               // success callback
               $scope.destination = res.data;
               var imageIds = [];
               imageIds.push(destinationId);
               $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: $scope.type})
                .then(function(images){
                    $scope.destination.images = images;
                });
             },
             function(response){
               // failure call back
             }
          );
        break;
  }

  $scope.getLocationDetails = function(destinationId){
    $http.get('/api/location/', {params: {id: destinationId}})
     .then(
         function(res){
           // success callback
           $scope.destination = res.data;
           var imageIds = [];
           imageIds.push(destinationId);
           $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: type})
            .then(function(images){
                $scope.destination.images = images;
            });
         },
         function(response){
           // failure call back
         }
      );
  }

  $scope.getContinentDetails = function(destinationId){
    $http.get('/api/continent/', {params: {id: destinationId}})
     .then(
         function(res){
           // success callback
           $scope.destination = res.data;
           var imageIds = [];
           imageIds.push(destinationId);
           $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: type})
            .then(function(images){
                $scope.destination.images = images;
            });
         },
         function(response){
           // failure call back
         }
      );
  }

  $scope.getCountryDetails = function(destinationId){
    $http.get('/api/country/', {params: {id: destinationId}})
     .then(
         function(res){
           // success callback
           $scope.destination = res.data;
           var imageIds = [];
           imageIds.push(destinationId);
           $http.post('/api/image/all/', {tourids:imageIds, parentobjectname: type})
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
