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
            zoom: 5,
            options: {
               disableDefaultUI: true
           }
        };

        vm.marker = {
            id: 0,
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
                    enableHighAccuracy: false,
                    timeout: 10000
                };

                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var marker = {
                            id: 0,
                            coords: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
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
                        _.assign(vm.marker, marker);

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