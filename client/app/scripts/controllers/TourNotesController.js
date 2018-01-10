'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('TourNotesController', function ($scope, $uibModal, $http, $location, $document, $log) {
$scope.notesMap = new Map();

$scope.populateNotesInstance = function(noteId){
    $scope.tourNotes = $scope.notesMap.get(noteId);
    $scope.tourNotes.tour = $scope.allToursMap.get($scope.tourNotes.tour_id);
    $scope.showForm();
}

// get all costss to be displayed on page load
$scope.loadtourNotes = function(){
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

         // Load all costss to be displayed
         $http.get('/api/tournotes/all/')
          .then(
              function(response){
                // success callback
                $scope.allNotes = response.data;

                // populate noteMap to be used in edit form
                angular.forEach($scope.allNotes, function(note) {
                  $scope.notesMap.set(note.id, note);
                  //note.tourname = $scope.allToursMap.get(note.tour_id).name;
                });
                return $scope.allNotes;
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

$scope.delNotes = function(noteid){
    console.log(noteid);
    if(noteid && confirm("Are you sure you want to delete this note?")){
      $http.delete('/api/tournotes/', {params: {id: noteid}})
       .then(
           function(response){
             // success callback
             console.log('Note deleted...');
             $scope.loadtourNotes();
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
      $scope.tourNotes = null;
    }

    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'TourNotesController',
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

$scope.createUpdatecosts = function(){
  // Update the costs if costs id is there
  if($scope.tourNotes && $scope.tourNotes.id){
    $http.post('/api/tournotes/update/', $scope.tourNotes).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //if the request is scuessful, show all costss
        $scope.modalInstance.close();
        $scope.$parent.allNotes = $scope.$parent.loadtourNotes();
      }
    });
  }else{
    // create costs only if tour id is there
      if($scope.tourNotes){
        $http.post('/api/tournotes/', $scope.tourNotes).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //if the request is scuessful, show all costss
            $scope.modalInstance.close();
            $scope.$parent.allNotes = $scope.$parent.loadtourNotes();
          }
        });
    }else{
        console.log('Error: costs Data is invalid or Invalid tour id');
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
