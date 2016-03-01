angular.module('ayushakti.services', [])

.factory('Loader', ['$ionicLoading', '$timeout', function($ionicLoading, $timeout) {

        var LOADERAPI = {

            showLoading: function(text) {
                if (text) {
                    $ionicLoading.show({
                        template: text
                    });
                } else {
                    $ionicLoading.show();
                }
            },

            hideLoading: function() {
                $ionicLoading.hide();
            },

            toggleLoadingWithMessage: function(text, timeout) {
                var self = this;

                self.showLoading(text);

                $timeout(function() {
                    self.hideLoading();
                }, timeout || 3000);
            }

        };
        return LOADERAPI;
    }])
.factory('LSFactory', [function() {

        var LSAPI = {
            clear: function() {
                return localStorage.clear();
            },
            get: function(key) {
                return JSON.parse(localStorage.getItem(key));
            },
            set: function(key, data) {
                return localStorage.setItem(key, JSON.stringify(data));
            },
            setArray: function(key, data) {
                return localStorage.setItem(key, JSON.stringify([data]));
            },
            delete: function(key) {
                return localStorage.removeItem(key);
            },
            getAll: function() {
            }
        };
        return LSAPI;
}])
.factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){
  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();    
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){
 
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("went online");
          });
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
          });
 
        }
        else {
 
          window.addEventListener("online", function(e) {
            console.log("went online");
          }, false);    
 
          window.addEventListener("offline", function(e) {
            console.log("went offline");
          }, false);  
        }       
    }
  }
})