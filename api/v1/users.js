var express = require('express');
var router = express.Router();
var models = require('express-cassandra');


router.get("/", function(req, res) {
	models.instance.User.findAll(function(err, response) {
		res.json(response);
	});
});


module.exports = router;