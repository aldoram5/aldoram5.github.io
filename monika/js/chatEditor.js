/*
 * Conversation editor for Monika After Story Mod of Doki Doki Literature Club
 * This editor is licensed under MIT License https://opensource.org/licenses/MIT
 * Copyright 2018 Aldo Pedro Rangel Montiel (aldoram5)
 */

angular.module('MonikaChatEditorApp')
        .controller('EditorCtrl', editorCtrl);

editorCtrl.$inject = ['$scope', '$mdDialog'];

function editorCtrl($scope, $mdDialog) {

    $scope.conversation = {
        verb: "",
        adjective: "",
        subject: "",
        referingNoun: "",
        nextNode: "",
        nodes: []
    };
    $scope.coversationName = "chat";
    $scope.currentId = 0;
    $scope.actionTypes = ["check", "store"];
    $scope.nodeInputTypes = ["multi", "text"];
    $scope.url = null;

    $scope.addNode = function (event) {
        $scope.currentId++;
        var node = {
            id: "N" + $scope.currentId,
            initialAction: null,
            finalAction: null,
            inputType: null,
            nextNode: "",
            reaction: "1a",
            display_text: "",
            options: []

        };
        $scope.conversation.nodes.push(node);
        if ($scope.conversation.nodes.length == 1) {
            $scope.conversation.nextNode = node.id;
        }
    };

    $scope.exportJSON = function (event) {
        if ($scope.url != null) {
            $scope.url.revokeObjectURL();
        }
        var jsonToExport = angular.toJson($scope.conversation);
        var blob = new Blob([jsonToExport], {type: 'text/plain'});
        $scope.url = (window.URL || window.webkitURL).createObjectURL(blob);
        var exportLink = angular.element('<a></a>');
        exportLink.attr('href', $scope.url);
        exportLink.attr('download', 'monika-'+$scope.coversationName +'.json');
        exportLink[0].click();
    };

    $scope.createAction = function () {
        return {type: "", key: "", value: ""};
    };

    $scope.addFinalActionToNode = function (event, node) {
        node.finalAction = $scope.createAction();

    };

    $scope.addInitialActionToNode = function (event, node) {
        node.initialAction = $scope.createAction();

    };
    $scope.removeFinalActionToNode = function (event, node) {
        node.finalAction = null;

    };

    $scope.removeInitialActionToNode = function (event, node) {
        node.initialAction = null;

    };

    $scope.addMenuOptionToNode = function (event, node) {
        node.options.push({"text": "", "nextNode": null});
    };

    $scope.removeFinalActionToNode = function (event, node, index) {
        node.options.splice(index, 1);
    };

    $scope.init = function () {

    };
    $scope.init();
}


