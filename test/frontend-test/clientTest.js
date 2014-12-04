describe('Controllers in project FifthElement', function () {

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

            controller = $controller('ListDocumentCtrl', {
                $scope: $scope
            });

        }));

        it("should be defined", function () {
            $httpBackend.flush();
            expect(controller).toBeDefined();
        });

        it("should be defined", function () {
            expect($scope.documents).toBeDefined();
        });

        it("should have two elements", function () {
            expect($scope.documents.length).toEqual(2);
        });

        it("should be of type Object", function () {
            expect(typeof $scope.documents[0]).toBe('object');
        });

        it("should have same properties as mock", function () {
            var objectFromController = $scope.documents[0];
            var mockObject = documentationMock[0];

            $httpBackend.flush();
            expect(objectFromController.title).toEqual(mockObject.title);
            expect(objectFromController.subtitle).toEqual(mockObject.subtitle);
            expect(objectFromController.author).toEqual(mockObject.author);
            expect(objectFromController.abstract).toEqual(mockObject.abstract);
            expect(objectFromController.body).toEqual(mockObject.body);

        });

    });

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

});









