'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('ApplicationController', function ($scope, $http, $location, $rootScope, $window) {
      console.log('In Application controller');

      /*
      $http.get('/api/isAuthenticated/')
       .then(
           function(response){
             // success callback
             if(response.data.isLoggedIn){
               $scope.isLoggedIn = true;
               if(response.data.user && response.data.user.type === 'Admin'){
                  $scope.isAdminLoggedIn = true;
               }
             }else{
               $scope.isAdminLoggedIn = false;
             }
             console.log($scope.isAdminLoggedIn);
           },
           function(response){
             //failure call back
             $scope.isLoggedIn = false;
           }
        );
      */
});
