'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('ImagesAdminController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
$scope.imageMap = new Map();

$scope.deleteFile = function(idx) {
     console.log(idx);
     var file = $scope.imageData.images[idx];
     console.log(file);
     if (file) {
        $scope.imageData.images.splice(idx, 1);
    }
}

$scope.deleteUploadedFile = function(idx) {
     console.log($scope.imageData.newImages[0]);

     var file = $scope.imageData.newImages[idx];
     console.log(file);
     if (file && file.id) {
          $http.delete('/api/image/', {params: {id: file.id}}).then(function(response){
               if (response.status == 200) {
                    $scope.imageData.newImages.splice(idx, 1);
               }
         });
      }
}

/*
$scope.populatePlaceInstance = function(placeId){
    console.log('Calling populateLocationInstance===> ' + placeId);
    $scope.imageData = $scope.imageMap.get(placeId);
    //$scope.imageData.location = $scope.allLocationsMap.get($scope.imageData.location_id);
    console.log($scope.imageMap);
    console.log($scope.imageData);
    $scope.showForm();
}
$scope.saveNew = function(){
    $scope.createUpdatePlace();
    console.log($scope.imageData.id);
    $scope.populatePlaceInstance($scope.imageData.id);
    console.log($scope.imageData);
    //delete $scope.locationData.id;
}
*/

// get all locations to be displayed on page load
$scope.loadImagesData = function(){
  $scope.allImages = undefined;
  //Get all location to be searched by typeahead
  $scope.allImagesMap = new Map();
  $scope.loading = true;

  $http.get('/api/image/allImages/')
   .then(
       function(response){
         // success callback
         $scope.allImages = response.data;
         angular.forEach($scope.allImages, function(image) {
           $scope.allImagesMap.set(image.id, image);
         });
         console.log('allImages====>');
         console.log($scope.allImages);
         $scope.loading = false;
         return $scope.allImages;
       },
       function(response){
         // failure call back
       }
    );
}


/*Calling this only deletes the db entry for image,
*the image still remains on filesystem
*/
$scope.delImage = function(imageid){
    console.log(imageid);
    if(imageid && confirm("Are you sure you want to delete this image?")){
      $http.delete('/api/image/', {params: {id: imageid}})
       .then(
           function(response){
             // success callback
             console.log('Image deleted...');
             $scope.loadImagesData();
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
      $scope.imageData = null;
    }
    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ImagesAdminController',
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

$scope.uploadFiles = function(tempLocation) {
  var files = $scope.imageData.images;
  console.log($scope.imageData.images);
  angular.forEach(files, function(file) {
      file.upload = Upload.upload({
          url: '/api/image/',
          method: 'POST',
          data: { file: file,
                  'parentobjectname': $scope.imageData.parentobjectname,
                  'description': $scope.imageData.description
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

$scope.createUpdateImage = function(){
  // Update the location if location id is there
  if($scope.imageData && $scope.imageData.id && $scope.imageData.location){
    $scope.imageData.location_id = $scope.imageData.location.id;
    $http.post('/api/image/update/', $scope.imageData).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //if the request is scuessful, show all locations
        $scope.modalInstance.close();
        $scope.$parent.allImages = $scope.$parent.loadImagesData();
      }
    });
  }else{
      if($scope.imageData && $scope.imageData.images){
            $scope.uploadFiles($scope.imageData);
            $scope.modalInstance.close();
            $scope.$parent.allImages = $scope.$parent.loadImagesData();
    }else{
        console.log('Error: Image Data is invalid');
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
