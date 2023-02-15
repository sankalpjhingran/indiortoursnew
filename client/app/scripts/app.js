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
        //'mapboxgl-directive'
    ])

    /*
    .run([function () {
          mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fua2FscC1qaGluZ3JhbiIsImEiOiJjanhjbGZuaXcwNGF5M25tZHhuNXZiM2tmIn0.PEHlpxwxbDdpVVfv8MZt8Q';
        }])
      */

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
            //.determinePreferredLanguage()
            .useSanitizeValueStrategy('escape')
            .forceAsyncReload(true)
            .useMissingTranslationHandlerLog()
            .useCookieStorage();
    }])

    .config(['calendarConfig', function(calendarConfig) {
        calendarConfig.allDateFormats.moment.date.hour = 'hh:mm a';
    }])

    /*
    .config(function($breadcrumbProvider) {
      $breadcrumbProvider.setOptions({
        prefixStateName: 'home',
        //template: 'bootstrap3'
        templateUrl: '../views/main/BreadCrumbTemplate.html'
      });
    })
    */

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

        $stateProvider
            .state('home', {
                url: '/',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'subheader@home': {
                        templateUrl: 'views/main/toursubheader.html',
                        controller: 'TourHeaderController'
                    },
                    'mainsection@home': {
                        templateUrl: 'views/main/main.html',
                        controller: 'MainCtrl'
                    },
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('signup', {
                url: '/signup',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@signup': {
                        // templateUrl: 'views/main/login.html',
                        // controller: 'LoginCtrl',
                        templateUrl: 'views/main/signup.html',
                        controller: 'authcontroller'
                    },

                }
            })
            .state('admin', {
                url: '/admin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
                    },
                    'navbar': {
                      templateUrl: 'views/navbar.html'
                    },
                    'sidesection@admin': {
                        templateUrl: 'views/admin/adminsidesction.html',
                        controller: 'AdminSideSectionController'
                    },
                    'mainsection@admin': {
                        templateUrl: 'views/admin/toursadmin.html',
                        controller: 'ToursAdminController'
                    }
                },
                resolve: {
                    authenticate: authenticateAdmin
                }
            })
            .state('admin.trips', {
                url: '/trips',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.locationadmin', {
                url: '/locationadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.regionsadmin', {
                url: '/regionsadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.countriesadmin', {
                url: '/countriesadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.continentsadmin', {
                url: '/continentsadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.placeadmin', {
                url: '/placeadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.imageadmin', {
                url: '/imageadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.leadsadmin', {
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
            .state('admin.usersadmin', {
                url: '/usersadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.hotelsadmin', {
                url: '/hotelsadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.itineraryadmin', {
                url: '/itineraryadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.departuredateadmin', {
                url: '/departuredateadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.tourcostsadmin', {
                url: '/tourcostsadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
            .state('admin.tournotesadmin', {
                url: '/tournotesadmin',
                views: {
                    'adminportal': {
                        templateUrl: 'views/admin/adminportal.html'
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
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@404': {
                        templateUrl: 'views/404.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            .state('tourView', {
                url: '/tourView?id&name',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'subheader@tourView': {
                        templateUrl: 'views/main/toursubheader.html',
                        controller: 'TourHeaderController'
                    },
                    'sidesection@tourView': {
                        templateUrl: 'views/main/toursidesection.html',
                        controller: 'MainCtrl'
                    },
                    'mainsection@tourView': {
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
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@city': {
                        templateUrl: 'views/main/city.html',
                        controller: 'CityViewController'
                    }
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('destinations', {
                url: '/destinations',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@destinations': {
                        templateUrl: 'views/main/destinations.html',
                        controller: 'DestinationsController'
                    }
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('vacations', {
                url: '/vacations',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@vacations': {
                        templateUrl: 'views/main/trips.html',
                        controller: 'TripsController'
                    }
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('hotels', {
                url: '/hotels',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@hotels': {
                        templateUrl: 'views/main/hotels.html',
                        controller: 'HotelsController'
                    }
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('mice', {
                url: '/mice',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@mice': {
                        templateUrl: 'views/main/MICE.html',
                        controller: ''
                    }
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('destination', {
                url: '/destination?type&id&name',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@destination': {
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
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@country': {
                        templateUrl: 'views/main/country.html',
                        controller: 'CountryViewController'
                    }
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('vacation', {
                url: '/vacation?id&name',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@vacation': {
                        templateUrl: 'views/main/viewTrip.html',
                        controller: 'TripViewController'
                    }
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('hotel', {
                url: '/hotel?id',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@hotel': {
                        templateUrl: 'views/main/viewhotel.html',
                        controller: 'HotelViewController'
                    }
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('about', {
                url: '/about',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@about': {
                        templateUrl: 'views/main/about.html',
                        controller: 'AboutCtrl'
                    }
                }
            })
            .state('verify', {
                url: '/verify?link&id&status',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@verify': {
                        templateUrl: 'views/main/verifyuser.html',
                        controller: 'VerifyLinkController'
                    }
                }
            })
            .state('resetpassword', {
                url: '/resetpassword?link&id',
                views: {
                    /*'navbar': {
                      templateUrl: 'views/navbar.html'
                    },*/
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@resetpassword': {
                        templateUrl: 'views/main/forgotpassword.html',
                        controller: 'VerifyLinkController'
                    }
                }
            })
            .state('myprofile', {
                url: '/myprofile',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@myprofile': {
                        templateUrl: 'views/main/userprofile.html',
                        controller: 'UserProfileController'
                    }
                }
            })
            .state('contactus', {
                url: '/contactus',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@contactus': {
                        templateUrl: 'views/main/contactus.html',
                        controller: 'ContactusController'
                    }
                }
            })
            .state('enquiry', {
                url: '/enquiry',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@enquiry': {
                        templateUrl: 'views/main/tourenquiry.html',
                        controller: 'ContactusController'
                    }
                },
                resolve: {
                    promiseObj: getConversionRates
                }
            })
            .state('thankyou', {
                url: '/thankyou',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@thankyou': {
                        templateUrl: 'views/main/thankyou.html',
                        controller: 'ContactusController'
                    }
                }
            })
            .state('search', {
                url: '/search?key',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@search': {
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
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@checkout': {
                        templateUrl: 'views/main/checkout.html',
                        controller: 'CheckoutController'
                    }
                }
            })
            .state('unauthorised', {
                url: '/unauthorised',
                views: {
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html',
                    },
                    'mainsection@unauthorised': {
                        templateUrl: 'views/unauthorised.html',
                        controller: 'MainCtrl'
                    }
                }
            })
            // route to show our basic form (/form)
            .state('book', {
                url: '/book?id',
                views: {
                    'navbar': {
                        templateUrl: 'views/navbar.html'
                    },
                    'mainportal': {
                        templateUrl: 'views/main/mainportal.html'
                    },
                    'mainsection@book': {
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
                views: {
                    'subheader@': {
                        //templateUrl: 'views/main/toursubheader.html',
                        //controller: 'TourHeaderController'
                    },
                    'sidesection@': {
                        //templateUrl: 'views/main/toursidesection.html',
                        //controller: 'MainCtrl'
                    },
                    'mainsection@': {
                        templateUrl: 'views/main/form-otherdetails.html'
                    }
                }
            })
            .state('book.paymentdetails', {
                url: '/paymentdetails',
                views: {
                    'subheader@': {
                        //templateUrl: 'views/main/toursubheader.html',
                        //controller: 'TourHeaderController'
                    },
                    'sidesection@': {
                        //templateUrl: 'views/main/toursidesection.html',
                        //controller: 'MainCtrl'
                    },
                    'mainsection@': {
                        templateUrl: 'views/main/form-paymentdetails.html'
                    }
                }
            });

        function authenticateAdmin($q, $state, $timeout, $http) {
            $http.get('/api/isAuthenticated/')
                .then(
                    function(response) {
                        // success callback
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
                .then(function(res) {
                    if (typeof fx !== "undefined" && fx.rates) {
                        fx.rates = res.data.rates;
                        fx.base = res.data.base;
                    } else {
                        var fxSetup = {
                            rates: res.data.rates,
                            base: res.data.base
                        }
                    }
                })
        }
    }]);
