var model = require('../model/models');

//== Get Profile
var getProfile = function (email, callback) {
    model.Profile.findOne({email: email}, function (err, data) {
        if (err) return callback(err);
        if (data === null) return callback();
        return callback(undefined, data);
    });
};

//== Get All Profiles
var getAllProfiles = function (callback) {
    model.Profile.find({}, {
        email: 1,
        name: 1,
        resume: 1,
        skills: 1,
        github_link: 1,
        collaborations: 1
    }, function (err, profiles) {
        if (err) return callback(err);
        if (profiles === null) return callback();
        return callback(undefined, profiles);
    });
};


//-------------------- EXPORT ----------------------------

module.exports = {
    getProfile: getProfile,
    getAllProfiles: getAllProfiles
};