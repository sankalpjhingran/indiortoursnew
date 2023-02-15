  'use strict';

  /**
   * @ngdoc function
   * @name clientApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the clientApp
   */
  angular.module('clientApp')
      .controller('UsersAdminController', function($scope, $uibModal, $http, $location, $document, $log) {
          $scope.userMap = new Map();

          $scope.loadUsersData = function() {
              $scope.loading = true;
              $http.get('/api/regusers/').then(function(res, err) {
                  $scope.allUsers = res.data;
                  $scope.userMap = new Map();
                  //populate locationMap to be used in edit form
                  angular.forEach($scope.allUsers, function(user) {
                      $scope.userMap.set(user.id, user);
                  });
                  $scope.loading = false;
              });
          }

          $scope.populateUserInstance = function(userId) {
              $scope.userData = $scope.userMap.get(userId);
              $scope.userData.dateofbirth = new Date($scope.userData.dateofbirth);
              $scope.showForm();
          }

          $scope.createUpdateUser = function() {
              // Update the location if location id is there
              if ($scope.userData && $scope.userData.id) {
                  $http.patch('/api/users/update/', $scope.userData).then(function(res, err) {
                      if (res.status === 200) {
                          //if the request is scuessful, show all locations
                          $scope.modalInstance.close();
                          $scope.$parent.allUsers = $scope.$parent.loadUsersData();
                      }
                  });
              } else {
                  // create location only if tour id is there
                  if ($scope.userData) {
                      $http.post('/api/users/', $scope.userData).then(function(res, err) {
                          if (res.status === 200) {
                              //if the request is scuessful, show all locations
                              $scope.modalInstance.close();
                              $scope.$parent.allUsers = $scope.$parent.loadUsersData();
                          }
                      });
                  } else {
                      console.log('Error: User Data is invalid');
                  }
              }
          }


          $scope.delLocation = function(userid) {
              if (userid && confirm("Are you sure you want to delete this user?")) {
                  $http.delete('/api/users/', {
                          params: {
                              id: userid
                          }
                      })
                      .then(
                          function(response) {
                              // success callback
                              $scope.loadUsersData();
                          },
                          function(response) {
                              // failure call back
                          }
                      );
              }
          }

          $scope.showForm = function(isNew) {
              $scope.message = "Show Form Button Clicked";
              if (isNew) {
                  $scope.userData = null;
              }
              $scope.modalInstance = $uibModal.open({
                  templateUrl: 'myModalContent.html',
                  controller: 'UsersAdminController',
                  scope: $scope,
                  backdrop: 'static',
                  size: 'lg',
                  resolve: {
                      userForm: function() {
                          return $scope.userForm;
                      }
                  }
              });

              $scope.modalInstance.result.then(function(selectedItem) {
                  $scope.selected = selectedItem;
              }, function() {
                  $log.info('Modal dismissed at: ' + new Date());
              });
          }

          $scope.cancel = function() {
              $scope.modalInstance.dismiss('cancel');
          }

          let _selected;
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
          }

          $scope.forgotPassword = function(email) {
              const config = {
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                  }
              };

              const data = $.param({
                  email: email
              });

              $http.post('/api/users/forgotpassword/', data, config).then(function(res, err) {
                  if (res.status === 200) {

                  }
              }).catch(function(err) {
                  console.log('Invalid Username or Password...');
              });
          }

      });