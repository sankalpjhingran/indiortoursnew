'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('AdminSideSectionController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
    $scope.navigateToAdminPage = function(pageName) {
          $location.path = '/' + pageName;
    }

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    }
  })

.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('show');
                    return;
                  }
                  element.removeClass('show');
            });
        }
    };
});
