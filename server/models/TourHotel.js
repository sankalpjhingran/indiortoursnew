"use strict";

const sequelize = require('../models/index');

module.exports = (sequelize, DataTypes) => {
    const TourHotel = sequelize.define("TourHotel", {});

    TourHotel.associate = function(models) {
        models.Hotel.belongsToMany(models.Tour, {
            through: TourHotel,
            as: 'accomodationTour'
        });
        models.Tour.belongsToMany(models.Hotel, {
            through: TourHotel,
            as: 'accomodationHotel'
        }, {
            onDelete: 'cascade'
        });
    };
    return TourHotel;
};