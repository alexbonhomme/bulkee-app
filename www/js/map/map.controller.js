(function () {
    'use strict';

    angular
        .module('bulkee.map')
        .controller('MapController', MapController);

    MapController.$inject = [ 'uiGmapGoogleMapApi', '$ionicPlatform', '$cordovaGeolocation', '$ionicLoading', 'Map', '$timeout'];

    function MapController(uiGmapGoogleMapApi, $ionicPlatform, $cordovaGeolocation, $ionicLoading, Map, $timeout) {
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
          fullSize: true
        };
        vm.showMap = true;

        vm.marker = {
          id: 0,
        };
        vm.markers = [];

        // DO NOT TOUCH THIS OBJECT
        vm.currentModel = {
          icon: {
            scaledSize: {}
          }
        };

        // vm.openBulkee = openBulkee;

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
                      icon: {
                        url: 'img/pictos/bulkee_map-point.svg',

                        scaledSize: new google.maps.Size(26, 26)
                      }
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
                      icon: {
                        url: getIconURL(bulky.category.name),

                        scaledSize: new google.maps.Size(38, 38)
                      },
                      viewBulky: function (model, event) {
                        // reset previous marker icon size
                        vm.currentModel.icon.scaledSize = new google.maps.Size(38, 38);

                        // update with new marker model
                        vm.currentModel = model.model;
                        vm.currentModel.icon.scaledSize = new google.maps.Size(58, 58);
                        vm.map.fullSize = false;

                        // hack to resize map
                        vm.showMap = false;
                        $timeout(function (){
                          vm.map.center = angular.copy(vm.currentModel.coords);

                          vm.showMap = true;
                        }, 10);
                      },
                      picture: bulky.picture,
                      address: bulky.address,
                      author: bulky.author
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
          switch (category) {
            case 'FURNITURE':
              return 'img/pictos/bulkee_section-meubles.svg';

            case 'DECO':
              return 'img/pictos/bulkee_section-deco.svg';

            case 'CULTURE':
              return 'img/pictos/bulkee_section-culture.svg';

            case 'ELECTRO':
              return 'img/pictos/bulkee_section-electro.svg';

            case 'MULTIMEDIA':
              return 'img/pictos/bulkee_section-multimedia.svg';

            case 'LITTLEELECTRO':
              return 'img/pictos/bulkee_section-petitelectro.svg';

            case 'CLOTHES':
              return 'img/pictos/bulkee_section-vetements.svg';

            case 'TOYS':
              return 'img/pictos/bulkee_section-jouets.svg';

            case 'MISC':
            default:
              return 'img/pictos/bulkee_section-divers.svg';
          }
        }
    }
})();
