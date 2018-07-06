'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var tourCostsController  = require('../controllers/costs');

console.log('In tourCostsController route===>');
router.post('/', tourCostsController.create);
router.get('/', tourCostsController.show);
router.get('/all/', tourCostsController.index);
router.delete('/', tourCostsController.delete);
router.post('/update/', tourCostsController.update);
module.exports = router;
