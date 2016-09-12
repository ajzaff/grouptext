var path = require("path");
var express = require("express");
var router = express.Router();
var tokenApi = require(path.join(__dirname, "..", "api", "tokens"));


router.get("/", function(req, res) {
	res.render("pages/signup");
});

router.post("/", function(req, res) {
	if (!req.body.name) {
		res.render("pages/signup", {
			message: {
				type: "error",
				content: "name is required."
			}
		});
	} else if (!req.body.pass) {
		res.render("pages/signup", {
			message: {
				type: "error",
				content: "password is required."
			}
		});
	} else if (!req.body.pass2) {
		res.render("pages/signup", {
			message: {
				type: "error",
				content: "repeated password is required."
			}
		});
	} else if (req.body.pass !== req.body.pass2) {
		res.render("pages/signup", {
			message: {
				type: "error",
				content: "passwords do not match."
			}
		});
	} else {
		res.redirect("/");
	}
});


module.exports = router;
