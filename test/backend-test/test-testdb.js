var should = require('should');
var documentMapper = require('../../server/source/documentMapper');
var connection = require('../../server/model/connection');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

describe("Testing of the document mapper interface", function () {

    var preDocs = [{
        _id: 1,
        doc_id: 1,
        title: "Article 1",
        subtitle: "+1 Article of testing",
        author: "Kasper Hald",
        timestamp: "27-11-14 10:00:00",
        abstract: "",
        body: "Super article text of doom.",
        images: [],
        tags: ["Article", "Awesomeness"],
        comments: []
    },{
        _id: 2,
        doc_id: 2,
        title: "Article 2",
        subtitle: "+4 Vorpal Keen Article",
        author: "John Smith",
        timestamp: "01-01-00 00:00:00",
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
        mongoose.connection.collection('Documentation').insert(preDocs,done);
    });

    afterEach(function (done) {
        mongoose.connection.collections['Documentation'].remove({},done);
    });


    describe("test get document with specific title", function () {
        var invalidSearchId = -1;

        console.log(documentMapper);


        it("should return a complete Wiki article", function (done) {
            documentMapper.getDocument(preDocs[0]._id, function (err, document) {
                if (err) return done(err);
                // Here we check if the retrieved data, matches the expected document
                // We just test for the mandatory properties. It is redundant, to test for all.
                console.log(document);
                document.should.have.property('_id', preDocs[0]._id);
                document.should.have.property('title', preDocs[0].title);
                document.should.have.property('author', preDocs[0].author);
                return done();
            });
        });

        it("Should return undefined. Document do not exist", function (done) {
            documentMapper.getDocument(invalidSearchId, function (err, document) {
                if (err) return done(err);
                (document === undefined).should.equal(true);
                return done();
            });
        });

    });
/*
    describe("test list of documents with with partially matching title", function () {
        it("should return two items with the title containing \"Article\"", function (done) {
            var partialTitle = 'Article';
            documentMapper.getDocuments(partialTitle, function (err, documents) {
                if (err) return done(err);

                documents[0].should.have.property('title', 'Article 1');
                documents[1].should.have.property('title', 'Article 2');
                return done();
            });
        });
    });

*/
    describe("test save document", function () {
        it("should save the document properly, and retrieve the same document by title", function (done) {
            var documentToInsert = {
                doc_id: 3,
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

            documentMapper.postDocument(documentToInsert, function (err) {
                if (err) return done(err);
                documentMapper.getDocumentByTitle(documentToInsert.title, function (err, document) {
                    if (err) return done(err);
                    document.should.have.property('title', 'Article 3');
                    return done();
                });
            });
        });
    });
/*
    describe("test delete document with specific title", function () {
        it("should get undefined, when trying to get a deleted file", function (done) {
            var titleOfDocument = 'Article 1';
            documentMapper.deleteDocument(titleOfDocument, function (err) {
                if (err) return done(err);
                documentMapper.getDocument(titleOfDocument, function (err, document) {
                    if (err) return done(err);
                    (document === undefined).should.equal(true);
                    return done();
                });
            });
        });
    });
    /*
     describe("test editing document", function () {
     it("The selected document should be edited properly", function(done){
     var authorToBe = 'Christopher Mortensen';
     var documentToEdit = {doc_id: 1,
     title: "Article 1",
     subtitle: "+1 Article of testing",
     author: "Kasper Hald",
     timestamp: "27-11-14 10:00:00",
     abstract: "",
     body: "Super article text of doom.",
     images: [],
     tags: ["Article", "Awesomeness"],
     comments: []};
     var oldAuthor = documentToEdit.author;
     documentToEdit.author = authorToBe;
     documentMapper.editDocument(documentToEdit, function(err, document){
     if(err) return done(err);
     document.should.not.not.have.property('author', oldAuthor);
     return done();
     });
     });
     });
     */
});