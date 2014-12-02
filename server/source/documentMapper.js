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

exports.postDocument = function (document, callback) {
    getNextSequenceValue(function(data){
        //console.log(data);
        document.doc_id = data;
        //console.log(document);
        model.Document.create(document, callback);
    });
};

exports.deleteDocument = function (title, callback) {

};

exports.saveDocument = function(document, callback){

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



