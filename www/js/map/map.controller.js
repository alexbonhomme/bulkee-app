(function () {
    'use strict';

    angular
        .module('bulkee.map')
        .controller('MapController', MapController);

    MapController.$inject = [ 'uiGmapGoogleMapApi', 'currentLocation' ];

    function MapController(uiGmapGoogleMapApi, currentLocation) {
        var vm = this;

        // Attrubutes
        vm.map = {
            center: {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
            },
            zoom: 14
        };

        vm.markers = {
            current: {
                id: 0,
                coords: {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude
                }
            }
        };

        init();

        function init() {
            // uiGmapGoogleMapApi is a promise.
            // The "then" callback function provides the google.maps object.
            uiGmapGoogleMapApi.then(function (maps) {
                console.log("Map ready!");
            });
        }
    }
})();