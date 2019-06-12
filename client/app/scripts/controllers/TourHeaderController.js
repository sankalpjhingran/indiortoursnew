'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SubHeaderController
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TourHeaderController', ['$http', '$state', '$rootScope', '$scope', '$stateParams', '$document', function($http, $state, $rootScope, $scope, $stateParams, $document) {



    var touridsParam = [];
    touridsParam.push($stateParams.id);

    var vm = this;
    vm.$inject = ['NgMap'];

    vm.cities = {
      chicago: {population:2714856, position: [41.878113, -87.629798]},
      newyork: {population:8405837, position: [40.714352, -74.005973]},
      losangeles: {population:3857799, position: [34.052234, -118.243684]},
      vancouver: {population:603502, position: [49.25, -123.1]},
    }
    vm.getRadius = function(num) {
      return Math.sqrt(num) * 100;
    }

    $scope.allImagesForTour = function() {
      console.log('Calling subheader controller=====>');
      $scope.bannerImages = [];
      var tourids = touridsParam;
      $http.post('/api/image/all', {
          tourids: tourids,
          parentobjectname: 'tour'
        })
        .then(function(response) {
          if (response.data.length) {
            angular.forEach(response.data, function(image) {
              $scope.bannerImages.push(image);
            });
          }
        });
    }
    $scope.getAllCities = function() {
    }
  }]);
