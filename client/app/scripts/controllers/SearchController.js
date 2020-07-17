'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SubHeaderController
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('SearchController', ['$http','$state', '$rootScope', '$scope', '$stateParams', '$localStorage', function ($http, $state, $rootScope, $scope, $stateParams, $localStorage) {
    var searchKey = $stateParams.key;
    $scope.results = [];
    var imagesMap = new Map();
    $scope.fromTo = $localStorage.currencypreference;

    $scope.searchTours = function() {
        $scope.loading = true;
        $http.get('/api/search/', {params: {key: searchKey}})
         .then(function(response){
              if(response.data.length){
                  var tourids = [];
                  angular.forEach(response.data, function(tour){
                      $scope.results.push(tour);
                      tourids.push(tour.id);

                      //Convert first if saved currency is not USD
                      if($scope.fromTo.to == 'USD' && $scope.fromTo.from == 'USD') {
                        if(tour.price) {
                          tour.price = accounting.formatMoney(tour.price, { symbol: $scope.fromTo.to,  format: "%v %s" });
                        }

                        if(tour.offerprice) {
                          tour.offerprice = accounting.formatMoney(tour.offerprice, { symbol: $scope.fromTo.to,  format: "%v %s" });
                        }
                      } else {
                        if(tour.price) {
                          tour.price = accounting.unformat(tour.price);
                          tour.price = fx.convert(tour.price, {from: "USD", to: $scope.fromTo.from});
                          tour.price = accounting.formatMoney(fx.convert(tour.price, $scope.fromTo), { symbol: $scope.fromTo.to,  format: "%v %s" });
                        }

                        if(tour.offerprice) {
                          tour.offerprice = accounting.unformat(tour.offerprice);
                          tour.offerprice = fx.convert(tour.offerprice, {from: "USD", to: $scope.fromTo.from});
                          tour.offerprice = accounting.formatMoney(fx.convert(tour.offerprice, $scope.fromTo), { symbol: $scope.fromTo.to,  format: "%v %s" });
                        }
                      }
                  });

                  $http.post('/api/image/all', {tourids: tourids, parentobjectname: 'tour'})
                   .then(function(images){
                       angular.forEach(tourids, function(tourid){
                           var tempImages = [];
                           angular.forEach(images.data, function(image){
                             if(image.parentobjectname == 'tour' && image.parentobjectid == tourid){
                                   tempImages.push(image);
                             }
                           });
                           imagesMap.set(tourid, tempImages);
                           angular.forEach($scope.results, function(tour){
                             tour.images = imagesMap.get(tour.id);
                           });
                       });
                       $scope.loading = false;
                   });
              }
         });
    }
  }]);
