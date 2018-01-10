'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('ContactusController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
      console.log('In contact us controller');
      $scope.createLead = function(){
        $scope.contactusData.plannedarrival = moment($scope.contactusData.plannedarrival).toDate();
        $http.post('/api/contactus/', $scope.contactusData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            $scope.uploadFiles(res.data);
            $location.path('/thankyou');
          }
        });
      }

      $scope.uploadFiles = function(tempContactusData) {
        var files = $scope.contactusData.images;
        console.log($scope.contactusData.images);
        angular.forEach(files, function(file) {
            file.upload = Upload.upload({
                url: '/api/image/',
                method: 'POST',
                data: { file: file,
                        'parentobjectid': tempContactusData.id,
                        'parentobjectname':  'lead'
                      }
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
        });
      }
});
