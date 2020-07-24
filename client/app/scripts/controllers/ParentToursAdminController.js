'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('ParentToursAdminController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
$scope.toursMap = new Map();

$scope.sortType     = 'name'; // set the default sort type
$scope.sortReverse  = false;  // set the default sort order

$scope.sort = function(keyname){
    $scope.sortType = keyname;   //set the sortKey to the param passed
    $scope.sortReverse = !$scope.sortReverse; //if true make it false and vice versa
}

$scope.populateParentToursInstance = function(parenttourId){
    $scope.parentTourData = $scope.parentToursMap.get(parenttourId);
    $scope.parentTourData.tours = $scope.parentTourData.childTours;
    $scope.parentTourData.newImages = [];
    var tourids = [];
    tourids.push(parenttourId);
    $http.post('/api/image/all', { tourids:tourids , parentobjectname: 'parenttour'})
     .then(function(response){
          if(response.data.length){
              angular.forEach(response.data, function(image){
                    console.log(image);
                    $scope.parentTourData.newImages.push(image);
              });
          }
     });
    console.log($scope.parentTourData);
    $scope.showForm();
}

$scope.deleteFile = function(idx) {
     console.log(idx);
     var file = $scope.parentTourData.images[idx];
     console.log(file);
     if (file) {
        $scope.parentTourData.images.splice(idx, 1);
    }
}

$scope.deleteUploadedFile = function(idx) {
     console.log($scope.parentTourData.newImages[0]);

     var file = $scope.parentTourData.newImages[idx];
     console.log(file);
     if (file && file.id) {
          $http.delete('/api/image/', {params: {id: file.id}}).then(function(response){
               if (response.status == 200) {
                    $scope.parentTourData.newImages.splice(idx, 1);
               }
         });
      }
}

//Upload images
$scope.uploadFiles = function(tempTour) {
  var files = $scope.parentTourData.images;

  var fd = new FormData();
  for( var i =0; i< files.length ; i++ ){
      fd.append('file' , files[i] );
  }
  fd.append('parentobjectid', tempTour.id );              
  fd.append('parentobjectname', 'parenttour');
  
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

// get all tourss to be displayed on page load
$scope.loadParentToursData = function(){
  $scope.allParentTours = undefined;
  $scope.parentToursMap = new Map();
  $scope.loading = true;

  $scope.allTours = undefined;
  $http.get('/api/tours/all/')
    .then(function(tours){
      $scope.allTours = tours.data;
    });

  //Load all tourss to be displayed
  $http.get('/api/parenttours/all/')
    .then(
        function(responseParentTours){
          $scope.allParentTours = responseParentTours.data;
          // populate toursMap to be used in edit form
          angular.forEach($scope.allParentTours, function(pt) {
            $scope.parentToursMap.set(pt.id, pt);
          });
          $scope.loading = false;
        },
        function(response){
          // failure call back
        }
    );


}

$scope.delparenttours = function(parenttourid){
    console.log(parenttourid);
    if(parenttourid && confirm("Are you sure you want to delete this parent tour?")){
      $http.delete('/api/parenttours/', {params: {id: parenttourid}})
       .then(
           function(response){
             // success callback
             console.log('parent tour deleted...');
             $scope.loadParentToursData();
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
      $scope.parentTourData = null;
    }

    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ParentToursAdminController',
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

$scope.createUpdateParentTour = function() {
  // Update the tours if tours id is there
  if($scope.parentTourData && $scope.parentTourData.id){
    console.log($scope.parentTourData);
    $http.post('/api/parenttours/update/', $scope.parentTourData).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        $scope.uploadFiles($scope.parentTourData);

        //if the request is scuessful, show all tourss
        $scope.modalInstance.close();
        $scope.$parent.allParentTours = $scope.$parent.loadParentToursData();
      }
    });
  }else{
    // create tours only if tour id is there
    if($scope.parentTourData){
        console.log($scope.parentTourData.tours);
        $http.post('/api/parenttours/', $scope.parentTourData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            // upload image files
            $scope.uploadFiles(res.data);

            //if the request is scuessful, show all tourss
            $scope.modalInstance.close();
            $scope.$parent.allParentTours = $scope.$parent.loadParentToursData();
          }
        })
    }else{
        console.log('Error: tours Data is invalid or Invalid tour id');
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
          if (item[prop] && item[prop].toString().toLowerCase().indexOf(text) !== -1) {
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
