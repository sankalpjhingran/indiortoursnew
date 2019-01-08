'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var countryController  = require('../controllers/country');

console.log('In country route===>');
router.post('/', countryController.create);
router.get('/', countryController.show);
router.get('/all/', countryController.index);
router.get('/tours/', countryController.getToursForCountry);
router.get('/toursforregion/', countryController.getToursForCountry2);
router.delete('/', countryController.delete);
router.post('/update/', countryController.update);
module.exports = router;
