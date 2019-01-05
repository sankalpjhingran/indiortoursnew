'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var regionController  = require('../controllers/region');

console.log('In region route===>');
router.post('/', regionController.create);
router.get('/', regionController.show);
router.get('/all/', regionController.index);
router.delete('/', regionController.delete);
router.post('/update/', regionController.update);
module.exports = router;
