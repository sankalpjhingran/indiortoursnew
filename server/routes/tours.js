'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var models  = require('../models/index');
var toursController  = require('../controllers/tours');

console.log('In Tours route===>');
router.post('/', toursController.create);
router.get('/', toursController.show);
router.get('/all', toursController.index);
router.get('/find', toursController.showByName);
router.get('/tourwithlocations', toursController.getTourWithLocations);
router.get('/searchtourwithlocations', toursController.searchAllToursWithLocations);
router.get('/alltourswithlocations', toursController.getAllToursWithLocations);
router.get('/alltourswithitineries', toursController.getAllToursWithItineraries);
router.get('/alltourswithlocationsandhotels', toursController.getAllToursWithLocationsAndHotels);
router.get('/tourdetailswithrelatedmodels', toursController.getTourWithRelatedModels);

/*
===Main Routes End===
*/

/*
===Admin Routes Start===
*/
router.post('/update/', toursController.update);
/*
===Admin Routes End===
*/
router.post('/update/', toursController.update);
router.delete('/', toursController.delete);

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
models.Booking.sync();
models.Continent.sync();
models.Country.sync();
models.Region.sync();

module.exports = router;
