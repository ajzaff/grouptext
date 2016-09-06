var express = require("express");
var path = require("path");
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var config = require(path.join(__dirname, "config"));
var bodyParser = require("body-parser");
var logger = require("morgan");


/* Initialize ORM data models */
require(path.join(__dirname, "db", "models"));

var app = express();

/* logging settings */
app.settings.env = config.env;
if (app.settings.env == "production")
	app.disable("errors");
app.use(logger("dev"));

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded

/* API */
app.use(expressJWT({ secret: config.secret }).unless({
	path: [
		"/api/tokens",
		/^\/[^\/]*\/?$/,
		/^\/images\//,
		/^\/js\//,
		/^\/stylesheets\//
	]
}));
app.use("/api", require(path.join(__dirname, "api", "router")));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", [
	path.join(__dirname, "views"),
	path.join(__dirname, "public")
]);
app.get("/", function(req, res) {
	// TODO: render dashboard if logged in, otherwise splash page.
	if (false) {
		res.render("pages/dashboard", { title: "Grouptext" });
	} else {
		res.render("pages/index", { title: "Grouptext" });
	}
});
app.get("/signup", function(req, res) {
	res.render("pages/signup");
});
app.post("/signup", function(req, res) {
	res.redirect("/");
});

/* error handler */
app.use(function(err, req, res, next) {
	res.status(err.status).render(String(err.status));
});

/* 404 */
app.use(function(req, res) {
	res.status(404).render("404");
});

app.listen(config.port, function() {
	console.log("grouptext listening on port " + config.port + "!");
});
