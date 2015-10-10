(function () {
    'use strict';

    function config($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'templates/login.html',
                controller: 'LoginController as LoginCtrl', // controllerAs is bugged with ion-nav-view...
            })
            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeController as HomeCtrl'
            })
        ;
    }

    function run($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }

    angular.module('bulkee', [
        'ionic',
        'ionic.service.core',

        'bulkee.login',
        'bulkee.home',
        'bulkee.map',
        'bulkee.alerts'
    ])

    .config(['$urlRouterProvider', '$stateProvider', config])

    .run(['$ionicPlatform', run]);
})();