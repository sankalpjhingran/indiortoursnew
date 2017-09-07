'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('ContactusController', function ($scope, $http, $location) {
      console.log('In contact us controller');
      $scope.createLead = function(){
        $scope.contactusData.plannedarrival = moment($scope.contactusData.plannedarrival).toDate();
        $http.post('/api/contactus/', $scope.contactusData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            $location.path('/thankyou');
          }
        });
      }
});
