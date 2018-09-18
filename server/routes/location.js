'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var locationController  = require('../controllers/location');

console.log('In Location route===>');
router.post('/', locationController.create);
router.get('/', locationController.show);
router.get('/getGroupedLocations/', locationController.getGroupedLocations);
router.get('/getContinents/', locationController.getContinents); 
router.get('/all/', locationController.index);
router.delete('/', locationController.delete);
router.post('/update/', locationController.update);
module.exports = router;
