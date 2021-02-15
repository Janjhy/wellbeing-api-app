let frisby = require("frisby");
let testConfig = require("config/dev.js");
let uri = testConfig.testing.serverURI;

TestUser1_Username = "Test1";
TestUser1_Password = "Password1";
TestUser1_Points = 0;
TestUser1_Access = "user";
TestUser1_Loc = "Helsinki";
TestUser1_Subscribers = [];

//Test POST with missing required parameters
it("POST user with missing username", function() {
    return frisby.post(uri + "/user", {"password": TestUser1_Password, "points": TestUser1_Points, "location": TestUser1_Loc})
        .expect("status", 400)
});

it("POST user with missing password", function() {
    return frisby.post(uri + "/user", {"username": TestUser1_Username, "points": TestUser1_Points, "location": TestUser1_Loc})
        .expect("status", 400)
});

it("POST user with missing location", function() {
    return frisby.post(uri + "/user", {"username": TestUser1_Username, "password": TestUser1_Password, "points": TestUser1_Points})
        .expect("status", 400)
});

it("POST user with existing username", function() {
    return frisby.post(uri + "/user", {"username": TestUser1_Username, "password": TestUser1_Password, "location": TestUser1_Loc, "points": TestUser1_Points})
        .expect("status", 400)
});

//Test valid user creation
it("POST new user ", function() {
    return frisby.post(uri + "/user", {"username": TestUser1_Username, "password": TestUser1_Password, "location": TestUser1_Loc, "points": TestUser1_Points})
        .expect("status", 201)
        .expect("json", {"username": TestUser1_Username, "location": TestUser1_Loc, "points": TestUser1_Points})
});

//Test duplicate creation
it("POST user with existing username", function() {
    return frisby.post(uri + "/user", {"username": TestUser1_Username, "password": TestUser1_Password, "location": TestUser1_Loc, "points": TestUser1_Points})
        .expect("status", 400)
});

