'use strict';

var path = require('path');
var express = require('express');
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
		};
		res.json({"isLoggedIn":true, "isAdmin": (returnUser.type == 'Admin' ? true : false), "user": returnUser});
	}else{
		res.json({"isLoggedIn":false, "isAdmin": false});
	}
	return res;
});
module.exports = router;
