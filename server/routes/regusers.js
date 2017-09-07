'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var models  = require('../models/index');

/* GET to login route */
router.get('/', function(req, res) {
  console.log('in router regusers...====>');
  if(req.isAuthenticated()){
      models.User.sync();
      models.User.findAll().then(function(users){
        res.json(users);
      });
  }else{
      console.log('User not Authenticated...');
      res.json({message: 'Please login to view registered users...', success: false});
  }
});
module.exports = router;
