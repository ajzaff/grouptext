var express = require("express");
var path = require("path");
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var config = require(path.join(__dirname, "config"));
var bodyParser = require("body-parser");


/* Initialize ORM data models */
require(path.join(__dirname, "db", "models"));

/* Initialize app */
var app = express();

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded

/* API */
app.use("/api", require(path.join(__dirname, "api", "router")));

/* Configure public assets */
app.use(express.static(path.join(__dirname, "public")));

/* Configure views */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* Add route handlers (recursive) */
app.use("/", require(path.join(__dirname, "routes", "index")));

/* Run app on port 3000 */
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("grouptext listening on port " + port + "!");
});

