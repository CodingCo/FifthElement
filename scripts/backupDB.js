var con = require('../server/model/connection.js');
var model = require('../server/model/models');
var mongoose = require('mongoose');

var fs = require('fs-extra');

var documents = "";
var profiles = "";
var downloads = "";

// testing from test6 round 2

var getDocuments = function (callback) {
    model.Document.find({}, function (err, data) {
        if (err) return callback(err);
        console.log(data);
        documents = data
        callback();
    });
};

var getDownloads = function (callback) {
    model.Download.find({}, function (err, data) {
        if (err) return callback(err);
        console.log(data);
        documents = data
        callback();
    });
};

var getProfiles = function (callback) {
    model.Profile.find({}, function (err, data) {
        if (err) return callback(err);
        console.log(data);
        documents = data
        callback();
    });
};

var getData = function (documentCallback, downloadCallback, profileCallback) {
    getDocuments(documentCallback);
    getDownloads(downloadCallback);
    getProfiles(profileCallback);
};

var saveToFile = function (fileName, stringToSave) {
    var file = './files/'+fileName+'.txt';

    fs.outputJson(file, stringToSave, function (err) {
        console.log(err) // => null
    });
};

con.connect(function () {
    getData(function(err){
        if (err) console.log('could not log documents');
        saveToFile('documents', documents);
    },function(err){
        if (err) console.log('could not log downloads');
        saveToFile('downloads', downloads);
    },function(err){
        if (err) console.log('could not log profiles');
        saveToFile('profiles', profiles);
    });
}, 'production');
