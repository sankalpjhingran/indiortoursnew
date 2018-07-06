'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var departureCostsController  = require('../controllers/dates');

console.log('In departureCostsController route===>');
<<<<<<< HEAD

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
router.post('/update/', authenticated, departureCostsController.update);
router.delete('/', authenticated, departureCostsController.delete);
router.post('/', authenticated, departureCostsController.create);
router.get('/all/', departureCostsController.index);
/*
===Admin Routes End===
*/
=======
router.post('/', departureCostsController.create);
router.get('/', departureCostsController.show);
router.get('/all/', departureCostsController.index);
router.delete('/', departureCostsController.delete);
router.post('/update/', departureCostsController.update);
>>>>>>> parent of 3573d33... Add server side security for routes

module.exports = router;
