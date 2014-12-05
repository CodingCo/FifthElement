'use strict';

var app = angular.module('CMSApp.factories', []);


app.factory('storageFactory', [function () {
    return {
        saveInLocalStorage: function (key, valueString) {
            window.localStorage.setItem(key, valueString);
        },

        getIfExist: function (key) {
            var projectInWork = window.localStorage.getItem(key);
            if (projectInWork) {
                return projectInWork;
            }
            return false;
        },

        clearStorage: function () {
            window.localStorage.clear();
        }
    }
}]);


app.factory('cacheFactory', [function () {
    var documentCache = [];
    var listDocumentCache = [];

    return {
        getDocumentIfCached: function (documentID) {
            for (var i = 0; i < documentCache.length; ++i) {
                if (documentCache[i].doc_id == documentID) {
                    return documentCache[i];
                }
            }
            return false;
        },

        cacheDocument: function (document) {
            documentCache.push(document);
        },

        getListIfCached: function () {
            if (listDocumentCache.length === 0) {
                return false;
            } else {
                return listDocumentCache;
            }
        },

        cacheList: function (newList) {
            listDocumentCache = newList;
        },

        popElementFromCacheList: function (documentID) {
            for (var i = 0; i < listDocumentCache.length; ++i) {
                if (listDocumentCache[i].doc_id == documentID) {
                    listDocumentCache.splice(i, 1);
                }
            }
        }
    }
}]);

app.factory('docFactory', ['$http', function ($http) {
    return {
        createDocument: function (document, callback) {
            $http.post('/api/createDocument', document).
                success(function (data, status, headers, config) {
                    callback(null, data);
                }).
                error(function (data, status, headers, config) {
                    callback(status);
                });
        },

        getDocument: function (documentID, callback) {
            $http.get('/api/getDocument/' + documentID).
                success(function (data) {
                    callback(data);
                }).error(function (err) {
                    callback(err);
                });
        },

        getAllDocuments: function (callback) {
            $http.get('/api/getAllDocuments')
                .success(function (data) {
                    callback(data);
                })
                .error(function (err) {
                    callback(err);
                });
        },

        deleteDocument: function (documentID, callback) {
            $http.delete('/api/deleteDocument/' + documentID)
                .success(function (data) {
                    callback(data);
                }).error(function (err) {
                    callback(err);
                });
        },

        editDocument: function () {

        }
    }
}]);

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

