'use strict';

var path = require('path');
var express = require('express');
var passport = require('passport');
var router = express.Router();
var users  = require('../controllers/users');


router.post("/", passport.authenticate('local-signin'), function(req, res) {
  res.json(req.user);
});

module.exports = router;
