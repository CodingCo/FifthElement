var mongoose = require('mongoose');
var dbUri = require('../../config.json').dbUri;

mongoose.connect(dbUri);

exports.connect = function (onConnected) {
    mongoose.connect(dbUri, function (error) {
        if (onConnected) {
            onConnected(error);
        }
    });
};


exports.close = function (onClose) {
    mongoose.connection.close(function () {
        onClose();
    })
};


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


exports.Documentation = mongoose.model('documentation', documentation);
var Profile = mongoose.model('profiles', profile);
var Download = mongoose.model('downloads', downloads);

(function () {
    mongoose.connection.on('connected', function () { //
        console.log("Connection opened");
    });

    mongoose.connection.on('error', function (error) {
        console.log("Error in connection: " + error);
    });

    mongoose.connection.on('disconnected', function () {
        console.log("Connection closed");
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log("Disconnected through app termination");
            process.exit(0);
        });
    })
})();