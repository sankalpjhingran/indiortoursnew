'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var models  = require('../models/index');
var toursController  = require('../controllers/tours');
var authenticated = require('./authenticated');

console.log('In Tours route===>');

/*
===Main Routes Start===
*/
router.get('/alltourswithlocations', toursController.getAllToursWithLocations);
router.get('/tourdetailswithrelatedmodels', toursController.getTourWithRelatedModels);


router.get('/', authenticated, toursController.show);
router.get('/find', authenticated, toursController.showByName);
router.get('/tourwithlocations', authenticated, toursController.getTourWithLocations);
router.get('/searchtourwithlocations', authenticated, toursController.searchAllToursWithLocations);

router.get('/alltourswithitineries', authenticated, toursController.getAllToursWithItineraries);
router.get('/alltourswithlocationsandhotels', authenticated, toursController.getAllToursWithLocationsAndHotels);

/*
===Main Routes End===
*/

/*
===Admin Routes Start===
*/
router.post('/update/', authenticated, toursController.update);
router.post('/', authenticated, toursController.create);
router.delete('/', authenticated, toursController.delete);
router.get('/all', authenticated, toursController.index);
/*
===Admin Routes End===
*/

models.ParentTour.sync();
models.Tour.sync();
models.TourCost.sync();
models.Location.sync();
models.Hotel.sync();
models.DepartureDates.sync();
models.TourCost.sync();
models.Itinerary.sync();
models.ItineraryDetails.sync();
models.AdditionalServiceSupplements.sync();
models.MoreInfo.sync();
models.MoreInfoItem.sync();
models.MoreInfoItemDetails.sync();
models.Image.sync();
models.TourNote.sync();
models.Notes.sync();
models.TourLocation.sync();
models.TourHotel.sync();
models.User.sync();
models.Place.sync();
models.Tag.sync();
models.TagAssignment.sync();
models.TourGroup.sync();

module.exports = router;
