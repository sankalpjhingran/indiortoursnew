'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ApplicationController', function($localStorage, $scope, $http, $location, $rootScope, $window, currencyFact, $translate) {
        const vm = this;
        vm.loggedInUserName = {};
        vm.isAdminLoggedIn = false;

        let langKeyToNameMap = new Map();
        langKeyToNameMap.set('en', 'English');
        langKeyToNameMap.set('ar', 'اللغة');
        langKeyToNameMap.set('cn', '简体中文');
        langKeyToNameMap.set('de', 'Deutsch');
        langKeyToNameMap.set('fr', 'Francese');
        langKeyToNameMap.set('it', 'Italiano');
        langKeyToNameMap.set('jp', '日本語');
        langKeyToNameMap.set('pt', 'Portuguese');
        langKeyToNameMap.set('ru', 'русский');
        langKeyToNameMap.set('es', 'Español');

        vm.selectedLang = 'English';
        //console.log($translate.preferredLanguage());

        vm.selectCurrency = function(currency) {
            vm.selected = currency;
        }

        vm.goToSearch = function() {
            if (vm.key) {
                $window.location.href = '/search?key=' + vm.key;
            }
        }

        $scope.changeLanguage = function(key, lang) {
            vm.selectedLang = langKeyToNameMap.get(key);
            $translate.use(key);
        };

        $http.get('/api/isAuthenticated/')
            .then(
                function(response) {
                    // success callback
                    if (response.data.isLoggedIn) {
                        vm.isLoggedIn = true;
                        vm.loggedInUserName = response.data.user.firstname;
                        if (response.data.isAdmin) {
                            vm.isAdminLoggedIn = true;
                        }
                    } else {
                        vm.isAdminLoggedIn = false;
                        vm.isLoggedIn = false;
                        vm.loggedInUserName = 'My Account';
                    }
                },
                function(response) {
                    //failure call back
                    vm.isLoggedIn = false;
                }
            );

        vm.currencyCodes = ['INR', 'EUR', 'GBP', 'USD'];
        $scope.$storage = $localStorage;

        //Set default currency as USD
        if ($localStorage.currencypreference && $localStorage.currencypreference.to) {
            vm.selected = $localStorage.currencypreference.to;
        } else {
            vm.selected = 'USD';
        }

        $scope.$watch('vm.selected', function(newValue, oldValue) {
            if (!$localStorage.currencypreference) {
                $localStorage.currencypreference = {
                    to: newValue,
                    from: oldValue
                }
            }

            if (newValue != oldValue) {
                if ($localStorage.currencypreference.newValue != newValue) {
                    $localStorage.currencypreference = {
                        to: newValue,
                        from: oldValue
                    }
                    $rootScope.$broadcast('currency', $localStorage.currencypreference);
                }
            }
        });
    });