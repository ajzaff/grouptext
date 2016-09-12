var express = require("express");
var path = require("path");
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var config = require(path.join(__dirname, "config"));
var bodyParser = require("body-parser");
var logger = require("morgan");


/* Initialize ORM data models */
require(path.join(__dirname, "db", "models"));

/* Initialize app */
var app = express();

/* Logging settings */
app.settings.env = config.env;
if (app.settings.env == "production") {
	app.disable("errors");
}
app.use(logger("dev"));

/* Body parsers */
app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded

/* API */
app.use("/api", require(path.join(__dirname, "api", "router")));

/* Configure public assets */
app.use(express.static(path.join(__dirname, "public")));

/* Configure views */
app.set("view engine", "ejs");
app.set("views", [
	path.join(__dirname, "views"),
	path.join(__dirname, "public")
]);

/* Add route handlers (recursive) */
app.use("/", require(path.join(__dirname, "routes", "index")));

/* error handler */
app.use(function(err, req, res, next) {
	if (app.settings.env == "production") {
		err.status = err.status || 500;
	}
	res.status(err.status).render(String(err.status));
});

/* 404 */
app.use(function(req, res) {
	res.status(404).render("404");
});

/* Run app on port 3000 */
app.listen(config.port, function() {
	console.log("grouptext listening on port " + config.port + "!");
});

