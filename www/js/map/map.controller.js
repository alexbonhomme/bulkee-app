(function () {
    'use strict';

    angular
        .module('bulkee.map')
        .controller('MapController', MapController);

    MapController.$inject = [ 'uiGmapGoogleMapApi', '$ionicPlatform', '$cordovaGeolocation', '$ionicLoading', 'Map'];

    function MapController(uiGmapGoogleMapApi, $ionicPlatform, $cordovaGeolocation, $ionicLoading, Map) {
        var vm = this;

        // Attributes
        vm.map = {
          center: {
            latitude: 50.62925,
            longitude: 3.05725
          },
          zoom: 5,
          options: {
            disableDefaultUI: true
          },
          reduce: false
        };

        vm.marker = {
            id: 0,
        };
        vm.markers = [];

        init();

        function init() {
            // Show loading overlay
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });


            $ionicPlatform.ready(function () {
              var posOptions = {
                  enableHighAccuracy: false,
                  timeout: 10000
              };

              $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                  vm.marker = {
                    id: 0,
                    coords: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                    },
                    options: {
                      icon : 'img/pictos/bulkee_fiche-pin.svg'
                    }
                  };
                  var tmpMap = {
                    center : {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                    },
                    zoom : 15
                  };

                  _.assign(vm.map, tmpMap);

                  return Map.getBulkiesNearMe(500, position.coords.longitude, position.coords.latitude);
                })
                .then(function (bulkies) {
                  vm.bulkies = bulkies;
                  bulkies.forEach(function (bulky, id) {
                    vm.markers.push({
                      id: bulky._id,
                      coords: {
                        longitude: bulky.position[1],
                        latitude: bulky.position[0]
                      },
                      icon: 'img/pictos/bulkee_fiche-pin.svg'
                    });
                  });

                  return uiGmapGoogleMapApi;
                })
                .catch(function (err) {
                  console.log(err);
                })
                .finally(function () {
                  $ionicLoading.hide();
                });
            });
        }

        function getIconURL(category) {
          switch(category) {
            case '':
              return ;
          }
        }
    }
})();
