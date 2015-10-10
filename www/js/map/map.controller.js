(function () {
    'use strict';

    angular
        .module('bulkee.map')
        .controller('MapController', MapController);

    MapController.$inject = [ 'uiGmapGoogleMapApi' ];

    function MapController(uiGmapGoogleMapApi) {
        var vm = this;

        // Attrubutes
        vm.map = {
            center: {
                latitude: 45,
                longitude: -73
            },
            zoom: 8
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