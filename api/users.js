var models = require("express-cassandra");


function UserApi() {
}

UserApi.getAllUsers = function(callback) {
	models.instance.User.find(
		{},
		{raw: true},
		function(err, users) {
			if (err)
				callback(err, null);
			else
				callback(null, users);
		}
	);
}

UserApi.getUserById = function(id, callback) {
	models.instance.User.findOne(
		{id: models.uuidFromString(id)},
		{raw: true},
		function(err, user) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, user);
			}
		}
	);
}

UserApi.createNewUser = function(username, email, callback) {
	var uuid = models.uuid();
	var user = new models.instance.User({
		id: uuid,
		name: username,
		email: email
	});
	user.save({if_not_exists: true}, function(err) {
		if (err) {
			callback(err);
		} else {
			callback(null, {
				status: "ok",
				uuid: uuid
			});
		}
	});
}

module.exports = UserApi;