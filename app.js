var express = require("express");
var path = require("path");
var expressJWT = require("express-jwt");
var jwt = require("jsonwebtoken");
var config = require(path.join(__dirname, "config"));
var bodyParser = require("body-parser");


/* Initialize ORM data models */
require(path.join(__dirname, "db", "models"));

var app = express();

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded

/* API */
// app.use(expressJWT({ secret: config.secret }).unless({
// 	path: [
// 		"/api/tokens",
// 		/^\/[^\/]*\/?$/,
// 		/^\/images\//,
// 		/^\/js\//,
// 		/^\/stylesheets\//
// 	]
// }));
app.use("/api", require(path.join(__dirname, "api", "router")));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
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
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("grouptext listening on port " + port + "!");
});
