'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('authcontroller', function($scope, $http, $location, $rootScope, $window) {
        $scope.visibility = {
            isLoginFormOpen: true,
            isPasswordResetFormOpen: false,
            isSignUpFormOpen: false
        };

        $scope.userinvalid = false;

        $scope.showForgotPasswordForm = function() {
            $scope.visibility.isPasswordResetFormOpen = true;
            $scope.visibility.isLoginFormOpen = false;
            $scope.visibility.isSignUpFormOpen = false;
        }

        $scope.showLoginForm = function() {
            $scope.visibility.isPasswordResetFormOpen = false;
            $scope.visibility.isLoginFormOpen = true;
            $scope.visibility.isSignUpFormOpen = false;
        }

        $scope.showRegistrationForm = function() {
            $scope.visibility.isPasswordResetFormOpen = false;
            $scope.visibility.isLoginFormOpen = false;
            $scope.visibility.isSignUpFormOpen = true;
        }

        $scope.signUp = function() {
            $http.post('/api/signup/', $scope.signupdata).then(function(res, err) {
                if (res.status === 200) {
                    $rootScope.firstname = res.firstname;
                }
            });
        };

        $scope.signIn = function() {
          console.log('$scope.signIn===>');
            $http.post('/api/signin/', $scope.signindata).then(function(res, err) {
                if (res.status === 200) {
                    $rootScope.loggedInUser = res.data;
                    $rootScope.isLoggedIn = true;
                    $rootScope.isAdminLoggedIn = res.data.type === 'Admin';
                    $scope.loggedInUser = res.data;
                    console.log(res);
                    if (res.data.type === 'Admin') {
                        $location.path('/admin');
                    } else {
                        $location.path('/');
                    }

                }
            }).catch(function(err) {
                console.log('Invalid Username or Password...');
                $scope.loginError = "Authentication failed, invalid Username or Password.";
            });
        };

        $scope.facebookSignIn = function() {
            $window.location.href = '/api/signin/auth/facebook?returnTo=/';
        };

        $scope.forgotPassword = function() {
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            const data = $.param({
                email: $scope.useremail
            });

            $http.post('/api/users/forgotpassword/', data, config).then(function(res, err) {
                if (res.status === 200) {

                }
            }).catch(function(err) {
                console.log('Invalid Username or Password...');
            });
        }

        $scope.logout = function() {
            $http.post('/api/logout/').then(function(res, err) {
                if (res.status === 200) {
                    $window.location.reload();
                }
            }).catch(function(err) {
                console.log('Error logging out...');
            });
        };
    });
