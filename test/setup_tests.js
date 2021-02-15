const mongoClient = require("mongodb");
const testConfig = require("config/dev.js");
const async = require("async");

let wellbeing_test_db = null;

function connectDatabase(cb) {
    mongoClient.connect(testConfig.mongodatabase.uri, function (err, client) {
        wellbeing_test_db = client.db(testConfig.mongodatabase.db)
        console.log("Connection to server.")
        cb(0);
    });
}

function clearUsers(cb) {
    let userColl = wellbeing_test_db.collection('user');
    if (userColl !== undefined) {
        userColl.drop(function (err) {
            cb(0);
        });
    } else cb(0);
}

function clearCompletedAssessments(cb) {
    let completed_assessments = wellbeing_test_db.collection('completed_assessments');
    if (completed_assessments !== undefined) {
        completed_assessments.drop(function (err) {
            cb(0);
        });
    } else cb(0);
}

function closeDatabase(cb) {
    wellbeing_test_db.close();
}

async.series([connectDatabase, clearUsers, clearCompletedAssessments, closeDatabase]);
