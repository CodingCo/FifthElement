var model = require('../model/models');
//var model = require('../../test/backend-test/dbMock');


var getDocument = function (doc_id, callback) {
    model.Document.findOne({doc_id: doc_id}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
};

var getAllDocuments = function (callback) {
    model.Document.find({}, {
        _id: 0,
        title: 1,
        abstract: 1,
        author: 1,
        timestamp: 1,
        doc_id: 1,
        pinned: 1,
        images: 1
    }, function (err, documents) {
        if (err) return callback(err);
        if (documents === null) return callback();
        return callback(undefined, documents);
    });
};

var getDocumentByTitle = function (title, callback) {
    model.Document.findOne({title: title}, function (err, document) {
        if (err) return callback(err);
        return callback(undefined, document);
    });
};

var getPinnedDocuments = function (callback) {
    model.Document.find({pinned: true}, {
        _id: 0,
        title: 1,
        abstract: 1,
        author: 1,
        timestamp: 1,
        doc_id: 1,
        pinned: 1
    }, function (err, pinnedDocs) {
        if (err) return callback(err);
        if (pinnedDocs === null) return callback();
        return callback(undefined, pinnedDocs);
    })
};


//---------------------- EXPORT ----------------------------

module.exports = {
    getDocument: getDocument,
    getAllDocuments: getAllDocuments,
    getDocumentByTitle: getDocumentByTitle,
    getPinnedDocuments: getPinnedDocuments
};






