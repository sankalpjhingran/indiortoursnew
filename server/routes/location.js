'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var locationController  = require('../controllers/location');
var authenticated = require('./authenticated');

console.log('In Location route===>');
router.post('/', authenticated, locationController.create);
router.get('/', locationController.show);
router.get('/all/', locationController.index);
router.delete('/', authenticated, locationController.delete);
router.post('/update/', authenticated, locationController.update);
module.exports = router;
