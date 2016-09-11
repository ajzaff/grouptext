var express = require("express");
var path = require("path");
var config = require("./config");


/* Initialize ORM data models */
require("./db/models.js");

/* Initialize app */
var app = express();

/* API */
app.use("/api", require(path.join(__dirname, "api", "api")));

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
