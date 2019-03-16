'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('ApplicationController', function ($scope, $http, $location, $rootScope, $window, currencyFact) {
      console.log('In Application controller');
      var vm = this;

      vm.goToSearch = function() {
        if($scope.key) {
            $window.location.href = '/search?key=' + $scope.key;
        }
      }

      $http.get('/api/conversionrates')
       .then(function(res){
         if ( typeof fx !== "undefined" && fx.rates ) {
             fx.rates = res.data.rates;
             fx.base = res.data.base;
         } else {
             var fxSetup = {
                 rates : res.data.rates,
                 base : res.data.base
             }
         }
      });
      
      $http.get('/api/isAuthenticated/')
       .then(
           function(response){
             // success callback
             if(response.data.isLoggedIn){
               vm.isLoggedIn = true;
               if(response.data.user && response.data.user.type === 'Admin'){
                  vm.isAdminLoggedIn = true;
               }
             }else{
               vm.isAdminLoggedIn = false;
             }
             console.log(vm.isAdminLoggedIn);
           },
           function(response){
             //failure call back
             vm.isLoggedIn = false;
           }
        );

      vm.currencyCodes = ['INR', 'EUR', 'GBP', 'USD'];
      vm.selected = 'USD';
      currencyFact.name = {
        newValue : 'USD',
        oldValue : 'USD'
      }
      $rootScope.$broadcast('currency', currencyFact.name);

      $scope.$watch('vm.selected', function(newValue, oldValue){
        currencyFact.name = {
          newValue : newValue,
          oldValue : oldValue
        }
        $rootScope.$broadcast('currency', currencyFact.name);
      });
});
