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
   //$scope.getToken();

   //$scope.getHashFromPayU();

   $scope.getToken = function () {
     $http({
       method: 'POST',
       url: '/api/v1/token'
     }).then(function (data) {
       $scope.clientToken = data.data.client_token;
     })
  };

  var amt = 100.56;

  $scope.pd = {
     key: 'rjQUPktU', /*** Merchant key from PayuMoney Dashboard ***/
     txnid: (Math.floor((Math.random() * 10000) + 1)).toString(), /*** Unique Transaction ID***/
     amount: amt, /*** Amount to be paid ***/
     firstname: 'Sankalp' /*** Name of the User ***/,
     email: 'sankalp.jhingran@gmail.com' /** Email Id of User **/,
     phone: 14157709291 /** Mobile number of User **/,
     productinfo: 'Taste of India' /* Product name */,
     surl: '/book' /* Success callback URL */,
     furl: '/book' /* Failure callback URL */,
     hash: '',
  }

  // Data to be Sent to API to generate hash.
  var data = {
    'txnid': $scope.pd.txnid,
    'email': $scope.pd.email,
    'amount': $scope.pd.amount,
    'productinfo': $scope.pd.productinfo,
    'firstname': $scope.pd.firstname
  }

  $scope.getHashFromPayU = function() {
    console.log(data);
    $http({
      method: 'POST',
      url: '/api/payment',
      data: JSON.stringify(data)
    }).then(function (res) {
      console.log(res);
      $scope.pd.hash = res.data.hash;
      //$scope.redirectToPayU($scope.pd);
    })
  }

  $scope.redirectToPayU = function (pd) {
    console.log(bolt);

    console.log('Launching payU bolt====>');
    console.log(pd);
    bolt.launch(pd, {
    responseHandler: function (response) {
      console.log(response);
    // your payment response Code goes here
    $http({
      method: 'POST',
      url: '/api/payment/response',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      data: JSON.stringify(response.response)
    })
    .then(function (a) {
       return a.json();
     })
    .then(function (json) {
      console.log(json);
     });
  },
  catchException: function (response) {
    // the code you use to handle the integration errors goes here
    // Make any UI changes to convey the error to the user
    console.log('Exception====>');
    console.log(response.message);
  }
});
  }
  /*
  $scope.getHashFromPayU = function() {
    console.log(data);
    $http.post('/api/payment/', data)
    .then(function (res) {
      console.log(res);
      $scope.pd.hash = res.data.hash;
      //redirectToPayU(pd);
    })
  }
  */

 });
