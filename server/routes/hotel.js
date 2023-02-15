'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var hotelController  = require('../controllers/hotel');

console.log('In Hotel route===>');
router.post('/', hotelController.create);
router.get('/all/', hotelController.index);
router.get('/', hotelController.show);
router.delete('/', hotelController.delete);
router.patch('/update/', hotelController.update);

module.exports = router;
