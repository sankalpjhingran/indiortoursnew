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

if($scope.allImages) {
    $scope.totalItems = $scope.allImages.length;
}

$scope.currentPage = 1;
$scope.itemsPerPage = 25;
$scope.maxSize=10;

$scope.$watch("currentPage", function() {
  $scope.pageChanged($scope.currentPage);
});

$scope.pageChanged = function(page) {
  var pagedData = [];
  if($scope.allImages) {
    pagedData = $scope.allImages.slice(
      (page - 1) * $scope.itemsPerPage,
      page * $scope.itemsPerPage
    );
  }
  $scope.aImages = pagedData;
}


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


$scope.populateImageInstance = function(imageId){
    console.log('Calling populateLocationInstance===> ' + imageId);
    $scope.imageData = $scope.allImagesMap.get(imageId);
    console.log($scope.imageData);
    $scope.showForm();
}

/*
$scope.saveNew = function(){
    $scope.createUpdatePlace();
    console.log($scope.imageData.id);
    $scope.populatePlaceInstance($scope.imageData.id);
    console.log($scope.imageData);
    //delete $scope.locationData.id;
}
*/

$scope.searchBackend = false;
$scope.filterData = function() {
      if($scope.searchBackend) {
          console.log('Calling filter data...');
          // populate $scope.allImages = response.data; here

          $http.get('/api/image/search/', {params: {searchterm: $scope.search}})
           .then(
               function(response){
                 console.log(response.data);
                 // success callback
                 $scope.allImages = response.data;
                 angular.forEach($scope.allImages, function(image) {
                   $scope.allImagesMap.set(image.id, image);
                 });

                 $scope.totalItems = $scope.allImages.length;
                 $scope.currentPage = 1;
                 $scope.pageChanged();

                 var pagedData = [];
                 if($scope.allImages) {
                   pagedData = $scope.allImages.slice(0,$scope.itemsPerPage);
                 }
                 $scope.aImages = pagedData;
               },
               function(response){
                 // failure call back
               }
            );
      } else {
          console.log('searching client side only...');
      }
}

// get all locations to be displayed on page load
$scope.loadImagesData = function(){
  $scope.allImages = undefined;
  //Get all location to be searched by typeahead
  $scope.allImagesMap = new Map();
  $scope.loading = true;

  $http.get('/api/image/allImages/')
   .then(
       function(response){
         console.log(response.data);
         // success callback
         $scope.allImages = response.data;
         angular.forEach($scope.allImages, function(image) {
           $scope.allImagesMap.set(image.id, image);
         });

         $scope.totalItems = $scope.allImages.length;
         $scope.currentPage = 1;
         $scope.pageChanged();

         var pagedData = [];
         if($scope.allImages) {
           pagedData = $scope.allImages.slice(0,$scope.itemsPerPage);
         }
         $scope.aImages = pagedData;
         $scope.loading = false;
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
    if(imageid && confirm("Deleting this will also delete the file from the filesystem. Are you sure you want to delete this image?")){
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

$scope.uploadFiles = function() {
  var files = $scope.imageData.images;
  var fd = new FormData();
  for( var i =0; i< files.length ; i++ ){
      fd.append('file' , files[i] );
  }
  fd.append('parentobjectid', $scope.imageData.parentobjectid);              
  fd.append('parentobjectname', $scope.imageData.parentobjectname);
  fd.append('description', $scope.imageData.description);
  
  $http.post( '/api/image/', fd, {
    transformRequest: angular.identity,
    headers: {'Content-Type': undefined }
  }).then(function (response) {
      $timeout(function () {
          //file.result = response.data;
      });
  }, function (response) {
      if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
  }, function (evt) {
      //file.progress = Math.min(100, parseInt(100.0 *
        //                        evt.loaded / evt.total));
  });
}

$scope.createUpdateImage = function(){
  // Update the location if location id is there
  console.log($scope.imageData);
  if($scope.imageData && $scope.imageData.id){
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
        $scope.uploadFiles();
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
