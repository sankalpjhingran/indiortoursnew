'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TourViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams, calendarConfig) {
    $rootScope.$state = $state;

    var tourId = $stateParams.id;
    $scope.tourWithAllRelated = [];
    var imagesMap = new Map();

    var vm = this;
    var events = [];
    vm.calendarView = 'year';
    vm.viewDate = moment().toDate();
    vm.events = [];
    vm.cellIsOpen = true;

    vm.viewChangeClicked = function(nextView) {
      if (nextView === 'day') {
        return false;
      }
    };


    $scope.getTourDetailsWithRelatedModels = function(){
      $http.get('/api/tours/tourdetailswithrelatedmodels/', {params: {id: tourId}})
       .then(
           function(res){
             // success callback
             $scope.tourWithAllRelated = res.data;
             console.log($scope.tourWithAllRelated[0].tourcost[0]);
             $scope.gridOptions.data = $scope.tourWithAllRelated[0].tourcost[0].individualcostsjson;

             $scope.allHotels = $scope.tourWithAllRelated[0].accomodationHotel;
             var hotelids = [];
             $scope.allHotels.forEach(function(tour){
                hotelids.push({parentobjectname: 'hotel', parentobjectid: tour.id});
             });

             $scope.tourWithAllRelated[0].location = [] ;
             $scope.tourWithAllRelated[0].siteLocation.forEach(function(location){
                $scope.tourWithAllRelated[0].location.push(location.city);
             });

             $http.get('/api/image/all/', hotelids)
              .then(function(images){
                  angular.forEach(hotelids, function(hotel){
                      var tempImages = [];
                      angular.forEach(images.data, function(image){
                        if(image.parentobjectname == hotel.parentobjectname && image.parentobjectid == hotel.parentobjectid){
                              tempImages.push(image);
                        }
                      });
                      imagesMap.set(hotel.parentobjectid, tempImages);
                      angular.forEach($scope.allHotels, function(hotel){
                        hotel.images = imagesMap.get(hotel.id);
                      });
                  });
                  console.log(imagesMap);
              });
              console.log($scope.tourWithAllRelated);

              $scope.additionalservicesupplements = [];

              angular.forEach($scope.tourWithAllRelated[0].tourcost, function(cost){
                  if(cost.additionalservicesupplement === true){
                      $scope.additionalservicesupplements.push(cost);
                  }
              });

              $scope.events = [];
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

                  $scope.events.push(
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
              console.log('Calling watch function=======>');
              watchFunction();
           },
           function(response){
             // failure call back
           }
        );
    }

    var watchFunction = function(){
      // the code
      console.log('In watch function=======>');
      vm.events = [];

      if($scope.events && $scope.events.length) {
          console.log($scope.events);
          $scope.events.forEach(function(event) {

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
        console.log(vm.events);
      }
    }

    $scope.$watchGroup([
      'vm.calendarView',
      'vm.viewDate'
    ], watchFunction);

    vm.timespanClicked = function(date, cell) {
      console.log('Timespan clicked.....');
      if (vm.calendarView === 'month') {
        console.log('Month is true');
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          console.log('=======>1');
          vm.cellIsOpen = false;
        } else {
          console.log('=======>2');
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


  $scope.gridOptions = { };
  $scope.msg = { };

  $scope.gridOptions.columnDefs = [
    {
      name: 'costcategory', displayName: 'Cost Category',
    },
    { name: 'costitem',  displayName: 'Cost Per Person in INR',
    },
    { name: 'budget',  displayName: 'Budget',
    },
    { name: 'economy',  displayName: 'Economy',
    },
    { name: 'superior',  displayName: 'Superior',
    },
    { name: 'luxury',  displayName: 'Luxury',
    },
 	];
  $scope.gridOptions.data = $scope.myData;

  }]);
