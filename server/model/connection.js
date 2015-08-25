var mongo = require('mongoose');

var productionUrl = require('../../config.json').database_connection_url;
var testUrl = require('../../config.json').database_test_url;

function connect(onConnected, enviroment) {
    var dbUrl = enviroment ? productionUrl : testUrl;
    mongo.connect(dbUrl, function (err) {
        if (onConnected) {
            return onConnected(err);
        }
    });
}

// another testfefe this is from mastfeer yes

function close(onClose) {
    mongo.connection.close(function () {
        if (onClose) {
            return onClose();
        }
    });
}

(function () {
    mongo.connection.on('connected', function () { //
        console.log("db open");
    });

    mongo.connection.on('error', function (error) {
        console.log("db error: " + error);
    });

    mongo.connection.on('disconnected', function () {
        console.log("db close");
    });

    process.on('SIGINT', function () {
        mongo.connection.close(function () {
            console.log("db close termination");
            process.exit(0);
        });
    });

    process.on('SIGTERM', function () {
        mongo.connection.close(function () {
            console.log("db hard");
            process.exit(0);
        });
    });

})();


module.exports = {
    connect: connect,
    close: close
};
