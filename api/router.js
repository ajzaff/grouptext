var express = require("express");
var path = require("path");
var router = express.Router();
var apiUtils = require(path.join(__dirname, "utils"));
var usersApi = require(path.join(__dirname, "users"));


router.get("/users", function(req, res) {
	usersApi.getAllUsers(function(err, resp) {
		apiUtils.type(res, "v1");
		res.json(resp || {error: err});
	});
});

router.post("/users", function(req, res) {
	var name = req.query.name;
	var email = req.query.email;
	usersApi.createNewUser(name, email, function(err, resp) {
		apiUtils.type(res, "v1");
		res.json(resp || {error: err});
	});
});

router.get("/users/:uuid", function(req, res) {
	usersApi.getUserById(req.params.uuid, function(err, resp) {
		apiUtils.type(res, "v1");
		res.json(resp || {error: err});
	});
});


module.exports = router;