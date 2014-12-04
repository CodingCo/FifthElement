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


        it("should be defined", function () { // you could also just inject factory here... - When to flush!?!?!?!?!?!?

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


});









