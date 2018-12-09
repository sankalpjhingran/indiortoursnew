'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('ApplicationController', function ($scope, $http, $location, $rootScope, $window, currency) {
      console.log('In Application controller');
      var vm = this;

      $scope.goToSearch = function() {
        if($scope.key) {
            $window.location.href = '/search?key=' + $scope.key;
        }
      }

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

      $scope.$watch('vm.selected', function(newValue, oldValue){
        currency.name = {
          newValue : newValue,
          oldValue : oldValue
        }
        $rootScope.$broadcast('currency.name');
      });
})
.factory('currency', function(){
  var name = {
      oldValue : '',
      newValue : ''
  };

  name.get = function(){
    return name;
  };

  return name;
});
