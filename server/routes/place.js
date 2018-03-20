'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var placeController  = require('../controllers/place');

console.log('In Place route===>');
router.post('/', placeController.create);
router.get('/', placeController.show);
router.get('/all/', placeController.index);
router.delete('/', placeController.delete);
router.post('/update/', placeController.update);
module.exports = router;
