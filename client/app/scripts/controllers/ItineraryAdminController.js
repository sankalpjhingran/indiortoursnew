'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('ItineraryAdminController', function ($scope, $uibModal, $http, $location, $document, $log) {
$scope.itineraryMap = new Map();
$scope.populateitineraryInstance = function(itineraryId){
    $scope.itineraryData = $scope.itineraryMap.get(itineraryId);
    $scope.itineraryData.tour = $scope.allToursMap.get($scope.itineraryData.tour_id);
    $scope.showForm();
}

// get all itinerarys to be displayed on page load
$scope.loaditineraryData = function(){
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

         // Load all itinerarys to be displayed
         $http.get('/api/itinerary/all/')
          .then(
              function(response){
                // success callback
                $scope.allitinerarys = response.data;

                // populate itineraryMap to be used in edit form
                angular.forEach($scope.allitinerarys, function(itinerary) {
                  $scope.itineraryMap.set(itinerary.id, itinerary);
                  itinerary.tourname = $scope.allToursMap.get(itinerary.tour_id).name;
                });
                return $scope.allitinerarys;
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

$scope.delitinerary = function(itineraryid){
    console.log(itineraryid);
    if(itineraryid && confirm("Are you sure you want to delete this itinerary?")){
      $http.delete('/api/itinerary/', {params: {id: itineraryid}})
       .then(
           function(response){
             // success callback
             console.log('itinerary deleted...');
             $scope.loaditineraryData();
           },
           function(response){
             // failure call back
           }
      );
    }
}

$scope.saveAs = function(){
    $scope.itineraryData.id = null;
    //$scope.cancel();
    $scope.modalInstance.dismiss('cancel');
    $scope.showForm(false);
    console.log('saveAs clicked...');
}

$scope.showForm = function (isNew) {
    $scope.message = "Show Form Button Clicked";
    console.log($scope.message);

    if(isNew){
      $scope.itineraryData = null;
    }

    //open a new modal instance
    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ItineraryAdminController',
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

$scope.createUpdateitinerary = function(){
  // Update the itinerary if itinerary id is there
  if($scope.itineraryData && $scope.itineraryData.id && $scope.itineraryData.tour){
    $scope.itineraryData.tour_id = $scope.itineraryData.tour.id;
    $http.post('/api/itinerary/update/', $scope.itineraryData).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //if the request is scuessful, show all itinerarys
        $scope.modalInstance.close();
        $scope.$parent.allitinerarys = $scope.$parent.loaditineraryData();
      }
    });
  }else{
    // create itinerary only if tour id is there
      if($scope.itineraryData && $scope.itineraryData.tour){
        $scope.itineraryData.tour_id = $scope.itineraryData.tour.id;
        $http.post('/api/itinerary/', $scope.itineraryData).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //if the request is scuessful, show all itinerarys
            $scope.modalInstance.close();
            $scope.$parent.allitinerarys = $scope.$parent.loaditineraryData();
          }
        });
    }else{
        console.log('Error: itinerary Data is invalid or Invalid tour id');
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
    getterSetter: true,
  };
});
