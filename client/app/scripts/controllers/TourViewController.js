'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:TourViewController
 * @description
 * # TourViewController
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TourViewController', ['$sce', '_', '$localStorage', '$uibModal', '$http', '$location', '$state', '$rootScope', '$scope', '$stateParams', 'MetaService', 'uiGridGroupingConstants', 'currencyFact', '$document', '$log', '$timeout',
    function($sce, _, $localStorage, $uibModal, $http, $location, $state, $rootScope, $scope, $stateParams, MetaService, calendarConfig, uiGridGroupingConstants, currencyFact, $document, $log, $timeout) {

      $rootScope.metaservice = MetaService;
      $scope.tourWithAllRelatedModels = [];

      $scope.myInterval = 3000;
      $scope.active = 0;
      var currIndex = 0;

      $rootScope.$state = $state;
      var tourId = $stateParams.id;

      var touridsParam = [];
      touridsParam.push($stateParams.id);

      var vm = this;

      function createElement() {
        var element = document.createElement('i');
        element.class = 'fa fa-map-marker';
        return element;
      }

      $scope.glMarkers = [{
        coordinates: [-99.20415, 19.42257],
        element: createElement()
      }, {
        coordinates: [-99.10415, 19.44257],
        element: createElement()
      }];

      $scope.glSources = [{
        id: 'routeSource',
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [-99.20415, 19.42257],
              [-99.10415, 19.44257]
            ]
          }
        }
      }];

      $scope.glLayers = [{
        id: 'routeLayer',
        source: 'routeSource',
        type: 'line',
        paint: {
          'line-width': 5,
          'line-color': '#FF1A47'
        }
      }];

      $scope.glControls = {
        navigation: {
          enabled: true,
          options: {
            position: 'top-right'
          }
        },
        geolocate: {
          enabled: true,
          options: {
            position: 'top-left'
          }
        }
      };

      $scope.allImagesForTour = function() {
        console.log('Calling subheader controller=====>');
        $scope.bannerImages = [];
        var tourids = touridsParam;
        $http.post('/api/image/all', {
            tourids: tourids,
            parentobjectname: 'tour'
          })
          .then(function(response) {
            if (response.data.length) {
              angular.forEach(response.data, function(image) {
                $scope.bannerImages.push(image);
              });
            }
          });
      }

      $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
      }

      $scope.getAllCities = function() {}
      $scope.fromTo = $localStorage.currencypreference;
      $scope.tourWithAllRelated = [];
      var imagesMap = new Map();
      var vm = this;
      vm.calendarView = 'month';
      vm.viewDate = moment().toDate();
      vm.cellIsOpen = true;
      vm.events = [];
      vm.tourid;
      vm.name;

      $scope.calendarDataAvailable = false;
      $scope.showEnquiryForm = function(tourId, tourname, price, days) {
        $scope.enquiryTourId = tourId;
        $scope.tourName = tourname;
        $scope.tourPrice = price;
        $scope.tourDays = days;
        $scope.showForm('myModalContent.html', 'ContactusController');
      }

      $scope.showBookingForm = function(tourId, tourname, price, days) {
        $scope.enquiryTourId = tourId;
        $scope.tourName = tourname;
        $scope.tourPrice = price;
        $scope.tourDays = days;
        $scope.showForm('bookingModal.html', 'ContactusController');
      }

      $scope.showForm = function(htmlfile, controllername) {
        $scope.message = "Show Form Button Clicked";
        $scope.modalInstance = $uibModal.open({
          templateUrl: htmlfile,
          controller: controllername,
          scope: $scope,
          backdrop: 'static',
          size: 'md',
        });

        $scope.modalInstance.result.then(function(selectedItem) {
          $scope.selected = selectedItem;
        }, function() {
          console.log('Modal dismissed at: ' + new Date());
        });
      };

      $scope.cancel = function() {
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

    $scope.getDatesAndPrices = function() {
        console.log('Calling Dates and Prices====>');
        //$scope.loading = true;
        $http.get('/api/tours/tourdetailswithrelateddeparturedates/', {params: {id: tourId}})
         .then(
             function(resDates){
               var tourWithAllRelatedDates = JSON.parse(resDates.data);
               $scope.tourWithAllRelated[0].departuredates = tourWithAllRelatedDates[0].departuredates;
               $http.get('/api/tours/tourdetailswithrelatedcosts/', {params: {id: tourId}})
                .then(
                    function(resCosts){
                      var tourWithAllRelatedCosts = JSON.parse(resCosts.data);
                      $scope.tourWithAllRelatedModels.tourcost = tourWithAllRelatedCosts[0].tourcost;
                      $scope.tourWithAllRelated[0].tourcost = tourWithAllRelatedCosts[0].tourcost;
                      $scope._events = [];

                      angular.forEach($scope.tourWithAllRelated[0].departuredates, function(date){
                        // Parse a RRuleSet string, return a RRuleSet object
                        //BYDAY=MO,FR
                        console.log(moment(date.startdate).toDate());
                          var BYDAY = [];
                          if(date.repeatfrequency == 'Week') {
                              //console.log(date.repeatondayofweek);
                              angular.forEach(date.repeatondayofweek.split(','), function(day){
                                  BYDAY.push(day.substring(0, 2).toUpperCase());
                              })
                          }
                          var rule = rrulestr('RRULE:BYDAY=' + BYDAY.toString())

                          $scope._events.push(
                            {
                              title: 'Not available',
                              color: {
                                primary: "#1e90ff",
                                secondary: "#d1e8ff"
                              },
                              actions: [{ // an array of actions that will be displayed next to the event title
                                label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
                                cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
                                onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                                  //console.log('Edit event', args.calendarEvent);
                                }
                              }],
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

                      $scope.tourWithAllRelatedModels = $scope.tourWithAllRelated[0];
                      watchFunction();
                      //$scope.loading = false;
                      $scope.calendarDataAvailable = true;
                      console.log('calendarDataAvailable is true now');
                    },
                    function(response){
                      // failure call back
                    })
             },
             function(response){
               // failure call back
             })
    }

    $scope.getTourDetailsWithHotels = function() {
      $scope.hotelsLoading = true;
      $http.get('/api/tours/tourdetailswithrelatedhotels/', {params: {id: tourId}})
       .then(
           function(res){
             //Success callback
             var tourWithAllRelatedHotels = JSON.parse(res.data);
             $scope.allHotels = tourWithAllRelatedHotels[0].accomodationHotel;
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

            var output = [];
              $scope.hotelsjson.forEach(function(hotel) {
                var existing = output.filter(function(v, i) {
                  return v.city == hotel.city;
                });
                if (existing.length) {
                  var existingIndex = output.indexOf(existing[0]);
                  //console.log(output[existingIndex].deluxe);
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
              $scope.hotelsLoading = false;
      })
    };

      $scope.getTourDetailsWithLocations = function() {
        $scope.locationsLoading = true;
        $http.get('/api/tours/tourdetailswithrelatedlocations/', {
            params: {
              id: tourId
            }
          })
          .then(
            function(res) {
              //Success callback
              var tourlocations = JSON.parse(res.data);
              $scope.tourWithAllRelated[0].siteLocation = tourlocations[0].siteLocation;
              var locIds = [];
              $scope.tourWithAllRelated[0].siteLocation.forEach(function(loc) {
                locIds.push(loc.id);
              });

              $http.post('/api/image/all', {
                  tourids: locIds,
                  parentobjectname: 'location'
                })
                .then(function(images) {
                  //console.log(images);
                  angular.forEach(locIds, function(hotel) {
                    var tempImages = [];
                    angular.forEach(images.data, function(image) {
                      if (image.parentobjectname == 'location' && image.parentobjectid == hotel) {
                        tempImages.push(image);
                      }
                    });
                    imagesMap.set(hotel, tempImages);
                    angular.forEach($scope.tourWithAllRelated[0].siteLocation, function(location) {
                      location.images = imagesMap.get(location.id);
                    });
                  });
                  $scope.locationsLoading = false;
                });
            },
            function(response) {
              // failure call back
            }
          );
      }

      $scope.getTourDetailsWithNotes = function() {
        $scope.notesLoading = true;
        $http.get('/api/tours/tourdetailswithrelatednotes/', {
            params: {
              id: tourId
            }
          })
          .then(
            function(res) {
              //Success callback
              var tourNotes = res.data[0];
              $scope.tourWithAllRelated[0].tourNote = tourNotes.tourNote;
              $scope.notesLoading = false;
            },
            function(response) {
              // failure call back
            }
          );
      }

      $scope.getTourDetailsWithItinerary = function() {
        $scope.loading = true;
        $http.get('/api/tours/tourdetailswithrelateditineraries/', {
            params: {
              id: tourId
            }
          })
          .then(
            function(res) {
              //Success callback
              $scope.tourWithAllRelated = JSON.parse(res.data);
              $scope.additionalservicesupplements = [];
              angular.forEach($scope.tourWithAllRelated[0].tourcost, function(cost) {
                if (cost.additionalservicesupplement === true) {
                  $scope.additionalservicesupplements.push(cost);
                }
              });
              $scope.loading = false;
            },
            function(response) {
              // failure call back
            }
          );
      }

      var watchFunction = function() {
        // the code
        vm.events = [];
        var tourWithAllRelatedModels = $scope.tourWithAllRelatedModels;
        if ($scope._events && $scope._events.length) {
          $scope._events.forEach(function(event) {
            // Use the rrule library to generate recurring events: https://github.com/jkbrzt/rrule
            var rule = new RRule(angular.extend({}, event.rrule, {
              dtstart: moment(vm.viewDate).startOf(vm.calendarView).toDate(),
              until: moment(vm.viewDate).endOf(vm.calendarView).toDate()
            }));

            rule.all().forEach(function(ruleDate) {
              //console.log(ruleDate);
              var momentDate = moment(ruleDate).format("YYYY-MM-DD") + "T" + moment(event.rrule.dtstart).format("HH:mm:ss");

              // get the tour type first
              var tourType = tourWithAllRelatedModels.tourtype;

              // If the tourType is Regular, get the regular tour costs first
              var eventTitle;

              if (tourWithAllRelatedModels.tourtype == 'Regular') {
                //console.log('tourType is Regular');
                angular.forEach(tourWithAllRelatedModels.tourcost, function(cost) {
                  if (cost.tourtype == 'Regular') {
                    //console.log('Cost is regular');
                    if (momentDate > cost.startdate && momentDate < cost.enddate) {
                      //console.log('Cost exist for the date');
                      angular.forEach(cost.individualcostsjson, function(indvCost) {
                        //console.log('======' + indvCost.costitem +'====');
                        if (indvCost.costitem == 'Minimum paying pax  02') {
                          //console.log('min paying pax 02 is available');
                          var cost = indvCost.budget;
                          cost = accounting.unformat(cost);
                          cost = fx.convert(cost, {
                            from: "USD",
                            to: $scope.fromTo.from
                          });
                          cost = accounting.formatMoney(fx.convert(cost, $scope.fromTo), {
                            symbol: $scope.fromTo.to,
                            format: "%v %s"
                          });

                          event.title = cost;
                        }
                      });
                    }
                  }
                });
              } else if (tourWithAllRelatedModels.tourtype == 'Group') {
                //console.log('tourType is Group');
                angular.forEach(tourWithAllRelatedModels.tourcost, function(cost) {
                  if (cost.tourtype == 'Group') {
                    //console.log('Cost type is group');
                    if (momentDate > cost.startdate && momentDate < cost.enddate) {
                      angular.forEach(cost.individualcostsjson, function(indvCost) {
                        //console.log('====' + indvCost.costitem + '====');
                        if (indvCost.costitem == 'Minimum paying pax  02') {
                          //console.log(indvCost.budget);
                          var cost = indvCost.budget;
                          cost = accounting.unformat(cost);
                          cost = fx.convert(cost, {
                            from: "USD",
                            to: $scope.fromTo.from
                          });
                          cost = accounting.formatMoney(fx.convert(cost, $scope.fromTo), {
                            symbol: $scope.fromTo.to,
                            format: "%v %s"
                          });
                          event.title = cost;
                        }
                      });
                    }
                  }
                });
              }

              vm.events.push(angular.extend({}, event, {
                startsAt: moment(momentDate).toDate(),
                endsAt: moment(momentDate + tourWithAllRelatedModels.days).toDate(),
                tourid: tourWithAllRelatedModels.id,
                name: tourWithAllRelatedModels.name,
                startDate: moment(momentDate).toDate()
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
        //console.log(event);
      };

      vm.timespanClicked = function(date, cell) {
        //console.log('Timespan clicked.....');

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

      $scope.msg = {};

    }
  ])
  // Setup the filter for notes
  .filter('filternotes', function() {

    // Create the return function and set the required parameter as well as an optional paramater
    return function(notesarray, notetype) {

      var out = [];
      angular.forEach(notesarray, function(note) {

        if (notetype === 'cost') {
          if (note.type === 'Tour Cost Includes' || note.type === 'Tour Cost Not Includes') {
            out.push(note);
          }
        }

        if (notetype === 'important') {
          if (!(note.type === 'Tour Cost Includes' || note.type === 'Tour Cost Not Includes')) {
            out.push(note);
          }
        }
      });
      return out;
    }
  });
