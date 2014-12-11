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

module.exports = {
    getDownload: getDownload,
    getAllDownloads: getAllDownloads,
    editDownload: editDownload,
    deleteDownload: deleteDownload,
    createDownload: createDownload
};