'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('ApplicationController', function ($localStorage, $scope, $http, $location, $rootScope, $window, currencyFact, $translate) {
      console.log('In Application controller');
      var vm = this;
      vm.loggedInUserName = {};
      vm.isAdminLoggedIn = false;

      vm.selectCurrency = function(currency) {
        console.log('Calling selectCurrency====>');
        vm.selected = currency;
      }

      vm.goToSearch = function() {
        if(vm.key) {
            console.log('Calling gotoSearch');
            $window.location.href = '/search?key=' + vm.key;
        }
      }

      $scope.changeLanguage = function (key) {
        $translate.use(key);
      };

      $http.get('/api/isAuthenticated/')
       .then(
           function(response){
             // success callback
             if(response.data.isLoggedIn){
               vm.isLoggedIn = true;
               vm.loggedInUserName = response.data.user.firstname;
               if(response.data.isAdmin){
                  vm.isAdminLoggedIn = true;
               }
             }else{
               vm.isAdminLoggedIn = false;
               vm.isLoggedIn = false;
               vm.loggedInUserName = 'My Account';
             }
           },
           function(response){
             //failure call back
             vm.isLoggedIn = false;
           }
        );

      vm.currencyCodes = ['INR', 'EUR', 'GBP', 'USD'];
      $scope.$storage = $localStorage;

      //Set default currency as USD
      if($localStorage.currencypreference && $localStorage.currencypreference.to) {
        vm.selected = $localStorage.currencypreference.to;
      } else {
        vm.selected = 'USD';
      }

      $scope.$watch('vm.selected', function(newValue, oldValue){
        if(!$localStorage.currencypreference) {
          $localStorage.currencypreference = {
            to : newValue,
            from : oldValue
          }
        }

        if(newValue != oldValue) {
          if($localStorage.currencypreference.newValue != newValue) {
            $localStorage.currencypreference = {
              to : newValue,
              from : oldValue
            }
            $rootScope.$broadcast('currency', $localStorage.currencypreference);
          }
        }
      });
});
