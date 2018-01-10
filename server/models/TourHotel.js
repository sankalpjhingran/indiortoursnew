"use strict";

var sequelize  = require('../models/index');

module.exports = (sequelize, DataTypes) => {
  var TourHotel = sequelize.define("TourHotel", {
      }
  );

  TourHotel.associate = function(models) {
    models.Hotel.belongsToMany(models.Tour, { through: TourHotel, as: 'accomodationTour'});
    models.Tour.belongsToMany(models.Hotel, { through: TourHotel, as: 'accomodationHotel'}, { onDelete: 'cascade' });

    //TourHotel.belongsTo(models.Tour, {as: 'tourHotel'});
    //TourHotel.belongsTo(models.Hotel, {as: 'hotelTour'});
  };

  return TourHotel;
};
