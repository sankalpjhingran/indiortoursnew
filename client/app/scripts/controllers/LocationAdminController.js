'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('LocationAdminController', function ($scope, $uibModal, $http, $location, $document, $log) {
$scope.locationMap = new Map();

$scope.populateLocationInstance = function(locationId){
    console.log('Calling populateLocationInstance===> ' + locationId);
    $scope.locationData = $scope.locationMap.get(locationId);
    console.log($scope.locationMap);
    console.log($scope.locationData);
    $scope.showForm();
}

$scope.saveNew = function(){
    $scope.createUpdateLocation();
    console.log($scope.locationData.id);
    $scope.populateLocationInstance($scope.locationData.id);
    console.log($scope.locationData);
    //delete $scope.locationData.id;

}

// get all locations to be displayed on page load
$scope.loadLocationData = function(){
  //Get all tours to be searched by typeahead

   // Load all locations to be displayed
   $http.get('/api/location/all/')
    .then(
        function(response){
          // success callback
          $scope.allLocations = response.data;

          $scope.locationMap = new Map();
          //populate locationMap to be used in edit form
          angular.forEach($scope.allLocations, function(location) {
            $scope.locationMap.set(location.id, location);
          });
          return $scope.allLocations;
        },
        function(response){
          // failure call back
        }
     );
}

$scope.delLocation = function(locationid){
    console.log(locationid);
    if(locationid && confirm("Are you sure you want to delete this location?")){
      $http.delete('/api/location/', {params: {id: locationid}})
       .then(
           function(response){
             // success callback
             console.log('Location deleted...');
             $scope.loadLocationData();
           },
           function(response){
             // failure call back
           }
      );
    }
}

$scope.showForm = function(isNew) {
    $scope.message = "Show Form Button Clicked";
    console.log($scope.message);

    if(isNew){
      $scope.locationData = null;
    }
    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'LocationAdminController',
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

$scope.createUpdateLocation = function(){
  // Update the location if location id is there
  if($scope.locationData && $scope.locationData.id){
    $http.post('/api/location/update/', $scope.locationData).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //if the request is scuessful, show all locations
        $scope.modalInstance.close();
        $scope.$parent.allLocations = $scope.$parent.loadLocationData();
      }
    });
  }else{
    // create location only if tour id is there
      if($scope.locationData){
        $http.post('/api/location/', $scope.locationData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //if the request is scuessful, show all locations
            $scope.modalInstance.close();
            $scope.$parent.allLocations = $scope.$parent.loadLocationData();
          }
        });
    }else{
        console.log('Error: Location Data is invalid');
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
