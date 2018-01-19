'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var models  = require('../models/index');

/* GET to login route */
router.get('/', function(req, res) {
  console.log('in router regusers...====>');
    models.User.findAll().then(function(users){
      res.json(users);
    });
});
module.exports = router;
