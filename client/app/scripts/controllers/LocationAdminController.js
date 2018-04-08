'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('LocationAdminController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
$scope.locationMap = new Map();

$scope.uploadFiles = function(tempLocation) {
  var files = $scope.locationData.images;
  console.log($scope.locationData.images);
  angular.forEach(files, function(file) {
      file.upload = Upload.upload({
          url: '/api/image/',
          method: 'POST',
          data: { file: file,
                  'parentobjectid': tempLocation.id,
                  'parentobjectname':  'location'
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
     var file = $scope.locationData.images[idx];
     console.log(file);
     if (file) {
        $scope.locationData.images.splice(idx, 1);
    }
}

$scope.deleteUploadedFile = function(idx) {
     console.log($scope.locationData.newImages[0]);

     var file = $scope.locationData.newImages[idx];
     console.log(file);
     if (file && file.id) {
          $http.delete('/api/image/', {params: {id: file.id}}).then(function(response){
               if (response.status == 200) {
                    $scope.locationData.newImages.splice(idx, 1);
               }
         });
      }
}

$scope.populateLocationInstance = function(locationId){
    console.log('Calling populateLocationInstance===> ' + locationId);
    $scope.locationData = $scope.locationMap.get(locationId);
    console.log($scope.locationMap);
    console.log($scope.locationData);
    $scope.locationData.newImages = [];
    var tourids = [];
    tourids.push(locationId);
    $http.post('/api/image/all', { tourids:tourids , parentobjectname: 'location'})
     .then(function(response){
          if(response.data.length){
              angular.forEach(response.data, function(image){
                    console.log(image);
                    $scope.locationData.newImages.push(image);
              });
          }
     });
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
          console.log($scope.allLocations);
          return $scope.allLocations;
        },
        function(response){
          // failure call back
        }
     );
   $http.get('/api/places/all/')
     .then(function(places){
       $scope.allPlaces = places.data;
     });
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

$scope.createUpdateLocation = function(){
  // Update the location if location id is there
  if($scope.locationData && $scope.locationData.id){
    console.log($scope.locationData);
    $http.post('/api/location/update/', $scope.locationData).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //Upload Images
        $scope.uploadFiles($scope.locationData);

        //if the request is scuessful, show all locations
        $scope.modalInstance.close();
        $scope.$parent.allLocations = $scope.$parent.loadLocationData();
      }
    });
  }else{
    // create location only if tour id is there
      if($scope.locationData){
        console.log($scope.locationData);
        $http.post('/api/location/', $scope.locationData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //Upload Images
            $scope.uploadFiles(res.data);

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
})

.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];
    if (angular.isArray(items)) {
      var keys = Object.keys(props);

      items.forEach(function(item) {
        var itemMatches = false;

        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }
    return out;
  };
});
