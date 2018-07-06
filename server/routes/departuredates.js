'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var departureCostsController  = require('../controllers/dates');

console.log('In departureCostsController route===>');

/*
===Main Routes Start===
*/
router.get('/', departureCostsController.show);
/*
===Main Routes End===
*/


/*
===Admin Routes Start===
*/
router.post('/update/', departureCostsController.update);
router.delete('/', departureCostsController.delete);
router.post('/', departureCostsController.create);
router.get('/all/', departureCostsController.index);
/*
===Admin Routes End===
*/
router.post('/', departureCostsController.create);
router.get('/', departureCostsController.show);
router.get('/all/', departureCostsController.index);
router.delete('/', departureCostsController.delete);
router.post('/update/', departureCostsController.update);

module.exports = router;
