'use strict';

var path = require('path');
var express = require('express');
//var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res){
	console.log('In application router...');
	console.log(req);
	console.log(req.isAuthenticated());

	if(req.isAuthenticated()){
			res.status(200).json({"isLoggedIn":true, "user": req.user});
	}else{
		res.status(200).json({"isLoggedIn":false, "user": undefined});
	}

});
module.exports = router;
