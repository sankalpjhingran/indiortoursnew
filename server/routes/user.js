'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var userController  = require('../controllers/users');
var authenticated = require('./authenticated');

console.log('In User route===>');
router.post('/', authenticated, userController.create);
router.get('/', authenticated, userController.show);
router.get('/all/', authenticated, userController.index);
router.delete('/', authenticated, userController.delete);
router.post('/update/', authenticated, userController.update);
module.exports = router;
