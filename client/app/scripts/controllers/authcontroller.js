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

      $scope.visibility = {
        isLoginFormOpen: true,
        isPasswordResetFormOpen: false,
        isSignUpFormOpen: false
      };

      $scope.userinvalid = false;

      $scope.showForgotPasswordForm = function(){
        $scope.visibility.isPasswordResetFormOpen = true;
        $scope.visibility.isLoginFormOpen = false;
        $scope.visibility.isSignUpFormOpen = false;
      }

      $scope.showLoginForm = function(){
        $scope.visibility.isPasswordResetFormOpen = false;
        $scope.visibility.isLoginFormOpen = true;
        $scope.visibility.isSignUpFormOpen = false;
      }

      $scope.showRegistrationForm = function(){
        $scope.visibility.isPasswordResetFormOpen = false;
        $scope.visibility.isLoginFormOpen = false;
        $scope.visibility.isSignUpFormOpen = true;
      }

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
              $rootScope.loggedInUser = res.data;
              $scope.loggedInUser = res.data;
              console.log($rootScope);
              console.log($scope);
              $location.path('/');
          }
        }).catch(function(err){
            console.log(err);
            console.log('Invalid Username or Password...');
        });
      }

      $scope.facebookSignIn = function() {
        console.log('Signing in...');
        $window.location.href = '/api/signin/auth/facebook?returnTo=/';
      }

      $scope.forgotPassword = function(){
        console.log('forgotpassword in...' + $scope.useremail);
        var config = {
              headers : {
                  'Content-Type': 'application/x-www-form-urlencoded'
              }
          }

          var data = $.param({
                email: $scope.useremail
          });

        $http.post('/api/users/forgotpassword/', data, config).then(function(res, err){
          if(res.status == 200){

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
