'use strict';

// Declare app level module which depends on views, and components
angular.module('CMSApp', [
    'ngRoute',
    'CMSApp.controllers',
    'CMSApp.directives',
    'CMSApp.services',
    'CMSApp.factories',
    'CMSApp.filters' // Remember to add views
]).

controller('DocController', ["$scope", function ($scope) {
    $scope.title = "Create Documentation";
}]);
