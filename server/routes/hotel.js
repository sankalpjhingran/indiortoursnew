'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var hotelController  = require('../controllers/hotel');
var authenticated = require('./authenticated');

console.log('In Hotel route===>');
router.post('/', authenticated, hotelController.create);
router.get('/all/', hotelController.index);
router.get('/', hotelController.show);
router.delete('/', authenticated, hotelController.delete);
router.post('/update/', authenticated, hotelController.update);

module.exports = router;
