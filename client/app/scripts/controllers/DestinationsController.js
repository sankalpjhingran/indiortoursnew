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
      $scope.loading = true;
      $http.get('/api/continent/all')
       .then(
           function(res){
             // success callback
             console.log(res.data);
             $scope.allContinents = res.data;
             var locationids = [];

             $scope.allContinents.forEach(function(location){
                locationids.push(location.id);
             });

             console.log(locationids);
             $http.post('/api/image/all', {tourids: locationids, parentobjectname: 'continent'})
              .then(function(images){
                  angular.forEach(locationids, function(locationid){
                      var tempImages = [];
                      angular.forEach(images.data, function(image){
                        if(image.parentobjectname == 'continent' && image.parentobjectid == locationid){
                              tempImages.push(image);
                        }
                      });
                      imagesMap.set(locationid, tempImages);
                      angular.forEach($scope.allContinents, function(location){
                        location.images = imagesMap.get(location.id);
                      });
                  });
                  $scope.loading = false;
                  console.log(imagesMap);
              });
           },
           function(response){
             // failure call back
           }
        );
    }
}]);
