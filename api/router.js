var express = require("express");
var path = require("path");
var router = express.Router();
var apiUtils = require(path.join(__dirname, "utils"));
var usersApi = require(path.join(__dirname, "users"));
var tokenApi = require(path.join(__dirname, "tokens"));
var jwt = require("jsonwebtoken");
var config = require(path.join(__dirname, "..", "config"))


router.use(function(req, res, next) {
	var auth;
	if (auth=req.get("Authorization")) {
		// first, verify token
		var token = auth.match(/Bearer\s+(.*)/)[1];
		if (!(token=jwt.verify(token, config.secret))) {
			res.render("401");
			return;
		}
		// finally, check token scope
		if (!tokenApi.hasScope(req.method, req.path, token)) {
			res.render("401");
			return;
		}
	} else {
		res.render("401");
		return;
	}
	next();
})

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
		res.json({
			token: tokenApi.createNewToken(req.body.scope)
		});
	});


module.exports = router;