/*
 * Conversation editor for Monika After Story Mod of Doki Doki Literature Club
 * This editor is licensed under MIT License https://opensource.org/licenses/MIT
 * Copyright 2018 Aldo Pedro Rangel Montiel (aldoram5)
 */

angular.module('MonikaChatEditorApp', ['ngMaterial'])
        .config(function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);

        });