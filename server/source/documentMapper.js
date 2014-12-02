var model = require('../model/models');

//var documentModel = require('../../test/backend-test/dbMock');
//var profileModel = require('../model/models').Profile;
//var downloadModel = require('../model/models').Profile;

exports.getDocument = function (doc_id, callback) {
    model.Document.findOne({doc_id: id}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
};

exports.getDocumentByTitle = function (title, callback) {
    model.Document.findOne({title: title}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
};

exports.getAllDocuments = function(callback){
    model.Document.find({}, {_id: 0, title: 1, abstract: 1, author: 1, timestamp: 1, doc_id: 1}, function (err, documents) {
        if(err) return callback(err);
        return callback(undefined, documents);
    })
}

var getDocumentPartial = function (titlePartial, callback) {
    model.Document.findOne({title: {$regex: new RegExp(titlePartial, "i")}}, function (err, data) {
        console.log('Inside Partial');
        if (err) return callback(err);
        if (data === null) return callback(undefined);
        return callback(undefined, data);
    });
};

exports.createDocument = function (document, callback) {
    getNextSequenceValue(function(data){
        //console.log(data);
        document.doc_id = data;
        //console.log(document);
        model.Document.create(document, callback);
    });
};

exports.deleteDocument = function (id, callback) {
    model.Document.remove({doc_id: id}, function(err){
        if(err) return callback(err);
        return callback();
    });
};

exports.update = function(document, callback){
};

//== Next Sequence
function getNextSequenceValue(callback){

    var seq = undefined;

    model.Seq.findOne({ _id: 'documentid' }, function (err, doc){
        //console.log(doc);
        doc._id = 'documentid';
        seq = doc.sequence_value;
        doc.sequence_value = seq+1;
        doc.save();
        return callback(seq);
    });
}



