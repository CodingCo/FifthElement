var mongoose = require('mongoose');

var documentation = new mongoose.Schema({
    doc_id: {type: Number, unique: true, required: true},
    title: {type: String},
    subtitle: {type: String},
    author: {type: String},
    timestamp: {type: Date, default: new Date},
    abstract: {type: String},
    body: {type: String},
    images: {type: [{type: String}], index: true},
    tags: {type: [{type: String}], index: true},
    comments: [{body: {type: String}, date: {type: Date}}]
});


var profile = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    resume: String,
    skills: [String],
    profile_picture: String,
    github_link: String,
    collaborations: [String]
});

var seq =  new mongoose.Schema({
    _id: String,
    sequence_value: Number
});

var download = new mongoose.Schema({
    download_id: Number,
    title: String,
    description: String,
    repo_link: String,
    thumbnail: String

});

var Seq = mongoose.model('counters', seq);
var Document = mongoose.model('documentations', documentation);


module.exports = {
    Document: Document,
    Seq: Seq
};

