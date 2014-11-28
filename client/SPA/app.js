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

app.controller('AppController', ['$scope','$sce', function ($scope, $sce) {
    $scope.content = "<strong>hej</strong>";
        $scope.dhtml = function () {
            return $sce.trustAsHtml($scope.content);
        }
}]);
