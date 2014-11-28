'use strict';

// Declare app level module which depends on views, and components
angular.module('CMSApp', [
    'ngRoute',
    'textAngular',
    'CMSApp.controllers',
    'CMSApp.directives',
    'CMSApp.services',
    'CMSApp.factories',
    'CMSApp.filters' // Remember to add views when that's relevant
]).config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/justTesting',{
        templateUrl: 'views/justTesting.html',
        controller: 'justTesting'
    }).otherwise({redirectTo: '/justTesting'});



}]);


