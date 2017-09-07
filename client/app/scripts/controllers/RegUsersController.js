  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
    .controller('RegUsersController', function ($scope, $http) {
        $http.get('/api/regusers/').then(function(res, err){
          if(!res.data.success){
              console.log(res.data.message);
              $scope.error = res.data.message;
          }
          $scope.users = res.data;
          if(err){
            console.log(err);
          }
        });
    });
