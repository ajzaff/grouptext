var express = require('express');
var router = express.Router();


/* Define endpoints */
router.use("/users", require("./users"));


module.exports = router;