xdescribe('Controllers in project FifthElement', function () {

    describe('ListDocumentCtrl', function () {

        var $scope, controller, $httpBackend;
        var documentationMock = [
            {
                "doc_id": 0,
                "title": "TestTitle1",
                "subtitle": "TestSubtitle1",
                "author": "Thomas",
                "abstract": "TestAbstract1",
                "body": "Testbody1",
                "comments": [],
                "tags": [],
                "images": []
            },
            {
                "doc_id": 1,
                "title": "TestTitle2",
                "subtitle": "TestSubtitle2",
                "author": "Thomas",
                "abstract": "TestAbstract2",
                "body": "Testbody2",
                "comments": [],
                "tags": [],
                "images": []
            }
        ];


        beforeEach(function () {
            module('CMSApp.controllers', 'CMSApp.factories');
        });

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('/api/getAllDocuments').respond(documentationMock);


        }));

    });


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










