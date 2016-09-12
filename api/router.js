var express = require("express");
var path = require("path");
var router = express.Router();
var apiUtils = require(path.join(__dirname, "utils"));
var usersApi = require(path.join(__dirname, "users"));
var tokenApi = require(path.join(__dirname, "tokens"));
var jwt = require("jsonwebtoken");
var config = require(path.join(__dirname, "..", "config"))


/* Use the authorization parser */
router.use(tokenApi.authParser);

new apiUtils.Route(router, "users")
	.get(":read", function(req, res) {
		usersApi.getAllUsers(function(err, resp) {
			apiUtils.type(res, "v1");
			res.json(resp || {error: err});
		});
	})
	.post(":write", function(req, res) {
		var name = req.query.name;
		var email = req.query.email;
		usersApi.createNewUser(name, email, function(err, resp) {
			apiUtils.type(res, "v1");
			res.json(resp || {error: err});
		});
	});

new apiUtils.Route(router, "users", "/users/:uuid")
	.get(":read", function(req, res) {
		usersApi.getUserById(req.params.uuid, function(err, resp) {
			apiUtils.type(res, "v1");
			res.json(resp || {error: err});
		});
	});
	
new apiUtils.Route(router, "tokens")
	.post(":write", function(req, res) {
		apiUtils.type(res, "v1");
		res.json({
			token: tokenApi.createNewToken(req.body.scope)
		});
	});


module.exports = router;