const mongoose = require("mongoose");


let userSchema = new mongoose.Schema({
        username: {type: String, trim: true},
        password: {type: String, trim: true},
        points: {type: Number, default: 0},
        access_rights: {type: String, trim: true, default: "user"},
        location: {type: String, trim: true, default: "Undefined"},
        subscribers: {type: [mongoose.Types.ObjectId], default: []}
    },
    {
        collection: "user"
    }
);
const ModelUser = mongoose.model("User", userSchema);

let questionSchema = new mongoose.Schema({
    question_string: String,
    min_score: mongoose.Types.Decimal128,
    max_score: mongoose.Types.Decimal128,
    max_text: String,
    min_text: String,
    score: {type: mongoose.Types.Decimal128, default: -1}
});
const ModelQuestion = mongoose.model("Question", questionSchema);

let answerSchema = new mongoose.Schema({
    question_string: String,
    question_id: mongoose.Types.ObjectId,
    min_score: mongoose.Types.Decimal128,
    max_score: mongoose.Types.Decimal128,
    max_text: String,
    min_text: String,
    score: {type: mongoose.Types.Decimal128, default: -1}
});
const ModelAnswer = mongoose.model("Answer", answerSchema);

let assessmentSchema = new mongoose.Schema({
        assessment_name: {type: String, trim: true},
        assessment_description: {type: String, trim: true},
        published_date: {type: Date},
        questions: {type: [questionSchema], default: []}
    },
    {
        collection: "all_assessments"
    }
);
const ModelAssessment = mongoose.model("Assessment", assessmentSchema);

let basicAssessmentSchema = new mongoose.Schema({
        assessment_name: {type: String, trim: true},
        assessment_description: {type: String, trim: true},
        published_date: {type: Date},
        questions: {type: [questionSchema], default: []}
    },
    {
        collection: "basic_assessment"
    }
);
const ModelBasicAssessment = mongoose.model("BasicAssessment", basicAssessmentSchema);

let completedAssessmentSchema = new mongoose.Schema({
        date_time: {type: Date, default: Date.now},
        user_id: mongoose.Types.ObjectId,
        assessment_id: mongoose.Types.ObjectId,
        answers: {type: [answerSchema]},
        comment: {type: String, default: "", trim: true}
    },
    {
        collection: "completed_assessments"
    }
);
const ModelCompletedAssessment = mongoose.model("CompletedAssessment", completedAssessmentSchema);

exports.ModelUser = ModelUser;
exports.ModelAssessment = ModelAssessment;
exports.ModelCompletedAssessment = ModelCompletedAssessment;
exports.ModelBasicAssessment = ModelBasicAssessment;
exports.ModelQuestion = ModelQuestion;
exports.ModelAnswer = ModelAnswer;
