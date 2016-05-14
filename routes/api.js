'use strict';

var express = require('express');
var path = require('path');
var router = express.Router();

router.use('/auctions', require('./auctions'));


module.exports = router;