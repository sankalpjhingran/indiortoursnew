'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

var app = angular.module('clientApp');

app.directive('currencyDirec', function($localStorage) {
  return {
    scope: {
      price : '@'
    },
    restrict: 'EA',
    template: '{{ price }}',
    link: function (scope, element, attrs) {
      if(scope.price != null) {
          //console.log($localStorage.currencypreference);
          if($localStorage.currencypreference.to === 'USD' && $localStorage.currencypreference.from === 'USD') {
              scope.price = accounting.unformat(scope.price);
              scope.price = accounting.formatMoney(fx.convert(scope.price, $localStorage.currencypreference), { symbol: $localStorage.currencypreference.to,  format: "%v %s" });
          } else {
              scope.price = accounting.unformat(scope.price);
              //Convert to current or new currency
              scope.price = fx.convert(scope.price, { to: $localStorage.currencypreference.to, from: "USD" });
              scope.price = fx.convert(scope.price, $localStorage.currencypreference);
              scope.price = accounting.formatMoney(scope.price, { symbol: $localStorage.currencypreference.to,  format: "%v %s" });
          }
      }

      scope.$on('currency', function(event, data) {
        if(scope.price != null) {
            scope.price = accounting.unformat(scope.price);
            scope.price = accounting.formatMoney(fx.convert(scope.price, $localStorage.currencypreference), { symbol: $localStorage.currencypreference.to,  format: "%v %s" });
        }
      });
    }
  };
});
