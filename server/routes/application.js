'use strict';

var path = require('path');
var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res){
	console.log('In application router...');
	console.log(req.isAuthenticated());
	if(req.isAuthenticated()){
		res.json(true);
	} else {
		res.json(new Error(401));
	}
});
module.exports = router;
