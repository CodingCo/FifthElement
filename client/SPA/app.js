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
            controller: 'CmsCtrl',
            resolve: {
                auth: function (authInspector) {
                    authInspector.auth();
                }
            }
        }).when('/projectCreator/:edit_id', {
            templateUrl: 'viewsCms/projectCreator.html',
            controller: 'CmsCtrl',
            resolve: {
                auth: function (authInspector) {
                    authInspector.auth();
                }
            }
        }).when('/list', {
            templateUrl: 'viewsVisitor/documentList.html',
            controller: 'ListDocumentCtrl'
        }).when('/cmsList', {
            templateUrl: 'viewsCms/cmsDocumentList.html',
            controller: 'CmsListCtrl',
            resolve: {
                auth: function (authInspector) {
                    authInspector.auth();
                }
            }
        }).when('/home', {
            templateUrl: 'viewsVisitor/frontPage.html',
            controller: 'FrontPageCtrl'
        }).when('/downloadCreator', {
            templateUrl: 'viewsCms/downloadCreator.html',
            controller: 'CmsDownloadCtrl',
            resolve: {
                auth: function (authInspector) {
                    authInspector.auth();
                }
            }
        }).when('/profileCreator', {
            templateUrl: "viewsCms/profileCreator.html",
            controller: "CmsProfileCtrl",
            resolve: {
                auth: function (authInspector) {
                    authInspector.auth();
                }
            }
        }).when('/downloads', {
            templateUrl: "viewsVisitor/downloadList.html",
            controller: "DownloadCtrl"
        }).when('/dashboard', {
            templateUrl: "viewsCms/cmsDashboard.html",
            controller: "CmsDashboardCtrl",
            resolve: {
                auth: function (authInspector) {
                    authInspector.auth();
                }
            }
        }).when('/signIn', {
            templateUrl: "viewsVisitor/login.html"
        }).otherwise({
            templateUrl: 'viewsVisitor/frontPage.html',
            controller: 'FrontPageCtrl'
        });
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])

})();


