(function () {

    var app = angular.module('CMSApp.services', []);





    app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': "image/jpg"}
            }).success(function (data) {

            }).error(function (error) {

            });
        }
    }]);

})();


