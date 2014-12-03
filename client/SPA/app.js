'use strict';

(function () {
    var app = angular.module('CMSApp', [
        'ngRoute',
        'ngSanitize',
        'CMSApp.controllers',
        'CMSApp.directives',
        'CMSApp.services',
        'CMSApp.factories',
        'CMSApp.filters'
    ]);
    app.config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/viewProjectTemplate', {
            templateUrl: 'viewsVisitor/projectTemplate.html',
            controller: 'SingleDocCtrl'
        }).when('/projectCreator', {
            templateUrl: 'viewsCms/projectCreator.html',
            controller: 'CmsController'
        }).when('/list',{
            templateUrl:'viewsVisitor/listDocuments.html',
            controller:'ListDocumentCtrl'
        }).otherwise({
            templateUrl: 'viewsVisitor/projectTemplate.html',
            controller: 'SingleDocCtrl'
        });
    }]);
})();


