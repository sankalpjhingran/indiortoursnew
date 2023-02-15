'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
const app = angular.module('clientApp');

app.factory('currencyFact', function() {
    const name = {
        oldValue: 'USD',
        newValue: 'USD'
    };

    name.get = function() {
        return name;
    };

    name.set = function(oldValue, newValue) {
        name.oldValue = oldValue;
        name.newValue = newValue;
    }
    return name;
});