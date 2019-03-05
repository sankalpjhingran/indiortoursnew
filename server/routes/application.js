'use strict';

var path = require('path');
var express = require('express');
//var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res){
	console.log('In application router...');
	console.log(req.isAuthenticated());

	if(req.isAuthenticated()){
			const returnUser = {
				firstname: req.user.firstname,
				lastname: req.user.lastname,
				email: req.user.email,
				type: req.user.type,
				dateofbirth: req.user.dateofbirth,
				gender: req.user.gender,
				addressline1: req.user.addressline1,
				lastLogin: req.user.lastLogin,
				email: req.user.email,
				phone: req.user.phone
			};
			res.status(200).json({"isLoggedIn":true, "user": returnUser});
	}else{
		res.status(200).json({"isLoggedIn":false, "user": undefined});
	}

});
module.exports = router;
