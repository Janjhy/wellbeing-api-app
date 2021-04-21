let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");
require('dotenv').config();

let app = express();
let port = 8066;
let routes = require("./routes");
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0.ybpd1.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyparser.urlencoded({extended: true}));
routes.apiRouter(app, mongoose);

app.use((_, res) => {
   res.status(404);
   res.json({error: 'Invalid URL'});
});

app.listen(port);

console.log("Port " + port + " in use.")

exports = module.exports = app;
