/*
 * Conversation editor for Monika After Story Mod of Doki Doki Literature Club
 * This editor is licensed under MIT License https://opensource.org/licenses/MIT
 * Copyright 2018 Aldo Pedro Rangel Montiel (aldoram5)
 */

angular.module('MonikaChatEditorApp', ['ngMaterial'])
        .config(function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);

        })
        .directive('masFileSelect', ['$window', function ($window) {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function (scope, element, attr, ctrl) {
                        var fileReader = new $window.FileReader();

                        fileReader.onload = function () {
                            ctrl.$setViewValue(fileReader.result);
                            if ('fileLoaded' in attr) {
                                scope.$eval(attr['fileLoaded']);
                            }
                        };

                        element.bind('change', function (e) {
                            var fileName = e.target.files[0];
                                fileReader.readAsText(fileName);
                            
                        });
                    }
                };
            }]);