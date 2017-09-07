'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var users  = require('../controllers/users');

console.log('in signup route');

users.sync();
router.post('/', users.register);
module.exports = router;
