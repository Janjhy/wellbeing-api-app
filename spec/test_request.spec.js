let frisby = require("frisby");
let testConfig = require("../config/dev.js");
let uri = testConfig.testing.serverURI;


let TestRequest_Description = "Lorem Ipsum";
let TestRequest_UserId = "606580fd2842935724b087b2";
let TestRequest_Helped = false;
let TestRequest_Helper = "607c4785c6ef43520495f51c";
let TestRequest_Id = "607c6a58b83dac0e74172438";

frisby.globalSetup({
    request: {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
});

//Test GET all request list
it('GET should return a status of 200 OK', () =>
    frisby
        .get(uri + "/requests")
        .expect('status', 200)
);

//Test GET user's request list
it("GET user requests", () =>
    frisby
        .get(`${ uri }/requests/${ TestRequest_UserId }`)
        .expect("status", 200)
);

//Test POST with missing description
it("POST Request with missing description", () =>
    frisby
        .post(uri + "/requests", {
            body: {
                "user_id": TestRequest_UserId,
            }
        })
        .expect("status", 400)
);

//Test POST with missing userid
it("POST Request with missing description", () =>
    frisby
        .post(uri + "/requests", {
            body: {
                "description": TestRequest_Description,
            }
        })
        .expect("status", 400)
);

//Test POST return 201 when created
it('POST should return a status of 201 Created', () =>
    frisby
        .post(uri + "/requests", {
            body: {
                "user_id": TestRequest_UserId,
                "description": TestRequest_Description,
            }
        })
        .expect('status', 201)
);


//Test PUT should return with 200 if both parameters provided
it('PUT should return a status of 200 OK', () =>
    frisby
        .put(uri + "/requests", {
            body: {
                "request_id": TestRequest_Id,
                "helper_id": TestRequest_Helper,
            }
        })
        .expect('status', 200)
);

//Test DELETE
/*it ('DELETE should return a status of 200 OK', () =>
    frisby
      .del(`${ uri }/requests/${ TestRequest_Id }`)
      .expect('status', 200)
);*/