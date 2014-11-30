(function () {

    var app = angular.module('CMSApp.directives', []);

    app.directive('navigation', function () {
        return {
            restrict: 'A',
            templateUrl: "../navigation.html"
        }
    });

    app.directive('footer', function () {
        return {
            restrict: 'A',
            templateUrl: "../footer.html"
        }
    });

    app.directive('erer', function () {
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


