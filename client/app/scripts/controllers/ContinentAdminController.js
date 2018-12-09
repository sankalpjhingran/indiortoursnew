'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('ContinentAdminController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
$scope.locationMap = new Map();

$scope.uploadFiles = function(continent) {
  var files = $scope.continentData.images;
  console.log($scope.continentData.images);
  angular.forEach(files, function(file) {
      file.upload = Upload.upload({
          url: '/api/image/',
          method: 'POST',
          data: { file: file,
                  'parentobjectid': continent.id,
                  'parentobjectname':  'continent'
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
     var file = $scope.continentData.images[idx];
     console.log(file);
     if (file) {
        $scope.continentData.images.splice(idx, 1);
    }
}

$scope.deleteUploadedFile = function(idx) {
     console.log($scope.continentData.newImages[0]);

     var file = $scope.continentData.newImages[idx];
     console.log(file);
     if (file && file.id) {
          $http.delete('/api/image/', {params: {id: file.id}}).then(function(response){
               if (response.status == 200) {
                    $scope.continentData.newImages.splice(idx, 1);
               }
         });
      }
}

$scope.populateContinentInstance = function(continentId){
    console.log('Calling populateContinentInstance===> ' + continentId);
    $scope.continentData = $scope.continentMap.get(continentId);
    console.log($scope.locationMap);
    console.log($scope.continentData);
    $scope.continentData.newImages = [];
    var tourids = [];
    tourids.push(continentId);
    $http.post('/api/image/all', { tourids:tourids , parentobjectname: 'continent'})
     .then(function(response){
          if(response.data.length){
              angular.forEach(response.data, function(image){
                    console.log(image);
                    $scope.continentData.newImages.push(image);
              });
          }
     });
    console.log($scope.continentData);
    $scope.showForm();
}

$scope.saveNew = function(){
    $scope.createUpdateContinent();
    console.log($scope.continentData.id);
    $scope.populateLocationInstance($scope.continentData.id);
    console.log($scope.continentData);
    //delete $scope.continentData.id;

}

// get all locations to be displayed on page load
$scope.loadcontinentData = function(){
  //Get all tours to be searched by typeahead

  $scope.loading = true;
  // Load all locations to be displayed
  $http.get('/api/continent/allIndex/')
    .then(
        function(response){
          // success callback
          $scope.allContinents = response.data;

          $scope.continentMap = new Map();
          //populate locationMap to be used in edit form
          angular.forEach($scope.allContinents, function(continent) {
            $scope.continentMap.set(continent.id, continent);
          });
          console.log($scope.allContinents);
          $scope.loading = false;
          return $scope.allContinents;
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

$scope.delContinent = function(continentId){
    console.log(continentId);
    if(continentId && confirm("Are you sure you want to delete this continent?")){
      $http.delete('/api/continent/', {params: {id: continentId}})
       .then(
           function(response){
             // success callback
             console.log('Continent deleted...');
             $scope.loadcontinentData();
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
      $scope.continentData = null;
    }
    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ContinentAdminController',
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

$scope.createUpdateContinent = function(){
  // Update the location if location id is there
  if($scope.continentData && $scope.continentData.id){
    console.log($scope.continentData);
    $http.post('/api/continent/update/', $scope.continentData).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //Upload Images
        $scope.uploadFiles($scope.continentData);

        //if the request is scuessful, show all locations
        $scope.modalInstance.close();
        $scope.$parent.allContinents = $scope.$parent.loadcontinentData();
      }
    });
  }else{
    // create location only if tour id is there
      if($scope.continentData){
        console.log($scope.continentData);
        $http.post('/api/continent/', $scope.continentData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //Upload Images
            $scope.uploadFiles(res.data);

            //if the request is scuessful, show all locations
            $scope.modalInstance.close();
            $scope.$parent.allContinents = $scope.$parent.loadcontinentData();
          }
        });
    }else{
        console.log('Error: Continent data is invalid');
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
