(function () {
    var app = angular.module('CMSApp.controllers', ['ui.bootstrap']);

    app.controller('CmsProfileCtrl', ['$scope', function ($scope) {


    }]);

    app.controller('DownloadCtrl', ['$scope', 'cacheFactory', 'downloadFactory', function ($scope, cacheFactory, downloadFactory) {
        $scope.downloads = [];

        $scope.refreshDownload = function () {
            $scope.cache = cacheFactory.getDownloadsIfExist();
            if ($scope.cache) {
                $scope.downloads = $scope.cache;
                downloadFactory.getAllDownloads(function (err, downloads) {
                    if (!err) {
                        if ($scope.downloads.length < downloads.length) {
                            $scope.downloads = downloads.data;
                            cacheFactory.setDownloads($scope.downloads);
                        }
                    }
                });
            } else {
                downloadFactory.getAllDownloads(function (err, downloads) {
                    $scope.downloads = downloads.data;
                    cacheFactory.setDownloads($scope.downloads);
                });
            }
        };
        $scope.refreshDownload();

    }]);

    app.controller('CmsDownloadCtrl', ['$scope', 'fileUpload', 'toastr', 'downloadFactory', 'cacheFactory', function ($scope, fileUpload, toastr, downloadFactory, cacheFactory) {
        $scope.download = {};

        $scope.addImage = function () {
            var imageUrl = prompt("Enter URL for image" + " - Preferred size 400x400");
            if (imageUrl) {
                $scope.download.thumbnail = imageUrl;
                toastr.info("image added");
            } else {
                toastr.warning("No image added - add new one")
            }
        };

        $scope.createDownload = function () {
            downloadFactory.createDownload($scope.download, function (err, data) {
                if (err) {
                    toastr.warning("Something went terribly wrong");
                    return;
                }
                $scope.download = {};
                toastr.success("new download added");

            });
        };

        $scope.saveDownload = function () {
            downloadFactory.editDownload($scope.download, function (err, download) {
                if (err) {
                    toastr.warning("Something went terribly wrong");
                    return;
                }
                if (download.err == false) {
                    cacheFactory.replaceDownload(download.data);
                    $scope.download = {};
                    toastr.success("download saved");
                }
            });
        }

    }]);

    app.controller('FrontPageCtrl', ['$scope', 'cacheFactory', 'docFactory', function ($scope, cacheFactory, docFactory) {
        $scope.title = "Hello World";

        $scope.pinnedDocuments = [];

        $scope.documents = [];

        $scope.cache = cacheFactory.getListIfCached();

        $scope.updatePage = function (callback) {
            if ($scope.cache) {
                $scope.documents = $scope.cache;

                docFactory.getAllDocuments(function (data) {
                    if (data.err === undefined) {
                        if (data.length > $scope.cache.length) {
                            cacheFactory.cacheList(data);
                            $scope.documents = data;
                            callback();
                        }
                    }
                });
            } else {
                docFactory.getAllDocuments(function (data) {
                    if (data.err === undefined) {
                        cacheFactory.cacheList(data);
                        $scope.documents = data;
                        callback();
                    }
                });
            }
        };

        var findPinned = function(){
            if($scope.pinnedDocuments){
                for(var i = 0; i < $scope.documents.length; ++i){
                    if($scope.documents[i].pinned === true){
                        $scope.pinnedDocuments.push($scope.documents[i]);
                    }
                }
                console.log($scope.pinnedDocuments);
            }
        }

        $scope.hasImg = function(index){
            if($scope.pinnedDocuments[index].images[0]) return true;
            return false ;
        }

        $scope.updatePage(findPinned);

    }]);

    app.controller('CmsListCtrl', ['$scope', '$location', 'docFactory', 'cacheFactory', 'toastr', 'editFactory', function ($scope, $location, docFactory, cacheFactory, toastr, editFactory) {
        $scope.presentDocument = true;
        $scope.documents = [];
        $scope.cache = cacheFactory.getListIfCached();
        if ($scope.cache) {
            $scope.documents = $scope.cache;
        } else {
            docFactory.getAllDocuments(function (data) {
                if (data.err === undefined) {
                    cacheFactory.cacheList(data);
                    $scope.documents = data;
                }
            });
        }

        $scope.deleteDocument = function (documentID) {
            var verify = documentID == prompt("Type in " + '"' + documentID + '" to delete article');
            if (verify) {
                docFactory.deleteDocument(documentID, function () {
                    cacheFactory.popElementFromCacheList(documentID);
                    $scope.documents = cacheFactory.getListIfCached();
                    toastr.success("Document Deleted");
                });
            } else {
                toastr.warning("Deletion canceled");
            }
        };

        $scope.editDocument = function (documentID) {
            editFactory.setEditObject("document", documentID);
            $location.path('/projectCreator/' + documentID);
        };

        $scope.GoToDocumentEditor = function () {
            $location.path('/projectCreator');
        }

    }]);

    app.controller('ListDocumentCtrl', ['$scope', 'docFactory', 'cacheFactory', function ($scope, docFactory, cacheFactory) {
        $scope.presentDocument = true;
        $scope.documents = [];
        $scope.cache = cacheFactory.getListIfCached();
        $scope.updatePage = function () {
            if ($scope.cache) {
                $scope.documents = $scope.cache;
                docFactory.getAllDocuments(function (data) {
                    if (data.err === undefined) {
                        if (data.length > $scope.cache.length) {
                            cacheFactory.cacheList(data);
                            $scope.documents = data;
                        }
                    }
                });
            } else {
                docFactory.getAllDocuments(function (data) {
                    if (data.err === undefined) {
                        cacheFactory.cacheList(data);
                        $scope.documents = data;
                    } else {
                        $scope.documents = [{title: "No articles found"}];
                        $scope.presentDocument = false;
                    }
                });
            }
        };
        $scope.updatePage();
    }]);

    app.controller('SingleDocCtrl', ['$scope', 'docFactory', '$sce', '$routeParams', 'cacheFactory', function ($scope, docFactory, $sce, $routeParams, cacheFactory) {
        $scope.fullDocument = "";
        $scope.reqDocID = $routeParams.doc_id;
        $scope.cache = cacheFactory.getDocumentIfCached($scope.reqDocID);
        if ($scope.cache) {
            $scope.fullDocument = $scope.cache;
        } else {
            docFactory.getDocument($scope.reqDocID, function (data) {
                data.body = $sce.trustAsHtml(data.body);
                cacheFactory.cacheDocument(data);
                $scope.fullDocument = data;
            });
        }
    }]);

    app.controller('CmsCtrl', ['$scope', 'docFactory', 'toastr', 'storageFactory', 'editFactory', 'cacheFactory', function ($scope, docFactory, toastr, storageFactory, editFactory, cacheFactory) {
        $scope.document = {};
        $scope.document.doc_id = "";
        $scope.document.images = [];
        $scope.document.tags = [];


        if (editFactory.getEditObject("document")) {
            var id = editFactory.getEditObject("document");
            docFactory.getDocument(id, function (data) {
                editFactory.setEditObject("document", data);
                $scope.document = data;
            });
        }

        $scope.createDoc = function () {
            $scope.document.body = document.getElementById('ace-editor').innerHTML;
            docFactory.createDocument($scope.document, function (err, document) {
                if (err) {
                    toastr.warning("Document could not be saved. We are sorry");
                } else {
                    storageFactory.clearStorage();
                    cacheFactory.cacheDocument(document.data);
                    toastr.success("Article uploaded");
                }
            });
        };

        $scope.saveDoc = function () {
            $scope.document.body = document.getElementById('ace-editor').innerHTML;
            docFactory.editDocument($scope.document, function (data) {
                if (data.err == true) {
                    toastr.alert("Something went wrong");
                } else {
                    storageFactory.clearStorage();
                    editFactory.deleteEditObject("document");
                    cacheFactory.popElementFromCacheList($scope.document.doc_id);
                    cacheFactory.cacheDocument(data);
                    toastr.success("Document saved");
                }
            });
        };

    }]);

    app.controller('AceCtrl', ['$scope', 'storageFactory', 'toastr', '$sce', '$routeParams', 'docFactory', 'editFactory', function ($scope, storageFactory, toastr, $sce, $routeParams, docFactory, editFactory) {
        $scope.contentField = "";
        $scope.bold = false;
        $scope.italic = false;
        $scope.underline = false;

        $scope.formats = [
            'bold',
            'italic',
            'underline',
            'justifyLeft',
            'justifyCenter',
            'justifyRight',
            'insertHorizontalRule',
            'insertHTML',
            'heading',
            'insertOrderedList',
            'redo',
            'undo',
            'formatBlock',
            'insertImage',
            'removeFormat'
        ];

        var map = {};
        var storageKey = "project";


        $scope.onLoadGetProject = function () {
            var storedProject = storageFactory.getIfExist(storageKey);
            if (storedProject) {
                $scope.contentField = $sce.trustAsHtml(storedProject);
                toastr.info("Previous article loaded: " + storedProject);
            }
        };
        $scope.onLoadGetProject();

        $scope.saveDocument = function () {
            var projectData = document.getElementById('ace-editor').innerHTML;
            storageFactory.saveInLocalStorage(storageKey, projectData);
            toastr.success("document saved");
        };

        document.getElementById('ace-editor').addEventListener('keydown', function (event) {
            var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
            map[event.keyCode] = true;
            if (map[91] && map[85]) {
                //  $scope.underline = !$scope.underline;
                // document.execCommand('underline', false, null);
            }
            if (chCode === 13) {
                //alert(chCode);
                //event.preventDefault();
                //document.execCommand('insertHTML', false, '<br/>');
            } // Enter
        });
        document.getElementById('ace-editor').addEventListener('keyup', function (event) {
            if (map[91] && map[85]) {
                map[91] = false;
                map[85] = false;
            }
        });


        $scope.textFormat = function (cmd) {
            var elementInFocus = document.activeElement;
            var editorElement = document.getElementById('ace-editor');
            if (elementInFocus != editorElement) {
                editorElement.focus();
            }
            if ($scope.formats.indexOf(cmd) != -1) {
                document.execCommand(cmd, false, null);
            }
        };

        $scope.codeBlock = function () {
            document.execCommand('insertHTML', false, '<code> code </code> &nbsp');
        };

        $scope.insertImage = function (imgName, url) {
            var imageUrl = prompt('enter image url');
            var img = '<img src="' + imageUrl + '" ' + 'class="img-responsive">';
            document.execCommand('insertHTML', false, img);
        };

        $scope.textTypes = function (type) {
            document.execCommand('formatBlock', false, type);
        };
    }]);

    app.controller('AppCtrl', function ($scope, $http, $window, $location) {
        function url_base64_decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
        }

        $scope.title = "Semester Project";
        $scope.username = "";
        $scope.isAuthenticated = false;
        $scope.isAdmin = false;
        $scope.isUser = false;
        $scope.message = '';
        $scope.error = null;

        //login
        $scope.submit = function () {
            $http
                .post('/authenticate', $scope.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $scope.isAuthenticated = true;
                    var encodedProfile = data.token.split('.')[1];
                    var profile = JSON.parse(url_base64_decode(encodedProfile));
                    $scope.username = profile.username;
                    $scope.isAdmin = profile.role == "admin";
                    $scope.isUser = !$scope.isAdmin;
                    $scope.error = null;
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    $scope.isAuthenticated = false;

                    $scope.error = 'You failed to login. Invalid User or Password';
                });
        };

        //logout
        $scope.logout = function () {
            $scope.isAuthenticated = false;
            $scope.isAdmin = false;
            $scope.isUser = false;
            delete $window.sessionStorage.token;
            $location.path("/view1");
        }
    });
})();









