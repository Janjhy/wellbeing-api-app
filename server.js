let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");
require('dotenv').config();
let http = require('http');
let https = require('https');
let fs = require('fs');

let app = express();
let port = process.env.PORT || 8066;
//let portHttps = process.env.PORT || 8069;
let routes = require("./routes");
const uri = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@cluster0.ybpd1.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
/*const options = {
   key: fs.readFileSync('key.pem'),
   cert: fs.readFileSync('cert.pem')
};*/

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyparser.urlencoded({extended: true}));
routes.apiRouter(app, mongoose);

app.use((_, res) => {
   res.status(404);
   res.json({error: 'Invalid URL'});
});

//let httpsServer = https.createServer(options, app);
let httpServer = http.createServer(app);

httpServer.listen(port);
//httpsServer.listen(portHttps);

exports = module.exports = app;
