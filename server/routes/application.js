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
			const returnUser = {
				firstname: req.user.firstname,
				lastname: req.user.lastname,
				email: req.user.email,
				type: req.user.type
			};
			res.status(200).json({"isLoggedIn":true, "user": returnUser});
	}else{
		res.status(200).json({"isLoggedIn":false, "user": undefined});
	}

});
module.exports = router;
