'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */

 angular.module('clientApp')
 .controller('CheckoutController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
   $scope.message = 'Please use the form below to pay:';
   $scope.showDropinContainer = true;
   $scope.isError = false;
   $scope.isPaid = false;
   $scope.myform = [];
   var ctrl = this;

   $scope.getToken = function () {

     $http({
       method: 'POST',
       url: '/api/v1/token'
     }).then(function (data) {
       $scope.clientToken = data.data.client_token;
  })
};
   $scope.getToken();
 });
