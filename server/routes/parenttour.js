'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var parentTourController  = require('../controllers/parenttour');

console.log('In parenttour route===>');
router.post('/', parentTourController.create);
router.patch('/update/', parentTourController.update);
router.get('/viewtrip', parentTourController.show);
router.get('/all/', parentTourController.index);
router.get('/allTripsByOrder', parentTourController.indexAllByOrder);
router.delete('/', parentTourController.delete);
module.exports = router;
