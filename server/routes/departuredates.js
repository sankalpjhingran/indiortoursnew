'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var departureCostsController  = require('../controllers/dates');
var authenticated = require('./authenticated');

console.log('In departureCostsController route===>');

/*
===Main Routes Start===
*/
router.get('/', authenticated, departureCostsController.show);
/*
===Main Routes End===
*/


/*
===Admin Routes Start===
*/
router.post('/update/', authenticated, departureCostsController.update);
router.delete('/', authenticated, departureCostsController.delete);
router.post('/', authenticated, departureCostsController.create);
router.get('/all/', authenticated, departureCostsController.index);
/*
===Admin Routes End===
*/

module.exports = router;
