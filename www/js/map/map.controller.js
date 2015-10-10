(function () {
    'use strict';

    angular
        .module('bulkee.map')
        .controller('MapController', MapController);

    MapController.$inject = [ 'uiGmapGoogleMapApi', '$ionicPlatform', '$cordovaGeolocation', '$ionicLoading', 'Map'];

    function MapController(uiGmapGoogleMapApi, $ionicPlatform, $cordovaGeolocation, $ionicLoading, Map) {
        var vm = this;
        vm.markers = [];
        // Attributes
        vm.map = {
          center: {
            latitude: 50.62925,
            longitude: 3.05725
          },
          zoom: 5,
          options: {
           disableDefaultUI: !0,
           mapTypeControl: !1,
           // tilt: 45
         }
        };

        vm.marker = {
            id: 0,
        };

        init();

        function init() {
          Map.getBulkiesNearMe()
            .then(function (bulkies) {
              vm.bulkies = bulkies;
              vm.markers = bulkies.map(function (bulky, id) {
                return {
                  coords: {
                    longitude: bulky.position[1],
                    latitude: bulky.position[0]
                  }
                };
              });
              console.log('markers : ', vm.markers);
              return uiGmapGoogleMapApi;
            })
            .then(function (maps) {
              console.log('map', maps);
              console.log("Map ready!");
            });
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
                  vm.markers.push({
                    coords: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                    },
                    icon : 'http://images.clipartpanda.com/location-icon-map-pin-map-icon.png'
                  });
                  var tmpMap = {
                    center : {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                    },
                    zoom : 15
                  };

                  _.assign(vm.map, tmpMap);
                  // _.assign(vm.marker, marker);

                  // Hide overlay
                  $ionicLoading.hide();
                }, function (err) {
                  // error report
                  console.error(err);

                  $ionicLoading.hide();
                });
            });
        }
    }
})();
