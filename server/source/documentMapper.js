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

var createDocument = function (document, callback) {
    getNextSequenceValue(function (data) {
        document.doc_id = data;
        model.Document.create(document, function (err, data) {
            if (err) return callback(err);
            callback(undefined, data);
        });
    });
};

function getNextSequenceValue(callback) {
    var seq = undefined;
    model.Sequence.findOne({_id: 'counter'}, function (err, doc) {
        seq = doc.document_sequence_value;
        doc.document_sequence_value = seq + 1;
        doc.save();
        return callback(seq);
    });
}

var deleteDocument = function (id, callback) {
    model.Document.remove({doc_id: id}, function (err) {
        if (err) return callback(err);
        return callback();
    });
};

var editDocument = function (newDocument, callback) {
    model.Document.findOneAndUpdate({doc_id: newDocument.doc_id}, {
        title: newDocument.title,
        subtitle: newDocument.subtitle,
        author: newDocument.author,
        timestamp: newDocument.timestamp,
        abstract: newDocument.abstract,
        body: newDocument.body,
        images: newDocument.images,
        tags: newDocument.tags,
        comments: newDocument.comments,
        pinned: newDocument.pinned
    }, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
};


//---------------------- EXPORT ----------------------------

module.exports = {
    getDocument: getDocument,
    getAllDocuments: getAllDocuments,
    getDocumentByTitle: getDocumentByTitle,
    getPinnedDocuments: getPinnedDocuments,
    deleteDocument: deleteDocument,
    editDocument: editDocument,
    createDocument: createDocument
};






