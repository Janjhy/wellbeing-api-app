const express = require("express");
const { body, validationResult, query } = require("express-validator");
const { ModelUser, ModelBasicAssessment, ModelAssessment, ModelCompletedAssessment, ModelRequest } = require("./models");
const ObjectId = require("mongoose").Types.ObjectId;

exports.apiRouter = (app) => {
    app.get("/*", (req, res, next) => {
        res.contentType("application/json");
        next();
    });

    app.post("/*", (req, res, next) => {
        res.contentType("application/json");
        next();
    });

    app.put("/*", (req, res, next) => {
        res.contentType("application/json");
        next();
    });

    app.delete("/*", (req, res, next) => {
        res.contentType("application/json");
        next();
    });

    const router = express.Router();
    router.get("/", (_, res) => {
        res.json({ message: "Welcome to the Wellbeing API." })
    });

    //Create user
    router.post("/user",
        body("username").exists({ checkFalsy: true }).isLength({ min: 2 }),
        body("password").exists({ checkFalsy: true }).isLength({ min: 8 }),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (ModelUser.exists({ "username": req.body.username }, (error, _) => {
                if (error) {
                    return res.status(400).json({ errors: error });
                }
            })) return res.status(400).json({ errors: "Username already exists." });
            let user = new ModelUser({
                username: req.body.username,
                password: req.body.password,
                points: req.body.points,
                access_rights: req.body.access_rights,
                location: req.body.location,
                subscribers: req.body.subscribers
            });
            user.save((err, doc) => {
                if (err) {
                    return res.status(400).json({ errors: err });
                } else {
                    return res.status(201).json(doc);
                }
            })

        }
    );

    //Get user by username
    router.get("/find-user/:username?",
        (req, res) => {
            let usernameParam = req.query.username;
            ModelUser.findOne({ "username": usernameParam }, (error, results) => {
                if (error) {
                    return res.status(400).json({ errors: error });
                }
                if (results == null) {
                    return res.status(400).json({ errors: "No such username found." })
                } else {
                    return res.status(200).json(results);
                }
            })
        }
    );

    //Get user by id
    router.get("/find-id/:id?",
        query("id").exists({ checkFalsy: true }).custom((id) => checkValidID(id)),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            let idParam = req.query.id;
            ModelUser.findById({ "_id": idParam }, (error, results) => {
                if (error) {
                    return res.status(400).json({ errors: error });
                }
                if (results == null) {
                    return res.status(400).json({ errors: "No such user id found." })
                } else {
                    return res.status(200).json(results);
                }
            })
        }
    );

    //Get basic assessment
    router.get("/assessment/basic",
        (req, res) => {
            ModelBasicAssessment.findById("6026848f720e2f5db8c09ca9", // Maybe extract parameter
                (error, results) => {
                    if (error) {
                        return res.status(400).json({ errors: error });
                    }
                    if (results.length < 1) {
                        return res.status(400).json({ errors: "No basic assessment found." })
                    } else {
                        return res.status(200).json(results);
                    }
                }
            )
        }
    );

    //Post completed assessment
    router.post("/assessment/add-complete",
        body("user_id").exists({ checkFalsy: true }).bail().custom((id) => checkValidID(id)),
        body("assessment_id").exists({ checkFalsy: true }).bail().custom((id) => checkValidID(id)),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!ModelUser.exists({ "_id": req.body.user_id })) {
                return res.status(400).json({ errors: "No such user id found." });
            }
            if (!ModelAssessment.exists({ "_id": req.body.assessment_id })) {
                return res.status(400).json({ errors: "No such assessment found." });
            }
            console.log(req.body.answers[0]);
            let assessment = new ModelCompletedAssessment({
                user_id: req.body.user_id,
                assessment_id: req.body.assessment_id,
                answers: req.body.answers,
                comment: req.body.comment,
            });
            assessment.save((err, doc) => {
                if (err) {
                    return res.status(400).json({ errors: err });
                } else {
                    return res.status(201).json(doc);
                }
            })
        }
    );

    //Create request
    router.post("/requests",
        body("user_id").exists({ checkFalsy: true }).bail().custom((id) => checkValidID(id)),
        body("description").exists({ checkFalsy: true }).isLength({ min: 1, max: 1000 }),
        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            if (!ModelUser.exists({ "_id": req.body.user_id })) {
                return res.status(400).json({ errors: "No such user id found." });
            }
            let request = new ModelRequest({
                description: req.body.description,
                user_id: req.body.user_id,
            });
            request.save((err, doc) => {
                if (err) {
                    return res.status(400).json({ errors: err });
                } else {
                    return res.status(201).json(doc);
                }
            })

        }
    );

    //get request list
    router.get('/requests', (request, response) => {
        ModelRequest.find({ help: false }).then(requests => {
            response.json(requests)
        })
    });

    //get request list of spicific person
    router.get('/requests/:userid',
    //query("id").exists({ checkFalsy: true }).custom((id) => checkValidID(id)),
     (request, response) => {
        ModelRequest.find({ user_id: request.params.userid, help: false }).then(item => {
            item ? response.json(item) : response.status(404).end()
        })
            .catch(error => {
                console.log(error)
                response.status(500).end()
            })
    })

    // delete request
    router.delete('/requests/:id',
        (request, response) => {
            if (!ModelRequest.exists({ "_id": request.params.id })) {
                return res.status(400).json({ errors: "No request matched." });
            }
            ModelRequest.findByIdAndRemove(request.params.id).then(item => {
                item ? response.json(item) : response.status(404).end()
            })
                .catch(error => console.log(error))
        })

    //update request
    router.put('/requests',
        body("request_id").exists({ checkFalsy: true }).bail().custom((id) => checkValidID(id)),
        body("helper_id").exists({ checkFalsy: true }).bail().custom((id) => checkValidID(id))
        , (request, response) => {
            if (!ModelRequest.exists({ "_id": request.body.request_id })) {
                return res.status(400).json({ errors: "No request matched." });
            }
            const updateRequest = {
                help: true,
                helper: request.body.helper_id
            }

            ModelRequest.findByIdAndUpdate(request.body.request_id, updateRequest, { new: true })
                .then(updatedRequest => {
                    response.json(updatedRequest)
                })
        })

    app.use("/api", router);
};

function checkValidID(id) {
    if (ObjectId.isValid(id)) {
        return (String(new ObjectId(id)) === id)
    } else return false
}


