'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('CountryAdminController', function ($scope, $uibModal, $http, $location, $document, $log, Upload, $timeout) {
$scope.locationMap = new Map();

$scope.uploadFiles = function(tempLocation) {
  var files = $scope.countryData.images;
  console.log($scope.countryData.images);
  angular.forEach(files, function(file) {
      file.upload = Upload.upload({
          url: '/api/image/',
          method: 'POST',
          data: { file: file,
                  'parentobjectid': tempLocation.id,
                  'parentobjectname':  'country'
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
     var file = $scope.countryData.images[idx];
     console.log(file);
     if (file) {
        $scope.countryData.images.splice(idx, 1);
    }
}

$scope.deleteUploadedFile = function(idx) {
     console.log($scope.countryData.newImages[0]);

     var file = $scope.countryData.newImages[idx];
     console.log(file);
     if (file && file.id) {
          $http.delete('/api/image/', {params: {id: file.id}}).then(function(response){
               if (response.status == 200) {
                    $scope.countryData.newImages.splice(idx, 1);
               }
         });
      }
}

$scope.populateCountryInstance = function(locationId){
    console.log('Calling populateCountryInstance===> ' + locationId);
    $scope.countryData = $scope.locationMap.get(locationId);
    console.log($scope.locationMap);
    console.log($scope.countryData);
    $scope.countryData.newImages = [];
    var tourids = [];
    tourids.push(locationId);
    $http.post('/api/image/all', { tourids:tourids , parentobjectname: 'country'})
     .then(function(response){
          if(response.data.length){
              angular.forEach(response.data, function(image){
                    console.log(image);
                    $scope.countryData.newImages.push(image);
              });
          }
     });
    console.log($scope.countryData);
    $scope.showForm();
}

$scope.saveNew = function(){
    $scope.createUpdateLocation();
    console.log($scope.countryData.id);
    $scope.populateLocationInstance($scope.countryData.id);
    console.log($scope.countryData);
    //delete $scope.countryData.id;

}

// get all locations to be displayed on page load
$scope.loadcountryData = function(){
  //Get all tours to be searched by typeahead

  $scope.loading = true;
  // Load all locations to be displayed
  $http.get('/api/country/all/')
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
          $scope.loading = false;
          return $scope.allLocations;
        },
        function(response){
          // failure call back
        }
     );

  $http.get('/api/continent/all/')
    .then(
        function(response){
          // success callback
          $scope.allContinents = response.data;

          $scope.continentsMap = new Map();
          //populate locationMap to be used in edit form
          angular.forEach($scope.allContinents, function(continent) {
            $scope.continentsMap.set(continent.id, continent);
          });
          console.log($scope.allContinents);
          $scope.loading = false;
          return $scope.allContinents;
        },
        function(response){
          // failure call back
        }
     );
}

$scope.delCountry = function(locationid) {
    console.log(locationid);
    if(locationid && confirm("Are you sure you want to delete this location?")){
      $http.delete('/api/country/', {params: {id: locationid}})
       .then(
           function(response){
             // success callback
             console.log('Location deleted...');
             $scope.loadcountryData();
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
      $scope.countryData = null;
    }
    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'CountryAdminController',
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

$scope.createUpdateCountry = function(){
  // Update the location if location id is there
  if($scope.countryData && $scope.countryData.id && $scope.countryData.continent){
    //$scope.countryData.continent_id = $scope.countryData.continent.id;
    $scope.countryData.continent = $scope.countryData.continent.name;
    console.log($scope.countryData);
    $http.post('/api/country/update/', $scope.countryData).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //Upload Images
        $scope.uploadFiles($scope.countryData);

        //if the request is scuessful, show all locations
        $scope.modalInstance.close();
        $scope.$parent.allLocations = $scope.$parent.loadcountryData();
      }
    });
  }else{
    // create location only if tour id is there
      if($scope.countryData && $scope.countryData.continent){
        console.log($scope.countryData);

        $scope.countryData.continent_id = $scope.countryData.continent.id;
        $scope.countryData.continent = $scope.countryData.continent.name;

        console.log($scope.countryData);
        $http.post('/api/country/', $scope.countryData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //Upload Images
            $scope.uploadFiles(res.data);

            //if the request is scuessful, show all locations
            $scope.modalInstance.close();
            $scope.$parent.allLocations = $scope.$parent.loadcountryData();
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
