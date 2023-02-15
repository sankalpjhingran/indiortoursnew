'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var tagController  = require('../controllers/tags');

console.log('In tag route===>');
router.post('/', tagController.create);
//router.get('/', tagController.show);
router.get('/all/', tagController.index);
router.delete('/', tagController.delete);
router.patch('/update/', tagController.update);
module.exports = router;
