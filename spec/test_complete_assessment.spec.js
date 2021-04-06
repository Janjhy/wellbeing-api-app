let qs = require("qs");
let frisby = require("frisby");
let testConfig = require("../config/dev.js");
let uri = testConfig.testing.serverURI;

let TestAssessment1_Comment = "Comment 2222";
let TestAssessment1_UserId = "606c9a4094c4d13c0cbfd43a";
let TestAssessment1_AssessmentId = "6026848f720e2f5db8c09ca9";
let Answer1 = {
    "question_string": "How are you feeling?",
    "question_id": "60268600a5369fd7c2e0e19f",
    "min_score": 0,
    "max_score": 10,
    "max_text": "Good",
    "min_text": "Bad",
    "score": 0,
};

let Answer2 = {
    "question_string": "How is your workload?",
    "question_id": "6026876aa5369fd7c2e0e1a0",
    "min_score": 0,
    "max_score": 10,
    "max_text": "Heavy",
    "min_text": "Low",
    "score": 2,
}

let TestAssessment1_Answers = [Answer1, Answer2];

it('', () => frisby.post(uri + "/assessment/add-complete", {
    body: qs.stringify({
        "user_id": TestAssessment1_UserId,
        "assessment_id": TestAssessment1_AssessmentId,
        "answers": TestAssessment1_Answers,
        "comment": TestAssessment1_Comment
    })
}).expect("status", 201));
