'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var parentTourController  = require('../controllers/parenttour');
var authenticated = require('./authenticated');

console.log('In parenttour route===>');
router.post('/', parentTourController.create);
router.get('/viewtrip', parentTourController.show);
router.get('/all/', parentTourController.index);
router.delete('/', parentTourController.delete);
router.post('/update/', parentTourController.update);
module.exports = router;
