'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var continentController  = require('../controllers/continent');

console.log('In Continent route===>');
router.post('/', continentController.create);
router.get('/', continentController.show);
router.get('/all/', continentController.index);
router.delete('/', continentController.delete);
router.post('/update/', continentController.update);
module.exports = router;
