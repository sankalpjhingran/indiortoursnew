'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

var app = angular.module('clientApp');

app.directive('currencyDirec', function($http, currencyFact) {
  return {
    scope: {
      price : '@'
    },
    restrict: 'EA',
    template: '{{ price }}',
    link: function (scope, element, attrs) {
      var fromTo = {};
      scope.currency = currencyFact.name;

      fromTo = {
        from: scope.currency.oldValue,
        to: scope.currency.newValue
      }

      if(scope.price != null) {
          scope.price = accounting.unformat(scope.price);
          scope.price = accounting.formatMoney(fx.convert(scope.price, fromTo), { symbol: fromTo.to,  format: "%v %s" });
      }

      scope.$on('currency', function(event, data) {
        console.log(currencyFact.name);
        scope.currency = currencyFact.name;
        fromTo = {
          from: scope.currency.oldValue,
          to: scope.currency.newValue
        }
        if(scope.price != null) {
            scope.price = accounting.unformat(scope.price);
            scope.price = accounting.formatMoney(fx.convert(scope.price, fromTo), { symbol: fromTo.to,  format: "%v %s" });
        }
      });
    }
  };
});
