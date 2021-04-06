let qs = require("qs");
let frisby = require("frisby");
let testConfig = require("../config/dev.js");
let uri = testConfig.testing.serverURI;

let TestUser1_Username = "Test1";
let TestUser1_Password = "Password1";
let TestUser1_Points = 0;
let TestUser1_Loc = "Helsinki";
let TestUser1_Subscribers = [];

frisby.globalSetup({
    request: {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
});

//Test POST with missing required parameters
it("POST user with missing username", () => frisby.post(uri + "/user", {
    body: {
        "password": TestUser1_Password,
        "points": TestUser1_Points,
        "location": TestUser1_Loc
    }
})
    .expect("status", 400));

it("POST user with missing password", () => frisby.post(uri + "/user", {
    "username": TestUser1_Username,
    "points": TestUser1_Points,
    "location": TestUser1_Loc
})
    .expect("status", 400));

it("POST user with missing location", () => frisby.post(uri + "/user", {
    "username": TestUser1_Username,
    "password": TestUser1_Password,
    "points": TestUser1_Points
})
    .expect("status", 400));

it("POST user with existing username", () => frisby.post(uri + "/user", {
    "username": TestUser1_Username,
    "password": TestUser1_Password,
    "location": TestUser1_Loc,
    "points": TestUser1_Points
})
    .expect("status", 400));

//Test valid user creation
/*it("POST new user ", () => frisby.post(uri + "/user", {
    body: qs.stringify({
        "username": TestUser1_Username,
        "password": TestUser1_Password,
        "location": TestUser1_Loc,
        "points": TestUser1_Points
    })
})
    .expect("status", 200)
    .expect("json", {"username": TestUser1_Username, "location": TestUser1_Loc, "points": TestUser1_Points}));
*/
//Test duplicate creation
it("POST user with existing username", () => frisby.post(uri + "/user", {
        body: qs.stringify({
            "username": TestUser1_Username,
            "password": TestUser1_Password,
            "location": TestUser1_Loc,
            "points": TestUser1_Points
        })
})
    .expect("status", 400)
    .expect("json", "errors", "Username already exists.")
);

