'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var TourNotesController  = require('../controllers/notes');
var authenticated = require('./authenticated');

console.log('In tourNotesController route===>');
router.post('/', authenticated, TourNotesController.create);
router.get('/', authenticated, TourNotesController.show);
router.get('/all/', authenticated, TourNotesController.index);
router.delete('/', authenticated, TourNotesController.delete);
router.post('/update/', authenticated, TourNotesController.update);
module.exports = router;
