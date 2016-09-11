var express = require("express");
var router = express.Router();


router.get("/signup", function(req, res) {
	res.render("pages/signup");
});

router.post("/signup", function(req, res) {
	res.redirect("/");
});


module.exports = router;
