'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('authcontroller', function ($scope, $http, $location, $rootScope, $window) {
      console.log('In Auth controller');
      $scope.signUp = function(){
        console.log('in Signup function...');
        $http.post('/api/signup/', $scope.signupdata).then(function(res, err){
          if(res.status == 200){
                $rootScope.firstname = res.firstname;
                console.log($scope.signupdata.firstname + ' Welcome to IndiorTours!!');
          }
        });
      }

      $scope.signIn = function(){
        console.log('Signing in...');
        $http.post('/api/signin/', $scope.signindata).then(function(res, err){
          if(res.status == 200){
              console.log('Authentication Successful...');
              $location.path('/regusers');
          }
        }).catch(function(err){
            console.log(err);
            console.log('Invalid Username or Password...');
        });
      }

      $scope.logout = function(){
        console.log('Logging out user...');
        $http.post('/api/logout/').then(function(res, err){
          if(res.status == 200){
              console.log('Logged out...');
              $window.location.reload();
          }
        }).catch(function(err){
            console.log('Error logging out...');
        });
      }
});
