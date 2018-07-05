'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var parentTourController  = require('../controllers/parenttour');
var authenticated = require('./authenticated');

console.log('In parenttour route===>');
router.post('/', authenticated, parentTourController.create);
router.get('/viewtrip', parentTourController.show);
router.get('/all/', parentTourController.index);
router.delete('/', authenticated, parentTourController.delete);
router.post('/update/', authenticated, parentTourController.update);
module.exports = router;
