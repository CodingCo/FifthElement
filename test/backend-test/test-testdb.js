var should = require('should');
var documentMapper = require('../../server/source/documentMapper');
var profileMapper = require('../../server/source/profileMapper');
var downloadMapper = require('../../server/source/downloadMapper');
var connection = require('../../server/model/connection');
var mongoose = require('mongoose');

before(function (done) {
    connection.connect(done);
});

after(function (done) {
    connection.close(done);
});

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
        comments: [],
        pinned: true
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
        comments: [],
        pinned: false
    }];


    beforeEach(function (done) {
        this.timeout(5000);
        mongoose.connection.collection('documentations').insert(preDocs, done);
    });

    afterEach(function (done) {
        mongoose.connection.collections['documentations'].remove({}, done);
    });


    describe("test get document with specific title", function () {
        var invalidSearchId = -1;

        it("should return a complete document", function (done) {
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

    describe("test getPinnedDocuments", function () {

        it("should return a list of documents where pinned is true", function (done) {
            documentMapper.getPinnedDocuments(function (err, documents) {
                if (err) return done(err);
                // Here we check if the retrieved data, matches the expected document
                // We just test for the mandatory properties. It is redundant, to test for all.
                for(var i = 0; i < documents.length; ++i){
                    documents[i].should.have.property('pinned', true);
                }
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
                comments: [],
                pinned: false
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

                documentMapper.deleteDocument(docId, function (err,data) {
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
                document.pinned = 'false';

                documentMapper.editDocument(document, function(err, data){
                    if(err) return done(err);
                    data.should.have.property('pinned', false);
                    return done();
                });
            });
        });
    });
});

describe("Testing of the profile mapper interface", function () {

    var preProfiles = [{
        email: "a@b.c",
        name: "Robert Elving",
        resume: "lorem resume",
        skills: ["Skill 1", "Skill 2"],
        profile_picture: "img ref link here",
        github_link: "github.com",
        collaborations: ["project 1" , "project 2"]
    }, {
        email: "kasmhald@gmail.com",
        name: "Kasper Hald",
        resume: "merol resume",
        skills: ["Skill a", "Skill b"],
        profile_picture: "img ref link here put",
        github_link: "github.com/kasmhald",
        collaborations: ["project A" , "project B"]
    }];


    beforeEach(function (done) {
        this.timeout(5000);
        mongoose.connection.collection('profiles').insert(preProfiles, done);
    });

    afterEach(function (done) {
        mongoose.connection.collections['profiles'].remove({}, done);
    });


    describe("Test get profile with specific email", function () {

        var invalidSearchStr = "not@valid.email";


        it("should return a complete profile", function (done) {
            profileMapper.getProfile(preProfiles[0].email, function (err, profile) {
                if (err) return done(err);
                // Here we check if the retrieved data, matches the expected document
                // We just test for the mandatory properties. It is redundant, to test for all.
                profile.should.have.property('email', preProfiles[0].email);
                profile.should.have.property('name', preProfiles[0].name);
                return done();
            });
        });

        it("Should return undefined. Document do not exist", function (done) {
            profileMapper.getProfile(invalidSearchStr, function (err, profile) {
                if (err)return done(err);
                (profile === undefined).should.equal(true);
                return done();
            });
        });

    });


    describe("test save profile", function () {

        var profileToInsert = {
            email: "googled@gmail.com",
            name: "George Lucas",
            resume: "Lorem ipsum man ",
            skills: ["Skill x", "Skill y"],
            profile_picture: "idededeeddedet",
            github_link: "github.com/dbag",
            collaborations: ["project x" , "project y"]
        };

        it("should save the profile properly", function (done) {
            profileMapper.createProfile(profileToInsert, function(err, data){
                if (err)return done(err);
                (data!=null).should.equal(true);
                return done();
            });
        });
    });


    describe("test delete profile with specific id", function () {
        it("should get undefined, when trying to get a deleted profile", function (done) {
            profileMapper.deleteProfile(preProfiles[0].email, function(err){
                if (err)return done(err);
                (err === undefined).should.equal(true);
                return done();
            });
        });
    });

    describe("test get all profiles", function () {
        it("should retreive all existing profiles", function (done) {
            profileMapper.getAllProfiles(function(err, profiles){
                if (err) return done(err);
                (profiles.length === 2).should.equal(true);
                return done();
            });
        });
    });

    describe("Test edit profile with specific id", function(){

        var profile = {
            email: "a@b.c",
            name: "Robert Elving",
            resume: "lorem resume",
            skills: ["Skill 1", "Skill 2"],
            profile_picture: "img ref link here",
            github_link: "github.com",
            collaborations: ["project 1" , "project 2"]
        };
        profile.name = "Simon";

        it("should update a profile properly", function(done){
            profileMapper.editProfile(profile,function(err, profile){
                if (err) return done(err);
                profile.should.have.property('name', profile.name);
                return done();
            });
        });
    });
});


describe("Testing of the downloads mapper interface", function () {

    var preDownloads = [{
        download_id: 1,
        title: "SuperDownload",
        description: "The most awesome download",
        repo_link: "github.link.com.sjov",
        thumbnail: "hejmeddig"
    }, {
        download_id: 2,
        title: "NotSuperDownload",
        description: "Not The most awesome download",
        repo_link: "not.a.github.link.com.sjov",
        thumbnail: "nothejmeddig"
    }];


    beforeEach(function (done) {
        this.timeout(5000);
        mongoose.connection.collection('downloads').insert(preDownloads, done);
    });

    afterEach(function (done) {
        mongoose.connection.collections['downloads'].remove({}, done);
    });


    describe("Test get download with specific id", function () {

        var invalidSearchStr = -1;


        it("should return a complete download", function (done) {
            downloadMapper.getDownload(preDownloads[0].download_id, function (err, download) {
                if (err) return done(err);
                // Here we check if the retrieved data, matches the expected document
                // We just test for the mandatory properties. It is redundant, to test for all.
                download.should.have.property('download_id', preDownloads[0].download_id);
                download.should.have.property('title', preDownloads[0].title);
                return done();
            });
        });

        it("Should return undefined. Download do not exist", function (done) {
            downloadMapper.getDownload(invalidSearchStr, function (err, download) {
                if (err)return done(err);
                (download === undefined).should.equal(true);
                return done();
            });
        });

    });


    describe("test save download", function () {

        var downloadToInsert = {
            title: "saveDownload",
            description: "download description",
            repo_link: "download.link",
            thumbnail: "download_thumb"
        };

        it("should save the download properly", function (done) {
            downloadMapper.createDownload(downloadToInsert, function(err, data){
                if (err)return done(err);
                (data!=null).should.equal(true);
                return done();
            });
        });
    });


    describe("test delete download with specific id", function () {
        it("should not return err when deleting profile", function (done) {
            downloadMapper.deleteDownload(preDownloads[0].download_id, function(err){
                if (err)return done(err);
                (err === undefined).should.equal(true);
                return done();
            });
        });
    });

    describe("test get all downloads", function () {
        it("should retreive all existing download", function (done) {
            downloadMapper.getAllDownloads(function(err, downloads){
                if (err) return done(err);
                (downloads.length === 2).should.equal(true);
                return done();
            });
        });
    });

    describe("Test edit download with specific id", function(){

        var download = {
            download_id: 1,
            title: "NotSuperDownload",
            description: "Not The most awesome download",
            repo_link: "not.a.github.link.com.sjov",
            thumbnail: "nothejmeddig"
        };
        download.title = "EditTest";

        it("should return updated download", function(done){
            downloadMapper.editDownload(download,function(err, editedDownload){
                if (err) return done(err);
                editedDownload.should.have.property('title', download.title);
                return done();
            });
        });
    });
});