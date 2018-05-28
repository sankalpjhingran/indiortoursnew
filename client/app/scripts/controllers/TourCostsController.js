'use strict';

/**
* @ngdoc function
* @name clientApp.controller:Aboutscope
* @description
* # Aboutscope
* Controller of the clientApp
*/
angular.module('clientApp')
.controller('TourCostsController', ['$scope', '$uibModal', '$http', '$location', '$document', '$log', function ($scope, $uibModal, $http, $location, $document, $log) {
$scope.costsMap = new Map();
$scope.msg = {};
var vm = this;

$scope.populatecostsInstance = function(costsId) {
    $scope.tourCosts = $scope.costsMap.get(costsId);
    $scope.tourCosts.tour = $scope.allToursMap.get($scope.tourCosts.tour_id);
    $scope.tourCosts.individualcostsjson = $scope.costsMap.get(costsId).individualcostsjson;
    $scope.myData = $scope.costsMap.get(costsId).individualcostsjson;
    $scope.showForm();
}

// get all costss to be displayed on page load
$scope.loadtourCosts = function() {
  //Get all tours to be searched by typeahead
  $scope.allTours = undefined;
  $scope.allToursMap = new Map();
  $scope.loading = true;
  $http.get('/api/tours/all/')
   .then(
       function(response){
         // success callback
         $scope.allTours = response.data;
         angular.forEach($scope.allTours, function(tour) {
           $scope.allToursMap.set(tour.id, tour);
         });

         // Load all costss to be displayed
         $http.get('/api/tourcosts/all/')
          .then(
              function(response){
                // success callback
                $scope.allcostss = response.data;
                console.log($scope.allcostss);
                // populate costsMap to be used in edit form
                angular.forEach($scope.allcostss, function(costs) {
                  $scope.costsMap.set(costs.id, costs);
                  costs.tourname = $scope.allToursMap.get(costs.tour_id).name;
                });
                $scope.loading = false;
                return $scope.allcostss;
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

$scope.delcosts = function(costsid) {
    console.log(costsid);
    if(costsid && confirm("Are you sure you want to delete this costs?")){
      $http.delete('/api/tourcosts/', {params: {id: costsid}})
       .then(
           function(response){
             // success callback
             console.log('costs deleted...');
             $scope.loadtourCosts();
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
      $scope.tourCosts = null;
      $scope.myData = [];
    }

    $scope.modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'TourCostsController',
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

$scope.createUpdatecosts = function() {
  console.log($scope.myData);
  //Update the costs if costs id is there
  if($scope.tourCosts && $scope.tourCosts.id && $scope.tourCosts.tour) {
    $scope.tourCosts.tour_id = $scope.tourCosts.tour.id;
    $scope.tourCosts.individualcostsjson = $scope.myData;
    $scope.tourCosts.groupcostsjson = null;
    $http.post('/api/tourcosts/update/', $scope.tourCosts).then(function(res, err){
      console.log(res);
      if(res.status == 200){
        //if the request is scuessful, show all costss
        $scope.modalInstance.close();
        $scope.$parent.allcostss = $scope.$parent.loadtourCosts();
      }
    });
  }else {
      //Create costs only if tour id is there
      if($scope.tourCosts && $scope.tourCosts.tour) {
        $scope.tourCosts.tour_id = $scope.tourCosts.tour.id;
        $scope.tourCosts.individualcostsjson = $scope.myData;
        $scope.tourCosts.groupcostsjson = null;
        $http.post('/api/tourcosts/', $scope.tourCosts).then(function(res, err){
          console.log(res);
          if(res.status == 200){
            //if the request is scuessful, show all costss
            $scope.modalInstance.close();
            $scope.$parent.allcostss = $scope.$parent.loadtourCosts();
          }
        });
    }else {
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

  vm.gridOptions = {
    onRegisterApi: function(gridApi) {
    		//set gridApi on scope
    		$scope.gridApi = gridApi;
    		gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
    				$scope.msg.lastCellEdited = 'edited row id:' + rowEntity.id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue ;
    				$scope.$apply();
      });
    },
    data: 'myData',
  };

  //http://plnkr.co/edit/bDFIP66b5it5Q3KHy1LT?p=preview
  vm.addData = function() {
    $scope.myData.push( {
        costcategory: "",
        costitem: "",
        budget: "",
        economy: "",
        elegant: "",
        superior: "",
        luxury: ""
    });
  };

  vm.removeLastRow = function() {
    //if($scope.gridOpts.data.length > 0){
       $scope.myData.splice($scope.myData.length-1, 1);
    //}
  };

  vm.gridOptions.columnDefs = [
    {
      name: 'costcategory', displayName: 'Cost Category', enableCellEdit: true, editableCellTemplate: 'ui-grid/dropdownEditor',
      cellFilter: 'mapCostCategories', editDropdownValueLabel: 'costcategory', editDropdownOptionsArray: [
        { id: 'Normal Cost', costcategory : 'Normal Cost' },
        { id: 'Supplement', costcategory : 'Supplement' },
        { id: 'Additional Service Supplement', costcategory : 'Additional Service Supplement' },
      ]
    },
    { name: 'costitem',  displayName: 'Cost Per Person in INR',
      enableCellEdit: true,         editableCellTemplate: 'ui-grid/dropdownEditor',
      cellFilter: 'mapCostItems', editDropdownValueLabel: 'costitem', editDropdownOptionsArray: [
        { id: 'Minimum 02 Persons', costitem : 'Minimum 02 Persons' },
        { id: 'Single Supplement', costitem : 'Single Supplement' },
        { id: 'Domestic Airfare', costitem : 'Domestic Airfare' },
        { id: 'High Season Supplement', costitem : 'High Season Supplement' },
        { id: 'High Season Supplement 2', costitem : 'High Season Supplement 2' },
        { id: 'Festival Season Supplement', costitem : 'Festival Season Supplement' },
        { id: 'Early Bird Discount', costitem : 'Early Bird Discount' },
        { id: 'Internation Airfare', costitem : 'Internation Airfare' },
        { id: 'Visa Charges', costitem : 'Visa Charges' },
        { id: 'Accompanying Guide', costitem : 'Accompanying Guide' },
        { id: 'Breakfast', costitem : 'Breakfast' },
        { id: 'Half Board', costitem : 'Half Board' },
        { id: 'Full Board', costitem : 'Full Board' },
        { id: 'Extra Nights Arrival City', costitem : 'Extra Nights Arrival City' },
        { id: 'Extra Nights Departure City', costitem : 'Extra Nights Departure City'}
      ]
    },
    { name: 'budget',  displayName: 'Budget',
      enableCellEdit: true
    },
    { name: 'economy',  displayName: 'Economy',
      enableCellEdit: true
    },
    { name: 'superior',  displayName: 'Superior',
      enableCellEdit: true
    },
    { name: 'luxury',  displayName: 'Luxury',
      enableCellEdit: true
    },
 	];
}])

.filter('mapCostItems', function() {
  var genderHash = {
    'Minimum 02 Persons' : 'Minimum 02 Persons',
    'Single Supplement' : 'Single Supplement',
    'Domestic Airfare' : 'Domestic Airfare',
    'High Season Supplement' : 'High Season Supplement',
    'High Season Supplement 2' : 'High Season Supplement 2',
    'Festival Season Supplement' : 'Festival Season Supplement',
    'Early Bird Discount' : 'Early Bird Discount',
    'Internation Airfare' : 'Internation Airfare',
    'Visa Charges' : 'Visa Charges',
    'Accompanying Guide' : 'Accompanying Guide',
    'Breakfast' : 'Breakfast',
    'Half Board' : 'Half Board',
    'Full Board' : 'Full Board',
    'Extra Nights Arrival City' : 'Extra Nights Arrival City',
    'Extra Nights Departure City' : 'Extra Nights Departure City',
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash[input];
    }
  };
})

.filter('mapCostCategories', function() {
  var genderHash = {
    'Normal Cost' : 'Normal Cost',
    'Supplement' : 'Supplement',
    'Additional Service Supplement' : 'Additional Service Supplement',
  };

  return function(input) {
    if (!input){
      return '';
    } else {
      return genderHash[input];
    }
  };
});
