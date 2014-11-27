'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('CMSApp', [
    'ngRoute',
    'CMSApp.controllers',
    'CMSApp.directives',
    'CMSApp.services',
    'CMSApp.factories',
    'CMSApp.filters',
]);




app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/firstViewAdded'});
}]);

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});