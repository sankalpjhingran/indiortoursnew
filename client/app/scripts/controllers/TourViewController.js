'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
// Setup the filter
.filter('filternotes', function() {

// Create the return function and set the required parameter as well as an optional paramater
return function(notesarray, notetype) {

    var out  = [];
    angular.forEach(notesarray, function(note) {

      if(notetype === 'cost') {
        if(note.type === 'Tour Cost Includes' || note.type === 'Tour Cost Not Includes') {
          out.push(note);
        }
      }

      if(notetype === 'important') {
        if(!(note.type === 'Tour Cost Includes' || note.type === 'Tour Cost Not Includes')) {
          out.push(note);
        }
      }
    });
    return out;
  }
})

  .controller('TourViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', 'uiGridGroupingConstants', function ($http, $state, $rootScope, $scope, $stateParams, calendarConfig, uiGridGroupingConstants) {
    $rootScope.$state = $state;

    var tourId = $stateParams.id;
    $scope.tourWithAllRelated = [];
    var imagesMap = new Map();

    var vm = this;
    //vm.weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    vm.calendarView = 'month';
    vm.viewDate = moment().toDate();
    vm.cellIsOpen = true;
    vm.events = [];

    vm.viewChangeClicked = function(nextView) {
      if (nextView === 'day') {
        return false;
      }
    };


    $scope.getTourDetailsWithRelatedModels = function(){
      $scope.loading = true;
      $http.get('/api/tours/tourdetailswithrelatedmodels/', {params: {id: tourId}})
       .then(
           function(res){
             //Success callback
             $scope.tourWithAllRelated = res.data;
             console.log($scope.tourWithAllRelated[0].tourcost[0]);
             if($scope.tourWithAllRelated[0].tourcost[0] && $scope.tourWithAllRelated[0].tourcost[0].individualcostsjson) {
                $scope.gridOptions.data = $scope.tourWithAllRelated[0].tourcost[0].individualcostsjson;
             }

             $scope.allHotels = $scope.tourWithAllRelated[0].accomodationHotel;
             $scope.hotelsjson = [];

             angular.forEach($scope.allHotels, function(hotel){
                  $scope.hotelsjson.push(
                    {
                      hotelid: hotel.id,
                      city: hotel.location,
                      location_id: hotel.location_id,
                      budget: hotel.type == 'Budget' ? [{name: hotel.name, hotelid: hotel.id}] : [],
                      economy: hotel.type == 'Economy' ? [{name: hotel.name, hotelid: hotel.id}] : [],
                      elegant: hotel.type == 'Elegant' ? [{name: hotel.name, hotelid: hotel.id}] : [],
                      deluxe: hotel.type == 'Deluxe' ? [{name: hotel.name, hotelid: hotel.id}] : [],
                      luxury: hotel.type == 'Luxury' ? [{name: hotel.name, hotelid: hotel.id}] : [],
                    }
                  );
             });

             // sort by name
            $scope.hotelsjson.sort(function(a, b) {
              var nameA = a.city.toLowerCase();
              var nameB = b.city.toLowerCase();
              if (nameA < nameB) {
                return -1;
              }
              if (nameA > nameB) {
                return 1;
              }

              // names must be equal
              return 0;
            });

             console.log($scope.hotelsjson);

             var output = [];

              $scope.hotelsjson.forEach(function(hotel) {
                var existing = output.filter(function(v, i) {
                  return v.city == hotel.city;
                });
                if (existing.length) {
                  var existingIndex = output.indexOf(existing[0]);
                  console.log(output[existingIndex].deluxe);
                  output[existingIndex].budget = output[existingIndex].budget.concat(hotel.budget);
                  output[existingIndex].economy = output[existingIndex].economy.concat(hotel.economy);
                  output[existingIndex].elegant = output[existingIndex].elegant.concat(hotel.elegant);
                  output[existingIndex].deluxe = output[existingIndex].deluxe.concat(hotel.deluxe);
                  output[existingIndex].luxury = output[existingIndex].luxury.concat(hotel.luxury);
                } else {
                    output.push(hotel);
                }
              });

              $scope.output = output;
              console.log($scope.output);

             var hotelids = [];
             $scope.allHotels.forEach(function(tour){
                hotelids.push(tour.id);
             });

             $scope.tourWithAllRelated[0].location = [] ;
             $scope.tourWithAllRelated[0].siteLocation.forEach(function(location){
                $scope.tourWithAllRelated[0].location.push(location.city);
             });

             $http.post('/api/image/all', {tourids : hotelids, parentobjectname : 'hotel'})
              .then(function(images){
                  console.log(images);
                  angular.forEach(hotelids, function(hotel){
                      var tempImages = [];
                      angular.forEach(images.data, function(image){
                        if(image.parentobjectname == 'hotel' && image.parentobjectid == hotel){
                              tempImages.push(image);
                        }
                      });
                      imagesMap.set(hotel, tempImages);
                      angular.forEach($scope.allHotels, function(hotel){
                        hotel.images = imagesMap.get(hotel.id);
                      });
                  });
              });
              console.log($scope.tourWithAllRelated);

              $scope.additionalservicesupplements = [];

              angular.forEach($scope.tourWithAllRelated[0].tourcost, function(cost){
                  if(cost.additionalservicesupplement === true){
                      $scope.additionalservicesupplements.push(cost);
                  }
              });

              $scope._events = [];
              angular.forEach($scope.tourWithAllRelated[0].departuredates, function(date){
                // Parse a RRuleSet string, return a RRuleSet object
                //BYDAY=MO,FR

                  var BYDAY = [];
                  if(date.repeatfrequency == 'Week') {
                      console.log(date.repeatondayofweek);
                      angular.forEach(date.repeatondayofweek.split(','), function(day){
                          BYDAY.push(day.substring(0, 2).toUpperCase());
                      })
                  }
                  console.log(BYDAY.toString());
                  //rrulestr('RRULE:BYDAY=' + BYDAY.toString());
                  var rule = rrulestr('RRULE:BYDAY=' + BYDAY.toString())
                  console.log(rrulestr('RRULE:BYDAY=' + BYDAY.toString()));
                  console.log(rule.options.byweekday);

                  $scope._events.push(
                    {
                      title: date.title,
                      color: '#ffa500',
                      rrule: {
                        freq: date.repeatfrequency == 'Week' ? RRule.WEEKLY :
                              date.repeatfrequency == 'Month' ? RRule.MONTHLY :
                              date.repeatfrequency == 'Year' ? RRule.YEARLY :
                              date.repeatfrequency == 'Day' ? RRule.DAILY :
                              RRule.WEEKLY,
                        bymonthday: date.repeatfrequency == 'Month' ? date.repeatondayofmonth : null,
                        count: date.repeatendsafteroccurrences,
                        interval: date.repeatfor,
                        dtstart: new Date((new Date()).getFullYear(), 1, 1, 8, 0, 0),
                        until: new Date((new Date()).getFullYear(), 12, 31, 8, 0, 0),
                        byweekday: date.repeatfrequency == 'Week' ? rule.origOptions.byweekday : null,
                      }
                    }
                  );
              });
              $scope.loading = false;
           },
           function(response){
             // failure call back
           }
        );
    }

    function groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
          const key = keyGetter(item);
          if (!map.has(key)) {
              map.set(key, [item]);
          } else {
              map.get(key).push(item);
          }
      });
      return map;
    }

    var watchFunction = function(){
      // the code
      vm.events = [];

      if($scope._events && $scope._events.length) {
          console.log($scope._events);
          $scope._events.forEach(function(event) {

          // Use the rrule library to generate recurring events: https://github.com/jkbrzt/rrule
          var rule = new RRule(angular.extend({}, event.rrule, {
            dtstart: moment(vm.viewDate).startOf(vm.calendarView).toDate(),
            until: moment(vm.viewDate).endOf(vm.calendarView).toDate()
          }));

          rule.all().forEach(function(date) {
            vm.events.push(angular.extend({}, event, {
              startsAt: new Date(date)
            }));
          });
        })
      }
    }

    $scope.$watchGroup([
      'vm.calendarView',
      'vm.viewDate'
    ], watchFunction);

    vm.timespanClicked = function(date, cell) {
      console.log('Timespan clicked.....');
      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

  $scope.oneAtATime = true;
  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };


  $scope.gridOptions = {
    onRegisterApi: function( gridApi ) {
        $scope.gridApi = gridApi;
        $scope.gridApi.treeBase.state = 'expanded';

        $scope.gridApi.grid.registerDataChangeCallback(function() {
          $scope.gridApi.treeBase.expandAllRows();
        });
    }
  };

  $scope.gridOptions.enableColumnResizing = true;
  $scope.msg = { };

  $scope.gridOptions.columnDefs = [
    {
      name: 'costcategory', displayName: 'Cost Category',
      grouping: { groupPriority: 0 }, sort: { priority: 0, direction: 'asc' }, width: 250, state: 'expanded',
      cellTemplate: '<div><div ng-if="!col.grouping || col.grouping.groupPriority === undefined || col.grouping.groupPriority === null || ( row.groupHeader && col.grouping.groupPriority === row.treeLevel )" class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div></div>'
    },
    { name: 'costitem',  displayName: 'Cost Per Person', width:200,
    },
    { name: 'budget',  displayName: 'Budget',
    },
    { name: 'economy',  displayName: 'Economy',
    },
    { name: 'elegant',  displayName: 'Elegant',
    },
    { name: 'deluxe',  displayName: 'Deluxe',
    },
    { name: 'luxury',  displayName: 'Luxury',
    },
 	];
  $scope.gridOptions.data = $scope.myData;

  }]);
