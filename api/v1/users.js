var express = require('express');
var router = express.Router();
var models = require('express-cassandra');


router.get("/", function(req, res) {
	models.instance.User.find(
		{},
		{select: ['name']},
		function(err, users) {
			if (err)
				res.json({error: err});
			else
				res.json(users);
		}
	);
});

router.post("/", function(req, res) {
	var user = new models.instance.User({
		name: req.query.name
	});
	user.save(function(err) {
		if (err)
			res.json({error: err});
		else
			res.json(user);
	});
});


module.exports = router;