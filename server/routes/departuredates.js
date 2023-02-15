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

router.patch('/update/', departureCostsController.update);
router.delete('/', departureCostsController.delete);
router.get('/all/', departureCostsController.index);
router.post('/', departureCostsController.create);
router.get('/', departureCostsController.show);

module.exports = router;
