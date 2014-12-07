'use strict';

(function () {
    var app = angular.module('CMSApp', [
        'ngRoute',
        'ngSanitize',
        'toastr',
        'CMSApp.controllers',
        'CMSApp.directives',
        'CMSApp.services',
        'CMSApp.factories',
        'CMSApp.filters'
    ]);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/viewDocument/:doc_id', {
            templateUrl: 'viewsVisitor/documentTemplate.html',
            controller: 'SingleDocCtrl'
        }).when('/projectCreator', {
            templateUrl: 'viewsCms/projectCreator.html',
            controller: 'CmsController'
        }).when('/projectCreator/:edit_id',{
            templateUrl: 'viewsCms/projectCreator.html',
            controller: 'CmsController'
        }).when('/list', {
            templateUrl: 'viewsVisitor/documentList.html',
            controller: 'ListDocumentCtrl'
        }).when('/cmsList', {
            templateUrl: 'viewsCms/cmsDocumentList.html',
            controller: 'CmsListController'
        }).when('/home', {
            templateUrl: 'viewsVisitor/frontPage.html',
            controller: 'FrontPageController'
        }).otherwise({
            templateUrl: 'viewsVisitor/frontPage.html',
            controller: 'FrontPageController'
        });
    }]);
})();


