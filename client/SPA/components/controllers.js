(function () {
    var app = angular.module('CMSApp.controllers', []);


    app.controller('SingleDocCtrl', ['$scope', 'docFactory', '$sce', function ($scope, docFactory, $sce) {
        $scope.doc = {};

        docFactory.getDocs(71, function (data) {
            var hej = dhtml(data.body);
            data.body = hej;
            $scope.doc = data;
        });

        function dhtml(data) {
            console.log(data);
            return $sce.trustAsHtml(data);
        }

    }]);


    app.controller('CmsController', ['$scope', 'docFactory', function ($scope, docFactory) {
        // Doc information
        $scope.content = "";
        $scope.abstract = "";
        $scope.title = "";
        $scope.subtitle = "";
        $scope.author = "";
        $scope.images = [];
        $scope.tags = [];

        $scope.saveDoc = function () {
            $scope.content = document.getElementById('ace-editor').innerHTML;

            docFactory.saveDoc({
                doc_id: 1098374,
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
                    alert("We could not connect to the service");
                    return;
                }
                console.log(data);
                alert("Something happend");
            })
        };
    }]);


    app.controller('AceController', ['$scope', function ($scope) {
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
        document.getElementById('ace-editor').addEventListener('keydown', function (event) {
            var chCode = ('charCode' in event) ? event.charCode : event.keyCode;
            map[event.keyCode] = true;
            if (map[91] && map[85]) {
                document.execCommand('underline', false, null);
            }
            if (chCode === 13) {
                //alert(chCode);
                //event.preventDefault();
                //document.execCommand('insertHTML', false, '<br/>');
            } // Enter


        });

        $scope.pressed = false;
        $scope.textFormat = function (cmd) {
            var elementInFocus = document.activeElement;
            var editorElement = document.getElementById('ace-editor');
            if (elementInFocus != editorElement) {
                editorElement.focus();
                editorElement.style.outline = "none";
            } else {


            }


            if ($scope.formats.indexOf(cmd) != -1) {
                document.execCommand(cmd, false, null);
            }

        };

        $scope.textJustification = function (cmd) {
            if ($scope.formats.indexOf(cmd) != -1) {
                document.execCommand(cmd, false, null);
            }
        };

        $scope.codeBlock = function () {
            document.execCommand('insertHTML', false, '<code> code </code> &nbsp');
        };

        $scope.insertImage = function (imgName, url) {
            var hej = prompt('enter a url');
            // popup
            // popup som er en url
            // kalde en service som uploader billede til server
            // callback til hent billede og smid ind på siden fra vores server
            document.execCommand('insertImage', false, hej);
        };

        $scope.textTypes = function (type) {
            // p h1 h2 h3 h4 h5 h6
            switch (type) {
                case "h1":
                case "h2":
                case "h3":
                case "p":
                    document.execCommand('formatBlock', false, type);
                    break;
                default:
                    document.execCommand('formatBlock', false, 'p');
                    break;
            }

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

    app.controller('DocController', ["$scope", function ($scope) {
        $scope.title = "Create Documentation";

        $scope.content = "";
        $scope.body = "";


    }]);
})();









