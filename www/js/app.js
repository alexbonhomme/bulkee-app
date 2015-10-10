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
          .state('profile', {
              url: '/profile',
              templateUrl: 'templates/profile.html',
              controller: 'ProfileController as ProfileCtrl'
          })
          .state('alerts', {
              url: '/alerts',
              templateUrl: 'templates/alerts.html',
              controller: 'AlertsController as AlertsCtrl'
          });

        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDPj81ZZ7kkB_fexihCRowKjtd7XqrC2QQ',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization'
        });
    }

    function run($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }


            Ionic.io();
            var push = new Ionic.Push({
              'debug': true
            });

            push.register(function(token) {
              alert('Device token: ' + token.token);
              $rootScope.devicetoken = token.token;
            });

            // this will give you a fresh user or the previously saved 'current user'
            var user = Ionic.User.current();

            // if the user doesn't have an id, you'll need to give it one.
            if (!user.id) {
              user.id = Ionic.User.anonymousId();
              // user.id = 'your-custom-user-id';
            }

            //persist the user
            user.save();
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
        'bulkee.alerts',
        'bulkee.profile'
    ])

    .config(['$urlRouterProvider', '$stateProvider', 'uiGmapGoogleMapApiProvider', config])

    .run(['$ionicPlatform', '$rootScope', run]);
})();
