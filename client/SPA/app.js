'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('CMSApp', []);


app.controller('DocController', ["$scope", function ($scope) {
    $scope.title = "Create Documentation";
}]);
