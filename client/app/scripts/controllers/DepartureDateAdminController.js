'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('DepartureDateAdminController', function ($scope, $uibModal, $http, $location, $document, $log) {
$scope.departureDatesMap = new Map();

$scope.populatedepartureDatesInstance = function(departureDatesId){
    $scope.departureDatesData = $scope.departureDatesMap.get(departureDatesId);
    $scope.departureDatesData.tour = $scope.allToursMap.get($scope.departureDatesData.tour_id);
    $scope.showForm();
}

// get all departureDatess to be displayed on page load
$scope.loaddepartureDatesData = function(){
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

         // Load all departureDatess to be displayed
         $http.get('/api/departuredates/all/')
          .then(
              function(response){
                // success callback
                $scope.alldepartureDatess = response.data;

                // populate departureDatesMap to be used in edit form
                angular.forEach($scope.alldepartureDatess, function(departureDates) {
                  $scope.departureDatesMap.set(departureDates.id, departureDates);
                  departureDates.tourname = $scope.allToursMap.get(departureDates.tour_id).name;
                });
                return $scope.alldepartureDatess;
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

$scope.deldepartureDates = function(departureDatesid){
    console.log(departureDatesid);
    if(departureDatesid && confirm("Are you sure you want to delete this departure date?")){
      $http.delete('/api/departuredates/', {params: {id: departureDatesid}})
       .then(
           function(response){
             // success callback
             console.log('departureDates deleted...');
             $scope.loaddepartureDatesData();
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
      $scope.departureDatesData = null;
    }

    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'DepartureDateAdminController',
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

$scope.createUpdatedepartureDates = function(){
  // Update the departureDates if departureDates id is there
  if($scope.departureDatesData && $scope.departureDatesData.id && $scope.departureDatesData.tour){
    $scope.departureDatesData.tour_id = $scope.departureDatesData.tour.id;
    $http.post('/api/departuredates/update/', $scope.departureDatesData).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //if the request is scuessful, show all departureDatess
        $scope.modalInstance.close();
        $scope.$parent.alldepartureDatess = $scope.$parent.loaddepartureDatesData();
      }
    });
  }else{
    // create departureDates only if tour id is there
      if($scope.departureDatesData && $scope.departureDatesData.tour){
        $scope.departureDatesData.tour_id = $scope.departureDatesData.tour.id;
        $http.post('/api/departuredates/', $scope.departureDatesData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //if the request is scuessful, show all departureDatess
            $scope.modalInstance.close();
            $scope.$parent.alldepartureDatess = $scope.$parent.loaddepartureDatesData();
          }
        });
    }else{
        console.log('Error: departureDates Data is invalid or Invalid tour id');
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
