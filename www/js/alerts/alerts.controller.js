(function () {
    'use strict';

    angular
        .module('bulkee.alerts')
        .controller('AlertsController', AlertsController);

    AlertsController.$inject = [];

    function AlertsController() {
        var vm = this;

        init();

        function init() {

        }
    }
})();