var path = require("path");
var tokenApi = require(path.join(__dirname, "tokens"));


function ApiUtils() {
}

ApiUtils.versions = [
	"v1",
	"v2"
];

ApiUtils.accepts = function(req, version) {
	return req.accepts("application/vnd.grouptext." + version + "+json");
}

ApiUtils.type = function(res, version) {
	res.type("application/vnd.grouptext." + version + "+json");
}

function ApiRouteWrapper(router, scope, path) {
	this.path = path || ("/" + scope);
	this.router = router.route(this.path);
	this.scope = scope;
	return this;
}

ApiRouteWrapper.prototype.post = function(specifier, callback) {
	tokenApi.Scopes.registerScopedRoute(
		"POST",
		this.path,
		this.scope + specifier);
	this.router = this.router.post(callback);
	return this;
}

ApiRouteWrapper.prototype.get = function(specifier, callback) {
	tokenApi.Scopes.registerScopedRoute(
		"GET",
		this.path,
		this.scope + specifier);
	this.router = this.router.get(callback);
	return this;
}

ApiRouteWrapper.prototype.put = function(specifier, callback) {
	tokenApi.Scopes.registerScopedRoute(
		"PUT",
		this.path,
		this.scope + specifier);
	this.router = this.router.put(callback);
	return this;
}

ApiRouteWrapper.prototype.delete = function(specifier, callback) {
	tokenApi.Scopes.registerScopedRoute(
		"DELETE",
		this.path,
		this.scope + specifier);
	this.router = this.router.delete(callback);
	return this;
}

ApiUtils.Route = ApiRouteWrapper;


module.exports = ApiUtils;