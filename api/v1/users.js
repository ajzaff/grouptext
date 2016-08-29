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

router.post("/", function(req, res) {
	console.log(String(req.query.email));
	var user = new models.instance.User({
		id: models.uuid(),
		name: req.query.name,
		email: req.query.email
	});
	user.save({if_not_exists: true}, function(err) {
		if (err) {
			console.error(err);
			res.json({error: err});
		} else {
			res.json({status: "ok", user: user});
		}
	});
});


module.exports = router;