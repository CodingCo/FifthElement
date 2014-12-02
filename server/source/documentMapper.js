var model = require('../model/models');

//get all documents
exports.getAllDocuments = function (callback) {
    model.Document.find({}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
};


exports.getDocument = function (doc_id, callback) {
    model.Document.findOne({doc_id: doc_id}, function (err, data) {
        if (err) return callback(err);
        return callback(undefined, data);
    });
};


//var g =  {
//    doc_id: 2,
//    title: 'Simons Journey to the Farm',
//    subtitle: 'Based on a true story',
//    author: 'j',
//    abstract: 'This is the story of a young developer',
//    body: 'Darth Exception looked into Simons eyes and said "I AM YOUR ROOT FOLDER"',
//    comments: [],
//    tags: [],
//    images: [],
//    timestamp: new Date
// };
//






