(function () {
    var app = angular.module('CMSApp.controllers', ['ui.bootstrap']);

    app.controller('CmsProfileCtrl', ['$scope', function ($scope) {


    }]);

    app.controller('CmsDownloadCtrl', ['$scope', function ($scope) {
        var imgSrc = prompt("enter url");
        var image = new Image();
        image.url = imgSrc;
        imgSrc = "http://www.online-image-editor.com/styles/2013/images/example_image.png";
        console.log(image);
        $scope.img = imgSrc;

    }]);

    app.controller('FrontPageController', ['$scope', function ($scope) {
        $scope.title = "Hello World";
    }]);

    app.controller('CmsListController', ['$scope', '$location', 'docFactory', 'cacheFactory', 'toastr', 'editFactory', function ($scope, $location, docFactory, cacheFactory, toastr, editFactory) {
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

    app.controller('CmsController', ['$scope', 'docFactory', 'toastr', 'storageFactory', 'editFactory', function ($scope, docFactory, toastr, storageFactory, editFactory) {
        $scope.content = "";
        $scope.abstract = "";
        $scope.title = "";
        $scope.subtitle = "";
        $scope.author = "";
        $scope.images = [];
        $scope.tags = [];

        var edit = editFactory.getEditObject("document");
        if (edit) {
            docFactory.getDocument(edit, function (data) {
                $scope.title = data.title;
            });
        }


        $scope.createDoc = function () {
            $scope.content = document.getElementById('ace-editor').innerHTML;
            docFactory.createDocument({
                title: $scope.title,
                subtitle: $scope.subtitle,
                author: $scope.author,
                abstract: $scope.abstract,
                body: $scope.content,
                images: [],
                tags: [],
                comments: []
            }, function (err, data) {
                if (err) {
                    toastr.options.closeButton = true;
                    toastr.warning("Document could not be saved. We are sorry");
                    return;
                }
                storageFactory.clearStorage();
                toastr.success("Article uploaded");
            });
        };


        //
        $scope.saveDoc = function () {
            if ($scope.editID != undefined) {
                $scope.content = document.getElementById('ace-editor').innerHTML;
                docFactory.editDocument({
                    doc_id: "",
                    title: $scope.title,
                    subtitle: $scope.subtitle,
                    author: $scope.author,
                    abstract: $scope.abstract,
                    body: $scope.content,
                    images: [],
                    tags: [],
                    comments: []
                }, function (data) {
                    if (data.err == true) {
                        alert("shiit");
                        return;
                    }
                    alert("It's okay");

                });
            } else {
                alert("undefined");

            }
        };

    }]);

    app.controller('AceController', ['$scope', 'storageFactory', 'toastr', '$sce', '$routeParams', 'docFactory', function ($scope, storageFactory, toastr, $sce, $routeParams, docFactory) {

        $scope.editingInitiate = function () {
            $scope.toBeEditedID = $routeParams.edit_id;
            if ($scope.toBeEditedID) {
                docFactory.getDocument($scope.toBeEditedID, function (document) {
                    document.body = $sce.trustAsHtml(document.body);
                    $scope.content = document.body;

                });
            }
        };
        $scope.editingInitiate();

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
        $scope.bold = false;
        $scope.italic = false;
        $scope.underline = false;
        var map = {};


        var storageKey = "project";
        $scope.onLoadGetProject = function () {
            var storedProject = storageFactory.getIfExist(storageKey);
            if (storedProject) {
                $scope.content = $sce.trustAsHtml(storedProject);
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









