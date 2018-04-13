'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var parentTourController  = require('../controllers/parenttour');

console.log('In parenttour route===>');
router.post('/', parentTourController.create);
//router.get('/', parentTourController.show);
router.get('/all/', parentTourController.index);
router.delete('/', parentTourController.delete);
router.post('/update/', parentTourController.update);
router.post('/create/', parentTourController.create);
module.exports = router;
