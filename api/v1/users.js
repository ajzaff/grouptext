var express = require('express');
var router = express.Router();
var models = require('express-cassandra');


router.get("/", function(req, res) {
	models.instance.User.find(
		{},
		{raw: true},
		function(err, users) {
			if (err) {
				console.error(err);
				res.json({error: err});
			} else {
				res.json(users);
			}
		}
	);
});

router.get("/:uuid", function(req, res) {
	models.instance.User.findOne(
		{id: models.uuidFromString(req.params.uuid)},
		{raw: true},
		function(err, user) {
			if (err) {
				console.error(err);
				res.json({error: err});
			} else {
				res.json(user);
			}
		}
	)
});

router.post("/", function(req, res) {
	var uuid = models.uuid();
	var user = new models.instance.User({
		id: uuid,
		name: req.query.name,
		email: req.query.email
	});
	user.save({if_not_exists: true}, function(err) {
		if (err) {
			console.error(err);
			res.json({error: err});
		} else {
			res.json({
				status: "ok",
				uuid: uuid
			});
		}
	});
});


module.exports = router;