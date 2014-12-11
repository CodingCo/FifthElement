var model = require('../model/models');

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
        subtitle: newDocument.title,
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

//=========================download==========================//

var editDownload = function (download, callback) {
    model.Download.findOneAndUpdate({download_id: download.download_id}, {
        title: download.title,
        description: download.description,
        repo_link: download.repo_link,
        thumbnail: download.thumbnail
    }, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
};

var deleteDownload = function (id, callback) {
    model.Download.remove({download_id: id}, function (err) {
        if (err) return callback(err);
        return callback();
    });
};

var createDownload = function (download, callback) {
    getNextSequenceValue(function (data) {
        download.download_id = data;
        model.Download.create(download, function (err, d) {
            if (err) return callback(err);
            return callback(undefined, d);
        });
    });
};

function getNextSequenceValue(callback) {
    var seq = undefined;
    model.Sequence.findOne({_id: 'counter'}, function (err, down) {
        down._id = 'counter';
        seq = down.download_sequence_value;
        down.download_sequence_value = seq + 1;
        down.save();
        return callback(seq);
    });
}

//=============Profiles==================//

//== Create Profile
var createProfile = function (profile, callback) {
    model.Profile.create(profile, function (err, data) {
        if (err) return callback(err);
        return callback(undefined, data);
    });
};

//== Delete Profile
var deleteProfile = function (email, callback) {
    model.Profile.remove({email: email}, function (err) {
        if (err) return callback(err);
        return callback();
    });
};

//== Edit Profile
var editProfile = function(newProfile, callback) {
    model.Profile.findOneAndUpdate({email: newProfile.email},{
        name : newProfile.name,
        resume : newProfile.resume,
        skills : newProfile.skills,
        profile_picture : newProfile.profile_picture,
        github_link : newProfile.github_link,
        collaborations : newProfile.collaborations
    },function(err, data){
        if (err) return callback(err);
        if(data === null) return callback();
        return callback(undefined, data);
    });
};



module.exports = {
    createDocument: createDocument,
    deleteDocument: deleteDocument,
    editDocument: editDocument,
    editDownload: editDownload,
    deleteDownload: deleteDownload,
    createDownload: createDownload,
    createProfile: createProfile,
    deleteProfile: deleteProfile,
    editProfile: editProfile
};

