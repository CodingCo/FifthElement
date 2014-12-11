var model = require('../model/models');

var getDownload = function (id, callback) {
    model.Download.findOne({download_id: id}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
};

var getAllDownloads = function (callback) {
    model.Download.find({}, function (err, documents) {
            if (err) return callback(err);
            if (documents === null) return callback();
            return callback(undefined, documents);
        }
    );
};


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


module.exports = {
    getDownload: getDownload,
    getAllDownloads: getAllDownloads,
    editDownload: editDownload,
    deleteDownload: deleteDownload,
    createDownload: createDownload
};