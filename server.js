let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");

let app = express();
let port = 8066;
let config = require("./config/dev.js");
let routes = require("./routes");

mongoose.connect(config.mongodatabase.uri + "/" + config.mongodatabase.db_name, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyparser.urlencoded({extended: true}));
routes.apiRouter(app, mongoose);

app.use((_, res) => {
   res.status(404);
   res.json({error: 'Invalid URL'});
});



app.listen(port);

console.log("Port " + port + " in use.")

exports = module.exports = app;
