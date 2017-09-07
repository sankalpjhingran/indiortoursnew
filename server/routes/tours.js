'use strict';

var path = require('path');
var express = require('express');
var router = express.Router();
var models  = require('../models/index');


models.ParentTour.sync();
models.Tour.sync();
models.Continent.sync();
models.Country.sync();
models.City.sync();
models.Hotel.sync();
models.HotelOptions.sync();

models.TourCost.sync();
models.Itinerary.sync();
models.AdditionalServiceSupplements.sync();
models.MoreInfo.sync();
models.MoreInfoItem.sync();
models.MoreInfoItemDetails.sync();

module.exports = router;
