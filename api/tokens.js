var path = require("path");
var jwt = require("jsonwebtoken");
var config = require(path.join(__dirname, "..", "config"));


var MASK_BITS = {
	none: 0,
	create: 1,
	read: 2,
	update: 4,
	delete: 8,
	write: 13,
	all: 15
};

function TokenScopes() {
}

TokenScopes.prototype.give = function(scope, value) {
	this[scope] |= (value || MASK_BITS.read);
	return this;
}

TokenScopes.prototype.all = function(scope) {
	this[scope] = 15; // apply all scopes.
	return this;
}

TokenScopes.prototype.none = function(scope) {
	this[scope] = 0;
	return this;
}

TokenScopes.prototype.toJson = function() {
	return JSON.stringify(this);
}

TokenScopes.parse = function(scopes) {
	scopes = scopes.split(/\s+/);
	var tokenScopes = new TokenScopes();
	var nextMask = undefined;
	for (i in scopes) {
		var token = scopes[i];
		if (!token)
			// continue if token is empty...
			continue;
		var res = token.match(
			"^(none|create|read|update|delete|write|all)$");
		if (res) {
			if (nextMask == 0 || nextMask == 15)
				throw "illegal state: mask is " + nextMask;
			nextMask |= MASK_BITS[res[1]];
		} else if (parseInt(token)) {
			var mod = parseInt(token);
			if (mod < 0 || mod > 15)
				throw "illegal state: mod out of range " + mod;
			nextMask |= mod;
		} else {
			tokenScopes.give(token, nextMask);
			nextMask = undefined;
		}
	}
	if (nextMask)
		throw "illegal state: expected scope after " + nextMask;
	console.log(tokenScopes);
	return tokenScopes;
}

function TokenApi() {
}

TokenApi.createNewToken = function(scopes, options) {
	return jwt.sign(TokenScopes.parse(scopes), config.secret, options);
}


module.exports = TokenApi;