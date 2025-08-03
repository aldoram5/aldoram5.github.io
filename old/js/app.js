angular.module('CrimsonRGamesSiteApp', [])
        .controller('MainController', function ($scope, $http) {
            $scope.toggleMenu = function () {
                var menu = angular.element(document.querySelector('#toggle'));
                if (menu.hasClass("triggeredToggle")) {
                    menu.removeClass("triggeredToggle");
                } else {
                    menu.addClass('triggeredToggle');
                }
            };
            $scope.$on("$locationChangeStart", function (event, next, current) {

                var el, elId;

                if (next.indexOf("#") > -1) {
                    elId = next.split("#")[1];
                    el = document.getElementById(elId);
                    if (el) {
                        // el.scrollIntoView(); do not think we need it
                        window.location.hash = "#" + elId;
                        event.preventDefault();
                    }
                }
            });
        });



