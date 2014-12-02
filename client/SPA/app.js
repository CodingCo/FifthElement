'use strict';

(function () {
    var app = angular.module('CMSApp', [
        'ngRoute',
        // ngSanitize
        'CMSApp.controllers',
        'CMSApp.directives',
        'CMSApp.services',
        'CMSApp.factories',
        'CMSApp.filters'
    ]);
    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/justTesting', {
            templateUrl: 'views/justTesting.html',
            controller: 'justTesting'
        }).otherwise({redirectTo: '/justTesting'});

    }]);
})();


