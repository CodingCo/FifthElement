var mongoose = require('mongoose');


var documentation = new mongoose.Schema({
    doc_id: {type: Number, unique: true, required: true},
    title: String,
    subtitle: String,
    author: String,
    timestamp: {type: Date, default: new Date},
    abstract: String,
    body: String,
    images: [String],
    tags: [String],
    comments: [{body: String, date: Date}]
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

var downloads = new mongoose.Schema({
    download_id: Number,
    title: String,
    description: String,
    repo_link: String,
    thumbnail: String

});


var Documentation = mongoose.model('documentation', documentation);
var Profile = mongoose.model('profiles', profile);
var Download = mongoose.model('downloads', downloads);


module.exports = {
    Documentation: Documentation,
    Profile: Profile,
    Download: Download
};