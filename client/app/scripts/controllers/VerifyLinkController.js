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

      $scope.verificationSuccess = true;
      $scope.linkExpired = true;
      $scope.unknownError = false;

      var link = $stateParams.link;
      var userId = $stateParams.id;

      $scope.verifyLink = function() {
          //Write code to check if link exists for user id and is still active
      }
}]);
