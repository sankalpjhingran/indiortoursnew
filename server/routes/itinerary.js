'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var itineraryController  = require('../controllers/itinerary');
var authenticated = require('./authenticated');

console.log('In itinerary route===>');
router.post('/', authenticated, itineraryController.create);
router.post('/bulkcreate/', authenticated, itineraryController.bulkCreate);
router.post('/bulkupdate/', authenticated, itineraryController.bulkUpdate);
router.get('/', itineraryController.show);
router.get('/all/', itineraryController.index);
router.delete('/', authenticated, itineraryController.delete);
router.post('/update/', authenticated, itineraryController.update);
module.exports = router;
