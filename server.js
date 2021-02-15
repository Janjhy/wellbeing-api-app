let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");

let app = express();
let port = 8066;
let config = require("./config/dev.js");
let routes = require("./routes");

mongoose.connect(config.mongodatabase.uri);

app.use(bodyparser.urlencoded({extended: true}));
routes.apiRouter(app, mongoose);

app.use(function(_, res) {
   res.status(400);
   res.json({error: 'Invalid URL'});
});

app.listen(port);

console.log("Port " + port + " in use.")

exports = module.exports = app;
