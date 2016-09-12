var path = require("path");
var express = require("express");
var router = express.Router();


/* Route handlers (recursive) */
router.use("/signup", require(path.join(__dirname, "signup")));

/* Index router (splashpage) */
router.get("/", function(req, res) {
	// TODO: render dashboard if logged in, otherwise splash page.
	if (true) {
		res.render("pages/dashboard", { title: "Grouptext" });
	} else {
		res.render("pages/index", { title: "Grouptext" });
	}
});


module.exports = router;
