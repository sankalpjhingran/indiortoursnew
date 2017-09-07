'use strict';

var path = require('path');
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post("/", function(req, res){
	console.log('Logging out user...');
	req.logOut();
	req.session.destroy()
	res.redirect("/")
});

module.exports = router;
