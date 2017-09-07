'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var leads  = require('../controllers/leads');

console.log('in contactus route');

leads.sync();
router.post('/', leads.create);
router.get('/', leads.index);
module.exports = router;
