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

      $http.get('/api/isAuthenticated/')
       .then(
           function(response){
             // success callback
             console.log(response);
             if(response.data.isLoggedIn){
               $scope.isLoggedIn = true;
               if(response.data.type === 'Admin'){
                  $scope.isAdminLoggedIn = true;
               }
             }else{
               $scope.isAdminLoggedIn = false;
               $scope.isLoggedIn = false;
             }
           },
           function(response){
             //failure call back
             $scope.isLoggedIn = false;
           }
        );
});
