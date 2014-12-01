var should = require('should');
var Mock = require('./dbMock');
var dbMock = require('../../server/source/documentMapper')

describe("Testing of the Document Services", function () {

    var testDocument = "";

    beforeEach(function (done) {
        testDocument = {
            doc_id: '1',
            title: 'Simons Journey to the Farm',
            subtitle: 'Based on a true story',
            author: {
                email: 'groenborg@gmail.com',
                name: 'Simon',
                resume:"I'm legally blind",
                skills:'A lot',
                profile_picture: 'Simon.gif',
                github_link: 'www.github.com/groenborg',
                collaborations:'All G5'
            },
            timestamp: '11-11-11 12:12:12',
            abstract: 'This is the story of a young developer',
            body: 'Darth Exception looked into Simons eyes and said "I AM YOUR ROOT FOLDER"',
            images: [
                'link1',
                'link2',
                'link3'
            ],
            tags: [
                'tag1',
                'tag2',
            ],
            comments: [
                'comment1',
                'comment2',
            ]
        };
        Mock.fillMock();
        done();
    });

    afterEach(function (done) {
        Mock.emptyMock()
        done();
    });

    describe("test getDocument", function () {
        var invalidSearchString = "testblah";
        it("should return a complete Document", function (done) {
            dbMock.getDocument(testDocument.title, function (err, document) {
                if (err) return done(err);
                // Here we check if data is equal to expected -> article
                document.should.have.property('doc_id', testDocument.doc_id);
                document.should.have.property('title', testDocument.title);
                document.should.have.property('subtitle', testDocument.subtitle);
                document.should.have.property('author', testDocument.author);
                document.should.have.property('timestamp', testDocument.timestamp);
                document.should.have.property('abstract', testDocument.abstract);
                document.should.have.property('body', testDocument.body);
                document.should.have.property('images', testDocument.images);
                document.should.have.property('tags', testDocument.tags);
                document.should.have.property('comments', testDocument.comments);
                return done();
            });
        });

        it("Should return undefined, no such document", function (done) {
            dbMock.getDocument(invalidSearchString, function (err, data) {
                if (err) return done(err);
                (data === undefined).should.equal(true);
                done();
            })
        })
    });

    describe("test postDocument", function () {
        var testDocument = {
            doc_id: '5',
            title: 'TestDocument',
            subtitle: 'TestDocument',
            author: {
                email: 'TestDocument',
                name: 'TestDocument',
                resume:"TestDocument",
                skills:'TestDocument',
                profile_picture: 'TestDocument',
                github_link: 'TestDocument',
                collaborations:'TestDocument'
            },
            timestamp: 'TestDocument',
            abstract: 'TestDocument',
            body: 'TestDocument',
            images: [
                'TestDocument',
                'TestDocument',
                'TestDocument'
            ],
            tags: [
                'TestDocument',
                'TestDocument',
            ],
            comments: [
                'TestDocument',
                'TestDocument',
            ]
        };
        it("Should add the document to the collection", function (done) {
            dbMock.postDocument(testDocument,function (err, data) {
                if (err) return done(err);
                data.should.equal(true);
                done();
            })
        });
    });

    describe("test deleteDocument", function () {
        var documentTitle = 'Simons Journey to the Farm'
        var invalidTitle = "AcidFace";

        it("Should delete Document if it exist in collection. Test with valid title", function (done) {
            dbMock.deleteDocument(documentTitle, function (err, data) {
                if (err) return done(err);
                data.should.equal(true);
                done();
            })
        });

        it("Should delete Document if it exist in collection. Test with invalid title", function (done) {
            dbMock.deleteDocument(invalidTitle, function (err, data) {
                if (err) return done(err);
                data.should.equal(false);
                return done();
            })
        });
    });

    describe("test partial matching", function () {
        it("Should find document from part of title", function (done) {
            dbMock.getDocument(testDocument.title.substring(0,4), function (err, document) {
                if (err) return done(err);
                document.should.have.property('title', testDocument.title);
                return done();
            })
        });
    });

    //for testing search
    describe("test getDocuments", function () {
        var searchString = "as";
        it("Should return an array of distinct object matching searchString", function (done) {
            dbMock.getDocuments(searchString,function (err, data) {
                if (err) return done(err);
                data.length.should.be.above(0);
                done();
            })
        });
    });
});