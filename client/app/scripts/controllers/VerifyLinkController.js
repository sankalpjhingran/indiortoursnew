'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('VerifyLinkController', ['$http','$state', '$rootScope', '$scope', '$stateParams', 'uiGridGroupingConstants', function ($http, $state, $rootScope, $scope, $stateParams, calendarConfig, uiGridGroupingConstants) {
      console.log('In VerifyLinkController===>');

      $scope.verificationSuccess = false;
      $scope.linkExpired = false;
      $scope.invaliduser = false;
      $scope.newverificationemailsent = false;
      $scope.newforgorpasswordlinksent = false;
      $scope.passwordchangedsuccess = false;

      var link = $stateParams.link;
      var userId = $stateParams.id;

      $scope.verifyLink = function() {
          //Write code to check if link exists for user id and is still active
          var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

          var data = $.param({
                id: userId,
                verifylink: link
          });

          $http.post('/api/users/verify', data, config)
           .then(function(response){
                console.log(response);
                if(response.data && response.data.result == 'success') {
                    $scope.verificationSuccess = true;
                } else if(response.data && response.data.error == "Link expired") {
                    $scope.verificationSuccess = false;
                    $scope.linkExpired = true;
                } else {
                    $scope.invaliduser = true;
                    $scope.linkExpired = true;
                }

            });
      }

      $scope.updatePassword = function() {
          //Write code to check if link exists for user id and is still active
          var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

          var data = $.param({
                id: userId,
                password: $scope.password
          });

          $http.post('/api/users/updatepassword', data, config)
           .then(function(response){
                console.log(response);
                if(response.data && response.data == true) {
                    $scope.passwordchangedsuccess = true;
                    $scope.verificationSuccess = false;
                } else {
                    $scope.invaliduser = true;
                }

            });
      }

      $scope.verifyForgotPasswordLink = function() {
          //Write code to check if link exists for user id and is still active
          var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

          var data = $.param({
                id: userId,
                verifylink: link
          });

          $http.post('/api/users/verify', data, config)
           .then(function(response){
                console.log(response);
                if(response.data && response.data.result == 'success') {
                    $scope.verificationSuccess = true;
                    $scope.userfirstname = response.data.name;
                } else if(response.data && response.data.error == "Link expired") {
                    $scope.verificationSuccess = false;
                    $scope.linkExpired = true;
                } else {
                    $scope.invaliduser = true;
                    $scope.linkExpired = true;
                }

            });
      }

      $scope.sendNewVerifyLink = function() {
          //Write code to check if link exists for user id and is still active
          var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

          var data = $.param({
                email: $scope.useremail
          });

          $http.post('/api/users/newverifylink', data, config)
           .then(function(response){
                console.log(response);
                if(response.data && response.data == true) {
                    $scope.newverificationemailsent = response.data;
                } else {
                    $scope.invaliduser = true;
                }

            });
      }

      $scope.sendNewForgotPassWordLink = function() {
          //Write code to check if link exists for user id and is still active
          var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }

          var data = $.param({
                email: $scope.useremail
          });

          $http.post('/api/users/forgotpassword/', data, config)
           .then(function(response){
                console.log(response);
                if(response.data && response.data == true) {
                    $scope.newforgorpasswordlinksent = true;
                } else {
                    $scope.invaliduser = true;
                }

            });
      }
}]);
