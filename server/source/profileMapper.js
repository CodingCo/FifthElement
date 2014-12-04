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

//== Create Profile
var createProfile = function (profile, callback) {
        model.Profile.create(profile, callback);
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

//-------------------- EXPORT ----------------------------

module.exports = {
    getProfile: getProfile,
    getAllProfiles: getAllProfiles,
    createProfile: createProfile,
    deleteProfile: deleteProfile,
    editProfile: editProfile
};