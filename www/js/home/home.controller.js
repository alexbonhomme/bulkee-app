(function () {
    'use strict';

    angular
        .module('bulkee.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = [ '$ionicPlatform', '$scope', '$ionicModal' ];

    function HomeController($ionicPlatform, $scope, $ionicModal) {
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

            vm.bulk = {};
          });
        }

        function newBulk() {
          $ionicPlatform.ready(function () {
            // navigator.camera.getPicture(function (imageURI) {
            //     console.log(imageURI);
            // }, function (err) {
            //     console.error(err);
            // });
            vm.bulk.imageURI = "img/canap2.jpg";

            vm.modal.show();




          });
        }

        function selectCategory(category) {
          vm.bulk.category = category;

          vm.modal.hide();
        }
    }
})();