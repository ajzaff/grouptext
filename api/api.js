var express = require('express');
var router = express.Router();


/* Define endpoint versions */
router.use("/", require("./v1/v1"));
router.use("/v1", require("./v1/v1"));


module.exports = router;