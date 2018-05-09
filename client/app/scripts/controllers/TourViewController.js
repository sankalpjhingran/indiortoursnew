'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('TourViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
    $rootScope.$state = $state;

    var tourId = $stateParams.id;
    $scope.tourWithAllRelated = [];
    var imagesMap = new Map();

    $scope.getTourDetailsWithRelatedModels = function(){
      $http.get('/api/tours/tourdetailswithrelatedmodels/', {params: {id: tourId}})
       .then(
           function(res){
             // success callback
             $scope.tourWithAllRelated = res.data;

             $scope.allHotels = $scope.tourWithAllRelated[0].accomodationHotel;
             var hotelids = [];
             $scope.allHotels.forEach(function(tour){
                hotelids.push({parentobjectname: 'hotel', parentobjectid: tour.id});
             });

             $scope.tourWithAllRelated[0].location = [] ;
             $scope.tourWithAllRelated[0].siteLocation.forEach(function(location){
                $scope.tourWithAllRelated[0].location.push(location.city);
             });

             $http.get('/api/image/all/', hotelids)
              .then(function(images){
                  angular.forEach(hotelids, function(hotel){
                      var tempImages = [];
                      angular.forEach(images.data, function(image){
                        if(image.parentobjectname == hotel.parentobjectname && image.parentobjectid == hotel.parentobjectid){
                              tempImages.push(image);
                        }
                      });
                      imagesMap.set(hotel.parentobjectid, tempImages);
                      angular.forEach($scope.allHotels, function(hotel){
                        hotel.images = imagesMap.get(hotel.id);
                      });
                  });
                  console.log(imagesMap);
              });
              console.log($scope.tourWithAllRelated);

              $scope.additionalservicesupplements = [];

              angular.forEach($scope.tourWithAllRelated[0].tourcost, function(cost){
                  if(cost.additionalservicesupplement === true){
                      $scope.additionalservicesupplements.push(cost);
                  }
              });

           },
           function(response){
             // failure call back
           }
        );
    }


  $scope.oneAtATime = true;
  $scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: true,
    isFirstDisabled: false
  };

  }]);
