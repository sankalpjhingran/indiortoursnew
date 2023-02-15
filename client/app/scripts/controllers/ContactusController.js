'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ContactusController', function($scope, $uibModal, $http, $location, $stateParams, $document, $log, Upload, $timeout) {
        $scope.showSuccessBanner = false;

        $scope.createLead = function() {
            $scope.contactusData.plannedarrival = moment($scope.contactusData.plannedarrival).toDate();
            $scope.contactusData.relatedtotype = 'General enquiry';
            $http.post('/api/contactus/', $scope.contactusData).then(function(res, err) {
                if (res.status === 200) {
                    $scope.uploadFiles(res.data);
                    $location.path('/thankyou');
                }
            });
        }

        $scope.createEnquiry = function() {
            $scope.contactusData.plannedarrival = moment($scope.contactusData.plannedarrival).toDate();
            $scope.contactusData.relatedtotype = 'Tours';
            $scope.contactusData.relatedtoid = $scope.enquiryTourId + '';
            $http.post('/api/contactus/', $scope.contactusData).then(function(res, err) {
                if (res.status === 200) {
                    $scope.uploadFiles(res.data);
                    $scope.showSuccessBanner = true;
                    setTimeout(function() {
                        $scope.cancel();
                    }, 2000);
                }
            });
        }

        $scope.uploadFiles = function(tempContactusData) {
            const files = $scope.contactusData.images;
            if (files) {
                angular.forEach(files, function(file) {
                    file.upload = Upload.upload({
                        url: '/api/image/',
                        method: 'POST',
                        data: {
                            file: file,
                            'parentobjectid': tempContactusData.id,
                            'parentobjectname': 'lead'
                        }
                    });

                    file.upload.then(function(response) {
                        $timeout(function() {
                            file.result = response.data;
                        });
                    }, function(response) {
                        if (response.status > 0)
                            $scope.errorMsg = response.status + ': ' + response.data;
                    }, function(evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                });
            }
        }
    });