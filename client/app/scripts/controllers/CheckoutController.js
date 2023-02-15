'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */

angular.module('clientApp')
    .controller('CheckoutController', function($sce, $scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {

        $scope.toggleShowForm = function() {
            return true;
        }

        $scope.submitForm = function() {
            var data = {
                merchant_id: '187180',
                order_id: '8751262825',
                redirect_url: 'http://127.0.0.1:9000/api/ccavResponseHandler',
                cancel_url: 'http://127.0.0.1:9000/api/ccavResponseHandler',
                amount: '1.00'
            };


            $http.post('/api/ccavRequestHandler', data).then(function(res, err) {
                if (res.status === 200) {
                    $scope.ccavenueForm = $sce.trustAsHtml(res.data);
                }
            });
        };

        $scope.message = 'Please use the form below to pay:';
        $scope.showDropinContainer = true;
        $scope.isError = false;
        $scope.isPaid = false;
        $scope.myform = [];
        var ctrl = this;
        //$scope.getToken();

        //$scope.getHashFromPayU();

        $scope.getToken = function() {
            $http({
                method: 'POST',
                url: '/api/v1/token'
            }).then(function(data) {
                $scope.clientToken = data.data.client_token;
            })
        };

        var amt = 100.56;

        $scope.pd = {
            key: 'rjQUPktU',
            /*** Merchant key from PayuMoney Dashboard ***/
            txnid: (Math.floor((Math.random() * 10000) + 1)).toString(),
            /*** Unique Transaction ID***/
            amount: amt,
            /*** Amount to be paid ***/
            firstname: 'Sankalp' /*** Name of the User ***/ ,
            email: 'sankalp.jhingran@gmail.com' /** Email Id of User **/ ,
            phone: 14157709291 /** Mobile number of User **/ ,
            productinfo: 'Taste of India' /* Product name */ ,
            surl: '/book' /* Success callback URL */ ,
            furl: '/book' /* Failure callback URL */ ,
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
            $http({
                method: 'POST',
                url: '/api/payment',
                data: JSON.stringify(data)
            }).then(function(res) {
                $scope.pd.hash = res.data.hash;
                //$scope.redirectToPayU($scope.pd);
            })
        }

        $scope.redirectToPayU = function(pd) {
            bolt.launch(pd, {
                responseHandler: function(response) {
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
                        .then(function(a) {
                            return a.json();
                        })
                        .then(function(json) {
                            console.log(json);
                        });
                },
                catchException: function(response) {
                    // the code you use to handle the integration errors goes here
                    // Make any UI changes to convey the error to the user
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