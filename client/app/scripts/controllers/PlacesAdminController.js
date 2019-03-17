'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('PlacesAdminController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
$scope.placeMap = new Map();

$scope.uploadFiles = function(tempPlace) {
  var files = $scope.placeData.images;
  console.log($scope.placeData.images);
  angular.forEach(files, function(file) {
      file.upload = Upload.upload({
          url: '/api/image/',
          method: 'POST',
          data: { file: file,
                  'parentobjectid': tempPlace.id,
                  'parentobjectname':  'place'
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

$scope.deleteFile = function(idx) {
     console.log(idx);
     var file = $scope.placeData.images[idx];
     console.log(file);
     if (file) {
        $scope.placeData.images.splice(idx, 1);
    }
}

$scope.deleteUploadedFile = function(idx) {
     console.log($scope.placeData.newImages[0]);

     var file = $scope.placeData.newImages[idx];
     console.log(file);
     if (file && file.id) {
          $http.delete('/api/image/', {params: {id: file.id}}).then(function(response){
               if (response.status == 200) {
                    $scope.placeData.newImages.splice(idx, 1);
               }
         });
      }
}

$scope.populatePlaceInstance = function(placeId){
    console.log('Calling populateLocationInstance===> ' + placeId);
    $scope.placeData = $scope.placeMap.get(placeId);
    $scope.placeData.location = $scope.allLocationsMap.get($scope.placeData.location_id);
    console.log($scope.placeMap);
    console.log($scope.placeData);

    $scope.placeData.newImages = [];
    var tourids = [];
    tourids.push(placeId);
    $http.post('/api/image/all', { tourids:tourids , parentobjectname: 'place'})
     .then(function(response){
          if(response.data.length){
              angular.forEach(response.data, function(image){
                    console.log(image);
                    $scope.placeData.newImages.push(image);
              });
          }
     });
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

  $scope.loading = true;

  $http.get('/api/location/adminLocations/')
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
                $scope.loading = false;
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
        backdrop: 'static',
        size: 'lg',
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
        //Upload images
        $scope.uploadFiles($scope.placeData);

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
            //Upload Images
            $scope.uploadFiles(res.data);

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
