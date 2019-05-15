// Ionic ayushakti App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ayushakti' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ayushakti.controllers' is found in controllers.js
var domain = 'http://ayushakti.infi.cf/?action=getPage&id=';
angular.module('ayushakti', ['ionic', 'ngCordova', 'ayushakti.controllers', 'ayushakti.services', 'tiNavBar', 'youtube-embed', 'ngSanitize'])

.run(function($ionicPlatform, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    try {
    if (window.StatusBar) { 
      StatusBar.styleDefault();
    }
      $cordovaStatusbar.styleHex('#2E6142');
    } catch(e) {
        
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
        templateUrl: 'templates/about.html',
        controller: 'aboutCtrl'
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
  .state('app.common-text-page', {
    url: '/common-text-page/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/common/text-page.html',
        controller: 'ServicesCtrl'
      }
    }
  })  
  .state('app.detox-package', {
    url: '/detox-package',
    views: {
      'menuContent': {
        templateUrl: 'templates/detox-package.html'
      }
    }
  })
  .state('app.testimonials', {
    url: '/testimonials',
    views: {
      'menuContent': {
        templateUrl: 'templates/testimonials.html'
      }
    }
  })
  .state('app.videos', {
    url: '/videos/:searchParam', 
    views: {
      'menuContent': {
        templateUrl: 'templates/videos.html',
        controller: 'VideosCtrl'
      }
    }
  })
  .state('app.diseases', {
    url: '/diseases',
    views: {
      'menuContent': {
        templateUrl: 'templates/diseases.html',
        controller: 'DiseasesListCtrl'
      }
    }
  })
  .state('app.disease-info', {
    url: '/disease-info/:catId',
    views: {
      'menuContent': {
        templateUrl: 'templates/disease-info.html',
        controller: 'DiseasesInfoCtrl'
      }
    }
  })
  .state('app.contact-us', {
    url: '/contact-us',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact-us.html',
        controller: 'ContactCtrl'
      }
    }
  })
  .state('app.centers', {
    url: '/centers',
    views: {
      'menuContent': {
        templateUrl: 'templates/centers.html',
        controller: 'CenterCtrl' 
      }
    }
  })
  .state('app.diseases-package', {
    url: '/diseases-package',
    views: {
      'menuContent': {
        templateUrl: 'templates/diseases-package.html' 
      }
    }
  })
  .state('app.diseases-cat', {
    url: '/diseases-cat/:catId',
    views: {
      'menuContent': {
        templateUrl: 'templates/diseases-cat.html',
        controller: 'DiseasesCatCtrl' 
      }
    }
  })
  .state('app.package-info', {
    url: '/package-info/:catId/:termId',
    views: {
      'menuContent': {
        templateUrl: 'templates/package-info.html',
        controller: 'packageInfoCtrl' 
      }
    }
  })
  .state('app.treatment-packages', {
    url: '/treatment-packages',
    views: {
      'menuContent': {
        templateUrl: 'templates/treatment-packages.html' 
      }
    }
  })
  .state('app.treatment-package-info', {
    url: '/treatment-package-info',
    views: {
      'menuContent': {
        templateUrl: 'templates/treatment-package-info.html' 
      }
    }
  })
  .state('app.newsletter', {
    url: '/newsletter',
    views: {
      'menuContent': {
        templateUrl: 'templates/newsletter.html',
        controller: 'NewsLetterCtrl' 
      }
    }
  })
  .state('app.bookAppointment', {
    url: '/bookAppointment',
    views: {
      'menuContent': {
        templateUrl: 'templates/book-appointment.html',
        controller: 'BookAppointmentCtrl' 
      }
    }
  })
  .state('app.updates', {
    url: '/updates',
    views: {
      'menuContent': {
        templateUrl: 'templates/updates.html',
        controller: 'UpdatesCtrl' 
      }
    }
  })
  .state('app.homeRemedy', {
    url: '/home-remedy',
    views: {
      'menuContent': {
        templateUrl: 'templates/home-remedy-list.html',
        controller: 'HomeRemedyListCtrl' 
      }
    }
  })
 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
