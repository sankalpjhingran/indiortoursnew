'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'ui.bootstrap.modal',
    'ngFileUpload',
    'ngSanitize',
    'ui.select',
    'textAngular',
    'ng.group',
    'angular.filter',
    'LocalStorageModule',
    'ui.carousel',
    'mwl.calendar',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'ui.grid.selection',
    'ui.grid.grouping',
    'ui.grid.resizeColumns'
  ])

/*
'ui.grid',
'ui.grid.edit',
'ui.grid.cellNav',
'ui.grid.selection'
*/


  .config(['calendarConfig', function(calendarConfig) {
    calendarConfig.allDateFormats.moment.date.hour = 'hh:mm a';
    // View all available config
    console.log(calendarConfig);
  }])


  .run(['Carousel', function(Carousel) {
    Carousel.setOptions({
      arrows: true,
      autoplay: true,
      autoplaySpeed: 2000,
      cssEase: 'ease',
      dots: false,

      easing: 'linear',
      fade: false,
      infinite: true,
      initialSlide: 0,

      slidesToShow: 1,
      slidesToScroll: 3,
      speed: 2000,
    });
  }])

.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('clientApp')
    .setStorageType('sessionStorage')
    .setNotify(true, true)
})

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$routeProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider, calendarConfig, $timeout) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state('main', {
            url:'/',
            views:{
              subheader: {
                templateUrl: 'views/main/homesubheader.html',
                controller: 'SubHeaderController'
              },
              sidesection: {
                //template: 'This is the side section',
                //controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/main.html',
                controller: 'MainCtrl'
              }
            }
        })
        .state('tourView', {
            url:'/tourView?id',
            views:{
              subheader: {
                //templateUrl: 'views/main/toursubheader.html',
                //controller: 'TourHeaderController'
              },
              sidesection: {
                templateUrl: 'views/main/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/tourview.html',
                controller: 'TourViewController'
              }
            }
        })
        .state('destination', {
            url:'/destination?id',
            views:{
              subheader: {
                //templateUrl: 'views/toursubheader.html',
                //controller: 'TourViewController'
              },
              sidesection: {
                templateUrl: 'views/main/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/destination.html',
                controller: 'DestinationViewController'
              }
            }
        })
        .state('destinations', {
            url:'/destinations',
            views:{
              subheader: {
                //templateUrl: 'views/toursubheader.html',
                //controller: 'TourViewController'
              },
              sidesection: {
                templateUrl: 'views/main/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/destinations.html',
                controller: 'DestinationsController'
              }
            }
        })
        .state('hotels', {
            url:'/hotels',
            views:{
              subheader: {
                //templateUrl: 'views/toursubheader.html',
                //controller: 'TourViewController'
              },
              sidesection: {
                templateUrl: 'views/main/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/hotels.html',
                controller: 'HotelsController'
              }
            }
        })
        .state('hotel', {
            url:'/hotel?id',
            views:{
              subheader: {
                //templateUrl: 'views/toursubheader.html',
                //controller: 'TourViewController'
              },
              sidesection: {
                templateUrl: 'views/main/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/viewhotel.html',
                controller: 'HotelViewController'
              }
            }
        })
        .state('viewtrip', {
            url:'/viewtrip?id',
            views:{
              subheader: {
                //templateUrl: 'views/toursubheader.html',
                //controller: 'TourViewController'
              },
              sidesection: {
                templateUrl: 'views/main/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/viewTrip.html',
                controller: 'TripViewController'
              }
            }
        })
        .state('trips', {
            url:'/trips',
            views:{
              subheader: {
                //templateUrl: 'views/toursubheader.html',
                //controller: 'TourViewController'
              },
              sidesection: {
                templateUrl: 'views/main/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/trips.html',
                controller: 'TripsController'
              }
            }
        })
        .state('about', {
            url:'/about',
            views:{
              subheader: {
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/about.html',
                controller: 'AboutCtrl'
              }
            }
        })
        .state('mice', {
            url:'/mice',
            views:{
              subheader: {
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/MICE.html',
                controller: ''
              }
            }
        })
        .state('signup', {
            url: '/signup',
            views:{
              subheader: {
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/signup.html',
                controller: 'authcontroller'
              }
            }
        })
        .state('verify', {
            url: '/verify?link&id',
            views:{
              subheader: {
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/verifyuser.html',
                controller: 'VerifyLinkController'
              }
            }
        })
        .state('resetpassword', {
            url: '/resetpassword?link&id',
            views:{
              subheader: {
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/forgotpassword.html',
                controller: 'VerifyLinkController'
              }
            }
        })
        .state('myprofile', {
            url: '/myprofile',
            views:{
              subheader: {
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/userprofile.html',
                controller: 'UserProfileController'
              }
            }
        })
        .state('login', {
            url: '/login',
            views:{
              subheader: {
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/login.html',
                controller: 'LoginCtrl'
              }
            }
        })
        .state('contactus', {
            url: '/contactus',
            views:{
              subheader: {
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/contactus.html',
                controller: 'ContactusController'
              }
            }
        })
        .state('thankyou', {
            url: '/thankyou',
            views:{
              subheader: {
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main/thankyou.html',
                controller: 'ContactusController'
              }
            }
        })
        .state('toursadmin', {
            url: '/toursadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/toursadmin.html',
                controller: 'ToursAdminController'
              }
            },resolve: { authenticate: authenticate }
        })
        .state('parenttours', {
            url: '/parenttours',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/parenttoursadmin.html',
                controller: 'ParentToursAdminController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('locationadmin', {
            url: '/locationadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/locationadmin.html',
                controller: 'LocationAdminController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('placeadmin', {
            url: '/placeadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/placesadmin.html',
                controller: 'PlacesAdminController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('imageadmin', {
            url: '/imageadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/imagesadmin.html',
                controller: 'ImagesAdminController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('leadsadmin', {
            url: '/leadsadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/leadsadmin.html',
                controller: 'LeadsAdminController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('usersadmin', {
            url: '/usersadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/usersadmin.html',
                controller: 'UsersAdminController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('hotelsadmin', {
            url: '/hotelsadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/hotelsadmin.html',
                controller: 'HotelsAdminController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('itineraryadmin', {
            url: '/itineraryadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/itineraryadmin.html',
                controller: 'ItineraryAdminController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('departuredateadmin', {
            url: '/departuredateadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/departuredateadmin.html',
                controller: 'DepartureDateAdminController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('tourcostsadmin', {
            url: '/tourcostsadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/tourcostsadmin.html',
                controller: 'TourCostsController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('tournotesadmin', {
            url: '/tournotesadmin',
            views:{
              subheader: {
                //No need to show subheader for Admin
                //templateUrl: 'views/homesubheader.html',
                //controller: 'MainCtrl'
              },
              sidesection: {
                templateUrl: 'views/admin/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/admin/tournotesadmin.html',
                controller: 'TourNotesController'
              }
            }
            ,resolve: { authenticate: authenticate }
        })
        .state('404', {
          url: '/404',
          views:{
            subheader: {
            },
            sidesection: {
            },
            mainsection:{
              templateUrl: 'views/404.html',
              controller: 'MainCtrl'
            }
          }
      })
      .state('unauthorised', {
        url: '/unauthorised',
        views:{
          subheader: {
          },
          sidesection: {
          },
          mainsection:{
            templateUrl: 'views/unauthorised.html',
            controller: 'MainCtrl'
          }
        }
    })

      function authenticate($q, $state, $timeout, $http) {
        $http.get('/api/isAuthenticated/')
         .then(
             function(response){
               // success callback
               if(response.data.isLoggedIn){
                 if(response.data.user && response.data.user.type === 'Admin'){
                    return $q.when();
                 }
               }else{
                 $timeout(function() {
                   // This code runs after the authentication promise has been rejected.
                   // Go to the log-in page
                   $stateProvider.stateService.go('unauthorised');
                 })
               }
             },
             function(response){
               //failure call back
               console.log('Error checking authentication OR unauthorised login.');
             }
          );
      }
}]);
