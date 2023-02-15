'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var bookingController  = require('../controllers/booking');

console.log('In booking route===>');
router.post('/', bookingController.create);
router.get('/', bookingController.show);
router.get('/all/', bookingController.index);
router.delete('/', bookingController.delete);
router.patch('/update/', bookingController.update);
module.exports = router;
