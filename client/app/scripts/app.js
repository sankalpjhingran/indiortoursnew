'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */

var underscore = angular.module('underscore', []);
underscore.factory('_', function() {
  return window._; //Underscore should be loaded on the page
});

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
    'ui.select',
    'textAngular',
    //'ng.group',
    'angular.filter',
    'LocalStorageModule',
    'ngStorage',
    'mwl.calendar',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.cellNav',
    'ui.grid.selection',
    'ui.grid.grouping',
    'ui.grid.resizeColumns',
    'underscore',
    //'ngMap',
    //'ncy-angular-breadcrumb',
    'ng-clamp',
    'pascalprecht.translate',
    'ngCookies'
  ])

  .config(['$localStorageProvider',
    function($localStorageProvider) {
      if (!$localStorageProvider.get('currencypreference')) {
        $localStorageProvider.set('currencypreference', {
          from: 'USD',
          to: 'USD'
        });
      }
    }
  ])

  .config(['$translateProvider', function($translateProvider) {
    $translateProvider

    // configures staticFilesLoader
    .useStaticFilesLoader({
      prefix: 'translations/locale-',
      suffix: '.json'
    })

    // load 'en' table on startup
    .fallbackLanguage('en')
    .preferredLanguage('en')
    .useSanitizeValueStrategy('escape')
    .forceAsyncReload(true)
    .useMissingTranslationHandlerLog()
    .useCookieStorage();
  }])

  .config(['calendarConfig', function(calendarConfig) {
    calendarConfig.allDateFormats.moment.date.hour = 'hh:mm a';
  }])

  .config(function(localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('clientApp')
      .setStorageType('localStorage')
      .setNotify(true, true)
  })

  .service('MetaService', function() {
    var title = '';
    var metaDescription = '';
    var metaKeywords = '';
    return {
      set: function(newTitle, newMetaDescription, newKeywords) {
        metaKeywords = newKeywords;
        metaDescription = newMetaDescription;
        title = newTitle;
      },
      metaTitle: function() {
        return title;
      },
      metaDescription: function() {
        return metaDescription;
      },
      metaKeywords: function() {
        return metaKeywords;
      }
    }
  })

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$routeProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider, calendarConfig, $timeout) {
    $locationProvider.html5Mode(true).hashPrefix('');
    $urlRouterProvider.otherwise('/404');
    //$urlRouterProvider.deferIntercept();

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'subheader': {
            templateUrl: 'views/main/homesubheader.html',
            controller: 'SubHeaderController'
          },
          'mainsection': {
            templateUrl: 'views/main/main.html',
            controller: 'MainCtrl'
          },
          'sidesection': {
            //template: 'This is the side section',
            //controller: 'MainCtrl'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('tourView', {
        url: '/tourView?id&name',
        views: {
          'subheader': {
            templateUrl: 'views/main/toursubheader.html',
            controller: 'TourHeaderController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/tourview.html',
            controller: 'TourViewController'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('city', {
        url: '/city?id&countryid',
        views: {
          'subheader': {
            //templateUrl: 'views/toursubheader.html',
            //controller: 'TourViewController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/city.html',
            controller: 'CityViewController'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('destination', {
        url: '/destination?type&id&name',
        views: {
          'subheader': {
            //templateUrl: 'views/toursubheader.html',
            //controller: 'TourViewController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/destination.html',
            controller: 'DestinationViewController'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('country', {
        url: '/country?id&name',
        views: {
          'subheader': {
            //templateUrl: 'views/toursubheader.html',
            //controller: 'TourViewController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/country.html',
            controller: 'CountryViewController'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('region', {
        url: '/region?id&countryid',
        views: {
          'subheader': {
            //templateUrl: 'views/toursubheader.html',
            //controller: 'TourViewController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/region.html',
            controller: 'RegionViewController'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('destinations', {
        url: '/destinations',
        views: {
          'subheader': {
            //templateUrl: 'views/main/toursubheader.html',
            //controller: 'TourHeaderController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/destinations.html',
            controller: 'DestinationsController'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('hotels', {
        url: '/hotels',
        views: {
          'subheader': {
            //templateUrl: 'views/toursubheader.html',
            //controller: 'TourViewController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/hotels.html',
            controller: 'HotelsController'
          }
        }
      })
      .state('hotel', {
        url: '/hotel?id',
        views: {
          'subheader': {
            //templateUrl: 'views/toursubheader.html',
            //controller: 'TourViewController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/viewhotel.html',
            controller: 'HotelViewController'
          }
        }
      })
      .state('vacation', {
        url: '/vacation?id&name',
        views: {
          'subheader': {
            //templateUrl: 'views/toursubheader.html',
            //controller: 'TourViewController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/viewTrip.html',
            controller: 'TripViewController'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('vacations', {
        url: '/vacations',
        views: {
          'subheader': {
            //templateUrl: 'views/toursubheader.html',
            //controller: 'TourViewController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/trips.html',
            controller: 'TripsController'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('blog', {
        url: '/blog',
        views: {
          'subheader': {
            //templateUrl: 'views/toursubheader.html',
            //controller: 'TourViewController'
          },
          'sidesection': {
            templateUrl: 'views/main/toursidesection.html',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/blog.html',
            controller: 'BlogController'
          }
        }
      })
      .state('about', {
        url: '/about',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/about.html',
            controller: 'AboutCtrl'
          }
        }
      })
      .state('mice', {
        url: '/mice',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/MICE.html',
            controller: ''
          }
        }
      })
      .state('signup', {
        url: '/signup',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/signup.html',
            controller: 'authcontroller'
          }
        }
      })
      .state('verify', {
        url: '/verify?link&id&status',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/verifyuser.html',
            controller: 'VerifyLinkController'
          }
        }
      })
      .state('resetpassword', {
        url: '/resetpassword?link&id',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/forgotpassword.html',
            controller: 'VerifyLinkController'
          }
        }
      })
      .state('myprofile', {
        url: '/myprofile',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            //template: 'This is the side section',
            //controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/userprofile.html',
            controller: 'UserProfileController'
          }
        }
      })
      .state('login', {
        url: '/login',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/login.html',
            controller: 'LoginCtrl'
          }
        }
      })
      .state('contactus', {
        url: '/contactus',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/contactus.html',
            controller: 'ContactusController'
          }
        }
      })
      .state('enquiry', {
        url: '/enquiry',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/tourenquiry.html',
            controller: 'ContactusController'
          }
        }
      })
      .state('thankyou', {
        url: '/thankyou',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/thankyou.html',
            controller: 'ContactusController'
          }
        }
      })
      .state('search', {
        url: '/search?key',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            template: 'This is the side section',
            controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/search.html',
            controller: 'SearchController'
          }
        },
        resolve: {
          promiseObj: getConversionRates
        }
      })
      .state('checkout', {
        url: '/checkout',
        views: {
          'subheader': {
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            //template: 'This is the side section',
            //controller: 'MainCtrl'
          },
          checkout: {
            templateUrl: 'views/main/checkout.html',
            controller: 'CheckoutController'
          }
        }
      })
      .state('admin', {
        url: '/admin',
        views: {
          'subheader': {
            //templateUrl: 'views/main/toursubheader.html',
            //controller: 'TourHeaderController'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/toursadmin.html',
            controller: 'ToursAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('tripsadmin', {
        url: '/trips',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //template: '<p>This is subheader from trip admin</p>'
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/parenttoursadmin.html',
            controller: 'ParentToursAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('locationadmin', {
        url: '/locationadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/locationadmin.html',
            controller: 'LocationAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('regionsadmin', {
        url: '/regionsadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/regionsadmin.html',
            controller: 'RegionAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('countriesadmin', {
        url: '/countriesadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/countriesadmin.html',
            controller: 'CountryAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('continentsadmin', {
        url: '/continentsadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/continentsadmin.html',
            controller: 'ContinentAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('placeadmin', {
        url: '/placeadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/placesadmin.html',
            controller: 'PlacesAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('imageadmin', {
        url: '/imageadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/imagesadmin.html',
            controller: 'ImagesAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('leadsadmin', {
        url: '/leadsadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/leadsadmin.html',
            controller: 'LeadsAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('usersadmin', {
        url: '/usersadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/usersadmin.html',
            controller: 'UsersAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('hotelsadmin', {
        url: '/hotelsadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/hotelsadmin.html',
            controller: 'HotelsAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('itineraryadmin', {
        url: '/itineraryadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/itineraryadmin.html',
            controller: 'ItineraryAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('departuredateadmin', {
        url: '/departuredateadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/departuredateadmin.html',
            controller: 'DepartureDateAdminController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('tourcostsadmin', {
        url: '/tourcostsadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/tourcostsadmin.html',
            controller: 'TourCostsController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('tournotesadmin', {
        url: '/tournotesadmin',
        views: {
          'subheader': {
            //No need to show subheader for Admin
            //templateUrl: 'views/homesubheader.html',
            //controller: 'MainCtrl'
          },
          'sidesection': {
            templateUrl: 'views/admin/adminsidesction.html',
            controller: 'AdminSideSectionController'
          },
          'mainsection': {
            templateUrl: 'views/admin/tournotesadmin.html',
            controller: 'TourNotesController'
          }
        },
        resolve: {
          authenticate: authenticateAdmin
        }
      })
      .state('404', {
        url: '/404',
        views: {
          'subheader': {},
          'sidesection': {},
          'mainsection': {
            templateUrl: 'views/404.html',
            controller: 'MainCtrl'
          }
        }
      })
      .state('unauthorised', {
        url: '/unauthorised',
        views: {
          'subheader': {},
          'sidesection': {},
          'mainsection': {
            templateUrl: 'views/unauthorised.html',
            controller: 'MainCtrl'
          }
        }
      })
      // route to show our basic form (/form)
      .state('book', {
        url: '/book?id',
        views: {
          'subheader': {
            //templateUrl: 'views/main/toursubheader.html',
            //controller: 'TourHeaderController'
          },
          'sidesection': {
            //templateUrl: 'views/main/toursidesection.html',
            //controller: 'MainCtrl'
          },
          'mainsection': {
            templateUrl: 'views/main/book.html',
            controller: 'BookingController'
          }
        }
      })

      // nested states
      // each of these sections will have their own view
      // url will be nested (/form/profile)
      .state('book.travellers', {
        url: '/travellers',
        views: {
          'subheader': {
            //templateUrl: 'views/main/toursubheader.html',
            //controller: 'TourHeaderController'
          },
          'sidesection': {
            //templateUrl: 'views/main/toursidesection.html',
            //controller: 'MainCtrl'
          },
          'mainsection': {
            //templateUrl: 'views/main/toursidesection.html',
            //controller: 'MainCtrl'
          },
          "book": {
            templateUrl: 'views/main/form-travellers.html'
          }
        }
      })

    /*
    // url will be /form/interests
    .state('book.passengers', {
        url: '/passengers',
        templateUrl: 'views/main/form-passengers.html'
    })

    // url will be /form/payment
    .state('book.tourdetails', {
        url: '/tourdetails',
        templateUrl: 'views/main/form-tourdetails.html'
    })
    .state('book.otherdetails', {
        url: '/otherdetails',
        views:{
          'subheader@': {
            //templateUrl: 'views/main/toursubheader.html',
            //controller: 'TourHeaderController'
          },
          'sidesection@': {
            //templateUrl: 'views/main/toursidesection.html',
            //controller: 'MainCtrl'
          },
          'mainsection@':{
            templateUrl: 'views/main/form-otherdetails.html'
          }
        }
    })
    .state('book.paymentdetails', {
        url: '/paymentdetails',
        views:{
          'subheader@': {
            //templateUrl: 'views/main/toursubheader.html',
            //controller: 'TourHeaderController'
          },
          'sidesection@': {
            //templateUrl: 'views/main/toursidesection.html',
            //controller: 'MainCtrl'
          },
          'mainsection@':{
            templateUrl: 'views/main/form-paymentdetails.html'
          }
        }
    })*/
    ;

    function authenticateAdmin($q, $state, $timeout, $http) {
      $http.get('/api/isAuthenticated/')
        .then(
          function(response) {
            // success callback
            console.log('Auth response from server is====> ', response);
            if (response.data.isLoggedIn) {
              if (response.data.isAdmin === true) {
                return $q.when();
              } else {
                $timeout(function() {
                  // This code runs after the authentication promise has been rejected.
                  // Go to the log-in page
                  $stateProvider.stateService.go('unauthorised');
                })
              }
            } else {
              $timeout(function() {
                // This code runs after the authentication promise has been rejected.
                // Go to the log-in page
                $stateProvider.stateService.go('unauthorised');
              })
            }
          },
          function(response) {
            //failure call back
            console.log('Error checking authentication OR unauthorised login.');
          }
        );
    }

    function authenticate($q, $state, $timeout, $http) {
      $http.get('/api/isAuthenticated/')
        .then(
          function(response) {
            // success callback
            if (response.data.isLoggedIn) {
              if (response.data.user) {
                return $q.when();
              }
            } else {
              $timeout(function() {
                // This code runs after the authentication promise has been rejected.
                // Go to the log-in page
                $stateProvider.stateService.go('unauthorised');
              })
            }
          },
          function(response) {
            //failure call back
            console.log('Error checking authentication OR unauthorised login.');
          }
        );
    }

    function getConversionRates($http) {
      // $http returns a promise for the url data
      return $http.get('/api/conversionrates')
      .then(function(res){
        console.log('conversion rates available...');
        if ( typeof fx !== "undefined" && fx.rates ) {
            fx.rates = res.data.rates;
            fx.base = res.data.base;
        } else {
            var fxSetup = {
                rates : res.data.rates,
                base : res.data.base
            }
        }
      })
    }
  }]);
