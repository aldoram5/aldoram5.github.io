/*
 * Conversation editor for Monika After Story Mod of Doki Doki Literature Club
 * This editor is licensed under MIT License https://opensource.org/licenses/MIT
 * Copyright 2018 Aldo Pedro Rangel Montiel (aldoram5)
 */

angular.module('MonikaChatEditorApp')
        .controller('EditorCtrl', editorCtrl);

editorCtrl.$inject = ['$scope'];

function editorCtrl($scope) {

    $scope.conversation = {verb: "", adjective: "", subject: "", refering_noun: "",
        priority: 0, nodes: []};
    $scope.currentNode = {text: "", type: "text", reaction: "1a", action: "None"};

    $scope.init = function () {
        
    };
    $scope.init();
}


