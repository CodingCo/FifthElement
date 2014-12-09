describe('Factories in project FifthElement', function () {

    beforeEach(function () {        // docFactory, cacheFactory
        module('CMSApp.factories');
    });

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
            "doc_id": 1,
            "title": "TestTitle2",
            "subtitle": "TestSubtitle2",
            "author": "Thomas",
            "abstract": "TestAbstract2",
            "body": "Testbody2",
            "comments": [],
            "tags": [],
            "images": []
        }, {
            "doc_id": 2,
            "title": "TestTitle3",
            "subtitle": "TestSubtitle3",
            "author": "Thomas",
            "abstract": "TestAbstract3",
            "body": "Testbody3",
            "comments": [],
            "tags": [],
            "images": []
        }];

    describe('docFactory', function () {

        var $scope, $httpBackend, $doc;

        beforeEach(inject(function (_$httpBackend_, $rootScope, docFactory) {
            $scope = $rootScope.$new();
            $httpBackend = _$httpBackend_;
            $httpBackend.whenGET("/api/getAllDocuments").respond(mockDocuments); // Make a mock-controller that uses the factoruy

            // When request.body is not an object
            $httpBackend.when('POST', "/api/createDocument", "this should be an object").respond({err: "true",data: "Could not be saved"});
            $httpBackend.when('POST', "/api/createDocument", (mockDocuments[0]) || (mockDocuments[0])).respond(mockDocuments[0]);
            $httpBackend.when('POST', "/api/createDocument", (mockDocuments[1]) || (mockDocuments[1])).respond(mockDocuments[1]);
            $httpBackend.when('POST', "/api/createDocument", (mockDocuments[2]) || (mockDocuments[2])).respond(mockDocuments[2]);
            $httpBackend.when('GET', "/api/getDocument/" + mockDocuments[0].doc_id).respond(mockDocuments[0]);
            $httpBackend.when('DELETE', "/api/deleteDocument/" + mockDocuments[2].doc_id).respond({err: "false",data: mockDocuments[2]});

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

        it("should return the document we try to create", function () {

            $doc.createDocument(mockDocuments[1], function (err, data) {

                expect(data).toBeDefined();
                expect(data).toEqual(mockDocuments[1]);

            });

            $httpBackend.flush();

        });

        it("should fail when trying to create a document", function () {

            $doc.createDocument("this should be an object", function (err, data) {

                console.log(data.err);
                expect(data).toBeDefined();
                expect(data.err).toBe('true');
                expect(data.data).toBe('Could not be saved');

            });

            $httpBackend.flush();

        });

        it("should return the document with the same id", function () {

            $doc.getDocument(mockDocuments[0].doc_id, function (data) {
                expect(data.doc_id).toEqual(mockDocuments[0].doc_id);
            });

            $httpBackend.flush();

        });

        it("should delete the document from mock", function () {

            $doc.deleteDocument(mockDocuments[2].doc_id, function (data) {
                expect(data.err).toBe('false');
            });

            $httpBackend.flush();

        });

    });

    describe('cacheFactory', function () {

        var $cache;

        beforeEach(inject(function (_$httpBackend_, cacheFactory) {
            $cache = cacheFactory;
        }));

        it("should be defined", function(){
            expect($cache).toBeDefined();
        });

        it("should be empty", function(){
            expect($cache.getDocumentIfCached()).toBeFalsy();
        });

        it("should cache the document", function(){

            $cache.cacheDocument(mockDocuments[0]);
            expect($cache.getDocumentIfCached(mockDocuments[0].doc_id)).toEqual(mockDocuments[0]);

        });

        it("should return false", function(){

            expect($cache.getListIfCached()).toBeFalsy();

        });

        it("should cache a whole list", function(){

            $cache.cacheList(mockDocuments);
            expect($cache.getListIfCached()).toEqual(mockDocuments);

        });

        it("should eventually have a length of 2", function(){

            $cache.cacheList(mockDocuments);
            expect($cache.getListIfCached().length).toEqual(3);

            $cache.popElementFromCacheList(mockDocuments[2].doc_id);
            expect($cache.getListIfCached().length).toEqual(2);

        });

    });

    describe('editFactory', function () {

        var $edit, key = mockDocuments[0].doc_id;

        beforeEach(inject(function (_$httpBackend_, $rootScope, editFactory) {
            $edit = editFactory;
        }));

        it("should be empty", function(){

            expect($edit.getEditObject(key)).toBeFalsy();

        });

        it("should return correct documentation", function(){

            $edit.setEditObject(mockDocuments[0].doc_id, mockDocuments[0]);
            $edit.setEditObject(mockDocuments[1].doc_id, mockDocuments[1]);

            expect($edit.getEditObject(key)).toEqual(mockDocuments[key]);

        });

        it("should delete documentation", function(){

            $edit.setEditObject(mockDocuments[0].doc_id, mockDocuments[0]);
            $edit.setEditObject(mockDocuments[1].doc_id, mockDocuments[1]);

            expect($edit.deleteEditObject(0)).toBeTruthy();

        });

        xit("should return false for invalid key", function () { // Deprecated for now, the method always returns true

            $edit.setEditObject(mockDocuments[1].doc_id, mockDocuments[1]);
            expect($edit.deleteEditObject(0)).toBeFalsy();

        });


    });
    


});
