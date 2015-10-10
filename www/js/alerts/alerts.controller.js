(function () {
    'use strict';

    angular
        .module('bulkee.alerts')
        .controller('AlertsController', AlertsController);

    AlertsController.$inject = ['Alerts', 'Map', '$cordovaGeolocation', '$state'];

    function AlertsController(Alerts, Map, $cordovaGeolocation, $state) {
        var vm = this;
        var category = {};
        vm.distance = 50;
        var posOptions = {
          enableHighAccuracy: false,
          timeout: 10000
        };
        vm.category = {
          FURNITURES: false,
          DECO: false,
          CULTURE: false,
          ELECTRO: false,
          MULTIMEDIA: false,
          LITTLEELECTRO: false,
          CLOTHES: false,
          TOYS: false,
          MISC: false
        };

        init();

        function init() {
          $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function (position) {
              vm.position = [position.coords.longitude, position.coords.latitude];
              return Map.getAddress(vm.position[0], vm.position[1]);
            })
            .then(function (address) {
              vm.address = address;
            });

        }

        vm.createAlert = function () {
          console.log('position : ', vm.position);
          var data = {
            categories: getCategories(),
            distance: vm.distance,
            position: vm.position
          };

          console.log('category : ', data);

          Alerts.postAlert(data)
            .then(function () {
              $state.go('home');
              window.plugins.toast.showWithOptions(
                {
                  message: 'Changement effectué avec succès',
                  duration: 'short',
                  position: 'bottom',
                  addPixelsY: -40  // added a negative value to move it up a bit (default 0)
                }
              );
            })
        };

        function getCategories() {
          var index = 0;
          var tab = [];
          _.forEach(vm.category, function (elt, key) {
            if (elt) {
              tab.push({
                id: index++,
                name: key
              });
            }
          });

          return tab;
        }

        init();
    }
})();
