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
        }).when('/list', {
            templateUrl: 'viewsVisitor/documentList.html',
            controller: 'ListDocumentCtrl'
        }).when('/home', {
            templateUrl: 'viewsVisitor/frontPage.html',
            controller: 'FrontPageCtrl'
        }).when('/downloads', {
            templateUrl: "viewsVisitor/downloadList.html",
            controller: "DownloadCtrl"
        }).when('/signIn', {
            templateUrl: "viewsVisitor/login.html"
        }).when('/simon', {
            templateUrl: "profiles/simon.html"
        }).when('/thomas', {
            templateUrl: "profiles/thomas.html"
        }).when('/christopher', {
            templateUrl: "profiles/christopher.html"
        }).when('/robert', {
            templateUrl: "profiles/robert.html"
        }).when('/kasper', {
            templateUrl: "profiles/kasper.html"
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
        }).when('/cmsList', {
            templateUrl: 'viewsCms/cmsDocumentList.html',
            controller: 'CmsListCtrl',
            resolve: {
                auth: function (authInspector) {
                    authInspector.auth();
                }
            }
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
        }).when('/dashboard', {
            templateUrl: "viewsCms/cmsDashboard.html",
            controller: "CmsDashboardCtrl",
            resolve: {
                auth: function (authInspector) {
                    authInspector.auth();
                }
            }
        }).otherwise({
            templateUrl: 'viewsVisitor/frontPage.html',
            controller: 'FrontPageCtrl'
        });
    }]);

    app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    }])

})();


