(function () {
    'use strict';

    angular
        .module('bulkee.profile')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = [];

    function ProfileController() {
        var vm = this;

        init();

        function init() {

        }
    }
})();