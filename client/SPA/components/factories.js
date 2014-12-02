'use strict';

var app = angular.module('CMSApp.factories', []);
app.factory('authInterceptor', function ($rootScope, $q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (rejection) {
            if (rejection.status === 401) {
                // handle the case where the user is not authenticated
            }
            return $q.reject(rejection);
        }
    };
});

app.factory('docFactory', ['$http', function ($http) {
    return {
        saveDoc: function (documentation, callback) {
            $http.post('/api/createDocument', documentation).
                success(function (data, status, headers, config) {
                    callback(null, data);
                }).
                error(function (data, status, headers, config) {
                    callback(status);
                });

        },

        getDocs: function (searchTitle, callback) {
            $http.get('/api/getDocument/' + searchTitle).
                success(function (data) {
                    callback(data);
                }).error(function (err) {
                    callback(err);
                });
        }
    }
}]);



