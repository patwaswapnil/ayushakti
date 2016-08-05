angular.module('ayushakti.controllers', [])

    .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$ionicSideMenuDelegate', '$http', 'Loader', '$cordovaInAppBrowser',
        function ($scope, $ionicModal, $timeout, $ionicSideMenuDelegate, $http, Loader, $cordovaInAppBrowser) {

            // Form data for the login modal
            $scope.loginData = {};

            // Create the login modal that we will use later
            $ionicModal.fromTemplateUrl('templates/login.html', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            // Triggered in the login modal to close it
            $scope.closeLogin = function () {
                $scope.modal.hide();
            };

            // Open the login modal
            $scope.login = function () {
                $scope.modal.show();
            };
            $scope.doLogin = function () {
                console.log('Doing login', $scope.loginData);

                $timeout(function () {
                    $scope.closeLogin();
                }, 1000);
            };
            $scope.toggleLeftSideMenu = function () {
                $ionicSideMenuDelegate.toggleLeft();
            };
            $scope.openLink = function (link, e) {
                e.preventDefault();
                var options = { location: 'yes', clearcache: 'yes', toolbar: 'no', closebuttoncaption: 'DONE?' };
                $cordovaInAppBrowser.open(link, '_blank', options);
            };
            $scope.getTextContent = function (id) {
                Loader.show();
                $http.get(domain + id).then(function (response) {
                    $scope.pageContent = response.data;
                    Loader.hide();
                }, function (error) {
                    console.log(error);
                    Loader.hide();
                })
            }
        }
    ])

    .controller('HomeCtrl', ['$scope', '$stateParams', function ($scope, $stateParams) {

    }])
    .controller('VideosCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
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

        $http.get('https://www.googleapis.com/youtube/v3/search', { params: $scope.youtubeParams }).success(function (response) {
            $scope.videos = response.items;
        });

    }])
    .controller('aboutCtrl', ['$scope', '$stateParams', '$http', '$sce', function ($scope, $stateParams, $http, $sce) {
        $scope.getTextContent($stateParams.id);
    }])
    .controller('ServicesCtrl', ['$scope', '$stateParams', '$http', '$sce', function ($scope, $stateParams, $http, $sce) {
        $scope.getTextContent($stateParams.id);
    }])
    .controller('ContactCtrl', ['$scope', '$stateParams', '$http', '$sce', 'Loader', function ($scope, $stateParams, $http, $sce, Loader) {
        $scope.getTextContent(47);
        $scope.message = {};
        $scope.sendMail = function (data) {
            Loader.show();
            $http.get("http://ayushakti.cruxservers.in/?action=contactUs&name=" + data.fName + ' ' + data.lName + "&email=" + data.email + "&phone=" + data.phone + "&message=" + data.message).then(function (response) {
                Loader.toast(response.data.msg);
                Loader.hide();
                $scope.message = { fName: '', lName: '', email: '', phone: '', message: '' };
                $scope.$digest;
            }, function (response) {
                console.log(response);
                Loader.hide();
            })
        }
    }])
    .controller('NewsLetterCtrl', ['$scope', '$stateParams', '$http', '$sce', 'Loader', function ($scope, $stateParams, $http, $sce, Loader) {
        $scope.newsletter = {};

        $scope.newsLetterSubscribe = function (data) {
            Loader.show();
            $http.get("http://ayushakti.cruxservers.in/?action=newsLetter&name=" + data.fName + ' ' + data.lName + "&email=" + data.email + "&phone=" + data.phone + "&message=" + data.message).then(function (response) {
                Loader.toast(response.data.msg);
                Loader.hide();
                $scope.newsletter = { fName: '', lName: '', email: '' };
                $scope.$digest;
            }, function (response) {
                console.log(response);
                Loader.hide();

            })

        }
    }])
    .controller('BookAppointmentCtrl', ['$scope', '$stateParams', '$http', '$sce', 'Loader', function ($scope, $stateParams, $http, $sce, Loader) {
        $scope.appointment = {};

        $scope.bookAppointment = function (data) {
            Loader.show();
            $http.get("http://ayushakti.cruxservers.in/?action=bookAppointment&name=" + data.fName + ' ' + data.lName + "&email=" + data.email + "&phone=" + data.phone + "&location=" + data.location + "&message=" + data.message).then(function (response) {
                Loader.toast(response.data.msg);
                Loader.hide();
                $scope.appointment = { fName: '', lName: '', location: '', email: '', message: '' };
                $scope.$digest;
            }, function (response) {
                console.log(response);
                Loader.hide();

            })

        }
    }])
    .controller('CenterCtrl', ['$scope', '$stateParams', '$http', '$sce', 'Loader', function ($scope, $stateParams, $http, $sce, Loader) {
        $scope.appointment = {};
        var recordCount = 0;
        $scope.showCity = false;
        $scope.showLocation = false;
        $scope.getLocationData = function () {
            Loader.show();
            $http.get("http://ayushakti.cruxservers.in/?action=getCategories&id=1").then(function (response) {
                Loader.hide();
                $scope.locations = response.data;
            }, function (response) {
                console.log(response);
                Loader.hide();
            })
        };
        $scope.getLocationData();
        $scope.checkNLoadAdd = function (id, category) { 
            var itemFound = true;
            angular.forEach($scope.locations, function (element, index) {
                if (element.parent == id) {
                    itemFound = false;
                }
            }); 
            if (itemFound && id) {
                Loader.show();
                $http.get('http://ayushakti.cruxservers.in/?action=getCatPosts&cid=' + id).then(function (response) {
                    $scope.centers = response.data;
                    Loader.hide();
                }, function (error) {
                    console.log(error);
                    Loader.hide();
                })
            }
        }
    }])
    .controller('DiseasesListCtrl', ['$scope', '$stateParams', '$http', '$sce', 'Loader', function ($scope, $stateParams, $http, $sce, Loader) {
        $scope.getDeseases = function () {
            Loader.show();
            $http.get("http://ayushakti.cruxservers.in/?action=getCategories&id=15").then(function (response) {
                Loader.hide();
                $scope.diseases = response.data;
            }, function (response) {
                console.log(response);
                Loader.hide();
            })
        };
        $scope.getDeseases();
    }])
    .controller('DiseasesInfoCtrl', ['$scope', '$stateParams', '$http', '$sce', 'Loader', function ($scope, $stateParams, $http, $sce, Loader) {
        $scope.catId = $stateParams.catId;
        $scope.getDeseasesInfo = function () {
            Loader.show();
            $http.get("http://ayushakti.cruxservers.in/?action=getCategories&id=" + $scope.catId).then(function (response) {
                Loader.hide();
                $scope.diseasesInfo = response.data;
            }, function (response) {
                console.log(response);
                Loader.hide();
            })
        };
        $scope.getDeseasesInfo();
    }])
    .controller('DiseasesCatCtrl', ['$scope', '$stateParams', '$http', '$sce', 'Loader', function ($scope, $stateParams, $http, $sce, Loader) {
        $scope.catId = $stateParams.catId;
        $scope.getDeseasesCat = function () {
            Loader.show();
            $http.get("http://ayushakti.cruxservers.in/?action=getCategories&id=" + $scope.catId).then(function (response) {
                Loader.hide();
                $scope.diseasesCat = response.data;
            }, function (response) {
                console.log(response);
                Loader.hide();
            })
        };
        $scope.getDeseasesCat();
    }])
    .controller('packageInfoCtrl', ['$scope', '$stateParams', '$http', '$sce', 'Loader', function ($scope, $stateParams, $http, $sce, Loader) {
        $scope.catId = $stateParams.catId;
        $scope.termId = $stateParams.termId;
        console.log($scope.termId)
        $scope.getDeseasesInfo = function () {
            Loader.show();
            $http.get("http://ayushakti.cruxservers.in/?action=getCategories&id=" + $scope.catId).then(function (response) {
                Loader.hide();
                $scope.diseasesInfo = response.data;
            }, function (error) {
                console.log(error);
                Loader.hide();
            })
        };
        $scope.getDeseasesInfo();
    }])
    .controller('UpdatesCtrl', ['$scope', '$stateParams', '$http', '$sce', 'Loader', function ($scope, $stateParams, $http, $sce, Loader) {

        Loader.show();
        $http.get("http://ayushakti.cruxservers.in/?action=getUpdates").then(function (response) {
            Loader.hide();
            $scope.updates = response.data;
        }, function (error) {
            console.log(error);
            Loader.hide();
        })

    }])
    .filter('toTrust', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }])
    // .controller('Ctrl',['$scope', '$stateParams', function($scope, $stateParams) {
    // }]);
