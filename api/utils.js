var path = require("path");


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


module.exports = ApiUtils;