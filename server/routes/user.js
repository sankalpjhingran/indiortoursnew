'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var userController  = require('../controllers/users');

console.log('In User route===>');
router.post('/', userController.create);
router.get('/', userController.show);
router.get('/all/', userController.index);
router.delete('/', userController.delete);
router.post('/update/', userController.update);
module.exports = router;
