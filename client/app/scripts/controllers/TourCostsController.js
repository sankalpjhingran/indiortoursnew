'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:Aboutscope
 * @description
 * # Aboutscope
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('TourCostsController', ['$scope', '$uibModal', '$http', '$location', '$document', '$log', function($scope, $uibModal, $http, $location, $document, $log) {
        $scope.costsMap = new Map();
        $scope.msg = {};
        const vm = this;

        $scope.initGrid = function(gridOptions, tourtype) {
            if (tourtype === 'Regular') {
                gridOptions.data = $scope.newIndividualCostjsonforRegular;
            } else if (tourtype === 'Group') {
                gridOptions.data = $scope.newIndividualCostjsonforGroup;
            }

            gridOptions.onRegisterApi = function(gridApi) {
                gridApi = gridApi;
            }

            gridOptions.enableRowSelection = false,
                gridOptions.enableSelectAll = false,
                gridOptions.enableCellEditOnFocus = true;
            gridOptions.enableColumnResizing = false;
            gridOptions.editableOnFocus = true;

            gridOptions.columnDefs = [{
                    name: 'id',
                    enableCellEdit: false,
                    visible: false
                },
                {
                    name: 'costcategory',
                    visible: false
                },
                {
                    name: 'costitem',
                    displayName: 'Cost Category',
                    width: 300,
                    enableCellEdit: false
                },
                {
                    name: 'budget',
                    displayName: 'Budget',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
                {
                    name: 'economy',
                    displayName: 'Economy',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
                {
                    name: 'elegant',
                    displayName: 'Elegant',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
                {
                    name: 'deluxe',
                    displayName: 'Deluxe',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
                {
                    name: 'luxury',
                    displayName: 'Luxury',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
            ];
        }

        $scope.addRow = function(tourtype) {
            let gridData = [];
            if (tourtype === 'Regular') {
                gridData = $scope.newIndividualCostjsonforRegular;
            } else if (tourtype === 'Group') {
                gridData = $scope.newIndividualCostjsonforGroup;
            }

            const vm = this;
            vm.gridOptions = {
                onRegisterApi: function(gridApi) {
                    vm.gridApi = gridApi;
                },
                data: gridData,
            };

            vm.gridOptions.enableRowSelection = false,
                vm.gridOptions.enableSelectAll = false,
                vm.gridOptions.enableCellEditOnFocus = true;
            vm.gridOptions.enableColumnResizing = false;
            vm.gridOptions.editableOnFocus = true;

            vm.gridOptions.columnDefs = [{
                    name: 'id',
                    enableCellEdit: false,
                    visible: false
                },
                {
                    name: 'costcategory',
                    visible: false
                },
                {
                    name: 'costitem',
                    displayName: 'Cost Category',
                    width: 300,
                    enableCellEdit: false
                },
                {
                    name: 'budget',
                    displayName: 'Budget',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
                {
                    name: 'economy',
                    displayName: 'Economy',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
                {
                    name: 'elegant',
                    displayName: 'Elegant',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
                {
                    name: 'deluxe',
                    displayName: 'Deluxe',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
                {
                    name: 'luxury',
                    displayName: 'Luxury',
                    enableCellEdit: true,
                    enableCellEditOnFocus: true
                },
            ];

            $scope.itnRows.push({
                tourtype: '',
                startdate: '',
                enddate: '',
                gridOptions: vm.gridOptions
            });
        }

        $scope.populatecostsInstance = function(tourid) {
            $scope.tour = $scope.allToursMap.get(tourid);
            $scope.itnRows = [];
            //$scope.itnRows = $scope.tour.tourcost;

            angular.forEach($scope.tour.tourcost, function(cost) {
                cost.startdate = new Date(cost.startdate);
                cost.enddate = new Date(cost.enddate);

                const gridOptions = [];
                gridOptions.onRegisterApi = function(gridApi) {
                    gridApi = gridApi;
                }

                gridOptions.enableRowSelection = false,
                    gridOptions.enableSelectAll = false,
                    gridOptions.enableCellEditOnFocus = true;
                gridOptions.enableColumnResizing = false;
                gridOptions.editableOnFocus = true;

                gridOptions.columnDefs = [{
                        name: 'id',
                        enableCellEdit: false,
                        visible: false
                    },
                    {
                        name: 'costcategory',
                        visible: false
                    },
                    {
                        name: 'costitem',
                        displayName: 'Cost Category',
                        width: 300,
                        enableCellEdit: false
                    },
                    {
                        name: 'budget',
                        displayName: 'Budget',
                        enableCellEdit: true,
                        enableCellEditOnFocus: true
                    },
                    {
                        name: 'economy',
                        displayName: 'Economy',
                        enableCellEdit: true,
                        enableCellEditOnFocus: true
                    },
                    {
                        name: 'elegant',
                        displayName: 'Elegant',
                        enableCellEdit: true,
                        enableCellEditOnFocus: true
                    },
                    {
                        name: 'deluxe',
                        displayName: 'Deluxe',
                        enableCellEdit: true,
                        enableCellEditOnFocus: true
                    },
                    {
                        name: 'luxury',
                        displayName: 'Luxury',
                        enableCellEdit: true,
                        enableCellEditOnFocus: true
                    },
                ];
                gridOptions.data = cost.individualcostsjson;
                cost.gridOptions = gridOptions;
                $scope.itnRows.push(cost);
            });

            $scope.showForm();
        }

        // get all costss to be displayed on page load
        $scope.loadtourCosts = function() {
            //Get all tours to be searched by typeahead
            $scope.allTours = undefined;
            $scope.allToursMap = new Map();
            $scope.loading = true;
            $http.get('/api/tours/alltourswithcosts/')
                .then(
                    function(response) {
                        // success callback
                        $scope.allTours = response.data;
                        angular.forEach($scope.allTours, function(tour) {
                            $scope.allToursMap.set(tour.id, tour);
                        });
                        $scope.loading = false;
                    },
                    function(response) {
                        // failure call back
                    }
                );
        }

        $scope.delcosts = function(costsid) {
            if (costsid && confirm("Are you sure you want to delete this costs?")) {
                $http.delete('/api/tourcosts/', {
                        params: {
                            id: costsid
                        }
                    })
                    .then(
                        function(response) {
                            // success callback
                            $scope.loadtourCosts();
                        },
                        function(response) {
                            // failure call back
                        }
                    );
            }
        }

        $scope.showForm = function(isNew) {
            $scope.message = "Show Form Button Clicked";

            if (isNew) {
                $scope.tourCosts = null;
                $scope.tour = null;
                $scope.itnRows = [];
            }

            $scope.modalInstance = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'TourCostsController',
                scope: $scope,
                backdrop: 'static',
                size: 'lg',
                resolve: {
                    userForm: function() {
                        return $scope.userForm;
                    }
                }
            });

            $scope.modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.cancel = function() {
            $scope.modalInstance.dismiss('cancel');
        };


        $scope.createUpdatecosts = function() {
            const costsToCreate = [];
            const costsToUpdate = [];
            //This is the primary condition for create or update
            if ($scope.tour) {
                //Iterate over itnRows to check if they have an id or not
                angular.forEach($scope.itnRows, function(itn) {
                    itn.tour_id = $scope.tour.id;
                    itn.individualcostsjson = itn.gridOptions.data;
                    if (itn.id) {
                        costsToUpdate.push(itn);
                    } else {
                        costsToCreate.push(itn);
                    }
                });
                if (costsToCreate.length) {
                    //Create first
                    $http.post('/api/tourcosts/bulkcreate/', costsToCreate).then(function(res, err) {
                        if (res.status === 200) {
                            //if the request is scuessful, show all itinerarys
                            $scope.modalInstance.close();
                            $scope.$parent.loadtourCosts();
                        }
                    });
                }

                if (costsToUpdate.length) {
                    $http.post('/api/tourcosts/bulkupdate/', costsToUpdate).then(function(res, err) {
                        if (res.status === 200) {
                            //if the request is scuessful, show all itinerarys
                            $scope.modalInstance.close();
                            $scope.$parent.loadtourCosts();
                        }
                    });
                }
            }
        }

        let _selected;
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


        $scope.newIndividualCostjsonforGroup = [{
                costcategory: "Normal Cost",
                costitem: "Minimum paying pax  30 - 32",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Normal Cost",
                costitem: "Minimum paying pax  20 - 29",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Normal Cost",
                costitem: "Minimum paying pax  20 - 24",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Normal Cost",
                costitem: "Minimum paying pax  14 - 19",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Normal Cost",
                costitem: "Minimum paying pax  07 - 13",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Normal Cost",
                costitem: "Minimum paying pax  04 - 06",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Normal Cost",
                costitem: "Minimum paying pax  03",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Normal Cost",
                costitem: "Minimum paying pax  02",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Single Room Supplement",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Domestic Airfare Supplement",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Half Board Supplement",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Full Board Supplement",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },

            {
                costcategory: "Additional Service Supplement",
                costitem: "Suplement for accompanning guide",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Supplement for luxury car",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Extra night for hotel at arrival city (per room)",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
        ];

        $scope.newIndividualCostjsonforRegular = [{
                costcategory: "Normal Cost",
                costitem: "Minimum paying pax  02",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Single Room Supplement",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Domestic Airfare Supplement",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Half Board Supplement",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Full Board Supplement",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Suplement for accompanning guide",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Supplement for luxury car",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            },
            {
                costcategory: "Additional Service Supplement",
                costitem: "Extra night for hotel at arrival city (per room)",
                budget: "",
                economy: "",
                elegant: "",
                deluxe: "",
                luxury: ""
            }
        ];

    }])