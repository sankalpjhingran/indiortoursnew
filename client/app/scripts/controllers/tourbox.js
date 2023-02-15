'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */

app.directive('tourBox', function() {

    const controller = ['$scope', '$uibModal', function($scope, $uibModal) {

        $scope.showEnquiryForm = function(tourId, tourName, price, days) {
            $scope.enquiryTourId = tourId;
            $scope.tourName = tourName;
            $scope.tourPrice = price;
            $scope.tourDays = days;
            $scope.showForm('myModalContent.html', 'ContactusController');
        };

        $scope.showBookingForm = function(tourId, tourname, price, days) {
            $scope.enquiryTourId = tourId;
            $scope.tourName = tourname;
            $scope.tourPrice = price;
            $scope.tourDays = days;
            $scope.showForm('bookingModal.html', 'ContactusController');
        };

        $scope.showForm = function(htmlfile, controllername) {
            $scope.message = "Show Form Button Clicked";
            $scope.modalInstance = $uibModal.open({
                templateUrl: htmlfile,
                controller: controllername,
                scope: $scope,
                backdrop: 'static',
                size: 'lg',
            });

            $scope.modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {});
        };

        $scope.cancel = function() {
            $scope.modalInstance.dismiss('cancel');
        };

        let _selected;
        $scope.ngModelOptionsSelected = function(value) {
            if (arguments.length) {
                _selected = value;
            } else {
                return _selected;
            }
        };

        $scope.modelOptions = {
            debounce: {
                default: 500,
                blur: 250
            },
            getterSetter: true
        };
    }];

    return {
        scope: {
            tour: '='
        },
        restrict: 'EA',
        templateUrl: 'views/tourbox.tpl.html',
        controller: controller,
        link: function(scope, element, attrs) {}
    };
});
