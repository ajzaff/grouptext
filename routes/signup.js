var path = require("path");
var express = require("express");
var router = express.Router();
var tokenApi = require(path.join(__dirname, "..", "api", "tokens"));
var usersApi = require(path.join(__dirname, "..", "api", "users"));


router.get("/", function(req, res) {
	res.render("pages/signup");
});

router.post("/", function(req, res) {
	if (!req.body.name)
		err = "name is required.";
	else if (!req.body.pass)
		err = "password is required.";
	else if (!req.body.pass2)
		err = "repeated password is required.";
	else if (req.body.pass !== req.body.pass2)
		err = "passwords do not match.";
	if (err) {
		res.render("pages/signup", {
			message: {
				type: "error",
				content: err
			},
			form: {
				name: req.body.name
			}
		});
	} else {
		var callback = function(err, user) {
			if (err) {
				res.render("pages/signup", {
					message: {
						type: "error",
						content: "user already exists"
					},
					form: {
						name: req.body.name
					}
				});
			} else {
				res.cookie("id_gtext", "");
				res.redirect("/");
			}
		};
		usersApi.createNewUser(
			req.body.name,
			req.body.email,
			callback
		);
	}
});


module.exports = router;
