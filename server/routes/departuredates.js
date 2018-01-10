'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var departureCostsController  = require('../controllers/dates');

console.log('In departureCostsController route===>');
router.post('/', departureCostsController.create);
router.get('/', departureCostsController.show);
router.get('/all/', departureCostsController.index);
router.delete('/', departureCostsController.delete);
router.post('/update/', departureCostsController.update);

module.exports = router;
