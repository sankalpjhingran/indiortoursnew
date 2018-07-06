'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var tourCostsController  = require('../controllers/costs');
var authenticated = require('./authenticated');

console.log('In tourCostsController route===>');
router.post('/', authenticated, tourCostsController.create);
router.get('/', tourCostsController.show);
router.get('/all/', tourCostsController.index);
router.delete('/', authenticated, tourCostsController.delete);
router.post('/update/', authenticated, tourCostsController.update);
module.exports = router;
