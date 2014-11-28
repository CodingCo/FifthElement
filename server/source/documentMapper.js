//var documentModel = require('../model/models').Documentation;
var documentModel = require('../../test/backend-test/dbMock');
var profileModel = require('../model/models').Profile;
var downloadModel = require('../model/models').Profile;

exports.getDocument = function(title, callback) {
    documentModel.findOne({title: title}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
}

exports.deleteDocument = function(title, callback) {
    documentModel.remove({title: title}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
}

exports.postDocument = function(document, callback) {
    documentModel.save(document, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
}

exports.getDocuments = function(title, callback){
    documentModel.find({title: title}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
}


