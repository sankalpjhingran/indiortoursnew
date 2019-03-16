'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TourViewController
 * @description
 * # TourViewController
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TourViewController', ['$uibModal', '$http', '$location', '$state', '$rootScope', '$scope', '$stateParams', 'uiGridGroupingConstants', 'currencyFact', '$document', '$log', '$timeout',
  function ($uibModal, $http, $location, $state, $rootScope, $scope, $stateParams, calendarConfig, uiGridGroupingConstants, currencyFact, $document, $log, $timeout) {

    $rootScope.$state = $state;
    var tourId = $stateParams.id;
    $scope.tourWithAllRelated = [];
    var imagesMap = new Map();

    var vm = this;
    vm.calendarView = 'month';
    vm.viewDate = moment().toDate();
    vm.cellIsOpen = true;
    vm.events = [];
    $scope.calendarDataAvailable = false;

    $scope.showEnquiryForm = function(){
        $scope.showForm();
    }


    $scope.showForm = function (isNew) {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);

        if(isNew){
          //$scope.hotelData = null;
        }

        console.log($uibModal);

        $scope.modalInstance = $uibModal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ContactusController',
            scope: $scope,
            backdrop: 'static',
            size: 'md',
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });

        $scope.modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });
    };

    $scope.cancel = function () {
        $scope.modalInstance.dismiss('cancel');
    };

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

    $scope.getTourDetailsWithRelatedModels = function() {
      $scope.loading = true;
      $http.get('/api/tours/tourdetailswithrelatedmodels/', {params: {id: tourId}})
       .then(
           function(res){
             //Success callback
             $scope.tourWithAllRelated = JSON.parse(res.data);
             $scope.allHotels = $scope.tourWithAllRelated[0].accomodationHotel;
             $scope.hotelsjson = [];

             $scope.currency = {
               newValue: 'USD',
               oldValue: 'USD'
             }
             $scope.tourWithAllRelated[0].price = accounting.formatMoney($scope.tourWithAllRelated[0].price, { symbol: $scope.currency.newValue,  format: "%v %s" });
             $scope.tourWithAllRelated[0].offerprice = accounting.formatMoney($scope.tourWithAllRelated[0].offerprice, { symbol: $scope.currency.newValue,  format: "%v %s" });

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
                console.log(moment(date.startdate).toDate());
                  var BYDAY = [];
                  if(date.repeatfrequency == 'Week') {
                      console.log(date.repeatondayofweek);
                      angular.forEach(date.repeatondayofweek.split(','), function(day){
                          BYDAY.push(day.substring(0, 2).toUpperCase());
                      })
                  }
                  var rule = rrulestr('RRULE:BYDAY=' + BYDAY.toString())

                  $scope._events.push(
                    {
                      title: date.title,
                      color: {
                        primary: "#1e90ff",
                        secondary: "#d1e8ff"
                      },
                      rrule: {
                        freq: date.repeatfrequency == 'Week' ? RRule.WEEKLY :
                              date.repeatfrequency == 'Month' ? RRule.MONTHLY :
                              date.repeatfrequency == 'Year' ? RRule.YEARLY :
                              date.repeatfrequency == 'Day' ? RRule.DAILY :
                              RRule.WEEKLY,
                        bymonthday: date.repeatfrequency == 'Month' ? date.repeatondayofmonth : null,
                        count: date.repeatendsafteroccurrences,
                        dtstart: moment(date.startdate).toDate(),
                        interval: date.repeatfor,
                        byweekday: date.repeatfrequency == 'Week' ? rule.origOptions.byweekday : null,
                      }
                    }
                  );
              });
              watchFunction();
              $scope.calendarDataAvailable = true;
              console.log('calendarDataAvailable is true now');
              $scope.loading = false;
           },
           function(response){
             // failure call back
           }
        );
    }

    var watchFunction = function(){
      // the code
      vm.events = [];

      if($scope._events && $scope._events.length) {
          $scope._events.forEach(function(event) {
          // Use the rrule library to generate recurring events: https://github.com/jkbrzt/rrule
          var rule = new RRule(angular.extend({}, event.rrule, {
            dtstart: moment(vm.viewDate).startOf(vm.calendarView).toDate(),
            until: moment(vm.viewDate).endOf(vm.calendarView).toDate()
          }));

          rule.all().forEach(function(date) {
            var momentDate = moment(date).format("YYYY-MM-DD") + "T" + moment(event.rrule.dtstart).format("HH:mm");
            vm.events.push(angular.extend({}, event, {
              startsAt: moment(momentDate).toDate()
            }));
          });
        })
      }
    }

    $scope.$watchGroup([
      'vm.calendarView',
      'vm.viewDate'
    ], watchFunction);

    vm.eventClicked = function(event) {
      console.log(event);
    };

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

  $scope.msg = { };

  }])
  // Setup the filter for notes
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
  });
