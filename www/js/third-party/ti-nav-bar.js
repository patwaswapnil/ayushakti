angular.module('tiNavBar', ['ionic'])

    .directive('tiTransparentNavBar', function (tiNavBarDelegate, $rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                $element.css({top: 0});
                tiNavBarDelegate.makeNavBarTransparent();

                $rootScope.$on('$stateChangeStart', function (event, toState) {
                    if (toState.name != $attr.stateName) {
                        tiNavBarDelegate.resetNavBar();
                    }
                });

                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    if (toState.name == $attr.stateName) {
                        tiNavBarDelegate.makeNavBarTransparent();
                    }
                });
            }
        }
    })
    .directive('removeShadow', function (tiNavBarDelegate, $rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) { 
                 $rootScope.$on('$stateChangeStart', function (event, toState) {
                    if (toState.name != $attr.stateName) {
                        tiNavBarDelegate.addShadow();
                    }
                });
               tiNavBarDelegate.removeShadow()
            }
        }
    })

    .directive('tiFadeInNavBarOnScroll', function (tiNavBarDelegate, $rootScope) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attr) {
                $element.css({top: 0});
                var targetRgbs = $attr.fadeToRgb.split(',');
                var navbars = tiNavBarDelegate.getNavBars();
                tiNavBarDelegate.makeNavBarTransparent();
                var opacity = 0;

                function onScroll(event) { 

                    if(ionic.Platform.isAndroid()){
                    var scrollTop = event.target.scrollTop;
                    }
                    else {
                    var scrollTop = event.detail.scrollTop;   
                    }
                    if (scrollTop <= 140) {
                        handleNavBarFade(scrollTop);
                    } else {
                        ionic.requestAnimationFrame(function () {
                            tiNavBarDelegate.resetNavBar();
                            tiNavBarDelegate.addShadow();

                        });
                    }
                }

                $element.bind('scroll', onScroll);

                function handleNavBarFade(scrollTop) {
                    // TODO: make less hardcoded numbers and more in params to this directive
                    if (scrollTop <= 20) {
                        opacity = 0;
                        tiNavBarDelegate.removeShadow();

                    } else if (scrollTop > 20 && scrollTop <= 140) {
                        opacity = (scrollTop - 20) / 120;
                    } else {
                        opacity = 1;
                    }
                    setOpacityToNavBar();
                }

                function setOpacityToNavBar() {
                    ionic.requestAnimationFrame(function () {
                        for (var i = 0; i < navbars.length; i++) {
                            var header = angular.element(navbars[i]);
                            header.css({
                                borderColor: 'rgba(' + targetRgbs[0] + ', ' + targetRgbs[1] + ', ' + targetRgbs[2] + ', ' + opacity + ')',
                                backgroundColor: 'rgba(' + targetRgbs[0] + ', ' + targetRgbs[1] + ', ' + targetRgbs[2] + ', ' + opacity + ')',
                                color: 'rgba(' + 255 + ', ' + 255 + ', ' + 255 + ', ' + opacity + ')'
                            })
                        }
                    });
                }

                $rootScope.$on('$stateChangeStart', function (event, toState) {
                    if (toState.name != $attr.stateName) {
                        tiNavBarDelegate.resetNavBar();
                    }
                });

                $rootScope.$on('$stateChangeSuccess', function (event, toState) {
                    if (toState.name == $attr.stateName) {
                        setOpacityToNavBar();
                    }
                });
            }
        }
    })
    .service('tiNavBarDelegate', function ($document) {
        var navbars = $document[0].body.querySelectorAll('.nav-bar-block ion-header-bar');
        return {
            makeNavBarTransparent: function () {
                for (var i = 0; i < navbars.length; i++) {
                    var header = angular.element(navbars[i]);
                    header.css({borderColor: 'transparent', boxShadow: 'none',  backgroundColor: 'transparent', color: 'transparent', backgroundImage: 'background-image: linear-gradient(0deg, transparent , transparent 50%, transparent 50%)'})
                }
            },
            resetNavBar: function () {
                for (var i = 0; i < navbars.length; i++) {
                    var header = angular.element(navbars[i]);
                    header.css({borderColor: '', boxShadow: 'none', backgroundColor: '',  color: '', backgroundImage: 'auto'})
                }
            },
            getNavBars: function () {
                return navbars;
            },
            removeShadow: function () {
                 for (var i = 0; i < navbars.length; i++) {
                    var header = angular.element(navbars[i]);
                    header.css({boxShadow: 'none'})
                }
            },
            addShadow: function () {
                 for (var i = 0; i < navbars.length; i++) {
                    var header = angular.element(navbars[i]);
                    header.css({boxShadow: '0px 1px 4px 0 rgba(0, 0, 0, 0.16)'})
                }
            }
        }
    });