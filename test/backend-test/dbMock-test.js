var should = require('should');
var documentMapper = require('../../server/source/documentMapper');
var dbMock = require('./dbMock');


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
        dbMock.fillMock();
        done();
    });

    afterEach(function (done) {
        dbMock.emptyMock();
        done();
    });


    /*
     * Tests the getWiki function.
     * IMPORTANT: When testing against a local mongodb the article._id test will fail
     * the _id types differ from those on mongolab, which are ObjectId's.
     */
    describe("test getDocument", function () {

        var invalidSearchString = "testblah";


        it("should return a complete Document", function (done) {
            documentMapper.getDocument(testDocument.title, function (err, document) {
                if (err) return done(err);
                // Here we check if data is equal to expected -> article
                document.should.have.property('_id', testDocument.doc_id);
                document.should.have.property('url', testDocument.title);
                document.should.have.property('title', testDocument.subtitle);
                document.should.have.property('title', testDocument.author);
                document.should.have.property('title', testDocument.timestamp);
                document.should.have.property('title', testDocument.abstract);
                document.should.have.property('title', testDocument.body);
                document.should.have.property('title', testDocument.images);
                document.should.have.property('title', testDocument.tags);
                document.should.have.property('title', testDocument.comments);
                return done();

            });
        });

        it("Should return undefined, no such document", function (done) {
            documentMapper.getDocument(invalidSearchString, function (err, data) {
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
            documentMapper.postDocument(testDocument,function (err, data) {
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
            documentMapper.deleteDocument(documentTitle, function (err, data) {
                if (err) return done(err);
                data.should.equal(true);
                done();
            })
        });

        it("Should delete Document if it exist in collection. Test with invalid title", function (done) {
            documentMapper.deleteDocument(documentTitle, function (err, data) {
                if (err) return done(err);
                data.should.equal(false);
                done();
            })
        });
    });

    describe("test getFirstMatch", function () {
        it("Should find document from part of title", function (done) {
            var titleSubstring = testDocument.title.substring(0,6)
            documentMapper.getFirstMatch(titleSubstring,function (err, document) {
                if (err) return done(err);
                document.should.have.property('title', testDocument.subtitle);
                done();
            })
        });
    });

    //for testing search
    describe("test getDocuments", function () {
        var searchString = "as";
        it("Should return an array of distinct object matching searchString", function (done) {
            documentMapper.getDocuments(searchString,function (err, data) {
                if (err) return done(err);
                    data.length.to.be.above(0);
                done();
            })
        });
    });
});