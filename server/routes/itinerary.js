'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var itineraryController  = require('../controllers/itinerary');
var authenticated = require('./authenticated');

console.log('In itinerary route===>');
router.post('/', itineraryController.create);
router.post('/bulkcreate/', itineraryController.bulkCreate);
router.post('/bulkupdate/', itineraryController.bulkUpdate);
router.get('/', itineraryController.show);
router.get('/all/', itineraryController.index);
router.delete('/', itineraryController.delete);
router.post('/update/', itineraryController.update);
module.exports = router;
