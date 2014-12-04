describe('Test SingleDocCtrl', function () {

    var ctrl, $scope;
    var documentMock = {
        "doc_id": 243,
        "title": "i am a title",
        "subtitle": "sup title",
        "author": "John Doe",
        "abstract": "test abstract",
        "body": "test body"
    };

    beforeEach(module('CMSApp'));

    beforeEach(inject(function ($controller, $rootScope, $httpBackend, $routeParams) {
        $scope = $rootScope.$new();
        $routeParams.doc_id = 71;
        $scope.httpBackend = $httpBackend;
        $scope.httpBackend
            .when('GET', '/api/getDocument/71')
            .respond(documentMock);
        ctrl = $controller('SingleDocCtrl', {
            $scope: $scope,
            $routeParams: {doc_id: "71"}
        });
    }));

    it('should have an empty $scope.doc', function () {
        expect($scope.doc).toEqual({});
        $scope.httpBackend.flush();
        expect($scope.doc.body.$$unwrapTrustedValue()).toEqual(documentMock.body);
    });

});
