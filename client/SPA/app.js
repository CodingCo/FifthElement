'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('CMSApp', [
    'ngRoute',
    'ngSanitize',
    'CMSApp.controllers',
    'CMSApp.directives',
    'CMSApp.services',
    'CMSApp.factories',
    'CMSApp.filters' // Remember to add views when that's relevant
]);
app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/justTesting', {
        templateUrl: 'views/justTesting.html',
        controller: 'justTesting'
    }).otherwise({redirectTo: '/justTesting'});

}]);

app.controller('AppController', ['$scope', '$sce', function ($scope, $sce) {
    $scope.content = "";

    var textFormatting = ['bold', 'italic'];
    var textJustifying = ['justifyCenter','insertHorizontalRule'];
    var textCommands = ['redo', 'undo'];

    var isHeading = false;

    $scope.formatText = function (item) {
        var cmd = item;
        if (textFormatting.indexOf(cmd) != -1) {
            document.execCommand(cmd, false, null);
        }

        if (textJustifying.indexOf(cmd) != -1) {
            document.execCommand(cmd, false, null);
        }

        if (textCommands.indexOf(cmd) != -1) {
            document.execCommand(cmd, false, null);
        }


        switch (cmd) {
            case 'h1':
            case 'h2':
            case 'h3':
                console.log(isHeading);
                if (isHeading === false) {
                    isHeading = true;
                    document.execCommand('formatBlock', false, '<' + cmd + '>');
                    console.log("dshkjfhsdkjfhdsjkfhjdskhfkjds");
                } else {
                    cmd = "p";
                    console.log("hello");
                    document.execCommand('formatBlock', false, '<' + cmd + '>');
                    isHeading = false;
                }
                break;
            case  'insertHTML':
                console.log(cmd);
                document.execCommand(cmd, false, '<code>' + 'code here' + '</code>' + 'p');
                break;
            case 'insertImage':
                document.execCommand(cmd, false, 'http://www.stunningmesh.com/wp-content/uploads/2011/06/stunningmesh-ipad-wallpapers-61-small.jpg');
        }


    };


    $scope.dhtml = function () {
        return $sce.trustAsHtml($scope.content);
    };

}]);
