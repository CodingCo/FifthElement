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
            controller: 'CmsCtrl'
        }).when('/projectCreator/:edit_id', {
            templateUrl: 'viewsCms/projectCreator.html',
            controller: 'CmsCtrl'
        }).when('/list', {
            templateUrl: 'viewsVisitor/documentList.html',
            controller: 'ListDocumentCtrl'
        }).when('/cmsList', {
            templateUrl: 'viewsCms/cmsDocumentList.html',
            controller: 'CmsListCtrl'
        }).when('/home', {
            templateUrl: 'viewsVisitor/frontPage.html',
            controller: 'FrontPageCtrl'
        }).when('/downloadCreator', {
            templateUrl: 'viewsCms/downloadCreator.html',
            controller: 'CmsDownloadCtrl'
        }).when('/profileCreator', {
            templateUrl: "viewsCms/profileCreator.html",
            controller: "CmsProfileCtrl"
        }).when('/downloads', {
            templateUrl: "viewsVisitor/downloadList.html",
            controller: "DownloadCtrl"
        }).when('/dashboard', {
            templateUrl: "viewsCms/cmsDashboard.html",
            controller: "CmsDashboardCtrl"
        }).otherwise({
            templateUrl: 'viewsVisitor/frontPage.html',
            controller: 'FrontPageCtrl'
        });
    }]);
})();


