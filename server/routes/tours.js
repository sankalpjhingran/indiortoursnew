'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var models  = require('../models/index');
var toursController  = require('../controllers/tours');


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


console.log('In Tours route');
router.post('/', toursController.create);
router.get('/', toursController.show);
router.get('/all', toursController.index);
router.get('/find', toursController.showByName);
router.get('/tourwithlocations', toursController.getTourWithLocations);
router.get('/alltourswithlocations', toursController.getAllToursWithLocations);
router.get('/alltourswithlocationsandhotels', toursController.getAllToursWithLocationsAndHotels);
router.get('/tourdetailswithrelatedmodels', toursController.getTourWithRelatedModels);
router.post('/update/', toursController.update);
router.delete('/', toursController.delete);

module.exports = router;
