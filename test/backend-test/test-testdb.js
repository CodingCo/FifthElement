var should = require('should');
var documentMapper = require('../../server/source/documentMapper');
var connection = require('../../server/model/connection');
var mongoose = require('mongoose');

describe("Testing of the document mapper interface", function () {

    var preDocs = [{
        doc_id: 1,
        title: "Article 1",
        subtitle: "+1 Article of testing",
        author: "Kasper Hald",
        timestamp: new Date(),
        abstract: "",
        body: "Super article text of doom.",
        images: [],
        tags: ["Article", "Awesomeness"],
        comments: []
    }, {
        doc_id: 2,
        title: "Article 2",
        subtitle: "+4 Vorpal Keen Article",
        author: "John Smith",
        timestamp: new Date(),
        abstract: "",
        body: "Article text made of pure greatness, truly inspiring.",
        images: [],
        tags: ["Article", "Awesomeness", "Greatness"],
        comments: []
    }];

    before(function (done) {
        connection.connect(done);
    });

    after(function (done) {
        connection.close(done);
    });

    beforeEach(function (done) {
        this.timeout(5000);
        mongoose.connection.collection('documentations').insert(preDocs, done);
    });

    afterEach(function (done) {
        mongoose.connection.collections['documentations'].remove({}, done);
    });


    describe("test get document with specific title", function () {
        var invalidSearchId = -1;


        it("should return a complete Wiki article", function (done) {
            documentMapper.getDocument(1, function (err, document) {
                if (err) return done(err);
                // Here we check if the retrieved data, matches the expected document
                // We just test for the mandatory properties. It is redundant, to test for all.
                document.should.have.property('title', preDocs[0].title);
                document.should.have.property('author', preDocs[0].author);
                return done();
            });
        });

        it("Should return undefined. Document do not exist", function (done) {
            documentMapper.getDocument(invalidSearchId, function (err, document) {
                if (err)return done(err);
                (document === undefined).should.equal(true);
                return done();
            });
        });

    });


    describe("test save document", function () {
        it("should save the document properly, and retrieve the same document by title", function (done) {
            var documentToInsert = {
                title: "Article 3",
                subtitle: "+1 Article of testing",
                author: "Kasper Hald",
                timestamp: new Date(),
                abstract: "",
                body: "Super article text of whiteness.",
                images: [],
                tags: ["Article", "Awesomeness"],
                comments: []
            };

            documentMapper.createDocument(documentToInsert, function (err, data) {
                if (err) return done(err);
                (data!= null).should.be.equal(true);
                return done();

            });
        });
    });


    describe("test delete document with specific id", function () {
        it("should get undefined, when trying to get a deleted file", function (done) {
            titleOfDocument = 'Article 1';
            var docId;
            documentMapper.getDocument(1, function (err, document) {
                if (err) return done(err);
                docId = document.doc_id;

                documentMapper.deleteDocument(docId, function (err) {
                    if (err) return done(err);
                    documentMapper.getDocument(1, function (err, document) {
                        if (err) return done(err);
                        (document === undefined).should.equal(true);
                        return done();
                    });
                });
            });
        });
    });

    describe("test get all documents", function () {
        it("should retreive all existing documents", function (done) {
            var expectedSize = 2;
            documentMapper.getAllDocuments(function (err, documents) {
                if (err) return done(err);
                (documents.length === expectedSize).should.equal(true);
                return done();
            });
        });
    });

    describe("Test edit document with specific id", function(){
        it("should update a document properly", function(done){

            var doc_id = 1;

            documentMapper.getDocument(doc_id, function(err, document){
                if(err) return done(err);
                document.title = 'Back to the future';

                documentMapper.editDocument(document, function(err, data){
                    if(err) return done(err);
                    data.should.have.property('title', 'Back to the future');
                    return done();
                });
            });
        });
    });
});