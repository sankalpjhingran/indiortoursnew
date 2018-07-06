'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var TourNotesController  = require('../controllers/notes');
var authenticated = require('./authenticated');

console.log('In tourNotesController route===>');
router.post('/', TourNotesController.create);
router.get('/', TourNotesController.show);
router.get('/all/', TourNotesController.index);
router.delete('/', TourNotesController.delete);
router.post('/update/', TourNotesController.update);
module.exports = router;
