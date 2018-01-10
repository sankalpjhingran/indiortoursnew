'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('TourCostsController', function ($scope, $uibModal, $http, $location, $document, $log) {
$scope.costsMap = new Map();

$scope.populatecostsInstance = function(costsId){
    $scope.tourCosts = $scope.costsMap.get(costsId);
    $scope.tourCosts.tour = $scope.allToursMap.get($scope.tourCosts.tour_id);
    $scope.showForm();
}

// get all costss to be displayed on page load
$scope.loadtourCosts = function(){
  //Get all tours to be searched by typeahead
  $scope.allTours = undefined;
  $scope.allToursMap = new Map();
  $http.get('/api/tours/all/')
   .then(
       function(response){
         // success callback
         $scope.allTours = response.data;
         angular.forEach($scope.allTours, function(tour) {
           $scope.allToursMap.set(tour.id, tour);
         });

         // Load all costss to be displayed
         $http.get('/api/tourcosts/all/')
          .then(
              function(response){
                // success callback
                $scope.allcostss = response.data;

                // populate costsMap to be used in edit form
                angular.forEach($scope.allcostss, function(costs) {
                  $scope.costsMap.set(costs.id, costs);
                  costs.tourname = $scope.allToursMap.get(costs.tour_id).name;
                });
                return $scope.allcostss;
              },
              function(response){
                // failure call back
              }
           );
       },
       function(response){
         // failure call back
       }
  );
}

$scope.delcosts = function(costsid){
    console.log(costsid);
    if(costsid && confirm("Are you sure you want to delete this costs?")){
      $http.delete('/api/tourcosts/', {params: {id: costsid}})
       .then(
           function(response){
             // success callback
             console.log('costs deleted...');
             $scope.loadtourCosts();
           },
           function(response){
             // failure call back
           }
      );
    }
}

$scope.showForm = function (isNew) {
    $scope.message = "Show Form Button Clicked";
    console.log($scope.message);

    if(isNew){
      $scope.tourCosts = null;
    }

    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'TourCostsController',
        scope: $scope,
        resolve: {
            userForm: function () {
                return $scope.userForm;
            }
        }
    });

    $scope.modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });
};

$scope.cancel = function () {
    $scope.modalInstance.dismiss('cancel');
};

$scope.createUpdatecosts = function(){
  // Update the costs if costs id is there
  if($scope.tourCosts && $scope.tourCosts.id && $scope.tourCosts.tour){
    $scope.tourCosts.tour_id = $scope.tourCosts.tour.id;
    if(!$scope.tourCosts.additionalservicesupplement){
        $scope.tourCosts.additionalservicesupplement = false;
    }
    $http.post('/api/tourcosts/update/', $scope.tourCosts).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //if the request is scuessful, show all costss
        $scope.modalInstance.close();
        $scope.$parent.allcostss = $scope.$parent.loadtourCosts();
      }
    });
  }else{
    // create costs only if tour id is there
      if($scope.tourCosts && $scope.tourCosts.tour){
        $scope.tourCosts.tour_id = $scope.tourCosts.tour.id;
        if(!$scope.tourCosts.additionalservicesupplement){
            $scope.tourCosts.additionalservicesupplement = false;
        }
        $http.post('/api/tourcosts/', $scope.tourCosts).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //if the request is scuessful, show all costss
            $scope.modalInstance.close();
            $scope.$parent.allcostss = $scope.$parent.loadtourCosts();
          }
        });
    }else{
        console.log('Error: costs Data is invalid or Invalid tour id');
    }
  }
}

var _selected;
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
});
