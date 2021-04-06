let frisby = require("frisby");
let testConfig = require("../config/dev.js");
let uri = testConfig.testing.serverURI;

let userId1 = "606c9a4094c4d13c0cbfd43a";
let userId2 = "6038b909fcdc213874bbf89b";
let basicAssessmentId = "6026848f720e2f5db8c09ca9";

frisby.globalSetup({
    request: {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
});

it("GET user basic assessments", () => frisby.get(`${uri}/assessment/${basicAssessmentId}/user/${userId1}`).expect("status", 200));
