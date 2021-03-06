(function () {

    var app = angular.module('CMSApp.directives', []);

    app.directive('navigation', function () {
        return {
            restrict: 'A',
            templateUrl: "../directives/navigation.html",
        }
    });

    app.directive('footer', function () {
        return {
            restrict: 'A',
            templateUrl: "../directives/footer.html"
        }
    });

    app.directive('aceEditor', function () {
        return {
            restrict: 'EA',
            templateUrl: "../directives/aceEditor.html",
            controller: 'AceCtrl',
            scope: {
                contentField: "="
            },

            link: function (scope, elemt, attrs) {
            }
        }
    });


    app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        }
    }]);

    app.directive('contenteditable', function () {
        return {
            restrict: 'A', // only activate on element attribute
            require: '?ngModel', // get a hold of NgModelController
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) return; // ngModel will be 'content' TODO: just a reminder on ngModel usage. Remember to delete this comment!

                // Specify how UI should be updated
                ngModel.$render = function () {
                    element.html(ngModel.$viewValue || '');
                };

                // Listen for change events to enable binding
                element.on('blur keyup change', function () {
                    scope.$apply(readViewText);
                });

                // Write data to the model
                function readViewText() {
                    var html = element.html();
                    // When we clear the content editable the browser leaves a <br> behind
                    // If strip-br attribute is provided then we strip this out
                    if (attrs.stripBr && html == '<br>') {
                        html = '';
                    }
                    ngModel.$setViewValue(html);
                }
            }
        }
    });
})();


