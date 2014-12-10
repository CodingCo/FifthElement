'use strict';

var app = angular.module('CMSApp.factories', []);


app.factory('editFactory', [function () {
    /*
     *  Map: keys is the map: download, profile, document
     * */
    var editObjects = {};
    var currentDoc = {};
    return {
        getEditObject: function (key) {
            if (editObjects[key]) {
                currentDoc = editObjects[key];
                return editObjects[key];
            } else {
                return false;
            }
        },

        setEditObject: function (key, value) {
            editObjects[key] = value;
        },

        deleteEditObject: function (key) {
            return delete editObjects[key];
        }
    }
}]);

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
    var downloadsCache = [];

    return {

        getPinnedDocumentsIfExist: function () {
            var documents = [];
            for (var i = 0; i < listDocumentCache.length; ++i) {
                if (listDocumentCache[i].pinned === true) {
                    documents.push(listDocumentCache[i]);
                }
            }
            return documents.length > 0 ? documents : false;
        },

        replaceDownload: function (download) {
            for (var i = 0; i < downloadsCache.length; ++i) {
                if (download.download_id == downloadsCache[i].download_id) {
                    downloadsCache[i] = download;
                }
            }
        },

        setDownloads: function (downloads) {
            downloadsCache = downloads;
        },

        getDownloadsIfExist: function () {
            if (downloadsCache.length > 0) {
                return downloadsCache;
            }
            return false;
        },

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

app.factory('downloadFactory', ['$http', function ($http) {
    return {
        createDownload: function (download, callback) {
            $http.post('/api/createDownload', download).
                success(function (data) {
                    callback(undefined, data);
                }).
                error(function (err) {
                    callback(err);
                });
        },
        editDownload: function (download, callback) {
            $http.put('/api/editDownload', download)
                .success(function (data) {
                    callback(undefined, data);
                }).error(function (err) {
                    callback(err);
                });
        },
        getAllDownloads: function (callback) {
            $http.get('/api/getAllDownloads')
                .success(function (data) {
                    callback(undefined, data)
                }).error(function (err) {
                    callback(err);
                });
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

        editDocument: function (document, callback) {
            $http.put('/api/editDocument', document)
                .success(function (data) {
                    callback(data);
                }).error(function (err) {
                    callback(err);
                });
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

