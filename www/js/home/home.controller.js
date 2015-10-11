(function () {
    'use strict';

    angular
        .module('bulkee.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [ '$ionicPlatform', '$scope', '$ionicModal', 'Map', '$cordovaGeolocation', '$q', '$ionicLoading', '$timeout' ];

    function HomeController($ionicPlatform, $scope, $ionicModal, Map, $cordovaGeolocation, $q, $ionicLoading, $timeout) {
        var vm = this;
        vm.category = {};
        // Attributes
        vm.bulk = {};

        // Methods
        vm.newBulk = newBulk;
        vm.selectCategory = selectCategory;

        init();

        function init() {
          // Modal to select category
          $ionicModal.fromTemplateUrl('templates/home.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function (modal) {
            vm.modal = modal;
          });

          //Cleanup the modal when we're done with it!
          $scope.$on('$destroy', function() {
            vm.modal.remove();
          });

          // Execute action on hide modal
          $scope.$on('modal.hidden', function() {

            console.log(vm.bulk);
            console.log('Send bulk!');

            Map.postBulky(vm.bulk);

            vm.bulk = {};
          });
        }

        /**
         * Create a new bulk (take picture, location, etc.)
         * @return {[type]} [description]
         */
        function newBulk() {
          $ionicPlatform.ready(function () {
            // to avoid freeze if the location i to long
            $ionicLoading.show({
              template: '<ion-spinner></ion-spinner>'
            });

            // Get picture (promise)
            var deferCamera = $q.defer();
            navigator.camera.getPicture(function (imageURI) {
                deferCamera.resolve(imageURI);
            }, function (err) {
                deferCamera.reject(err);
            }, {
              // base64 image
              destinationType: Camera.DestinationType.DATA_URL
            });
            // deferCamera.resolve("img/canape.jpg");

            // Get location (promise)
            var deferLocation = $q.defer();
            $cordovaGeolocation
              .getCurrentPosition({
                enableHighAccuracy: false,
                timeout: 10000
              })
              .then(function (location) {
                // Geocoding
                Map.getAddress(location.coords.longitude, location.coords.latitude)
                  .then(function (address) {
                    // Resolve location promise
                    deferLocation.resolve({
                      coords: location.coords,
                      address: address
                    });
                  }, function (err) {
                    deferLocation.reject(err);
                  });
              }, function (err) {
                deferLocation.reject(err);
              })
            ;

            // Wait for all promises and build bulk object
            $q.all([ deferCamera.promise, deferLocation.promise ])
              .then(function (data) {
                vm.bulk = {
                  picture: data[0],
                  position: [
                    data[1].coords.latitude,
                    data[1].coords.longitude
                  ],
                  address: data[1].address,
                  description: 'test',
                  author: {
                    id: '561841994f4048454322f702',
                    name: 'Benjamin COENEN'
                  }
                };
              })
              .finally(function () {
                // show modal to ask category
                vm.modal.show();

                $timeout(function () {
                  $ionicLoading.hide();
                }, 1000);
              });
          });
        }

        /**
         * Put a category to the bulk and close the modal
         * @param  {[type]} category [description]
         * @return {[type]}          [description]
         */
        function selectCategory(category, id) {
          vm.bulk = _.assign(vm.bulk, {
            category : {
              id: id,
              name: category
            }
          });

          vm.modal.hide();
        }
    }
})();
