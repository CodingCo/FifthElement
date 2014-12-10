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
        Mock.Document.fillMock();
        done();
    });

    afterEach(function (done) {
        Mock.Document.emptyMock();
        done();
    });

    describe("test getDocument", function () {
        var invalidSearchString = "testblah";
        it("should return a complete Document", function (done) {
            dbMock.getDocumentByTitle(testDocument.title, function (err, document) {
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
            title: 'TestDocument',
            subtitle: 'TestDocument',
            author: {},
            timestamp: 'testStamp',
            abstract: 'TestDocument',
            body: 'TestDocument',
            images: [],
            tags: [],
            comments: []
        };
        it("Should add the document to the collection", function (done) {
            dbMock.createDocument(testDocument, function (err, data) {
                if (err) return done(err);
                data.should.equal(true);
                done();
            });
        });
    });

    describe("test deleteDocument", function () {
        var documentId = '1';

        it("Should delete Document if it exist in collection. Test with valid title", function (done) {
            dbMock.deleteDocument(documentId, function (err, data) {
                if (err) return done(err);
                (data === undefined).should.equal(true);
                done();
            })
        });
    });
});