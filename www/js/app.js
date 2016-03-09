// Ionic ayushakti App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ayushakti' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ayushakti.controllers' is found in controllers.js
angular.module('ayushakti', ['ionic', 'ngCordova', 'ayushakti.controllers', 'ayushakti.services', 'tiNavBar'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html'
      }
    }
  })
  .state('app.services', {
    url: '/services',
    views: {
      'menuContent': {
        templateUrl: 'templates/services.html'
      }
    }
  })
  .state('app.pulse-consultation', {
    url: '/pulse-consultation',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/pulse-consultation.html'
      }
    }
  })
  .state('app.detox-package', {
    url: '/detox-package',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/detox-package.html'
      }
    }
  })
 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
