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


module.exports = router;