'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

var app = angular.module('clientApp');

app.directive('tourBox', function() {
  return {
    scope: {
      tour : '='
    },
    restrict: 'EA',
    templateUrl: 'views/tourbox.tpl.html',
    link: function (scope, element, attrs) {
      
    }
  };
});
