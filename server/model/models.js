var mongoose = require('mongoose');

var document = new mongoose.Schema({
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


var download = new mongoose.Schema({
    download_id: Number,
    title: String,
    description: String,
    repo_link: String,
    thumbnail: String
});

var seq = new mongoose.Schema({
    _id: String,
    sequence_value: Number
});


var Document = mongoose.model('documentation', document);
var Profile = mongoose.model('profiles', profile);
var Download = mongoose.model('downloads', download);
var Seq = mongoose.model('counters', seq);


module.exports = {
    Document: Document,
    Profile: Profile,
    Download: Download,
    Sequence: Seq
};