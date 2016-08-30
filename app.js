var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.get("/", function(req, res) {
	// TODO: render dashboard if logged in, otherwise splash page.
	if (true) {
		res.render("pages/dashboard", { title: "Grouptext" });
	} else {
		res.render("pages/index", { title: "Grouptext" });
	}
});
app.get("/signup", function(req, res) {
	res.render("pages/signup");
});
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("grouptext listening on port " + port + "!");
});
