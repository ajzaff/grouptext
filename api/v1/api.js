var express = require('express');
var router = express.Router();


/* Define endpoints */
router.use("/user", require("./users"));


module.exports = router;