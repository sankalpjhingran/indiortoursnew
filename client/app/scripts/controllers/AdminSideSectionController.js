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
});
