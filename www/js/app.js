(function () {
    'use strict';

    function config($urlRouterProvider, $stateProvider, uiGmapGoogleMapApiProvider) {
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
            .state('map', {
                url: '/map',
                templateUrl: 'templates/map.html',
                controller: 'MapController as MapCtrl'
            })
            .state('alerts', {
                url: '/alerts',
                templateUrl: 'templates/alerts.html',
                controller: 'AlertsController as AlertsCtrl'
            })

        ;

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDPj81ZZ7kkB_fexihCRowKjtd7XqrC2QQ',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
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
        'uiGmapgoogle-maps',
        'ngCordova',

        // Application modules
        'bulkee.login',
        'bulkee.home',
        'bulkee.map',
        'bulkee.alerts'
    ])

    .config(['$urlRouterProvider', '$stateProvider', 'uiGmapGoogleMapApiProvider', config])

    .run(['$ionicPlatform', run]);
})();