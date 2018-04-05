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
    'ngCookies'
  ])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$routeProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider) {
    //$urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    $stateProvider
        .state('main', {
            url:'/',
            views:{
              subheader: {
                templateUrl: 'views/homesubheader.html',
                controller: 'SubHeaderController'
              },
              sidesection: {
                //template: 'This is the side section',
                //controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
              }
            }
        })
        .state('tourView', {
            url:'/tourView?id',
            views:{
              subheader: {
                templateUrl: 'views/toursubheader.html',
                controller: 'TourViewController'
              },
              sidesection: {
                templateUrl: 'views/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/tourview.html',
                controller: 'TourViewController'
              }
            }
        })
        .state('destination', {
            url:'/destination?id',
            views:{
              subheader: {
                templateUrl: 'views/toursubheader.html',
                controller: 'TourViewController'
              },
              sidesection: {
                templateUrl: 'views/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/destination.html',
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
                templateUrl: 'views/toursidesection.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/destinations.html',
                controller: 'DestinationsController'
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
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
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
                templateUrl: 'views/signup.html',
                controller: 'authcontroller'
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
                templateUrl: 'views/userprofile.html',
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
                templateUrl: 'views/login.html',
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
                templateUrl: 'views/contactus.html',
                controller: 'ContactusController'
              }
            }
        })
        .state('thankyou', {
            url: '/thankyou',
            views:{
              subheader: {
                templateUrl: 'views/homesubheader.html',
                controller: 'MainCtrl'
              },
              sidesection: {
                template: 'This is the side section',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/thankyou.html',
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/toursadmin.html',
                controller: 'ToursAdminController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/locationadmin.html',
                controller: 'LocationAdminController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/placesadmin.html',
                controller: 'PlacesAdminController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/imagesadmin.html',
                controller: 'ImagesAdminController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/leadsadmin.html',
                controller: 'LeadsAdminController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/usersadmin.html',
                controller: 'UsersAdminController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/hotelsadmin.html',
                controller: 'HotelsAdminController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/itineraryadmin.html',
                controller: 'ItineraryAdminController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/departuredateadmin.html',
                controller: 'DepartureDateAdminController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/tourcostsadmin.html',
                controller: 'TourCostsController'
              }
            }
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
                templateUrl: 'views/adminsidesction.html',
                controller: 'MainCtrl'
              },
              mainsection:{
                templateUrl: 'views/tournotesadmin.html',
                controller: 'TourNotesController'
              }
            }
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

      $urlRouterProvider.otherwise('/404');
}

]);
