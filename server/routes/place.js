'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var placeController  = require('../controllers/place');
var authenticated = require('./authenticated');

console.log('In Place route===>');
router.post('/', authenticated, placeController.create);
router.get('/', authenticated, placeController.show);
router.get('/all/', authenticated, placeController.index);
router.delete('/', authenticated, placeController.delete);
router.post('/update/', authenticated, placeController.update);
module.exports = router;
