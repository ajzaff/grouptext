var path = require("path");
var jwt = require("jsonwebtoken");
var config = require(path.join(__dirname, "..", "config"));


function TokenScopes() {
}

TokenScopes.parse = function(scopes) {
	if (!scopes)
		return [];
	scopes = scopes.split(/\s+/);
	var tokenScopes = [];
	scopes.forEach(function(scope) {
		if (!tokenScopes.includes(scope))
			tokenScopes.push(scope);
	});
	return tokenScopes;
}

TokenScopes.registerScopedRoute = function(method, path, scope) {
	var tmp = TokenScopes.routes;
	TokenScopes.routes = tmp || {};
	
	tmp = TokenScopes.routes[method];
	TokenScopes.routes[method] = tmp || {};
	
	tmp = TokenScopes.routes[method][path];
	tmp = TokenScopes.routes[method][path] = tmp || [];
	if (!tmp.includes(scope))
		TokenScopes.routes[method][path].push(scope);
}

function TokenApi() {
}

TokenApi.createNewToken = function(scopes, options) {
	return jwt.sign({scope: TokenScopes.parse(scopes)},
		config.secret,
		options);
}

TokenApi.hasScope = function(method, path, token) {
	if (!TokenScopes.routes)
		return false;
	if (!TokenScopes.routes[method])
		return false;
	if (!TokenScopes.routes[method][path])
		return false;
	return TokenScopes.routes[method][path].find(function(scope) {
		return token.scope.includes(scope);
	}) !== undefined;
}

TokenApi.Scopes = TokenScopes;


module.exports = TokenApi;