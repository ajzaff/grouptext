var express = require("express");
var router = express.Router();


router.get("/", function(req, res) {
	res.render("pages/signup");
});

router.post("/", function(req, res) {
	res.redirect("/");
});


module.exports = router;
