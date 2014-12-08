describe('Factories in project FifthElement', function () {

    describe('docFactory', function () {

        var $scope, $httpBackend, $doc;

        var mockDocuments = [{
            "doc_id": 0,
            "title": "TestTitle1",
            "subtitle": "TestSubtitle1",
            "author": "Thomas",
            "abstract": "TestAbstract1",
            "body": "Testbody1",
            "comments": [],
            "tags": [],
            "images": []
        }, {
            "doc_id": 0,
            "title": "TestTitle2",
            "subtitle": "TestSubtitle2",
            "author": "Thomas",
            "abstract": "TestAbstract2",
            "body": "Testbody2",
            "comments": [],
            "tags": [],
            "images": []
        }, {
            "doc_id": 0,
            "title": "TestTitle3",
            "subtitle": "TestSubtitle3",
            "author": "Thomas",
            "abstract": "TestAbstract3",
            "body": "Testbody3",
            "comments": [],
            "tags": [],
            "images": []
        }];

        beforeEach(function () {
            module('CMSApp.factories');
        });

        beforeEach(inject(function (_$httpBackend_, $rootScope, docFactory) {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET("/api/getAllDocuments").respond(mockDocuments); // Make a mock-controller that uses the factoruy

            $doc = docFactory;

        }));

        // It's tests
        it("should be defined", function () {
            expect($doc).toBeDefined();
        });

        it("should respond with array of objects", function () {

            $doc.getAllDocuments(function (data) {

                expect(data).toBeDefined();
                expect(Object.prototype.toString.call(data)).toBe("[object Array]");

                expect(data).toEqual(mockDocuments);

            });
            $httpBackend.flush();

        });


    });
});
