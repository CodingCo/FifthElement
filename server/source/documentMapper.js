var model = require('../model/models');

//var documentModel = require('../../test/backend-test/dbMock');
//var profileModel = require('../model/models').Profile;
//var downloadModel = require('../model/models').Profile;

exports.getDocument = function (id, callback) {
    model.Document.findOne({_id: id}, function (err, data) {
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

var getDocumentPartial = function (titlePartial, callback) {
    model.Document.findOne({title: {$regex: new RegExp(titlePartial, "i")}}, function (err, data) {
        console.log('Inside Partial');
        if (err) return callback(err);
        if (data === null) return callback(undefined);
        return callback(undefined, data);
    });
};

//exports.deleteDocument = function (title, callback) {
//    con.collection('Documentation').remove({title: title}, function (err, data) {
//        if (err) return callback(err);
//        if (data === null) return callback();
//        return callback(undefined, data);
//    });
//};

exports.postDocument = function (document, callback) {
    model.Document.create(document, callback);
};

//exports.getDocuments = function (title, callback) {
//    con.collection('Documentation').find({title: {$regex: new RegExp(title, "i")}}, function (err, data) {
//        if (err) return callback(err);
//        if (data === null) return callback();
//        return callback(undefined, data);
//    });
//};


