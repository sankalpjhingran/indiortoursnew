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
    'ui.router'
  ])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$routeProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $routeProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('main', {
            url:'/',
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .state('about', {
            url:'/about',
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'views/signup.html',
            controller: 'authcontroller'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
        })
        .state('regusers', {
            url: '/regusers',
            templateUrl: 'views/RegUsers.html',
            controller: 'RegUsersController',
        })
        .state('contactus', {
            url: '/contactus',
            templateUrl: 'views/contactus.html',
            controller: 'ContactusController'
        })
        .state('thankyou', {
            url: '/thankyou',
            templateUrl: 'views/thankyou.html',
            controller: 'ContactusController'
        });
}]);
