'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var tagController  = require('../controllers/tags');
var authenticated = require('./authenticated');

console.log('In tag route===>');
router.post('/', authenticated, tagController.create);
//router.get('/', tagController.show);
router.get('/all/', authenticated, tagController.index);
router.delete('/', authenticated, tagController.delete);
router.post('/update/', authenticated, tagController.update);
module.exports = router;
