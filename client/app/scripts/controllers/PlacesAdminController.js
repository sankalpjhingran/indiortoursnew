'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('PlacesAdminController', function ($scope, $uibModal, $http, $location, $document, $log) {
$scope.placeMap = new Map();

$scope.populatePlaceInstance = function(placeId){
    console.log('Calling populateLocationInstance===> ' + placeId);
    $scope.placeData = $scope.placeMap.get(placeId);
    $scope.placeData.location = $scope.allLocationsMap.get($scope.placeData.location_id);
    console.log($scope.placeMap);
    console.log($scope.placeData);
    $scope.showForm();
}

$scope.saveNew = function(){
    $scope.createUpdatePlace();
    console.log($scope.placeData.id);
    $scope.populatePlaceInstance($scope.placeData.id);
    console.log($scope.placeData);
    //delete $scope.locationData.id;

}

// get all locations to be displayed on page load
$scope.loadPlacesData = function(){

  $scope.allLocations = undefined;

  //Get all location to be searched by typeahead
  $scope.allLocationsMap = new Map();

  $http.get('/api/location/all/')
   .then(
       function(response){
         // success callback
         $scope.allLocations = response.data;
         angular.forEach($scope.allLocations, function(location) {
           $scope.allLocationsMap.set(location.id, location);
         });
         console.log('allLocations====>');
         console.log($scope.allLocations);

         // Load all places to be displayed
         $http.get('/api/places/all/')
          .then(
              function(response){
                // success callback
                $scope.allPlaces = response.data;
                console.log($scope.allPlaces);
                //populate locationMap to be used in edit form
                angular.forEach($scope.allPlaces, function(place) {
                  $scope.placeMap.set(place.id, place);
                  place.locationcity = $scope.allLocationsMap.get(place.location_id).city;
                });
                return $scope.allPlaces;
              },
              function(response){
                // failure call back
              }
           );
         return $scope.allLocations;
       },
       function(response){
         // failure call back
       }
    );
}

$scope.delPlace = function(placeid){
    console.log(placeid);
    if(placeid && confirm("Are you sure you want to delete this place?")){
      $http.delete('/api/places/', {params: {id: placeid}})
       .then(
           function(response){
             // success callback
             console.log('Place deleted...');
             $scope.loadPlacesData();
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
      $scope.placeData = null;
    }
    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'PlacesAdminController',
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

$scope.createUpdatePlace = function(){
  // Update the location if location id is there
  if($scope.placeData && $scope.placeData.id && $scope.placeData.location){
    $scope.placeData.location_id = $scope.placeData.location.id;
    $http.post('/api/places/update/', $scope.placeData).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //if the request is scuessful, show all locations
        $scope.modalInstance.close();
        $scope.$parent.allPlaces = $scope.$parent.loadPlacesData();
      }
    });
  }else{
      if($scope.placeData && $scope.placeData.location){
        console.log('Calling place insert===>');
        $scope.placeData.location_id = $scope.placeData.location.id;
        $http.post('/api/places/', $scope.placeData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //if the request is successful, show all locations
            $scope.modalInstance.close();
            $scope.$parent.allPlaces = $scope.$parent.loadPlacesData();
          }
        });
    }else{
        console.log('Error: Place Data is invalid');
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
