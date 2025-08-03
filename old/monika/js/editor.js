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


    var defaultOptions = {
        isSource: true,
        isTarget: true,
        connector: ["Straight"]};
    var allConnections = ["Right","Left", "Bottom", "Top"]

    $scope.addStatement = function () {
    };
    $scope.init = function () {
        jsPlumb.ready(function () {

            jsPlumb.setContainer("diagramContainer");
            jsPlumb.draggable("start_node");
            jsPlumb.draggable("question1");
            jsPlumb.addEndpoint("start_node", {
                anchor: "Bottom"
            }, defaultOptions);
            jsPlumb.addEndpoint("option1_1", {
                anchors: ["Right","Left", "Bottom", "Top"]
            }, defaultOptions);
            jsPlumb.addEndpoint("option1_2", {
                anchors: ["Right","Left", "Bottom", "Top"]
            }, defaultOptions);
            jsPlumb.addEndpoint("question1", {
                anchors: ["Right","Left", "Bottom", "Top"]
            }, defaultOptions);
            
            jsPlumb.draggable("question1");
            jsPlumb.draggable("option1_1");
            jsPlumb.draggable("option1_2");
            jsPlumb.connect({
                connector: ["Straight"],
                source: "question1",
                target: "option1_2",
                anchor: ["Bottom", "Top"],
                endpoint: "Dot"
            });
            jsPlumb.connect({
                connector: ["Straight"],
                source: "question1",
                target: "option1_1",
                anchor: ["Left", "Right"],
                endpoint: "Dot"
            });
        });
    };
    $scope.init();
}