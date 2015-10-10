(function () {
    'use strict';

    angular
        .module('bulkee.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [ '$ionicPlatform', '$scope', '$ionicModal', 'Map', '$cordovaGeolocation', '$q', '$ionicLoading', '$timeout' ];

    function HomeController($ionicPlatform, $scope, $ionicModal, Map, $cordovaGeolocation, $q, $ionicLoading, $timeout) {
        var vm = this;

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
            // $ionicLoading.show({
            //     template: '<ion-spinner></ion-spinner>'
            // });
            // deferCamera.resolve("img/canap2.jpg");

            // Get location (promise)
            var locationPromise = $cordovaGeolocation
              .getCurrentPosition({
                enableHighAccuracy: false,
                timeout: 10000
              });

            // Wait for all promises and build bulk object
            $q.all([ deferCamera.promise, locationPromise ])
              .then(function (data) {

                vm.bulk = {
                  picture: data[0],
                  position: [
                    data[1].latitude,
                    data[1].longitude
                  ],
                  description: "",
                  author: {
                    "id": "561841994f4048454322f702",
                    "name": "Benjamin COENEN"
                  }
                };

                // show modal to ask category
                vm.modal.show();
              })
              .finally(function () {
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
        function selectCategory(category) {
          vm.bulk.category = {
            "id": 3,
            "name": "MULTIMEDIA"
          };

          vm.modal.hide();
        }
    }
})();
