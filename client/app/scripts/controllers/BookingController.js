'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
.controller('BookingController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout, $state, $rootScope, $stateParams) {
  $rootScope.$state = $state;
  var tourId = $stateParams.id;

      var vm = this;
      $scope.max = 5;

      //Model
      vm.currentStep = 1;
      vm.steps = [
        {
          step: 1,
          name: "Passenger Details",
          template: "views/main/form-travellers.html"
        },
        {
          step: 2,
          name: "Tour Info",
          template: "views/main/form-tourdetails.html"
        },
        {
          step: 3,
          name: "Other Details",
          template: "views/main/form-otherdetails.html"
        },
        {
          step: 4,
          name: "Review",
          template: "views/main/form-review.html"
        },
        {
          step: 5,
          name: "Payment",
          template: "views/main/checkout.html"
        },
      ];
      vm.user = {};

      vm.formData = {};
      vm.formData.travellers = [];

      vm.formData.travellers.push(
          {
            firstname: '',
            lastname: '',
            countryandcode: '',
            passport: '',
            phone: '',
            gender: ''
          }
      );

      vm.addTraveller = function() {
        vm.formData.travellers.push(
          {
            firstname: '',
            lastname: '',
            countryandcode: '',
            passportnumber: '',
            phone: '',
          }
        );
      }

      vm.deleteTraveller = function(index) {
        console.log('Calling delete traveller====>');
        console.log(index);
        vm.formData.travellers.splice(index, 1);
        console.log(vm.formData.travellers);
      }

      //Functions
      vm.gotoStep = function(newStep) {
        vm.currentStep = newStep;
        vm.progress();
      }

      vm.getStepTemplate = function(){
        for (var i = 0; i < vm.steps.length; i++) {
              if (vm.currentStep == vm.steps[i].step) {
                  return vm.steps[i].template;
              }
          }
      }

      vm.save = function() {
        console.log(vm.formData);
        if(vm.formData && tourId) {
          vm.formData.tour_id = tourId;
          $http.post('/api/booking/', vm.formData).then(function(res, err){
            console.log(res);
            if(res.status == 200){
              //$scope.modalInstance.close();
              //$scope.$parent.allLocations = $scope.$parent.loadLocationData();
            }
          });
        }
      }

      vm.progress = function(previous, next) {
        console.log('Calling in progress===>');
        var type = 'success';
        $scope.dynamic = vm.currentStep;
      };

      $http.get('/api/countrycodes')
       .then(function(res){
         vm.countrycodes = res.data;
      });
});
