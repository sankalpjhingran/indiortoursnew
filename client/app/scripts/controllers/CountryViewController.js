'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('CountryViewController', ['$http','$state', '$rootScope', '$scope', '$stateParams', function ($http, $state, $rootScope, $scope, $stateParams) {
  $rootScope.$state = $state;

    var destinationId = $stateParams.id;
    $scope.name = $stateParams.name;

    $scope.countryData = [];

    $scope.getCountryDetails = function() {
      $http.get('/api/country/', {params: {id: destinationId}})
       .then(
           function(res){
             // success callback
             console.log(res.data);
             var regions = res.data.Regions;
             var locations = res.data.Locations;

             var regionids = [];
             $scope.countryData = res.data;
             regions.forEach(function(region) {
               regionids.push(regions.id);
             })

             var locationIds = [];
             locations.forEach(function(loc) {
               locationIds.push(loc.id);
             })

             var imageMap = new Map();

             $http.post('/api/image/all/', {tourids:regionids, parentobjectname: 'region'})
              .then(function(images){
                  var imageMapUnderscore = new Map();
                  angular.forEach(images.data, function(image){
                      var tempImages = [];
                      if(!imageMapUnderscore.has(image.parentobjectid)) {
                         tempImages.push(image);
                      } else {
                        tempImages = imageMapUnderscore.get(image.parentobjectid);
                        tempImages.push(image);
                      }
                      imageMapUnderscore.set(image.parentobjectid, tempImages);
                  })

                  angular.forEach(regions, function(region){
                    region.images = [];
                    region.images.push(imageMapUnderscore.get(JSON.stringify(region.id)));
                  })
                  $scope.countryData.regions = regions;
                  $scope.countryData.locations = res.data.Locations;
                  console.log($scope.countryData.locations);
                  console.log($scope.countryData.regions);
              });

              $http.post('/api/image/all/', {tourids:locationIds, parentobjectname: 'location'})
               .then(function(images){
                   var imageMapUnderscore = new Map();
                   angular.forEach(images.data, function(image){
                       var tempImages = [];
                       if(!imageMapUnderscore.has(image.parentobjectid)) {
                          tempImages.push(image);
                       } else {
                         tempImages = imageMapUnderscore.get(image.parentobjectid);
                         tempImages.push(image);
                       }
                       imageMapUnderscore.set(image.parentobjectid, tempImages);
                   })

                   angular.forEach(locations, function(loc){
                     loc.images = [];
                     loc.images.push(imageMapUnderscore.get(JSON.stringify(loc.id)));
                   })
                   $scope.countryData.locations = locations;
               });

           },
           function(response){
             // failure call back
           }
        );

        $http.get('/api/country/tours', {
          params : {
            id : destinationId
          }
        })
         .then(
             function(res){
               // success callback
               $scope.popularItineraries = res.data[0];
               var toursIds = [];
               angular.forEach($scope.popularItineraries, function(tour){
                    toursIds.push(tour.id);
               });

               $http.post('/api/image/all/', {tourids:toursIds, parentobjectname: 'tour'})
                .then(function(images){
                    var imageTourMap = new Map();
                    angular.forEach(images.data, function(image){
                        var tempImages = [];
                        if(!imageTourMap.has(image.parentobjectid)) {
                           tempImages.push(image);
                        } else {
                          tempImages = imageTourMap.get(image.parentobjectid.toString());
                          tempImages.push(image);
                        }
                        imageTourMap.set(image.parentobjectid, tempImages);
                    })
                    angular.forEach($scope.popularItineraries, function(tour){
                      tour.images = [];
                      tour.images.push(imageTourMap.get((tour.id).toString()));
                    });
                    console.log($scope.popularItineraries);
                });



               /*
               var tourTypeWithToursMap = [];
               var tourMapNew = new Map();
               var tourfinalarray = [];

               angular.forEach($scope.popularItineraries, function(tour) {
                 tour.tourgroupnames = [];
                 var tourList = {tours: "", tourgroup: ""};
                 tourList.tours = [];
                 tourList.tourgroup = {};
                 tourList.tours.push(tour);

                 angular.forEach(tour.tourGroup, function(tour2){
                    tourList.tourgroup = tour2;
                    tour.tourgroupnames.push(tour2.name);
                 })
                 tourfinalarray.push(tour);
                 tourMapNew.set(tourList.tourgroup.name, tourList.tours);
                 tourTypeWithToursMap.push(tourList);
               })
               console.log(tourfinalarray);
               console.log(tourTypeWithToursMap);
               console.log(tourMapNew);

               $scope.tourTypeWithToursArray = tourTypeWithToursMap;
               console.log($scope.tourTypeWithToursArray);
               */
             },
             function(response){
               // failure call back
             }
        );
    }
}]);
