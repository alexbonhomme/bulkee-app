(function () {
    'use strict';

    angular
        .module('bulkee.map')
        .controller('MapController', MapController);

    MapController.$inject = [ 'uiGmapGoogleMapApi', '$ionicPlatform', '$cordovaGeolocation', '$ionicLoading' ];

    function MapController(uiGmapGoogleMapApi, $ionicPlatform, $cordovaGeolocation, $ionicLoading) {
        var vm = this;

        // Attributes
        vm.map = {
            center: {
                latitude: 50.62925,
                longitude: 3.05725
            },
            zoom: 14
        };

        vm.markers = {
            current: {
                id: 0,
                coords: {
                    // latitude: 50.62925,
                    // longitude: 3.05725
                }
            }
        };

        init();

        function init() {
            // Show loading overlay
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
            uiGmapGoogleMapApi.then(function (maps) {
                console.log("Map ready!");
            });

            $ionicPlatform.ready(function () {
                var posOptions = {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 0
                };

                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        // Center the map
                        vm.map.center.latitude = position.coords.latitude;
                        vm.map.center.longitude = position.coords.longitude;

                        // Current position marker
                        vm.markers.current.coords.latitude = position.coords.latitude;
                        vm.markers.current.coords.longitude = position.coords.longitude;

                        // Hide overlay
                        $ionicLoading.hide();
                    }, function (err) {
                        // error report
                        console.error(err);

                        $ionicLoading.hide();
                    })
                ;
            });

        }
    }
})();