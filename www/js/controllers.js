angular.module('ayushakti.controllers', [])

.controller('AppCtrl',['$scope', '$ionicModal', '$timeout', '$ionicSideMenuDelegate', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate) {
 
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
   $scope.toggleLeftSideMenu = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}])
 
.controller('HomeCtrl',['$scope', '$stateParams', function($scope, $stateParams) {
}])
.controller('VideosCtrl',['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
      $scope.videos = [];
    $scope.searchFor = $stateParams.searchParam;
    $scope.youtubeParams = {
      key: 'AIzaSyBAsHcjLchsoINieT-XJ6PeEYPO8QsRdvc',
      type: 'video',
      q: $scope.searchFor,
      maxResults: '50',
      part: 'snippet', 
      order: 'date',
      channelId: 'UCA6BceCsEB35u49xIdFE1ig',
    }

    $http.get('https://www.googleapis.com/youtube/v3/search', {params:$scope.youtubeParams}).success(function(response){
      $scope.videos = response.items;
    });

}]);
// .controller('Ctrl',['$scope', '$stateParams', function($scope, $stateParams) {
// }]);